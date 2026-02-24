import { z } from "zod";

export const emailSchema = z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address");

export const userSchema = z.string()
    .min(4, "Username must be at least 4 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number");

export const otpSchema = z.object({
    otp: z
        .string()
        .min(6, "OTP must be 6 digits")
        .max(6, "OTP must be 6 digits")
        .regex(/^[0-9]+$/, "OTP must contain only numbers")
});

export const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
};
export const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain uppercase letter")
    .regex(/[a-z]/, "Must contain lowercase letter")
    .regex(/[0-9]/, "Must contain number")
    .regex(/[^A-Za-z0-9]/, "Must contain special character");


export const setNewPasswordSchema = z.object({
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});


export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email address"),
});




export const loginSchema = z.object({
    email_username: z
        .string()
        .min(1, "Email or username is required")
        .refine(
            (val) => emailSchema.safeParse(val).success || userSchema.safeParse(val).success,
            "Enter a valid email or username"
        ),
    password: passwordSchema,
});
export const registerSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});
