import z from "zod";

export const schoolInfoSchema = z.object({
  schoolName: z.string().min(1, "School name is required"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  countryCode: z.string().min(1, "Country code is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  pinCode: z.string().min(1, "Pin/Zip code is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
});

export const registerSchoolSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
});