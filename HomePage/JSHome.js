import { connectBdForGiveData } from "/BD/BDadditionally.js"; //имортируем функцию соединение с БД для передачи данных

var selectedClientIndex = localStorage.getItem("exportedCount");
console.log("Index client : "+ selectedClientIndex);//индекс входящего клиента

document.addEventListener("DOMContentLoaded", function () {
  var searchButton = document.getElementById("searchButton");
  var doctorsDiv = document.getElementById("doctors");
  var filterPrompt = document.getElementById("filterPrompt");
  let myCardButton = document.getElementById("myCardButton");
  let showAllButton = document.getElementById("showAllButton");

  myCardButton.addEventListener("click", () => {
    document.body.innerHTML = ""; // Удалить текущий HTML
    location.href = "Page404.html"; // Перейти на новую страницу 'Page404.html'
  });

  showAllButton.addEventListener("click", () => {
    document.body.innerHTML = ""; // Удалить текущий HTML
    location.href = "profile.html"; // Перейти на новую страницу 'Page404.html'
  });




  searchButton.addEventListener("click", function () {
    var district = document.getElementById("district").value;
    var region = document.getElementById("region").value;
    var clinic = document.getElementById("clinic").value;
    var specialization = document.getElementById("specialization").value;

    // Очищаем предыдущие результаты
    doctorsDiv.innerHTML = "";

    // Проверяем, выбраны ли фильтры
      if (district || region || clinic || specialization) {
      console.log("Получаем количестов докторов!");
       // получаем количество докторов
   
     connectBdForGiveData(`SELECT COUNT(*) FROM doctorfam.doctor;`)
     .then(
       (response) => {
         let data = JSON.parse(response); // Преобразовать ответ в JSON
         if (data[0]) {
           let count = data[0]["COUNT(*)"]; // Извлечь число
           console.log("Ответ сервера: ", count);
           if (count > 0) {
             for (let i = 1; i <= count; i++) {
               connectBdForGiveData(
                 `SELECT ID, name, surname FROM doctorfam.doctor WHERE id=${i};`
               ).then((response) => {
                 let data = JSON.parse(response); // Преобразовать ответ в JSON
                 console.log("DATA = " + JSON.stringify(data));
                 if (data[0]) {
                   var doctorBlock = createDoctorBlock(
                     data[0].name, // Заменить "Лікар 1" на имя врача из БД
                     data[0].surname,
                     data[0].ID,
                     data[0].ID,
                   );
                   doctorsDiv.appendChild(doctorBlock);
                 }
               });
             }
           } 
           else 
           {
             //если врачей не будет найдено
           }
         }
       }
     );
      /*else {
        // Показываем текст "Выберите фильтры для поиска врачей"
        filterPrompt.style.display = 'block';*/
       }
    });;


// Функция для создания блока с информацией о враче
function createDoctorBlock(name, workplace, specialization, ID, doctorImage)
 {
  var doctorBlock = document.createElement("div");
  doctorBlock.className = "doctor";

  var doctorImage = document.createElement("div");
  doctorImage.className = "doctor-image";

  var doctorDetails = document.createElement("div");
  doctorDetails.className = "doctor-details";

  var doctorName = document.createElement("h3");
  doctorName.textContent = name;

  var workplaceInfo = document.createElement("p");
  workplaceInfo.textContent = "Місце роботи: " + workplace;

  var specializationInfo = document.createElement("p");
  specializationInfo.textContent = "Спеціалізація: " + specialization;

  doctorDetails.appendChild(doctorName);
  doctorDetails.appendChild(workplaceInfo);
  doctorDetails.appendChild(specializationInfo);

  doctorBlock.appendChild(doctorImage);
  doctorBlock.appendChild(doctorDetails);
  var doctorLink = document.createElement("a");
  doctorLink.appendChild(doctorName);
  doctorLink.appendChild(workplaceInfo);
  doctorLink.appendChild(specializationInfo);

  // Добавляем блок ссылки в блок деталей
  doctorDetails.appendChild(doctorLink);

  // Добавляем блок изображения и блок деталей в основной блок врача
  doctorBlock.appendChild(doctorImage);
  doctorBlock.appendChild(doctorDetails);

  doctorBlock.addEventListener("click", function () {
    console.log("Function change doctor work!");
    // Сохраняем индекс врача в localStorage
    localStorage.setItem("selectedDoctorIndexChange", ID);
    // Перенаправляем на следующую страницу
    window.location.href = "appointment.html";
  });
  return doctorBlock;
}
});


