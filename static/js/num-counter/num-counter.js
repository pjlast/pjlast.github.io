const template = document.createElement("template");
const pageContents = await fetch("static/num-counter/num-counter.html");
template.innerHTML = await pageContents.text();
let count = 0;
export class NumCounter extends HTMLElement {
    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.content.cloneNode(true));
        const counterDigit = shadowRoot.getElementById("counter-digit");
        const counterDigitCurrent = shadowRoot.getElementById("counter-digit-current");
        const increaseButton = shadowRoot.getElementById("increase-counter");
        increaseButton.addEventListener("click", () => {
            counterDigit.innerHTML = `<strong>${count}</strong>`;
            count += 1;
            counterDigitCurrent.innerHTML = `<strong>${count}</strong>`;
            counterDigit.style.animationName = "none";
            counterDigitCurrent.style.animationName = "none";
            counterDigit.style.animationName = "animDown2";
            counterDigitCurrent.style.animationName = "animDown1";
        });
        const decreaseButton = shadowRoot.getElementById("decrease-counter");
        decreaseButton.addEventListener("click", () => {
            counterDigit.innerHTML = `<strong>${count}</strong>`;
            count -= 1;
            counterDigitCurrent.innerHTML = `<strong>${count}</strong>`;
            counterDigit.style.animationName = "none";
            counterDigitCurrent.style.animationName = "none";
            counterDigit.style.animationName = "animUp2";
            counterDigitCurrent.style.animationName = "animUp1";
        });
    }
}
customElements.define("num-counter", NumCounter);
