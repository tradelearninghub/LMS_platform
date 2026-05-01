import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="bg-background min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-border p-8 md:p-12 shadow-sm">
        <h1 className="text-4xl font-bold text-text-primary mb-8 border-b border-border pb-4">Privacy Policy</h1>
        
        <p className="text-text-muted mb-6">Last updated: May 01, 2026</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">1. Information We Collect</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            At Trade Learning Hub, we collect information to provide better services to our users. The types of information we collect include:
          </p>
          <ul className="list-disc pl-6 text-text-secondary space-y-2">
            <li><strong>Personal Information:</strong> Name, email address, and payment details when you register or purchase a course.</li>
            <li><strong>Usage Data:</strong> Information on how you interact with our platform, including progress in courses and login times.</li>
            <li><strong>Technical Data:</strong> IP address, browser type, and device information.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">2. How We Use Your Information</h2>
          <p className="text-text-secondary leading-relaxed">
            We use the collected data to:
          </p>
          <ul className="list-disc pl-6 text-text-secondary space-y-2 mt-4">
            <li>Process your transactions and manage your access to courses.</li>
            <li>Send you important updates regarding your account or course changes.</li>
            <li>Improve our platform's functionality and user experience.</li>
            <li>Ensure the security of our services and prevent fraud.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">3. Data Security</h2>
          <p className="text-text-secondary leading-relaxed">
            We implement robust security measures to protect your personal information. We use Supabase for secure authentication and database management, ensuring that your data is encrypted and handled according to industry standards. However, no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">4. Third-Party Services</h2>
          <p className="text-text-secondary leading-relaxed">
            We may use third-party services like Google Analytics or payment processors to facilitate our services. These third parties have access to your information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">5. Cookies</h2>
          <p className="text-text-secondary leading-relaxed">
            We use cookies to enhance your experience, remember your login status, and analyze traffic. You can choose to disable cookies through your browser settings, but some features of the platform may not function correctly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">6. Contact Us</h2>
          <p className="text-text-secondary leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at <span className="text-accent font-medium">support@tradelearninghub.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
