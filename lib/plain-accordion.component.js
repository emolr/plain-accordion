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

export class PlainAccordion extends HTMLElement {
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