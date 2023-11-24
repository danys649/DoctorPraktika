import { connectBdForGiveData } from "/BD/BDadditionally.js"; //имортируем функцию соединение с БД для передачи данных
var cardSelectedDoctorIndex = localStorage.getItem("CardselectedDoctorIndexChange"); 
console.log("card ID:" + cardSelectedDoctorIndex);
var selectedClientIndex = sessionStorage.getItem("exportedCount");
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
                          (
                              SELECT COUNT(*)
                              FROM doctorfam.appointment
                              WHERE patient_ID = "${cardSelectedDoctorIndex}"
                          ) as appointment_count, 
                          d.name,
                          a.ID,
                          d.surname,
                          a.dateandtime,
                          a.description,
                          a.medicine,
                          p.surname as patient_surname
                      FROM 
                          doctorfam.doctor d
                      JOIN 
                          doctorfam.appointment a ON d.ID = a.doctor_ID
                      JOIN
                          doctorfam.patient p ON a.patient_ID = p.ID
                      WHERE 
                          a.patient_ID = "${cardSelectedDoctorIndex}";
`).then((response) => {
  let data = JSON.parse(response); // Преобразовать ответ в JSON
  let count = data[0]["appointment_count"]; // Извлечь число
  console.log("Количество = " + count);
  if (data[0]) {
    let dataArray = [];
    for (let i = 0; i < count; i++) {
      let date, time;
      if (data[i]["dateandtime"].includes("(")) {
        // Format is "dd.mm.yy(HH:MM)"
        let dateAndTime = data[i]["dateandtime"].split("(");
        date = dateAndTime[0];
        time = dateAndTime[1].slice(0, -1); // Remove the closing parenthesis
      } else {
        // Format is "yyyy-mm-dd HH:MM:SS"
        let dateAndTime = data[i]["dateandtime"].split(" ");
        date = dateAndTime[0];
        time = dateAndTime[1].slice(0, 5); // Only take the HH:MM part
      }

      let medicine = data[i]["medicine"] || "";
      let description = data[i]["description"] || "";

      // Check if medicine or description is null or empty
      let isMedicineEditable = !(medicine && medicine.trim() !== "");

      let isDescriptionEditable = !description || description.trim() === "";

      dataArray.push({
        name: data[i]["name"],
        surname: data[i]["surname"],
        date: date,
        time: time,
        medicine: medicine,
        description: description,
        isMedicineEditable: isMedicineEditable,
        isDescriptionEditable: isDescriptionEditable,
        ID: data[i]["ID"],
      });
    }
    createAppointmentBlocks(dataArray);
  } else {
    var textNoFound = document.getElementById("textNoFound");
    textNoFound.style.display = "block";
  }
});

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
     '<p>Дата: <input type="date" class="appointment-date" disabled value="' +
     data[i].date +
     '"></p>' +
     '<p>Час: <input type="time" class="appointment-time" disabled value="' +
     data[i].time +
     '"></p>' +
     '<p>Призначені ліки: <textarea placeholder="Введіть назву ліків" class="appointmentMedicine" id="appointmentMedicine"' +
     (data[i].isMedicineEditable ? "" : " disabled") +
     ">" +
     data[i].medicine +
     "</textarea></p>" +
     '<p>Опис: <textarea placeholder="Введіть опис" class="appointmentDescription" id="appointmentDescription" ' +
     (data[i].isDescriptionEditable ? "" : "disabled") +
     ">" +
     data[i].description +
     "</textarea ></p>" +
     (data[i].isMedicineEditable || data[i].isDescriptionEditable
       ? '<button class="saveBtn">Зберегти</button>'
       : "") +
     "</div>";
    newAppointmentBlock.dataset.appointmentId = data[i].ID;

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

    // Save button
    let saveBtn = newAppointmentBlock.querySelector(".saveBtn");
    if (saveBtn) {
      saveBtn.addEventListener("click", function () {
        let appointmentDescription = newAppointmentBlock.querySelector(".appointmentDescription").value;
        let appointmentMedicine = newAppointmentBlock.querySelector(".appointmentMedicine").value;
        let appointmentId = newAppointmentBlock.dataset.appointmentId;
        connectBdForGiveData(
          `UPDATE doctorfam.appointment SET medicine = '${appointmentMedicine}', description = '${appointmentDescription}' 
         WHERE ID = ${appointmentId};`
        );
        saveBtn.textContent = "Дані збережено";
        location.reload(); // Обновить страницу
        textNoFound.style.display = "block";
      });
    }
  }
}