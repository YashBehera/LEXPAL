
import LegalPageLayout from "@/components/LegalPageLayout";

export default function NewsPage() {
    const sections = [
        { id: "press", title: "Press Releases" },
        { id: "media", title: "Media Kit" },
        { id: "awards", title: "Recognition" },
    ];

    const Content = (
        <div>
            <section id="press">
                <h2>Latest News.</h2>
                <p><strong>Jan 2026:</strong> Lexpal raises Series B to expand AI Courtroom tools.</p>
                <p><strong>Nov 2025:</strong> Lexpal partners with Bar Council of Maharashtra for digital modernization.</p>
            </section>

            <section id="media">
                <h3>Brand Assets</h3>
                <p>Download our official logos, founder headshots, and product screenshots. Please follow our brand guidelines when using our assets.</p>
                <a href="#" style={{ color: 'var(--c-primary)' }}>Download Media Kit &rarr;</a>
            </section>
        </div>
    );

    return (
        <LegalPageLayout
            title="Newsroom"
            lastUpdated="January 2026"
            sections={sections}
            lawyerContent={Content}
            clientContent={Content}
        />
    );
}
