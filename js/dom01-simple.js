"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const inputComponents = Array.from(document.querySelectorAll('.app-cmp-input input[type="number"].app-elem-input'));
    inputComponents.forEach((element) => {
        element.addEventListener('change', () => {
            const result = inputComponents.reduce((accumulator, inputElement) => accumulator + (inputElement.valueAsNumber || 0), 0);
            const outputElement = document.querySelector('output.app-elem-result');
            if (outputElement) {
                outputElement.value = result.toLocaleString();
            }
        });
    });
});
