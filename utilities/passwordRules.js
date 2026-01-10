export const passwordRules = [
  {
    label: "signupTwo.passwordRules.minLength",
    test: (password) => password.length >= 8,
  },
  {
    label: "signupTwo.passwordRules.uppercase",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    label: "signupTwo.passwordRules.lowercase",
    test: (password) => /[a-z]/.test(password),
  },
  {
    label: "signupTwo.passwordRules.number",
    test: (password) => /[0-9]/.test(password),
  },
  {
    label: "signupTwo.passwordRules.specialChar",
    test: (password) => /[^a-zA-Z0-9]/.test(password),
  },
];
