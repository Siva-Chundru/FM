﻿$(document).ready(function () {

    $("#ctl00_ctl32_g_81bc4700_3755_4855_a722_7b7c81bf1301_ctl00_ctl02_ctl02_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").prop('disabled', true);
    $("#ctl00_ctl32_g_81bc4700_3755_4855_a722_7b7c81bf1301_ctl00_ctl02_ctl05_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").prop('disabled', true);

    $( "input[name='ctl00$ctl32$g_81bc4700_3755_4855_a722_7b7c81bf1301$ctl00$ctl02$ctl01$ctl00$ctl00$ctl04$ctl00$RadioButtons']" ).on( "click", function() {

        if($( "input[name='ctl00$ctl32$g_81bc4700_3755_4855_a722_7b7c81bf1301$ctl00$ctl02$ctl01$ctl00$ctl00$ctl04$ctl00$RadioButtons']:checked" ).closest("td").text() == "Yes")
        {
            $("#ctl00_ctl32_g_81bc4700_3755_4855_a722_7b7c81bf1301_ctl00_ctl02_ctl02_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").prop('disabled', false);
            $('#ctl00_ctl32_g_81bc4700_3755_4855_a722_7b7c81bf1301_ctl00_ctl02_ctl03_ctl00_ctl00_ctl04_ctl00_ctl00_TextField').val("");
            $('#ctl00_ctl32_g_81bc4700_3755_4855_a722_7b7c81bf1301_ctl00_ctl02_ctl03_ctl00_ctl00_ctl04_ctl00_ctl00_TextField').prop('disabled', true);
        }
        else 
        {
            $('#ctl00_ctl32_g_81bc4700_3755_4855_a722_7b7c81bf1301_ctl00_ctl02_ctl03_ctl00_ctl00_ctl04_ctl00_ctl00_TextField').prop('disabled', false);
           $("#ctl00_ctl32_g_81bc4700_3755_4855_a722_7b7c81bf1301_ctl00_ctl02_ctl02_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").val("");
           $("#ctl00_ctl32_g_81bc4700_3755_4855_a722_7b7c81bf1301_ctl00_ctl02_ctl02_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").prop('disabled', true);
        }

    });

    $("input[name='ctl00$ctl32$g_81bc4700_3755_4855_a722_7b7c81bf1301$ctl00$ctl02$ctl04$ctl00$ctl00$ctl04$ctl00$RadioButtons']").on("click", function () {
        if ($("input[name='ctl00$ctl32$g_81bc4700_3755_4855_a722_7b7c81bf1301$ctl00$ctl02$ctl04$ctl00$ctl00$ctl04$ctl00$RadioButtons']:checked").closest("td").text() == "Yes")
        {
            $('#ctl00_ctl32_g_81bc4700_3755_4855_a722_7b7c81bf1301_ctl00_ctl02_ctl06_ctl00_ctl00_ctl04_ctl00_ctl00_TextField').val("");
            $('#ctl00_ctl32_g_81bc4700_3755_4855_a722_7b7c81bf1301_ctl00_ctl02_ctl06_ctl00_ctl00_ctl04_ctl00_ctl00_TextField').prop('disabled', true);
            $("#ctl00_ctl32_g_81bc4700_3755_4855_a722_7b7c81bf1301_ctl00_ctl02_ctl05_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").prop('disabled', false);
        }
        else 
        {
            $('#ctl00_ctl32_g_81bc4700_3755_4855_a722_7b7c81bf1301_ctl00_ctl02_ctl06_ctl00_ctl00_ctl04_ctl00_ctl00_TextField').prop('disabled', false);
            $("#ctl00_ctl32_g_81bc4700_3755_4855_a722_7b7c81bf1301_ctl00_ctl02_ctl05_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").val("");
            $("#ctl00_ctl32_g_81bc4700_3755_4855_a722_7b7c81bf1301_ctl00_ctl02_ctl05_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").prop('disabled', true);
        }

    });



});
function PreSaveAction() {
    if ($("input[name='ctl00$ctl32$g_81bc4700_3755_4855_a722_7b7c81bf1301$ctl00$ctl02$ctl01$ctl00$ctl00$ctl04$ctl00$RadioButtons']:checked").closest("td").text() == "Yes") {
        if ($("#ctl00_ctl32_g_81bc4700_3755_4855_a722_7b7c81bf1301_ctl00_ctl02_ctl02_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").val() == "")
        {
            alert("Please Provide Estimated Cost Savings (in thousands of dollars)");
            return false;
        }
    }
    if ($("input[name='ctl00$ctl32$g_81bc4700_3755_4855_a722_7b7c81bf1301$ctl00$ctl02$ctl01$ctl00$ctl00$ctl04$ctl00$RadioButtons']:checked").closest("td").text() == "No") {
        if ($("#ctl00_ctl32_g_81bc4700_3755_4855_a722_7b7c81bf1301_ctl00_ctl02_ctl03_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").val() == "") {
            alert("Please provide justification for Why ?");
            return false;
        }
    }        
    
    if ($("input[name='ctl00$ctl32$g_81bc4700_3755_4855_a722_7b7c81bf1301$ctl00$ctl02$ctl04$ctl00$ctl00$ctl04$ctl00$RadioButtons']:checked").closest("td").text() == "Yes") {
        if ($("#ctl00_ctl32_g_81bc4700_3755_4855_a722_7b7c81bf1301_ctl00_ctl02_ctl05_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").val() == "") {
            alert("Please Provide Estimated Market Savings (in days)");
            return false;
        }
    }
    if ($("input[name='ctl00$ctl32$g_81bc4700_3755_4855_a722_7b7c81bf1301$ctl00$ctl02$ctl04$ctl00$ctl00$ctl04$ctl00$RadioButtons']:checked").closest("td").text() == "No") {
        if ($("#ctl00_ctl32_g_81bc4700_3755_4855_a722_7b7c81bf1301_ctl00_ctl02_ctl06_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").val() == "") {
            alert("Please provide justification for Why ?");
            return false;
        }
    }
    
    return true;


    }
