// controllers/ai/getLatestConversations.js
import mongoose from "mongoose";
import AIConversation from "../models/AIConversation.model.js";

export const recentConversationLoader = async (req, res) => {
  try {
    const userId = req.client_data.id;               // Logged-in user's ID
    const userType = req.client_data.user_type;      // "User" or "Lawyer"
    const n = parseInt(req.query.n) || 10;           // Default 10 if not sent

    if (!userId || !userType) {
      return res.status(400).json({ message: "User metadata missing" });
    }

    // Use aggregation to filter out empty conversations efficiently
    const conversations = await AIConversation.aggregate([
      // 1. Match conversations for this user
      {
        $match: {
          user_id: new mongoose.Types.ObjectId(userId),
          user_type: userType
        }
      },
      // 2. Lookup messages to check existence (Limit 1 for performance)
      {
        $lookup: {
          from: "aimessages", // Collection name (lowercase plural of AImessage)
          let: { convoId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$convo_id", "$$convoId"] } } },
            { $limit: 1 }, // We only care if AT LEAST ONE message exists
            { $project: { _id: 1 } } // minimal projection
          ],
          as: "hasMessages"
        }
      },
      // 3. Filter: Only keep conversations that have at least one message
      {
        $match: {
          $expr: { $gt: [{ $size: "$hasMessages" }, 0] }
        }
      },
      // 4. Sort by newest
      { $sort: { createdAt: -1 } },
      // 5. Limit result
      { $limit: n }
    ]);

    // Format response objects
    const formatted = conversations.map(c => ({
      _id: c._id,
      title: c.title || "",
      description: c.description || "",
      timestamp: c.createdAt
    }));

    return res.json({ conversations: formatted });

  } catch (err) {
    console.error("Error loading conversations:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};