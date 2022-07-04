const template = document.createElement("template");
template.innerHTML = `
<page-content></page-content>`;

const path = window.location.pathname;
if (path === "/") {
  // handle index route
  import("./index/component.js");
} else {
  import(`.${path}/component.js`);
}

export class PageContentTemplate extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("page-content-template", PageContentTemplate);
