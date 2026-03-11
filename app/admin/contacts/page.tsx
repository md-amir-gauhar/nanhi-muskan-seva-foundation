"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  User,
  Loader2,
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  createdAt: string;
}

export default function AdminContactsPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    checkAuth();
    fetchContacts();
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

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/admin/contacts");
      const data = await response.json();
      if (data.success) setContacts(data.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ??
        false) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-[#1B2232] text-xl flex items-center gap-4">
          <Loader2 className="w-6 h-6 animate-spin" />
          Loading
        </div>
      </div>
    );
  }

  return (
    <div className="text-[#1B2232] p-8 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Contact Messages</h1>
        <p className="text-gray-600">View all contact form submissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Total Messages</span>
            <MessageSquare className="w-5 h-5 text-[#FA8B46]" />
          </div>
          <div className="text-2xl font-bold">{contacts.length}</div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Today</span>
            <Calendar className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold">
            {
              contacts.filter(
                (c) =>
                  new Date(c.createdAt).toDateString() ===
                  new Date().toDateString(),
              ).length
            }
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">This Week</span>
            <Calendar className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold">
            {
              contacts.filter((c) => {
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return new Date(c.createdAt) > weekAgo;
              }).length
            }
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, email, subject, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FA8B46]"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {filteredContacts.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">No contact messages found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Name
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Contact Info
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Subject
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Message
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#FA8B46]/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-[#FA8B46]" />
                        </div>
                        <div>
                          <div className="font-medium">{contact.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          <a
                            href={`mailto:${contact.email}`}
                            className="hover:text-[#FA8B46]"
                          >
                            {contact.email}
                          </a>
                        </div>
                        {contact.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            <a
                              href={`tel:${contact.phone}`}
                              className="hover:text-[#FA8B46]"
                            >
                              {contact.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-medium max-w-xs truncate">
                        {contact.subject || "-"}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-600 max-w-md truncate">
                        {contact.message}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-600">
                        {new Date(contact.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(contact.createdAt).toLocaleTimeString(
                          "en-IN",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedContact(contact)}
                        className="px-3 py-1.5 bg-[#FA8B46] text-white rounded-lg text-sm font-medium hover:bg-[#FA8B46]/90 transition-colors"
                      >
                        View Full
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Full Message */}
      {selectedContact && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedContact(null)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Contact Message</h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Name
                </label>
                <div className="mt-1 text-gray-900">{selectedContact.name}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Email
                  </label>
                  <div className="mt-1">
                    <a
                      href={`mailto:${selectedContact.email}`}
                      className="text-[#FA8B46] hover:underline"
                    >
                      {selectedContact.email}
                    </a>
                  </div>
                </div>
                {selectedContact.phone && (
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Phone
                    </label>
                    <div className="mt-1">
                      <a
                        href={`tel:${selectedContact.phone}`}
                        className="text-[#FA8B46] hover:underline"
                      >
                        {selectedContact.phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {selectedContact.subject && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Subject
                  </label>
                  <div className="mt-1 text-gray-900">
                    {selectedContact.subject}
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Message
                </label>
                <div className="mt-1 text-gray-900 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                  {selectedContact.message}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Received On
                </label>
                <div className="mt-1 text-gray-600">
                  {new Date(selectedContact.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}{" "}
                  at{" "}
                  {new Date(selectedContact.createdAt).toLocaleTimeString(
                    "en-IN",
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={`mailto:${selectedContact.email}`}
                className="flex-1 px-4 py-2 bg-[#FA8B46] text-white rounded-lg font-medium hover:bg-[#FA8B46]/90 transition-colors text-center"
              >
                Reply via Email
              </a>
              {selectedContact.phone && (
                <a
                  href={`tel:${selectedContact.phone}`}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors text-center"
                >
                  Call
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
