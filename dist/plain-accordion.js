/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__plain_accordion_section_component_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__plain_accordion_component_js__ = __webpack_require__(2);



window.customElements.define('plain-section', __WEBPACK_IMPORTED_MODULE_0__plain_accordion_section_component_js__["a" /* PlainAccordionSection */]);
window.customElements.define('plain-accordion', __WEBPACK_IMPORTED_MODULE_1__plain_accordion_component_js__["a" /* PlainAccordion */]);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const plainAccordionSectionTemplate = document.createElement('template');

plainAccordionSectionTemplate.innerHTML = `
  <style>
    
    :host {
      --font-size: 14px;
      --head-vertical-padding: 8px;
      --head-horizontal-padding: 8px;

      display: flex;
      flex-direction: column;
      flex: none;
    }

    :host([flex-horizontal]) {
      flex-direction: row;
    }

    :host([expanded]) {
      flex: 1;
    }   

    .head {
      position: relative;
      flex-shrink: 0;
      background: grey;
      font-size: var(--font-size);
      min-height: calc(var(--font-size) + var(--head-vertical-padding));
      border-bottom: 1px solid black;
    }

    :host([flex-horizontal]) .head {
      min-height: 100%;
      min-width: calc(var(--font-size) + var(--head-vertical-padding));
      border-right: 1px solid black;
      border-bottom: none;
    }

    .head__title {
      pointer-events: none;
      position: absolute;
      top: 50%;
      left: var(--head-horizontal-padding);
      transform: translateY(-50%);
      line-height: 1;
      text-transform: uppercase;
    }

    :host([flex-horizontal]) .head__title {
      top: var(--head-horizontal-padding);
      left: calc(var(--head-vertical-padding) / 2);
      transform: rotate(90deg) translateY(-100%);
      transform-origin: top left;
    }

    .body {
      display: none;
    }

    :host([expanded]) .body {
      display: block;
    }
  </style>
  <div class="head">
    <span class="head__title">
      <slot name="title"></slot>
    </span>
  </div>
  <div class="body">
    <slot name="body"></slot>
  </div>
`;

class PlainAccordionSection extends HTMLElement {
  set expanded(value) {
    if (Boolean(value))
      this.setAttribute('expanded', '');
    else
      this.removeAttribute('expanded');
  }
  
  get expanded() {
    return this.hasAttribute('expanded');
  }
  
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }
  
  connectedCallback() {
    this.render();
  }
  
  render() {
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(plainAccordionSectionTemplate.content.cloneNode(true));
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PlainAccordionSection;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const plainAccordionTemplate = document.createElement('template');
plainAccordionTemplate.innerHTML = `
  <style>
    :host([flex]) {
      display: flex;
      flex-direction: column;
    }

    :host([flex-horizontal]) {
      flex-direction: row;
    }
  </style>
  <slot></slot>
`;

class PlainAccordion extends HTMLElement {
  set flex(value) {
    if (Boolean(value)) {
      this.setAttribute('flex', '')
    } else {
      this.removeAttribute('flex');
    }
  }
  
  get flex() {
    return this.hasAttribute('flex');
  }
  
  set flexHorizontal(value) {
    if (Boolean(value)) {
      this.setAttribute('flex-horizontal', '')
    } else {
      this.removeAttribute('flex-horizontal');
    }
  }
  
  get flexHorizontal() {
    return this.hasAttribute('flex-horizontal');
  }
  
  static get observedAttributes() {
    return ['flex', 'flex-horizontal'];
  }
  
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(plainAccordionTemplate.content.cloneNode(true));
  }
  
  connectedCallback() {
    this.update();
    this.addEventListener('click', this.paneClick);
    
    if (this.removeAttribute('hidden')) {
      this.removeAttribute('hidden');
    }
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'flex' || name === 'flex-horizontal') {
      this.update();
    }
  }
  
  paneClick(event) {
    const pane = event.srcElement;
    const clickedElement = event.path[0]; 
    if (!clickedElement.classList.contains('head'))
      return;

    this.togglePane(pane);
  }
  
  togglePane(pane) {
    if (pane.hasAttribute('expanded')) {
      pane.removeAttribute('expanded');
      if (this.flex && !this.flexHorizontal)
        pane.style.minHeight = '0';
      if (this.flex && this.flexHorizontal)
        pane.style.minWidth = '0';
    } else {
      pane.setAttribute('expanded', '');
      if (this.flex && !this.flexHorizontal)
        pane.style.minHeight = `${100 / this.childs.length}%`;
      if (this.flex && this.flexHorizontal)
        pane.style.minWidth = `${100 / this.childs.length}%`;
    }
  }
  
  update() {
    this.childs = this.shadowRoot.querySelector('slot').assignedNodes().filter(node => {
      return node.nodeName === 'SPLIT-PANE';
    });

    if (!this.flex) {
      this.childs.forEach(child => {
        if (child.hasAttribute('flex-horizontal')) {
          child.removeAttribute('flex-horizontal')
        }
        
        if (child.hasAttribute('expanded')) {
          child.style.minWidth = 0;
          child.style.minHeight = 0;
        }
      });
      
      return;
    }
    
    if (this.flex && this.flexHorizontal) {
      this.childs.forEach(child => {
        child.setAttribute('flex-horizontal', '')
        
        if (child.hasAttribute('expanded')) {
          child.style.minWidth = `${100 / this.childs.length}%`;
        }
      });
    } else if (this.flex && !this.flexHorizontal) {
      this.childs.forEach(child => {
        if (child.hasAttribute('flex-horizontal')) {
          child.removeAttribute('flex-horizontal')
        }
        
        if (child.hasAttribute('expanded')) {
          pane.style.minHeight = `${100 / this.childs.length}%`;
        }
      });
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PlainAccordion;


/***/ })
/******/ ]);