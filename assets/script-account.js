$(document).ready(function(){
    $('#add_new_address').on('click',function(){
        if($('#AddAddress').is(':visible')){
            $('#AddAddress').hide();
            $('#add_new_address').removeClass('open');
        }else{
            $('#AddAddress').show();
            $('#add_new_address').addClass('open');
        }
    });

    $('.add-info-form .cancel').on('click', function(e){
        e.preventDefault();
        if( $('#AddAddress').is(':visible') ){
            $('#AddAddress').hide();
            $('#add_new_address').removeClass('open');
        }
    });
});

Shopify.CustomerAddress = {
    toggleForm: function(id) {
        var editEl = document.getElementById('EditAddress_'+id);
        editEl.style.display = editEl.style.display == 'none' ? '' : 'none';
        return false;
    },

    toggleNewForm: function() {
        var el = document.getElementById('AddAddress');
        el.style.display = el.style.display == 'none' ? '' : 'none';
        return false;
    },

    destroy: function(id, confirm_msg) {
        if (confirm(confirm_msg || "Are you sure you wish to delete this address?")) {
            Shopify.postLink('/account/addresses/'+id, {'parameters': {'_method': 'delete'}});
        }
    }
}

function saveCustomerData(type,value){
    CF.customerReady(function() {
        CF.customer.set(type, value);
        var res = CF.customer.save().then(function(errorObj) {
            $('#show_' + type).show();
            $('#edit_' + type).hide();
            $('#field_placeholder_' + type).text(value);
        });
    });
}

function editPersonalInfo(type){
    $('#show_' + type).hide();
    $('#edit_' + type).show();
    $('#field_' + type).focus();
}

function savePersonalInfo(type){
    var field_value = $('#field_' + type).val();
    saveCustomerData(type, field_value);
}
function deleteCustomerAddress(address_id){
    $('form#delete_address_from_' + address_id).submit();
}