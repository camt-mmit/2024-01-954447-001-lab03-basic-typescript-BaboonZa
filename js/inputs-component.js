function createComponent(template) {
    const clonedNode = template.content.cloneNode(true);
    const firstChild = clonedNode.firstElementChild;
    if (!firstChild) {
        throw new Error("The template content is empty or has no element child.");
    }
    return firstChild;
}
export function assignComponent(element) {
    const template = element.querySelector("template.app-tmpl-input");
    if (!template) {
        throw new Error("Template element not found.");
    }
    const container = template.parentElement;
    if (!container) {
        throw new Error("Container element not found.");
    }
    const updateInputComponents = () => {
        const components = container.querySelectorAll(".app-cmp-input");
        components.forEach((component, index) => {
            const titleElements = component.querySelectorAll(".app-elem-title-no");
            titleElements.forEach((titleNo) => {
                titleNo.textContent = `${index + 1}`;
            });
            const removeButtons = component.querySelectorAll(".app-cmd-remove-input");
            removeButtons.forEach((cmdRemoveInput) => {
                cmdRemoveInput.disabled = components.length === 1;
            });
        });
    };
    const calculateResult = () => {
        const result = Array.from(container.querySelectorAll(".app-cmp-input"))
            .map((component) => component.querySelector('input[type="number"].app-elem-input'))
            .reduce((sum, input) => sum + (input?.valueAsNumber || 0), 0);
        const outputElements = element.querySelectorAll("output.app-elem-result");
        outputElements.forEach((output) => {
            output.value = result.toLocaleString();
        });
    };
    const appendInputComponent = () => {
        const inputComponent = createComponent(template);
        inputComponent.addEventListener("click", (event) => {
            const target = event.target;
            if (target.matches(".app-cmd-remove-input")) {
                inputComponent.remove();
                updateInputComponents();
                calculateResult();
            }
        });
        container.append(inputComponent);
        updateInputComponents();
        calculateResult();
    };
    element.addEventListener("click", (event) => {
        const target = event.target;
        if (target.matches(".app-cmd-add-input")) {
            appendInputComponent();
        }
    });
    container.addEventListener("change", (event) => {
        const target = event.target;
        if (target.matches('input[type="number"].app-elem-input')) {
            calculateResult();
        }
    });
    appendInputComponent();
}
