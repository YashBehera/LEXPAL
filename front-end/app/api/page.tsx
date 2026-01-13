
import LegalPageLayout from "@/components/LegalPageLayout";

export default function APIPage() {
    const sections = [
        { id: "intro", title: "Lexpal API" },
        { id: "auth", title: "Authentication" },
        { id: "endpoints", title: "Endpoints" },
    ];

    const Content = (
        <div>
            <section id="intro">
                <h2>Build on Lexpal.</h2>
                <p>
                    Integrate Lexpal's practice management and AI tools directly into your firm's existing ERP or CRM software.
                </p>
            </section>

            <section id="auth">
                <h3>Authentication</h3>
                <p>The API uses standard Bearer Token authentication. Generate your API keys in the developer settings of your dashboard.</p>
                <pre style={{ background: 'var(--c-bg-sub)', padding: '12px', borderRadius: '8px', overflowX: 'auto' }}>
                    <code>Authorization: Bearer YOUR_API_KEY</code>
                </pre>
            </section>

            <section id="endpoints">
                <h3>Core Resources</h3>
                <ul>
                    <li><code>GET /v1/cases</code> - List all active cases</li>
                    <li><code>POST /v1/documents/analyze</code> - Submit document for AI analysis</li>
                    <li><code>GET /v1/lawyers/search</code> - Query our lawyer database</li>
                </ul>
            </section>
        </div>
    );

    return (
        <LegalPageLayout
            title="Developers"
            lastUpdated="January 2026"
            sections={sections}
            lawyerContent={Content}
            clientContent={Content}
        />
    );
}
