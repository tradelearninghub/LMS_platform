import React from 'react';

const RefundPage = () => {
  return (
    <div className="bg-background min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-border p-8 md:p-12 shadow-sm">
        <h1 className="text-4xl font-bold text-text-primary mb-8 border-b border-border pb-4">Refund Policy</h1>
        
        <p className="text-text-muted mb-6">Last updated: May 01, 2026</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">1. Digital Product Policy</h2>
          <p className="text-text-secondary leading-relaxed">
            Due to the nature of digital content, once a course is purchased and access is granted, the "product" is considered consumed. Unlike physical goods, digital assets cannot be returned.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">2. Eligibility for Refunds</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            We offer a **7-day satisfaction guarantee** under the following conditions:
          </p>
          <ul className="list-disc pl-6 text-text-secondary space-y-2">
            <li>You have not viewed more than 20% of the course content.</li>
            <li>You have not downloaded any of the premium resources (PDFs, indicator files, etc.).</li>
            <li>You have a valid reason for dissatisfaction that our support team cannot resolve.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">3. Refund Process</h2>
          <p className="text-text-secondary leading-relaxed">
            To request a refund, please email <span className="text-accent font-medium">refunds@tradelearninghub.com</span> within 7 days of your purchase with your order ID and the reason for your request. Our team will review your account activity and process valid requests within 5-7 business days.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">4. Manual Verification Payments</h2>
          <p className="text-text-secondary leading-relaxed">
            For payments made via manual QR verification: Refunds will be processed back to the original source of payment. Please note that any transaction fees charged by your bank or payment app are non-refundable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">5. Exceptions</h2>
          <p className="text-text-secondary leading-relaxed">
            Refunds will not be granted for:
          </p>
          <ul className="list-disc pl-6 text-text-secondary space-y-2 mt-4">
            <li>Change of mind after completing the course.</li>
            <li>Failure to achieve specific trading results (as trading involves market risk).</li>
            <li>Account termination due to violation of our Terms of Service.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default RefundPage;
