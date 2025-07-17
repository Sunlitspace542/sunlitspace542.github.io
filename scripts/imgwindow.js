document.addEventListener("DOMContentLoaded", function () {
  let images = []; // Will be dynamic per scroll container
  let currentIndex = 0;

  // Create popup container
  const popup = document.createElement("div");
  popup.id = "image-popup";
  popup.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    display: none; align-items: center; justify-content: center;
    z-index: 9999;
  `;

  const contentBox = document.createElement("div");
  contentBox.style.cssText = `
    background: #051C04e0;
    padding: 20px;
    border-top: 5px green solid;
    border-bottom: 5px green solid;
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    text-align: center;
    color: white;
    position: relative;
  `;

  const altText = document.createElement("h2");
  const popupImg = document.createElement("img");
  popupImg.style.cssText = `
    max-width: 100%;
    max-height: 300px;
    margin: 20px 0;
    border-radius: 8px;
  `;

  const description = document.createElement("p");

  // Navigation + Close Buttons
  const buttonBar = document.createElement("div");
  buttonBar.style.cssText = `
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
    flex-wrap: wrap;
  `;

  const prevBtn = document.createElement("button");
  const nextBtn = document.createElement("button");
  const closeBtn = document.createElement("button");

  prevBtn.textContent = "← Previous";
  nextBtn.textContent = "Next →";
  closeBtn.textContent = "Close";

  [prevBtn, nextBtn, closeBtn].forEach(btn => {
    btn.style.cssText = `
      padding: 8px 16px;
      background: #333;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    `;
  });

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });

  contentBox.appendChild(altText);
  contentBox.appendChild(popupImg);
  contentBox.appendChild(description);
  contentBox.appendChild(buttonBar);
  popup.appendChild(contentBox);
  document.body.appendChild(popup);

  function showImage(index) {
    const img = images[index];
    if (!img) return;
    altText.textContent = img.alt || "No alt text";
    popupImg.src = img.src;
    popupImg.alt = img.alt || "";
    description.textContent = img.getAttribute("data-description") || "What it says on the tin.";
    popup.style.display = "flex";
  }

  // Attach click handlers
  document.querySelectorAll("img.select-hover").forEach((img) => {
    img.addEventListener("click", () => {
      // Find closest scroll container
      const container = img.closest(".scroll-container, .scroll-container-nobg");
      if (container) {
        images = Array.from(container.querySelectorAll("img.select-hover"));
      } else {
        images = [img]; // No container = only this image
      }

      currentIndex = images.indexOf(img);
      showImage(currentIndex);

      // Update button bar
      buttonBar.innerHTML = ""; // Clear existing buttons
      if (images.length > 1) {
        buttonBar.appendChild(prevBtn);
      }
      buttonBar.appendChild(closeBtn);
      if (images.length > 1) {
        buttonBar.appendChild(nextBtn);
      }
    });
  });
});