import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  message: z.string().min(10, "Mesajınız en az 10 karakter olmalıdır")
});

