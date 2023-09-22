$(document).ready(function() {
    $.ajax({
        url: 'http://127.0.0.1:5000/get_loc_names',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            var select = $('#location');

        // Iterate through the data and create <option> elements
        $.each(data, function(index, items) {

            $.each(items, function(index, item) {
             var option = '<option value="' + item + '">' + item + '</option>';
            select.append(option);
        });
        });

        },
        error: function (xhr, status, error) {
            // Handle errors
            console.error('Error: ' + error);
        }
    });
     $('#predict').click(function() {
    //estimate the price
    var values ={
        'location' :$( "#location" ).val(),
        'bath' : $( "#bath" ).val(),
        'bhk':$( "#bhk" ).val(),
        'total_sqft':$( "#total_sqft" ).val(),
    }

if (values.location !== '') {
    $.ajax({
        url: 'http://127.0.0.1:5000/get_price',
        method: 'POST',
        data: values, // The data  to send
        dataType: 'json',
        success: function(response) {
            // Handle the response from the server
            //remove all button elements inside the dic block
            $('#price-block button').remove();
            var block = $('#price-block')
            //make the block visible
            block.css('display', 'block');

            block.append("<button class=\"price-btn\"  id=\"price\">"+response.price+"</button>")
        },
        error: function(xhr, status, error) {
            // Handle errors
            console.error('Error: ' + error);
        }
    });
}
else {
    alert('Please Choose a location ')
}

    });

});