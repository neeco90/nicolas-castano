function circleCharts(){
    //circle chart
    circleParams = {
        easing: 'easeInOut',
        trailColor: '#eee',
        color: '#00ffa8',
        strokeWidth: 5,
        trailWidth: .5,
        duration: 1500,
        text:{
            value: '0'
        },
        step: function(state,bar){
            bar.setText((bar.value() * 10).toFixed(1));
        }                          
    };

    var html = new ProgressBar.Circle('#html',circleParams);
    var css = new ProgressBar.Circle('#css',circleParams);
    var js = new ProgressBar.Circle('#js',circleParams);

    html.animate(0.95);
    css.animate(0.95);
    js.animate(0.78);
}

function lineCharts(){
    //line chart
    barParams = {
        strokeWidth: 2,
        easing: 'easeInOut',
        duration: 1400,
        color: '#00ffa8',
        trailColor: '#eee',
        trailWidth: .1,
        svgStyle: {width: '100%', height: '100%'},
        text: {
            style: {
              color: '#fff',
              padding: 0,
              margin: 0,
              transform: null
            },
            autoStyleContainer: false
        },
        step: (state, bar) => {
            bar.setText(Math.round(bar.value() * 100) + ' %');
        }                         
    };

    var illustrator = new ProgressBar.Line('#illustrator', barParams);
    var photoshop = new ProgressBar.Line('#photoshop', barParams);
    var xd = new ProgressBar.Line('#xd', barParams);
    var uidesign = new ProgressBar.Line('#uidesign', barParams);
    var accesibility = new ProgressBar.Line('#accesibility', barParams);
    var branding = new ProgressBar.Line('#branding', barParams);

    illustrator.animate(0.9);  // Number from 0.0 to 1.0
    photoshop.animate(0.8);
    xd.animate(0.75);
    uidesign.animate(0.85);
    accesibility.animate(0.7);
    branding.animate(0.85);
}

function openMenu(){
    if(!$('.main-header_nav_menu-list').hasClass('opened')){
        $('body').css('overflow-y','hidden');
        $('.main-header_nav_menu').hide();
        $('.menu-icon_close').show();
        $('.main-header_nav_menu-list').fadeIn('fast', function(){
            $('.main-header_nav_menu-list').addClass('opened');
        });
    }
}

function closeMenu(){
    if($('.main-header_nav_menu-list').hasClass('opened')){
        $('body').css('overflow-y','auto');
        $('.main-header_nav_menu').show();
        $('.menu-icon_close').hide();
        $('.main-header_nav_menu-list').fadeOut('fast', function(){
            $('.main-header_nav_menu-list').removeClass('opened');
        });
    }
}

///////// INICIALIZACIÓN DE FUNCIONES /////////

$(document).ready(function(){
    $('#bkg-header-container').parallaxify();

    $('#personalData').waypoint(function(direction) {
        circleCharts();
        lineCharts();
        this.destroy();
    }, {
        offset: '500'
    });

    
    // SMOOTH SCROLL!
    // Select all links with hashes
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

    $(window).scroll(function() {
        if ($(window).scrollTop() >= 300) {
            $(".main-header_nav").addClass("fixed");
        } else {
            $(".main-header_nav").removeClass("fixed");
        }
    });
})