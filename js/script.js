$(document).ready(function() {
    $(window).on("scroll", function() {
        $(".box").each(function() {
            var boxTop = $(this).offset().top;
            var windowHeight = $(window).height();
            var scrollTop = $(window).scrollTop();

            if (scrollTop + windowHeight - 100 > boxTop) {
                $(this).addClass("show");
            }
        });
    });

    $(window).on("scroll", function() {
        $(".slider-for, .slider-nav").each(function() {
            if ($(this).offset().top < $(window).scrollTop() + $(window).height() - 100) {
                $(this).addClass($(this).hasClass("slider-for") ? "show-left" : "show-right");
            }
        });
    }).trigger("scroll");




    $('.slider-nav').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-for'
    });
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.slider-nav',
        arrows: false,
        dots: true,


    });
    let counters = [
        ["#counter1", "15%"],
        ["#counter2", 60],
        ["#counter3", "20%"],
        ["#counter4", 60],
        ["#counter5", "15%"],
        ["#counter6", 60],

    ];

    function startCounting() {
        let section = $(".section--featured");
        let sectionTop = section.offset().top;
        let viewportBottom = $(window).scrollTop() + $(window).height();

        if (sectionTop < viewportBottom - 100 && !section.hasClass("counted")) {
            section.addClass("counted");
            counters.forEach(([id, value], index) =>
                setTimeout(() => $(id).html(value), (index % 2 ? 2000 : 1000))
            );
        }
    }

    $(window).on("scroll", startCounting);
    startCounting();

    const createOdometers = (selector, value) => {
        const elements = document.querySelectorAll(selector);

        if (elements.length === 0) return;

        let hasRun = false;

        const options = {
            threshold: [0, 0.9],
        };
        const callback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasRun) {
                    hasRun = true; // 

                    elements.forEach((el) => {
                        const odometer = new Odometer({
                            el: el,
                            value: 0,
                        });
                        odometer.update(value);
                    });

                    observer.disconnect();
                }
            });
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(elements[0]);
    };
    createOdometers(".subscribers-odometer", 15);
    const subscribersOdometer = document.querySelector(".subscribers-odometer");

    createOdometers(".subscribers-odometer1", 360);

    createOdometers(".subscribers-odometer2", 600);

    createOdometers(".subscribers-odometer3", 64);

    $("#monthly-plan-btn").addClass("active");
    $(".price").each(function() {
        $(this).html(`<span>$${$(this).data("monthly")}</span> <span>/monthly</span>`);
    });


    $("#yearly-plan-btn").click(function() {
        $(".price").each(function() {
            $(this).html(`<span>$${$(this).data("yearly")}</span> <span>/yearly</span>`);
        });

        $(".nav-link").removeClass("active");
        $(this).addClass("active");
    });


    $("#monthly-plan-btn").click(function() {
        $(".price").each(function() {
            $(this).html(`<span>$${$(this).data("monthly")}</span> <span>/monthly</span>`);
        });

        $(".nav-link").removeClass("active");
        $(this).addClass("active");
    });

    function animateOnScroll() {
        $(".animate-left, .animate-right").each(function() {
            let elementTop = $(this).offset().top;
            let windowBottom = $(window).scrollTop() + $(window).height();

            if (windowBottom > elementTop + 50) {
                $(this).addClass("show");
            }
        });
    }

    $(window).on("scroll", animateOnScroll);
    animateOnScroll();

    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('header').addClass("sticky");
        } else {
            $('header').removeClass("sticky");
        }
    });



    $(".header__btn").on("click", function(e) {
        e.preventDefault();

        // Only show sidebar if window width is greater than 1023px
        if ($(window).width() > 1023) {
            $(".side-bar, .bg-layer").fadeIn();
            $("body").addClass("no-scroll");
        }
    });

    // Close menu
    $(".close, .bg-layer").on("click", function() {
        $(".side-bar, .bg-layer").fadeOut();
        $("body").removeClass("no-scroll");
    });


    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.site-header').addClass('sticky');
        } else {
            $('.site-header').removeClass('sticky');
        }
    });

    //jab toggle menu open hoga tab sticky header display none ho jayega
    $(window).on('scroll', function() {
        if (!$('.navbar').hasClass('active')) {
            if ($(this).scrollTop() > 50) {
                $('.site-header').addClass('sticky');
            } else {
                $('.site-header').removeClass('sticky');
            }
        } else {
            $('.site-header').removeClass('sticky');
        }
    });

    // Toggle menu logic
    $('.header__btn').click(function() {
        $('.navbar').toggleClass('active');
        $('.mobile-overlay').toggleClass('show');

        if ($('.navbar').hasClass('active')) {
            $('.site-header').removeClass('sticky');
            $('body').addClass('menu-open');
            $('.close-menu2').fadeIn(100); // quick show
        } else {
            $('body').removeClass('menu-open');
            $('.close-menu2').fadeOut(100); // quick hide
        }
    });

    $('.mobile-overlay, .close-menu2').click(function() {
        $('.navbar').removeClass('active');
        $('.mobile-overlay').removeClass('show');
        $('body').removeClass('menu-open');
        $('.close-menu2').fadeOut(100); // quick hide
        $(window).trigger('scroll');
    });

    $(".has-child").click(function() {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).next(".submenu").slideUp();
        } else {
            $(".submenu").slideUp();
            $(".has-child").removeClass("active");
            $(this).addClass("active");
            $(this).next(".submenu").slideDown();
        }
    });


});