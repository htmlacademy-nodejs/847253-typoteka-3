(() => {
  const dateInput = document.currentScript.parentElement;
  const control = dateInput.querySelector('.date-input__control');

  const handleDOMContentLoaded = () => {
    if (!window.flatpickr) {
      return;
    }

    flatpickr.localize(flatpickr.l10ns.ru);
    flatpickr(control, {});
  }

  window.addEventListener('DOMContentLoaded', handleDOMContentLoaded, {once: true});

  document.currentScript.remove();
})();
