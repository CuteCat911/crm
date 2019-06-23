/*

  Description
  - - - - - -
  Плагин реализующий работу пропорциональных блоков.

  Принимает параметры:
    1.blocks - класс элементов, которые должны быть пропорциональными (все настройки, пропорций реализуются через data атрибуты)

  Пример объекта с параметрами:
    {
      blocks: "js-ratio"
    }

  Используемые атрибуты:
    1. data-ratio - указывает соотношение сторон
      Пример:
        4:3 - первое число это ширина, второе - высота
    2. data-priority - указывает какая сторона является приоритетом и от неё ведутся дальнейшие расчеты
      Возможные значения:
        1. width
        2. height
    3. data-adjust - указывает, будет ли учитываться размер контента при ресайзе
      Возможные значения:
        1. true
        2. false
    4. data-font-proportional - указывает соотношение размера шрифта к приоритетной стороне
      Пример:
        300:16 - первое число размер приоритетной стороны в пикселях,
        а второе - размер шрифта в пикселях при таком размере приоритетной стороны

  Публичные методы:
    1. blocksInfo (getter) - возвращает объект со всей инфой по пропорциональным блокам
    2. attrs (getter) - возвращает объект со всеми data-атрибутами, которые использует плагин
    3. findBlocks - Нахождение новых пропорциональных блоков, вызывается обычно после динамического добавления блоков (при помощи ajax)
    4. applySize - Установка размера для пропорциональных блоков

*/

import {checkType} from "./check-type";
import {findElemsClass} from "./find";
import {attr} from "../general/attr";
import {getObjectLength} from "./get-object-length";
import {windowResize} from "./window-resize";

// Объект с используемыми плагином атрибутами

  /*

    1. ratio - указывает в каком соотношении находятся стороны
    2. priority - указывает какая сторона приоритетней, от неё и будут вестись дальнейшие вычисления.
    3. adjust - указывает, будет ли размер контента учитываться 
    4. font - указывает соотношение размера шрифта к приоритетной стороне

  */

 const attrs = {
    ratio: "data-ratio",
    priority: "data-priority",
    adjust: "data-adjust",
    font: "data-font-proportional"
  };

// End Объект с используемыми плагином атрибутами

// Вспомогательные функции

const helpFuncs = {
  get: {
    currentFontSize(font, currentSize) {

      /*
        
        Нахождение пропорционального размера шрифта на основе соотношения ширины элемента и размера шрифта,
        который должен быть при такой ширине
        
      */

      if (font && checkType(currentSize, "number")) {

        let params = font.split(":");
        let size = currentSize / (params[0] / params[1]);

        return size;

      }

    }
  },
  set: {
    currentSize(elem, adjust, size, minSize, currentSize) {

      /*
    
        Выставление корректного размера стороны у элемента

      */

      if (checkType(elem, "object") && checkType(adjust, "string") && checkType(size, "string") && checkType(minSize, "string") && checkType(currentSize, "string")) {

        if (adjust === "true") {

          elem.style[minSize] = currentSize;

        } else if (adjust === "false") {

          elem.style[size] = currentSize;

        }

      }

    }
  }
}

// End Вспомогательные функции

export let ProportionalBlocks = class {

  constructor(params) {

    if (checkType(params.blocks, "string")) {

      let $module = this;

      // Объект со всеми параметрами плагина

      /*

        1. class - класс пропорциональных блоков
        2. elements - массив со всеми пропорциональными блоками
        3. blocksInfo - объект со всей информацией по пропорциональным блокам

      */

      this.$info = {
        class: params.blocks,
        elems: null,
        blocksInfo: {}
      };

      // End Объект со всеми параметрами плагина

      // Запись атрибутов в плагин

      this.$attrs = attrs;

      // End Запись атрибутов в плагин

      let resize = function() {

        $module.__setBlocksInfo();
        $module.applySize();

      };

      // Вызов всех методов и функций отвечающих за работу плагина

      this.findBlocks();
      this.applySize();
      windowResize(resize);

      // End Вызов всех методов и функций отвечающих за работу плагина

    }

  }

  // Геттер возвращающий всю информацию по блокам

  get blocksInfo() {

    return this.$info.blocksInfo;

  }

  // End Геттер возвращающий всю информацию по блокам

  // Геттер возвращающий все используемые плагином атрибуты

  get attrs() {

    return this.$attrs;

  }

  // End Геттер возвращающий все используемые плагином атрибуты

  // Нахождение всех пропорциональных блоков

  /*

    Публичный метод.
    - - - - -
    Нахождение всех пропорциональных блоков, которые необходимы для работы плагина.
    Так же этот метод используется для добавления новых блоков, подгруженных ajax-ом

    Использует методы: __setBlocksInfo

  */

  findBlocks() {

    let $class = this.$info.class;

    this.$info.elems = findElemsClass($class, document);
    this.__setBlocksInfo();

  }

  // End Нахождение всех пропорциональных блоков

  // Нахождение и запись информации по пропорциональному блоку

  /*

    Внутренний метод
    - - - - -
    Сбор и запись всей информации по пропорциональным блокам, которая требуется плагину для работы.

  */

  __setBlocksInfo() {

    let $info = this.$info;

    if ($info.elems) {

      for (let i in $info.elems) {

        let elem = $info.elems[i];

        $info.blocksInfo[i] = {
          el: elem,
          params: {
            ratio: null,
            priority: "width",
            adjust: "false",
            font: null
          }
        };

        for (let j in $info.blocksInfo[i].params) {

          let value = attr(elem, attrs[j]);

          if (value) {

            $info.blocksInfo[i].params[j] = value;

          }

        }

      }

    }

  }

  // End Нахождение и запись информации по пропорциональному блоку

  // Установка размера пропорционального блока

  /*

    Внутренний метод
    - - - - -
    Расчитывает и устанавливает размер пропорционального блока, на основе имеющихся данных.
    Если включен режим пропорционального текста, то так же расчитывает и устанавливает размер шрифта у этого блока.

    Использует вспомогательные функции: set.currentSize

  */

  __setSize(info) {

    if (checkType(info, "object")) {

      let params = info.params;

      if (params.ratio && info.el) {

        let ratio = params.ratio.split(":");
        let currentSize;
        let wantedSize;

        if (params.priority === "width") {

          currentSize = info.el.offsetWidth;
          wantedSize = currentSize * ratio[1] / ratio[0]; 

        } else if (params.priority === "height") {

          currentSize = info.el.offsetHeight;
          wantedSize = currentSize * ratio[0] / ratio[1];

        }

        if (checkType(wantedSize, "number")) {

          if (params.priority === "width") {

            helpFuncs.set.currentSize(info.el, params.adjust, "height", "minHeight", wantedSize + "px");

          } else if (params.priority === "height") {

            helpFuncs.set.currentSize(info.el, params.adjust, "width", "minWidth", wantedSize + "px");

          }

        }

        if (params.font) {

          info.el.style.fontSize = helpFuncs.get.currentSize(params.font, currentSize);

        }

      }

    }

  }

  // End Установка размера пропорционального блока

  // Установка размера для пропорциональных блоков

  /*

    Публичный метод.
    - - - - -
    Установка размера пропорциональных блоков, которые имеются в данных плагина.

    Использует методы: __setSize

  */

  applySize() {

    let $blocksInfo = this.$info.blocksInfo;

    if (getObjectLength($blocksInfo) > 0) {

      for (let i in $blocksInfo) {

        this.__setSize($blocksInfo[i]);

      }

    }

  }

  // End Установка размера для пропорциональных блоков

};