import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto animate-fade-in-up">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-secondary transition-colors duration-300 mb-10">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
          Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-text-primary leading-tight mb-4">Privacy Policy</h1>
        <p className="text-text-muted mb-10">Last updated: May 01, 2026</p>

        {/* Disclaimer */}
        <div className="mb-10 p-5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
          <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
          <div>
            <p className="text-sm font-semibold text-amber-800 mb-1">Disclaimer</p>
            <p className="text-sm text-amber-700 leading-relaxed">
              We are <strong>not SEBI registered advisors</strong>. Trading involves significant risk of financial loss. All content is for educational purposes only.
            </p>
          </div>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">1. Information We Collect</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              At Trade Learning Hub, we collect information to provide better services to our users. The types of information we collect include:
            </p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, and payment details when you register or purchase a course.</li>
              <li><strong>Usage Data:</strong> Information on how you interact with our platform, including progress in courses and login times.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, and device information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">2. How We Use Your Information</h2>
            <p className="text-text-secondary leading-relaxed">We use the collected data to:</p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2 mt-4">
              <li>Process your transactions and manage your access to courses.</li>
              <li>Send you important updates regarding your account or course changes.</li>
              <li>Improve our platform's functionality and user experience.</li>
              <li>Ensure the security of our services and prevent fraud.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">3. Data Security</h2>
            <p className="text-text-secondary leading-relaxed">
              We implement robust security measures to protect your personal information. We use Supabase for secure authentication and database management, ensuring that your data is encrypted and handled according to industry standards. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">4. Third-Party Services</h2>
            <p className="text-text-secondary leading-relaxed">
              We may use third-party services like Google Analytics or payment processors to facilitate our services. These third parties have access to your information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">5. Cookies</h2>
            <p className="text-text-secondary leading-relaxed">
              We use cookies to enhance your experience, remember your login status, and analyze traffic. You can choose to disable cookies through your browser settings, but some features of the platform may not function correctly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">6. Contact Us</h2>
            <p className="text-text-secondary leading-relaxed">
              If you have any questions about this Privacy Policy, please <Link to="/contact" className="text-accent hover:text-accent-hover transition-colors font-medium">contact us</Link> or email us at <span className="text-accent font-medium">tradelearninghub@gmail.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
