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

///////// INICIALIZACIÓN DE FUNCIONES /////////

$(document).ready(function(){
    $('#bkg-header-container').parallaxify();

    $('#personalData').waypoint(function(direction) {
        circleCharts();
        this.destroy();
    }, {
        offset: '500'
    });
})