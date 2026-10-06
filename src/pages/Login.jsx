import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Info, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/useAuth";

const BG_PHOTOS = [
  { src: "https://images.unsplash.com/photo-1591189863430-ab87e120f312?w=500&q=60", className: "-top-4 -left-4 rotate-[-2deg] md:-top-10 md:-left-10 md:rotate-[-3deg]" },
  { src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=500&q=60", className: "bottom-4 left-2 rotate-[2deg] md:bottom-8 md:left-4 md:rotate-[2deg]" },
  { src: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=500&q=60", className: "top-8 -right-4 rotate-[3deg] md:top-12 md:-right-8" },
  { src: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=500&q=60", className: "-bottom-4 -right-4 rotate-[-2deg] md:-bottom-6 md:-right-6" },
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await login(form);
    setLoading(false);

    if (!res.success) {
      setError(res.message || "Something went wrong. Please try again.");
      return;
    }

    const role = res.data.user.role;
    if (role === "volunteer") navigate("/volunteer/dashboard");
    else if (role === "organizer") navigate("/organizer/dashboard");
    else if (role === "admin") navigate("/admin");
    else navigate("/");
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden">
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {BG_PHOTOS.map((photo, index) => (
          <div
            key={index}
            className={`absolute w-36 h-24 rounded-2xl overflow-hidden opacity-15 shadow-md border border-border/50 md:w-80 md:h-52 ${photo.className}`}
          >
            <img src={photo.src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-310 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="w-full bg-surface rounded-3xl border border-border shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-160">
        {/* Left showcase panel */}
        <div className="hidden lg:flex lg:col-span-5 relative bg-text text-[#FFF8F5] p-8 sm:p-10 flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=800&q=80"
              alt="Volunteers working together"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-t from-text via-text/80 to-text/50" />
          </div>

          <div className="relative z-10">
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold leading-tight text-white mb-4 tracking-tight">
              Welcome back to where your time makes an impact.
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-sm">
              Connect with verified community projects and mobilize local changemakers.
            </p>
          </div>

          <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/80">
            <span>1,420+ active volunteers</span>
            <span>85 verified organizations</span>
          </div>
        </div>

        {/* Right form panel */}
        <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
          <div className="max-w-110 w-full mx-auto">
            <div className="mb-7">
              <h1 className="font-heading text-3xl font-semibold text-text tracking-tight mb-2">
                Sign in to Haven 87
              </h1>
              <p className="text-sm text-text-muted leading-relaxed">
                Enter your credentials to access your dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-semibold text-text uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail size={18} className="absolute left-3.5 text-text-muted pointer-events-none" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="e.g. amina@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-alt border border-border text-text text-sm rounded-xl placeholder:text-text-muted/50 outline-none focus:bg-surface focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-xs font-semibold text-text uppercase tracking-wider">
                    Password
                  </label>
                  <a href="#" className="text-xs font-medium text-accent hover:text-accent-hover transition-colors">
                    Forgot password?
                  </a>
                </div>
                <div className="relative flex items-center">
                  <Lock size={18} className="absolute left-3.5 text-text-muted pointer-events-none" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-11 py-2.5 bg-surface-alt border border-border text-text text-sm rounded-xl placeholder:text-text-muted/50 outline-none focus:bg-surface focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-text-muted hover:text-text transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded border-border text-accent focus:ring-accent/30 accent-accent cursor-pointer"
                  />
                  <span className="text-xs text-text-muted group-hover:text-text transition-colors">
                    Remember this device for 30 days
                  </span>
                </label>
              </div>

              {error && <p className="text-sm text-danger">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-6 rounded-xl bg-accent hover:bg-accent-hover active:scale-[0.99] text-white font-medium text-sm shadow-sm transition-all disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? "Signing in..." : "Log In"}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="mt-5 p-3 rounded-xl bg-surface-alt border border-border flex items-start gap-2.5">
              <Info size={18} className="text-accent shrink-0 mt-0.5" />
              <p className="text-xs text-text-muted leading-relaxed">
                <strong className="font-medium text-text">Unified access:</strong> Whether you're a
                Volunteer or an Organizer, your dashboard loads automatically based on your account.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border text-center">
              <p className="text-xs text-text-muted">
                Don't have an account yet?{" "}
                <Link to="/signup" className="font-semibold text-accent hover:text-accent-hover transition-colors">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full pt-6 text-center">
        <div className="inline-flex items-center justify-center gap-1.5 text-xs text-text-muted/75">
          <ShieldCheck size={14} className="text-success" />
          <span>Secure login</span>
        </div>
      </div>
      </div>
    </div>
  );
}