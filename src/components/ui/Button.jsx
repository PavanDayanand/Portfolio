import React from "react";

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-transform active:scale-95";

  const variants = {
    primary: "bg-brand-blue text-white hover:bg-blue-700",
    secondary:
      "bg-white text-brand-dark border border-gray-200 hover:bg-gray-50",
    dark: "bg-brand-dark text-white hover:bg-black",
    ghost: "bg-transparent text-brand-dark hover:bg-gray-100",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
