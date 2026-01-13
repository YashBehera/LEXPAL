
import LegalPageLayout from "@/components/LegalPageLayout";

export default function CareersPage() {
    const sections = [
        { id: "culture", title: "Life at Lexpal" },
        { id: "openings", title: "Open Positions" },
        { id: "perks", title: "Benefits" },
    ];

    const Content = (
        <div>
            <section id="culture">
                <h2>Build the Future of Law.</h2>
                <p>
                    We are a team of dreamers, doers, and disputers (the good kind). We are looking for people who are passionate about solving hard problems in a regulated industry.
                </p>
            </section>

            <section id="openings">
                <h3>Current Openings</h3>
                <p><strong>Senior Frontend Engineer</strong> - Remote / Bengaluru</p>
                <p><strong>Legal Operations Manager</strong> - Mumbai</p>
                <p><strong>AI Research Scientist (NLP)</strong> - Remote</p>
                <p><em>Email careers@lexpal.in with your resume.</em></p>
            </section>

            <section id="perks">
                <h3>Why Join Us?</h3>
                <p>Competitive equity, comprehensive health insurance for you and your family, unlimited PTO, and a budget for your home office setup.</p>
            </section>
        </div>
    );

    return (
        <LegalPageLayout
            title="Careers"
            lastUpdated="January 2026"
            sections={sections}
            lawyerContent={Content}
            clientContent={Content}
        />
    );
}
