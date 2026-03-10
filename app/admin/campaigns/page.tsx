"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Edit, Plus, X, Loader2 } from "lucide-react";

interface Campaign {
  id: string;
  title: string;
  slug: string;
  description: string;
  goal: number;
  raised: number;
  image: string;
  category: string;
  status: string;
  endDate: string | null;
  donorCount?: number;
}

interface CampaignFormData {
  title: string;
  description: string;
  goal: string;
  category: string;
  image: string;
  endDate: string;
  status: string;
}

export default function AdminCampaignsPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [formData, setFormData] = useState<CampaignFormData>({
    title: "",
    description: "",
    goal: "",
    category: "education",
    image: "",
    endDate: "",
    status: "active",
  });

  useEffect(() => {
    checkAuth();
    fetchCampaigns();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      if (!response.ok) {
        router.push("/admin/login");
      }
    } catch (error) {
      router.push("/admin/login");
    }
  };

  const fetchCampaigns = async () => {
    try {
      const response = await fetch("/api/campaigns");
      const data = await response.json();
      if (data.success) {
        setCampaigns(data.data);
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        goal: parseFloat(formData.goal),
        endDate: formData.endDate || undefined,
      };

      const url = editingCampaign
        ? "/api/admin/campaigns"
        : "/api/admin/campaigns";
      const method = editingCampaign ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          editingCampaign ? { ...payload, id: editingCampaign.id } : payload,
        ),
      });

      const data = await response.json();

      if (data.success) {
        setShowModal(false);
        setEditingCampaign(null);
        resetForm();
        fetchCampaigns();
      } else {
        alert(data.error || "Failed to save campaign");
      }
    } catch (error) {
      console.error("Error saving campaign:", error);
      alert("Failed to save campaign");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this campaign?")) return;

    try {
      const response = await fetch(`/api/admin/campaigns?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        fetchCampaigns();
      } else {
        alert(data.error || "Failed to delete campaign");
      }
    } catch (error) {
      console.error("Error deleting campaign:", error);
      alert("Failed to delete campaign");
    }
  };

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setFormData({
      title: campaign.title,
      description: campaign.description,
      goal: campaign.goal.toString(),
      category: campaign.category,
      image: campaign.image,
      endDate: campaign.endDate
        ? new Date(campaign.endDate).toISOString().split("T")[0]
        : "",
      status: campaign.status,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      goal: "",
      category: "education",
      image: "",
      endDate: "",
      status: "active",
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCampaign(null);
    resetForm();
  };

  if (loading && campaigns.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-[#1B2232] text-xl flex items-center gap-2">
          <Loader2 /> Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="text-[#1B2232] p-8 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Campaigns</h1>
          <p className="text-gray-600">
            Create and manage fundraising campaigns
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-[#FA8B46] hover:bg-[#FA8B46]/90 px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Campaign
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all"
          >
            <div className="relative h-48">
              <img
                src={campaign.image || "/logo.jpg"}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => handleEdit(campaign)}
                  className="p-2 bg-white/90 hover:bg-white rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4 text-[#1B2232]" />
                </button>
                <button
                  onClick={() => handleDelete(campaign.id)}
                  className="p-2 bg-red-500/90 hover:bg-red-500 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-[#FA8B46]/10 text-[#FA8B46] rounded font-medium">
                  {campaign.category}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    campaign.status === "active"
                      ? "bg-green-500/20 text-green-400"
                      : campaign.status === "completed"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {campaign.status}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2 line-clamp-2">
                {campaign.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {campaign.description}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Raised</span>
                  <span className="font-semibold">
                    ₹{campaign.raised.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Goal</span>
                  <span className="font-semibold">
                    ₹{campaign.goal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#FA8B46] h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%`,
                    }}
                  />
                </div>
                <div className="text-xs text-gray-600 text-right">
                  {((campaign.raised / campaign.goal) * 100).toFixed(1)}% funded
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {campaigns.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg mb-4">No campaigns yet</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#FA8B46] hover:bg-[#FA8B46]/90 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Create Your First Campaign
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {editingCampaign ? "Edit Campaign" : "Create New Campaign"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Campaign Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#FFF5EE] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA8B46] focus:border-transparent outline-none transition-all"
                  placeholder="e.g., Education for Underprivileged Children"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-[#FFF5EE] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA8B46] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Describe your campaign and its impact..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Goal Amount (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    step="0.01"
                    value={formData.goal}
                    onChange={(e) =>
                      setFormData({ ...formData, goal: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#FFF5EE] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA8B46] focus:border-transparent outline-none transition-all"
                    placeholder="50000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#FFF5EE] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA8B46] focus:border-transparent outline-none transition-all"
                  >
                    <option value="education">Education</option>
                    <option value="health">Health</option>
                    <option value="food">Food & Nutrition</option>
                    <option value="shelter">Shelter</option>
                    <option value="emergency">Emergency Relief</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#FFF5EE] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA8B46] focus:border-transparent outline-none transition-all"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#FFF5EE] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA8B46] focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Status *
                  </label>
                  <select
                    required
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#FFF5EE] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA8B46] focus:border-transparent outline-none transition-all"
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-[#FA8B46] hover:bg-[#FA8B46]/90 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Saving..."
                    : editingCampaign
                      ? "Update Campaign"
                      : "Create Campaign"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
