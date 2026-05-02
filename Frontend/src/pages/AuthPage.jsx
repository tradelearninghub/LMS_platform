import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
        navigate("/dashboard");
      } else {
        await signUp(email, password);
        // Show verification message instead of navigating
        setShowVerifyEmail(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-16">
      <div className="w-full max-w-sm animate-fade-in-up">

        {/* Email Verification Popup */}
        {showVerifyEmail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-surface border border-border rounded-3xl p-8 max-w-md w-full shadow-2xl animate-fade-in-up text-center">
              {/* Email Icon */}
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-text-primary mb-3">Check Your Email</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-2">
                We've sent a verification link to
              </p>
              <p className="text-accent font-semibold text-sm mb-4">{email}</p>
              <p className="text-text-muted text-xs leading-relaxed mb-8">
                Please click the link in your email to verify your account before signing in. 
                Don't forget to check your <span className="font-medium text-text-secondary">spam/junk</span> folder if you don't see it.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowVerifyEmail(false);
                    setIsLogin(true);
                    setEmail("");
                    setPassword("");
                  }}
                  className="w-full py-3 bg-text-primary text-surface font-medium text-sm rounded-xl hover:bg-text-primary/90 transition-all duration-300 cursor-pointer"
                >
                  Go to Sign In
                </button>
                <p className="text-xs text-text-muted">
                  Didn't receive the email?{" "}
                  <button
                    onClick={() => {
                      setShowVerifyEmail(false);
                      setIsLogin(false);
                    }}
                    className="text-accent hover:text-accent-hover transition-colors cursor-pointer"
                  >
                    Try again
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary mb-2">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-text-muted">
            {isLogin
              ? "Sign in to continue learning"
              : "Start your learning journey today"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="auth-email" className="block text-xs font-medium text-text-secondary mb-2 uppercase tracking-wider">
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 bg-surface-raised border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted/50 focus:border-accent/50 focus:outline-none transition-colors duration-300"
            />
          </div>

          <div>
            <label htmlFor="auth-password" className="block text-xs font-medium text-text-secondary mb-2 uppercase tracking-wider">
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full px-4 py-3 bg-surface-raised border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted/50 focus:border-accent/50 focus:outline-none transition-colors duration-300"
            />
          </div>

          {error && (
            <p className="text-sm text-error animate-fade-in">{error}</p>
          )}

          <button
            type="submit"
            id="auth-submit-btn"
            disabled={loading}
            className="w-full py-3 mt-2 bg-text-primary text-surface font-medium text-sm rounded-xl hover:bg-text-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-surface border-t-transparent rounded-full animate-spin" />
                Processing…
              </span>
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center mt-8 text-sm text-text-muted">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setShowVerifyEmail(false);
            }}
            id="auth-toggle-btn"
            className="text-accent hover:text-accent-hover transition-colors duration-300 cursor-pointer"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
