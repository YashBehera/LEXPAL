
import LegalPageLayout from "@/components/LegalPageLayout";

export default function PricingPage() {
    const sections = [
        { id: "overview", title: "Overview" },
        { id: "plans", title: "Subscription Plans" },
        { id: "faq", title: "Common Questions" },
    ];

    const LawyerContent = (
        <div>
            <section id="overview">
                <h2>Professional Growth at Your Pace.</h2>
                <p>
                    Lexpal offers flexible subscription tiers designed to support legal professionals at every stage of their career. From solo practitioners to large firms, our tools scale with you.
                </p>
            </section>

            <section id="plans">
                <h3>Membership Tiers</h3>
                <p><strong>Starter:</strong> Free. Basic profile listing and access to the community forum.</p>
                <p><strong>Pro:</strong> ₹2,999/mo. Enhanced visibility, 10 AI case summaries/mo, and priority support.</p>
                <p><strong>Elite:</strong> ₹9,999/mo. Top search ranking, unlimited AI tools, dedicated account manager, and zero commission on direct bookings.</p>
            </section>

            <section id="faq">
                <h3>Frequently Asked Questions</h3>
                <p><strong>Are there hidden fees?</strong> No. What you see is what you get. Transaction fees only apply to payment processing.</p>
                <p><strong>Can I cancel anytime?</strong> Yes, you can cancel your subscription at any time via your dashboard.</p>
            </section>
        </div>
    );

    const ClientContent = (
        <div>
            <section id="overview">
                <h2>Transparent Legal Costs. Finally.</h2>
                <p>
                    We believe in complete transparency. Searching for lawyers and accessing basic legal info is always free for clients. You only pay for the legal services you book.
                </p>
            </section>

            <section id="plans">
                <h3>Service Fees</h3>
                <p><strong>Platform Fee:</strong> Lexpal charges a small service fee (2%) on secure payments made through the platform to cover payment processing and insurance.</p>
                <p><strong>Consultation Fess:</strong> Set directly by the lawyers. We display them upfront so there are no surprises.</p>
            </section>

            <section id="faq">
                <h3>Frequently Asked Questions</h3>
                <p><strong>Is it free to sign up?</strong> Yes, creating a client account is 100% free.</p>
                <p><strong>How do refunds work?</strong> If a consultation is cancelled 24 hours in advance, you receive a full refund.</p>
            </section>
        </div>
    );

    return (
        <LegalPageLayout
            title="Pricing"
            lastUpdated="January 2026"
            sections={sections}
            lawyerContent={LawyerContent}
            clientContent={ClientContent}
        />
    );
}
