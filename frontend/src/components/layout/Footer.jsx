import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-text text-white/70">
      <div className="max-w-300 mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-heading text-lg font-semibold text-white">Haven 87</span>
            </div>
            <p className="text-sm text-white/60">
              A purposeful volunteer network connecting verified local organizations with engaged citizens.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">For Volunteers</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link to="/opportunities" className="hover:text-white transition-colors">Browse opportunities</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Application guidelines</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">For Organizations</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Post opportunities</a></li>
              <li><a href="#" className="hover:text-white transition-colors">CAC Verification info</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Community safety</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">© 2026 Haven 87. Connecting communities with purpose.</p>
          <span className="text-xs text-white/50">Built with ❤️ in Lagos. </span>
        </div>
      </div>
    </footer>
  );
}