import type { ContactFormData } from '@/lib/validations/contact'

export const CONTACT_PREFILL_EVENT = 'contact-prefill-subject'

// The contact form lives in a dynamically-imported Footer, so a CTA elsewhere
// on the page can fire before the form is mounted. The pending value covers
// the not-yet-mounted case; the event covers the already-mounted one.
let pendingSubject: ContactFormData['subject'] | null = null

export function requestSubjectPrefill(subject: ContactFormData['subject']) {
  pendingSubject = subject
  window.dispatchEvent(new CustomEvent(CONTACT_PREFILL_EVENT, { detail: subject }))
}

export function consumePendingSubject(): ContactFormData['subject'] | null {
  const subject = pendingSubject
  pendingSubject = null
  return subject
}
