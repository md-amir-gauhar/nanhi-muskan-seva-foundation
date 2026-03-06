"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Heart,
  IndianRupee,
  Mail,
  Phone,
  User,
  CreditCard,
  Target,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Campaign {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  image: string;
  category: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const DonatePage = () => {
  const searchParams = useSearchParams();
  const campaignId = searchParams.get("campaign");

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingCampaign, setLoadingCampaign] = useState(true);

  // Form state
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorPan, setDonorPan] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000];

  useEffect(() => {
    if (campaignId) {
      fetchCampaign();
    } else {
      setLoadingCampaign(false);
    }
  }, [campaignId]);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const fetchCampaign = async () => {
    try {
      const response = await fetch(`/api/campaigns/${campaignId}`);
      const data = await response.json();
      if (data.success) {
        setCampaign(data.data);
      }
    } catch (error) {
      console.error("Error fetching campaign:", error);
    } finally {
      setLoadingCampaign(false);
    }
  };

  const handleAmountSelect = (value: number) => {
    setAmount(value.toString());
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setAmount("");
  };

  const getSelectedAmount = () => {
    return customAmount ? parseFloat(customAmount) : parseFloat(amount);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedAmount = getSelectedAmount();

    if (!selectedAmount || selectedAmount < 1) {
      alert("Please enter a valid amount");
      return;
    }

    if (!donorName || !donorEmail || !donorPhone) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      // Create order
      const orderResponse = await fetch("/api/donation/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: selectedAmount,
          donorName,
          donorEmail,
          donorPhone,
          donorPan: donorPan || undefined,
          isAnonymous,
          campaignId: campaignId || undefined,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error("Failed to create order");
      }

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Nanhi Muskan Seva Foundation",
        description: campaign
          ? `Donation for ${campaign.title}`
          : "General Donation",
        image: "/logo.png",
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyResponse = await fetch("/api/donation/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              // Show success message
              alert(
                `Thank you for your donation of ₹${selectedAmount}! A receipt has been sent to your email.`,
              );
              // Reset form
              setAmount("");
              setCustomAmount("");
              setDonorName("");
              setDonorEmail("");
              setDonorPhone("");
              setDonorPan("");
              setIsAnonymous(false);
              // Refresh campaign data
              if (campaignId) {
                fetchCampaign();
              }
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert("Payment verification failed. Please contact support.");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: donorName,
          email: donorEmail,
          contact: donorPhone,
        },
        theme: {
          color: "#FA8B46",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to initiate payment. Please try again.");
      setLoading(false);
    }
  };

  if (loadingCampaign) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF5EE]">
        <div className="inline-block w-8 h-8 border-4 border-[#FA8B46] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5EE] to-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-[#FA8B46] font-body font-semibold text-sm uppercase tracking-wider inline-flex items-center gap-2 mb-3">
              <Heart className="w-4 h-4" />
              Make a Donation
            </span>
            <h1 className="font-display font-black text-4xl md:text-5xl text-foreground mb-4">
              Support Our <span className="text-[#FA8B46]">Mission</span>
            </h1>
            <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
              Your generosity brings hope and smiles to children in need
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Campaign Info (if selected) */}
            {campaign && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100"
              >
                <div className="relative h-64">
                  <Image
                    src={campaign.image}
                    alt={campaign.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm bg-white/90 text-[#FA8B46]">
                      {campaign.category.charAt(0).toUpperCase() +
                        campaign.category.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="font-display font-bold text-2xl mb-3 text-foreground">
                    {campaign.title}
                  </h2>
                  <p className="font-body text-muted-foreground mb-6">
                    {campaign.description}
                  </p>

                  {/* Progress */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-[#FA8B46]" />
                        <span className="font-semibold text-foreground">
                          ₹{campaign.raised.toLocaleString("en-IN")}
                        </span>
                        <span className="text-muted-foreground">raised</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Target className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold text-gray-700">
                          ₹{campaign.goal.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#FA8B46] to-[#ff9d5c] h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%`,
                        }}
                      />
                    </div>

                    <div className="text-center">
                      <span className="text-[#FA8B46] font-semibold text-sm">
                        {((campaign.raised / campaign.goal) * 100).toFixed(1)}%
                        funded
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Donation Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-8 ${!campaign ? "lg:col-span-2 max-w-2xl mx-auto" : ""}`}
            >
              <form onSubmit={handlePayment} className="space-y-6">
                {/* Amount Selection */}
                <div>
                  <label className="flex items-center gap-2 font-display font-bold text-lg mb-4">
                    <IndianRupee className="w-5 h-5 text-[#FA8B46]" />
                    Select Amount
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {predefinedAmounts.map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleAmountSelect(value)}
                        className={`py-3 px-4 rounded-xl font-body font-semibold transition-all duration-300 ${
                          amount === value.toString()
                            ? "bg-[#FA8B46] text-white shadow-lg scale-105"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        ₹{value.toLocaleString("en-IN")}
                      </button>
                    ))}
                  </div>
                  <Input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    min="1"
                    className="font-body"
                  />
                </div>

                {/* Donor Details */}
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-lg">
                    Your Details
                  </h3>

                  <div>
                    <label className="flex items-center gap-2 font-body text-sm font-semibold mb-2">
                      <User className="w-4 h-4 text-[#FA8B46]" />
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required
                      disabled={isAnonymous}
                      className="font-body"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 font-body text-sm font-semibold mb-2">
                      <Mail className="w-4 h-4 text-[#FA8B46]" />
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      required
                      className="font-body"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 font-body text-sm font-semibold mb-2">
                      <Phone className="w-4 h-4 text-[#FA8B46]" />
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      required
                      className="font-body"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 font-body text-sm font-semibold mb-2">
                      <CreditCard className="w-4 h-4 text-[#FA8B46]" />
                      PAN Number (Optional)
                    </label>
                    <Input
                      type="text"
                      placeholder="ABCDE1234F"
                      value={donorPan}
                      onChange={(e) =>
                        setDonorPan(e.target.value.toUpperCase())
                      }
                      maxLength={10}
                      className="font-body uppercase"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Required for 80G tax exemption certificate
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={isAnonymous}
                      onChange={(e) => {
                        setIsAnonymous(e.target.checked);
                        if (e.target.checked) {
                          setDonorName("Anonymous");
                        } else {
                          setDonorName("");
                        }
                      }}
                      className="w-4 h-4 text-[#FA8B46] rounded focus:ring-[#FA8B46]"
                    />
                    <label
                      htmlFor="anonymous"
                      className="font-body text-sm text-gray-700"
                    >
                      Make this donation anonymous
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading || !getSelectedAmount()}
                  className="w-full bg-[#FA8B46] hover:bg-[#FA8B46]/90 text-white py-6 rounded-xl font-display font-bold text-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Heart className="w-5 h-5" />
                      Donate{" "}
                      {getSelectedAmount()
                        ? `₹${getSelectedAmount().toLocaleString("en-IN")}`
                        : ""}
                    </span>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Your donation is secure and encrypted. You will receive a
                  receipt via email.
                </p>
              </form>
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>80G Tax Benefit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Email Receipt</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DonatePage;
