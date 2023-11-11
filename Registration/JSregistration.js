import { connectBdForGiveData } from "/BD/BDadditionally.js"; //имортируем функцию соединение с БД для передачи данных

window.addEventListener("DOMContentLoaded", (event) => {
  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn"); //вернуться на палель входа
  const signINButton = document.getElementById("signIN"); //кнопка входа
  const signUperButton = document.getElementById("signUper");
  const container = document.getElementById("container");

  signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });

  signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });

  signUperButton.addEventListener("click", () => {
    //document.body.innerHTML = ""; // Удалить текущий HTML
   // location.href = "profile.html"; // Перейти на новую страницу 'Home.html'
  });


signINButton.addEventListener("click", (event) => {
  // Добавьте 'event' здесь
  event.preventDefault();
  console.log("начало");
  let login = document.getElementById("login").value;
  let password = document.getElementById("password").value;
  try {
    connectBdForGiveData(
      `SELECT id FROM doctorfam.patient WHERE surname = '${login}' AND name = '${password}' LIMIT 1;`
    )
      .then((response) => {
        let data = JSON.parse(response); // Преобразовать ответ в JSON
        if (data[0]) {
          let count = data[0]["id"]; // Извлечь число
          console.log("Ответ сервера: ", count);
          if (count > 0) {
            document.body.innerHTML = ""; // Удалить текущий HTML
            location.href = "profile.html"; // Перейти на новую страницу 'Home.html'
          }
        } else {
          document.getElementById("ErrorInPut").style.visibility = "visible";
        }
      })
      .catch((error) => {
        console.error("Произошла ошибка: ", error);
        //document.getElementById("ErrorInPut").style.visibility = "visible";
      });
  } catch (Exception) {
    console.error(Exception);
    //document.getElementById("ErrorInPut").style.visibility = "visible";
  }
});

});

