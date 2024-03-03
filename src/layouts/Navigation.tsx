import React from "react";
import Navbar from "../components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function NavigationLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col items-center w-full">
      <Navbar />
      {children}
    </div>
  );
}
