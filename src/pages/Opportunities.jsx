import { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import OpportunityCard from "../components/opportunities/OpportunityCard";
import EmptyState from "../components/ui/EmptyState";
import Input from "../components/ui/Input";
import { getOpportunities } from "../api/api";

export default function Opportunities() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [allOpportunities, setAllOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getOpportunities({ limit: 100 });
      if (res.success) setAllOpportunities(res.data.items);
      setLoading(false);
    }
    load();
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(allOpportunities.map((o) => o.category))],
    [allOpportunities]
  );

  const filtered = allOpportunities.filter((o) => {
    const matchesCategory = category === "All" || o.category === category;
    const matchesSearch =
      !search ||
      o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.location.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-300 mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-text">Browse Opportunities</h1>
        <p className="text-text-muted mt-1">Find a cause that fits your schedule and skills.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-3 text-text-muted" />
          <Input
            id="opportunity-search"
            type="text"
            aria-label="Search opportunities"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or location..."
            inputClassName="pl-10 pr-4 py-2.5 bg-surface border border-border text-sm focus:ring-accent"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors shrink-0 ${
                category === cat
                  ? "bg-accent text-white"
                  : "bg-surface border border-border text-text-muted hover:text-text"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-text-muted">Loading...</p>
      ) : filtered.length === 0 ? (
        <EmptyState
          message="No opportunities match your search yet."
          className="p-12"
          messageClassName="text-base"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      )}
    </div>
  );
}