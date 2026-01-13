
import LegalPageLayout from "@/components/LegalPageLayout";

export default function AboutPage() {
    const sections = [
        { id: "mission", title: "Our Mission" },
        { id: "story", title: "Our Story" },
        { id: "values", title: "Core Values" },
    ];

    const Content = (
        <div>
            <section id="mission">
                <h2>Democratizing Justice.</h2>
                <p>
                    Lexpal exists to bridge the gap between complex legal systems and the people who need them. We are building the operating system for the future of law—accessible, efficient, and transparent.
                </p>
            </section>

            <section id="story">
                <h3>Founded in 2024</h3>
                <p>Started by a team of lawyers and engineers in Bengaluru, Lexpal recognized that finding the right lawyer was harder than finding a life partner. We set out to change that with AI.</p>
            </section>

            <section id="values">
                <h3>What We Believe</h3>
                <ul>
                    <li><strong>Integrity:</strong> The law relies on truth. So do we.</li>
                    <li><strong>Innovation:</strong> Tradition shouldn't mean stagnation.</li>
                    <li><strong>Access:</strong> Justice shouldn't be a luxury good.</li>
                </ul>
            </section>
        </div>
    );

    return (
        <LegalPageLayout
            title="About Us"
            lastUpdated="January 2026"
            sections={sections}
            lawyerContent={Content}
            clientContent={Content}
        />
    );
}
