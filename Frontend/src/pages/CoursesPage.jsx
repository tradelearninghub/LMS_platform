import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import CourseCard from "../components/CourseCard";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (!error && data) {
        setCourses(data);
      }
      setLoading(false);
    }
    
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20 animate-fade-in-up">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-text-primary leading-[1.1] mb-6">
              Our <span className="text-accent">Curriculum</span>
            </h1>
            <p className="text-lg text-text-muted leading-relaxed">
              Carefully curated programs designed to take you from market basics to consistent profitability. 
              Each course is built with intention, practical insights, and professional strategies.
            </p>
          </div>
          <div className="flex-1 w-full hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Trading Analysis" 
              className="w-full h-64 object-cover rounded-3xl border border-border shadow-2xl shadow-accent/5"
            />
          </div>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 stagger">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-text-muted">
            <p>No courses available right now. Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
}
