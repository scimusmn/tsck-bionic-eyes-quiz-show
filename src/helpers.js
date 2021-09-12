export function addClass(className) {
  document.documentElement.className = '';
  document.documentElement.classList.add(className);
}

export function test() {
  console.log('this is a test');
}
