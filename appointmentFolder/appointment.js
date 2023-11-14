

var selectedDoctorIndex = localStorage.getItem("selectedDoctorIndex");
console.log("Index change doctor: " + selectedDoctorIndex);

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
function goBack() {
  window.history.back(); // возврат на предыдущую страницу при клику
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
