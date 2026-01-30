import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
};

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-2 rounded-full cursor-pointer
        bg-[#6B8E7F] text-[#F6F7F3]
        hover:bg-[#5F8273]
        transition
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
