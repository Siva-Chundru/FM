$(document).ready(function()
{
var url = window.location.href ;
var newurl = url.replace("EditForm","ReviewForm");
newurl = newurl.replace("DispForm","ReviewForm");
window.location = newurl ;
});