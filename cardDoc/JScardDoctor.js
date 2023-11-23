import { connectBdForGiveData } from "/BD/BDadditionally.js"; //имортируем функцию соединение с БД для передачи данных
var cardSelectedDoctorIndex = localStorage.getItem("CardselectedDoctorIndexChange"); 
console.log("card ID:" + cardSelectedDoctorIndex);
var selectedClientIndex = localStorage.getItem("exportedCount");
console.log("Index  doctor : "+ selectedClientIndex);//индекс входящего клиента
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

//получаем прошлые мед карточки
connectBdForGiveData(`SELECT
                        (SELECT COUNT(*) FROM doctorfam.appointment WHERE patient_ID= "2") as appointment_count, 
                          d.name,
                          d.surname
                      FROM 
                          doctorfam.doctor d
                      WHERE 
                          d.ID IN (
                              SELECT 
                                  a.doctor_ID
                              FROM 
                                  doctorfam.appointment a
                              WHERE 
                                  a.patient_ID="${cardSelectedDoctorIndex}");`).then(
  (response) => {
    let data = JSON.parse(response); // Преобразовать ответ в JSON
    let count = data[0]["appointment_count"]; // Извлечь число
    console.log("Count = " + count);
    if (data[0]) {
      let dataArray = [];
      for (let i = 0; i < count; i++) {
        dataArray.push({
          name: data[i]["name"],
          surname: data[i]["surname"],
          // description: data[i]["description"],
        });
      }
      createAppointmentBlocks(dataArray);
    }
  }
);


function createAppointmentBlocks(data) {
  for (let i = 0; i < data.length; i++) {
    let appointmentsContainer = document.getElementById("doctorAppointments");
    let newAppointmentBlock = document.createElement("div");
    newAppointmentBlock.className = "appointmentBlock";
    newAppointmentBlock.innerHTML =
      "<h3>Деталі прийому</h3>" +
      '<p class="doctorName" id="doctorName">Лікар: ' +
      data[i].name +
      " " +
      data[i].surname +
      "</p>" +
      '<button class="toggleBtn">Розгорнути</button>' +
      '<div class="appointmentContent" style="display: none;">' +
      '<p>Дата: <input type="date" class="appointment-date" disabled></p>' +
      '<p>Час: <input type="time" class="appointment-time" disabled></p>' +
      '<p>Призначені ліки: <input type="text" placeholder="Введіть назву ліків" class="appointment-medicine"></p>' +
      '<p>Опис: <textarea placeholder="Введіть опис" class="appointmentDescription" id="appointmentDescription">' +
      data[i].description +
      "</textarea></p>" +
      "</div>";
    appointmentsContainer.appendChild(newAppointmentBlock);

    let toggleBtn = newAppointmentBlock.querySelector(".toggleBtn");
    let appointmentContent = newAppointmentBlock.querySelector(
      ".appointmentContent"
    );
    toggleBtn.addEventListener("click", function () {
      if (toggleBtn.textContent === "Розгорнути") {
        toggleBtn.textContent = "Згорнути";
        appointmentContent.style.display = "block";
      } else {
        toggleBtn.textContent = "Розгорнути";
        appointmentContent.style.display = "none";
      }
    });
  }
}

//создаем карточку
addAppointmentBtn.addEventListener("click", function () {
  var appointmentsContainer = document.getElementById("doctorAppointments");
  var newAppointmentBlock = document.createElement("div");
  newAppointmentBlock.className = "appointmentBlock";
  newAppointmentBlock.innerHTML =
    "<h3>Деталі прийому</h3>" +
    '<p class="doctorName" id="doctorName">Лікар: Лікар ПІБ</p>' +
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
  var appointmentContent = newAppointmentBlock.querySelector(
    ".appointmentContent"
  );
  toggleBtn.addEventListener("click", function () {
    if (toggleBtn.textContent === "Розгорнути") {
      toggleBtn.textContent = "Згорнути";
      appointmentContent.style.display = "block";
    } else {
      toggleBtn.textContent = "Розгорнути";
      appointmentContent.style.display = "none";
    }
  });
  var messageDiv = document.getElementById("add-block-message");
  messageDiv.style.display = "none";

  //кнопка созранить данные
  let saveBtn = newAppointmentBlock.querySelector(".saveBtn");
  saveBtn.addEventListener("click", function () {
    let appointmentDescription = newAppointmentBlock.querySelector(
      ".appointmentDescription"
    ).value;
    connectBdForGiveData(
      `` //скрипт
    );
    saveBtn.textContent = "Дані збережено";
  });
  //удалить данные
  let deleteBtn = newAppointmentBlock.querySelector(".deleteBtn");
  deleteBtn.addEventListener("click", function () {
    let result = confirm("Ви впевнені, що бажаєте видалити запис?");
    if (result) {
      let appointmentBlock = this.closest(".appointmentBlock");
      appointmentBlock.remove();
    }
  });
});