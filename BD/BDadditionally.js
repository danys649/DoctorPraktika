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
        console.log("Connection close");
      } else {
        reject(new Error("Ошибка запроса: " + xhr.statusText));
        xhr.abort();
        console.log("Connection close2");
      }
    };
  });
}

