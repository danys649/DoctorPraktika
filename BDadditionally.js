// Подключаем модуль 'mysql', который предоставляет функции для работы с MySQL базами данных в Node.js.
const mysql = require("mysql");

// Объявляем функцию 'connectBdForClassPupils'.
function connectBdForGetData(ClassesItems) 
{
  // Инициализируем свойство dataServer строкой подключения к базе данных.
  const dataServer = "Server=localhost; Database=students; Uid=root; pwd=1111; port=3306";

  // Создаем новое подключение к базе данных с использованием строки подключения, хранящейся в 'dataServer'.
  const accessToTheDatabase = mysql.createConnection(dataServer);

  // Открываем подключение к базе данных.
  accessToTheDatabase.connect();

  // Задаем SQL-запрос, который мы хотим выполнить.
  const sqlScript = "SELECT class FROM classes";

  // Выполняем SQL-запрос и обрабатываем результаты в функции обратного вызова.
  accessToTheDatabase.query(sqlScript, (error, results, fields) => {
    // Если при выполнении запроса произошла ошибка, выбрасываем исключение.
    if (error) throw error;

    // Очищаем коллекцию 'ClassesItems'.
    ClassesItems.clear();

    // Обходим каждую строку в результатах запроса.
    results.forEach((row) => {
      // Создаем новый экземпляр класса 'ComboBoxItem'.
      const item = new ComboBoxItem();

      // Устанавливаем свойство 'Content' экземпляра 'item' равным значению столбца 'Class' в текущей строке.
      item.Content = row["Class"];

      // Добавляем 'item' в коллекцию 'ClassesItems'.
      ClassesItems.add(item);
    });
  });

  // Закрываем подключение к базе данных.
  accessToTheDatabase.end();
}
