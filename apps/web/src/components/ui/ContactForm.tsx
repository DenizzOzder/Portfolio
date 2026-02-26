import React, { useState } from 'react';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { contactSchema, type ContactFormData } from '../../utils/contactValidation';
import { toast } from 'react-hot-toast';

export const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev: ContactFormData) => ({ ...prev, [id]: value }));
    // Clear error when user starts typing
    if (errors[id as keyof ContactFormData]) {
      setErrors((prev: Partial<Record<keyof ContactFormData, string>>) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form safely
    const validationResult = contactSchema.safeParse(formData);
    
    if (!validationResult.success) {
      // Map Zod errors
      const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
      validationResult.error.issues.forEach((err: z.ZodIssue) => {
        if (err.path[0]) {
          newErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(newErrors);
      toast.error(t('contact.errors.validation'));
      return;
    }

    try {
      setErrors({});
      setIsSubmitting(true);
      
      // Web3Forms submission
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      
      if (!accessKey) {
        toast.error(t('contact.errors.missingKey'));
        setIsSubmitting(false);
        return;
      }
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: 'Portfolio: Yeni Form Mesajı',
          from_name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success(t('contact.successMessage'));
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error(result.message || t('contact.errors.serverError'));
      }
    } catch (error) {
      toast.error(t('contact.errors.unexpected'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative w-full py-20 px-4 z-10 bg-[#050010] flex flex-col items-center justify-center border-t border-purple-900/20">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-64 bg-pink-600/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-2xl w-full mx-auto relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-md">
            {t('contact.title')}
          </span>
        </h2>
        <p className="text-gray-400 mb-10 text-lg">{t('contact.subtitle')}</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full text-left" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-purple-200">{t('contact.name')}</label>
              <input 
                type="text" 
                id="name" 
                value={formData.name}
                onChange={handleChange}
                placeholder={t('contact.namePlaceholder')} 
                className={`bg-black/40 border ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-purple-500'} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors w-full`}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && <span className="text-red-400 text-xs mt-1">{errors.name}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-pink-200">{t('contact.email')}</label>
              <input 
                type="email" 
                id="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder={t('contact.emailPlaceholder')} 
                className={`bg-black/40 border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-pink-500'} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors w-full`}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && <span className="text-red-400 text-xs mt-1">{errors.email}</span>}
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium text-gray-200">{t('contact.message')}</label>
            <textarea 
              id="message" 
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder={t('contact.messagePlaceholder')} 
              className={`bg-black/40 border ${errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-purple-400'} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors w-full resize-none`}
              aria-invalid={errors.message ? "true" : "false"}
            ></textarea>
            {errors.message && <span className="text-red-400 text-xs mt-1">{errors.message}</span>}
          </div>

          <div className="flex justify-center mt-4">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-1'} transition-all duration-300 w-full md:w-auto min-w-[200px] flex items-center justify-center gap-2`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('contact.sending')}
                </>
              ) : (
                t('contact.send')
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
