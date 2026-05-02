import React from 'react';
import { Link } from 'react-router-dom';

const RefundPage = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto animate-fade-in-up">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-secondary transition-colors duration-300 mb-10">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
          Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-text-primary leading-tight mb-4">Refund Policy</h1>
        <p className="text-text-muted mb-10">Last updated: May 01, 2026</p>

        {/* Disclaimer */}
        <div className="mb-10 p-5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
          <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
          <div>
            <p className="text-sm font-semibold text-amber-800 mb-1">Disclaimer</p>
            <p className="text-sm text-amber-700 leading-relaxed">
              We are <strong>not SEBI registered advisors</strong>. Trading involves risk and you may lose your capital. Courses are educational only — refunds cannot be granted for trading losses.
            </p>
          </div>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">1. Digital Product Policy</h2>
            <p className="text-text-secondary leading-relaxed">
              Due to the nature of digital content, once a course is purchased and access is granted, the "product" is considered consumed. Unlike physical goods, digital assets cannot be returned.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">2. Eligibility for Refunds</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              We offer a <strong>7-day satisfaction guarantee</strong> under the following conditions:
            </p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li>You have not viewed more than 20% of the course content.</li>
              <li>You have not downloaded any of the premium resources (PDFs, indicator files, etc.).</li>
              <li>You have a valid reason for dissatisfaction that our support team cannot resolve.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">3. Refund Process</h2>
            <p className="text-text-secondary leading-relaxed">
              To request a refund, please <Link to="/contact" className="text-accent hover:text-accent-hover transition-colors font-medium">contact us</Link> or email <span className="text-accent font-medium">tradelearninghub@gmail.com</span> within 7 days of your purchase with your order ID and the reason for your request. Our team will review your account activity and process valid requests within 5–7 business days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">4. Manual Verification Payments</h2>
            <p className="text-text-secondary leading-relaxed">
              For payments made via manual QR verification: Refunds will be processed back to the original source of payment. Please note that any transaction fees charged by your bank or payment app are non-refundable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">5. Exceptions</h2>
            <p className="text-text-secondary leading-relaxed mb-4">Refunds will not be granted for:</p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li>Change of mind after completing the course.</li>
              <li>Failure to achieve specific trading results (as trading involves market risk).</li>
              <li>Account termination due to violation of our Terms of Service.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPage;
