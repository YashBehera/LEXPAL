
import LegalPageLayout from "@/components/LegalPageLayout";

export default function HelpPage() {
    const sections = [
        { id: "getting-started", title: "Getting Started" },
        { id: "account", title: "Account & Billing" },
        { id: "technical", title: "Technical Issues" },
    ];

    const Content = (
        <div>
            <section id="getting-started">
                <h2>How can we help?</h2>
                <p>Browse our knowledge base to find answers to common questions about using Lexpal.</p>
                <ul>
                    <li><a href="#">How to verify your lawyer profile</a></li>
                    <li><a href="#">Booking your first consultation</a></li>
                    <li><a href="#">Understanding our escrow system</a></li>
                </ul>
            </section>

            <section id="account">
                <h3>Manage Your Account</h3>
                <p>Learn how to update your profile, change your password, tax invoice downloads, and manage notification preferences.</p>
            </section>
        </div>
    );

    return (
        <LegalPageLayout
            title="Help Center"
            lastUpdated="January 2026"
            sections={sections}
            lawyerContent={Content}
            clientContent={Content}
        />
    );
}
