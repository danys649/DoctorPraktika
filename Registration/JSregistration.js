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
    connectBdForGiveData(`START TRANSACTION;`);
    connectBdForGiveData(`INSERT INTO doctorfam.log_and_password (login, password, rol_ID) VALUES ('${loginReg}', '${passwordReg}', '2');`);
    connectBdForGiveData(`SET @last_id_in_log_and_password = LAST_INSERT_ID();`);
    connectBdForGiveData(`INSERT INTO patient (log_and_password_ID, surname) VALUES (@last_id_in_log_and_password, '${emailReg}');`);
    connectBdForGiveData(`SELECT ID FROM doctorfam.patient WHERE log_and_password_ID = @last_id_in_log_and_password LIMIT 1;`)
    .then((response) => {
        let data = JSON.parse(response); // Преобразовать ответ в JSON
        if (data[0]) {
          let count = data[0]["ID"]; // Извлечь число
          console.log("Ответ сервера: ", count);
          localStorage.setItem("exportedCount", count); // Сохранить count в глобальной переменной
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
        document.getElementById("ErrorInPut").style.visibility = "visible";
      });
    } catch (Exception) {
      console.error(Exception);
      document.getElementById("ErrorInPut").style.visibility = "visible";
    }
  });
 connectBdForGiveData(`COMMIT;`);
  /////////////////////////////////////////////////////////////////////////////////////////////////
  //вход
  signINButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("начало");
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;
    document.getElementById("signInForm");
    try {
      var isDoctor = document.getElementById("isDoctor").checked;
      if (isDoctor) {
        // Перенаправляем на интерфейс врача
         connectBdForGiveData(`SELECT ID FROM doctorfam.log_and_password WHERE login = '${login}' AND password = '${password}' AND rol_ID = '1';`);
         connectBdForGiveData(`SET @last_id_in_log_and_password = LAST_INSERT_ID();`);
         connectBdForGiveData(`SELECT ID FROM doctorfam.doctor WHERE log_and_password_ID = @last_id_in_log_and_password LIMIT 1;`)
          .then((response) => {
            let data = JSON.parse(response); // Преобразовать ответ в JSON
            if (data[0]) {
              let count = data[0]["ID"]; // Извлечь число
              console.log("Ответ сервера: ", count);
              localStorage.setItem("exportedCount", count); // Сохранить count в глобальной переменной
              if (count > 0) {
                document.body.innerHTML = ""; // Удалить текущий HTML
              //  location.href = "HomeDoctor.html"; // Перейти на новую страницу 'Home.html'
              }
            } else {
              document.getElementById("ErrorInPut").style.visibility =
                "visible";
            }
          })
          .catch((error) => {
            console.error("Произошла ошибка: ", error);
            document.getElementById("ErrorInPut").style.visibility = "visible";
          });
      } else {
        // Перенаправляем на интерфейс клиента
        connectBdForGiveData(
          `SELECT log_and_passwordcol FROM doctorfam.log_and_password WHERE login ='${login}' AND password = '${password}' LIMIT 1;`)
          .then((response) => {
            let data = JSON.parse(response); // Преобразовать ответ в JSON
            if (data[0]) {
              let count = data[0]["log_and_passwordcol"]; // Извлечь число
              console.log("Ответ сервера: ", count);
              localStorage.setItem("exportedCount", count); // Сохранить count в глобальной переменной
              if (count > 0) {
                document.body.innerHTML = ""; // Удалить текущий HTML
                location.href = "Home.html"; // Перейти на новую страницу 'Home.html'
              }
            } else {
              document.getElementById("ErrorInPut").style.visibility =
                "visible";
            }
          })
          .catch((error) => {
            console.error("Произошла ошибка: ", error);
            document.getElementById("ErrorInPut").style.visibility = "visible";
          });
      }
    } catch (Exception) {
      console.error(Exception);
      document.getElementById("ErrorInPut").style.visibility = "visible";
    }
  });
});