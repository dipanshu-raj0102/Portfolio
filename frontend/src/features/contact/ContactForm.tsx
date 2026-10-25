import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, LoaderCircle, Send, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { submitContact } from '@/lib/api';
import { getSubmissionToken } from '@/lib/format';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  subject: z.string().trim().min(3, 'Please add a short subject.'),
  message: z.string().trim().min(20, 'Please share a little more context (20 characters minimum).').max(4000, 'Please keep the message under 4,000 characters.'),
  website: z.string().max(0).optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [result, setResult] = useState<'idle' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState('');
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema), defaultValues: { name: '', email: '', subject: '', message: '', website: '' } });

  const onSubmit = async (values: ContactFormValues) => {
    setResult('idle');
    setServerMessage('');
    try {
      await submitContact({ ...values, submission_token: getSubmissionToken() });
      setResult('success');
      reset();
    } catch (error: unknown) {
      setResult('error');
      setServerMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-grid">
        <label className="field"><span>Name</span><input {...register('name')} autoComplete="name" placeholder="Your name" aria-invalid={Boolean(errors.name)} />{errors.name ? <small>{errors.name.message}</small> : null}</label>
        <label className="field"><span>Email</span><input {...register('email')} autoComplete="email" inputMode="email" placeholder="you@example.com" aria-invalid={Boolean(errors.email)} />{errors.email ? <small>{errors.email.message}</small> : null}</label>
      </div>
      <label className="field"><span>Subject</span><input {...register('subject')} placeholder="What are you building?" aria-invalid={Boolean(errors.subject)} />{errors.subject ? <small>{errors.subject.message}</small> : null}</label>
      <label className="field"><span>Message</span><textarea {...register('message')} placeholder="A little context, the hard part, and what a useful next step would be." rows={6} aria-invalid={Boolean(errors.message)} />{errors.message ? <small>{errors.message.message}</small> : null}</label>
      <label className="honeypot" aria-hidden="true">Website<input {...register('website')} tabIndex={-1} autoComplete="off" /></label>
      <div className="form-actions">
        <button className="button button--primary" disabled={isSubmitting} type="submit">{isSubmitting ? <><LoaderCircle className="spin" size={16} />Sending</> : <><span>Send message</span><Send size={16} /></>}</button>
        <span className="form-note"><ShieldAlert size={15} /> No marketing list. Message data is retained only for follow-up.</span>
      </div>
      <div className="form-status" aria-live="polite">
        {result === 'success' ? <p className="success-message"><CheckCircle2 size={18} />Message received. Thanks — I’ll follow up from the configured inbox.</p> : null}
        {result === 'error' ? <p className="error-message"><ShieldAlert size={18} />{serverMessage}</p> : null}
      </div>
    </form>
  );
}
