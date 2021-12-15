(() => {
  const dateInput = document.currentScript.parentElement;
  const control = dateInput.querySelector('.date-input__control');
  const fakeControl = dateInput.querySelector('.date-input__fake-control');

  const handleDOMContentLoaded = () => {
    if (window.flatpickr === undefined) {
      return;
    }

    flatpickr.localize(flatpickr.l10ns.ru);
    flatpickr(control, {
      dateFormat: 'Z',
      defaultDate: flatpickr.parseDate(control.value),
      onChange([date]) {
        fakeControl.value = flatpickr.formatDate(date, 'd.m.Y');
      }
    });
  }

  const handleFakeControlFocus = () => {
    control.focus();
  }

  window.addEventListener('DOMContentLoaded', handleDOMContentLoaded, {once: true});
  fakeControl.addEventListener('focus', handleFakeControlFocus)

  document.currentScript.remove();
})();
