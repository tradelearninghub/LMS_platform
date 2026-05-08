import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("courses");

  // Courses Tab State
  const [form, setForm] = useState({
    title: "",
    cover_image_url: "",
    qr_image_url: "",
    description: "",
    curriculum: "",
    price: "",
    original_price: "",
  });
  const [lockedUrls, setLockedUrls] = useState([{ title: "", url: "" }]);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [existingCourses, setExistingCourses] = useState([]);
  const [editingCourseId, setEditingCourseId] = useState(null);
  
  // Drag-and-drop state for course ordering
  const [draggedCourseIdx, setDraggedCourseIdx] = useState(null);
  const [orderChanged, setOrderChanged] = useState(false);

  // Payments Tab State
  const [pendingPayments, setPendingPayments] = useState([]);
  const [screenshotLightbox, setScreenshotLightbox] = useState(null);

  // Settings Tab State
  const [universalQr, setUniversalQr] = useState("");
  const [settingsStatus, setSettingsStatus] = useState(null);

  // Users Tab State
  const [allUsersData, setAllUsersData] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
    // Also fetch users and payments once at start for global stats if not already in that tab
    if (activeTab !== "users" && activeTab !== "payments") {
      fetchGlobalStatsData();
    }
  }, [activeTab]);

  async function fetchGlobalStatsData() {
    const { data: purchasesData } = await supabase.from('purchases').select('*');
    const { data: paymentsData } = await supabase.from('payment_verifications').select('*');
    const { data: coursesData } = await supabase.from('courses').select('id, title');
    
    if (purchasesData && paymentsData && coursesData) {
      const usersMap = {};
      paymentsData.forEach(p => {
        if (p.status === 'approved') {
          if (!usersMap[p.user_id]) usersMap[p.user_id] = { id: p.user_id, email: p.user_email, enrollments: [] };
          const course = coursesData.find(c => c.id === p.course_id);
          if (course) {
            usersMap[p.user_id].enrollments.push({ amount: p.amount });
          }
        }
      });
      setAllUsersData(Object.values(usersMap));
    }
    
    const { data: pendingData } = await supabase.from('payment_verifications').select('id').eq('status', 'pending');
    if (pendingData) setPendingPayments(pendingData);
  }

  async function fetchData() {
    setIsLoading(true);
    if (activeTab === "courses") {
      const { data } = await supabase.from('courses').select('*').order('display_order', { ascending: true });
      if (data) setExistingCourses(data);
    } else if (activeTab === "payments") {
      // Fetch pending payments and join user email and course title
      const { data, error } = await supabase
        .from('payment_verifications')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Error fetching payments:", error);
      }
        
      if (data && !error) {
        // Fetch courses separately to avoid Foreign Key relation issues since course_id is TEXT
        const courseIds = [...new Set(data.map(p => p.course_id))];
        const { data: coursesData } = await supabase
          .from('courses')
          .select('id, title')
          .in('id', courseIds);

        const paymentsWithCourses = data.map(p => ({
          ...p,
          course: coursesData?.find(c => c.id === p.course_id)
        }));

        setPendingPayments(paymentsWithCourses);
      }
    } else if (activeTab === "settings") {
      const { data } = await supabase.from('platform_settings').select('*').eq('id', 1).single();
      if (data) setUniversalQr(data.universal_qr_url || "");
    } else if (activeTab === "users") {
      // Fetch ALL users from user_profiles (includes non-purchasers)
      const { data: profilesData } = await supabase.from('user_profiles').select('*').order('created_at', { ascending: false });
      const { data: purchasesData } = await supabase.from('purchases').select('*');
      const { data: paymentsData } = await supabase.from('payment_verifications').select('*');
      const { data: coursesData } = await supabase.from('courses').select('id, title');
      
      if (profilesData && coursesData) {
        const usersMap = {};
        
        // First, add ALL users from profiles
        profilesData.forEach(profile => {
          usersMap[profile.id] = {
            id: profile.id,
            email: profile.email,
            created_at: profile.created_at,
            last_sign_in: profile.last_sign_in,
            enrollments: {}
          };
        });
        
        // Then enrich with payment/purchase data
        if (paymentsData) {
          paymentsData.forEach(p => {
            if (p.status === 'approved') {
              if (!usersMap[p.user_id]) {
                usersMap[p.user_id] = { id: p.user_id, email: p.user_email, enrollments: {} };
              }
              const course = coursesData.find(c => c.id === p.course_id);
              if (course) {
                const hasAccess = purchasesData?.some(pur => pur.user_id === p.user_id && pur.course_id === p.course_id);
                usersMap[p.user_id].enrollments[p.course_id] = {
                  course_id: p.course_id,
                  course_title: course.title,
                  date: p.created_at,
                  amount: p.amount,
                  transaction_id: p.transaction_id,
                  phone_number: p.phone_number,
                  has_access: hasAccess,
                  purchase_id: purchasesData?.find(pur => pur.user_id === p.user_id && pur.course_id === p.course_id)?.id || null
                };
              }
            }
          });
        }
        
        const formattedUsers = Object.values(usersMap).map(u => ({
          ...u,
          enrollments: Object.values(u.enrollments || {})
        }));
        setAllUsersData(formattedUsers);
      }
    }
    setIsLoading(false);
  }

  // Calculate Stats
  const totalUsers = allUsersData.length;
  const totalRevenue = allUsersData.reduce((acc, user) => 
    acc + user.enrollments.reduce((sum, enr) => sum + parseInt(enr.amount || 0), 0), 0
  );
  const pendingCount = pendingPayments.length;

  // --- Courses Logic ---
  const handleCourseChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleLockedUrlChange = (i, field, value) => {
    const updated = [...lockedUrls];
    updated[i][field] = value;
    setLockedUrls(updated);
  };
  const addLockedUrl = () => setLockedUrls([...lockedUrls, { title: "", url: "" }]);
  const removeLockedUrl = (i) => setLockedUrls(lockedUrls.filter((_, idx) => idx !== i));

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('courses').insert([{
      title: form.title,
      cover_image_url: form.cover_image_url,
      qr_image_url: form.qr_image_url,
      description: form.description,
      curriculum: form.curriculum,
      price: parseInt(form.price, 10),
      original_price: form.original_price ? parseInt(form.original_price, 10) : null,
      locked_urls: lockedUrls.filter((u) => u.title && u.url)
    }]).select();

    if (error) {
      setSubmitStatus("error");
      setErrorMessage(error.message);
      return;
    }

    setExistingCourses([...data, ...existingCourses]);
    setSubmitStatus("success");
    setForm({ title: "", cover_image_url: "", qr_image_url: "", description: "", curriculum: "", price: "", original_price: "" });
    setLockedUrls([{ title: "", url: "" }]);
    setTimeout(() => setSubmitStatus(null), 3000);
  };

  const handleEditCourse = (course) => {
    setEditingCourseId(course.id);
    setForm({
      title: course.title,
      cover_image_url: course.cover_image_url,
      qr_image_url: course.qr_image_url || "",
      description: course.description,
      curriculum: course.curriculum,
      price: course.price.toString(),
      original_price: course.original_price ? course.original_price.toString() : "",
    });
    setLockedUrls(course.locked_urls.length > 0 ? course.locked_urls : [{ title: "", url: "" }]);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('courses').update({
      title: form.title,
      cover_image_url: form.cover_image_url,
      qr_image_url: form.qr_image_url,
      description: form.description,
      curriculum: form.curriculum,
      price: parseInt(form.price, 10),
      original_price: form.original_price ? parseInt(form.original_price, 10) : null,
      locked_urls: lockedUrls.filter((u) => u.title && u.url)
    }).eq('id', editingCourseId);

    if (error) {
      setSubmitStatus("error");
      setErrorMessage(error.message);
      return;
    }

    setSubmitStatus("success");
    setEditingCourseId(null);
    setForm({ title: "", cover_image_url: "", qr_image_url: "", description: "", curriculum: "", price: "", original_price: "" });
    setLockedUrls([{ title: "", url: "" }]);
    fetchData(); // Refresh list
    setTimeout(() => setSubmitStatus(null), 3000);
  };

  const handleCancelEdit = () => {
    setEditingCourseId(null);
    setForm({ title: "", cover_image_url: "", qr_image_url: "", description: "", curriculum: "", price: "", original_price: "" });
    setLockedUrls([{ title: "", url: "" }]);
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    const { error } = await supabase.from('courses').delete().eq('id', id);
    if (!error) setExistingCourses(existingCourses.filter(c => c.id !== id));
  };

  // --- Settings Logic ---
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('platform_settings').upsert({ id: 1, universal_qr_url: universalQr });
    if (!error) {
      setSettingsStatus("success");
      setTimeout(() => setSettingsStatus(null), 3000);
    } else {
      setSettingsStatus("error");
    }
  };

  // --- Payments Logic ---
  const handleApprovePayment = async (payment) => {
    if (!window.confirm("Approve this payment and grant access?")) return;

    // 1. Update verification status
    await supabase.from('payment_verifications').update({ status: 'approved' }).eq('id', payment.id);
    
    // 2. Insert into purchases
    await supabase.from('purchases').insert([{
      user_id: payment.user_id,
      course_id: payment.course_id
    }]);

    // 3. Send email via our backend
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/send-approval-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: payment.user_email,
          courseTitle: payment.course?.title || "Your Course"
        })
      });
    } catch (e) {
      console.log("Failed to send email, but access granted", e);
    }

    setPendingPayments(pendingPayments.filter(p => p.id !== payment.id));
    alert("Payment approved and access granted!");
  };

  const handleRejectPayment = async (paymentId) => {
    if (!window.confirm("Reject this payment?")) return;
    await supabase.from('payment_verifications').update({ status: 'rejected' }).eq('id', paymentId);
    setPendingPayments(pendingPayments.filter(p => p.id !== paymentId));
  };

  // --- Users Logic ---
  const handleToggleAccess = async (userId, courseId, currentAccess) => {
    if (currentAccess) {
      if (!window.confirm("Revoke access to this course?")) return;
      await supabase.from('purchases').delete().eq('user_id', userId).eq('course_id', courseId);
    } else {
      if (!window.confirm("Grant access to this course?")) return;
      await supabase.from('purchases').insert([{ user_id: userId, course_id: courseId }]);
    }
    fetchData();
  };

  // --- Drag and Drop Course Ordering ---
  const handleDragStart = (idx) => setDraggedCourseIdx(idx);
  const handleDragOver = (e, idx) => {
    e.preventDefault();
    if (draggedCourseIdx === null || draggedCourseIdx === idx) return;
    const reordered = [...existingCourses];
    const [moved] = reordered.splice(draggedCourseIdx, 1);
    reordered.splice(idx, 0, moved);
    setExistingCourses(reordered);
    setDraggedCourseIdx(idx);
    setOrderChanged(true);
  };
  const handleDragEnd = () => setDraggedCourseIdx(null);

  const handleSaveOrder = async () => {
    const updates = existingCourses.map((c, i) => 
      supabase.from('courses').update({ display_order: i }).eq('id', c.id)
    );
    await Promise.all(updates);
    setOrderChanged(false);
    alert("Course order saved!");
  };

  const inputClasses = "w-full px-4 py-3 bg-surface-raised border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted/40 focus:border-accent/50 focus:outline-none transition-colors duration-300";
  const labelClasses = "block text-xs font-medium text-text-muted uppercase tracking-widest mb-2";

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-text-primary leading-tight">
              Admin Dashboard
            </h1>
            <p className="text-text-muted mt-2">Manage your courses, payments, and students.</p>
          </div>
          
          <div className="flex gap-4">
            <div className="px-5 py-3 bg-surface-card border border-border rounded-2xl">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Total Revenue</p>
              <p className="text-xl font-semibold text-success">₹{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="px-5 py-3 bg-surface-card border border-border rounded-2xl">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Students</p>
              <p className="text-xl font-semibold text-text-primary">{totalUsers}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-10 overflow-x-auto hide-scrollbar">
          {["courses", "payments", "users", "settings"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium tracking-wide uppercase whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab ? "border-accent text-accent" : "border-transparent text-text-muted hover:text-text-secondary"
              }`}
            >
              {tab.replace("-", " ")}
            </button>
          ))}
        </div>

        {/* COURSES TAB */}
        {activeTab === "courses" && (
          <div className="animate-fade-in-up flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-6">{editingCourseId ? "Edit Course" : "Create New Course"}</h2>
              {submitStatus === "success" && <div className="mb-6 p-4 bg-success/10 text-success rounded-xl text-sm">{editingCourseId ? "Course updated!" : "Course created!"}</div>}
              {submitStatus === "error" && <div className="mb-6 p-4 bg-error/10 text-error rounded-xl text-sm">{errorMessage}</div>}
              
              <form onSubmit={editingCourseId ? handleUpdateCourse : handleCreateCourse} className="space-y-6">
                <div>
                  <label className={labelClasses}>Title</label>
                  <input name="title" value={form.title} onChange={handleCourseChange} required className={inputClasses} />
                </div>
                <div>
                  <label className={labelClasses}>Cover Image URL</label>
                  <input name="cover_image_url" type="url" value={form.cover_image_url} onChange={handleCourseChange} required className={inputClasses} />
                </div>
                <div>
                  <label className={labelClasses}>Description</label>
                  <textarea name="description" value={form.description} onChange={handleCourseChange} required rows={3} className={inputClasses} />
                </div>
                <div>
                  <label className={labelClasses}>Curriculum (One module per line)</label>
                  <textarea name="curriculum" value={form.curriculum} onChange={handleCourseChange} required rows={4} className={inputClasses} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>Selling Price (₹)</label>
                    <input name="price" type="number" value={form.price} onChange={handleCourseChange} required className={inputClasses} placeholder="Actual pay amount" />
                  </div>
                  <div>
                    <label className={labelClasses}>Original Price (₹) - Optional</label>
                    <input name="original_price" type="number" value={form.original_price} onChange={handleCourseChange} className={inputClasses} placeholder="Struck-through price" />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-4">
                    <label className={labelClasses}>Video Links</label>
                    <button type="button" onClick={addLockedUrl} className="text-xs text-accent">+ Add Link</button>
                  </div>
                  <div className="space-y-3">
                    {lockedUrls.map((entry, i) => (
                      <div key={i} className="flex gap-2">
                        <input type="text" placeholder="Title" value={entry.title} onChange={(e) => handleLockedUrlChange(i, "title", e.target.value)} className={inputClasses} />
                        <input type="url" placeholder="URL" value={entry.url} onChange={(e) => handleLockedUrlChange(i, "url", e.target.value)} className={inputClasses} />
                        {lockedUrls.length > 1 && <button type="button" onClick={() => removeLockedUrl(i)} className="text-error px-2">X</button>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <button type="submit" className="flex-1 py-3 bg-accent text-surface font-semibold rounded-xl hover:bg-accent-hover transition-colors">
                    {editingCourseId ? "Update Course" : "Publish"}
                  </button>
                  {editingCourseId && (
                    <button type="button" onClick={handleCancelEdit} className="px-6 py-3 border border-border text-text-secondary rounded-xl hover:bg-surface-raised transition-colors">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="flex-1">
               <div className="flex items-center justify-between mb-6">
                 <h2 className="text-xl font-semibold">Published Courses</h2>
                 {orderChanged && (
                   <button onClick={handleSaveOrder} className="px-4 py-2 bg-success text-white text-xs font-semibold rounded-lg hover:bg-success/90 transition-colors animate-fade-in">
                     Save Order
                   </button>
                 )}
               </div>
               <p className="text-xs text-text-muted mb-4">Drag courses to reorder how they appear on the site.</p>
               {isLoading ? <p className="text-text-muted">Loading...</p> : (
                 <div className="space-y-2">
                   {existingCourses.map((c, idx) => (
                     <div 
                       key={c.id} 
                       draggable 
                       onDragStart={() => handleDragStart(idx)}
                       onDragOver={(e) => handleDragOver(e, idx)}
                       onDragEnd={handleDragEnd}
                       className={`p-4 border rounded-xl flex justify-between items-center cursor-grab active:cursor-grabbing transition-all duration-200 ${draggedCourseIdx === idx ? 'border-accent bg-accent/5 scale-[1.02] shadow-lg' : 'border-border hover:border-border-hover'}`}
                     >
                       <div className="flex items-center gap-3">
                         <div className="text-text-muted/40 flex-shrink-0">
                           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>
                         </div>
                         <div>
                           <h3 className="font-medium text-sm">{c.title}</h3>
                           <div className="flex gap-2 items-center">
                             <p className="text-xs font-semibold text-text-primary">₹{c.price}</p>
                             {c.original_price && (
                               <p className="text-[10px] text-text-muted line-through">₹{c.original_price}</p>
                             )}
                           </div>
                         </div>
                       </div>
                        <div className="flex gap-4 items-center">
                          <span className="text-[10px] text-text-muted font-mono">#{idx + 1}</span>
                          <button onClick={() => handleEditCourse(c)} className="text-xs text-accent hover:underline">Edit</button>
                          <button onClick={() => handleDeleteCourse(c.id)} className="text-xs text-error hover:underline">Delete</button>
                        </div>
                     </div>
                   ))}
                 </div>
               )}
            </div>
          </div>
        )}

        {/* PAYMENTS TAB */}
        {activeTab === "payments" && (
          <div className="animate-fade-in-up">
            <h2 className="text-xl font-semibold mb-6">Pending Verifications</h2>
            {isLoading ? <p className="text-text-muted">Loading...</p> : pendingPayments.length === 0 ? (
              <p className="text-text-muted">No pending payments.</p>
            ) : (
              <div className="grid gap-4">
                {pendingPayments.map(p => (
                  <div key={p.id} className="p-6 border border-border rounded-xl bg-surface-card flex flex-col md:flex-row justify-between md:items-start gap-6">
                    <div className="flex-1">
                      <p className="text-xs text-accent mb-1">{p.course?.title || "Unknown Course"}</p>
                      <h3 className="font-medium text-lg mb-2">{p.sender_name}</h3>
                      <div className="text-sm text-text-muted space-y-1">
                        <p>User Email: <span className="text-text-primary">{p.user_email}</span></p>
                        <p>Phone: <span className="text-text-primary font-medium">{p.phone_number || "N/A"}</span></p>
                        <p>Tx ID: <span className="text-text-primary font-mono">{p.transaction_id}</span></p>
                        <p>Amount Paid: <span className="text-success font-medium">₹{p.amount}</span></p>
                        <p>Date: {new Date(p.created_at).toLocaleString()}</p>
                      </div>
                      {p.screenshot_url && (
                        <button 
                          onClick={() => setScreenshotLightbox(p.screenshot_url)}
                          className="mt-3 flex items-center gap-2 text-xs text-accent hover:text-accent-hover transition-colors"
                        >
                          <img src={p.screenshot_url} alt="Screenshot" className="w-16 h-16 object-cover rounded-lg border border-border" />
                          <span>View Screenshot</span>
                        </button>
                      )}
                    </div>
                    <div className="flex gap-3 flex-shrink-0">
                      <button onClick={() => handleApprovePayment(p)} className="px-4 py-2 bg-success text-white rounded-lg text-sm font-medium hover:bg-success/90">
                        Approve & Grant Access
                      </button>
                      <button onClick={() => handleRejectPayment(p.id)} className="px-4 py-2 bg-error/10 text-error rounded-lg text-sm font-medium hover:bg-error/20">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Screenshot Lightbox */}
            {screenshotLightbox && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setScreenshotLightbox(null)}>
                <div className="relative max-w-3xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
                  <button onClick={() => setScreenshotLightbox(null)} className="absolute -top-3 -right-3 w-8 h-8 bg-surface text-text-primary rounded-full flex items-center justify-center shadow-lg hover:bg-surface-raised z-10">✕</button>
                  <img src={screenshotLightbox} alt="Payment Screenshot" className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === "users" && (
          <div className="animate-fade-in-up">
            <h2 className="text-xl font-semibold mb-2">All Users</h2>
            <p className="text-xs text-text-muted mb-6">{allUsersData.length} total users — click to expand details</p>
            {isLoading ? <p className="text-text-muted">Loading...</p> : allUsersData.length === 0 ? (
              <p className="text-text-muted">No users found.</p>
            ) : (
              <div className="space-y-3">
                {allUsersData.map(user => (
                  <div key={user.id} className="border border-border rounded-xl bg-surface-card overflow-hidden">
                    {/* Compact user row */}
                    <button 
                      onClick={() => setExpandedUserId(expandedUserId === user.id ? null : user.id)}
                      className="w-full p-4 flex items-center justify-between gap-4 hover:bg-surface-raised/50 transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-9 h-9 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {user.email?.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-text-primary truncate">{user.email}</p>
                          <p className="text-[10px] text-text-muted">
                            Joined {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {user.enrollments.length > 0 ? (
                          <span className="px-2.5 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-bold uppercase tracking-wider">
                            {user.enrollments.length} course{user.enrollments.length > 1 ? 's' : ''}
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 bg-surface-raised text-text-muted rounded-full text-[10px] font-bold uppercase tracking-wider">
                            No purchases
                          </span>
                        )}
                        <svg className={`w-4 h-4 text-text-muted transition-transform duration-200 ${expandedUserId === user.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </button>
                    
                    {/* Expanded detail */}
                    {expandedUserId === user.id && (
                      <div className="border-t border-border p-4 bg-surface-raised/30 animate-fade-in">
                        <p className="text-[10px] text-text-muted mb-1">User ID: {user.id}</p>
                        {user.last_sign_in && <p className="text-[10px] text-text-muted mb-3">Last sign in: {new Date(user.last_sign_in).toLocaleString()}</p>}
                        
                        {user.enrollments.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                              <thead>
                                <tr className="border-b border-border/50">
                                  <th className="pb-2 font-medium text-text-muted text-xs">Course</th>
                                  <th className="pb-2 font-medium text-text-muted text-xs">Amount</th>
                                  <th className="pb-2 font-medium text-text-muted text-xs">Status</th>
                                  <th className="pb-2 font-medium text-text-muted text-xs text-right">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {user.enrollments.map(enr => (
                                  <tr key={enr.course_id} className="border-b border-border/20 last:border-0">
                                    <td className="py-2.5 text-text-secondary text-xs font-medium">{enr.course_title}</td>
                                    <td className="py-2.5 text-success text-xs font-medium">₹{enr.amount}</td>
                                    <td className="py-2.5">
                                      {enr.has_access ? (
                                        <span className="inline-block px-2 py-0.5 bg-success/10 text-success rounded text-[10px] font-bold uppercase">Active</span>
                                      ) : (
                                        <span className="inline-block px-2 py-0.5 bg-error/10 text-error rounded text-[10px] font-bold uppercase">Revoked</span>
                                      )}
                                    </td>
                                    <td className="py-2.5 text-right">
                                      <button 
                                        onClick={() => handleToggleAccess(user.id, enr.course_id, enr.has_access)}
                                        className={`px-3 py-1 rounded-lg text-[10px] font-medium transition-colors ${
                                          enr.has_access 
                                          ? "bg-error/10 text-error hover:bg-error/20" 
                                          : "bg-success/10 text-success hover:bg-success/20"
                                        }`}
                                      >
                                        {enr.has_access ? "Revoke" : "Grant"}
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="text-xs text-text-muted italic">No courses purchased yet.</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div className="animate-fade-in-up max-w-lg">
            <h2 className="text-xl font-semibold mb-6">Payment Settings</h2>
            {settingsStatus === "success" && <div className="mb-6 p-4 bg-success/10 text-success rounded-xl text-sm">Settings saved!</div>}
            
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div>
                <label className={labelClasses}>Universal QR Code Image URL</label>
                <input 
                  type="url" 
                  value={universalQr} 
                  onChange={(e) => setUniversalQr(e.target.value)} 
                  placeholder="https://example.com/my-upi-qr.jpg" 
                  className={inputClasses} 
                />
                <p className="text-xs text-text-muted mt-2">This QR code will be shown for all courses during checkout, unless a course has its own custom QR code set.</p>
              </div>
              
              {universalQr && (
                <div className="mt-4 p-4 border border-border rounded-xl inline-block bg-white">
                  <img src={universalQr} alt="Universal QR" className="w-48 h-48 object-contain" />
                </div>
              )}

              <button type="submit" className="w-full py-3 bg-accent text-surface font-semibold rounded-xl hover:bg-accent-hover transition-colors">Save Settings</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
