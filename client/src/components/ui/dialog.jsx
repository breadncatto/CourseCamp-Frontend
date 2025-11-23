"use client";

import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import "./dialog.css";

export const Dialog = (props) => <DialogPrimitive.Root {...props} />;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogPortal = DialogPrimitive.Portal;

export const DialogOverlay = ({ className, ...props }) => (
  <DialogPrimitive.Overlay className={`dialog-overlay ${className || ""}`} {...props} />
);

export const DialogContent = ({ className, children, ...props }) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content className={`dialog-content ${className || ""}`} {...props}>
      {children}
      <DialogPrimitive.Close className="dialog-close">
        <XIcon />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
);

export const DialogHeader = ({ className, ...props }) => (
  <div className={`dialog-header ${className || ""}`} {...props} />
);

export const DialogFooter = ({ className, ...props }) => (
  <div className={`dialog-footer ${className || ""}`} {...props} />
);

export const DialogTitle = ({ className, ...props }) => (
  <DialogPrimitive.Title className={`dialog-title ${className || ""}`} {...props} />
);

export const DialogDescription = ({ className, ...props }) => (
  <DialogPrimitive.Description className={`dialog-description ${className || ""}`} {...props} />
);
