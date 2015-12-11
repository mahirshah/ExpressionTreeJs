/**
 * Creates an element with the given name
 * @param {string} name - html tag name of element
 * @param {{}} attributes - object holding key-value pairs of attributes
 * @param {[Element]} innerEls - inner elements to append to created element
 * @returns {Element} - the created element
 */
export function createElement(name, attributes = {}, ...innerEls) {
  const createdElement = document.createElement(name);

  Object.keys(attributes).forEach((key) => {
    createdElement.setAttribute(key, attributes[key]);
  });

  innerEls.forEach((el) => {
    createdElement.appendChild(el);
  });

  return createdElement;
}

/**
 * Debounces a given function with the given delay
 * @param {Function} fx - the function to debounce
 * @param {number} delay - the delay in ms to debounce the function call
 * @returns {Function} - the debounced function
 */
export function debounce(fx, delay) {
  let timer;

  return function() {
    clearTimeout(timer);
    timer = setTimeout((...args) => {
      fx(...args);
    }, delay);
  };
}

/**
 * Repeats a given string count number of times
 * @param {string} str - the string to repeat
 * @param {number} count - number of times to repeat the string
 * @returns {string} - the repeated string
 */
export function repeat(str, count) {
  let repeated = '';

  while(count--) {
    repeated += str;
  }

  return repeated;
}