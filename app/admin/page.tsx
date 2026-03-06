"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
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
  const [userName, setUserName] = useState("Admin");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setStats(data.data);
          setIsAuthenticated(true);
        } else {
          router.push("/admin/login");
        }
      } else {
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      router.push("/admin/login");
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

  if (!isAuthenticated && !loading) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {userName}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Donations
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      ₹{stats?.totalDonationsAmount.toLocaleString() || 0}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {stats?.totalDonationsCount || 0} transactions
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Donors
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stats?.totalDonors || 0}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Registered users
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Active Campaigns
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stats?.activeCampaigns || 0}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Running now</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Contact Requests
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stats?.pendingContacts || 0}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Pending review</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Donations */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Recent Donations
                </h3>
                <div className="space-y-3">
                  {stats?.recentDonations &&
                  stats.recentDonations.length > 0 ? (
                    stats.recentDonations.map((donation) => (
                      <div
                        key={donation.id}
                        className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {donation.donorName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {donation.campaign?.title || "General Donation"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">
                            ₹{donation.amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(donation.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No donations yet
                    </p>
                  )}
                </div>
              </div>

              {/* Top Campaigns */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Top Campaigns
                </h3>
                <div className="space-y-4">
                  {stats?.topCampaigns && stats.topCampaigns.length > 0 ? (
                    stats.topCampaigns.map((campaign) => {
                      const progress = (campaign.raised / campaign.goal) * 100;
                      return (
                        <div key={campaign.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900">
                              {campaign.title}
                            </p>
                            <p className="text-sm text-gray-600">
                              {campaign.donorCount} donors
                            </p>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>₹{campaign.raised.toLocaleString()}</span>
                            <span>Goal: ₹{campaign.goal.toLocaleString()}</span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No campaigns yet
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/admin/campaigns"
                className="flex items-center justify-center gap-3 bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-md transition-all"
              >
                <Target className="w-5 h-5 text-primary" />
                <span className="font-semibold text-gray-900">
                  Manage Campaigns
                </span>
              </Link>
              <Link
                href="/admin/donations"
                className="flex items-center justify-center gap-3 bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-md transition-all"
              >
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="font-semibold text-gray-900">
                  View Donations
                </span>
              </Link>
              <Link
                href="/admin/contacts"
                className="flex items-center justify-center gap-3 bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-md transition-all"
              >
                <FileText className="w-5 h-5 text-primary" />
                <span className="font-semibold text-gray-900">
                  View Contacts
                </span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
