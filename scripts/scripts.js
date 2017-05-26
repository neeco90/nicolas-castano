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
        svgStyle: {width: '100%', height: '100%'}                         
    };

    var illustrator = new ProgressBar.Line('#illustrator', barParams);
    var photoshop = new ProgressBar.Line('#photoshop', barParams);
    var uidesign = new ProgressBar.Line('#uidesign', barParams);
    var branding = new ProgressBar.Line('#branding', barParams);

    illustrator.animate(0.9);  // Number from 0.0 to 1.0
    photoshop.animate(0.8);
    uidesign.animate(0.85);
    branding.animate(0.85);
}

function openMenu(){
    if(!$('.main-header_nav_menu-list').hasClass('opened')){
        $('.main-header_nav_menu-list').addClass('opened');
    }
}

function closeMenu(){
    if($('.main-header_nav_menu-list').hasClass('opened')){
        $('.main-header_nav_menu-list').removeClass('opened');
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
})