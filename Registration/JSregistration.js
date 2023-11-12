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





signUperButton.addEventListener("click", (event) => {
  //регистрация
  event.preventDefault();
  console.log("начало");

  let loginReg = document.getElementById("loginReg").value;
  let emailReg = document.getElementById("emailReg").value;
  let passwordReg = document.getElementById("passwordReg").value;
  try {
    connectBdForGiveData(
      `INSERT INTO doctorfam.patient (ID, surname, name) VALUES ('${emailReg}', '${loginReg}', '${passwordReg}');`
    );

    connectBdForGiveData(
      `SELECT id FROM doctorfam.patient WHERE surname = '${loginReg}' AND name = '${passwordReg}' LIMIT 1;`
    )
      .then((response) => {
        let data = JSON.parse(response); // Преобразовать ответ в JSON
        if (data[0]) {
          let count = data[0]["id"]; // Извлечь число
          console.log("Ответ сервера: ", count);
          if (count > 0) {
            document.body.innerHTML = ""; // Удалить текущий HTML
            location.href = "profile.html"; // Перейти на новую страницу 'Home.html'
             localStorage.setItem("count", count); //Какое значение принимает и какое сохраняет надо разобраться
          }
        } else {
          document.getElementById("ErrorInPut").style.visibility = "visible";
        }
      })
      .catch((error) => {
        console.error("Произошла ошибка: ", error);
        document.getElementById("ErrorInPut").style.visibility = "visible";
      });
  } catch (Exception) {
    console.error(Exception);
    document.getElementById("ErrorInPut").style.visibility = "visible";
  }
});



/////////////////////////////////////////////////////////////////////////////////////////////////

signINButton.addEventListener("click", (event) => { //вход
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
         let clientID = localStorage.getItem("count");
         console.log("ClientId = " + clientID);
         if (count > 0) { //Лучше добавить проверку на число
           document.body.innerHTML = ""; // Удалить текущий HTML
           location.href = "Home.html"; // Перейти на новую страницу 'Home.html'
         }
       } else {
         document.getElementById("ErrorInPut").style.visibility = "visible";
       }
     })
     .catch((error) => {
       console.error("Произошла ошибка: ", error);
       document.getElementById("ErrorInPut").style.visibility = "visible";
     });
 } catch (Exception) {
   console.error(Exception);
    document.getElementById("ErrorInPut").style.visibility = "visible";
 } 
});

});

