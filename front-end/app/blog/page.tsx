
import LegalPageLayout from "@/components/LegalPageLayout";

export default function BlogPage() {
    const sections = [
        { id: "latest", title: "Latest Articles" },
        { id: "trends", title: "Legal Trends" },
        { id: "updates", title: "Product Updates" },
    ];

    const Content = (
        <div>
            <section id="latest">
                <h2>Lexpal Insights.</h2>
                <p>Your source for legal tech news, practice management tips, and updates on Indian Law.</p>

                <div style={{ marginTop: '20px', borderLeft: '3px solid var(--c-primary)', paddingLeft: '16px' }}>
                    <h4>The Future of AI in Indian Courts</h4>
                    <p style={{ fontSize: '14px', color: 'var(--c-text-sec)' }}>Published Jan 10, 2026</p>
                    <p>How predictive analytics is helping judges reduce case backlog...</p>
                </div>

                <div style={{ marginTop: '20px', borderLeft: '3px solid var(--c-primary)', paddingLeft: '16px' }}>
                    <h4>5 Tips for Young Lawyers</h4>
                    <p style={{ fontSize: '14px', color: 'var(--c-text-sec)' }}>Published Dec 28, 2025</p>
                    <p>Building a practice in the digital age requires a new set of soft skills...</p>
                </div>
            </section>
        </div>
    );

    return (
        <LegalPageLayout
            title="Legal Blog"
            lastUpdated="January 2026"
            sections={sections}
            lawyerContent={Content}
            clientContent={Content}
        />
    );
}
