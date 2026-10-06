import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Building2,
  Mail,
  Eye,
  EyeOff,
  BadgeCheck,
  Info,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { register } from "../api/api";

const BG_PHOTOS = [
  { src: "https://images.unsplash.com/photo-1591189863430-ab87e120f312?w=500&q=60", className: "-top-4 -left-4 rotate-[-2deg] md:-top-10 md:-left-10 md:rotate-[-3deg]" },
  { src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=500&q=60", className: "bottom-4 left-2 rotate-[2deg] md:bottom-8 md:left-4 md:rotate-[2deg]" },
  { src: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=500&q=60", className: "top-8 -right-4 rotate-[3deg] md:top-12 md:-right-8" },
  { src: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=500&q=60", className: "-bottom-4 -right-4 rotate-[-2deg] md:-bottom-6 md:-right-6" },
];

export default function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState("volunteer");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    orgName: "",
    cacNumber: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      fullName: role === "organizer" ? form.orgName : form.fullName,
      email: form.email,
      password: form.password,
      role,
    };
    if (role === "organizer") {
      payload.cacNumber = form.cacNumber;
    }

    const res = await register(payload);
    setLoading(false);

    if (!res.success) {
      setError(res.message || "Something went wrong. Please try again.");
      return;
    }

    navigate("/login");
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden">
      {/* Decorative background photos */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {BG_PHOTOS.map((photo, i) => (
          <div
            key={i}
            className={`absolute w-36 h-24 rounded-2xl overflow-hidden opacity-15 shadow-md border border-border/50 md:w-80 md:h-52 ${photo.className}`}
          >
            <img src={photo.src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-260 w-full mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left column - hidden on mobile, shown on desktop */}
          <div className="hidden lg:block lg:col-span-5 flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-alt w-fit">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-medium text-text">Nigeria's Civic Action Network</span>
            </div>

            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-semibold text-text leading-tight">
                Purpose in action, across our cities.
              </h1>
              <p className="text-text-muted mt-3">
                Connect with vetted community projects or mobilize energetic
                local changemakers in Lagos, Abuja, Port Harcourt, and beyond.
              </p>
            </div>

            {role === "volunteer" ? (
              <>
                <div className="p-4 bg-surface rounded-xl shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-accent">
                    <User size={20} />
                    <span className="text-sm font-semibold text-text">Why volunteer with Haven 87?</span>
                  </div>
                  <ul className="space-y-2 pt-1">
                    {[
                      "Direct access to 40+ grassroots social impacts.",
                      "One-click applications with direct organizer liaison.",
                      "Zero bureaucracy, prompt field updates.",
                    ].map((line) => (
                      <li key={line} className="flex items-start gap-2 text-sm text-text-muted">
                        <CheckCircle2 size={18} className="text-success mt-0.5 shrink-0" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-surface-alt rounded-xl flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=60"
                    alt="Amina B."
                    className="w-12 h-12 rounded-full object-cover shadow-sm"
                  />
                  <div className="min-w-0">
                    <p className="text-xs text-text font-medium italic">
                      "Finding verified local education drives on weekends used to be nearly impossible. Haven 87 changed that."
                    </p>
                    <p className="text-xs text-text-muted mt-1">— Amina B., Yaba, Lagos</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="p-4 bg-surface rounded-xl shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-accent">
                    <Building2 size={20} />
                    <span className="text-sm font-semibold text-text">Organizing an initiative?</span>
                  </div>
                  <ul className="space-y-2 pt-1">
                    {[
                      "Reach 1,400+ vetted, enthusiastic volunteers.",
                      "Fast-tracked CAC credential check for trust badging.",
                      "Free publishing and volunteer roster management.",
                    ].map((line) => (
                      <li key={line} className="flex items-start gap-2 text-sm text-text-muted">
                        <BadgeCheck size={18} className="text-accent mt-0.5 shrink-0" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-surface-alt rounded-xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-accent shrink-0 shadow-sm">
                    <ShieldCheck size={22} />
                  </div>
                  <p className="text-xs text-text">
                    Post immediate calls for outreach while your verification badge processes in the background.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Right column: form */}
          <div className="lg:col-span-7 w-full">
            <div className="bg-surface rounded-xl p-6 sm:p-8 shadow-md space-y-6">
              <div>
                <h2 className="font-heading text-2xl font-semibold text-text">Join Haven 87</h2>
                <p className="text-text-muted mt-1">
                  Connect with purposeful community projects or mobilize volunteers across Nigeria.
                </p>
              </div>

              <div className="p-1 bg-surface-alt rounded-xl flex gap-1">
                <button
                  type="button"
                  onClick={() => setRole("volunteer")}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    role === "volunteer" ? "bg-surface shadow-sm text-text" : "text-text-muted hover:text-text"
                  }`}
                >
                  <User size={18} />
                  Volunteer
                </button>
                <button
                  type="button"
                  onClick={() => setRole("organizer")}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    role === "organizer" ? "bg-surface shadow-sm text-text" : "text-text-muted hover:text-text"
                  }`}
                >
                  <Building2 size={18} />
                  Organization
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {role === "organizer" && (
                  <>
                    <div>
                      <label htmlFor="orgName" className="block text-sm font-medium text-text mb-1">
                        Organization Name
                      </label>
                      <div className="relative">
                        <input
                          id="orgName"
                          name="orgName"
                          type="text"
                          required
                          value={form.orgName}
                          onChange={handleChange}
                          placeholder="e.g. Hope Horizon Initiative"
                          className="w-full px-4 py-2.5 bg-surface-alt text-text placeholder-text-muted/70 rounded-lg outline-none focus:bg-surface focus:ring-2 focus:ring-accent transition-all"
                        />
                        <Building2 size={18} className="absolute right-3 top-3 text-text-muted" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label htmlFor="cacNumber" className="block text-sm font-medium text-text">
                          CAC Registration Number
                        </label>
                        <span className="text-xs text-text-muted">RC or BN number</span>
                      </div>
                      <div className="relative">
                        <input
                          id="cacNumber"
                          name="cacNumber"
                          type="text"
                          required
                          value={form.cacNumber}
                          onChange={handleChange}
                          placeholder="e.g. RC 1894520"
                          className="w-full px-4 py-2.5 bg-surface-alt text-text placeholder-text-muted/70 rounded-lg outline-none focus:bg-surface focus:ring-2 focus:ring-accent transition-all"
                        />
                        <BadgeCheck size={18} className="absolute right-3 top-3 text-text-muted" />
                      </div>
                    </div>

                    <div className="p-4 bg-surface-alt rounded-lg flex items-start gap-2">
                      <Info size={20} className="text-accent shrink-0 mt-0.5" />
                      <p className="text-xs text-text leading-relaxed">
                        CAC registration number is collected for verification badge issuance.
                        Organizers can start posting opportunities immediately upon registration.
                      </p>
                    </div>
                  </>
                )}

                {role === "volunteer" && (
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-text mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Amina Bello"
                        className="w-full px-4 py-2.5 bg-surface-alt text-text placeholder-text-muted/70 rounded-lg outline-none focus:bg-surface focus:ring-2 focus:ring-accent transition-all"
                      />
                      <User size={18} className="absolute right-3 top-3 text-text-muted" />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="e.g. amina@example.com"
                      className="w-full px-4 py-2.5 bg-surface-alt text-text placeholder-text-muted/70 rounded-lg outline-none focus:bg-surface focus:ring-2 focus:ring-accent transition-all"
                    />
                    <Mail size={18} className="absolute right-3 top-3 text-text-muted" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-text">
                      Password
                    </label>
                    <span className="text-xs text-text-muted">At least 8 characters</span>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 bg-surface-alt text-text placeholder-text-muted/70 rounded-lg outline-none focus:bg-surface focus:ring-2 focus:ring-accent transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-text-muted hover:text-text transition-colors"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {error && <p className="text-sm text-danger">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium shadow-sm transition-all disabled:opacity-70"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>

                <p className="text-xs text-text-muted text-center leading-relaxed">
                  By signing up, you agree to our{" "}
                  <a href="#" className="underline hover:text-text transition-colors">Terms of Service</a>{" "}
                  and{" "}
                  <a href="#" className="underline hover:text-text transition-colors">Community Safety Guidelines</a>.
                </p>
              </form>

              <div className="pt-4 border-t border-border/40 text-center">
                <p className="text-sm text-text-muted">
                  Already have an account?{" "}
                  <Link to="/login" className="text-accent hover:underline font-medium">
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}