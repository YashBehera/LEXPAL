"use client";

import LegalPageLayout from "@/components/LegalPageLayout";

export default function PrivacyPolicy() {
    const sections = [
        { id: "intro", title: "1. Introduction" },
        { id: "collection", title: "2. Information Collection" },
        { id: "use", title: "3. Use of Data" },
        { id: "sharing", title: "4. Data Sharing & Disclosure" },
        { id: "security", title: "5. Data Security" },
        { id: "rights", title: "6. Your Rights" },
        { id: "retention", title: "7. Data Retention" },
        { id: "contact", title: "8. Contact Us" },
    ];

    /* ==================================================================================
       LAWYER CONTENT (Data Processor / Professional User)
       ================================================================================== */
    const lawyerContent = (
        <>
            <p className="lead">
                <strong>Effective Date:</strong> January 13, 2026 <br />
                This Privacy Policy ("Policy") outlines how Lexpal Technologies Pvt. Ltd. ("Lexpal", "we", "us") collects, processes, and protects the specialized information provided by legal professionals ("Lawyers", "Subscribers") utilizing our practice management SaaS platform.
            </p>

            <section id="intro">
                <h2>1. Introduction</h2>
                <p>
                    Lexpal recognizes that as a legal professional, you are entrusted with privileged and confidential information.
                    When you use our Platform, we act primarily as a <strong>Data Processor</strong> under applicable data protection laws,
                    while you remain the <strong>Data Controller</strong> of your clients' information.
                </p>
            </section>

            <section id="collection">
                <h2>2. Information Collection</h2>
                <h3>2.1 Professional Identity Data</h3>
                <p>To verify your standing and eligibility, we collect:</p>
                <ul>
                    <li>Full Name, Business Address, and Professional Email.</li>
                    <li>Bar Council Registration Number and Enrollment Date.</li>
                    <li>Proof of Identity (Aadhaar/PAN) for KYC compliance.</li>
                </ul>

                <h3>2.2 Practice Data (Client Data)</h3>
                <p>
                    Information you upload regarding your clients ("Case Files") involves sensitive personal data.
                    We collect this data solely for the purpose of providing the Service (e.g., storage, retrieval, AI analysis).
                </p>
            </section>

            <section id="use">
                <h2>3. Use of Data</h2>
                <p>We process your data for the following strictly defined purposes:</p>
                <ul>
                    <li><strong>Service Provision:</strong> To authenticate access, facilitate case management, and enable AI-assisted drafting tools.</li>
                    <li><strong>Verification:</strong> To conduct mandatory background checks ensuring only licensed advocates access the Lawyer Platform.</li>
                    <li><strong>Product Improvement:</strong> Aggregated, anonymized metadata (e.g., "Contract Law" case volume) allows us to refine our AI models. <strong>We do not read, train on, or access the raw text of your privileged Case Files without explicit consent.</strong></li>
                </ul>
            </section>

            <section id="sharing">
                <h2>4. Data Sharing & Disclosure</h2>
                <p>We do not share your Professional Data or Case Files with third parties, except:</p>
                <ul>
                    <li><strong>Sub-processors:</strong> Trusted cloud infrastructure providers (e.g., AWS India) bound by strict Data Processing Agreements (DPAs).</li>
                    <li><strong>Legal Requirement:</strong> If compelled by a court order. In such events, we will attempt to notify you promptly to allow you to seek a protective order, unless prohibited by law.</li>
                </ul>
            </section>

            <section id="security">
                <h2>5. Data Security & Privilege</h2>
                <p>
                    We employ <strong>Bank-Grade Security</strong> measures, including AES-256 encryption at rest and TLS 1.3 in transit.
                    Your Case Files are cryptographically isolated. Lexpal’s architecture involves "Zero-Knowledge" principles where feasible, minimizing our technical ability to access clear-text client data.
                </p>
            </section>

            <section id="rights">
                <h2>6. Your Rights</h2>
                <p>
                    Subject to applicable law, you have the right to:
                </p>
                <ul>
                    <li><strong>Access & export:</strong> Download all Case Files in open formats at any time.</li>
                    <li><strong>Rectification:</strong> Correct inaccuracies in your Professional Profile.</li>
                    <li><strong>Deletion:</strong> Request permanent deletion of your account and associated data upon subscription termination.</li>
                </ul>
            </section>

            <section id="retention">
                <h2>7. Data Retention</h2>
                <p>
                    We retain your account data for as long as your subscription is active. Upon termination, we provide a 90-day grace period for data export, after which all Case Files are permanently purged from our active servers.
                </p>
            </section>

            <section id="contact">
                <h2>8. Contact Us</h2>
                <p>For privacy inquiries or to exercise your data rights, please contact our Data Protection Officer:</p>
                <p>
                    <strong>Email:</strong> <a href="mailto:legal-privacy@lexpal.in">legal-privacy@lexpal.in</a><br />
                    <strong>Address:</strong> Lexpal Legal Team, Cyber City, Gurugram, India.
                </p>
            </section>
        </>
    );

    /* ==================================================================================
       CLIENT CONTENT (Data Subject / End User)
       ================================================================================== */
    const clientContent = (
        <>
            <p className="lead">
                <strong>Effective Date:</strong> January 13, 2026 <br />
                This Privacy Policy explains how Lexpal collects and uses information from individuals ("Clients", "Users") seeking legal services through our platform.
            </p>

            <section id="intro">
                <h2>1. Introduction</h2>
                <p>
                    Lexpal connects you with independent legal professionals. We are committed to protecting your personal information and ensuring you have control over who sees your legal inquiries.
                </p>
            </section>

            <section id="collection">
                <h2>2. Information Collection</h2>
                <h3>2.1 Personal Information</h3>
                <p>We collect information you provide directly:</p>
                <ul>
                    <li>Contact details (Name, Email, Phone Number).</li>
                    <li>Profile information (Location, Language preferences).</li>
                </ul>

                <h3>2.2 Case Inquiry Data</h3>
                <p>
                    When you post a legal question or request a consultation, we collect the details you submit.
                    <em>Note:</em> We advise against sharing highly sensitive incriminating details in initial public inquiries.
                </p>
            </section>

            <section id="use">
                <h2>3. Use of Data</h2>
                <ul>
                    <li><strong>Matching:</strong> To recommend lawyers with the relevant expertise (e.g., matching a "Property Dispute" inquiry with "Civil Lawyers").</li>
                    <li><strong>Communication:</strong> To facilitate secure chat and video calls between you and your chosen lawyer.</li>
                    <li><strong>Platform Safety:</strong> To detect and prevent fraud, spam, or abuse of our services.</li>
                </ul>
            </section>

            <section id="sharing">
                <h2>4. Data Sharing</h2>
                <p>
                    <strong>We do not sell your personal data.</strong> Your information is shared only in the following contexts:
                </p>
                <ul>
                    <li><strong>With Lawyers:</strong> Only when you explicitly initiate a contact request or booking.</li>
                    <li><strong>Service Providers:</strong> Payment processors (e.g., Razorpay, Stripe) for consultation fees.</li>
                </ul>
            </section>

            <section id="security">
                <h2>5. Data Security</h2>
                <p>
                    We use strong encryption to protect your messages and documents. Access to your account is protected by multi-factor authentication options.
                </p>
            </section>

            <section id="rights">
                <h2>6. Your Rights</h2>
                <p>
                    You have the right to:
                </p>
                <ul>
                    <li>View and edit your personal profile.</li>
                    <li>Request a copy of all data Lexpal holds about you.</li>
                    <li>Withdraw consent for marketing communications.</li>
                </ul>
            </section>

            <section id="retention">
                <h2>7. Data Retention</h2>
                <p>
                    We retain your profile information until you delete your account. Messages and case inquiries are retained for a period of 5 years to comply with legal documentation standards, or as required by law.
                </p>
            </section>

            <section id="contact">
                <h2>8. Contact Us</h2>
                <p>
                    If you have questions about how we handle your data, please email us at <a href="mailto:privacy@lexpal.in">privacy@lexpal.in</a>.
                </p>
            </section>
        </>
    );

    return (
        <LegalPageLayout
            title="Privacy Policy"
            lastUpdated="January 13, 2026"
            sections={sections}
            lawyerContent={lawyerContent}
            clientContent={clientContent}
        />
    );
}
