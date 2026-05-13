function setError(id, message) {
  document.getElementById(id).textContent = message;
}
function clearErrors() {
  const errors = document.querySelectorAll(".error");
  errors.forEach((e) => (e.textContent = ""));
  document.getElementById("successMessage").textContent = "";
}
function validateEmail(email) {
  // Simple regex pattern for email validation
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}
document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();
    let hasError = false;

    // Username
    const username = document.getElementById("username").value.trim();
    if (username === "") {
      setError("usernameError", "Username is required.");
      hasError = true;
    } else if (username.length < 4 || username.length > 15) {
      setError("usernameError", "Username must be 4-15 characters.");
      hasError = true;
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError(
        "usernameError",
        "Only letters, numbers, and underscores allowed."
      );
      hasError = true;
    }

    // Email
    const email = document.getElementById("email").value.trim();
    if (email === "") {
      setError("emailError", "Email is required.");
      hasError = true;
    } else if (!validateEmail(email)) {
      setError("emailError", "Invalid email format.");
      hasError = true;
    }

    // Password
    const password = document.getElementById("password").value;
    if (password === "") {
      setError("passwordError", "Password is required.");
      hasError = true;
    } else if (password.length < 8) {
      setError("passwordError", "Password must be at least 8 characters.");
      hasError = true;
    } else if (!/[A-Z]/.test(password)) {
      setError("passwordError", "Must include an uppercase letter.");
      hasError = true;
    } else if (!/[a-z]/.test(password)) {
      setError("passwordError", "Must include a lowercase letter.");
      hasError = true;
    } else if (!/[0-9]/.test(password)) {
      setError("passwordError", "Must include a digit.");
      hasError = true;
    } else if (!/[^A-Za-z0-9]/.test(password)) {
      setError("passwordError", "Must include a special character.");
      hasError = true;
    }

    // Confirm Password
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (confirmPassword === "") {
      setError("confirmPasswordError", "Please confirm your password.");
      hasError = true;
    } else if (password !== confirmPassword) {
      setError("confirmPasswordError", "Passwords do not match.");
      hasError = true;
    }

    // Age
    const age = document.getElementById("age").value.trim();
    if (age === "") {
      setError("ageError", "Age is required.");
      hasError = true;
    } else if (isNaN(age) || age < 18 || age > 99) {
      setError("ageError", "Enter a valid age (18-99).");
      hasError = true;
    }

    // Success
    if (!hasError) {
      document.getElementById("successMessage").textContent =
        "Registration successful! ✅";
      document.getElementById("registrationForm").reset();
    }
  });
