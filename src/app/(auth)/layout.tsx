"use client";

import React, { useState } from "react";
import { FormType } from "../types";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [formType, setFormType] = useState<FormType>("Login");

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background px-4 text-foreground">
      <div className="flex w-full max-w-md flex-col gap-8">
        {/* Logo / Brand */}
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground">
            DocNest
          </h1>

          <p className="text-sm text-muted-foreground">
            Your documents, organized.
          </p>
        </div>

        {/* Auth Card */}
        <div className="flex w-full flex-col gap-8 rounded-xl border border-border bg-card px-6 py-8 shadow-lg sm:px-8">
          {/* Form Title */}
          <div className="text-center">
            <h2 className="font-serif text-3xl font-semibold text-card-foreground">
              {formType === "Login"
                ? "Log in to DocNest"
                : "Sign up for DocNest"}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              {formType === "Login"
                ? "Welcome back. Please enter your details."
                : "Create your account to get started."}
            </p>
          </div>

          {/* Form */}
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;