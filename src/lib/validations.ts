import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
  role: z.enum(["ARTIST", "CUSTOMER"], {
    required_error: "Bir rol seçiniz",
  }),
});

export const profileSchema = z.object({
  bio: z.string().max(500, "Bio en fazla 500 karakter olabilir").optional(),
  studioName: z.string().max(100).optional(),
  city: z.string().max(50).optional(),
  district: z.string().max(50).optional(),
  address: z.string().max(200).optional(),
  experienceYears: z.coerce.number().min(0).max(50).optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  phone: z.string().max(20).optional(),
  instagram: z.string().max(50).optional(),
  styles: z.array(z.string()).optional(),
});

export const appointmentSchema = z.object({
  artistProfileId: z.string().min(1, "Sanatçı seçilmelidir"),
  requestedDate: z.string().min(1, "Tarih seçilmelidir"),
  description: z
    .string()
    .min(10, "Açıklama en az 10 karakter olmalıdır")
    .max(1000),
});

export const reviewSchema = z.object({
  artistProfileId: z.string().min(1),
  rating: z.coerce.number().min(1).max(5),
  comment: z.string().max(500).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type AppointmentInput = z.infer<typeof appointmentSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
