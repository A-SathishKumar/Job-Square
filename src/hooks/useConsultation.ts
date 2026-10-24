/**
 * Custom Hook for Executive Consultation & Advisory Booking
 * Manages form state, real-time corporate validation, and backend submission.
 */

import { useState } from 'react';
import apiClient from '../api/apiClient.ts';

export interface BookingFormState {
  fullName: string;
  corporateEmail: string;
  organizationName: string;
  headcountScope: '100-500' | '501-2,000' | '2,001-10,000' | '10,000+';
  primaryInterest: string;
  notes: string;
}

const INITIAL_FORM: BookingFormState = {
  fullName: '',
  corporateEmail: '',
  organizationName: '',
  headcountScope: '501-2,000',
  primaryInterest: 'Executive Search & C-Suite Recruitment',
  notes: ''
};

export function useConsultation() {
  const [form, setForm] = useState<BookingFormState>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    referenceCode: string;
    organization: string;
    partner: string;
  } | null>(null);

  const updateField = (field: keyof BookingFormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const validate = (): string | null => {
    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      return 'Please provide your full executive name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.corporateEmail.trim())) {
      return 'Please enter a valid corporate email address (e.g., name@enterprise.com).';
    }
    if (!form.organizationName.trim() || form.organizationName.trim().length < 2) {
      return 'Please specify your organization or corporate enterprise.';
    }
    if (!form.primaryInterest) {
      return 'Please select a strategic practice area.';
    }
    return null;
  };

  const submitBooking = async (): Promise<boolean> => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return false;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await apiClient.createConsultation({
        fullName: form.fullName.trim(),
        corporateEmail: form.corporateEmail.trim(),
        organizationName: form.organizationName.trim(),
        headcountScope: form.headcountScope,
        primaryInterest: form.primaryInterest,
        notes: form.notes.trim()
      });

      setSuccessData({
        referenceCode: response.referenceCode,
        organization: form.organizationName,
        partner: response.consultation?.assignedPartnerName || 'Senior Managing Partner'
      });

      setForm(INITIAL_FORM);
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Consultation submission failed.';
      setError(msg);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setForm(INITIAL_FORM);
    setError(null);
    setSuccessData(null);
  };

  return {
    form,
    updateField,
    submitBooking,
    isSubmitting,
    error,
    successData,
    reset
  };
}

export default useConsultation;
