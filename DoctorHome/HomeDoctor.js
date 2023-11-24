import { connectBdForGiveData } from "/BD/BDadditionally.js"; //имортируем функцию соединение с БД для передачи данных
var selectedDoctorIndex = sessionStorage.getItem("exportedCount"); //Индекс профиля доктора как пользователя приложения
console.log("Index  doctor: " + selectedDoctorIndex);
connectBdForGiveData(
  `SELECT surname, name, patronymic FROM doctorfam.doctor WHERE ID = '${selectedDoctorIndex}';`
).then((response) => {
  let data = JSON.parse(response); // Преобразовать ответ в JSON
  if (data[0]) {
    lastName.value = data[0]["surname"];
    firstName.value = data[0]["name"];
    middleName.value = data[0]["patronymic"];
    /*
      var date = data[0]["YOB"];
      var parts = date.split("T")[0];
      dob.value = parts;
      var gender = data[0]["gender"];
      if (gender == "Мужской") {
        document.getElementById("male").checked = true;
      } else if (gender == "Женский") {
        document.getElementById("female").checked = true;
      }
      */
  }
});

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

const saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", () => {
  /*
    let lastName = document.getElementById("lastName");
    let firstName = document.getElementById("firstName");
    let middleName = document.getElementById("middleName");
    let dob = document.getElementById("dob");
    let Specialization = document.getElementById("Specialization");
    let PlaceOfWork = document.getElementById("PlaceOfWork");
*/
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
  /*
    if (!male.checked && !female.checked) {
      male.style.outline = "1px solid red";
      female.style.outline = "1px solid red";
      allFilled = false;
    } else {
      male.style.outline = "";
      female.style.outline = "";
    }
*/
  if (allFilled) {
    let lastName = document.getElementById("lastName").value;
    let firstName = document.getElementById("firstName").value;
    let middleName = document.getElementById("middleName").value;
    connectBdForGiveData(
      `UPDATE doctorfam.doctor SET 
         surname = '${lastName}',
         name ='${firstName}',
         patronymic ='${middleName}'
         WHERE (ID = '${selectedDoctorIndex}');`
    );
    /*
        YOB = STR_TO_DATE('${dob}', '%Y-%m-%d')
             gender='${gender}',
        */
    //document.body.innerHTML = ""; // Удалить текущий HTML
    // location.href = "Home.html"; // Перейти на новую страницу
  }
});

document.addEventListener("DOMContentLoaded", (event) => {
  connectBdForGiveData(
    `SELECT patient.name, patient.surname, patient.ID
   FROM doctorfam.appointment 
   JOIN doctorfam.patient 
   ON appointment.patient_ID = patient.ID
   WHERE appointment.doctor_ID = '${selectedDoctorIndex}';`
  ).then((response) => {
    let data = JSON.parse(response); // Преобразовать ответ в JSON
    console.log("DATA = " + JSON.stringify(data));
    let dataArray = [];
    for (let i = 0; i < data.length; i++) {
      dataArray.push({
        name: data[i]["name"],
        info: data[i]["surname"],
        ID: data[i]["ID"],
      });
      var patientBlock = createPatientBlock(dataArray[i]); 
      patientList.appendChild(patientBlock);
    }
  });
});
function createPatientBlock(patientData) {
  // Створюємо головний блок пацієнта
  var patientDiv = document.createElement("div");
  patientDiv.className = "patient";

  // Створюємо блок інформації про пацієнта
  var patientInfoDiv = document.createElement("div");
  patientInfoDiv.className = "patient-info";

  // Створюємо текст інформації про пацієнта
  var patientInfoSpan = document.createElement("span");
  patientInfoSpan.textContent = patientData.name + " - " + patientData.info;

  // Додаємо текст інформації до блоку інформації
  patientInfoDiv.appendChild(patientInfoSpan);

  // Створюємо кнопку для відображення картки пацієнта
  var patientButton = document.createElement("button");
  patientButton.textContent = "Картка";
  patientButton.onclick = function () {
    showPatientCard(patientData.name);
  };

  // Додаємо блок інформації та кнопку до головного блоку пацієнта
  patientDiv.appendChild(patientInfoDiv);
  patientDiv.appendChild(patientButton);

  patientDiv.addEventListener("click",(function (data) {
      return function ()
       {
        console.log("Function change card work!");
        localStorage.setItem("CardselectedDoctorIndexChange", data.ID);
        window.location.href = "CardDoctor.html";
      };
    })(patientData)
  );
  return patientDiv;
}
