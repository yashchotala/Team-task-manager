export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validatePassword = (password) => password?.length >= 6;
export const validateProjectData = (title) => title?.trim() ? { valid: true } : { valid: false };
export const validateTaskData = (title, projectId, assignedTo) => 
  title && projectId && assignedTo ? { valid: true } : { valid: false };