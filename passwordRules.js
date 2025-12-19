export const passwordRules = [
  {
    label: "Must be at least 8 characters",
    test: (password) => password.length >= 8,
  },
  {
    label: "Contains 1 uppercase",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    label: "Contains 1 lowercase",
    test: (password) => /[a-z]/.test(password),
  },
  {
    label: "Contains 1 number",
    test: (password) => /[0-9]/.test(password),
  },
  {
    label: "Contains 1 special character",
    test: (password) => /[^a-zA-Z0-9]/.test(password),
  },
];
