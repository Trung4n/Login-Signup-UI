// Form login
// error message
const passwordInput = document.getElementById("password");
const usernameInput = document.getElementById("username");
const errorContent = document.querySelector(".errorContent");
const usernameGroup = usernameInput.closest(".form-group");
const passwordGroup = passwordInput.closest(".form-group");

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  let username = usernameInput.value;
  let password = passwordInput.value;

  if (username !== "admin" || password !== "123") {
    errorContent.style.display = "block";
    passwordInput.focus();
    usernameGroup.style.border = "1px solid red";
    passwordGroup.style.border = "1px solid red";
    passwordGroup.style.boxShadow = "0 0 4px 1px red";
  } else {
    alert("Login Successfully!");
    this.reset();
  }
});
// hide error message when click input

function hideError() {
  errorContent.style.display = "none";
  usernameGroup.style.border = "";
  passwordGroup.style.border = "";
  passwordGroup.style.boxShadow = "";
}

["input", "click"].forEach((event) =>
  passwordInput.addEventListener(event, hideError)
);
usernameInput.addEventListener("click", hideError);

const showPassword = document.getElementById("toggleIcon");

showPassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  showPassword.classList.toggle("fa-eye", isPassword);
  showPassword.classList.toggle("fa-eye-slash", !isPassword);
});

const checkRememberMe = document.getElementById("rememberMe");

checkRememberMe.addEventListener("click", () => {
  checkRememberMe.classList.toggle("fa-square");
  checkRememberMe.classList.toggle("fa-square-check");
});
