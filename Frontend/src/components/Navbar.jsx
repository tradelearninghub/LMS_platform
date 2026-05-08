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
      <div className="max-w-6xl mx-auto px-6 py-4 md:h-16 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        {/* Brand */}
        <Link
          to="/"
          className="text-lg md:text-xl font-bold tracking-tight text-text-primary hover:text-accent transition-colors duration-300"
        >
          Trade Learning Hub
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4 md:gap-8 overflow-x-auto md:overflow-visible pb-2 md:pb-0 w-full md:w-auto justify-center">
          <Link
            to="/courses"
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-300 whitespace-nowrap"
          >
            Courses
          </Link>
          <Link
            to="/research"
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-300 whitespace-nowrap"
          >
            Research
          </Link>

          {user && (
            <Link
              to="/dashboard"
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-300 whitespace-nowrap"
            >
              Dashboard
            </Link>
          )}

          {isAdmin && (
            <Link
              to="/admin"
              className="text-sm font-semibold text-accent/80 hover:text-accent transition-colors duration-300 whitespace-nowrap"
            >
              Admin
            </Link>
          )}

          {user ? (
            <button
              onClick={handleSignOut}
              id="nav-signout-btn"
              className="text-sm font-medium text-text-muted hover:text-text-primary transition-colors duration-300 cursor-pointer whitespace-nowrap"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/auth"
              className="text-sm px-4 py-1.5 border border-border hover:border-accent/50 hover:text-accent rounded-full transition-all duration-300 whitespace-nowrap"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
