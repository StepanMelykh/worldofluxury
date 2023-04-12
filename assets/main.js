"use strict";

(function () {
    jQuery(document).ready(function () {
        console.log("Loaded ...");

        homeHeroSlider();
        partnersSlider();
        productsSlider();
        cartActive();
        searchForm();

    });

    function homeHeroSlider() { 
        var heroSlider = jQuery('#hero-slider');
        if (heroSlider.length > 0) { 
            heroSlider.owlCarousel({
                items: 1,
                dots: true,
                loop: true,
                // autoplay: true,
                autoplaySpeed: 1000,
            }); 
        }
    }

    function partnersSlider() { 
        var partners = jQuery('#partners-slider');
        if (partners.length > 0) { 
            partners.owlCarousel({
                items: 8,
                dots: true,
                loop: true,
                // autoplay: true,
                autoplaySpeed: 1000,
                margin: 5,
            }); 
        }
    }

    function productsSlider() {
        var products = jQuery('.products-slider');
        if (products.length > 0) { 
            products.each(function (index, el) { 
                console.log(index +' = '+ el);
                jQuery(el).owlCarousel({
                    items: 4,
                    dots: true,
                    loop: true,
                    // autoplay: true,
                    // autoplaySpeed: 1000,
                    margin: 20,
                    responsive : {
                        1400 : {
                            margin: 50,
                        }
                    }
                }); 
            })
        }
    }

    function cartActive(){
        jQuery('.cart-action').on('click', function(e){
            e.preventDefault();
            modalOverlayActive('show');
            jQuery('#cart').addClass('active');
        });

        jQuery('.close-cart').on('click', function(e){
            modalOverlayActive('hide');
            jQuery('#cart').removeClass('active');
        });
    }

    function modalOverlayActive( status ){
        var modalOverlay = jQuery('.modal__overlay');

        if( status == 'show' ){
            modalOverlay.addClass('active');
            jQuery('body').addClass('fixed');
                modalOverlay.animate({
                    opacity: 1,
                }, 400);
        }

        if( status == 'hide' ){
            modalOverlay.animate({
                opacity: 0,
            }, {
                duration: 400,
                easing: "linear",
                complete: function(){
                    jQuery('body').removeClass('fixed');
                    modalOverlay.removeClass('active');
                }
            });
        }
    }

    function searchForm() { 
        jQuery('.search-action').on('click', function () {
            jQuery('.search-form').toggleClass('show');
            jQuery(this).toggleClass('active');
        });
    }

    jQuery('.modal__overlay').click(function(e){

        if( jQuery('#cart').hasClass('active') ){
            jQuery('#cart').removeClass('active');
        }
        if( jQuery('.login-section').hasClass('active') ){
            closeLoginForm();
        }

        modalOverlayActive('hide');
    });


})(jQuery);
