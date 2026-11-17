(() => {
  const slides = [...document.querySelectorAll(".banner-carousel .banner-slide")];
  if (slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let activeIndex = slides.findIndex((slide) => slide.classList.contains("active"));
  if (activeIndex < 0) activeIndex = 0;

  window.setInterval(() => {
    slides[activeIndex].classList.remove("active");
    slides[activeIndex].setAttribute("aria-hidden", "true");
    activeIndex = (activeIndex + 1) % slides.length;
    slides[activeIndex].classList.add("active");
    slides[activeIndex].setAttribute("aria-hidden", "false");
  }, 5000);
})();
