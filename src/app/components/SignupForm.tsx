"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginType, signupSchema, type signupType } from "../schema/auth";
import { createAccount } from "@/lib/actions/user.actions";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signupType>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data: signupType) => {
    const user = createAccount({
        fullName:data.name,
        email:data.email
    })    
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div>
          <input
            type="name"
            id="name"
            {...register("name")}
            placeholder="your name"
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            id="email"
            {...register("email")}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-primary rounded-lg py-2 font-medium shadow-sm hover:opacity-90 text-foreground text-primary-foreground"
          disabled={isSubmitting}
      >
        Submit
      </button>
    </form>
  );
};

export default SignupForm;
