import { assignSectionComponent } from './sections-component.js';

const element = document.querySelector<HTMLElement>('.app-cmp-main');

if (element) {
  assignSectionComponent(element);
} else {
  console.error('Element with class .app-cmp-main not found');
}
