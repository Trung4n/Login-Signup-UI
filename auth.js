// Description: This file contains the code for login and signup page.

const passwordInput = document.getElementById("password");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const confirmPasswordInput = document.getElementById("confirmPassword");

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let username = usernameInput.value;
    let password = passwordInput.value;
    if (!authenticateUser(username, password)) {
      let errorMsg = document.getElementById("errorValid");
      presentError(errorMsg, "", usernameInput);
      presentError(errorMsg, "Invalid user or password!", passwordInput);
    } else {
      alert("Login Successfully!");
      this.reset();
    }
  });
}

const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const terms = document.getElementById("term");
    const remember = document.getElementById("Remember");
    let errorMsg = document.getElementById("errorTerm");
    if (!terms.checked) {
      presentError(errorMsg, "Please accept the terms!");
    } else {
      // Replace this code with your database authentication
      alert("Signup Successfully!");
      this.reset();
    }
    if (remember.checked) {
      remember();
    }
    terms.addEventListener("change", () => {
      hideError(errorMsg);
    });
  });
}

function remember() {
  // Replace this code with your database authentication
}
function authenticateUser(username, password) {
  // Replace this code with your database authentication
  return username === "admin" && password === "123";
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function checkUsername(username) {
  const regex = /^[a-zA-Z0-9_]+$/;
  if (!regex.test(username)) {
    return "Username can only contain letters, numbers and _";
  } else if (username.length < 6 || username.length > 20) {
    return "Username must be between 6 and 20 characters!";
  } else {
    return "";
  }
}

function checkPassword(password) {
  if (password.length < 6) {
    return "Password must be at least 6 characters!";
  } else {
    return "";
  }
}

function checkConfirmPassword(password, confirmPassword) {
  if (confirmPassword === password) {
    return "";
  } else {
    return "Password does not match!";
  }
}

function presentError(errorMsg, message, input) {
  if (errorMsg) {
    errorMsg.textContent = message;
    errorMsg.style.display = "block";
  }
  if (input) {
    input.closest(".form-group").style.border = "1px solid red";
    input.closest(".form-group").style.boxShadow = "0 0 4px 1px red";
    input.focus();
  }
}

// hide error message when click input
function hideError(errorMsg, input) {
  if (errorMsg) {
    errorMsg.style.display = "none";
  }
  if (input) {
    input.closest(".form-group").style.border = "";
    input.closest(".form-group").style.boxShadow = "";
  }
}
function validateForm(input, idError) {
  let errorMsg = document.getElementById(idError);
  if (!input || !errorMsg) return;
  input.addEventListener("input", () => {
    hideError(errorMsg, input);
  });
  if (input.id === "email") {
    input.addEventListener("blur", () => {
      let email = input.value;
      if (email === "" || isValidEmail(email)) {
        hideError(errorMsg, input);
      } else {
        presentError(errorMsg, "Invalid email format!", input);
      }
    });
  } else if (input.id === "username") {
    input.addEventListener("blur", () => {
      let username = input.value;
      let message = checkUsername(username);
      if (message === "" || username === "") {
        hideError(errorMsg, input);
      } else {
        presentError(errorMsg, message, input);
      }
    });
  } else if (input.id === "password") {
    input.addEventListener("blur", () => {
      let password = input.value;
      let message = checkPassword(password);
      if (message === "" || password === "") {
        hideError(errorMsg, input);
      } else {
        presentError(errorMsg, message, input);
      }
    });
  } else if (input.id === "confirmPassword") {
    input.addEventListener("blur", () => {
      let password = passwordInput.value;
      let confirmPassword = input.value;
      let message = checkConfirmPassword(password, confirmPassword);
      if (message === "" || confirmPassword === "") {
        hideError(errorMsg, input);
      } else {
        presentError(errorMsg, "Password does not match!", input);
      }
    });
  }
}

usernameInput.addEventListener("click", () => {
  hideError(document.getElementById("errorValid"), usernameInput);
  hideError(document.getElementById("errorValid"), passwordInput);
});

passwordInput.addEventListener("input", () => {
  hideError(document.getElementById("errorValid"), usernameInput);
  hideError(document.getElementById("errorValid"), passwordInput);
});

validateForm(emailInput, "errorEmail");
validateForm(usernameInput, "errorUsername");
validateForm(passwordInput, "errorPassword");
validateForm(confirmPasswordInput, "errorMsg");

const showPassword = document.querySelectorAll("#toggleIcon");

showPassword.forEach((icon) => {
  icon.addEventListener("click", () => {
    const targetInput = document.getElementById(
      icon.getAttribute("data-target")
    );

    const isPassword = targetInput.type === "password";
    targetInput.type = isPassword ? "text" : "password";

    icon.style.opacity = 0;
    setTimeout(() => {
      icon.classList.toggle("fa-eye", isPassword);
      icon.classList.toggle("fa-eye-slash", !isPassword);
      icon.style.opacity = 1;
    }, 100);
  });
});
