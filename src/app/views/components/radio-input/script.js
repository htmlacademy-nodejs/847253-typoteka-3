(() => {
  const radioInput = document.currentScript.parentElement;
  const control = radioInput.querySelector('.radio-input__control');
  const button = radioInput.querySelector('.button');

  const updateControlClasses = () => {
    button.classList[control.checked ? 'add' : 'remove']('button_pressed');
  };

  const handleControlInput = () => {
    Array.from(document.querySelectorAll(`.radio-input__control[name="${control.name}"]`))
      .filter((otherControl) => otherControl !== control)
      .forEach((otherControl) => {
        otherControl.dispatchEvent(new Event('change'));
      });
  };

  const handleControlChange = () => {
    updateControlClasses();
  };

  const handleControlFocus = () => {
    button.classList.add('button_focused');
  }

  const handleControlBlur = () => {
    button.classList.remove('button_focused');
  }

  control.addEventListener('input', handleControlInput);
  control.addEventListener('change', handleControlChange);
  control.addEventListener('focus', handleControlFocus);
  control.addEventListener('blur', handleControlBlur);

  updateControlClasses();

  document.currentScript.remove();
})();
