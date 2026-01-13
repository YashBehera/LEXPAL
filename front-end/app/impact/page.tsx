
import LegalPageLayout from "@/components/LegalPageLayout";

export default function ImpactPage() {
    const sections = [
        { id: "pro-bono", title: "Pro Bono Initiative" },
        { id: "education", title: "Legal Education" },
        { id: "sustainability", title: "Sustainability" },
    ];

    const Content = (
        <div>
            <section id="pro-bono">
                <h2>Justice for All.</h2>
                <p>
                    We pledge 1% of our platform revenue to fund pro bono legal representation for underrepresented communities. Every subscription contributes to this fund.
                </p>
            </section>

            <section id="education">
                <h3>Know Your Rights</h3>
                <p>We partner with top law schools to create simplified, vernacular legal content to help millions of Indians understand their fundamental rights.</p>
            </section>

            <section id="sustainability">
                <h3>Paperless Courts</h3>
                <p>By digitizing case files and workflows, Lexpal has saved over 500,000 sheets of paper in 2025 alone. We are committed to a carbon-neutral digital legal ecosystem.</p>
            </section>
        </div>
    );

    return (
        <LegalPageLayout
            title="Social Impact"
            lastUpdated="January 2026"
            sections={sections}
            lawyerContent={Content}
            clientContent={Content}
        />
    );
}
