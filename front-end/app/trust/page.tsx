
import LegalPageLayout from "@/components/LegalPageLayout";

export default function TrustPage() {
    const sections = [
        { id: "verification", title: "Verification Process" },
        { id: "payments", title: "Secure Payments" },
        { id: "disputes", title: "Dispute Resolution" },
    ];

    const LawyerContent = (
        <div>
            <section id="verification">
                <h2>Protecting the Profession.</h2>
                <p>
                    Our rigorous verification ensures that you aren't competing with individuals misrepresenting their credentials. We maintain the integrity of the platform so your qualifications truly shine.
                </p>
            </section>

            <section id="payments">
                <h3>Guaranteed Payments</h3>
                <p>No more chasing invoices. Clients pay upfront into an escrow account. Funds are released to you immediately upon successful completion of the consultation or milestone.</p>
            </section>

            <section id="disputes">
                <h3>Professional Mediation</h3>
                <p>In the rare event of a dispute, our dedicated legal operations team mediates based on the documented scope of work, protecting you from scope creep and unfair claims.</p>
            </section>
        </div>
    );

    const ClientContent = (
        <div>
            <section id="verification">
                <h2>Your Safety First.</h2>
                <p>
                    Trust is the foundation of legal representation. We verify the identity and Bar Council credentials of every lawyer. You can be confident you are speaking to a licensed professional.
                </p>
            </section>

            <section id="payments">
                <h3>Lexpal Shield</h3>
                <p>Your payment is held safely in escrow. The lawyer is paid only after the service is delivered. If the lawyer fails to show up, you get a 100% automatic refund.</p>
            </section>

            <section id="disputes">
                <h3>Fair Resolution</h3>
                <p>If you aren't satisfied with the service provided, our support team will review the case conversation and deliverables to ensure a fair outcome, including potential refunds.</p>
            </section>
        </div>
    );

    return (
        <LegalPageLayout
            title="Trust & Safety"
            lastUpdated="January 2026"
            sections={sections}
            lawyerContent={LawyerContent}
            clientContent={ClientContent}
        />
    );
}
