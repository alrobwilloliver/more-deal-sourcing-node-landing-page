$(document).ready(function() {

    /* Sticky navigation */
    $('.js--features-section').waypoint(function(direction) {
        if (direction == 'down') {
            $('nav').addClass('sticky');
        } else {
            $('nav').removeClass('sticky');
        }
    }, {
        offset: '60px'
    })

    /* Buttons in page navigation */
    $('.js--scroll-to-investor').click(function() {
        $('html, body').animate({scrollTop: $('.js--investor-section').offset().top}, 1000)
    });

    /* navbar scrolling */
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
        // On-page links
        if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
        && 
        location.hostname == this.hostname
        ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
            scrollTop: target.offset().top
            }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
                return false;
            } else {
                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
            };
            });
        }
        }
    });

    /* Mobile navigation */

    $('.js--mobile-nav-icon').click(function() {
        var nav = $('.main-nav');

        nav.slideToggle(200);

        var attr = $('.js--mobile-nav-icon ion-icon').attr('name');
        console.log(attr);

		if ( typeof attr !== typeof undefined && attr !== false && attr == 'menu' ) {
            $('.js--mobile-nav-icon ion-icon').attr('name', 'close')
            console.log('hello');
		} else {
            $('.js--mobile-nav-icon ion-icon').attr('name', 'menu')
            console.log('goodbye');
		}
    })
})