
$(document).ready(function() {
    $('.image-link').magnificPopup({type:'image'});
});

new WOW().init();

for (let i = 0; i < $('.project').length; i++) {
    $('.project' + i + ' .project__images').magnificPopup({
        delegate: 'a', // child items selector, by clicking on it popup will open
        type: 'image',
        gallery:{enabled:true}
        // other options
    });
}


// scrolls
$('.toConsultation').click(() => {
    $('.consultation')[0].scrollIntoView({behavior : 'smooth'});
})
$('.toProjects').click(() => {
    $('.projects')[0].scrollIntoView({behavior : 'smooth'});
})
$('.toTech').click(() => {
    $('.tech')[0].scrollIntoView({behavior : 'smooth'});
})
$('.toSurety').click(() => {
    $('.surety')[0].scrollIntoView({behavior : 'smooth'});
})
$('.toCarousel').click(() => {
    $('#build')[0].scrollIntoView({behavior : 'smooth'});
})


// header
$('.hamburger-menu').click(function() {
    $('.bar').toggleClass('animate');
    $('.menu').fadeToggle();
});

$('.menu__items').click(() => {
    $('.bar').toggleClass('animate');
    $('.menu').fadeToggle();
})




//projects
const read_more = $('.read_more');
read_more.click(() => {
    $('.hide_projects').slideToggle();
    read_more.toggleClass('open');

    if (read_more.hasClass('open')) {
        read_more.children().text('Свернуть 3 проекта')
        .next().css({transform : 'rotate(180deg)'});
    } else {
        $('.project1')[0].scrollIntoView({behavior : 'smooth'});
        read_more.children().text('Посмотреть ещё 3 проекта')
        .next().css({transform : 'rotate(0deg)'});
    }
})


// tech
$(window).resize(() => {
    if ($(window).width() > 725) {
        $('.point').removeClass('activePoint').children().css({display : 'flex'});
    } else {
        $('.point').removeClass('activePoint').children().css({display : 'none'});
    }
})

$('.point').click(function() {
    if ($(window).width() <= 725) {
        if ($(this).hasClass('activePoint')) {
            $(this).removeClass('activePoint').children().fadeToggle();
        } else {
            $('.activePoint').removeClass('activePoint').children().fadeToggle();
            $(this).addClass('activePoint').children().fadeToggle();
        }
    }
});


//consultation
if (true) {
    const inputs = $('.consultation__form .input');
    inputs.keydown(function () {
        $(this).removeClass('uncorrect').next().hide();
    });
    const checkbox = $('#agrees');
    checkbox.click(function () {
        checkbox.next().removeClass('uncorrect');
    });
    
    
    
    const element = document.getElementById('tel');
    const maskOptions = {
      mask: '+{7}(000)000-00-00'
    };
    const mask = IMask(element, maskOptions);
    
    $('.consultation__form .button').click(function () {
        let hasError = false
        const inputName = $('.consultation__form #name');
        if (inputName.val().length === 0) {
            inputName.addClass('uncorrect').next().show();
            hasError = true;
        }
        const inputTel = $('.consultation__form #tel');
        if (inputTel.val().length != 16) {
            inputTel.addClass('uncorrect').next().show();
            hasError = true;
        }    
        if (!checkbox[0].checked) {
            checkbox.next().addClass('uncorrect');
            hasError = true;
        }
    
        const loader = $('.loader_container')
        if (!hasError) {
            loader.show();
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: { name: inputName.val(), phone: inputTel.val() }
            })
                .done(function (msg) {
                    loader.hide();
                    $('.order_success').fadeIn();
                    setTimeout(() => {
                        $('form')[0].reset();
                        $('.order_success').fadeOut();
                    }, 3000);
                });
        }
    
    });
}


//excursion
$('.excursion__btn').click(() => {
    $('.excursion__popup').fadeToggle();
});

$('.close__box').click(() => {
    $('.excursion__popup').fadeToggle();
});

if (true) {
    const inputs = $('.excursion__form .input');
    inputs.keydown(function () {
        $(this).removeClass('uncorrect').next().slideUp(100);
    });
    const checkbox = $('#agrees-popup');
    checkbox.click(function () {
        checkbox.next().removeClass('uncorrect');
    });
    
    
    
    const element = document.getElementById('tel-popup');
    const maskOptions = {
      mask: '+{7}(000)000-00-00'
    };
    const mask = IMask(element, maskOptions);
    
    $('.excursion__form .button').click(function () {
        let hasError = false
        const inputName = $('.excursion__form #name');
        if (inputName.val().length === 0) {
            inputName.addClass('uncorrect').next().slideDown(100);
            hasError = true;
        }
        const inputTel = $('#tel-popup');
        if (inputTel.val().length != 16) {
            inputTel.addClass('uncorrect').next().slideDown(100);
            hasError = true;
        }    
        if (!checkbox[0].checked) {
            checkbox.next().addClass('uncorrect');
            hasError = true;
        }
    
        const loader = $('.excursion .loader_container')
        if (!hasError) {
            loader.show();
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: { name: inputName.val(), phone: inputTel.val() }
            })
                .done(function (msg) {
                    loader.hide();
                    $('.excursion .order_success').fadeIn();
                    setTimeout(() => {
                        $('form')[1].reset();
                        $('.excursion__popup').fadeToggle();
                        $('.excursion .order_success').fadeOut();
                    }, 3000);
                });
        }
    
    });
}