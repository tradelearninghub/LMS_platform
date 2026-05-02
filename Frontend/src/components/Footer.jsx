import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Footer() {
  const { user } = useAuth();
  return (
    <footer className="bg-surface border-t border-border pt-16 pb-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="text-xl font-semibold tracking-tight text-text-primary mb-4 block hover:text-accent transition-colors">
              Trade Learning Hub
            </Link>
            <p className="text-text-muted leading-relaxed max-w-sm mb-6">
              Trade Learning Hub is an online platform dedicated to providing high-quality trading and skill-based courses to help learners grow and succeed in financial markets.
            </p>
            {/* Disclaimer Banner */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl max-w-sm">
              <p className="text-[10px] text-amber-700 leading-relaxed">
                <strong className="text-amber-800">Disclaimer:</strong> We are <strong>not SEBI registered advisors</strong>. All content is purely educational. Trading involves significant risk — you can lose some or all of your capital. Past performance is not indicative of future results.
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link to="/courses" className="text-text-secondary hover:text-accent transition-colors">Courses</Link></li>
              <li><Link to="/research" className="text-text-secondary hover:text-accent transition-colors">Research</Link></li>
              <li><Link to="/contact" className="text-text-secondary hover:text-accent transition-colors">Contact Us</Link></li>
              {user ? (
                <li><Link to="/dashboard" className="text-text-secondary hover:text-accent transition-colors">Dashboard</Link></li>
              ) : (
                <li><Link to="/auth" className="text-text-secondary hover:text-accent transition-colors">Sign In</Link></li>
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/terms" className="text-text-secondary hover:text-accent transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-text-secondary hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refund-policy" className="text-text-secondary hover:text-accent transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-text-muted">
              &copy; {new Date().getFullYear()} Trade Learning Hub. All rights reserved.
            </p>
            <p className="text-[10px] text-text-muted/60 mt-1">
              Trading in financial markets involves risk. Not SEBI registered. For educational purposes only.
            </p>
          </div>
          <div className="flex gap-4 text-text-muted">
            <a href="#" className="hover:text-accent transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.25.25-.43.25l.214-3.045 5.542-5.006c.24-.214-.053-.332-.371-.12L6.947 12.39l-2.95-.92c-.642-.2-.655-.642.134-.95l11.53-4.444c.534-.2.998.117.833.89z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
