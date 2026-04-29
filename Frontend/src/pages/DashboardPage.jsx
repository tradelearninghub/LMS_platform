import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import CourseCard from "../components/CourseCard";

export default function DashboardPage() {
  const { user } = useAuth();
  
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;

      // Fetch all courses
      const { data: coursesData } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch user purchases
      const { data: purchasesData } = await supabase
        .from('purchases')
        .select('course_id')
        .eq('user_id', user.id);

      if (coursesData && purchasesData) {
        const purchasedIds = purchasesData.map(p => p.course_id);
        
        setPurchasedCourses(coursesData.filter(c => purchasedIds.includes(c.id)));
        setAvailableCourses(coursesData.filter(c => !purchasedIds.includes(c.id)));
      }
      
      setLoading(false);
    }

    fetchData();
  }, [user]);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 animate-fade-in-up">
          <p className="text-sm text-text-muted uppercase tracking-widest mb-2">Dashboard</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-text-primary leading-tight">
            Welcome back{user?.email ? `, ${user.email.split("@")[0]}` : ""}
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Purchased Courses */}
            {purchasedCourses.length > 0 && (
          <section className="mb-20">
            <h2 className="text-xs font-medium text-text-muted uppercase tracking-widest mb-8">
              Continue Learning
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 stagger">
              {purchasedCourses.map((course) => (
                <CourseCard key={course.id} course={course} isPurchased />
              ))}
            </div>
          </section>
        )}

        {/* Available Courses */}
        {availableCourses.length > 0 && (
          <section>
            <h2 className="text-xs font-medium text-text-muted uppercase tracking-widest mb-8">
              Explore More
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 stagger">
              {availableCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>
        )}
      </>
    )}

        {/* Empty State */}
        {!loading && purchasedCourses.length === 0 && availableCourses.length === 0 && (
          <div className="text-center py-24 animate-fade-in">
            <p className="text-text-muted text-lg">No courses available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
