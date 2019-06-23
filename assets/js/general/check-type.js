/*
  
    Description
    - - - - - -
    Функция проверки типа переменной. В функцию передается переменная и тип на который её нужно проверить.
    В зависимости от проверки вернет true или false.

*/

export let checkType = ($var, $type) => {

    if ($type === "function" || $type === "object") {
        return $var && typeof $var === $type;
    } else if ($type === "boolean" || $type === "string") {
        return typeof $var === $type;
    } else if ($type === "number") {
        return typeof $var === "number" && ($var <= 0 || $var >= 0);
    } else if ($type === "array") {
        return $var && Array.isArray($var);
    }

};