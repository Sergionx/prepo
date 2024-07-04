import React from "react";
import Sidebar from "@/lib/components/layout/sidebar/Sidebar";
import MarginWidthWrapper from "@/lib/components/layout/sidebar/margin-witdh-wrapper";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1">
        <MarginWidthWrapper>{children}</MarginWidthWrapper>
      </main>
    </div>
  );
}
