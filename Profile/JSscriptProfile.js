 function connectBdForGetData() 
 {
      var mysql = require("mysql");

      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1111",
        database: "doctorfam",
        port: 3306,
      });

      con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");

        const sqlScript =
          "INSERT INTO `doctorfam`.`patient` (`ID`, `surname`, `name`) VALUES ('1', 'фыв', 'вф');";
        con.query(sqlScript, function (err, result) {
          if (err) throw err;
          console.log("Record inserted");
        });
      });
     /* con.end(function (err) {
        if (err) {
          return console.log("error:" + err.message);
        }
        console.log("Close the database connection.");
      });*/

  }
  

document.addEventListener("DOMContentLoaded", (event) => 
{
  const saveButton = document.getElementById("saveButton");

  saveButton.addEventListener("click", () => 
  {
    console.log("button click;");
    connectBdForGetData();
    
    /*
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

    if ((!male.checked && !female.checked)) {
      male.style.outline = "1px solid red";
      female.style.outline = "1px solid red";
      allFilled = false;
    } else {
      male.style.outline = "";
      female.style.outline = "";
    }

    if (allFilled) {
      
      //document.body.innerHTML = ""; // Удалить текущий HTML
     // location.href = "Home.html"; // Перейти на новую страницу 'Home.html'
      
    }*/
  });
});
