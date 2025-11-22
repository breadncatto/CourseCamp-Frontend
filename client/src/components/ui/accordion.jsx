import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import "./Accordion.css";

export function Accordion(props) {
  return <AccordionPrimitive.Root className="accordion" {...props} />;
}

export function AccordionItem({ className = "", ...props }) {
  return (
    <AccordionPrimitive.Item
      className={`accordion-item ${className}`}
      {...props}
    />
  );
}

export function AccordionTrigger({ children, className = "", ...props }) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        className={`accordion-trigger ${className}`}
        {...props}
      >
        {children} <ChevronDown className="accordion-icon" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ className = "", ...props }) {
  return (
    <AccordionPrimitive.Content className={`accordion-content`} {...props}>
      <div className={`accordion-inner ${className}`}>{props.children}</div>
    </AccordionPrimitive.Content>
  );
}
