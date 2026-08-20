"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialogTrigger } from "./ui/alert-dialog";
import { loginSchema, type loginType } from "../app/schema/auth";
import { createAccount } from "@/lib/actions/user.actions";
import OTPModal from "./OTPModal";

const LoginForm = () => {

    const [accountId, setAccountId] = useState('')
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<loginType>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: loginType) => {
        const user = await createAccount({
            fullName: '',
            email: data.email
        })
        setAccountId(user.accountId)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
                <input
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
                />

                {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
            </div>

            {/* Submit */}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-card disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isSubmitting ? "Logging in..." : "Login"}
            </button>

            {
                accountId && <OTPModal accountId={accountId}/>
            }

        </form>
    );
};

export default LoginForm;
