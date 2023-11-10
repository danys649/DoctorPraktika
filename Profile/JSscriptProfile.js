function connectBdForGiveData(script) 
{
  console.log("function open!");
  // Создайте новый объект XMLHttpRequest
  var xhr = new XMLHttpRequest();

  // Откройте новый POST-запрос на /query
  xhr.open("POST", "http://localhost:8080/query", true);

  // Установите заголовки запроса
  xhr.setRequestHeader("Content-Type", "application/json");

  // Отправьте SQL-запрос
  xhr.send(
    JSON.stringify({
      query: script
    })
  );

  // Когда ответ получен от сервера, выведите его
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log("Response: " + xhr.responseText);
      // Закройте соединение
      xhr.abort();
    }
  };
}

function connectBdForGetData(script, callback) {
  console.log("Функция открыта!");
  // Создайте новый объект XMLHttpRequest
  var xhr = new XMLHttpRequest();

  // Откройте новый POST-запрос на /query
  xhr.open("POST", "http://localhost:8080/query", true);

  // Установите заголовки запроса
  xhr.setRequestHeader("Content-Type", "application/json");

  // Отправьте SQL-запрос
  xhr.send(
    JSON.stringify({
      query: script,
    })
  );

  // Когда ответ получен от сервера, выведите его
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      callback(xhr.responseText);
      // Закройте соединение
      xhr.abort();
    }
  };
}






document.addEventListener("DOMContentLoaded", (event) => {
  const saveButton = document.getElementById("saveButton");

  saveButton.addEventListener("click", () => {
    console.log("button click;");


    
    let lastName = document.getElementById("lastName");
    let firstName = document.getElementById("firstName");
    let middleName = document.getElementById("middleName");
    let dob = document.getElementById("dob");
    let city = document.getElementById("city");
    let street = document.getElementById("street");
    let houseNumber = document.getElementById("houseNumber");
    let apartmentNumber = document.getElementById("apartmentNumber");
    let male = document.getElementById("male");
    let female = document.getElementById("female");

    let fields = [
      lastName,
      firstName,
      middleName,
      dob,
      city,
      street,
      houseNumber,
      apartmentNumber,
    ];

    let allFilled = true;

    fields.forEach((field) => {
      if (!field.value) {
        field.style.borderColor = "red";
        allFilled = false;
      } else {
        field.style.borderColor = "";
      }
    });

    if ((!male.checked && !female.checked)) {
      male.style.outline = "1px solid red";
      female.style.outline = "1px solid red";
      allFilled = false;
    } else {
      male.style.outline = "";
      female.style.outline = "";
    }

    if (allFilled) {
          connectBdForGiveData(
            "INSERT INTO `doctorfam`.`patient` (`ID`, `surname`, `name`) VALUES ('1', 'фыв', 'вф');"
          );
        connectBdForGetData(
          "SELECT * FROM `doctorfam`.`patient` WHERE `ID` = '1';",
          function (response) {
            lastName.value = JSON.stringify(response);
          }
        );
          
      //document.body.innerHTML = ""; // Удалить текущий HTML
     // location.href = "Home.html"; // Перейти на новую страницу 'Home.html'
      
    }
  });
});
