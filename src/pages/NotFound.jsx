import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-6 py-24 text-center">
      <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
        <Compass size={24} className="text-accent" />
      </div>

      <h1 className="font-heading text-3xl font-semibold text-text mb-2">
        Page not found
      </h1>
      <p className="text-text-muted mb-8">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <Link
        to="/"
        className="inline-flex items-center justify-center bg-accent text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-accent-hover transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}