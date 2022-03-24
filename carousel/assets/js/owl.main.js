var owlService = $('.owl-servise').owlCarousel({
    loop:true,
    dots: false,
    margin:10,
    URLhashListener:true,
    startPosition: '0',
    lazyLoad: true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
});

$('#previous').click(function(){
    owlService.trigger('prev.owl.carousel')
});

$('#next').click(function(){
    owlService.trigger('next.owl.carousel')
});