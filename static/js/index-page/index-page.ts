const template = document.createElement("template");
const pageContents = await fetch("static/js/index-page/index-page.html");
template.innerHTML = await pageContents.text();

import "../num-counter/num-counter.js";

export class PageContent extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("page-content", PageContent);
