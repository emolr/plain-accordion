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

export class PlainAccordionSection extends HTMLElement {
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