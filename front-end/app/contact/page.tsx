
import LegalPageLayout from "@/components/LegalPageLayout";

export default function ContactPage() {
    const sections = [
        { id: "support", title: "Customer Support" },
        { id: "sales", title: "Enterprise Sales" },
        { id: "office", title: "Office Location" },
    ];

    const Content = (
        <div>
            <section id="support">
                <h2>Get in Touch.</h2>
                <p>
                    Need help with your account? Our support team is available 24/7.
                    <br />
                    <strong>Email:</strong> support@lexpal.in
                </p>
            </section>

            <section id="sales">
                <h3>For Law Firms</h3>
                <p>Interested in deploying Lexpal for your entire firm? Contact our enterprise team for custom quote and demo.</p>
                <p><strong>Email:</strong> sales@lexpal.in</p>
            </section>

            <section id="office">
                <h3>Headquarters</h3>
                <address style={{ fontStyle: 'normal', lineHeight: 1.6 }}>
                    Lexpal Technologies Pvt Ltd.<br />
                    The Hive, Koramangala<br />
                    Bengaluru, Karnataka 560034<br />
                    India
                </address>
            </section>
        </div>
    );

    return (
        <LegalPageLayout
            title="Contact Us"
            lastUpdated="January 2026"
            sections={sections}
            lawyerContent={Content}
            clientContent={Content}
        />
    );
}
