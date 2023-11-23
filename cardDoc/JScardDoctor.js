import { connectBdForGiveData } from "/BD/BDadditionally.js"; //имортируем функцию соединение с БД для передачи данных
var cardSelectedDoctorIndex = localStorage.getItem("CardselectedDoctorIndexChange"); 
console.log("card ID:" + cardSelectedDoctorIndex);
//кнопка назад
const backButton = document.getElementById("backButton");
backButton.addEventListener("click", () => {
  window.history.back();
});
//заполение профиля пациента
connectBdForGiveData(
  `SELECT surname, name, patronymic, YOB, gender  FROM doctorfam.patient WHERE ID = '${cardSelectedDoctorIndex}';`
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
//////////////////////


addAppointmentBtn.addEventListener("click", function () {
  var appointmentsContainer = document.getElementById("doctorAppointments");
  var newAppointmentBlock = document.createElement("div");
  newAppointmentBlock.className = "appointmentBlock";
  newAppointmentBlock.innerHTML =
    "<h3>Деталі прийому</h3>" +
    '<p class="doctor-name">Лікар: Лікар ПІБ</p>' +
    '<button class="toggleBtn">Згорнути</button>' +
    '<div class="appointmentContent">' +
    '<p>Дата: <input type="date" class="appointment-date" disabled></p>' +
    '<p>Час: <input type="time" class="appointment-time" disabled></p>' +
    '<p>Призначені ліки: <input type="text" placeholder="Введіть назву ліків" class="appointment-medicine"></p>' +
    '<p>Опис: <textarea placeholder="Введіть опис" class="appointmentDescription" id="appointmentDescription"></textarea></p>' +
    '<button class="saveBtn" id="saveBtn">Збереги дані</button>' +
    '<button class="deleteBtn" id="deleteBtn">Видалити</button>' +
    "</div>";
  appointmentsContainer.appendChild(newAppointmentBlock);
//кнопка разгорнути-згорнути
  var toggleBtn = newAppointmentBlock.querySelector(".toggleBtn");
  var appointmentContent = newAppointmentBlock.querySelector(".appointmentContent");
  toggleBtn.addEventListener("click", function () {
    if (toggleBtn.textContent === "Розгорнути") 
    {
      toggleBtn.textContent = "Згорнути";
      appointmentContent.style.display = "block";
    } 
    else
     {
      toggleBtn.textContent = "Розгорнути";
      appointmentContent.style.display = "none";
    }
  });
  var messageDiv = document.getElementById("add-block-message");
  messageDiv.style.display = "none";

  //кнопка созранить данные
    var saveBtn = newAppointmentBlock.querySelector(".saveBtn");
    saveBtn.addEventListener("click", function () {
        var appointmentDescription =  document.getElementById("appointmentDescription").value;//Описание
        connectBdForGiveData(
       `` //скрипт 
        );
        saveBtn.textContent = "Дані збережено";
 });

//кнопка удаления
 var saveBtn = newAppointmentBlock.querySelector(".deleteBtn");
 saveBtn.addEventListener("click", function () {
   var result = confirm("Ви впевнені, що бажаєте видалити запис?");
   if (result) {
     var appointmentBlock = button.closest(".appointmentBlock");
     appointmentBlock.remove();
   }
 });
});


createAppointmentBlocks(5);

function createAppointmentBlocks(num, data) {
  for (var i = 0; i < num; i++) {
    var appointmentsContainer = document.getElementById("doctorAppointments");
    var newAppointmentBlock = document.createElement("div");
    newAppointmentBlock.className = "appointmentBlock";
    newAppointmentBlock.innerHTML =
      "<h3>Деталі прийому</h3>" +
      '<p class="doctor-name">Лікар: ' + data[i].doctorName + '</p>' +
      '<button class="toggleBtn">Згорнути</button>' +
      '<div class="appointmentContent">' +
      '<p>Дата: <input type="date" class="appointment-date" value="' + data[i].date + '" disabled></p>' +
      '<p>Час: <input type="time" class="appointment-time" value="' + data[i].time + '" disabled></p>' +
      '<p>Призначені ліки: <input type="text" value="' + data[i].medicine + '" class="appointment-medicine"></p>' +
      '<p>Опис: <textarea class="appointmentDescription">' + data[i].description + '</textarea></p>' +
      '<button class="saveBtn">Збереги дані</button>' +
      '<button class="deleteBtn">Видалити</button>' +
      "</div>";
    appointmentsContainer.appendChild(newAppointmentBlock);

    // Add event listeners for the buttons here...
  }
}


