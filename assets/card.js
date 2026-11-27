document.querySelectorAll(".portrait img").forEach((image) => {
  const hideBrokenImage = () => image.classList.add("image-unavailable");
  image.addEventListener("error", hideBrokenImage, { once: true });
  if (image.complete && image.naturalWidth === 0) hideBrokenImage();
});
