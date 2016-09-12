$(document).ready(function () {
$("textarea[title*='Please briefly describe the service provided']").prop('disabled', true);
$("input[title*='Please provide a rough estimate of time (in days or hours) saved']").prop('disabled', true);
$("input[title*='Please provide a rough estimate (in dollars) saved']").prop('disabled', true);

$( "input[name='ctl00$ctl32$g_5379beee_41c1_401a_96c9_5d2f056766f4$ctl00$ctl02$ctl01$ctl00$ctl00$ctl04$ctl00$RadioButtons']" ).on( "click", function() {
	if($( "input[name='ctl00$ctl32$g_5379beee_41c1_401a_96c9_5d2f056766f4$ctl00$ctl02$ctl01$ctl00$ctl00$ctl04$ctl00$RadioButtons']:checked" ).closest("td").text() == "Yes")
	{
	$("textarea[title*='Please briefly describe the service provided']").prop('disabled', false);
	$("textarea[title*='Please briefly describe the service provided']").val("");
	}
	else
	{
		$("textarea[title*='Please briefly describe the service provided']").prop('disabled', true);
	$("textarea[title*='Please briefly describe the service provided']").val("");

	}
});

$( "input[name='ctl00$ctl32$g_5379beee_41c1_401a_96c9_5d2f056766f4$ctl00$ctl02$ctl03$ctl00$ctl00$ctl04$ctl00$RadioButtons']" ).on( "click", function() {
	if($( "input[name='ctl00$ctl32$g_5379beee_41c1_401a_96c9_5d2f056766f4$ctl00$ctl02$ctl03$ctl00$ctl00$ctl04$ctl00$RadioButtons']:checked" ).closest("td").text() == "Yes")
	{
	$("input[title*='Please provide a rough estimate of time (in days or hours) saved']").prop('disabled', false);
	$("input[title*='Please provide a rough estimate of time (in days or hours) saved']").val("");
	}
	else
	{
	$("input[title*='Please provide a rough estimate of time (in days or hours) saved']").prop('disabled', true);
	$("input[title*='Please provide a rough estimate of time (in days or hours) saved']").val("");

	}
});

$( "input[name='ctl00$ctl32$g_5379beee_41c1_401a_96c9_5d2f056766f4$ctl00$ctl02$ctl05$ctl00$ctl00$ctl04$ctl00$RadioButtons']" ).on( "click", function() {
	if($( "input[name='ctl00$ctl32$g_5379beee_41c1_401a_96c9_5d2f056766f4$ctl00$ctl02$ctl05$ctl00$ctl00$ctl04$ctl00$RadioButtons']:checked" ).closest("td").text() == "Yes")
	{
	$("input[title*='Please provide a rough estimate (in dollars) saved']").prop('disabled', false);
	$("input[title*='Please provide a rough estimate (in dollars) saved']").val("");
	}
	else
	{
	$("input[title*='Please provide a rough estimate (in dollars) saved']").prop('disabled', true);
	$("input[title*='Please provide a rough estimate (in dollars) saved']").val("");

	}
});
       
});