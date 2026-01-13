"use client";

import LegalPageLayout from "@/components/LegalPageLayout";

export default function CookiesPolicy() {
    const sections = [
        { id: "what-are-cookies", title: "1. What Are Cookies?" },
        { id: "necessary", title: "2. Strictly Necessary Cookies" },
        { id: "performance", title: "3. Performance & Analytics" },
        { id: "functionality", title: "4. Functionality Cookies" },
        { id: "targeting", title: "5. Targeting & Ads" },
        { id: "management", title: "6. Managing Cookies" },
    ];

    /* ==================================================================================
       LAWYER CONTENT
       ================================================================================== */
    const lawyerContent = (
        <>
            <p className="lead">
                This Cookie Policy explains how Lexpal uses cookies and similar technologies to recognize you when you visit our Platform,
                specifically within the context of the Lawyer Dashboard and Practice Management tools.
            </p>

            <section id="what-are-cookies">
                <h2>1. What Are Cookies?</h2>
                <p>
                    Cookies are small data files placed on your device. They enable the Platform to remember your actions and preferences (such as login state, language, and font size)
                    so you don't have to keep re-entering them whenever you come back to the site.
                </p>
            </section>

            <section id="necessary">
                <h2>2. Strictly Necessary Cookies</h2>
                <p>
                    These cookies are essential for the operation of the Platform. They verify your identity and ensure the security of your session.
                    Without these, services like the <strong>Secure Document Workspace</strong> cannot be provided.
                </p>
                <ul>
                    <li><strong>AuthToken:</strong> Maintains your secure login session.</li>
                    <li><strong>CSRF-Token:</strong> Protects against Cross-Site Request Forgery attacks.</li>
                    <li><strong>LoadBalancer:</strong> Distributes traffic to prevent server overload.</li>
                </ul>
            </section>

            <section id="performance">
                <h2>3. Performance & Analytics Cookies</h2>
                <p>
                    We use these to understand how legal professionals use our tools. This data is aggregated and does not identify you individually.
                </p>
                <ul>
                    <li>Measuring the speed of AI drafting generation.</li>
                    <li>Tracking the usage frequency of specific case law search filters.</li>
                    <li>Identifying navigation errors or broken links within the dashboard.</li>
                </ul>
            </section>

            <section id="functionality">
                <h2>4. Functionality Cookies</h2>
                <p>
                    These allow the Platform to remember choices you make to provide enhanced, personalized features.
                </p>
                <ul>
                    <li>Remembering your preferred jurisdiction (e.g., "Delhi High Court") for default search scope.</li>
                    <li>Saving your dashboard workspace layout customization.</li>
                </ul>
            </section>

            <section id="targeting">
                <h2>5. Targeting & Advertising Cookies</h2>
                <p>
                    Lexpal does <strong>not</strong> use third-party advertising cookies within the professional Lawyer Dashboard. Your professional usage data is not used for ad targeting.
                </p>
            </section>

            <section id="management">
                <h2>6. Managing Cookies</h2>
                <p>
                    You can control cookie settings through your browser preferences. However, please note that disabling "Strictly Necessary" cookies will render the Platform unusable.
                </p>
            </section>
        </>
    );

    /* ==================================================================================
       CLIENT CONTENT
       ================================================================================== */
    const clientContent = (
        <>
            <p className="lead">
                To ensure you find the legal help you need quickly and securely, Lexpal uses cookies.
                This policy explains what they are and how you can control them.
            </p>

            <section id="what-are-cookies">
                <h2>1. What Are Cookies?</h2>
                <p>
                    Cookies are like small notes that our website saves on your browser. They help us remember things like your search location or your login status, making your experience smoother.
                </p>
            </section>

            <section id="necessary">
                <h2>2. Strictly Necessary Cookies</h2>
                <p>
                    These are required for the website to work. They keep your account secure and allow you to book appointments.
                </p>
                <ul>
                    <li>Keeping you logged in as you browse different lawyer profiles.</li>
                    <li>Ensuring your payment information is processed securely.</li>
                </ul>
            </section>

            <section id="performance">
                <h2>3. Performance Cookies</h2>
                <p>
                    These help us improve the website by tracking how it is used.
                </p>
                <ul>
                    <li>Counting how many people visit the site.</li>
                    <li>Seeing which pages (e.g., "Divorce Lawyers") are most popular.</li>
                    <li>Detecting if the website crashes or loads slowly.</li>
                </ul>
            </section>

            <section id="functionality">
                <h2>4. Functionality Cookies</h2>
                <p>
                    These cookies remember your preferences.
                </p>
                <ul>
                    <li>Remembering your selected city so you don't have to filter lists every time.</li>
                    <li>Remembering if you've dismissed a popup notification.</li>
                </ul>
            </section>

            <section id="targeting">
                <h2>5. Marketing Cookies</h2>
                <p>
                    We may use these cookies to show you relevant Lexpal ads on other websites or social media platforms.
                </p>
                <ul>
                    <li>We may use a "pixel" to see if you signed up after clicking an ad on Facebook.</li>
                    <li>We do NOT share your private case inquiry details with advertisers.</li>
                </ul>
            </section>

            <section id="management">
                <h2>6. Controlling Your Cookies</h2>
                <p>
                    Most web browsers allow you to block cookies. You can also use "Incognito" or "Private" mode to browse without saving cookies to your device.
                </p>
            </section>
        </>
    );

    return (
        <LegalPageLayout
            title="Cookie Policy"
            lastUpdated="January 13, 2026"
            sections={sections}
            lawyerContent={lawyerContent}
            clientContent={clientContent}
        />
    );
}
