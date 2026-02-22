import Link from "next/link";
import { useRouter } from "next/router";
import { forwardRef, AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> {
  href: string;
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, href, ...props }, ref) => {
    const router = useRouter();
    const isActive = router.pathname === href || router.asPath === href;

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
