import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export default function CourseDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Payment Modal State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentSubmitStatus, setPaymentSubmitStatus] = useState(null); // 'success' | 'error' | 'loading' | null
  const [universalQr, setUniversalQr] = useState("");

  useEffect(() => {
    async function fetchCourseAndStatus() {
      // Fetch course details
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();
        
      if (courseData && !courseError) {
        setCourse(courseData);
      }

      // Fetch Universal QR
      const { data: settingsData } = await supabase.from('platform_settings').select('universal_qr_url').eq('id', 1).single();
      if (settingsData) {
        setUniversalQr(settingsData.universal_qr_url);
      }
      
      // Check purchase status if user is logged in
      if (user && courseData) {
        const { data: purchaseData } = await supabase
          .from('purchases')
          .select('id')
          .eq('course_id', id)
          .eq('user_id', user.id)
          .single();
          
        if (purchaseData) {
          setIsPurchased(true);
        }
      }
      
      setLoading(false);
    }
    
    fetchCourseAndStatus();
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
          <Link to="/courses" className="text-sm text-accent hover:text-accent-hover transition-colors">
            ← Back to courses
          </Link>
        </div>
      </div>
    );
  }

  // If user is logged in and has purchased, redirect to unlocked view
  if (user && isPurchased) {
    navigate(`/dashboard/course/${id}`, { replace: true });
    return null;
  }

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(course.price);

  const formattedOriginalPrice = course.original_price ? new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(course.original_price) : null;

  const curriculumLines = course.curriculum.split("\n").filter(Boolean);

  const handleBuyNow = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setShowPaymentModal(true);
  };

  const submitPaymentVerification = async (e) => {
    e.preventDefault();
    setPaymentSubmitStatus("loading");

    const { error } = await supabase.from('payment_verifications').insert([{
      user_id: user.id,
      user_email: user.email, // Store email for easier admin view
      course_id: course.id,
      sender_name: senderName,
      phone_number: phoneNumber,
      transaction_id: transactionId,
      amount: course.price.toString()
    }]);

    if (error) {
      console.error(error);
      setPaymentSubmitStatus("error");
      return;
    }

    setPaymentSubmitStatus("success");
    setSenderName("");
    setPhoneNumber("");
    setTransactionId("");
  };

  return (
    <div className="min-h-screen pt-24 pb-24 px-6">
      <div className="max-w-3xl mx-auto animate-fade-in-up">
        {/* Breadcrumb */}
        <Link
          to="/courses"
          className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-secondary transition-colors duration-300 mb-10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          All Courses
        </Link>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium tracking-wide uppercase bg-accent/10 text-accent border border-accent/20 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Premium Course
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary leading-tight mb-6">
            {course.title}
          </h1>
          <p className="text-text-secondary leading-relaxed text-lg max-w-2xl mb-8">
            {course.description}
          </p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-text-muted border-y border-border py-4 mb-10">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{course.curriculum.split("\n").filter(Boolean).length} Modules</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>On-Demand Video</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Lifetime Access</span>
            </div>
          </div>
        </div>

        <div className="relative aspect-video rounded-3xl overflow-hidden border border-border shadow-2xl shadow-accent/5 mb-16 group">
          <img
            src={course.cover_image_url || "https://images.unsplash.com/photo-1590283603385-18ffb2a40c27?auto=format&fit=crop&w=1200&q=80"}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Curriculum */}
        <div className="mb-16">
          <h2 className="text-xs font-medium text-text-muted uppercase tracking-widest mb-6">
            Curriculum
          </h2>
          <div className="space-y-0 border border-border rounded-2xl overflow-hidden">
            {curriculumLines.map((line, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-6 py-4 border-b border-border last:border-b-0 hover:bg-surface-raised/50 transition-colors duration-300"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-surface-overlay border border-border flex items-center justify-center text-xs text-text-muted font-medium">
                  {i + 1}
                </span>
                <span className="text-sm text-text-secondary">{line}</span>
                {/* Lock icon */}
                <svg className="w-4 h-4 text-text-muted/40 ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Purchase Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-xl border-t border-border py-4 px-6 z-40">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-0.5">Full access</p>
              <div className="flex items-center gap-3">
                <p className="text-2xl font-bold text-text-primary tracking-tight">{formattedPrice}</p>
                {formattedOriginalPrice && (
                  <p className="text-sm text-text-muted line-through decoration-text-muted/50">{formattedOriginalPrice}</p>
                )}
              </div>
            </div>
            <button
              onClick={handleBuyNow}
              id="buy-now-btn"
              className="px-8 py-3 bg-accent text-surface font-semibold text-sm rounded-full hover:bg-accent-hover transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* PAYMENT MODAL */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface border border-border rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-slide-in relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => {
                setShowPaymentModal(false);
                setPaymentSubmitStatus(null);
              }}
              className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary rounded-full hover:bg-surface-raised transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {paymentSubmitStatus === "success" ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Verification Submitted!</h3>
                <p className="text-text-secondary text-sm">We've received your transaction details. The admin will verify the payment and grant access shortly.</p>
                <button onClick={() => setShowPaymentModal(false)} className="mt-8 w-full py-3 bg-surface-raised text-text-primary rounded-xl font-medium hover:bg-border transition-colors">Close</button>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-text-primary mb-1">Checkout</h3>
                  <p className="text-text-secondary text-sm">Scan the QR code to pay {formattedPrice}</p>
                </div>

                <div className="mb-8 flex justify-center">
                  <div className="p-4 bg-white rounded-2xl shadow-inner border border-gray-200">
                    {(course.qr_image_url || universalQr) ? (
                      <img 
                        src={course.qr_image_url || universalQr} 
                        alt="Payment QR Code" 
                        className="w-48 h-48 object-contain rounded-lg"
                      />
                    ) : (
                      <div className="w-48 h-48 flex items-center justify-center bg-gray-50 rounded-lg text-gray-400 text-sm text-center p-4">
                        Admin has not set up a QR code yet.
                      </div>
                    )}
                  </div>
                </div>

                <form onSubmit={submitPaymentVerification} className="space-y-4">
                  {paymentSubmitStatus === "error" && (
                    <div className="p-3 bg-error/10 text-error rounded-xl text-xs text-center border border-error/20">
                      Something went wrong. Please try again.
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-xs font-medium text-text-muted uppercase tracking-widest mb-1.5">Sender Name</label>
                    <input 
                      type="text" 
                      required 
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Name on bank account"
                      className="w-full px-4 py-3 bg-surface-raised border border-border rounded-xl text-sm text-text-primary focus:border-accent/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted uppercase tracking-widest mb-1.5">Phone Number (WhatsApp)</label>
                    <input 
                      type="tel" 
                      required 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. +91 9876543210"
                      className="w-full px-4 py-3 bg-surface-raised border border-border rounded-xl text-sm text-text-primary focus:border-accent/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted uppercase tracking-widest mb-1.5">Transaction ID / UTR</label>
                    <input 
                      type="text" 
                      required 
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="e.g. 123456789012"
                      className="w-full px-4 py-3 bg-surface-raised border border-border rounded-xl text-sm text-text-primary focus:border-accent/50 focus:outline-none transition-colors font-mono"
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={paymentSubmitStatus === "loading" || !(course.qr_image_url || universalQr)}
                    className="w-full mt-4 py-3.5 bg-accent text-surface font-semibold text-sm rounded-xl hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {paymentSubmitStatus === "loading" ? "Submitting..." : "Submit Proof of Payment"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
