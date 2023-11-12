document.addEventListener("DOMContentLoaded", function () {
  var searchButton = document.getElementById("searchButton");
  var doctorsDiv = document.getElementById("doctors");
  var filterPrompt = document.getElementById("filterPrompt");
  var pageTitle = document.getElementById("pageTitle");
  let myCardButton = document.getElementById("myCardButton");

  myCardButton.addEventListener("click", () => {
    document.body.innerHTML = ""; // Удалить текущий HTML
    location.href = "Page404.html"; // Перейти на новую страницу 'Page404.html'
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
      // Создаем блоки с информацией о врачах и добавляем их
      var doctorBlock1 = createDoctorBlock(
        "Лікар 1",
        "Поліклініка 1",
        "Спеціалізація 1"
      );
      var doctorBlock2 = createDoctorBlock(
        "Лікар 2",
        "Поліклініка 2",
        "Спеціалізація 2"
      );

      doctorsDiv.appendChild(doctorBlock1);
      doctorsDiv.appendChild(doctorBlock2);

      // Скрываем текст "Выберите фильтры для поиска врачей"
      filterPrompt.style.display = "none";
    } else {
      // Показываем текст "Выберите фильтры для поиска врачей"
      filterPrompt.style.display = "block";
    }
  });

  // Функция для создания блока с информацией о враче
  function createDoctorBlock(name, workplace, specialization) {
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
    doctorLink.href = "запись на приём.html";
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
