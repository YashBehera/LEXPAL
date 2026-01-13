
import LegalPageLayout from "@/components/LegalPageLayout";

export default function CommunityPage() {
    const sections = [
        { id: "events", title: "Upcoming Events" },
        { id: "forum", title: "Discussion Forum" },
        { id: "guidelines", title: "Community Guidelines" },
    ];

    const Content = (
        <div>
            <section id="events">
                <h2>Global Legal Community.</h2>
                <p>Connect with peers, mentors, and industry leaders through our exclusive events and webinars.</p>
                <p><strong>Next Event:</strong> "Legal Tech Summit 2026" - Bangalore (Mar 15)</p>
            </section>

            <section id="forum">
                <h3>Join the Discussion</h3>
                <p>Our verified-only forum allows lawyers to ask questions, share case law strategies, and discuss ethics in a private, safe environment.</p>
                <a href="#" style={{ color: 'var(--c-primary)' }}>Access Forum &rarr;</a>
            </section>
        </div>
    );

    return (
        <LegalPageLayout
            title="Community"
            lastUpdated="January 2026"
            sections={sections}
            lawyerContent={Content}
            clientContent={Content}
        />
    );
}
