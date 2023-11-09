document.addEventListener("DOMContentLoaded", (event) => {
  const saveButton = document.getElementById("saveButton");
  saveButton.addEventListener("click", () => {
    let lastName = document.getElementById("lastName");
    let firstName = document.getElementById("firstName");
    let middleName = document.getElementById("middleName");
    let dob = document.getElementById("dob");
    let city = document.getElementById("city");
    let street = document.getElementById("street");
    let houseNumber = document.getElementById("houseNumber");
    let apartmentNumber = document.getElementById("apartmentNumber");
    let male = document.getElementById("male");
    let female = document.getElementById("female");

    let fields = [
      lastName,
      firstName,
      middleName,
      dob,
      city,
      street,
      houseNumber,
      apartmentNumber,
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
      location.href = "Home.html"; // Перейти на новую страницу 'Home.html'
    }
  });
});
