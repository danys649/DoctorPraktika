import { connectBdForGiveData } from "/BD/BDadditionally.js"; //имортируем функцию соединение с БД для передачи данных
import { connectBdForGetData } from "/BD/BDadditionally.js"; //имортируем функцию соединение с БД для получения данных
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


   
     
    document.body.innerHTML = ""; // Удалить текущий HTML
    location.href = "profile.html"; // Перейти на новую страницу 'Home.html'
  });

  signINButton.addEventListener("click", () => {
        console.log("начало");
     connectBdForGiveData(
       "SELECT COUNT(*) FROM doctorfam.patient WHERE surname = 'фыв';"
     )
       .then((response) => {
         let data = JSON.parse(response); // Преобразовать ответ в JSON
         let count = data[0]["COUNT(*)"]; // Извлечь число
         console.log("Ответ сервера: ", count);
         if (count > 0) {
          // document.body.innerHTML = ""; // Удалить текущий HTML
          // location.href = "profile.html"; // Перейти на новую страницу 'Home.html'
         }
       })
       .catch((error) => {
         console.error("Произошла ошибка: ", error);
       });


         
  });
});
