// const scrollHeight = document.scrollingElement.scrollHeight - window.innerHeight;
// const width = document.querySelector('.dragger-wrapper .lx-container-80').offsetWidth - 70;
var breakpoint=$('.sec-02,.sec-08,.sec-13').offset().top;
var i=0;


// var promessa=new Promise(function(resolve,reject){
//     $('.dragger-wrapper .lx-image').draggable({
//         axis:'x',
//         containment:'parent',
//         drag:function(){
//             var position=Math.abs(document.querySelector('.dragger-wrapper .lx-image').offsetLeft-document.querySelector('.dragger-wrapper .lx-container-80').offsetLeft);
//             window.scrollTo(0,
//                 scrollHeight*
//                 (position/
//                 width));
//                 console.log(scrollHeight+'\n'+position+'\n'+width+'\n\n');
//         }
//     });
// });

// $('.dragger-wrapper .lx-image').draggable({
//     axis:'x',
//     containment:'parent',
//     drag:function(){
//         window.scrollTo(0,
//             scrollHeight*
//             (Math.abs($(this).offset().left-$(this).parent().offset().left)/
//             width));
//     }
// });

//Opening animation
$(window).on('load', function () {
    var pos=window.location.search.replace('?id=','');
    if(pos!=''){
        $('html,body').animate({
            scrollTop:$('#'+pos).offset().top-60
        },1000)
    }

    $('.lx-opening').removeClass('active');

    //Carousel's
    for (i = 0; i <= $('.lx-carousel').length; i++) {
        $('.lx-carousel-0' + i + ' .owl-carousel').owlCarousel({
            items: 1,
            center: false,
            loop: false,
            dots: true,
            nav: true,
            navText: ['<i class="material-icons">arrow_back</i>', '<i class="material-icons">arrow_forward</i>'],
            navContainer: '.lx-carousel-0' + i + ' .custom-nav'
        });

        var items=$('.lx-carousel-0'+i+' .item');
        var maxHeight=0;
        items.each(function(){
            var height=parseInt($(this).css('height').replace('px',''));
            if(height>maxHeight)
                maxHeight=height;
        });

        items.each(function(){
            $(this).css({'height':maxHeight+'px'});
        });
    }
    
    firstScreenAnimation();
});

