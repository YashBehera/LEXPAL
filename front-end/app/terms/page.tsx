"use client";

import LegalPageLayout from "@/components/LegalPageLayout";

export default function TermsOfService() {
    const sections = [
        { id: "acceptance", title: "1. Acceptance of Terms" },
        { id: "services", title: "2. Description of Services" },
        { id: "accounts", title: "3. Account Security" },
        { id: "payment", title: "4. Fees & Payments" },
        { id: "conduct", title: "5. User Conduct" },
        { id: "liability", title: "6. Limitation of Liability" },
        { id: "termination", title: "7. Termination" },
        { id: "general", title: "8. General Provisions" },
    ];

    /* ==================================================================================
       LAWYER CONTENT (SaaS Agreement)
       ================================================================================== */
    const lawyerContent = (
        <>
            <p className="lead">
                <strong>Last Updated:</strong> January 13, 2026. <br />
                These Terms of Service ("Terms") constitute a legally binding agreement between you ("Subscriber", "Lawyer") and Lexpal Technologies Pvt. Ltd. governing your access to and use of the Lexpal Practice Management Platform.
            </p>

            <section id="acceptance">
                <h2>1. Acceptance of Terms</h2>
                <p>
                    By creating an account or accessing the Platform, you represent that you are a qualified legal professional authorized to practice law in your jurisdiction.
                    If you are entering into this Agreement on behalf of a law firm or other legal entity, you represent that you have the authority to bind such entity.
                </p>
            </section>

            <section id="services">
                <h2>2. Description of Services</h2>
                <p>
                    Lexpal provides a suite of cloud-based tools including case management, legal research assistance, document automation, and client communication portals (collectively, the "Services").
                </p>
                <p>
                    <strong>2.1 AI Tools Disclaimer:</strong> The AI-assisted research and drafting tools are intended to support, not replace, professional legal judgment.
                    You acknowledge that you are solely responsible for reviewing, verifying, and approving any work product generated using the Services before use in professional practice.
                </p>
            </section>

            <section id="accounts">
                <h2>3. Account Security & Access</h2>
                <p>
                    You are responsible for maintaining the confidentiality of your login credentials. You agree to notify Lexpal immediately of any unauthorized access to your account.
                    You acknowledge that your account is non-transferable and may not be shared outside of authorized seats purchased in your subscription plan.
                </p>
            </section>

            <section id="payment">
                <h2>4. Fees & Payments</h2>
                <p>
                    <strong>4.1 Subscription:</strong> Services are offered on a subscription basis (Monthly/Annual). Fees are billed in advance and are non-refundable generally, except as required by law.
                </p>
                <p>
                    <strong>4.2 Tax:</strong> All fees are exclusive of applicable GST or other taxes, which will be added to the invoice.
                </p>
            </section>

            <section id="conduct">
                <h2>5. User Conduct</h2>
                <p>You agree NOT to:</p>
                <ul>
                    <li>Use the Services for any illegal purpose or in violation of professional ethical standards.</li>
                    <li>Reverse engineer, decompile, or attempt to extract the source code of the Platform.</li>
                    <li>Upload any content that contains viruses, malware, or unlawful material.</li>
                </ul>
            </section>

            <section id="liability">
                <h2>6. Limitation of Liability</h2>
                <p>
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, LEXPAL SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL.
                    OUR TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF THESE TERMS SHALL NOT EXCEED THE AMOUNT PAID BY YOU IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
                </p>
            </section>

            <section id="termination">
                <h2>7. Termination</h2>
                <p>
                    We may suspend or terminate your access if you violate these Terms. You may terminate your subscription at any time via the billing portal; such termination will be effective at the end of the current billing cycle.
                </p>
            </section>

            <section id="general">
                <h2>8. General Provisions</h2>
                <p>
                    These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in New Delhi.
                </p>
            </section>
        </>
    );

    /* ==================================================================================
       CLIENT CONTENT (Marketplace Terms)
       ================================================================================== */
    const clientContent = (
        <>
            <p className="lead">
                <strong>Last Updated:</strong> January 13, 2026. <br />
                Please read these Terms carefully before using the Lexpal platform to search for or communicate with legal professionals.
            </p>

            <section id="acceptance">
                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing or using Lexpal, you agree to be bound by these Terms. If you do not agree, you must cease using the Platform immediately.
                </p>
            </section>

            <section id="services">
                <h2>2. Nature of Services</h2>
                <p>
                    <strong>2.1 Directory Only:</strong> Lexpal is a technology platform that connects users with independent lawyers.
                    <strong>We are not a law firm, and we do not provide legal advice.</strong> Detailed profiles are provided by the lawyers themselves.
                </p>
                <p>
                    <strong>2.2 No Attorney-Client Relationship:</strong> Use of the Platform does not create an attorney-client relationship between you and Lexpal.
                    Such a relationship is only formed between you and the Lawyer you choose to hire.
                </p>
            </section>

            <section id="accounts">
                <h2>3. Account Registration</h2>
                <p>
                    You must provide accurate and complete information when creating an account. You are responsible for all activities that occur under your account.
                    Services are available only to individuals who are at least 18 years old.
                </p>
            </section>

            <section id="payment">
                <h2>4. Payments</h2>
                <p>
                    Consultation fees are set by the individual Lawyers. Lexpal facilitates payments acting as a limited payment collection agent.
                    Successful payment through the Platform constitutes payment to the Lawyer.
                </p>
            </section>

            <section id="conduct">
                <h2>5. User Conduct</h2>
                <p>
                    You agree to treat all Lawyers and other users with respect. Harassment, abusive language, or fraudulent inquiries will result in immediate account suspension.
                </p>
            </section>

            <section id="liability">
                <h2>6. Disclaimers & Limitation of Liability</h2>
                <p>
                    LEXPAL DOES NOT GUARANTEE THE QUALITY, SUITABILITY, OR ACCURACY OF THE SERVICES PROVIDED BY LAWYERS LISTED ON THE SITE.
                    VERIFYING THE CREDENTIALS OF A LAWYER AND DETERMINING SUITABILITY IS SOLELY YOUR RESPONSIBILITY.
                </p>
            </section>

            <section id="termination">
                <h2>7. Termination</h2>
                <p>
                    Lexpal reserves the right to block, suspend, or terminate your account for violations of these Terms or for any other reason at our sole discretion, with or without notice.
                </p>
            </section>

            <section id="general">
                <h2>8. Dispute Resolution</h2>
                <p>
                    Any dispute between you and a Lawyer must be resolved directly with that Lawyer. Lexpal may facilitate dispute resolution but is under no obligation to do so.
                </p>
            </section>
        </>
    );

    return (
        <LegalPageLayout
            title="Terms of Service"
            lastUpdated="January 13, 2026"
            sections={sections}
            lawyerContent={lawyerContent}
            clientContent={clientContent}
        />
    );
}
