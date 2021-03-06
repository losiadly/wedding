var appMaster = {

    preLoader: function(){
        imageSources = []
        $('img').each(function() {
            var sources = $(this).attr('src');
            imageSources.push(sources);
        });
        if($(imageSources).load()){
            setTimeout(function() {
                $('.pre-loader').fadeOut('slow');
            }, 1000);
        }
    },

    smoothScroll: function() {
        // Smooth Scrolling
        $('a[href*=#]:not([href=#carousel-example-generic])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    },

    animateScript: function() {
        $('.scrollpoint.sp-effect1').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInLeft');},{offset:'100%'});
        $('.scrollpoint.sp-effect2').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInRight');},{offset:'100%'});
        $('.scrollpoint.sp-effect3').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInDown');},{offset:'100%'});
        $('.scrollpoint.sp-effect4').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeIn');},{offset:'100%'});
        $('.scrollpoint.sp-effect5').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInUp');},{offset:'100%'});
    },

    revSlider: function() {

        var docHeight = $(window).height();


        var mainSlider = $('.tp-banner').revolution({
            delay: 9000,
            startwidth: 1170,
            startheight: docHeight,
            hideThumbs: 10,
            touchenabled: false,
            fullWidth: "on",
            hideTimerBar: "on",
            fullScreen: "on",
            onHoverStop: "off",
            fullScreenOffsetContainer: ""
        });

    },

    scrollMenu: function(){
        var num = 50; //number of pixels before modifying styles

        $(window).bind('scroll', function () {
            if ($(window).scrollTop() > num) {
                $('nav').addClass('scrolled');

            } else {
                $('nav').removeClass('scrolled');
            }
        });
    },
    placeHold: function(){
        // run Placeholdem on all elements with placeholders
        Placeholdem(document.querySelectorAll('[placeholder]'));
    }

}; // AppMaster


$(document).ready(function() {
	$("#remember-me").validate({
		rules: {
			name: {
				required: true,
				minlength: 3
			},
			email: {
				required: true,
				email: true
			},
			message: {
				required: true,
				minlength: 3
			}
		},
		messages: {
			name: {
				required: "Proszę podaj swoje imię.",
				minlength: "Twoje imie musi mieć minimum 3 znaki"
			},
			email: "Proszę wprowadź poprawny adres email",
			message: {
				required: "Proszę wpisz wiadomość",
				minlength: "Twoja wiadomość musi mieć minimum 3 znaki"
			},
		}
	});
	// Prevent form submission
	$( "button.sendButton" ).click(function( event ) {
		if($("#remember-me").valid()){
			var data = {};
			data.email = $('input#email').val();
			data.name= $('input#name').val();
			data.message = $('textarea#message').val();
			$.ajax({
				url : 'sendemail.php',
				dataType: 'json',
				type: 'GET',
				data: data,
				success : function (result) {
					if (result.type === "success"){
						$('.alert-success').show(function(){
							$(this).html(result.message);
						})
						$('form').hide();
						$('input#email').val('');
						$('input#name').val('');
						$('textarea#message').val('');
					}
				},
				error : function(result) {
					console.log('ERROR ' + result.message);
				}

			});
		}
		return false;
	});
/**
* Set your date here  (YEAR, MONTH (0 for January/11 for December), DAY, HOUR, MINUTE, SECOND)
* according to the GMT+0 Timezone
**/
var launch = new Date(2015, 09, 19, 16, 00);
/**
* The script
**/
var message = $('#message');
var days = $('#days');
var hours = $('#hours');
var minutes = $('#minutes');
var seconds = $('#seconds');

setDate();
function setDate(){
    var now = new Date();
    if( launch < now ){
        days.html('<h1>0</H1><p>Dni</p>');
        hours.html('<h1>0</h1><p>Godzin</p>');
        minutes.html('<h1>0</h1><p>Minut</p>');
        seconds.html('<h1>0</h1><p>Sekund</p>');
        message.html('WESELE CZAS ZACZĄĆ...');
    }
    else{
        var s = (launch.getTime() - now.getTime())/1000;

        var d = Math.floor(s/86400);
        days.html('<h1>'+d+'</h1><p>Dni</p>');
        s -= d*86400;

        var h = Math.floor(s/3600);
        hours.html('<h1>'+h+'</h1><p>Godzin</p>');
        s -= h*3600;

        var m = Math.floor(s/60);
        minutes.html('<h1>'+m+'</h1><p>Minut</p>');

        s = Math.floor(s-m*60);
        seconds.html('<h1>'+s+'</h1><p>Sekund</p>');
        setTimeout(setDate, 1000);
    }
}
    appMaster.smoothScroll();

    appMaster.animateScript();

    appMaster.revSlider();

    appMaster.scrollMenu();

    //appMaster.placeHold();

});
/******************************************************************************************************************************
ANIMATIONS
*******************************************************************************************************************************/
(function($) {
    "use strict";
    var isMobile = false;
    if (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i)||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i)) {
        isMobile = true;
    }
    if (isMobile == true) {
        $('body').removeClass('nomobile');
        $('.animated').removeClass('animated');
    }
    $(function() {
        if (isMobile == false) {
            $('*[data-animated]').addClass('animated');
        }
        function animated_contents() {
            $(".animated:appeared").each(function (i) {
                var $this    = $(this),
                    animated = $(this).data('animated');

                setTimeout(function () {
                    $this.addClass(animated);
                }, 100 * i);
            });
        }
        animated_contents();
        $(window).scroll(function () {
            animated_contents();
        });
    });
})(jQuery);
