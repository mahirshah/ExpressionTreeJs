import { createElement } from 'helperFunctions';

export default class VariableTable {
  constructor(addRowButton, tableElement) {
    this.$addRowButton = addRowButton;
    this.$tableElement = tableElement;
    this._attachEvents();
  }

  _attachEvents() {
    this.$addRowButton.addEventListener('click', (evt) => {
      const tableRow = createElement('tr', {},
        createElement('td', {},
          createElement('input', { class: 'variable-name-input' })),
        createElement('td', {},
          createElement('input', { class: 'variable-value-input' })));

      this.$tableElement.appendChild(tableRow);
    });
  }

  getContext() {
    const variableNames = document.querySelectorAll('variable-name-input');
    const variableValues = document.querySelectorAll('variableValues');
    let context = {};

    Array.prototype.forEach.call(variableNames, (variableNameInput, idx) => {
      if(variableValues[idx]) {
        context[variableNameInput.value] = variableValues[idx];
      }
    });

    return context;
  }
}
