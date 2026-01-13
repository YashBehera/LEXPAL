
import LegalPageLayout from "@/components/LegalPageLayout";

export default function StatusPage() {
    const sections = [
        { id: "current", title: "Current Status" },
        { id: "history", title: "Incident History" },
    ];

    const Content = (
        <div>
            <section id="current">
                <h2>System Operational.</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#34C759' }}></span>
                    <span><strong>API:</strong> Operational</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#34C759' }}></span>
                    <span><strong>Dashboard:</strong> Operational</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#34C759' }}></span>
                    <span><strong>AI Engine:</strong> Operational</span>
                </div>
            </section>

            <section id="history">
                <h3>Past Incidents</h3>
                <p>No incidents reported in the last 90 days.</p>
            </section>
        </div>
    );

    return (
        <LegalPageLayout
            title="System Status"
            lastUpdated="January 2026"
            sections={sections}
            lawyerContent={Content}
            clientContent={Content}
        />
    );
}
