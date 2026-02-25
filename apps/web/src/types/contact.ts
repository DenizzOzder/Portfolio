import { z } from 'zod';
import { contactSchema } from '@/utils/contactValidation';

export type ContactFormData = z.infer<typeof contactSchema>;
