import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function LandingPage() {
  const { user } = useAuth();
  const [latestCourses, setLatestCourses] = useState([]);
  const [purchasedCourseIds, setPurchasedCourseIds] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      const { data } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
        
      if (data) {
        setLatestCourses(data);
      }
    async function fetchPurchases() {
      if (!user) return;
      const { data } = await supabase.from('purchases').select('course_id').eq('user_id', user.id);
      if (data) setPurchasedCourseIds(data.map(p => p.course_id));
    }

    fetchCourses();
    fetchPurchases();
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 md:pt-16 relative overflow-hidden">
      {/* Glow removed */}

      <div className="relative text-left max-w-6xl mx-auto w-full animate-fade-in-up">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1">
            {/* Eyebrow */}
            <p className="text-xs font-medium text-accent uppercase tracking-[0.25em] mb-6">
              Premium Trading Education
            </p>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-text-primary leading-[1.05] mb-6">
              Trade with
              <br />
              <span className="text-text-muted">precision.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-text-muted leading-relaxed max-w-md mb-12">
              Carefully crafted courses designed for market mastery. 
              Learn professional trading strategies, risk management, and technical analysis.
            </p>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <Link
                to="/courses"
                id="landing-explore-btn"
                className="px-8 py-3.5 bg-text-primary text-surface font-medium text-sm rounded-full hover:bg-text-primary/90 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                Explore Courses
              </Link>
              {!user && (
                <Link
                  to="/auth"
                  id="landing-signin-btn"
                  className="px-8 py-3.5 border border-border text-text-secondary font-medium text-sm rounded-full hover:border-border-hover hover:text-text-primary transition-all duration-300"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full transform -translate-x-10 translate-y-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80" 
              alt="Trading Charts" 
              className="relative z-10 w-full h-[500px] object-cover rounded-3xl border border-border/50 shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Features/Stats Section */}
      <div className="relative mt-32 max-w-5xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div>
          <h3 className="text-3xl font-bold text-text-primary mb-2">10k+</h3>
          <p className="text-sm text-text-muted">Active Traders</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-text-primary mb-2">50+</h3>
          <p className="text-sm text-text-muted">Premium Strategies</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-text-primary mb-2">24/7</h3>
          <p className="text-sm text-text-muted">Community Access</p>
        </div>
      </div>

      {/* Latest Courses Section */}
      <div className="relative w-full bg-surface-raised py-24 border-t border-border mt-10">
        <div className="max-w-6xl mx-auto px-6 animate-fade-in-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold text-text-primary mb-4">Latest Courses</h2>
            <p className="text-text-muted text-lg max-w-xl mx-auto">Enhance your skills with our most recently updated curriculum. Start your journey today.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestCourses.map(course => (
              <div key={course.id} className="bg-surface-card border border-border rounded-3xl overflow-hidden hover:border-accent/30 transition-all duration-300 flex flex-col group hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5">
                <div className="relative h-56 overflow-hidden bg-surface">
                  <img 
                    src={course.cover_image_url || "https://images.unsplash.com/photo-1590283603385-18ffb2a40c27?auto=format&fit=crop&w=600&q=80"} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay removed */}
                  <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5">
                    {course.original_price && course.original_price > course.price && (
                      <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-success text-white rounded-md shadow-sm">
                        {Math.round(((course.original_price - course.price) / course.original_price) * 100)}% OFF
                      </span>
                    )}
                    <span className="px-3 py-1 text-xs font-bold bg-accent text-surface border border-accent rounded-full shadow-lg shadow-accent/20">
                      ₹{course.price}
                    </span>
                    {course.original_price && (
                      <span className="px-2 py-0.5 text-[10px] font-medium text-text-muted bg-surface/70 border border-border rounded-full backdrop-blur-sm line-through">
                        ₹{course.original_price}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors">{course.title}</h3>
                  <p className="text-sm text-text-muted mb-6 line-clamp-2 leading-relaxed">{course.description}</p>
                  
                  <div className="mb-8 flex-1">
                    <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-4">Curriculum Includes:</h4>
                    <ul className="text-sm text-text-muted space-y-3">
                      {course.curriculum?.split('\n').slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          <span className="leading-tight">{item}</span>
                        </li>
                      ))}
                      {(course.curriculum?.split('\n').length > 3) && (
                        <li className="text-xs italic text-text-muted/50 mt-2 pl-7">...and more modules</li>
                      )}
                    </ul>
                  </div>
                  
                  {purchasedCourseIds.includes(course.id) ? (
                    <div className="pt-4 border-t border-border mt-auto">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-success">
                        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                        Purchased & Unlocked
                      </span>
                    </div>
                  ) : (
                    <Link 
                      to={`/courses/${course.id}`}
                      className="block w-full py-4 bg-accent/10 text-accent text-center rounded-xl font-medium hover:bg-accent hover:text-surface transition-all duration-300"
                    >
                      Join Now
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="relative w-full py-24 px-6 overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-x-1/2" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-4">Our Advantage</p>
            <h2 className="text-3xl md:text-5xl font-semibold text-text-primary">Why Choose Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Expert Mentorship",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
                brief: "Learn from seasoned traders with over 10 years of experience in global markets. Our mentors provide personalized guidance to help you navigate complex trading scenarios and build a robust strategy from scratch. We don't just teach theory; we show you how to apply it in real-world situations with confidence."
              },
              {
                title: "Live Trading Sessions",
                image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
                brief: "Experience real-time market analysis and trade execution. Watch how professionals handle live market volatility and learn to make quick, informed decisions based on current price action. These sessions provide invaluable insights into the psychology of trading and risk management that you can't get from textbooks alone."
              },
              {
                title: "Active Community",
                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
                brief: "Join a thriving community of like-minded traders. Share ideas, discuss strategies, and grow together in a supportive environment designed to keep you motivated and accountable. Networking with other traders allows you to see different perspectives and stay ahead of market trends while building lasting professional relationships."
              }
            ].map((item, i) => (
              <WhyChooseCard key={i} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}

function WhyChooseCard({ item }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group flex flex-col animate-fade-in-up">
      <div className="relative h-64 mb-6 overflow-hidden rounded-2xl border border-border shadow-lg">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors">
        {item.title}
      </h3>
      
      <div className="relative">
        <p className={`text-sm text-text-muted leading-relaxed transition-all duration-300 ${!isExpanded ? 'line-clamp-2' : ''}`}>
          {item.brief}
        </p>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-xs font-bold text-accent uppercase tracking-wider hover:text-accent-hover transition-colors flex items-center gap-1"
        >
          {isExpanded ? (
            <>Show Less <svg className="w-3 h-3 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg></>
          ) : (
            <>Read More <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg></>
          )}
        </button>
      </div>
    </div>
  );
}
