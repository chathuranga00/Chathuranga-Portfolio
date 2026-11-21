import { z } from 'zod';

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters.' })
    .max(80, { message: 'Full name must not exceed 80 characters.' }),
  email: z
    .string()
    .min(1, { message: 'Email address is required.' })
    .email({ message: 'Please enter a valid email address (e.g., name@domain.com).' }),
  subject: z
    .string()
    .min(3, { message: 'Subject must be at least 3 characters.' })
    .max(120, { message: 'Subject must not exceed 120 characters.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters so I can understand your inquiry.' })
    .max(3000, { message: 'Message must not exceed 3000 characters.' }),
  honeypot: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
