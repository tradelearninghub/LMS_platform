import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export default function UnlockedCoursePage() {
  const { id } = useParams();
  const { user } = useAuth();
  
  const [course, setCourse] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!user) {
        setLoading(false);
        return;
      }

      // Fetch course
      const { data: courseData } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();
        
      if (courseData) {
        setCourse(courseData);
      }

      // Check purchase
      const { data: purchaseData } = await supabase
        .from('purchases')
        .select('id')
        .eq('course_id', id)
        .eq('user_id', user.id)
        .single();

      if (purchaseData) {
        setIsPurchased(true);
      }
      
      setLoading(false);
    }
    
    fetchData();
  }, [id, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center animate-fade-in">
          <h1 className="text-2xl font-semibold text-text-primary mb-2">Course not found</h1>
          <Link to="/dashboard" className="text-sm text-accent hover:text-accent-hover transition-colors">
            ← Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!isPurchased) {
    return <Navigate to={`/courses/${id}`} replace />;
  }

  return (
    <div className="min-h-screen pt-24 pb-24 px-6">
      <div className="max-w-3xl mx-auto animate-fade-in-up">
        {/* Breadcrumb */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-secondary transition-colors duration-300 mb-10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          Dashboard
        </Link>

        {/* Course Header */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium tracking-wide uppercase bg-success/10 text-success border border-success/20 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            Full Access
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-text-primary leading-tight mb-3">
            {course.title}
          </h1>
          <p className="text-text-muted leading-relaxed">
            {course.video_title}
          </p>
        </div>

        {/* Module List */}
        <div className="space-y-3 mt-8">
          {course.locked_urls && course.locked_urls.map((mod, i) => (
            <a
              key={i}
              href={mod.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full group flex items-center gap-5 px-6 py-5 border rounded-2xl transition-all duration-300 text-left bg-surface-card border-border hover:border-accent/40 hover:bg-surface-raised/50 shadow-sm hover:shadow-md"
            >
              {/* Module number */}
              <span className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-300 bg-surface-overlay border border-border text-text-muted group-hover:text-accent group-hover:border-accent/30 group-hover:bg-accent/5">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Module title */}
              <span className="text-sm transition-colors duration-300 flex-1 text-text-secondary group-hover:text-text-primary font-medium">
                {mod.title}
              </span>

              {/* External icon */}
              <span className="flex items-center gap-2 text-xs text-text-muted/60 group-hover:text-accent transition-colors">
                Open Drive
                <svg
                  className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
