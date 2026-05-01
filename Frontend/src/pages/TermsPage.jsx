import React from 'react';

const TermsPage = () => {
  return (
    <div className="bg-background min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-border p-8 md:p-12 shadow-sm">
        <h1 className="text-4xl font-bold text-text-primary mb-8 border-b border-border pb-4">Terms of Service</h1>
        
        <p className="text-text-muted mb-6">Last updated: May 01, 2026</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">1. Acceptance of Terms</h2>
          <p className="text-text-secondary leading-relaxed">
            By accessing or using Trade Learning Hub, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, you should not use our platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">2. Trading Risk Disclosure</h2>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700 font-medium">
              Trading financial markets involves significant risk. You can lose some or all of your capital.
            </p>
          </div>
          <p className="text-text-secondary leading-relaxed">
            Trade Learning Hub provides educational content only. We are NOT financial advisors. All strategies, signals, or analyses shared are for educational purposes and do not constitute financial advice. Past performance is not indicative of future results.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">3. User Accounts</h2>
          <p className="text-text-secondary leading-relaxed">
            You are responsible for maintaining the confidentiality of your account credentials. Any activity that occurs under your account is your responsibility. We reserve the right to terminate accounts that violate our community guidelines.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">4. Intellectual Property</h2>
          <p className="text-text-secondary leading-relaxed">
            All course materials, including videos, PDFs, and text, are the exclusive property of Trade Learning Hub. You are granted a personal, non-transferable license to access the content. Sharing your account or redistributing our content without permission is strictly prohibited and will result in legal action.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">5. Limitation of Liability</h2>
          <p className="text-text-secondary leading-relaxed">
            Trade Learning Hub shall not be liable for any financial losses, damages, or consequences resulting from the application of the knowledge gained through our courses. You trade at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">6. Modifications to Service</h2>
          <p className="text-text-secondary leading-relaxed">
            We reserve the right to modify or discontinue any part of our service (including course content) at any time without prior notice.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
