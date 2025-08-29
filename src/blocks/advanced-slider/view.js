document.addEventListener( 'DOMContentLoaded', function () {
	// Get slider elements
	const slider = document.querySelector( '.slider' );
	const sliderGrid = document.querySelector( '.slider-grid' );
	const slides = document.querySelectorAll( '.slide-item' );
	const prevBtn = document.querySelector( '.slider-nav .prev' );
	const nextBtn = document.querySelector( '.slider-nav .next' );
	const counter = document.querySelector( '.slider-nav .slider-counter' );

	// Check if we have all necessary elements
	if (
		! slider ||
		! sliderGrid ||
		slides.length === 0 ||
		! prevBtn || // if no prevBtn, no nav is present
		! nextBtn // if no nextBtn, no nav is present
	) {
		return;
	}

	// Set initial variables
	const slideStyles = window.getComputedStyle( sliderGrid );
	const slideGap = parseInt( slideStyles.columnGap, 10 ) || 0;
	let currentPosition = 0;
	let slidesPerView = 3; // Default, will be recalculated.
	let slideWidth = 0;
	let totalPages = 0;
	let slidesPerRow = 5;

	// Update slides per view for responsive design
	function updateSlidesPerView() {
		const sliderWidth = slider.getBoundingClientRect().width;
		slideWidth = slides[ 0 ].getBoundingClientRect().width;
		slidesPerView = Math.floor( sliderWidth / slideWidth );
		let newSlides = 0;

		if ( slides.length > slidesPerRow ) {
			newSlides =
				slides.length < slidesPerRow * 2
					? slidesPerRow
					: slides.length - slidesPerRow;
		}

		console.log( 'newSlides', newSlides );

		// Ensure we have at least 1 slide per view
		slidesPerView = Math.max( 1, slidesPerView );
		totalPages = Math.ceil( newSlides / slidesPerView );
	}

	// Initialize the slider
	function initSlider() {
		updateSlidesPerView();
		updateSliderPosition();

		// Add event listeners to navigation buttons
		prevBtn.addEventListener( 'click', slidePrev );
		nextBtn.addEventListener( 'click', slideNext );

		// Handle window resize
		window.addEventListener( 'resize', function () {
			updateSlidesPerView();
			updateSliderPosition();
		} );

		// Handle keyboard navigation
		document.addEventListener( 'keydown', handleKeydown );
	}

	function handleKeydown( e ) {
		// Do not interfere with text input fields.
		if ( e.target.matches( 'input, textarea, select' ) ) {
			return;
		}

		// Check if the slider is in the viewport before acting on keydown.
		const sliderRect = slider.getBoundingClientRect();
		const isSliderInView =
			sliderRect.top < window.innerHeight && sliderRect.bottom > 0;

		if ( ! isSliderInView ) {
			return;
		}

		if ( e.key === 'ArrowLeft' ) {
			e.preventDefault();
			slidePrev();
		}
		if ( e.key === 'ArrowRight' ) {
			e.preventDefault();
			slideNext();
		}
	}

	// Slide to the previous set of slides
	function slidePrev() {
		if ( currentPosition > 0 ) {
			currentPosition--;
			updateSliderPosition();
		}
	}

	// Slide to the next set of slides
	function slideNext() {
		const maxPosition = totalPages - 1;

		if ( currentPosition < maxPosition ) {
			currentPosition++;
			updateSliderPosition();
		}
	}

	// Update the slider position
	function updateSliderPosition() {
		// Calculate the target scroll position for the current "page"
		const targetScroll =
			currentPosition * slidesPerView * ( slideWidth + slideGap );

		// Calculate the maximum possible scroll distance
		const maxScroll = sliderGrid.scrollWidth - slider.clientWidth;

		// Use the smaller of the two values to avoid overscrolling past the last slide
		const translateX = -Math.min( targetScroll, maxScroll );

		sliderGrid.style.transform = `translateX(${ translateX }px)`;
		sliderGrid.style.transition = 'transform 0.3s ease';

		if ( counter ) {
			counter.textContent = `${ currentPosition + 1 } / ${ totalPages }`;
		}

		// Disable/enable buttons based on position.
		prevBtn.disabled = currentPosition === 0;
		nextBtn.disabled = currentPosition >= totalPages - 1;
	}

	// Initialize the slider.
	initSlider();
} );
