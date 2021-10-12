(() => {
  const avatar = document.currentScript.parentElement;
  const image = avatar.querySelector('.avatar__image');

  const IMAGE_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjAiIHk9IjAiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiBmaWxsPSIjMDAwIiBvcGFjaXR5PSIwLjIiPjxwYXRoIGQ9Ik04IDE2Yy0xLjYgMC0zLjEtLjUtNC40LTEuMy0xLjMtLjktMi4zLTIuMS0yLjktMy42QzAgOS42LS4yIDggLjIgNi40Yy4zLTEuNiAxLjEtMyAyLjItNC4xQzMuNSAxLjIgNC45LjQgNi41LjEgOC0uMiA5LjYgMCAxMS4xLjZjMS41LjYgMi43IDEuNiAzLjYgMi45QzE1LjUgNC45IDE2IDYuNCAxNiA4YzAgMi4xLS44IDQuMi0yLjMgNS43QzEyLjIgMTUuMiAxMC4xIDE2IDggMTZ6TTggLjZDNi41LjYgNS4xIDEgMy45IDEuOGMtMS4yLjgtMi4yIDItMi43IDMuM0MuNiA2LjUuNSA4IC44IDkuNHMxIDIuNyAyIDMuOGMxIDEgMi4zIDEuNyAzLjggMiAxLjQuMyAyLjkuMSA0LjMtLjQgMS4zLS42IDIuNS0xLjUgMy4zLTIuNy44LTEuMiAxLjItMi42IDEuMi00LjEgMC0yLS44LTMuOC0yLjItNS4yQzExLjggMS40IDEwIC42IDggLjZ6Ii8+PHBhdGggZD0iTTExLjUgOS4xYy0uMS0uMS0uMS0uMS0uMi0uMXMtLjIgMC0uMi4xYy0uOS42LTIgMS0zLjEgMXMtMi4yLS40LTMuMS0xYzAgMC0uMS0uMS0uMi0uMXMtLjIgMC0uMi4xbC0uMS4xdi4ybC4xLjFjMSAuNyAyLjIgMS4xIDMuNCAxLjEgMS4yIDAgMi40LS40IDMuNC0xLjFsLjEtLjF2LS4xLS4xYy4xIDAgLjEgMCAuMS0uMXpNNi43IDYuNGMtLjEgMC0uMSAwLS4yLS4xLS4xIDAtLjEtLjEtLjEtLjItLjEtLjEtLjItLjMtLjQtLjQtLjEtLjEtLjMtLjItLjUtLjJzLS40LjEtLjYuMmMtLjEuMS0uMy4zLS4zLjUgMCAuMS0uMS4xLS4xLjItLjEgMC0uMS4xLS4yLjFoLS4xbC0uMS0uMUM0IDYuMyA0IDYuMiA0IDYuMnYtLjFjLjEtLjMuMy0uNi42LS44LjItLjMuNS0uNC45LS40LjMgMCAuNy4xLjkuMy4zLjIuNS41LjYuOHYuMXMwIC4xLS4xLjFsLS4xLjFjMCAuMS0uMS4xLS4xLjF6TTExLjcgNi40Yy0uMSAwLS4xIDAtLjItLjEtLjEgMC0uMS0uMS0uMS0uMi0uMS0uMi0uMi0uNC0uMy0uNS0uMi0uMS0uNC0uMi0uNi0uMi0uMiAwLS40LjEtLjYuMnMtLjIuNC0uMy42YzAgLjEtLjEuMS0uMS4yLS4xIDAtLjEuMS0uMi4xaC0uMWwtLjEtLjFDOSA2LjMgOSA2LjIgOSA2LjJ2LS4xYy4xLS4zLjMtLjYuNi0uOC4zLS4yLjYtLjMuOS0uMy4zIDAgLjcuMS45LjMuMy4xLjUuNC42Ljd2LjFzMCAuMS0uMS4xbC0uMS4xYzAgLjEgMCAuMS0uMS4xeiIvPjwvc3ZnPgo=';

  const handleImageError = () => {
    image.src = IMAGE_PLACEHOLDER;
  }

  image.addEventListener('error', handleImageError);

  if (!image.src) {
    image.src = IMAGE_PLACEHOLDER;
  }

  const handleImageMutation = (mutationList) => {
    const mutation = mutationList[0];

    if (mutation.attributeName !== 'src') {
      return;
    }

    if (!image.src) {
      image.src = IMAGE_PLACEHOLDER;
    }
  }

  const mutationObserver = new MutationObserver(handleImageMutation);

  mutationObserver.observe(image, {attributes: true});

  document.currentScript.remove();
})();
