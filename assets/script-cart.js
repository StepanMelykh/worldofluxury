jQuery(function() {
    loadCart();
    initCart();
    initButtonChangeQuantityOnProductPage();
    initUpdateQuantityOnCartPage();
    initPromoCodeForm();

});

async function doesDiscountCodeExist(discountCode) {
    const result = await fetch(`/admin/discount_codes/lookup.json?code=${discountCode}`);

    if (result.status == 200) {
        setCookie("discount_code", discountCode, 10);
        document.location.href=document.location.origin + '/discount/' + discountCode + '?redirect=/checkout';
    }
}

function initPromoCodeForm(){
    $('.add-promocode').on('click', function(){
       $(this).hide();
       $('#promocode-form').show();
    });

    $('#apply_promo_code').on('click', function(){
        var customer_promo_code = $('#customer_promo_code').val();
        doesDiscountCodeExist(customer_promo_code);
    });

    var res_cookie = getCookie('discount_code');
    if(res_cookie!='' && res_cookie!=null){
        $('#customer_promo_code_res').text(res_cookie);
        $('#apply_promo_code').hide();
        $('#promo_code_fixed').show();
    }
}

function loadCart() {
    jQuery.ajax({
        type: 'GET',
        url: '/cart.json',
        dataType: 'jsonp',
        success: function(data) {
        console.log(data);
            var item_count = data['item_count'];
            var total_price = data['total_price']/100;

            //If there are items in cart
            if ( item_count > 0 ) {

                // cart count
                var count_title = ' product';
                if (item_count > 1) { 
                    count_title = ' products';
                }
                $('.cart-quantity').text(item_count +' '+ count_title);

                // mini cart data
                jQuery('.mini-cart-subtotal').text( '$' + total_price.toFixed(2) );

                var cart_list = [];

                for( var i = 0; i < item_count; i++ ){
                    if(data['items'][i]) {
                        if (data['items'][i]['id']) {

                            var item_id = data['items'][i]['id'];
                            var product_title = data['items'][i]['product_title'];
                            var quantity = data['items'][i]['quantity'];
                            var line_price = data['items'][i]['price'] / 100;
                            var product_url = data['items'][i]['url'];
                            var image_url = data['items'][i]['image'];
                            var variant_id = data['items'][i]['variant_id'];

                            var html =  '<div class="item-row">\n'+
                                            '<div class="remove-roduct remove-item-from-cart" data-productId="'+ variant_id +'"></div>\n'+
                                            '<div class="columns display-flex">\n'+
                                                '<div class="column left-column">\n'+
                                                    '<div class="image-wrap">\n'+
                                                        '<a href="'+ product_url +'"><img src="'+ image_url +'" alt="'+ product_title +'"></a>\n'+
                                                    '</div>\n'+
                                                '</div>\n'+
                                                '<div class="column right-column">\n'+
                                                    '<div class="content-wrap">\n'+
                                                        '<div class="top-row">\n'+
                                                            '<span class="label-brend">Name Brand</span>\n'+
                                                            '<span class="label-percent">-15%</span>\n'+
                                                        '</div>\n'+
                                                        '<div class="title"><a href="'+ product_url +'">'+ product_title +'</a></div>\n'+
                                                        '<div class="columns-prices">\n'+
                                                            '<div class="column">\n'+
                                                                '<span class="label">Retail price</span>\n'+
                                                                '<span class="price retail-price">$34,700</span>\n'+
                                                            '</div>\n'+
                                                            '<div class="column">\n'+
                                                                '<span class="label">Discount</span>\n'+
                                                                '<span class="price discount-price">$34,700</span>\n'+
                                                            '</div>\n'+
                                                        '</div>\n'+
                                                        '<div class="price-total">\n'+
                                                            '<span class="label">Our price</span>\n'+
                                                            '<span class="price our-price">$'+ line_price.toFixed(2) +'</span>\n'+
                                                        '</div>\n'+
                                                    '</div>\n'+                                  
                                                '</div>\n'+
                                            '</div>\n'+
                                        '</div>\n';
                            
                            cart_list.push(html);
                        } //endif
                    }
                } // endfor


                jQuery('.mini-products-list').html( cart_list.join('') );
                $('.no-items-in-cart').hide();

                jQuery('.remove-item-from-cart').on('click',function(){
                    var product_variant_id = $(this).attr('data-productId');
                    $(this).parent().remove();
                    removeItemCountInCart(product_variant_id, 0);
                });

                // $('.mini-cart-block').show();
                // $('.loadingCart').hide();
            }else{
                $('.loadingCart').hide();
                $('.mini-products-list').empty().show();
                $('.no-items-in-cart').show();
                $('.mini-cart-subtotal').text('');
            }
        }
    });
}

