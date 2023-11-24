import { connectBdForGiveData } from "/BD/BDadditionally.js"; //имортируем функцию соединение с БД для передачи данных
const backButton = document.getElementById("backButton");
const AppointmentСonfirmation = document.getElementById("AppointmentСonfirmation");
const ConfirmButton = document.getElementById("ConfirmButton");
var confirmationCheckbox = document.getElementById("confirmationCheckbox");

var selectedClientIndex = sessionStorage.getItem("exportedCount");
console.log("Index client : "+ selectedClientIndex);//индекс входящего клиента

//кнопка назад
backButton.addEventListener("click", () => {
  window.history.back();
});

//Получаем дату с календаря
var appointmentDate = document.getElementById("appointmentDate");
appointmentDate.addEventListener("change", () => 
{
  if (appointmentDate.value !== "") {
    var selectedDate = appointmentDate.value;
    console.log("Выбранная дата и время: " + selectedDate);
  }
});

//Уведомление
confirmationCheckbox.addEventListener("change", () => {
});

//Кнопка подтверждения 
ConfirmButton.addEventListener("click", () => {
     if (appointmentDate.value !== "") 
     {
         if (confirmationCheckbox.checked) 
         {
           alert("Запис підтверджена на " + appointmentDate.value);
           console.log("Index client : " + selectedClientIndex); //индекс входящего клиента
           var selectedDoctorIndexChange = sessionStorage.getItem(
             "selectedDoctorIndexChange"
           );
           console.log("Index change doctor: " + selectedDoctorIndexChange);//индекс выбраного доктора
           connectBdForGiveData(
             `INSERT INTO doctorfam.appointment (dateAndTime, doctor_ID, patient_ID) 
              VALUES (STR_TO_DATE('${appointmentDate.value}', '%Y-%m-%dT%H:%i'), ${selectedDoctorIndexChange}, ${selectedClientIndex});`
           );
         } 
         else 
         {
           alert("Підтвердіть запис, поставив галочку");
         } 
     }
     else
     {
        alert("Оберіть дату!");
     }
});
//Показ календаря
AppointmentСonfirmation.addEventListener("click", () => {
    var calendar = document.getElementById("calendar");
    calendar.style.display = "block";
    AppointmentСonfirmation.style.display = "none";
  // calendar.style.display = calendar.style.display === "none" ? "block" : "none"; 
});
//Доктор присваивание имени первая страница(подстарница)
var selectedDoctorIndexChange = sessionStorage.getItem(
  "selectedDoctorIndexChange"
);
console.log("Index change doctor: " + selectedDoctorIndexChange);
connectBdForGiveData(
  `SELECT ID, name, surname FROM doctorfam.doctor WHERE id=${selectedDoctorIndexChange};`
).then((response) => {
  let data = JSON.parse(response); // Преобразовать ответ в JSON
  console.log("DATA = " + JSON.stringify(data));
  if (data[0]) {
    var nameElement = document.getElementById("NameDoctor");
    var locationElement = document.getElementById("location");

    // Обновить текст элементов
    nameElement.textContent = data[0].name;
    locationElement.textContent = data[0].surname;
  }
});

//код загрузки
function simulateLoading() {
  // Имитация задержки загрузки
  setTimeout(() => {
    document.querySelector(".loader-container").style.display = "none";
    document.querySelector(".content").style.overflow = "visible"; // Отображение контента после завершения анимации
  }, 3000);
}

// Вызываем функцию имитации загрузки
simulateLoading();
//конец кода загрузки
