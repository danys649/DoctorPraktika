window.addEventListener("DOMContentLoaded", (event) => {
  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const signUperButton = document.getElementById("signUper");
  const container = document.getElementById("container");

  signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });

  signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });

  signUperButton.addEventListener("click", () => {
     document.body.innerHTML = ""; // Удалить текущий HTML
     location.href = "profile.html"; // Перейти на новую страницу 'Home.html'
   });

});
