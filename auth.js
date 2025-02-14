// Description: This file contains the code for login and signup page.

const authFormComponent = {
  loginForm: document.getElementById("loginForm"),
  signupForm: document.getElementById("signupForm"),

  emailInput: document.getElementById("email"),
  usernameInput: document.getElementById("username"),
  passwordInput: document.getElementById("password"),
  confirmPasswordInput: document.getElementById("confirmPassword"),
  remember: document.getElementById("Remember"),
  term: document.getElementById("term"),
};

const validateFunction = {
  email: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) || email === "" ? "" : "Invalid email format!";
  },
  username: (username) => {
    const regex = /^[a-zA-Z0-9_]+$/;
    if (username === "") {
      return "";
    } else if (!regex.test(username)) {
      return "Username can only contain letters, numbers and _";
    } else if (username.length < 6 || username.length > 20) {
      return "Username must be between 6 and 20 characters!";
    }
  },
  password: (password) => {
    return password.length > 6 || password === ""
      ? ""
      : "Password must be at least 6 characters!";
  },
  confirmPassword: (password, confirmPassword) => {
    password === confirmPassword || confirmPassword === ""
      ? ""
      : "Password does not match!";
  },
};

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

  input.addEventListener("input", () => hideError(errorMsg, input));

  input.addEventListener("blur", () => {
    const value = input.value;
    let message = "";

    switch (input.id) {
      case "email":
        message = validateFunction.email(value);
        break;
      case "username":
        message = validateFunction.username(value);
        break;
      case "password":
        message = validateFunction.password(value);
        break;
      case "confirmPassword":
        message = validateFunction.confirmPassword(
          authFormComponent.passwordInput.value,
          value
        );
        break;
    }
    console.log(message);
    if (message) {
      presentError(errorMsg, message, input);
    } else {
      hideError(errorMsg, input);
    }
  });
}

const passwordInput = document.getElementById("password");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const confirmPasswordInput = document.getElementById("confirmPassword");

// const loginForm = document.getElementById("loginForm");
if (authFormComponent.loginForm) {
  authFormComponent.loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const { usernameInput, passwordInput, remember } = authFormComponent;

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

if (authFormComponent.signupForm) {
  authFormComponent.signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const {
      emailInput,
      usernameInput,
      passwordInput,
      confirmPasswordInput,
      remember,
      term,
    } = authFormComponent;
    let errorMsg = document.getElementById("errorTerm");
    if (!term.checked) {
      presentError(errorMsg, "Please accept the terms!");
    } else {
      // Replace this code with your database authentication
      alert("Signup Successfully!");
      this.reset();
    }
    // if (remember.checked) {
    //   remember();
    // }
    term.addEventListener("change", () => hideError(errorMsg));
  });
}

function authenticateUser(username, password) {
  // Replace this code with your database authentication
  return username === "admin" && password === "123";
}

[authFormComponent.usernameInput, authFormComponent.passwordInput].forEach(
  (input) => {
    input.addEventListener("click", () => {
      hideError(authFormComponent.errorValid, input);
    });
  }
);

validateForm(authFormComponent.emailInput, "errorEmail");
validateForm(authFormComponent.usernameInput, "errorUsername");
validateForm(authFormComponent.passwordInput, "errorPassword");
validateForm(authFormComponent.confirmPasswordInput, "errorMsg");

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
