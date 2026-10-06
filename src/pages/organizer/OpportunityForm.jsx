import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrganizerLayout from "../../components/layout/OrganizerLayout";
import { useAuth } from "../../context/useAuth";
import Input from "../../components/ui/Input";
import { createOpportunity, updateOpportunity, getOpportunityById } from "../../api/mockApi";

const EMPTY_FORM = {
  title: "",
  description: "",
  category: "",
  location: "",
  date: "",
  totalSpots: 10,
};

export default function OpportunityForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    async function load() {
      const res = await getOpportunityById(id);
      if (res.success) {
        setForm({
          title: res.data.title,
          description: res.data.description,
          category: res.data.category,
          location: res.data.location,
          date: res.data.date?.slice(0, 10),
          totalSpots: res.data.totalSpots,
        });
      }
      setLoading(false);
    }
    load();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "totalSpots" ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = isEdit ? form : { ...form, organizerId: user.id };
    const res = isEdit ? await updateOpportunity(id, payload) : await createOpportunity(payload);
    setSaving(false);

    if (!res.success) {
      setError(res.message || "Something went wrong. Please try again.");
      return;
    }

    navigate("/organizer/opportunities");
  };

  if (loading) {
    return (
      <OrganizerLayout>
        <p className="text-text-muted">Loading...</p>
      </OrganizerLayout>
    );
  }

  return (
    <OrganizerLayout>
      <div className="max-w-2xl">
        <h1 className="font-heading text-2xl font-semibold text-text mb-1">
          {isEdit ? "Edit Opportunity" : "Post a New Opportunity"}
        </h1>
        <p className="text-text-muted mb-6">
          {isEdit ? "Update the details volunteers see." : "Fill in the details volunteers will see."}
        </p>

        <form onSubmit={handleSubmit} className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-4">
          <Input label="Title" name="title" value={form.title} onChange={handleChange} required />
          <div>
            <label className="block text-sm font-medium text-text mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2.5 bg-surface-alt text-text placeholder-text-muted/70 rounded-lg outline-none focus:bg-surface focus:ring-2 focus:ring-accent transition-all"
            />
          </div>
          <Input label="Category" name="category" value={form.category} onChange={handleChange} required placeholder="e.g. Food Relief" />
          <Input label="Location" name="location" value={form.location} onChange={handleChange} required placeholder="e.g. Ikeja, Lagos" />
          <Input label="Date" name="date" type="date" value={form.date} onChange={handleChange} required />
          <Input label="Total Spots" name="totalSpots" type="number" value={form.totalSpots} onChange={handleChange} required min={1} />

          {error && <p className="text-sm text-danger">{error}</p>}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium shadow-sm transition-all disabled:opacity-70"
            >
              {saving ? "Saving..." : isEdit ? "Save Changes" : "Post Opportunity"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/organizer/opportunities")}
              className="px-6 py-2.5 rounded-lg bg-surface-alt hover:bg-border text-text text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </OrganizerLayout>
  );
}