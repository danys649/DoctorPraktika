function toggleContent(button) {
  var content = button.nextElementSibling;
  var buttonText = button.textContent.trim();

  if (buttonText === "Розгорнути") {
    content.style.display = "block";
    button.textContent = "Згорнути";
  } else {
    content.style.display = "none";
    button.textContent = "Розгорнути";
  }
}

function saveAppointment(button) {
  var dateInput = button.parentElement.querySelector(".appointment-date");
  var medicineInput = button.parentElement.querySelector(
    ".appointment-medicine"
  );
  var descriptionTextarea = button.parentElement.querySelector(
    ".appointment-description"
  );
  var saveButton = button.parentElement.querySelector(".save-btn");
  dateInput.setAttribute("disabled", "true"); /*делаем поля только для чтения*/
  medicineInput.setAttribute("disabled", "true");
  descriptionTextarea.setAttribute("disabled", "true");
  button.parentElement
    .querySelector(".appointment-time")
    .setAttribute("disabled", "true");
  saveButton.innerHTML = "Дані збережено";
  saveButton.setAttribute("disabled", "true");
}

function deleteAppointment(button) {
  var result = confirm("Ви впевнені, що бажаєте видалити запис?");
  if (result) {
    var appointmentBlock = button.closest(".appointment-block");
    appointmentBlock.remove();
  }
}

function addAppointment() {
  var appointmentsContainer = document.getElementById("doctor-appointments");
  var newAppointmentBlock = document.createElement("div");
  newAppointmentBlock.className = "appointment-block";
  newAppointmentBlock.innerHTML =
    "<h3>Деталі прийому</h3>" +
    '<p class="doctor-name">Лікар: Лікар ПІБ</p>' +
    '<button class="toggle-btn" onclick="toggleContent(this)">Розгорнути</button>' +
    '<div class="appointment-content">' +
    '<p>Дата: <input type="date" class="appointment-date"></p>' +
    '<p>Час: <input type="time" class="appointment-time"></p>' +
    '<p>Призначені ліки: <input type="text" placeholder="Введіть назву ліків" class="appointment-medicine"></p>' +
    '<p>Опис: <textarea placeholder="Введіть опис" class="appointment-description"></textarea></p>' +
    '<button class="save-btn" onclick="saveAppointment(this)">Збереги дані</button>' +
    '<button class="delete-btn" onclick="deleteAppointment(this)">Видалити</button>' +
    "</div>";
  appointmentsContainer.appendChild(newAppointmentBlock);
  // Скрыть сообщение после добавления блока записи
  var messageDiv = document.getElementById("add-block-message");
  messageDiv.style.display = "none";
}

const backButton = document.getElementById("backButton");
backButton.addEventListener("click", () => {
  window.history.back();
});
