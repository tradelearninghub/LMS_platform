import { Link } from "react-router-dom";

export default function CourseCard({ course, isPurchased = false }) {
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(course.price);

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
          {isPurchased ? (
            <span className="absolute top-4 right-4 px-3 py-1 text-xs font-medium tracking-wide uppercase bg-success/15 text-success border border-success/20 rounded-full backdrop-blur-sm">
              Purchased
            </span>
          ) : (
            <span className="absolute top-4 right-4 px-3 py-1 text-xs font-medium tracking-wide bg-surface/70 text-text-primary border border-border rounded-full backdrop-blur-sm">
              {formattedPrice}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-semibold tracking-tight text-text-primary leading-snug mb-2 group-hover:text-accent transition-colors duration-300">
            {course.title}
          </h3>
          <p className="text-sm text-text-muted leading-relaxed line-clamp-2">
            {course.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
