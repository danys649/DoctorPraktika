import { connectBdForGiveData } from "/BD/BDadditionally.js"; //имортируем функцию соединение с БД для передачи данных
const backButton = document.getElementById("backButton");
const AppointmentСonfirmation = document.getElementById("AppointmentСonfirmation");

backButton.addEventListener("click", () => {
  window.history.back();
});

ppointmentСonfirmation.addEventListener("click", () => {
  
});



/*Доктор приваивание имени*/
var selectedDoctorIndex = localStorage.getItem("selectedDoctorIndex");
console.log("Index change doctor: " + selectedDoctorIndex);
connectBdForGiveData(
  `SELECT ID, name, surname FROM doctorfam.patient WHERE id=${selectedDoctorIndex};`
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


function toggleCalendar() {
  var calendar = document.getElementById("calendar");
  calendar.style.display = calendar.style.display === "none" ? "block" : "none";
}

function confirmAppointment() {
  var appointmentDate = document.getElementById("appointmentDate").value;
  var confirmationCheckbox = document.getElementById("confirmationCheckbox");

  if (confirmationCheckbox.checked) {
    // Здесь можно добавить логику для обработки подтверждения записи
    alert("Запис підтверджена на " + appointmentDate);
  } else {
    alert("Підтвердіть запис, поставив галочку");
  }
}

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
