export function connectBdForGiveData(script) { // отправка данных
  return new Promise((resolve, reject) => {
    console.log("function open!");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/query", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ query: script }));

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log("Response: " + xhr.responseText);
        resolve(xhr.responseText); // Разрешить промис значением ответа сервера
        xhr.abort();
      } else {
        reject(new Error("Ошибка запроса: " + xhr.statusText));
      }
    };
  });
}



export function connectBdForGetData(script, callback) { // получениие данных
  console.log("Функция открыта!");
  // Создайте новый объект XMLHttpRequest
  var xhr = new XMLHttpRequest();

  // Откройте новый POST-запрос на /query
  xhr.open("POST", "http://localhost:8080/query", true);

  // Установите заголовки запроса
  xhr.setRequestHeader("Content-Type", "application/json");

  // Отправьте SQL-запрос
  xhr.send(
    JSON.stringify({
      query: script,
    })
  );

  // Когда ответ получен от сервера, выведите его
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      callback(xhr.responseText);
      // Закройте соединение
      xhr.abort();
    }
  };
}
