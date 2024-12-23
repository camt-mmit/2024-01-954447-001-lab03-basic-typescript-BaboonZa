function createComponent(template: HTMLTemplateElement): HTMLElement {
  return (template.content.cloneNode(true) as DocumentFragment)
    .firstElementChild as HTMLElement;
}
export function assignComponent(element: HTMLElement): void {
  const template = element.querySelector(
    'template.app-tmpl-input',
  ) as HTMLTemplateElement;
  const container = template.parentElement as HTMLElement;
  const updateInputComponents = (): void => {
    [...container.querySelectorAll('.app-cmp-input')].forEach(
      (component, index, inputComponents) => {
        [...component.querySelectorAll('.app-elem-title-no')].forEach(
          (titleNo) => {
            if (titleNo instanceof HTMLElement) {
              titleNo.textContent = `${index + 1}`;
            }
          },
        );
        [...component.querySelectorAll('.app-cmd-remove-input')].forEach(
          (cmdRemoveInput) => {
            if (cmdRemoveInput instanceof HTMLButtonElement) {
              cmdRemoveInput.disabled = inputComponents.length === 1;
            }
          },
        );
      },
    );
  };
  const calculateResult = (): void => {
    const result = [...container.querySelectorAll('.app-cmp-input')]
      .map(
        (component) =>
          component.querySelector(
            'input[type="number"].app-elem-input',
          ) as HTMLInputElement,
      )
      .reduce((sum, element) => sum + (element?.valueAsNumber || 0), 0);
    [...element.querySelectorAll('output.app-elem-result')].forEach(
      (output) => {
        if (output instanceof HTMLOutputElement) {
          output.value = `${result.toLocaleString()}`;
        }
      },
    );
  };
  const appendInputComponent = (): void => {
    const inputComponent = createComponent(template);
    inputComponent.addEventListener('click', (ev) => {
      const target = ev.target as HTMLElement;
      if (target?.matches('.app-cmd-remove-input')) {
        inputComponent.remove();
        updateInputComponents();
        calculateResult();
      }
    });
    container.append(inputComponent);
    updateInputComponents();
    calculateResult();
  };
  element.addEventListener('click', (ev) => {
    const target = ev.target as HTMLElement;
    if (target?.matches('.app-cmd-add-input')) {
      appendInputComponent();
    }
  });
  container.addEventListener('change', (ev) => {
    const target = ev.target as HTMLInputElement;
    if (target?.matches('input[type="number"].app-elem-input')) {
      calculateResult();
    }
  });
  appendInputComponent();
}
