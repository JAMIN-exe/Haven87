import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Quote } from "lucide-react";

const STATS = [
  { value: "8,400+", label: "Verified hours logged" },
  { value: "45+", label: "CAC-vetted initiatives" },
  { value: "1,200+", label: "Active civic volunteers" },
  { value: "100%", label: "Free for grassroots groups" },
];

const COMMITMENTS = [
  {
    number: "01",
    title: "CAC & Physical Vetting",
    description: "Every organization is cross-checked against official registry records before posting opportunities.",
  },
  {
    number: "02",
    title: "Respect for Volunteer Time",
    description: "Capped shifts, clear locations, and timely reminders prevent wasted commutes and missed appointments.",
  },
  {
    number: "03",
    title: "Dignified Participation Records",
    description: "Every completed application builds a real volunteering history you can point to.",
  },
];

export default function About() {
  useEffect(() => {
    const revealItems = document.querySelectorAll(".landing-scroll-reveal");

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px" }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full">
      {/* Hero */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(27,20,15,0.95) 0%, rgba(27,20,15,0.75) 60%, rgba(27,20,15,0.4) 100%), url('https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
        }}
      >
        <div className="max-w-300 mx-auto px-6 pt-16 pb-12 flex flex-col justify-end min-h-130">
          <div className="max-w-3xl space-y-4">
            <div className="landing-scroll-reveal landing-reveal-delay-1 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Haven 87 • Civic Infrastructure
            </div>
            <h1 className="landing-scroll-reveal landing-reveal-delay-2 font-heading text-[32px] md:text-[44px] text-white tracking-tight leading-tight">
              Connecting willing hands with purposeful causes across Nigeria.
            </h1>
            <p className="landing-scroll-reveal landing-reveal-delay-3 text-base md:text-lg text-white/85 max-w-2xl leading-relaxed">
              Haven 87 replaces chaotic coordination with dependable civic rails — connecting
              verified local organizers with volunteers who show up.
            </p>
            <div className="landing-scroll-reveal landing-reveal-delay-4 flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/opportunities"
                className="inline-flex items-center justify-center bg-accent hover:bg-accent-hover text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow-sm transition-colors"
              >
                Explore Opportunities
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-white/20 transition-colors"
              >
                Register an Organization
              </Link>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
            {STATS.map((stat, index) => (
              <div key={stat.label} className={`landing-scroll-reveal landing-reveal-delay-${index + 1}`}>
                <p className="font-heading text-2xl font-semibold text-white">{stat.value}</p>
                <p className="text-xs text-white/70 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reality & fix */}
      <section className="max-w-300 mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="landing-scroll-reveal lg:col-span-5">
            <p className="text-xs text-accent font-medium uppercase tracking-wider mb-2">
              The Reality & The Fix
            </p>
            <h2 className="font-heading text-2xl font-semibold text-text leading-snug">
              Nigeria has never lacked goodwill. It lacks dependable logistics.
            </h2>
          </div>
          <div className="landing-scroll-reveal landing-reveal-delay-1 lg:col-span-7 space-y-4 text-text-muted leading-relaxed">
            <p>
              Across Lagos, Ibadan, and Abuja, thousands want to lend their hands to grassroots
              causes. Yet traditional volunteering remains trapped in opaque group chats,
              unconfirmed schedules, and unpredictable turnouts.
            </p>
            <p>
              At the same time, shelters, literacy clinics, and food distribution efforts lose
              critical hours vetting identities and managing cancellations. Haven 87 builds the
              digital verification and scheduling layer that turns spontaneous willingness into
              regular civic impact.
            </p>
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="w-full bg-surface border-y border-border py-16">
        <div className="max-w-300 mx-auto px-6">
          <div className="max-w-xl mb-8">
            <p className="text-xs text-accent font-medium uppercase tracking-wider mb-2">
              Our Commitments
            </p>
            <h2 className="font-heading text-2xl font-semibold text-text">
              Built for dignity and accountability
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMMITMENTS.map((item, index) => (
              <div
                key={item.number}
                className={`landing-scroll-reveal landing-reveal-delay-${index + 1} bg-bg border border-border rounded-xl p-6 flex flex-col justify-between hover:border-text-muted/30 transition-colors hover:-translate-y-1`}
              >
                <div className="space-y-2">
                  <span className="font-heading text-lg text-accent font-semibold">{item.number}</span>
                  <h3 className="font-heading text-lg font-semibold text-text">{item.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder quote */}
      <section className="max-w-300 mx-auto px-6 py-16">
        <div
          className="landing-scroll-reveal relative rounded-xl overflow-hidden p-8 md:p-12 text-white shadow-sm"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(27,20,15,0.96) 0%, rgba(27,20,15,0.85) 60%, rgba(27,20,15,0.6) 100%), url('https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-3xl space-y-4">
            <Quote size={32} className="text-accent" />
            <blockquote className="font-heading text-xl md:text-2xl font-normal leading-relaxed text-white">
              "We started Haven 87 after spending months coordinating weekend reading clinics.
              The generosity of people was never in doubt — what was missing was reliable
              tooling built for our local reality. We believe civic participation should be
              simple, dignified, and regular."
            </blockquote>
            <div className="pt-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white text-sm font-semibold">
                B87
              </div>
              <div>
                <p className="text-sm text-white font-medium">Group 87</p>
                <p className="text-sm text-white/70">TS Academy Capstone Team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="max-w-300 mx-auto px-6 pb-16">
        <div className="landing-scroll-reveal bg-surface-alt border border-border rounded-xl p-6 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="font-heading text-xl font-semibold text-text">
              Ready to make an impact this weekend?
            </h3>
            <p className="text-text-muted mt-1">
              Join volunteers already contributing their time, or get your organization set up
              in minutes.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center bg-accent hover:bg-accent-hover text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow-sm transition-colors"
            >
              Join as Volunteer
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center bg-surface border border-border text-text text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-bg transition-colors"
            >
              Register an Organization
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}