  $(document).ready(function() {
      $("#s4-ribbonrow").hide();

$("input[title*=Description]").hide();
$('.ms-formdescription').hide();

$("input[title*=Location]").change(function () {
$("input[title*=Description]").val($("input[title*=Location]").val());
$("input[title*=Description]").hide();
$('.ms-formdescription').hide();
});
  
       if($("select[id*=ContentTypeChoice] option:selected").text() == "Quick Check")
     {
 $("input[id*=Review_x0020_Date]").change(function () {
            var d1 = new Date($("input[id*=Review_x0020_Date]").val());
            var d2 = new Date($('#RI', parent.document).text());
            var d4 = new Date($('#DD', parent.document).text());
            var d3 = new Date();
            if (!((d1 >= d2) && (d1 <= d4)))
            {
                alert("Please enter a date between Release Initiation Date: " + $('#RI', parent.document).text() + " and Deployment Date: " + $('#DD', parent.document).text());
             $("input[id*=Review_x0020_Date]").val("");
            }
        });

     }


      $("select[id*='DropDown']").attr("disabled", "disabled");
      $("select[id*='ContentType']").attr("disabled", "disabled");
      $("input[id*='CheckPoint']").attr("disabled", "disabled");
      $("input[id*='Deliverable']").attr("disabled", "disabled");
      $("input[id*='AN']").attr("disabled", "disabled");

      $("#MSOZoneCell_WebPartWPQ3").hide();
     
});

function PreSaveAction()
{
       if($("select[id*=ContentTypeChoice] option:selected").text() == "Quick Check")
     {
            var d1 = new Date($("input[id*=Review_x0020_Date]").val());
            var d2 = new Date($('#RI', parent.document).text());
            var d4 = new Date($('#DD', parent.document).text());
            var d3 = new Date();
            if (!((d1 >= d2) && (d1 <= d4)))
            {
                alert("Please enter a date between Release Initiation Date: " + $('#RI', parent.document).text() + " and Deployment Date: " + $('#DD', parent.document).text());
             $("input[id*=Review_x0020_Date]").val("");
             return false;
            }
            return true;

     }
      if($("select[id*=ContentTypeChoice] option:selected").text() != "Quick Check")
     {
     return true;
     }

}
