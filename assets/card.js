const statusMessage = document.getElementById("action-status");

async function copyField(field, label) {
  try {
    await navigator.clipboard.writeText(field.value);
  } catch {
    field.focus();
    field.select();
    field.setSelectionRange(0, field.value.length);

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {
      // The selected field remains available for manual copy.
    }
    if (!copied) {
      statusMessage.textContent = label + " selected. Use your device’s copy command.";
      return;
    }
  }
  statusMessage.textContent = label + " copied.";
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.hidden = false;
  button.addEventListener("click", () => {
    const field = document.getElementById(button.dataset.copy);
    const label = field.id === "card-address" ? "Card link" : "Email address";
    void copyField(field, label);
  });
});

const nativeShare = document.getElementById("native-share");
const cardAddress = document.getElementById("card-address");
const shareData = { title: document.title, url: cardAddress.value };

if (typeof navigator.share === "function" && (typeof navigator.canShare !== "function" || navigator.canShare(shareData))) {
  nativeShare.hidden = false;
  nativeShare.addEventListener("click", async () => {
    try {
      await navigator.share(shareData);
      statusMessage.textContent = "Link sent to the share sheet.";
    } catch (error) {
      if (error.name !== "AbortError") {
        await copyField(cardAddress, "Card link");
      }
    }
  });
}

document.querySelectorAll(".portrait img").forEach((image) => {
  const hideBrokenImage = () => image.classList.add("image-unavailable");
  image.addEventListener("error", hideBrokenImage, { once: true });
  if (image.complete && image.naturalWidth === 0) hideBrokenImage();
});
