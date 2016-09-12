<script src= "http://sharepoint/sites/ProjectQualityRoom/SiteAssets/jquery-1.11.3.min.js"  type="text/javascript"></script>
<script src= "http://sharepoint/sites/ProjectQualityRoom/SiteAssets/jquery.bpopup.min.js"  type="text/javascript"></script>

<script type="text/javascript">
$(document).ready(function() {
alert("Hi");
$('element_to_pop_up').bPopup({
            modalClose: false,
            opacity: 0.6,
            positionStyle: 'fixed' //'fixed' or 'absolute'
        });

});
</script> 




<html>
<head>
<style>
#element_to_pop_up { background-color:#fff;
    border-radius:15px;
    color:#000;
    display:none; 
    padding:20px;
    min-width:400px;
    min-height: 180px;}
    .b-close{
    cursor:pointer;
    position:absolute;
    right:10px;
    top:5px;
}
</style>
<script src= "http://sharepoint/sites/ProjectQualityRoom/SiteAssets/jquery-1.11.3.min.js"  type="text/javascript"></script>
<script src= "http://sharepoint/sites/ProjectQualityRoom/SiteAssets/jquery.bpopup.min.js"  type="text/javascript"></script>

<script type="text/javascript">
$(document).ready(function() {
$('element_to_pop_up').bPopup({
            modalClose: false,
            opacity: 0.6,
            positionStyle: 'fixed' //'fixed' or 'absolute'
        });

});
</script> 
</head>
<body><div id="element_to_pop_up">
    <a class="b-close">x<a/>
    Content of popup
</div></body></html>
