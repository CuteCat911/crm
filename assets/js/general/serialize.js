/*

  Description
  - - - - - -

  Функция преобразования объекта с данными в корректную строку для передачи этих данных на сервер.
  Возвратит преобразованные данные в виде строки.

  Параметры:
    1. type (string) (обязательный) - тип запроса
      Возможные значения:
        1.1 get
        1.2 post
    2. data (object) (обязательный) - объект с данными, которые нужно преобразовать, записанные в виде: ключ => значение
      Пример data:
        {
          name: "Tony",
          id: 21,
          type: "admin"
        }

*/

import {checkType} from "./check-type";

export let serialize = (type, data) => {

    type = type.toLowerCase();

    if ((type !== "post" && type !== "get" ) || !checkType(data, "object")) {
        if (DEV) console.error("Invalid variable type ($type or $data). Type required $data = 'object'. Value required $type = 'post' or 'get'. Type received $data = '%s'. Value received $type = '%s'.", typeof data, type);
        return false;
    }

    let serializeData;
    let serializeArray = [];

    for (let key in data) {
        if (data[key] !== null && data[key] !== undefined) serializeArray.push(key + "=" + encodeURIComponent(data[key]));
    }

    serializeData = serializeArray.join("&");

    if (type === "get") {
        serializeData = "?" + serializeData;
    }

    return serializeData;

};