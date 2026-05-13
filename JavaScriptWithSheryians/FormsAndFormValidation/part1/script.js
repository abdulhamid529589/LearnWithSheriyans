// =============================
// // Form Validation JS
// =============================
const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");

const fields = {
  username: document.getElementById("username"),
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  confirmPassword: document.getElementById("confirmPassword"),
  age: document.getElementById("age"),
};

const errors = {
  username: document.getElementById("usernameError"),
  email: document.getElementById("emailError"),
  password: document.getElementById("passwordError"),
  confirmPassword: document.getElementById("confirmPasswordError"),
  age: document.getElementById("ageError"),
};

// Helper functions
const setError = (field, message) => (errors[field].textContent = message);
const clearErrors = () =>
  Object.values(errors).forEach((e) => (e.textContent = ""));
const validateEmail = (email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  clearErrors();
  successMessage.textContent = "";

  let hasError = false;

  // Username Validation
  const usernameValue = fields.username.value.trim();
  if (!usernameValue) {
    setError("username", "Username is required.");
    hasError = true;
  } else if (!/^[a-zA-Z0-9_]{4,15}$/.test(usernameValue)) {
    setError("username", "4-15 chars, letters/numbers/underscores only.");
    hasError = true;
  }

  // Email Validation
  const emailValue = fields.email.value.trim();
  if (!emailValue) {
    setError("email", "Email is required.");
    hasError = true;
  } else if (!validateEmail(emailValue)) {
    setError("email", "Invalid email format.");
    hasError = true;
  }

  // Password Validation
  const passwordValue = fields.password.value;
  if (!passwordValue) {
    setError("password", "Password is required.");
    hasError = true;
  } else if (
    !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}/.test(passwordValue)
  ) {
    setError(
      "password",
      "Min 8 chars, uppercase, lowercase, number & special char required."
    );
    hasError = true;
  }

  // Confirm Password
  const confirmPasswordValue = fields.confirmPassword.value;
  if (!confirmPasswordValue) {
    setError("confirmPassword", "Please confirm your password.");
    hasError = true;
  } else if (passwordValue !== confirmPasswordValue) {
    setError("confirmPassword", "Passwords do not match.");
    hasError = true;
  }

  // Age Validation
  const ageValue = fields.age.value.trim();
  if (!ageValue) {
    setError("age", "Age is required.");
    hasError = true;
  } else if (isNaN(ageValue) || ageValue < 18 || ageValue > 99) {
    setError("age", "Age must be between 18-99.");
    hasError = true;
  }

  // Success message
  if (!hasError) {
    successMessage.textContent = "Registration successful!";
    form.reset();
  }
});
