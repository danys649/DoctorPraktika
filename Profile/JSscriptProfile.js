const editButton = document.getElementById("editButton");
const saveButton = document.getElementById("saveButton");
const inputFields = document.querySelectorAll('input[type="text"]');
const dateField = document.getElementById("dob");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

editButton.addEventListener("click", () => {
  inputFields.forEach((input) => {
    input.removeAttribute("readonly");
  });
  dateField.removeAttribute("disabled");
  checkboxes.forEach((checkbox) => {
    checkbox.removeAttribute("disabled");
  });
  editButton.style.display = "none";
  saveButton.style.display = "block";
});

saveButton.addEventListener("click", () => {
  inputFields.forEach((input) => {
    input.setAttribute("readonly", true);
  });
  dateField.setAttribute("disabled", true);
  checkboxes.forEach((checkbox) => {
    checkbox.setAttribute("disabled", true);
  });
  editButton.style.display = "block";
  saveButton.style.display = "none";
});
