const template = document.createElement("template");
const pageContents = await fetch("static/js/num-counter/num-counter.html");
template.innerHTML = await pageContents.text();
let count = 0;
function playAnimation(el, animationName) {
    el.style.animationName = "none";
    void el.offsetWidth;
    el.style.animationName = animationName;
}
function increaseCounter(previousDigit, currentDigit) {
    return () => {
        count += 1;
        previousDigit.textContent = `${count - 1}`;
        currentDigit.textContent = `${count}`;
        playAnimation(previousDigit, "animDown2");
        playAnimation(currentDigit, "animDown1");
    };
}
function decreaseCounter(previousDigit, currentDigit) {
    return () => {
        count -= 1;
        previousDigit.textContent = `${count + 1}`;
        currentDigit.textContent = `${count}`;
        playAnimation(previousDigit, "animUp2");
        playAnimation(currentDigit, "animUp1");
    };
}
export class NumCounter extends HTMLElement {
    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.content.cloneNode(true));
        // Get DOM elements
        const counterDigit = shadowRoot.getElementById("counter-digit");
        const counterDigitCurrent = shadowRoot.getElementById("counter-digit-current");
        const increaseButton = shadowRoot.getElementById("increase-counter");
        const decreaseButton = shadowRoot.getElementById("decrease-counter");
        // Add click events
        increaseButton.addEventListener("click", increaseCounter(counterDigit, counterDigitCurrent));
        decreaseButton.addEventListener("click", decreaseCounter(counterDigit, counterDigitCurrent));
    }
}
customElements.define("num-counter", NumCounter);
