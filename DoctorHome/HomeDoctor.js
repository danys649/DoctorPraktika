document.addEventListener("DOMContentLoaded", function () {
  const daysContainer = document.getElementById("days-container");
  const patientInfoContainer = document.getElementById("patient-info");

  // создание ссылок для дней в календаре
  for (let day = 1; day <= 31; day++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.textContent = day;
    dayElement.addEventListener("click", function () {
      displayPatientInfo(day);
    });
    daysContainer.appendChild(dayElement);

    // Добавляем класс для выделения дней с записями
    if (day % 5 === 0) {
      dayElement.classList.add("has-appointments");
    }
  }

  function displayPatientInfo(day) {
    // функция для отображения информации о пациентах

    patientInfoContainer.innerHTML = `<h3>Паціенти на ${day} число</h3>
                                                  <div class="patient">
                                                      <div class="patient-info">
                                                          <span>Паціент 1 - Інформація</span>
                                                      </div>
                                                      <a href="404.html"> <button onclick="showPatientCard('Паціент 1')">Картка</button></a>
                                                  </div>
                                                  <div class="patient">
                                                      <div class="patient-info">
                                                          <span>Паціент 2 - Інформація</span>
                                                      </div>
                                                      <a href="404.html"> <button onclick="showPatientCard('Паціент 2')">Картка</button></a>
                                                  </div>`;
  }
});
/* Открытие и закрытие модального окна*/
const openCalendarBtn = document.getElementById("openCalendarBtn");
const calendarModal = document.getElementById("calendarModal");
const closeCalendarBtn = document.getElementById("closeCalendarBtn");

openCalendarBtn.addEventListener("click", function () {
  calendarModal.style.display = "block";
});

closeCalendarBtn.addEventListener("click", function () {
  calendarModal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target === calendarModal) {
    calendarModal.style.display = "none";
  }
  /*проверка на принадлежность элемента к модальному окну внутри обработчика события.*/
});
window.addEventListener("click", function (event) {
  if (event.target === calendarModal || calendarModal.contains(event.target)) {
    calendarModal.style.display = "none";
  }
});
/*профиль врача*/
document.addEventListener("DOMContentLoaded", (event) => {
  const saveButton = document.getElementById("saveButton");
  saveButton.addEventListener("click", () => {
    let lastName = document.getElementById("lastName");
    let firstName = document.getElementById("firstName");
    let middleName = document.getElementById("middleName");
    let dob = document.getElementById("dob");
    let Specialization = document.getElementById("Specialization");
    let PlaceOfWork = document.getElementById("PlaceOfWork");

    let fields = [
      lastName,
      firstName,
      middleName,
      dob,
      Specialization,
      PlaceOfWork,
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

    if (allFilled) {
      document.body.innerHTML = ""; // Удалить текущий HTML
      location.href = "Home.html"; // Перейти на новую страницу
    }
  });
});
