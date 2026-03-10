"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  FileText,
  LogOut,
  TrendingUp,
  Calendar,
  Target,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardStats {
  totalDonationsAmount: number;
  totalDonationsCount: number;
  totalDonors: number;
  activeCampaigns: number;
  pendingContacts: number;
  recentDonations: any[];
  topCampaigns: any[];
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<DollarSign />}
            label="Total Donations"
            value={`₹${((stats?.totalDonationsAmount || 0) / 100).toLocaleString()}`}
            subValue={`${stats?.totalDonationsCount || 0} donations`}
            color="bg-green-500"
          />
          <StatCard
            icon={<Users />}
            label="Total Donors"
            value={stats?.totalDonors || 0}
            subValue="unique donors"
            color="bg-blue-500"
          />
          <StatCard
            icon={<Target />}
            label="Active Campaigns"
            value={stats?.activeCampaigns || 0}
            subValue="running now"
            color="bg-purple-500"
          />
          <StatCard
            icon={<FileText />}
            label="Pending Contacts"
            value={stats?.pendingContacts || 0}
            subValue="need attention"
            color="bg-orange-500"
          />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Donations */}
          <div className="bg-background rounded-xl border border-border p-6">
            <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Recent Donations
            </h2>
            <div className="space-y-3">
              {stats?.recentDonations?.map((donation: any, i: number) => (
                <motion.div
                  key={donation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-sm">
                      {donation.campaign?.title || "General"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="font-bold text-primary">
                    ₹{(donation.amount / 100).toLocaleString()}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Top Campaigns */}
          <div className="bg-background rounded-xl border border-border p-6">
            <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Top Campaigns
            </h2>
            <div className="space-y-3">
              {stats?.topCampaigns?.map((campaign: any, i: number) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-sm">{campaign.title}</p>
                    <span className="text-xs text-muted-foreground">
                      {campaign._count?.donations || 0} donations
                    </span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{
                        width: `${Math.min(((campaign.raised || 0) / campaign.goal) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subValue: string;
  color: string;
}

function StatCard({ icon, label, value, subValue, color }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background rounded-xl border border-border p-6"
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center text-white`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-display font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{subValue}</p>
        </div>
      </div>
    </motion.div>
  );
}