$(document).ready(function () {
    //Menu anchors animation
    $('.link-menu').click(function (event) {
        if(!$(this).hasClass('inicio')){
            var position = $(this).data('position');
            var target = '.' + $(this).data('target');

            if (target!='.undefined'&&target.length) {
                event.preventDefault();

                $('html, body').animate({
                    scrollTop: $(target).offset().top + position
                }, 1000);
            }
        }
        else{
            $('html, body').animate({
                scrollTop: $('html, body').offset().top
            }, 1000);
        }
        if(!$(this).hasClass('btn-top')&&window.innerWidth<=900){
            toggleMenu();
        }
    });

    if($(window).scrollTop()>0){
        $('.menu-desktop,.menu-mobile').addClass('active');
    }

    //Menu (Desktop and MB) animation
    $(window).scroll(function () {
        if ($(window).scrollTop() > 1) {
            $('.menu-desktop').addClass('active');
            $('.menu-mobile').addClass('active');
        } else {
            $('.menu-desktop').removeClass('active');
            $('.menu-mobile').removeClass('active');
        }
    });

    //Event listener Menu MB (btn toggle)
    $('.btn-open-menu, .btn-close-menu').click(function () {
        toggleMenu();
    });

    //Event listener Accessibility (btn toggle)
    $('.btn-accessibility').click(function () {
        toggleAccessibility();
    });

    //Show / Hide BTN to top
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $('.btn-top').css('display', 'flex');
        } else {
            $('.btn-top').hide(200);
        }
    });

    // Modal btn open
    $('.btn-open-modal').click(function () {
        var buttonOption = $(this).data('content-option');
        $('.modal-container').removeClass('out');
        $('.modal-container').addClass('open');
        $('.modal-content [data-content="' + buttonOption + '"]').addClass('show');
        $('body').addClass('modal-active');
        setTimeout(function () {
            // After 1 second
            $('.modal-svg').css('z-index', '-1');
        }, 1000);
    });

    // Modal btn close
    $('.btn-close-modal').click(function () {
        //Just remove the loading animation of the buttons
        $('.send').removeClass('lx-is-loading');
        $('.modal-container').removeClass('open');
        $('.modal-container').addClass('out');
        $('.send').removeClass('lx-is-loading');
        $('body').removeClass('modal-active');
        $('.content').removeClass('show');
        $('iframe').each(function(){
            $(this).attr('src',$(this).attr('src'));
        })
        setTimeout(function () {
            // After 1 second
            $('.modal-svg').css('z-index', '1');
        }, 1000);
    });

    //HandTalk activation
    $('#btnSetHandtalk').click(function(){
        unoesteHandTalk.toggleHandTalk(true);
    });

    // Print functions
    $(".btn-to-pdf").click(function () {
        $("#outprint-just-text").show();
        $(".print-text").show();

        var content = $("main").contents()
            .find("h1, h2, h3, h4, h5, p, a, span, label, option, small, ul li, img.print, svg.print, .print-text")
            .not("a p, a div, a h1, a h2, h2 span, a h3, h3 a, a h4, a h5, p a, label span, label p, h3 span, p span, #panorama *, .no-print")
            .clone();
        $("#outprint-just-text").html(content);
        $("#outprint-just-text img, svg").wrap(function () {
            return "<div class='image'></div>";
        });
        $("#outprint-just-text option").prepend("&nbsp;-&nbsp;");
        $("#outprint-just-text").printArea({ mode: 'iframe', popClose: true });

        $(".print-text").hide();
        $("#outprint-just-text").hide();
    });

    //Animations (AOS init)
    AOS.init();

    if(window.innerWidth>900){
        requestAnimationFrame(rotateBox);
    }

    //Interactions
    $('.sec-07 .faixa').click(function(){
        window.open('correntes-do-pensamento-classico.html','_self');
    });
    
    $('.sec-13 .faixa').click(function(){
        window.open('dimensao-social-do-processo-saude-doenca.html','_self');
    });
    
    var particles=['particles-js-01','particles-js-02','particles-js-03','particles-js-04','particles-js-05','particles-js-06','particles-js-07','particles-js-08','particles-js-09'];
    $.each(particles,function(){
        if($('#'+this.toString()).length>0){
            particlesJS.load(this.toString(),'assets/libs/particles/particlesjs-config.json');
        }
    })
});

$(document).scroll(function(){
    // var scrollTop=document.scrollingElement.scrollTop;
    // var percentage=scrollTop/scrollHeight;
    // $('.dragger-wrapper .lx-image').css({'left':width*percentage+'px'})

    firstScreenAnimation();
});

//Functions
function toggleMenu() {
    if ($('.nav-mobile').hasClass('active')) {
        $('.nav-mobile').removeClass('active');
    } else {
        $('.nav-mobile').addClass('active');
    }
}

function toggleAccessibility() {
    if ($('.accessibility').hasClass('active')) {
        $('.accessibility').removeClass('active');
    } else {
        $('.accessibility').addClass('active');
    }
}

function firstScreenAnimation (){
    var percentage=document.scrollingElement.scrollTop/breakpoint;
    if(percentage<1){
        $('.sec-01').css({'z-index':0-percentage});
        $('.sec-01').animate({
            opacity:1-percentage
        },1);
        $('.sec-01 .pos').animate({
            left:percentage*100+'%'
        },1);
    }
    else{
        $('.sec-01').css({'opacity':'0','z-index':-1});
    }
}

function rotateBox(timestamp){
    if(window.matchMedia('(prefers-reduced-motion: no-preference)').matches){
        if(i<360){
            i+=0.2;
        }
        else{
            i=0;
        }
        $('.sec-03 .box,.sec-05 .box,.sec-07 .box,.sec-13 .box-01,.sec-13 .box-04,.sec-16 .box-01,.sec-16 .box-02').css({'transform':'rotate('+i+'deg)'});
        $('.sec-03 .box img,.sec-05 .box img,.sec-07 .box img,.sec-13 .box-01 img,.sec-13 .box-04 .box-05,.sec-16 .box-01 img,.sec-16 .box-02 img').css({'transform':'rotate(-'+i+'deg)'});
        requestAnimationFrame(rotateBox);
    }
}