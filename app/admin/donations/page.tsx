"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  IndianRupee,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Loader2,
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-[#1B2232] text-xl flex items-center gap-4 ">
          <Loader2 /> Loading{" "}
        </div>
      </div>
    );
  }

  return (
    <div className="text-[#1B2232] p-8 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Donations</h1>
        <p className="text-gray-600">View and manage all donations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Total Donations</span>
            <IndianRupee className="w-5 h-5 text-[#FA8B46]" />
          </div>
          <div className="text-2xl font-bold">
            ₹{(totalAmount / 100).toLocaleString("en-IN")}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Total Count</span>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold">{filteredDonations.length}</div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Successful</span>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold">
            {donations.filter((d) => d.status === "success").length}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Pending/Failed</span>
            <Clock className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold">
            {donations.filter((d) => d.status !== "success").length}
          </div>
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#FFF5EE]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
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
            <tbody className="divide-y divide-gray-200">
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
                  <tr key={donation.id}>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {donation.isAnonymous
                            ? "Anonymous"
                            : donation.donorName}
                        </span>
                        {!donation.isAnonymous && (
                          <>
                            <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                              <Mail className="w-3 h-3" />
                              {donation.donorEmail}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-600">
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
                      <span className="text-sm font-medium text-gray-900">
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
                      <div className="flex items-center gap-1 text-sm text-gray-600">
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
