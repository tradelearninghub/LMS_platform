import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/send-contact-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-xs font-bold text-accent uppercase tracking-[0.25em] mb-4">Get In Touch</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-text-primary leading-tight mb-4">
            We'd love to hear<br />from you
          </h1>
          <p className="text-text-muted text-lg max-w-lg mx-auto">
            Have a question about our courses, need support, or just want to say hello? Drop us a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="p-6 bg-surface-card border border-border rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-1">Email Us</h3>
                  <p className="text-sm text-accent">tradelearninghub@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-surface-card border border-border rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-1">Response Time</h3>
                  <p className="text-sm text-text-muted">We typically respond within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-surface-card border border-border rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-1">Community</h3>
                  <p className="text-sm text-text-muted">Join our Telegram group for instant support</p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                <div>
                  <p className="text-xs font-semibold text-amber-800 mb-1">Important Disclaimer</p>
                  <p className="text-[11px] text-amber-700 leading-relaxed">We are <strong>not SEBI registered advisors</strong>. All content is for educational purposes only. Trading involves significant risk and you can lose your capital.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="p-8 bg-surface-card border border-border rounded-2xl">
              {status === "success" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">Message Sent!</h3>
                  <p className="text-text-muted text-sm mb-6">Thank you for reaching out. We'll get back to you shortly.</p>
                  <button onClick={() => setStatus(null)} className="text-sm text-accent hover:text-accent-hover transition-colors">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-text-muted uppercase tracking-widest mb-2">Your Name</label>
                      <input
                        name="name" required value={form.name} onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-surface-raised border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted/40 focus:border-accent/50 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-text-muted uppercase tracking-widest mb-2">Email</label>
                      <input
                        name="email" type="email" required value={form.email} onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 bg-surface-raised border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted/40 focus:border-accent/50 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted uppercase tracking-widest mb-2">Subject</label>
                    <input
                      name="subject" required value={form.subject} onChange={handleChange}
                      placeholder="e.g. Question about a course"
                      className="w-full px-4 py-3 bg-surface-raised border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted/40 focus:border-accent/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted uppercase tracking-widest mb-2">Message</label>
                    <textarea
                      name="message" required rows={5} value={form.message} onChange={handleChange}
                      placeholder="Tell us what's on your mind..."
                      className="w-full px-4 py-3 bg-surface-raised border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted/40 focus:border-accent/50 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <div className="p-3 bg-error/10 text-error rounded-xl text-xs text-center border border-error/20">
                      Something went wrong. Please try again or email us directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3.5 bg-text-primary text-surface font-semibold text-sm rounded-xl hover:bg-text-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-surface border-t-transparent rounded-full animate-spin" />
                        Sending…
                      </span>
                    ) : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
