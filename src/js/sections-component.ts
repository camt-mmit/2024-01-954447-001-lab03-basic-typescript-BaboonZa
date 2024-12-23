import { assignComponent as assignInputComponent } from './inputs-component.js';
function createComponent(template: HTMLTemplateElement): HTMLElement {
  return (template.content.cloneNode(true) as DocumentFragment)
    .firstElementChild as HTMLElement;
}
export function assignSectionComponent(globalContainer: HTMLElement): void {
  const sectionTemplate = document.querySelector(
    'template.app-tmpl-section',
  ) as HTMLTemplateElement;
  const updateSectionNumbersAndButtons = (): void => {
    const sections = [
      ...globalContainer.querySelectorAll<HTMLElement>('.app-cmp-section'),
    ];
    sections.forEach((section, index) => {
      // Update the section number
      const sectionNumberElement = section.querySelector('.section-number');
      if (sectionNumberElement instanceof HTMLElement) {
        sectionNumberElement.textContent = `Section ${index + 1}`;
      } // Enable or disable the "Remove Section" button
      const removeButton = section.querySelector('.app-cmd-remove-section');
      if (removeButton instanceof HTMLButtonElement) {
        removeButton.disabled = sections.length === 1;
      }
    });
  };
  const addSection = (): void => {
    const sectionComponent = createComponent(sectionTemplate); // Add "Remove Section" functionality
    const removeButton = sectionComponent.querySelector(
      '.app-cmd-remove-section',
    );
    if (removeButton instanceof HTMLButtonElement) {
      removeButton.addEventListener('click', () => {
        sectionComponent.remove();
        updateSectionNumbersAndButtons(); // Update numbers and buttons after removing
      });
    } // Assign input management to the new section
    assignInputComponent(sectionComponent);
    globalContainer.appendChild(sectionComponent);
    updateSectionNumbersAndButtons(); // Update numbers and buttons after adding
  };
  addSection(); // Ensure this listener is attached only once
  const addSectionButton = document.querySelector(
    '.app-cmd-add-section',
  ) as HTMLButtonElement & { hasListener?: boolean };
  if (addSectionButton && !addSectionButton.hasListener) {
    addSectionButton.addEventListener('click', addSection);
    addSectionButton.hasListener = true; // Mark the button to prevent duplicate listeners
  }
}
