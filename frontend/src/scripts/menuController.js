export function hideSideHolder() {
    const element = document.querySelector('.side-menu');
    if (element) {
      element.classList.add('hidden');
    }
  }
  
  export function resetSideHolder() {
    const element = document.querySelector('.side-menu');
    if (element) {
      element.classList.remove('hidden');
    }
  }
  