import { Mail, Phone } from "lucide-react";
import { SmallFlowerSVG } from "./DecorativeSVGs";

const TopBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-[#1B2232] text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-9 text-xs font-body">
          <div className="flex items-center gap-5">
            <a
              href="mailto:hello@littlehearts.org"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">hello@littlehearts.org</span>
            </a>
            <a
              href="tel:+919876543210"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">+91 98765 43210</span>
            </a>
          </div>
          <div className="flex items-center gap-2 text-background/70">
            <SmallFlowerSVG size={14} />
            <span>Changing lives, one child at a time</span>
            <SmallFlowerSVG size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
