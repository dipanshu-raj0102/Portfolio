export function getSubmissionToken(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `submission-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}
