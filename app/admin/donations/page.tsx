"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  IndianRupee,
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Phone,
  Calendar,
  DollarSign,
} from "lucide-react";

interface Donation {
  id: string;
  orderId: string;
  paymentId: string | null;
  amount: number;
  currency: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  donorPan: string | null;
  isAnonymous: boolean;
  status: string;
  campaignId: string | null;
  receiptSent: boolean;
  createdAt: string;
  campaign?: {
    title: string;
  };
}

export default function AdminDonationsPage() {
  const router = useRouter();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    checkAuth();
    fetchDonations();
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

  const fetchDonations = async () => {
    try {
      const response = await fetch("/api/admin/donations");
      const data = await response.json();
      if (data.success) {
        setDonations(data.data);
      }
    } catch (error) {
      console.error("Error fetching donations:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch =
      donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.donorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.orderId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || donation.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalAmount = filteredDonations.reduce(
    (sum, d) => sum + (d.status === "success" ? d.amount : 0),
    0,
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "created":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4" />;
      case "failed":
        return <XCircle className="w-4 h-4" />;
      case "created":
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1B2232] flex items-center justify-center">
        <div className="text-white text-xl">Loading donations...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Donations</h1>
        <p className="text-gray-400">View and manage all donations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#2A3447] rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Total Donations</span>
            <IndianRupee className="w-5 h-5 text-[#FA8B46]" />
          </div>
          <div className="text-2xl font-bold">
            ₹{(totalAmount / 100).toLocaleString("en-IN")}
          </div>
        </div>

        <div className="bg-[#2A3447] rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Total Count</span>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold">{filteredDonations.length}</div>
        </div>

        <div className="bg-[#2A3447] rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Successful</span>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold">
            {donations.filter((d) => d.status === "success").length}
          </div>
        </div>

        <div className="bg-[#2A3447] rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Pending/Failed</span>
            <Clock className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="text-2xl font-bold">
            {donations.filter((d) => d.status !== "success").length}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#2A3447] rounded-xl p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#1B2232] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#FA8B46] focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-[#1B2232] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#FA8B46] focus:border-transparent outline-none transition-all"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="created">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-[#2A3447] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1B2232]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                  Donor
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                  Campaign
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                  Receipt
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredDonations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-gray-400">
                      <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-lg font-medium mb-1">
                        No donations found
                      </p>
                      <p className="text-sm">
                        {searchTerm || statusFilter !== "all"
                          ? "Try adjusting your filters"
                          : "Donations will appear here"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredDonations.map((donation) => (
                  <tr
                    key={donation.id}
                    className="hover:bg-[#1B2232]/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {donation.isAnonymous
                            ? "Anonymous"
                            : donation.donorName}
                        </span>
                        {!donation.isAnonymous && (
                          <>
                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                              <Mail className="w-3 h-3" />
                              {donation.donorEmail}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Phone className="w-3 h-3" />
                              {donation.donorPhone}
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 font-semibold text-[#FA8B46]">
                        <IndianRupee className="w-4 h-4" />
                        {(donation.amount / 100).toLocaleString("en-IN")}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-300">
                        {donation.campaign?.title || "General Donation"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(donation.status)}`}
                      >
                        {getStatusIcon(donation.status)}
                        {donation.status.charAt(0).toUpperCase() +
                          donation.status.slice(1)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {new Date(donation.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          donation.receiptSent
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {donation.receiptSent ? "Sent" : "Not sent"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
