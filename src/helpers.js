export function removeLangClass() {
  document.documentElement.className = '';
}

export function addLangClass(className) {
  removeLangClass();
  document.documentElement.classList.add(className);
}
