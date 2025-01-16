"use client";

import React from "react";

import Nav from "../containers/nav/nav";

type DashboardLayoutProps = { children: React.ReactNode };

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background bg-pattern bg-center p-6">
      <main className="mx-auto max-w-7xl">
        <Nav />
        {children}
      </main>
    </div>
  );
}
