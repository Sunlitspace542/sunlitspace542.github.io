document.addEventListener("DOMContentLoaded", function () {
  const images = Array.from(document.querySelectorAll("img.select-hover"));
  const showNav = images.length > 1;
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

  // Create content box
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

  // Navigation Buttons
  const navWrapper = document.createElement("div");
  navWrapper.style.cssText = "display: flex; justify-content: space-between; margin-top: 10px;";

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "← Previous";
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next →";
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Close";

  if (!showNav) {
  [closeBtn].forEach(btn => {
    btn.style.cssText = `
    margin-top: 15px;
    margin-left: auto;
    margin-right: auto;
    padding: 8px 16px;
    background: #333;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  `;
  });
 }else{
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
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });

  if (showNav) {
  navWrapper.appendChild(prevBtn);
}
  navWrapper.appendChild(closeBtn);
  if (showNav) {
  navWrapper.appendChild(nextBtn);
}


  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  contentBox.appendChild(altText);
  contentBox.appendChild(popupImg);
  contentBox.appendChild(description);
  contentBox.appendChild(navWrapper);
  popup.appendChild(contentBox);
  document.body.appendChild(popup);

  function showImage(index) {
    const img = images[index];
    altText.textContent = img.alt || "No alt text";
    popupImg.src = img.src;
    popupImg.alt = img.alt || "";
    description.textContent = img.getAttribute("data-description") || "What it says on the tin.";
    popup.style.display = "flex";
  }

  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      showImage(currentIndex);
    });
  });
});