import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-border/60 placeholder:text-muted-foreground/60 focus:border-primary/40 focus:ring-primary/10 aria-invalid:ring-destructive/20 aria-invalid:border-destructive flex field-sizing-content min-h-28 w-full rounded-lg border-2 bg-background/50 backdrop-blur-sm px-4 py-3 text-base shadow-soft transition-all duration-300 outline-none focus:ring-4 focus:shadow-card focus:bg-background hover:border-border hover:shadow-card disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
