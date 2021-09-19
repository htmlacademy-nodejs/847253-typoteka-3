(() => {
  const input = document.currentScript.parentElement;
  const control = input.querySelector('.input__control');
  const hint = input.querySelector('.input__hint');
  const error = input.querySelector('.input__error');

  const validateControlValue = () => {
    if (!control.validity.valid) {
      error.textContent = control.validationMessage;
      hint.classList.remove('input__hint_visible');
      error.classList.add('input__error_visible');

      return;
    }

    error.textContent = '';
    error.classList.remove('input__error_visible');

    if (hint.textContent.length) {
      hint.classList.add('input__hint_visible');
    }
  }

  const handleControlChange = () => {
    validateControlValue();
  };

  const handleControlBlur = () => {
    validateControlValue();
  }

  control.addEventListener('change', handleControlChange);
  control.addEventListener('blur', handleControlBlur);

  document.currentScript.remove();
})();
