var isEditing = false;

document.getElementById("showAllButton").addEventListener("click", function () {
  document.getElementById("dob").classList.remove("hidden");
  document.getElementById("address").classList.remove("hidden");
  document.getElementById("gender").classList.remove("hidden");
  document.getElementById("editButton").classList.remove("hidden");
  document.getElementById("showAllButton").classList.add("hidden");
});

document.getElementById("editButton").addEventListener("click", function () {
  document.getElementById("name").removeAttribute("disabled");
  document.getElementById("surname").removeAttribute("disabled");
  document.getElementById("dob").removeAttribute("disabled");
  document.getElementById("address").removeAttribute("disabled");
  document.getElementById("gender").removeAttribute("disabled");

  document.getElementById("saveButton").classList.remove("hidden");
  isEditing = true;
});

document.getElementById("saveButton").addEventListener("click", function () {
  document.getElementById("name").setAttribute("disabled", "true");
  document.getElementById("surname").setAttribute("disabled", "true");
  document.getElementById("dob").setAttribute("disabled", "true");
  document.getElementById("address").setAttribute("disabled", "true");
  document.getElementById("gender").setAttribute("disabled", "true");

  document.getElementById("saveButton").classList.add("hidden");
  isEditing = false;
});
