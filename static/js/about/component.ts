const template = document.createElement("template");
const pageContents = await fetch("static/js/about/about-page.html");
template.innerHTML = await pageContents.text();

export class PageContent extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("page-content", PageContent);
