(function () {
    var url_string = window.location.href;
    var urlparams = new URL(url_string);
    var src = urlparams.searchParams.get("src");
    var split = 12;
    var checkout = 'https://go.kiwify.com.br/IB7vHjQ?src=KD-' + src + '&split=' + split;
    var checkout_perseguidor = 'https://go.kiwify.com.br/IB7vHjQ?src=KD-PERSEGUIDOR-' + src + '&split=' + split;
    $(".link-pv").attr('href', checkout).attr('target', '_blank');
    $(".link-pv-perseguidor").attr('href', checkout_perseguidor).attr('target', '_blank');


    CookieTimer.start('countdown', '', 10 * 60);



    $('.carousel-showmanymoveone .item').each(function () {
        var itemToClone = $(this);

        for (var i = 1; i < 3; i++) {
            itemToClone = itemToClone.next();

            // wrap around if at end of item collection
            if (!itemToClone.length) {
                itemToClone = $(this).siblings(':first');
            }

            // grab item, clone, add marker class, add to collection
            itemToClone.children(':first-child').clone()
                .addClass("cloneditem-" + (i))
                .appendTo($(this));
        }
    });
    $(window).on("resize", function (e) {
        checkScreenSize();
    });

    checkScreenSize();

    function checkScreenSize() {
        var newWindowWidth = $(window).width();
        if (newWindowWidth < 767) {
            $('.carousel').carousel({
                interval: 1000 * 3
            });
        }
    }

    $(window).scroll(function (event) {
        function footer() {
            var scroll = $(window).scrollTop();
            if (scroll > 1000) {
                $(".footer-nav").fadeIn("slow").addClass("show");
            }
            else {
                $(".footer-nav").fadeOut("slow").removeClass("show");
            }

            clearTimeout($.data(this, 'scrollTimer'));
            $.data(this, 'scrollTimer', setTimeout(function () {
                if ($('.footer-nav').is(':hover')) {
                    footer();
                }
                else {
                    $(".footer-nav").fadeOut("slow");
                }
            }, 2000));
        }
        footer();
    });

    // Contador
    function setUpProgressBar(selector, startTime, endTime, update) {

        var timer
        var elem = document.querySelector(selector)
        var max = endTime - startTime
        elem.max = max

        var setValue = function () {
            var currentTime = new Date().getTime()
            var ellasped = currentTime - startTime
            if (ellasped >= max) {
                ellasped = max
                window.clearTimeout(timer)
            }
            elem.value = ellasped
            var prec = ellasped / max * 100
            elem.setAttribute("data-label", prec.toFixed(2) + '%')
        }

        setValue()
        timer = window.setInterval(setValue, update)
        return
    }

    var start1 = new Date()
    start1.setMinutes(start1.getMinutes() - 2);
    var end1 = new Date()
    end1.setMinutes(end1.getMinutes() + 1);
    setUpProgressBar("#pb1", start1.getTime(), end1.getTime(), 100)


    // Hilight
    $(window).on("scroll", function () {
        highlight();
    });

    function highlight() {
        var scroll = $(window).scrollTop();
        var height = $(window).height();

        $(".highlight").each(function () {
            var pos = $(this).offset().top;
            if (scroll + height >= pos) {
                $(this).addClass("active");
            }
        });
    }
}());