﻿$(document).ready(function()
{
$('#sideNavBox').addClass("ms-hidden");
$('#contentBox').css("margin-left","20px");
$("#GTM2 td:contains('12/30/1899')").text('');
$("input[id*='SaveItem']").css("background-color", "#0072c6");
$("input[id*='SaveItem']").css("color", "#fff");
$("input[id*='SaveItem']").val("Review Complete");
$("input[id*='GoBack']").css("background-color", "#0072c6");
$("input[id*='GoBack']").css("color", "#fff");
$('#contentRow').css('padding-top','0px');

$("#GTM2").find("td:nth-child(2)").each(function () {
if($(this).text() == "")
{
$(this).text("N/A");
}

});
$("#GTM1").find("td:nth-child(2)").each(function () {
if($(this).text() == "")
{
$(this).text("N/A");
}

});
$('.ms-cui-tabContainer').hide();
 
//    $("input[name='RComplete']").hide();
//    $("input[name='Next']").hide();
    
 //   alert($("input[name='ctl00$ctl32$g_b6de16f3_2db0_40a9_855a_794164c2ce96$ff451$ctl00$RadioButtons']:checked").val());
    /*
  if($("input[name='ctl00$ctl32$g_b6de16f3_2db0_40a9_855a_794164c2ce96$ff451$ctl00$RadioButtons']:checked").val() == "ctl01")
    {
   // alert($("input[name='ctl00$ctl32$g_b6de16f3_2db0_40a9_855a_794164c2ce96$ff451$ctl00$RadioButtons']:checked").val());
    $("input[name='RComplete']").hide();
    $("input[name='Next']").show();
    }
     if($("input[name='ctl00$ctl32$g_b6de16f3_2db0_40a9_855a_794164c2ce96$ff451$ctl00$RadioButtons']:checked").val() == "ctl00")
    {
    $("input[name='RComplete']").show();
    $("input[name='Next']").hide();
    }

$("input:radio[name='ctl00$ctl32$g_b6de16f3_2db0_40a9_855a_794164c2ce96$ff451$ctl00$RadioButtons']").click(function() {
  // alert($(this).val());
   if($(this).val() == "ctl00")
    {
//   alert($(this).val());
    $("input[name='RComplete']").show();
    $("input[name='Next']").hide();
    }
 if($(this).val() == "ctl01")
    {
  // alert($(this).val());
    $("input[name='RComplete']").hide();
    $("input[name='Next']").show();
    }
});
*/


    $("#ctype").hide();
    $("#comments").hide();
    $('#WebPartWPQ3').hide();

     if($("input[name='ctl00$ctl32$g_b6de16f3_2db0_40a9_855a_794164c2ce96$ff451$ctl00$RadioButtons']:checked").val() == "ctl00")
    {
    $("#ctype").hide();
    $("#comments").hide();
    $('#WebPartWPQ3').hide();
    }
     if($("input[name='ctl00$ctl32$g_b6de16f3_2db0_40a9_855a_794164c2ce96$ff451$ctl00$RadioButtons']:checked").val() == "ctl01")
    {
    $("#ctype").show();
    $("#comments").show();
    $('#WebPartWPQ3').show();

    }


$("input:radio[name='ctl00$ctl32$g_b6de16f3_2db0_40a9_855a_794164c2ce96$ff451$ctl00$RadioButtons']").click(function() {
   if($(this).val() == "ctl00")
    {
    $("#ctype").hide();
    $("#comments").hide();
    $('#WebPartWPQ3').hide();
    }
 if($(this).val() == "ctl01")
    {
    $("#ctype").show();
    $("#comments").show();
    $('#WebPartWPQ3').show();

    }
});

if(($('#status').text() == "Completed")||($('#status').text() == "Submitted"))
{
$("input[id*='SaveItem']").hide();
//$("input[name='RComplete']").hide();
//$("input[name='Next']").hide();
$("input:radio[name='ctl00$ctl32$g_b6de16f3_2db0_40a9_855a_794164c2ce96$ff451$ctl00$RadioButtons']").attr('disabled', 'disabled');
}
//$('#status').closest('tr').hide();

//$('.ms-cui-topBar2').hide();
//  SelectRibbonTab("Ribbon.Read", true);
//$('#s4-titlerow').css({display: "block"});
//$('#s4-ribbonrow').css("height","35px");
//$('#Ribbon.ListForm.Edit-title').hide();
//$('#Ribbon.WebPartPage-title').hide();

//$("a[title='Browse']").trigger("click");

//  $("table#GTM1 tr:even").css("background-color", "#F4F4F8");
//  $("table#GTM2 tr:even").css("background-color", "#F4F4F8");
//  $("table#GTM1 tr td:first-child").css("background-color", "#E3E3E3");
//  $("table#GTM2 tr td:first-child").css("background-color", "#E3E3E3");
});

function PreSaveAction() {

if($("input[name='ctl00$ctl32$g_b6de16f3_2db0_40a9_855a_794164c2ce96$ff451$ctl00$RadioButtons']:checked").val() != "ctl01")
{
return true ;
}

if($("input[id*='ff611']").is(':checked'))
{
return true ;
}
if(!$("input[id*='ff611']").is(':checked'))
{
alert("Please select the Change Type");
return false ;
}
}

function ResetRibbon() {
try {
var ribbon = SP.Ribbon.PageManager.get_instance().get_ribbon();
SelectRibbonTab("Ribbon.Read", true);
ribbon.removeChild("Ribbon.ListForm.Display");
ribbon.removeChild("Ribbon.ListForm.Edit");
} catch (e)
{ }
}
 
SP.SOD.executeOrDelayUntilScriptLoaded(function () {
try {
var pm = SP.Ribbon.PageManager.get_instance();
 
pm.add_ribbonInited(function () {
ResetRibbon();
});
 
var ribbon = null;
try {
ribbon = pm.get_ribbon();
}
catch (e) { }
 
if (!ribbon) {
if (typeof (_ribbonStartInit) == "function")
_ribbonStartInit(_ribbon.initialTabId, false, null);
}
else {
ResetRibbon();
}
} catch (e)
{ }
}, "sp.ribbon.js");