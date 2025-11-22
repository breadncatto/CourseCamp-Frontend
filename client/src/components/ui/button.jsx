import React from "react";
import "./Button.css";

export function Button({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
