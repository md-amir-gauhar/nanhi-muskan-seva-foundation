import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, User, Mail, Phone, IndianRupee } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { z } from "zod";

const donationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(/^[0-9+\-\s]+$/, "Invalid phone number"),
  amount: z
    .number()
    .min(100, "Minimum donation amount is ₹100")
    .max(10000000, "Maximum donation amount is ₹1,00,00,000"),
});

interface Campaign {
  id: number;
  title: string;
  description: string;
}

interface DonationFormProps {
  campaign: Campaign;
  onClose: () => void;
}

const predefinedAmounts = [500, 1000, 2000, 5000, 10000];

const DonationForm = ({ campaign, onClose }: DonationFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
  });
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setFormData({ ...formData, amount: amount.toString() });
    setErrors({ ...errors, amount: "" });
  };

  const handleCustomAmount = (value: string) => {
    setSelectedAmount(null);
    setFormData({ ...formData, amount: value });
    setErrors({ ...errors, amount: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validationData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      amount: parseFloat(formData.amount) || 0,
    };

    const result = donationSchema.safeParse(validationData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success(
      `Thank you for your generous donation of ₹${formData.amount} to "${campaign.title}"! We'll send a confirmation to ${formData.email}.`,
    );

    setIsSubmitting(false);
    onClose();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN").format(amount);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        tabIndex={0}
        role="dialog"
        aria-label={`Donate to ${campaign.title}`}
        ref={(el) => el?.focus()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-background rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="gradient-hero p-6 rounded-t-3xl relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
                <Heart
                  className="w-6 h-6 text-primary-foreground"
                  fill="currentColor"
                />
              </div>
              <div>
                <p className="text-primary-foreground/80 text-sm font-body">
                  Donating to
                </p>
                <h3 className="font-display font-bold text-xl text-primary-foreground">
                  {campaign.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Predefined Amounts */}
            <div>
              <label className="font-body font-medium text-foreground text-sm mb-3 block">
                Select Amount
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleAmountSelect(amount)}
                    className={`py-3 px-2 rounded-xl font-body font-semibold text-sm transition-all duration-200 ${
                      selectedAmount === amount
                        ? "bg-primary text-primary-foreground shadow-lg scale-105"
                        : "bg-muted text-foreground hover:bg-primary/10"
                    }`}
                  >
                    ₹{formatCurrency(amount)}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <label className="font-body font-medium text-foreground text-sm mb-2 block">
                Or Enter Custom Amount
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={selectedAmount ? "" : formData.amount}
                  onChange={(e) => handleCustomAmount(e.target.value)}
                  className="pl-12 h-14 rounded-2xl border-border bg-muted/50 font-body focus:ring-primary"
                  min="100"
                />
              </div>
              {errors.amount && (
                <p className="text-destructive text-sm mt-1 font-body">
                  {errors.amount}
                </p>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="font-body font-medium text-foreground text-sm mb-2 block">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    setErrors({ ...errors, name: "" });
                  }}
                  className="pl-12 h-14 rounded-2xl border-border bg-muted/50 font-body focus:ring-primary"
                />
              </div>
              {errors.name && (
                <p className="text-destructive text-sm mt-1 font-body">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="font-body font-medium text-foreground text-sm mb-2 block">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setErrors({ ...errors, email: "" });
                  }}
                  className="pl-12 h-14 rounded-2xl border-border bg-muted/50 font-body focus:ring-primary"
                />
              </div>
              {errors.email && (
                <p className="text-destructive text-sm mt-1 font-body">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="font-body font-medium text-foreground text-sm mb-2 block">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    setErrors({ ...errors, phone: "" });
                  }}
                  className="pl-12 h-14 rounded-2xl border-border bg-muted/50 font-body focus:ring-primary"
                />
              </div>
              {errors.phone && (
                <p className="text-destructive text-sm mt-1 font-body">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !formData.amount}
              className="btn-hero w-full py-6 text-base"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                  />
                  Processing...
                </span>
              ) : (
                <>
                  <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                  Donate{" "}
                  {formData.amount
                    ? `₹${formatCurrency(parseInt(formData.amount))}`
                    : "Now"}
                </>
              )}
            </Button>

            <p className="text-center text-muted-foreground text-xs font-body">
              Your donation is secure and encrypted. You will receive a
              confirmation email with your donation receipt.
            </p>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DonationForm;
