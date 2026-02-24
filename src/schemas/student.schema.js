
import { z } from "zod";
// ───new admission  Zod Schemas ────────────────────────────────────────────────────
export const step1Schema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  gender: z.string().min(1, "Please select a gender"),
  dob: z.string().min(1, "Date of birth is required").refine((val) => {
    const date = new Date(val);
    const now = new Date();
    const age = now.getFullYear() - date.getFullYear();
    return age >= 3 && age <= 25;
  }, "Please enter a valid date of birth (age 3–25)"),
  bloodGroup: z.string().optional(),
  grade: z.string().min(1, "Please select a class/grade"),
  category: z.string().optional(),
  aadhaar: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{12}$/.test(val), "Aadhaar must be exactly 12 digits"),
  nationality: z.string().optional(),
  religion: z.string().optional(),
});

export const step2Schema = z.object({
  father: z.object({
    name: z.string().min(2, "Father's name must be at least 2 characters"),
    mobile: z
      .string()
      .min(10, "Mobile number must be 10 digits")
      .max(10, "Mobile number must be 10 digits")
      .regex(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
    email: z.string().email("Enter a valid email").optional().or(z.literal("")),
    occupation: z.string().optional(),
    income: z.string().optional(),
    aadhaar: z
      .string()
      .optional()
      .refine((val) => !val || /^\d{12}$/.test(val), "Aadhaar must be exactly 12 digits"),
  }),
  mother: z.object({
    name: z.string().min(2, "Mother's name must be at least 2 characters"),
    mobile: z
      .string()
      .min(10, "Mobile number must be 10 digits")
      .max(10, "Mobile number must be 10 digits")
      .regex(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
    email: z.string().email("Enter a valid email").optional().or(z.literal("")),
    occupation: z.string().optional(),
    income: z.string().optional(),
    aadhaar: z
      .string()
      .optional()
      .refine((val) => !val || /^\d{12}$/.test(val), "Aadhaar must be exactly 12 digits"),
  }),
});

export const addressSchema = z.object({
  line1: z.string().optional(),
  line2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{6}$/.test(val), "Pincode must be 6 digits"),
  country: z.string().optional(),
});

export const step3Schema = z.object({
  presentAddress: addressSchema,
  permanentAddress: addressSchema,
});

 export const step4Schema = z.object({
  school: z.object({
    name: z.string().min(2, "School name must be at least 2 characters"),
    board: z.string().min(1, "Please select a board"),
    lastClass: z.string().min(1, "Please select last class passed"),
    medium: z.string().min(1, "Please select medium of instruction"),
    yearOfPassing: z.string().min(1, "Please select year of passing"),
    tcAvailable: z.boolean().optional(),
    remarks: z.string().optional(),
  }),
});

export const step6Schema = z.object({
  fee: z.object({
    template: z.string().min(1, "Please select a fee template"),
    installment: z.string().min(1, "Please select an installment plan"),
    discount: z.string().optional(),
    adjustment: z.string().optional(),
  }),
});

// Combined schema for full form
export const fullSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step6Schema);

// Per-step resolver map (fields to validate per step)
export const stepSchemas = {
  1: step1Schema,
  2: step2Schema,
  3: step3Schema,
  4: step4Schema,
  5: z.object({}),
  6: step6Schema,
  7: z.object({}),
};



//  new registration schema

export const basicDetailsSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  gender: z.string().min(1, "Please select a gender"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  bloodGroup: z.string().optional(),
  classGrade: z.string().min(1, "Please select a class"),
  category: z.string().min(1, "Please select a category"),
  aadhaar: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{12}$/.test(val), "Aadhaar must be 12 digits"),
  nationality: z.string().min(1, "Nationality is required"),
  religion: z.string().optional(),
});

export const parentDetailsSchema = z.object({
  fatherName: z.string().min(2, "Father's name is required"),
  fatherMobile: z
    .string()
    .min(10, "Enter a valid mobile number"),
  fatherEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  fatherOccupation: z.string().optional(),
  fatherIncome: z.string().optional(),
  fatherAadhaar: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{12}$/.test(val), "Aadhaar must be 12 digits"),
  motherName: z.string().min(2, "Mother's name is required"),
  motherMobile: z.string().min(10, "Enter a valid mobile number"),
  motherEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  motherOccupation: z.string().optional(),
  motherIncome: z.string().optional(),
  motherAadhaar: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{12}$/.test(val), "Aadhaar must be 12 digits"),
});

// export const addressSchema = z.object({
//   presentLine1: z.string().min(5, "Address line 1 is required"),
//   presentLine2: z.string().optional(),
//   presentCity: z.string().min(2, "City is required"),
//   presentState: z.string().min(1, "Please select a state"),
//   presentPincode: z
//     .string()
//     .regex(/^\d{6}$/, "Pincode must be 6 digits"),
//   permanentLine1: z.string().min(5, "Address line 1 is required"),
//   permanentLine2: z.string().optional(),
//   permanentCity: z.string().min(2, "City is required"),
//   permanentState: z.string().min(1, "Please select a state"),
//   permanentPincode: z
//     .string()
//     .regex(/^\d{6}$/, "Pincode must be 6 digits"),
// });

export const previousSchoolSchema = z.object({
  schoolName: z.string().min(3, "School name is required"),
  board: z.string().min(1, "Please select a board"),
  lastClass: z.string().min(1, "Please select last class"),
  medium: z.string().min(1, "Medium of instruction is required"),
  yearOfPassing: z.string().min(1, "Year of passing is required"),
  percentage: z.string().optional(),
  tcAvailable: z.string().min(1, "Please select TC availability"),
  remarks: z.string().optional(),
});

export const feePaymentSchema = z.object({
  paymentMode: z.string().min(1, "Please select a payment mode"),
  transactionId: z.string().optional(),
  receiptDate: z.string().min(1, "Receipt date is required"),
  paymentRemarks: z.string().optional(),
});
