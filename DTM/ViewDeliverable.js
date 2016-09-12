  $(document).ready(function() {

      if($("span[id*='InitContentType']").text() != "Deliverable")
      {
          $('#MSOZoneCell_WebPartWPQ3').hide();
      }
    //  $("td :contains('DTMID')").closest('tr').hide();
      $("#s4-ribbonrow").hide();

      $("#btnSub").hide();
      if(($("span[id*='InitContentType']").text() == "Quick Check")&&($('#DTMStatus',parent.document).text()=="Sync Completed"))
      {
            $("#btnSub").show();

            $("#btnSub").click(function () {
            
            var formattedSubject = "Quick Check Submission - " + $.trim($('h3:contains("Quick Check")').closest('td').next('td').text())
									 + " [" + $('#title',parent.document).text() + " (" + $('#pqoid',parent.document).text() + ")]" ;
            var formattedBody = " Dev CoE, \n\n Please process this quick check submission based on the following information and assign a Dev CoE Reviewer: \n\n Release Name: " 
            + $('#title',parent.document).text() + "\n PQO ID: "
            + $('#pqoid',parent.document).text() + "\n Change Type: "
            + $('#ct',parent.document).text() + "\n Quick Check: "
            + $.trim($('h3:contains("Quick Check")').closest('td').next('td').text()) + "\n DTM: "
            + "http://sharepoint/sites/ProjectQualityRoom/Lists/DTMConfig/DTMResults.aspx?ID=" +
            + $('#dtmid',parent.document).text() + "\n Comments: \n ";
            window.location = "mailto:development_services_support@fanniemae.com?subject=" + encodeURIComponent(formattedSubject) + "&body=" + encodeURIComponent(formattedBody);

            
            });
            
            }


});
