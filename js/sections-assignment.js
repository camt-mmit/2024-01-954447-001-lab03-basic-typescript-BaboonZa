import { assignComponent as assignInputComponent } from "./inputs-component.js";
function createComponent(template) {
    const clonedContent = template.content.cloneNode(true);
    const firstChild = clonedContent.firstElementChild;
    if (!firstChild || !(firstChild instanceof HTMLElement)) {
        throw new Error("The template content is empty or does not contain an HTMLElement.");
    }
    return firstChild;
}
export function assignComponent(element) {
    const template = element.querySelector("template.app-tmpl-section");
    if (!template) {
        throw new Error("Template element not found.");
    }
    const container = template.parentElement;
    if (!container) {
        throw new Error("Container element not found.");
    }
    const updateInputComponents = () => {
        const components = container.querySelectorAll(".app-cmp-section");
        components.forEach((component, index) => {
            // Update section numbers
            const titleElements = component.querySelectorAll(".app-elem-title-no");
            titleElements.forEach((titleNo) => {
                titleNo.textContent = `${index + 1}`;
            });
            // Enable or disable remove buttons
            const removeButtons = component.querySelectorAll(".app-cmd-remove-section");
            removeButtons.forEach((cmdRemoveInput) => {
                cmdRemoveInput.disabled = components.length === 1;
            });
        });
    };
    const addComponent = () => {
        const sectionComponent = createComponent(template);
        container.append(sectionComponent);
        // Assign input component functionality
        assignInputComponent(sectionComponent);
        // Add event listener for the remove button
        sectionComponent.addEventListener("click", (event) => {
            const target = event.target;
            if (target.matches(".app-cmd-remove-section")) {
                sectionComponent.remove();
                updateInputComponents();
            }
        });
        updateInputComponents();
    };
    // Add event listener for the add button
    element.addEventListener("click", (event) => {
        const target = event.target;
        if (target.matches(".app-cmd-add-section")) {
            addComponent();
        }
    });
    // Initialize by adding one component
    addComponent();
}
