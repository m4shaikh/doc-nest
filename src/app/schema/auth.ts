import z, { email } from "zod";

export const loginSchema = z.object({
    email: z.string().min(1, "Email Required").pipe(z.email("Enter valid email")),

});

export const signupSchema = z.object({
    name: z.string().min(1, "Name Required"),
    email: z.string().min(1, "Email Required").pipe(z.email("Enter valid email")),
})

export type loginType = z.infer<typeof loginSchema>
export type signupType = z.infer<typeof signupSchema>