import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const PersonalContact = () => {
  return (
    <div className="flex flex-col">
      <div className="text-sm font-medium text-secondary-foreground">
        <div>
          Built with{" "}
          <Heart
            fill={"currentColor"}
            className="inline-block size-4 text-red-500"
          />{" "}
          by{" "}
          <a
            className={cn(
              buttonVariants({
                variant: "link",
                size: "sm",
              }),
              "!p-0 underline text-sm font-bold text-secondary-foreground"
            )}
            target="_blank"
            href="https://sylvesteraswin.com"
          >
            Sylvester
          </a>
          .
        </div>
      </div>
    </div>
  );
};
