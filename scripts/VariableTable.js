import { createElement } from 'helperFunctions';

const variableNameInputClass = 'variable-name-input';
const variableValueInputClass = 'variable-value-input';

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
          createElement('input', { class: variableNameInputClass })),
        createElement('td', {},
          createElement('input', { class: variableValueInputClass })));

      this.$tableElement.appendChild(tableRow);
    });
  }

  getContext() {
    const variableNames = document.querySelectorAll(`.${variableNameInputClass}`);
    const variableValues = document.querySelectorAll(`.${variableValueInputClass}`);
    let context = {};

    Array.prototype.forEach.call(variableNames, (variableNameInput, idx) => {
      if(variableValues[idx]) {
        context[variableNameInput.value] = variableValues[idx].value;
      }
    });

    console.log(context);

    return context;
  }
}
