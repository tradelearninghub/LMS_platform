import { Link } from "react-router-dom";

export default function CourseCard({ course, isPurchased = false }) {
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

  const discountPercent = course.original_price 
    ? Math.round(((course.original_price - course.price) / course.original_price) * 100) 
    : null;

  return (
    <Link
      to={isPurchased ? `/dashboard/course/${course.id}` : `/courses/${course.id}`}
      id={`course-card-${course.id}`}
      className="group block animate-fade-in-up"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-card transition-all duration-500 hover:border-border-hover hover:scale-[1.02]">
        {/* Cover Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={course.cover_image_url || "https://images.unsplash.com/photo-1590283603385-18ffb2a40c27?auto=format&fit=crop&w=600&q=80"}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-transparent to-transparent" />

          {/* Badge */}
          {/* Badge (Only for Price) */}
          {!isPurchased && (
            <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5">
              {discountPercent > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-success text-white rounded-md shadow-sm">
                  {discountPercent}% OFF
                </span>
              )}
              <span className="px-3 py-1 text-sm font-bold tracking-wide bg-accent text-surface border border-accent rounded-full backdrop-blur-sm shadow-lg shadow-accent/20">
                {formattedPrice}
              </span>
              {formattedOriginalPrice && (
                <span className="px-2 py-0.5 text-[10px] font-medium text-text-muted bg-surface/70 border border-border rounded-full backdrop-blur-sm line-through">
                  {formattedOriginalPrice}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-semibold tracking-tight text-text-primary leading-snug mb-2 group-hover:text-accent transition-colors duration-300">
            {course.title}
          </h3>
          <p className="text-sm text-text-muted leading-relaxed line-clamp-2 mb-4">
            {course.description}
          </p>

          {isPurchased && (
            <div className="pt-4 border-t border-border mt-auto">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-success">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                Purchased & Unlocked
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
