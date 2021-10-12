'use strict';

(() => {
  const avatarInput = document.currentScript.parentElement;
  const control = avatarInput.querySelector(`.avatar-input__control`);
  const uploadButton = avatarInput.querySelector(`.avatar-input__upload-button`);
  const avatarPreview = avatarInput.querySelector(`.avatar.avatar-input__avatar-preview .avatar__image`);
  const hint = avatarInput.querySelector('.avatar-input__hint');
  const error = avatarInput.querySelector('.avatar-input__error');

  const getAcceptedFileTypes = () => {
    const acceptedFileTypes = control.accept
      .replaceAll(`image/`, ``)
      .split(/,\s?/);

    if (acceptedFileTypes.includes(`jpeg`)) {
      acceptedFileTypes.push(`jpg`);
    }

    return acceptedFileTypes;
  }

  const getIsSpaceOrEnterKeyDownEvent = (evt) => [`Space`, `Enter`].includes(evt.code);

  const validateControlValue = () => {
    if (!control.validity.valid) {
      error.textContent = control.validationMessage;
      hint.classList.remove('avatar-input__hint_visible');
      error.classList.add('avatar-input__error_visible');

      return;
    }

    error.textContent = '';
    error.classList.remove('avatar-input__error_visible');

    if (hint.textContent.length) {
      hint.classList.add('avatar-input__hint_visible');
    }
  }

  const handleControlFocus = () => {
    uploadButton.classList.add(`button_focused`);
  };

  const handleControlBlur = () => {
    uploadButton.classList.remove(`button_focused`);
    uploadButton.classList.remove(`button_pressed`);
  }

  const handleControlKeyDown = (evt) => {
    if (!getIsSpaceOrEnterKeyDownEvent(evt)) {
      return;
    }

    uploadButton.classList.add(`button_pressed`);

    control.addEventListener(`keyup`, handleControlKeyUp);
  }

  const handleControlKeyUp = (evt) => {
    if (!getIsSpaceOrEnterKeyDownEvent(evt)) {
      return;
    }

    uploadButton.classList.remove(`button_pressed`);
    control.removeEventListener(`keydown`, handleControlKeyUp);
  }

  const handleControlChange = () => {
    validateControlValue();

    const file = control.files[0];

    if (!file) {
      avatarPreview.removeAttribute(`src`);

      return;
    }

    const acceptedFileTypes = getAcceptedFileTypes();

    const isFileTypeNotRestricted = acceptedFileTypes
      .some((acceptedFileType) => file.name.toLowerCase().endsWith(acceptedFileType));

    if (!isFileTypeNotRestricted) {
      avatarPreview.removeAttribute(`src`);

      return;
    }

    const fileReader = new FileReader();

    const handleFileReaderLoad = () => {
      avatarPreview.src = fileReader.result;
    };

    fileReader.addEventListener(`load`, handleFileReaderLoad);

    fileReader.readAsDataURL(file);
  }

  control.addEventListener(`focus`, handleControlFocus);
  control.addEventListener(`blur`, handleControlBlur);
  control.addEventListener(`keydown`, handleControlKeyDown);
  control.addEventListener(`change`, handleControlChange);

  document.currentScript.remove();
})();
