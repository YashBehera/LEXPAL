
import LegalPageLayout from "@/components/LegalPageLayout";

export default function LawyersPage() {
    const sections = [
        { id: "benefits", title: "Why Join Lexpal?" },
        { id: "tools", title: "Practice Management" },
        { id: "network", title: "Elite Network" },
    ];

    const LawyerContent = (
        <div>
            <section id="benefits">
                <h2>Elevate Your Practice.</h2>
                <p>
                    Lexpal isn't just a directory; it's a comprehensive operating system for the modern lawyer. We connect you with high-intent clients while vetting out low-quality leads using AI.
                </p>
            </section>

            <section id="tools">
                <h3>AI-Powered Tools</h3>
                <p>Access our proprietary AI research assistant, automated document drafting, and secure client communication portal. Reduce administrative overhead by 40%.</p>
            </section>

            <section id="network">
                <h3>Verified Community</h3>
                <p>Join an exclusive network of verified Bar Council members. Collaborate on cases, refer clients, and build your reputation among India's top legal minds.</p>
            </section>
        </div>
    );

    const ClientContent = (
        <div>
            <section id="benefits">
                <h2>Hire the Best. Guaranteed.</h2>
                <p>
                    We don't let just anyone onto Lexpal. Every lawyer on our platform undergoes a rigorous 5-step verification process including Bar Council verification and background checks.
                </p>
            </section>

            <section id="tools">
                <h3>Verified Credentials</h3>
                <p>When you see a "Titanium Verified" badge, it means we have manually verified their degree, bar license, and court standing.</p>
            </section>

            <section id="network">
                <h3>Specialized Experts</h3>
                <p>Find specialists in niche fields like IP Law, Crypto Regulations, and Startup Structuring, not just general practitioners.</p>
            </section>
        </div>
    );

    return (
        <LegalPageLayout
            title="For Lawyers"
            lastUpdated="January 2026"
            sections={sections}
            lawyerContent={LawyerContent}
            clientContent={ClientContent}
        />
    );
}
