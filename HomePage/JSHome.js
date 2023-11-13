import { connectBdForGiveData } from "/BD/BDadditionally.js"; //имортируем функцию соединение с БД для передачи данных
document.addEventListener("DOMContentLoaded", function () {
  var searchButton = document.getElementById("searchButton");
  var doctorsDiv = document.getElementById("doctors");
  var filterPrompt = document.getElementById("filterPrompt");
  //var pageTitle = document.getElementById("pageTitle");
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
   
     connectBdForGiveData(`SELECT COUNT(*) FROM doctorfam.patient;`) 
     .then((response) => {
        let data = JSON.parse(response); // Преобразовать ответ в JSON
        if (data[0]) {
          let count = data[0]["COUNT(*)"]; // Извлечь число
          console.log("Ответ сервера: ", count);
          if (count > 0) 
          {
            for(let i = 1; i <= count; i++)
            {
              var doctorBlock = createDoctorBlock(
                "Лікар 1",
                "Поліклініка 1",
                "Спеціалізація 1"
              );
              doctorsDiv.appendChild(doctorBlock);
              // Скрываем текст "Выберите фильтры для поиска врачей"
              filterPrompt.style.display = 'none';
   
            }
          }
          else
          {
             //если врачей не будет найдено
          }
        }
      });

      /*else {
        // Показываем текст "Выберите фильтры для поиска врачей"
        filterPrompt.style.display = 'block';*/
  
  
/*
        // Создаем блоки с информацией о врачах и добавляем их
        var doctorBlock1 = createDoctorBlock('Лікар 1', 'Поліклініка 1', 'Спеціалізація 1');
        var doctorBlock2 = createDoctorBlock('Лікар 2', 'Поліклініка 2', 'Спеціалізація 2');
        var doctorBlock3 = createDoctorBlock(
          "Лікар 3",
          "Поліклініка 2",
          "Спеціалізація 2"
        );

        
        doctorsDiv.appendChild(doctorBlock2);
        doctorsDiv.appendChild(doctorBlock3);

        // Скрываем текст "Выберите фильтры для поиска врачей"
        filterPrompt.style.display = 'none';
    } else {
        // Показываем текст "Выберите фильтры для поиска врачей"
        filterPrompt.style.display = 'block';
    }*/
       }
      
    });
;

// Функция для создания блока с информацией о враче
function createDoctorBlock(name, workplace, specialization) {
    var doctorBlock = document.createElement('div');
    doctorBlock.className = 'doctor';

    var doctorImage = document.createElement('div');
    doctorImage.className = 'doctor-image';

    var doctorDetails = document.createElement('div');
    doctorDetails.className = 'doctor-details';

    var doctorName = document.createElement('h3');
    doctorName.textContent = name;

    var workplaceInfo = document.createElement('p');
    workplaceInfo.textContent = 'Місце роботи: ' + workplace;

    var specializationInfo = document.createElement('p');
    specializationInfo.textContent = 'Спеціалізація: ' + specialization;

    doctorDetails.appendChild(doctorName);
    doctorDetails.appendChild(workplaceInfo);
    doctorDetails.appendChild(specializationInfo);

    doctorBlock.appendChild(doctorImage);
    doctorBlock.appendChild(doctorDetails);
    var doctorLink = document.createElement('a');
    doctorLink.href = 'запись на приём.html';
    doctorLink.appendChild(doctorName);
            doctorLink.appendChild(workplaceInfo);
            doctorLink.appendChild(specializationInfo);

            // Добавляем блок ссылки в блок деталей
            doctorDetails.appendChild(doctorLink);

            // Добавляем блок изображения и блок деталей в основной блок врача
            doctorBlock.appendChild(doctorImage);
            doctorBlock.appendChild(doctorDetails);


    return doctorBlock;
}
  
});
