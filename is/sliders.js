$(function() {
  new Slider({
      images: '.slider-1 img',
      btnPrev: '.slider-1 .buttons .prev',
      btnNext: '.slider-1 .buttons .next',
      auto: false,
  });
});

function Slider(obj) {
  this.slider = $(slider);
	this.images = $(obj.images);
	this.auto = obj.auto;
	this.btnPrev = obj.btnPrev;
	this.btnNext = obj.btnNext;
     this.rate = obj.rate || 1000;

	var i = 0;
     var slider = this;

    // The "Previous" button: to remove the class .shown, to show the previous image and to add the .shown class
	this.prev = function () {
		slider.images.eq(i).removeClass('shown');
		i--;

		if (i < 0) {
			i = slider.images.length - 1;
		}

		slider.images.eq(i).addClass('shown');
	}

    // The "Next" button: to remove the class .shown, to show the next image and to add the .shown class
	this.next = function () {
		slider.images.eq(i).removeClass('shown');
		i++;

		if (i >= slider.images.length) {
			i = 0;
		}

		slider.images.eq(i).addClass('shown');
	}

    // To add next and prev functions when clicking on the corresponding buttons
    $(slider.btnPrev).on('click', function(){ slider.prev();});
    $(slider.btnNext).on('click', function(){ slider.next();});

    // For the automatic slider: this method calls the next function at the set rate
	if (slider.auto)	{
        setInterval(slider.next, slider.rate);
    }
};