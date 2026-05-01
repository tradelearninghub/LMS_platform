import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-surface/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-text-primary hover:text-accent transition-colors duration-300"
        >
          Trade Learning Hub
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          <Link
            to="/courses"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300"
          >
            Courses
          </Link>
          <Link
            to="/research"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300"
          >
            Research
          </Link>

          {user && (
            <Link
              to="/dashboard"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300"
            >
              Dashboard
            </Link>
          )}

          {isAdmin && (
            <Link
              to="/admin"
              className="text-sm text-accent/80 hover:text-accent transition-colors duration-300"
            >
              Admin
            </Link>
          )}

          {user ? (
            <button
              onClick={handleSignOut}
              id="nav-signout-btn"
              className="text-sm text-text-muted hover:text-text-primary transition-colors duration-300 cursor-pointer"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/auth"
              className="text-sm px-5 py-2 border border-border hover:border-accent/50 hover:text-accent rounded-full transition-all duration-300"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
