import { connectBdForGiveData } from "/BD/BDadditionally.js"; //имортируем функцию соединение с БД для передачи данных
var selectedClientIndex = localStorage.getItem("exportedCount"); //индекс входящего клиента

const backButton = document.getElementById("backButton");
  backButton.addEventListener("click", () => {
    window.history.back();
  });

  connectBdForGiveData(
    `SELECT surname, name, patronymic, YOB, gender  FROM doctorfam.patient WHERE ID = '${selectedClientIndex}';`
  ).then((response) => {
    let data = JSON.parse(response); // Преобразовать ответ в JSON
    if (data[0]) {
      lastName.value = data[0]["surname"];
      firstName.value = data[0]["name"];
      middleName.value = data[0]["patronymic"]; 
      var date = data[0]["YOB"];
      var parts = date.split("T")[0]; 
      dob.value = parts;
      var gender = data[0]["gender"];
      if (gender == "Мужской") {
        document.getElementById("male").checked = true;
      } else if (gender == "Женский") {
        document.getElementById("female").checked = true;
      }
    }
  });

document.addEventListener("DOMContentLoaded", (event) => {
  const saveButton = document.getElementById("saveButton");

  saveButton.addEventListener("click", () => {
    console.log("button click;");
    let clientID = localStorage.getItem("count");
    console.log("ClientId = " + clientID);

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

    if (!male.checked && !female.checked) {
      male.style.outline = "1px solid red";
      female.style.outline = "1px solid red";
      allFilled = false;
    } else {
      male.style.outline = "";
      female.style.outline = "";
    }

    if (allFilled) 
    {
      
      let lastName = document.getElementById("lastName").value;
      let firstName = document.getElementById("firstName").value;
      let middleName = document.getElementById("middleName").value;
      let dob = document.getElementById("dob").value;
      let city = document.getElementById("city").value;
      let street = document.getElementById("street").value;
      let houseNumber = document.getElementById("houseNumber").value;
      let apartmentNumber = document.getElementById("apartmentNumber").value;
      let genderElems = document.getElementsByName("gender");
      let gender;
      for (let i = 0; i < genderElems.length; i++) {
        if (genderElems[i].checked) {
          gender = genderElems[i].value;
          break;
        }
      }

      connectBdForGiveData(
        `UPDATE doctorfam.patient SET 
         surname = '${lastName}',
         name ='${firstName}',
         patronymic ='${middleName}',
         gender='${gender}',
         YOB = STR_TO_DATE('${dob}', '%Y-%m-%d')
         WHERE (ID = '${selectedClientIndex}');`
      );
      // document.body.innerHTML = ""; // Удалить текущий HTML
      //location.href = "Home.html"; // Перейти на новую страницу 'Home.html'
    }
  });
});


