
// Суть метода: определть индексы слайдов, которые будут выводиться на экран.
// Записать эти индексы в showedSlidesData
// И при запуске сайта или надатии на кнопку, 
// давать каждому слайду из списка свои команды

$(document).ready(function() {
    const slides = $('.slide');
    let showedSlidesData = [0, 1, 2]

    function carouselInit (slides) {
        slides.eq(0).css({left : '0%', zIndex : 10}).addClass('fade');
        slides.eq(1).css({left : '50%', zIndex : 100}).addClass('scale').addClass('fade');
        slides.eq(2).css({left : '100%', zIndex : 10}).addClass('fade');
        // добавляем индикатор
        $( "<div id='indicator'></div>" ).appendTo(slides.parent().parent()); 
        for (let i = 0; i < slides.length; i++) {
            $("<div class='pic_point'><div class='inner'></div></div>").appendTo('#indicator');
        }
        $('.pic_point .inner').eq(1).show();
    }

    carouselInit(slides);

    let posInit = 0;
    let position = 0;
    let offset = 0;

    slides.on(' touchstart', (event) => {
        const firstTouch = event.touches[0];
        posInit = firstTouch.clientX;
        console.log('posInit: ' + posInit);
    });

    $('body').on(' touchmove', (event) => {
        const firstTouch = event.touches[0];
        position = firstTouch.clientX;
        if (posInit != 0) {
            offset = position - posInit;
            let triggerOffset = -60;
            if (offset < triggerOffset) {
                moveNext ();
            } else if (offset > -triggerOffset) {
                movePrev ();
            } 
        }
    });
    
    let statusReady = true // зашита от спама
    $('.btn-next').on('click', moveNext);

    function moveNext () {
        if (statusReady) {
            statusReady = false;
            $('.pic_point .inner').eq(showedSlidesData[1]).fadeOut();
            $('.pic_point .inner').eq(showedSlidesData[2]).fadeIn();

            const newSlideIndex = showedSlidesData[2] + 1;
            newSlideIndex === slides.length ? showedSlidesData.push(0) : showedSlidesData.push(newSlideIndex);

            const leftSlide = slides.eq(showedSlidesData[0]);
            const middleSlide = slides.eq(showedSlidesData[1]);
            const rightSlide = slides.eq(showedSlidesData[2]);
            const newSlide = slides.eq(showedSlidesData[3]);

            if ($(window).width() >= 545) {
                //комады для каждого слайда из списка для карусели
                middleSlide.animate({ left: '0%' }, 250,
                function () {middleSlide.animate({left : '+=0%'}, 200)});

                rightSlide.animate({left : '103%'}, 200,
                function () {rightSlide.animate({ left: '50%' }, 200)});
                
                setTimeout(() => {
                    middleSlide.toggleClass('scale');
                    rightSlide.css({ zIndex: 10 }).toggleClass('scale');
                    newSlide.css({ left: '100%', zIndex: 5 }).toggleClass('fade');
                    leftSlide.toggleClass('fade');
                }, 125);

                setTimeout(() => {
                    middleSlide.css({ zIndex: 10 });
                    rightSlide.css({ zIndex: 100 });
                    leftSlide.css({ zIndex: 5 });
                    newSlide.css({ zIndex: 9 });
                }, 225)

                
                
                setTimeout(() => {
                    showedSlidesData.splice(0, 1);
                    statusReady = true;
                    console.log(showedSlidesData)
                }, 475)
            } else {
                //комады для каждого слайда из списка для слайдера
                leftSlide.toggleClass('fade');
                middleSlide.animate({left : '-=100%'}, 
                    function () {middleSlide.css({left : '16.5%'});}).toggleClass('scale');
                rightSlide.css({left : '150%'}).animate({left : '-=100%'}).toggleClass('scale');
                newSlide.toggleClass('fade').css({left : '83.5%'});

                middleSlide.css({ zIndex: 10 });
                rightSlide.css({ zIndex: 100 });
                leftSlide.css({ zIndex: 5 });
                newSlide.css({ zIndex: 9 });

                setTimeout(() => {
                    showedSlidesData.splice(0, 1);
                    statusReady = true;
                }, 350)
            }
        } 
    }
    


    $('.btn-prev').on('click', movePrev);

    function movePrev () {
        if (statusReady) {
            statusReady = false;
            $('.pic_point .inner').eq(showedSlidesData[1]).fadeOut();
            $('.pic_point .inner').eq(showedSlidesData[0]).fadeIn();

            const newSlideIndex = showedSlidesData[0] - 1;
            newSlideIndex === -1 ? showedSlidesData.unshift(slides.length - 1) : showedSlidesData.unshift(newSlideIndex);

            const newSlide = slides.eq(showedSlidesData[0]);
            const leftSlide = slides.eq(showedSlidesData[1]);
            const middleSlide = slides.eq(showedSlidesData[2]);
            const rightSlide = slides.eq(showedSlidesData[3]);

            if ($(window).width() >= 545) {
                //комады для каждого слайда из списка для карусели
                middleSlide.animate({ left: '100%' }, 250,
                function () {middleSlide.animate({left : '-=0%'}, 200)});

                leftSlide.animate({left : '-3%'}, 200,
                function () {leftSlide.animate({ left: '50%' }, 200)});
                
                setTimeout(() => {
                    middleSlide.toggleClass('scale');
                    leftSlide.css({ zIndex: 10 }).toggleClass('scale');
                    newSlide.css({ left: '0%', zIndex: 5 }).toggleClass('fade');
                    rightSlide.toggleClass('fade');
                }, 125);

                setTimeout(() => {
                    middleSlide.css({ zIndex: 10 });
                    leftSlide.css({ zIndex: 100 });
                    rightSlide.css({ zIndex: 5 });
                    newSlide.css({ zIndex: 9 });
                }, 225)

                
                

                setTimeout(() => {
                    showedSlidesData.splice(3, 1);
                    statusReady = true;
                    console.log(showedSlidesData)
                }, 475)
            } else {
                //комады для каждого слайда из списка для слайдера
                rightSlide.toggleClass('fade');
                middleSlide.animate({left : '+=100%'}, 
                    function () {middleSlide.css({left : '83.5%'});}).toggleClass('scale');
                leftSlide.css({left : '-50%'}).animate({left : '+=100%'}).toggleClass('scale');
                newSlide.toggleClass('fade').css({left : '16.5%'});

                middleSlide.css({ zIndex: 10 });
                leftSlide.css({ zIndex: 100 });
                rightSlide.css({ zIndex: 5 });
                newSlide.css({ zIndex: 9 });

                setTimeout(() => {
                    showedSlidesData.splice(3, 1);
                    statusReady = true;
                }, 350)
            }
        } 
    }
    
});
