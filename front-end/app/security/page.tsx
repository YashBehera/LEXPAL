"use client";

import LegalPageLayout from "@/components/LegalPageLayout";

export default function Security() {
    const sections = [
        { id: "philosophy", title: "1. Security Philosophy" },
        { id: "encryption", title: "2. Encryption & Data Protection" },
        { id: "infrastructure", title: "3. Infrastructure & Compliance" },
        { id: "access", title: "4. Identity & Access Control" },
        { id: "monitoring", title: "5. Monitoring & Response" },
        { id: "reporting", title: "6. Vulnerability Reporting" },
    ];

    /* ==================================================================================
       LAWYER CONTENT (Enterprise Security)
       ================================================================================== */
    const lawyerContent = (
        <>
            <p className="lead">
                Protecting the confidentiality of your practice is our highest priority.
                Lexpal is built on an enterprise-grade security foundation designed to meet the rigorous standards of the legal profession.
            </p>

            <section id="philosophy">
                <h2>1. Security Philosophy</h2>
                <p>
                    We employ a "Defense in Depth" strategy, layering multiple security controls to protect your data.
                    We assume that user endpoints may be compromised and design our systems to protect the core data assets regardless.
                </p>
            </section>

            <section id="encryption">
                <h2>2. Encryption & Data Protection</h2>
                <p>Your firm's data is encrypted at every stage:</p>
                <ul>
                    <li><strong>Data at Rest:</strong> All database volumes and object storage buckets are encrypted using AES-256 (Advanced Encryption Standard).</li>
                    <li><strong>Data in Transit:</strong> All network traffic is encrypted via TLS 1.3. We support HSTS (HTTP Strict Transport Security) to force secure connections.</li>
                    <li><strong>Key Management:</strong> We use AWS KMS (Key Management Service) with automatic key rotation.</li>
                </ul>
            </section>

            <section id="infrastructure">
                <h2>3. Infrastructure & Compliance</h2>
                <p>
                    Lexpal is hosted on Amazon Web Services (AWS) in the Mumbai (ap-south-1) region, ensuring data residency compliance.
                </p>
                <ul>
                    <li><strong>Physical Security:</strong> AWS data centers are protected by biometric surveillance and 24/7 armed guards.</li>
                    <li><strong>Standards:</strong> Our infrastructure aligns with ISO 27001, SOC 2 Type II, and PCI-DSS Level 1 standards.</li>
                </ul>
            </section>

            <section id="access">
                <h2>4. Identity & Access Control</h2>
                <p>
                    We provide granular controls to manage your firm's internal access:
                </p>
                <ul>
                    <li><strong>Role-Based Access Control (RBAC):</strong> Define custom roles (Partner, Associate, Paralegal) with specific permissions.</li>
                    <li><strong>Two-Factor Authentication (2FA):</strong> Mandatory for all administrative accounts.</li>
                    <li><strong>Audit Logs:</strong> Detailed immutable logs of every file access, download, and modification event.</li>
                </ul>
            </section>

            <section id="monitoring">
                <h2>5. Monitoring & Incident Response</h2>
                <p>
                    Our security team employs automated intrusion detection systems (IDS) and web application firewalls (WAF) to block threats in real-time.
                    We conduct regular penetration testing (VAPT) with third-party security firms.
                </p>
            </section>

            <section id="reporting">
                <h2>6. Vulnerability Reporting</h2>
                <p>
                    If you identify a potential security vulnerability, please contact our Security Team immediately at <a href="mailto:security@lexpal.in">security@lexpal.in</a> using our PGP key.
                </p>
            </section>
        </>
    );

    /* ==================================================================================
       CLIENT CONTENT (User Protection)
       ================================================================================== */
    const clientContent = (
        <>
            <p className="lead">
                We understand that seeking legal help often involves sharing sensitive personal details.
                Lexpal uses banking-grade technology to keep your information safe and private.
            </p>

            <section id="philosophy">
                <h2>1. Your Trust, Our Technology</h2>
                <p>
                    We believe you should have total control over your data. We have designed Lexpal so that your private case details remain private until you decide to share them.
                </p>
            </section>

            <section id="encryption">
                <h2>2. How We Protect Your Data</h2>
                <ul>
                    <li><strong>Secure Connections:</strong> Look for the "lock" icon in your browser. We use HTTPS to ensure no one can snoop on your connection.</li>
                    <li><strong>Encrypted Messages:</strong> Chats between you and lawyers are encrypted, meaning Lexpal employees cannot read your private consultations.</li>
                    <li><strong>Secure Payments:</strong> We process payments through certified gateways. Your credit card numbers never hit our servers.</li>
                </ul>
            </section>

            <section id="infrastructure">
                <h2>3. Reliable Infrastructure</h2>
                <p>
                    Our systems run on the same secure cloud platforms used by major banks and governments. We have redundant backups to ensure your data is never lost.
                </p>
            </section>

            <section id="access">
                <h2>4. Protecting Your Account</h2>
                <p>
                    We offer tools to help you secure your account:
                </p>
                <ul>
                    <li><strong>Strong Password Requirements:</strong> We enforce complex passwords to prevent guessing attacks.</li>
                    <li><strong>Login Alerts:</strong> We notify you via email if your account is accessed from a new device or location.</li>
                </ul>
            </section>

            <section id="monitoring">
                <h2>5. Fraud Prevention</h2>
                <p>
                    We use automated systems to detect suspicious activity, such as fake lawyer profiles or phishing attempts, to keep the community safe.
                </p>
            </section>

            <section id="reporting">
                <h2>6. Reporting Issues</h2>
                <p>
                    If you suspect your account has been compromised or see suspicious activity, please email <a href="mailto:support@lexpal.in">support@lexpal.in</a> immediately.
                </p>
            </section>
        </>
    );

    return (
        <LegalPageLayout
            title="Security"
            lastUpdated="January 13, 2026"
            sections={sections}
            lawyerContent={lawyerContent}
            clientContent={clientContent}
        />
    );
}
