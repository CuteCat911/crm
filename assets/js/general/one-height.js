// // OneHeight - ver. 1.0.0

// import {findElemsClass} from "./find";
// import {windowResize} from "./window-resize";

// export let OneHeight = class {

//   constructor(elemsClass) {

//     if (elemsClass && typeof elemsClass === "string") {

//       let $module = this;

//       this.info = {
//         class: elemsClass,
//         elements: findElemsClass(elemsClass, document),
//         params: {
//           maxHeights: {},
//           windowWidth: window.innerWidth
//         }
//       };
//       this.dataAttrs = {
//         section: "data-section"
//       };
//       this.helpFuncs = {
//         getHeight(mode) {

//           if (mode && typeof mode === "string") {

//             let $elements = $module.info.elements;
//             let $maxHeights = $module.info.params.maxHeights;
//             let $dataAttrs = $module.dataAttrs;

//             if ($elements) {

//               for (let $elem of $elements) {

//                 let $section = $elem.getAttribute($dataAttrs.section);

//                 if ($section) {

//                   let $height;

//                   $elem.style.minHeight = "";
//                   $height = $elem.offsetHeight;

//                   if (mode == "less") {

//                     if ($maxHeights[$section] < $height || !$maxHeights[$section]) {

//                       $maxHeights[$section] = $height;

//                     }

//                   } else if (mode == "more") {

//                     if ($maxHeights[$section] > $height || !$maxHeights[$section]) {

//                       $maxHeights[$section] = $height;

//                     }

//                     this.getHeight("less");

//                   }

//                 }

//               }

//             }

//           }

//         },
//         resize() {

//           $module.setSize();

//         }
//       };

//       this.setSize();
//       windowResize($module.helpFuncs.resize);

//     }

//   }

//   __getMaxHeights() {

//     let $windowWidth = this.info.params.windowWidth;
//     let $helpFuncs = this.helpFuncs;
//     let windowWidth = window.innerWidth;

//     if ($windowWidth >= windowWidth) {

//       $helpFuncs.getHeight("less");

//     } else {

//       $helpFuncs.getHeight("more");

//     }

//     this.info.params.windowWidth = windowWidth;

//   }

//   setSize() {

//     let $elements = this.info.elements;
//     let $maxHeights = this.info.params.maxHeights;
//     let $dataAttrs = this.dataAttrs;

//     this.__getMaxHeights();

//     if ($elements) {

//       for (let $elem of $elements) {

//         let $section = $elem.getAttribute($dataAttrs.section);

//         $elem.style.boxSizing = "border-box";
//         $elem.style.minHeight = $maxHeights[$section] + "px";

//       }

//     }

//   }

//   findElems() {

//     this.info.elements = findElemsClass(this.info.class, document);
//     this.setSize();

//   }

// }