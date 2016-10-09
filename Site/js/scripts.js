/* Smooth scrolling para anclas */

$(document).on ("ready", function(){
  $("a.smooth").on("click", function(){
    var $link = $(this);
    var anchor  = $link.attr('href');
    $('html, body').stop().animate({
        scrollTop: $(anchor).offset().top
    }, 800);
  })
})
