document.addEventListener("DOMContentLoaded", function () {
  // Get slider elements
  const slider = document.querySelector(".slider");
  const sliderGrid = document.querySelector(".slider-grid");
  const slides = document.querySelectorAll(".slide-item");
  const prevBtn = document.querySelector(".slider-nav .prev");
  const nextBtn = document.querySelector(".slider-nav .next");

  // Check if we have all necessary elements
  if (!slider || !sliderGrid || slides.length === 0 || !prevBtn || !nextBtn) {
    return;
  }

  // Set initial variables
  const slideStyles = window.getComputedStyle(sliderGrid);
  const slideGap = parseInt(slideStyles.columnGap, 10) || 0;
  let currentPosition = 0;
  let slidesPerView = 3; // Default, will be recalculated.
  let slideWidth = 0;

  // Update slides per view for responsive design
  function updateSlidesPerView() {
    const sliderWidth = slider.getBoundingClientRect().width;
    slideWidth = slides[0].getBoundingClientRect().width;
    slidesPerView = Math.floor(sliderWidth / slideWidth);

    // Ensure we have at least 1 slide per view
    slidesPerView = Math.max(1, slidesPerView);
  }

  // Initialize the slider
  function initSlider() {
    updateSlidesPerView();
    updateSliderPosition();

    // Add event listeners to navigation buttons
    prevBtn.addEventListener("click", slidePrev);
    nextBtn.addEventListener("click", slideNext);

    // Handle window resize
    window.addEventListener("resize", function () {
      updateSlidesPerView();
      updateSliderPosition();
    });
  }

  // Slide to the previous set of slides
  function slidePrev() {
    if (currentPosition > 0) {
      currentPosition--;
      updateSliderPosition();
    }
  }

  // Slide to the next set of slides
  function slideNext() {
    const maxPosition = Math.ceil(slides.length / slidesPerView) - 1;

    if (currentPosition < maxPosition) {
      currentPosition++;
      updateSliderPosition();
    }
  }

  // Update the slider position
  function updateSliderPosition() {
    // Calculate the target scroll position for the current "page"
    const targetScroll =
      currentPosition * slidesPerView * (slideWidth + slideGap);

    // Calculate the maximum possible scroll distance
    const maxScroll = sliderGrid.scrollWidth - slider.clientWidth;

    // Use the smaller of the two values to avoid overscrolling past the last slide
    const translateX = -Math.min(targetScroll, maxScroll);

    sliderGrid.style.transform = `translateX(${translateX}px)`;
    sliderGrid.style.transition = "transform 0.3s ease";
  }

  // Initialize the slider.
  initSlider();
});
