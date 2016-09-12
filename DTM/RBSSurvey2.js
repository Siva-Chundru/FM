$(document).ready(function () {

    $("#ctl00_ctl32_g_7470edfc_770e_4866_ad08_ca5ebe380d46_ctl00_ctl02_ctl01_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").prop('disabled', true);
    $("#ctl00_ctl32_g_7470edfc_770e_4866_ad08_ca5ebe380d46_ctl00_ctl02_ctl04_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").prop('disabled', true);

    $( "input[name='ctl00$ctl32$g_7470edfc_770e_4866_ad08_ca5ebe380d46$ctl00$ctl02$ctl00$ctl00$ctl00$ctl04$ctl00$RadioButtons']" ).on( "click", function() {
        if($( "input[name='ctl00$ctl32$g_7470edfc_770e_4866_ad08_ca5ebe380d46$ctl00$ctl02$ctl00$ctl00$ctl00$ctl04$ctl00$RadioButtons']:checked" ).closest("td").text() == "No")
        {
            $("#ctl00_ctl32_g_7470edfc_770e_4866_ad08_ca5ebe380d46_ctl00_ctl02_ctl02_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").prop('disabled', false);
            $('#ctl00_ctl32_g_7470edfc_770e_4866_ad08_ca5ebe380d46_ctl00_ctl02_ctl01_ctl00_ctl00_ctl04_ctl00_ctl00_TextField').val("");
            $('#ctl00_ctl32_g_7470edfc_770e_4866_ad08_ca5ebe380d46_ctl00_ctl02_ctl01_ctl00_ctl00_ctl04_ctl00_ctl00_TextField').prop('disabled', true);
        }
        else 
        {
           $('#ctl00_ctl32_g_7470edfc_770e_4866_ad08_ca5ebe380d46_ctl00_ctl02_ctl01_ctl00_ctl00_ctl04_ctl00_ctl00_TextField').prop('disabled', false);
           $("#ctl00_ctl32_g_7470edfc_770e_4866_ad08_ca5ebe380d46_ctl00_ctl02_ctl02_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").val("");
           $("#ctl00_ctl32_g_7470edfc_770e_4866_ad08_ca5ebe380d46_ctl00_ctl02_ctl02_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").prop('disabled', true);
        }

    });

    $("input[name='ctl00$ctl32$g_7470edfc_770e_4866_ad08_ca5ebe380d46$ctl00$ctl02$ctl03$ctl00$ctl00$ctl04$ctl00$RadioButtons']").on("click", function () {
        if ($("input[name='ctl00$ctl32$g_7470edfc_770e_4866_ad08_ca5ebe380d46$ctl00$ctl02$ctl03$ctl00$ctl00$ctl04$ctl00$RadioButtons']:checked").closest("td").text() == "Yes")
        {
            $('#ctl00_ctl32_g_7470edfc_770e_4866_ad08_ca5ebe380d46_ctl00_ctl02_ctl05_ctl00_ctl00_ctl04_ctl00_ctl00_TextField').val("");
            $('#ctl00_ctl32_g_7470edfc_770e_4866_ad08_ca5ebe380d46_ctl00_ctl02_ctl05_ctl00_ctl00_ctl04_ctl00_ctl00_TextField').prop('disabled', true);
            $("#ctl00_ctl32_g_7470edfc_770e_4866_ad08_ca5ebe380d46_ctl00_ctl02_ctl04_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").prop('disabled', false);
        }
        else 
        {
            $('#ctl00_ctl32_g_7470edfc_770e_4866_ad08_ca5ebe380d46_ctl00_ctl02_ctl05_ctl00_ctl00_ctl04_ctl00_ctl00_TextField').prop('disabled', false);
            $("#ctl00_ctl32_g_7470edfc_770e_4866_ad08_ca5ebe380d46_ctl00_ctl02_ctl04_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").val("");
            $("#ctl00_ctl32_g_7470edfc_770e_4866_ad08_ca5ebe380d46_ctl00_ctl02_ctl04_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").prop('disabled', true);
        }

    });



});
function PreSaveAction() {
    if ($("input[name='ctl00$ctl32$g_7470edfc_770e_4866_ad08_ca5ebe380d46$ctl00$ctl02$ctl00$ctl00$ctl00$ctl04$ctl00$RadioButtons']:checked").closest("td").text() == "Yes") {
        if ($("#ctl00_ctl32_g_7470edfc_770e_4866_ad08_ca5ebe380d46_ctl00_ctl02_ctl01_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").val() == "")
        {
            alert("Please Provide Estimated Cost Savings (in thousands of dollars)");
            return false;
        }
    }
    if ($("input[name='ctl00$ctl32$g_7470edfc_770e_4866_ad08_ca5ebe380d46$ctl00$ctl02$ctl00$ctl00$ctl00$ctl04$ctl00$RadioButtons']:checked").closest("td").text() == "No") {
        if ($("#ctl00_ctl32_g_7470edfc_770e_4866_ad08_ca5ebe380d46_ctl00_ctl02_ctl02_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").val() == "") {
            alert("Please provide justification for Why ?");
            return false;
        }
    }        
    
    if ($("input[name='ctl00$ctl32$g_7470edfc_770e_4866_ad08_ca5ebe380d46$ctl00$ctl02$ctl03$ctl00$ctl00$ctl04$ctl00$RadioButtons']:checked").closest("td").text() == "Yes") {
        if ($("#ctl00_ctl32_g_7470edfc_770e_4866_ad08_ca5ebe380d46_ctl00_ctl02_ctl04_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").val() == "") {
            alert("Please Provide Estimated Market Savings (in days)");
            return false;
        }
    }
    if ($("input[name='ctl00$ctl32$g_7470edfc_770e_4866_ad08_ca5ebe380d46$ctl00$ctl02$ctl03$ctl00$ctl00$ctl04$ctl00$RadioButtons']:checked").closest("td").text() == "No") {
        if ($("#ctl00_ctl32_g_7470edfc_770e_4866_ad08_ca5ebe380d46_ctl00_ctl02_ctl05_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").val() == "") {
            alert("Please provide justification for Why ?");
            return false;
        }
    }
    
    return true;


    }
