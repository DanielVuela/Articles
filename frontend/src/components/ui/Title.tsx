import React, { type JSX } from "react";

interface TitleProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3;
  className?: string;
}

export default function Title({
  children,
  level = 1,
  className = "",
}: TitleProps) {
  const baseStyles = "font-semibold";

  const sizes = {
    1: "text-xl",
    2: "text-2xl",
    3: "text-3xl",
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={`${baseStyles} ${sizes[level]} ${className}`}>
      {children}
    </Tag>
  );
}