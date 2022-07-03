const template = document.createElement("template");
template.innerHTML = `
<page-content></page-content>`;

import "./index-page/index-page.js";

export class PageContentTemplate extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("page-content-template", PageContentTemplate);