function initCart() {

    var total_items_in_cart = 0;

    jQuery.ajax({
        type: 'GET',
        url: '/cart.js',
        dataType: 'json',
        success: function(data) {

            var item_counts_in_cart = data.items.length;
            total_items_in_cart = data.item_count;

            if(item_counts_in_cart>0) {
                var products_in_cart = data.items.length;
                var count_title = 'product';
                if (item_counts_in_cart > 1) { 
                    count_title = ' products';
                }
                $('.cart-quantity').text(total_items_in_cart+ ' '+ count_title);

                $('#small_cart_elements_count').text(products_in_cart);
                $('.no-items-in-cart').hide();
                $('.mini-cart-items').show();
                $('.small-cart-checkout-button').show();
                
                $('.cart-quantity').text(total_items_in_cart);
            }else{
                 $('.no-items-in-cart, .small-cart-empty').show();
                 $('#header_cart_quantity').text(0);
                    $('.mini-products-list').empty();
                    $('.mini-cart-items').hide();
                 $('.cart-quantity').text('');
                 $('.small-cart-checkout-button').hide();
            }
        }
    });
}

function initButtonChangeQuantityOnProductPage() {
    $('.icon-minus').addClass('no-active');

    $('.button-quantity-change').on('click', function(){

        var product_id = $(this).data('product_id');
        var selected_qty = parseInt($('#product_selected_quantity_' + product_id).val());
        var max_qty = parseInt($('#product_max_quantity_' + product_id).val());
        var min_qty = $('#product_min_quantity_' + product_id).val();

        var new_qty = selected_qty * 1;

        if($(this).hasClass('icon-plus')) {
            if(max_qty>selected_qty) {
                new_qty++;
            }
        }else{
            if(new_qty>1) {
                new_qty--;
            }
        }
        new_qty = (isNaN(new_qty))?1:new_qty;

        if(new_qty<min_qty){
            new_qty = min_qty;
        }

        if(new_qty==min_qty){
            $('.icon-minus').addClass('no-active');
        }else{
            $('.icon-minus').removeClass('no-active');
        }

        if(new_qty<10){
            new_qty = '0' + new_qty
        }

        $('#product_selected_quantity_' + product_id).val(new_qty);

        if(max_qty==new_qty) {
            $('.icon-plus').hide();
        }else{
            $('.icon-plus').show();
        }
    });
}

function removeItemCountInCart(variant_id, new_count, reload) {

    var data = {
        'id': variant_id,
        'quantity': new_count
    }
    jQuery.ajax({
        type: 'POST',
        url: '/cart/change.js',
        data: data,
        dataType: 'json',
        success: function(data) {
            initCart();
            loadCart();
            if(reload == 1 || document.location.pathname=='/cart'){
                document.location.reload();
            }
        },
        error: function(error) {
            alert(error.responseJSON.message + '\r\n' + error.responseJSON.description);
            initCart();
            loadCart();
        }

    });
}

function initUpdateQuantityOnCartPage(){
    $('.cart-quantity-update').on('click', function(){
        $('.cart-loading').show();
        $('.product-cart-row').hide();

        var product_id = $(this).data('product_id');
        var variant_id = $('#cart_product_variant_id_' + product_id).val();

        var current_element_quantity = parseInt($('#product_selected_quantity_' + product_id).val());

        if($(this).hasClass('icon-plus')) {
            updateItemCountInCart(variant_id, current_element_quantity, '', '', 1);
        }else{
            if($(this).hasClass('delete-item-from-cart')){
                current_element_quantity = 0;
            }
            console.log(current_element_quantity);
            removeItemCountInCart(variant_id, current_element_quantity, 1);
        }

    });
}

function updateItemCountInCart(variant_id, new_count, reload) {

        var data = {
            "id": variant_id,
            "quantity": new_count
        }

        jQuery.ajax({
            type: 'POST',
            url: '/cart/change.js',
            data: data,
            dataType: 'json',
            success: function(data) {
                initCart();
                loadCart();
                if(reload == 1 || document.location.pathname=='/cart'){
                    document.location.reload();
                }
            },
            error: function(error) {
                alert(error.responseJSON.message + '\r\n' + error.responseJSON.description);
                initCart();
                loadCart();
            }
        });

}

function showSmallCart(){
    $('.cart-action').click();
}

function quickAddItemToCart(product_id) {

    var variant_id = jQuery('#product_id_'+ product_id).attr('data-variant-id');
    var product_handle = jQuery('#product_id_'+ product_id).attr('data-product-handle');
    // console.log( jQuery('[name=color_'+ product_id +']:checked').val() );

    var data = {
        "id": variant_id,
        "quantity": 1
    }

    jQuery.ajax({
        type: 'POST',
        url: '/cart/add.js',
        data: data,
        dataType: 'json',
        success: function() {
            if(document.location.pathname=='/cart'){
                document.location.reload();
            }else{
                initCart();
                loadCart();
                showSmallCart();
                getProductData(product_handle);
            }
        },
        error: function(error) {
            alert(error.responseJSON.message + '\r\n' + error.responseJSON.description);
        }
    });
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');

    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function getProductData(product_handle) { 

    var urlLink = '/products/'+ product_handle +'.json';

    console.log(urlLink);

    jQuery.ajax({
        type: 'GET',
        url: urlLink,
        dataType: 'jsonp',
        success: function(data) {
            console.log(data);
        }
    });
}
