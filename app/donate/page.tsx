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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="inline-block w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-soft"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden py-20 px-4">
      {/* Elegant gradient orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/6 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-primary font-body font-semibold text-sm uppercase tracking-wider inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/5 backdrop-blur-sm">
              <Heart className="w-4 h-4" />
              Make a Donation
            </span>
            <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-foreground mb-5">
              Support Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/90 to-secondary">
                Mission
              </span>
            </h1>
            <p className="font-body text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
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
                className="bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-card border border-border/50"
              >
                <div className="relative h-72">
                  <Image
                    src={campaign.image}
                    alt={campaign.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md bg-white/95 text-primary shadow-soft border border-white/50">
                      {campaign.category.charAt(0).toUpperCase() +
                        campaign.category.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="p-7">
                  <h2 className="font-display font-bold text-2xl mb-3 text-foreground">
                    {campaign.title}
                  </h2>
                  <p className="font-body text-muted-foreground mb-7 leading-relaxed">
                    {campaign.description}
                  </p>

                  {/* Progress */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-foreground">
                          ₹{campaign.raised.toLocaleString("en-IN")}
                        </span>
                        <span className="text-muted-foreground">raised</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Target className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold text-foreground">
                          ₹{campaign.goal.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden shadow-inner">
                      <div
                        className="bg-gradient-to-r from-primary via-primary/90 to-secondary h-full rounded-full transition-all duration-1000 shadow-soft"
                        style={{
                          width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%`,
                        }}
                      />
                    </div>

                    <div className="text-center">
                      <span className="text-primary font-bold text-sm">
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
              className={`bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-sm rounded-3xl shadow-card border border-border/50 p-8 md:p-10 ${!campaign ? "lg:col-span-2 max-w-2xl mx-auto" : ""}`}
            >
              <form onSubmit={handlePayment} className="space-y-7">
                {/* Amount Selection */}
                <div>
                  <label className="flex items-center gap-2 font-display font-bold text-xl mb-5">
                    <IndianRupee className="w-5 h-5 text-primary" />
                    Select Amount
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {predefinedAmounts.map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleAmountSelect(value)}
                        className={`py-3.5 px-4 rounded-xl font-body font-bold transition-all duration-300 ${
                          amount === value.toString()
                            ? "bg-gradient-to-br from-primary to-primary/90 text-white shadow-card scale-105"
                            : "bg-muted/80 text-foreground hover:bg-muted hover:shadow-soft hover:scale-102"
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
                <div className="space-y-5">
                  <h3 className="font-display font-bold text-xl">
                    Your Details
                  </h3>

                  <div>
                    <label className="flex items-center gap-2 font-body text-sm font-semibold mb-2.5">
                      <User className="w-4 h-4 text-primary" />
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
                    <label className="flex items-center gap-2 font-body text-sm font-semibold mb-2.5">
                      <Mail className="w-4 h-4 text-primary" />
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
                    <label className="flex items-center gap-2 font-body text-sm font-semibold mb-2.5">
                      <Phone className="w-4 h-4 text-primary" />
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
                    <label className="flex items-center gap-2 font-body text-sm font-semibold mb-2.5">
                      <CreditCard className="w-4 h-4 text-primary" />
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

                  <div className="flex items-center gap-3 pt-2">
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
                      className="w-5 h-5 text-primary rounded border-2 border-border focus:ring-2 focus:ring-primary/30 cursor-pointer transition-all"
                    />
                    <label
                      htmlFor="anonymous"
                      className="font-body text-sm text-foreground font-medium cursor-pointer"
                    >
                      Make this donation anonymous
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading || !getSelectedAmount()}
                  className="w-full py-7 rounded-xl font-display font-bold text-lg shadow-card hover:shadow-elevated"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Heart className="w-5 h-5" fill="currentColor" />
                      Donate{" "}
                      {getSelectedAmount()
                        ? `₹${getSelectedAmount().toLocaleString("en-IN")}`
                        : ""}
                    </span>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground leading-relaxed">
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
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-8 px-8 py-5 rounded-2xl bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm border border-border/50 shadow-card">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-soft" />
                <span className="font-body text-sm font-medium text-foreground">
                  Secure Payment
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-soft" />
                <span className="font-body text-sm font-medium text-foreground">
                  80G Tax Benefit
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-soft" />
                <span className="font-body text-sm font-medium text-foreground">
                  Email Receipt
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DonatePage;
