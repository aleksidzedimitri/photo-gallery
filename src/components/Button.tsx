import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="px-4 py-2 text-xs md:text-base rounded-md bg-blue-700 text-stone-200 hover:bg-blue-600 hover:text-stone-100"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
