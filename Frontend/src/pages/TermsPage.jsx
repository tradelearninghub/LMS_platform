import React from 'react';
import { Link } from 'react-router-dom';

const TermsPage = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto animate-fade-in-up">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-secondary transition-colors duration-300 mb-10">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
          Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-text-primary leading-tight mb-4">Terms of Service</h1>
        <p className="text-text-muted mb-10">Last updated: May 01, 2026</p>

        {/* SEBI Disclaimer */}
        <div className="mb-10 p-5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
          <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
          <div>
            <p className="text-sm font-semibold text-amber-800 mb-1">Important Regulatory Disclaimer</p>
            <p className="text-sm text-amber-700 leading-relaxed">
              Trade Learning Hub is <strong>not a SEBI (Securities and Exchange Board of India) registered investment advisor</strong>. All content provided on this platform is strictly for <strong>educational purposes only</strong>. Trading in financial markets involves substantial risk of loss and is not suitable for all investors. You should not invest money that you cannot afford to lose.
            </p>
          </div>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">1. Acceptance of Terms</h2>
            <p className="text-text-secondary leading-relaxed">
              By accessing or using Trade Learning Hub, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, you should not use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">2. Trading Risk Disclosure</h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-r-xl">
              <p className="text-red-700 font-medium text-sm">
                ⚠️ Trading financial markets involves significant risk. You can lose some or all of your capital. Past performance is not indicative of future results.
              </p>
            </div>
            <p className="text-text-secondary leading-relaxed">
              Trade Learning Hub provides educational content only. We are <strong>NOT financial advisors</strong> and <strong>NOT registered with SEBI</strong>. All strategies, signals, or analyses shared are for educational purposes and do not constitute financial advice or investment recommendations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">3. User Accounts</h2>
            <p className="text-text-secondary leading-relaxed">
              You are responsible for maintaining the confidentiality of your account credentials. Any activity that occurs under your account is your responsibility. We reserve the right to terminate accounts that violate our community guidelines.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">4. Intellectual Property</h2>
            <p className="text-text-secondary leading-relaxed">
              All course materials, including videos, PDFs, and text, are the exclusive property of Trade Learning Hub. You are granted a personal, non-transferable license to access the content. Sharing your account or redistributing our content without permission is strictly prohibited and will result in legal action.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">5. Limitation of Liability</h2>
            <p className="text-text-secondary leading-relaxed">
              Trade Learning Hub shall not be liable for any financial losses, damages, or consequences resulting from the application of the knowledge gained through our courses. You trade at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">6. Modifications to Service</h2>
            <p className="text-text-secondary leading-relaxed">
              We reserve the right to modify or discontinue any part of our service (including course content) at any time without prior notice.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
