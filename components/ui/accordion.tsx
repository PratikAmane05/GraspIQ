"use client";
import * as React from "react";
import { cn } from "@/components/utils/cn";

interface AccordionContextProps {
  value: string | null;
  setValue: (v: string | null) => void;
  collapsible: boolean;
}

const AccordionContext = React.createContext<AccordionContextProps | null>(
  null
);

interface AccordionProps {
  children: React.ReactNode;
  type?: "single";
  collapsible?: boolean;
  className?: string;
  defaultValue?: string | null;
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  type = "single",
  collapsible = true,
  className,
  defaultValue = null,
}) => {
  const [value, setValue] = React.useState<string | null>(defaultValue);
  return (
    <div className={cn("space-y-2", className)} role="presentation">
      <AccordionContext.Provider value={{ value, setValue, collapsible }}>
        {children}
      </AccordionContext.Provider>
    </div>
  );
};

interface ItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const AccordionItem: React.FC<ItemProps> = ({
  value,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "rounded-md border border-border bg-background/40 backdrop-blur-sm",
        className
      )}
      data-accordion-item
      data-value={value}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as any, { itemValue: value });
      })}
    </div>
  );
};

interface TriggerProps {
  children: React.ReactNode;
  itemValue?: string;
  className?: string;
}

export const AccordionTrigger: React.FC<TriggerProps> = ({
  children,
  itemValue,
  className,
}) => {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionTrigger must be used within Accordion");
  const open = ctx.value === itemValue;

  const toggle = () => {
    if (open && ctx.collapsible) ctx.setValue(null);
    else ctx.setValue(itemValue || null);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  const contentId = `accordion-content-${itemValue}`;
  const buttonId = `accordion-trigger-${itemValue}`;

  return (
    <button
      id={buttonId}
      aria-controls={contentId}
      aria-expanded={open}
      onClick={toggle}
      onKeyDown={onKeyDown}
      className={cn(
        "w-full text-left py-4 font-medium flex justify-between items-center outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
        "transition-colors",
        className
      )}
    >
      <span>{children}</span>
      <span
        aria-hidden
        className={cn(
          "transition-transform text-muted-foreground",
          open && "rotate-180"
        )}
      >
        ⌄
      </span>
    </button>
  );
};

interface ContentProps {
  children: React.ReactNode;
  itemValue?: string;
  className?: string;
}

export const AccordionContent: React.FC<ContentProps> = ({
  children,
  itemValue,
  className,
}) => {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionContent must be used within Accordion");
  const open = ctx.value === itemValue;
  const contentId = `accordion-content-${itemValue}`;
  const buttonId = `accordion-trigger-${itemValue}`;
  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={buttonId}
      hidden={!open}
      className={cn(
        "pb-4 -mt-1 text-sm text-muted-foreground pr-1",
        open ? "animate-in fade-in slide-in-from-top-1" : "opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
};
