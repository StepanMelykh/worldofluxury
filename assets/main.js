"use strict";

(function () {
    jQuery(document).ready(function () {
        console.log("Loaded ...");

        homeHeroSlider();
        partnersSlider();
        productsSlider();
        cartActive();
        searchForm();
        mobileNavigation();
        productGallary();
        productAdditionalInfo();
        inquirePopupBehavior();
        changeProductQuantity();
        loginAction();
        productsTabActions();
        scaleImageGallary();
        // popupProductGallary();
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
                items: 5,
                dots: true,
                loop: true,
                // autoplay: true,
                autoplaySpeed: 1000,
                margin: 5,
                responsive: {
                    768 : {
                        items: 6,
                    },
                    1820 : {
                        items: 8,
                    }
                }
            }); 
        }
    }

    function productsSlider() {
        var products = jQuery('.products-slider');
        if (products.length > 0) { 
            products.each(function (index, el) { 
                jQuery(el).owlCarousel({
                    items: 4,
                    dots: false,
                    loop: true,
                    // autoplay: true,
                    // autoplaySpeed: 1000,
                    margin: 10,
                    responsive: {
                        991 : {
                            margin: 20,
                        },
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

    function mobileNavigation() {
        jQuery('.catalog-action').on('click', function () {
            jQuery('.mobile-navigation').toggleClass('active');
            modalOverlayActive('show');
        });

        jQuery('.close-mobile-nav').on('click', function () {
            jQuery('.mobile-navigation').toggleClass('active');
            modalOverlayActive('hide');
        });

        jQuery('.has-child').on('click', function () {
            var subMenu = jQuery('.sub-menu', this);
            if (jQuery(this).hasClass('open')) {
                subMenu.slideUp();
            } else { 
                subMenu.slideDown();
            }

            jQuery(this).toggleClass('open');

        });
    }

    function productGallary() { 

        var popupProductGallary = jQuery('#popup-product-gallary');
        if (popupProductGallary.length > 0) { 
            popupProductGallary.owlCarousel({
                items: 1,
                dots: false,
                loop: true,
                nav: true,
                navText: ['<span class="nav-btn prev-btn"></span>', '<span class="nav-btn next-btn"></span>'],
                margin: 0
            }); 

            jQuery('.close-popup-gallary').on('click', function () {
                jQuery('.popup-gallary').removeClass('active');
            });

            jQuery('.popup-gallary-bg').on('click', function () {
                jQuery('.popup-gallary').removeClass('active');
            });        
        }


        var productGallary = jQuery('#product-gallary');
        var thumbnailsImages = $('.images-wrap .img-dot'); 

        if (productGallary.length > 0) { 
            productGallary.owlCarousel({
                items: 1,
                dots: false,
                loop: true,
                nav: true,
                navText: ['<span class="nav-btn prev-btn"></span>', '<span class="nav-btn next-btn"></span>'],
                margin: 0
            }); 
            jQuery('.slide-item', productGallary).on('click', function () {
                jQuery('.popup-gallary').addClass('active');
                var currentIndex = jQuery(this).data('index-slide');
                popupProductGallary.trigger('to.owl.carousel', currentIndex);
            });  
            
            $('.images-wrap .img-dot').click(function(){
                console.log(jQuery(this).index());
                productGallary.trigger('to.owl.carousel', jQuery(this).index());
                $('.images-wrap .img-dot').removeClass('active');
                $(this).addClass('active');
            });
        
            productGallary.on('changed.owl.carousel', function(event){
                var correntIndex = event.page.index;
                console.log(event);
                $('.images-wrap .img-dot').removeClass('active');
                $(thumbnailsImages[correntIndex]).addClass('active');
            });
        }

    }

    function productAdditionalInfo() { 
        var additionalInfo = jQuery('.additional-info');

        jQuery('.tab-name', additionalInfo).on('click', function () {
            var tabName = jQuery(this).data('tab-name');
            if (jQuery(this).hasClass('active')) {
                return;
            }

            jQuery('.tab-content', additionalInfo).removeClass('active');
            jQuery('.tab-name', additionalInfo).removeClass('active');
            jQuery(this).addClass('active');
            jQuery('[data-tab-content=' + tabName + ']').addClass('active');
        })
        

    }

    function inquirePopupBehavior() { 
        jQuery('.inquire-action').on('click', function () {
            jQuery('.popup-inquire').addClass('active');
        });

        jQuery('.close-popup').on('click', function () {
            jQuery('.popup-inquire').removeClass('active');
        });

        jQuery('.popup-bg').on('click', function () {
            jQuery('.popup-inquire').removeClass('active');
        });
    }

    function changeProductQuantity() { 
        jQuery('span.quantity').on('click', function () {
            var parentQuantity = jQuery(this).parent();
            var currentQuantity = parseInt(jQuery('.count-quantity', parentQuantity).attr('data-product-quantity'));
            var newQuantity = currentQuantity;
            if ( jQuery(this).hasClass('minus-quantity') && (currentQuantity > 1) ) { 
                newQuantity = currentQuantity - 1;
            }

            if ( jQuery(this).hasClass('plus-quantity') ) { 
                newQuantity = currentQuantity + 1;
            }

            jQuery('.count-quantity', parentQuantity).attr('data-product-quantity', newQuantity);
            jQuery('.count-quantity', parentQuantity).text(newQuantity);
        });
    }

    function loginAction() { 
        jQuery('.sign-in').on('click', function () {
            jQuery('#login-container').toggleClass('active');
        });
        jQuery('#login-container .popup-bg').on('click', function () {
            jQuery('#login-container').toggleClass('active');
        });

        jQuery('[data-form-name]').on('click', function () {
            var form_name = jQuery(this).data('form-name');
            jQuery('[data-form-tab]').removeClass('active');
            jQuery('[data-form-name]').removeClass('active');

            jQuery(this).addClass('active');
            jQuery('[data-form-tab=' + form_name + ']').addClass('active');
        });

        jQuery('.login-btn').on('click', function () { 
            jQuery('.mobile-navigation').toggleClass('active');
            modalOverlayActive('hide');
        });

    }

    function productsTabActions() { 
        jQuery('.tab-title').on('click', function () { 
            var sectionId = jQuery(this).parent().data('titles-id');
            var tabsContent = jQuery('[data-contents-id=' + sectionId + ']');
            var tabsTitle = jQuery('[data-titles-id=' + sectionId + ']');
            
            jQuery('.tab-title', tabsTitle).removeClass('active');
            jQuery(this).addClass('active');
            
            var tabName = jQuery(this).data('tab-name');
            
            jQuery('.tab-content', tabsContent).removeClass('active');
            jQuery('[data-tab-content='+ tabName +']', tabsContent).addClass('active');
        });


    }

    function popupProductGallary() { 
        // var productGallary = jQuery('#popup-product-gallary');
        // if (productGallary.length > 0) { 
        //     productGallary.owlCarousel({
        //         items: 1,
        //         dots: true,
        //         loop: true,
        //         nav: true,
        //         navText: ['<span class="nav-btn prev-btn"></span>', '<span class="nav-btn next-btn"></span>'],
        //         margin: 0
        //     }); 

        //     jQuery('.close-popup-gallary').on('click', function () {
        //         jQuery('.popup-gallary').removeClass('active');
        //     });

        //     jQuery('.popup-gallary-bg').on('click', function () {
        //         jQuery('.popup-gallary').removeClass('active');
        //     });        
        // }
    }

    function scaleImageGallary() { 
        var windowWidth = jQuery("#product-gallary .slide-item").width();
        var windowHeight = jQuery("#product-gallary .slide-item").height();
        console.log(windowWidth + " : " + windowHeight);
        var scaleValue = 3;
        jQuery("#product-gallary .slide-item").on('mousemove', function (event) { 
            var relX = event.pageX - $(this).offset().left;
            var relY = event.pageY - $(this).offset().top;
            
            console.log(relX + " : " + relY);

            var trX = (relX * 100) / windowWidth - 50;
            var trY = (relY * 100) / windowHeight - 50;
            
            jQuery('img', this).css({
                'transform': 'scale(' + scaleValue + ') translateX(' + -trX + '%) translateY(' + -trY + '%)',
                'transition': '0.01s'
            })
        });
        jQuery("#product-gallary .slide-item").on('mouseout', function (event) {
            jQuery('img', this).css({
                'transform': 'scale(' + 1 + ')',
                'transition': '0.3s'
            })
         })
    }

    jQuery('.modal__overlay').click(function(e){

        if( jQuery('#cart').hasClass('active') ){
            jQuery('#cart').removeClass('active');
        }

        if( jQuery('.login-section').hasClass('active') ){
            closeLoginForm();
        }

        if (jQuery('.mobile-navigation').hasClass('active')) {
            jQuery('.mobile-navigation').toggleClass('active');
        }

        modalOverlayActive('hide');
    });

})(jQuery);
