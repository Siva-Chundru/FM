    var SiteURL = "/sites/ProjectQualityRoom/";
    var ListName = "DTM Library";
    var deliverables = "DTM Results";
    var context = new SP.ClientContext(SiteURL); // the current context is taken by default here
    var dtmid = getParameterByName('ID');
    var source = getParameterByName('Source');
    var usertype ;
    var currentuser ;
    var createdby;
    var pmbusiness;
    var pmtechnology;


    $(document).ready(function () {
        $('a').filter("[href='###']").each(function () {
            $(this).replaceWith($(this).html());
        });
        $('.ms-cui-ribbon').hide();

        //remove boder spacing on page for webpart
        $('.ms-webpartPage-root').css("border-spacing", "0px");
        //set page title
        $('#DeltaPlaceHolderPageTitleInTitleArea').text("DTM Results: " + $('#title').text());
        //$(".ms-itmhover").css("background-color", "#E3E3E3");
$(".ms-listviewtable tbody tr td:nth-child(2):contains('Quick Check')").closest('tr').css("background-color", "#C39BD3");       
// $(".ms-vb2:contains('Quick Check')").closest('tr').css("background-color", "#C39BD3");
        $(".ms-listviewtable tbody tr td:nth-child(2):contains('Quick Check')").closest('tr').find('td').each(function () {
            $(this).removeClass('ms-vb2');
        });
$(".ms-listviewtable tbody tr td:nth-child(2):contains('Approvals - Notifications')").closest('tr').css("background-color", "#E3E3E3");       
//        $(".ms-vb2:contains('Approvals - Notifications')").closest('tr').css("background-color", "#E3E3E3");
        $(".ms-listviewtable tbody tr td:nth-child(2):contains('Approvals - Notifications')").closest('tr').find('td').each(function () {
            $(this).removeClass('ms-vb2');
        });
        $("#GB").find('td').each(function () {
            if($(this).text() == "No")
            { $(this).closest('tr').hide(); }
		 if($(this).text() == "")
            { $(this).closest('tr').hide(); }
        });
         $("#tabs-2").find('td').each(function () {
            if($(this).text() == "")
            { $(this).closest('tr').hide(); }
        });

        if (($('#arb').text() == "No") && ($('#edg').text() == "No") && ($('#ba').text() == "No") && ($('#edgsg').text() == "No"))
        {
            $('#dwg').hide();
        }

        if ($('#ct').text() != "Emergency EBF")
        {
            $('#ebfq1').hide();
            $('#ebfq2').hide();
        }
        if ($('#rm').text() != "Agile") {
            $('#Ag').hide();
        }

        $(".ms-itmHoverEnabled :contains('CheckPoint')").closest('tr').css('color', '#FFFFFF');

        ExecuteOrDelayUntilScriptLoaded(findusertype, 'SP.js');

        $("#btnEdit").click(function () {
            window.location.href = "http://sharepoint/sites/ProjectQualityRoom/Lists/DTMConfig/DTMEdit.aspx?ID=" + dtmid + "&Source=" + source;


        });

        $("#btnCopy").click(function () {
            if (confirm("This will create a copy of the DTM you selected!") == true) {
                window.location.href = "http://sharepoint/sites/ProjectQualityRoom/Lists/DTMConfig/NewRelease.aspx?ID=" + dtmid + "&Source=" + source;
            } else {
            }
        });


        //Submit button click
        $("#btnSub").click(function () {
            if (confirm("Are you ready to submit this DTM to Dev CoE ?") == true) {
                SPSODAction(["sp.js", "sp.ui.dialog.js"], function () {
                    AddListItem();
                });
            } else {
                
            }

            //				ExecuteOrDelayUntilScriptLoaded(AddListItem(), "sp.js");
        });

    });
		
    function SPSODAction(sodScripts, onLoadAction)
    {
        if (SP.SOD.loadMultiple) {
            for (var x = 0; x < sodScripts.length; x++) {
                //register any unregistered scripts
                if (!_v_dictSod[sodScripts[x]]) {
                    SP.SOD.registerSod(sodScripts[x], '/_layouts/15/' + sodScripts[x]);
                }
            }
            SP.SOD.loadMultiple(sodScripts, onLoadAction);
        }
        else
            ExecuteOrDelayUntilScriptLoaded(onLoadAction, sodScripts[0]);
    }
		
    function disablecontrols() {
        var dtmstatus = $('#DTMStatus').text();
        var pqosubmit = $('#SubmitPQO').text();

//        $("#btnCopy").hide();
        $("#btnSync").hide();
        $("#btn1Sync").hide();
        $("#btn2Sync").hide();

        if(usertype == "pm")
        {
        $("#sampling").hide();
        }
		if (dtmstatus == "Sync Completed")
        {
            $("#sampling").show();
             $("#nosample").hide();
        }

        if (usertype == "pqo")
        {
            $("#nosample").hide();
            $('.ms-cui-ribbon').show();

        }
        if (!(dtmstatus == "Created" && ((createdby == currentuser) || (pmbusiness == currentuser) || (pmtechnology == currentuser) || (usertype == "pqo")))) {
            $("#btnSub").hide();
            $("#btnEdit").hide();
            $("#btnSync").hide();
            $("#btn1Sync").hide();
            $("#btn2Sync").hide();
            $('.ms-cui-group').hide();
            $('.ms-cui-ribbon').hide();
//            $("#btnCopy").show();


        }
        if (usertype == "pqo" && ((dtmstatus == "Submitted to PQO") || (dtmstatus == "PQO Review Completed"))) {
            $('.ms-cui-group').show();
            $("#btnSync").hide();
            $("#btn1Sync").show();
            $("#btn2Sync").show();
            $("#btnEdit").show();
            $("#sampling").show();


        }
        if (dtmstatus == "Sync Completed") {
            $("#btnSync").hide();
            $("#btn1Sync").hide();
            $("#bt2Sync").hide();



        }
        SelectRibbonTab("Ribbon.Read", true);




    }
		
    function findusertype() {
        IsCurrentUserMemberOfGroup("GS2 PQO Ops", function (isCurrentUserInGroup) {
            if (isCurrentUserInGroup == "pqo") {
                usertype = "pqo";
                //   alert("Logged in User is a PQO Reviewer");    
            }

            else {
                usertype = "pm";
                // alert("Logged in User is a PM");
            }

            disablecontrols();
        });

    }
    
    function IsCurrentUserMemberOfGroup(groupName, OnComplete) {

        var currentWeb = context.get_web();

        var currentUser = context.get_web().get_currentUser();
        context.load(currentUser);

        var allGroups = currentWeb.get_siteGroups();
        context.load(allGroups);

        var group = allGroups.getByName(groupName);
        context.load(group);

        var groupUsers = group.get_users();
        context.load(groupUsers);

        var lstObject = context.get_web().get_lists().getByTitle(ListName);
        this.oListItem = lstObject.getItemById(dtmid);
        context.load(this.oListItem);

        context.executeQueryAsync(
                function (sender, args) {
                    currentuser = currentUser.get_title();
                    var fieldUserValueCreatedBy = oListItem.get_item("Author");
                    createdby = fieldUserValueCreatedBy.get_lookupValue();
                    var fieldUserPMB = oListItem.get_item('PMB');
                    pmbusiness = fieldUserPMB.get_lookupValue();
                    var fieldUserPMT = oListItem.get_item("PMT");
                    pmtechnology = fieldUserPMT.get_lookupValue();
                    var userInGroup = IsUserInGroup(currentUser, group);
                    OnComplete(userInGroup);
                },
                function OnFailure(sender, args) {
                    OnComplete(false);
                }
        );

        function IsUserInGroup(user, group) {
            var groupUsers = group.get_users();
            var usertype = "pm";
            var groupUserEnumerator = groupUsers.getEnumerator();
            while (groupUserEnumerator.moveNext()) {
                var groupUser = groupUserEnumerator.get_current();
                if (groupUser.get_id() == user.get_id()) {
                    usertype = "pqo";
                    break;
                }
            }
            return usertype;
        }
    }
    
    function AddListItem() {
        waitDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose("Submitting DTM to Dev CoE", "Please wait...", 100, 300);

        var oList1 = context.get_web().get_lists().getByTitle(deliverables);

        var camlQuery1 = new SP.CamlQuery();
        camlQuery1.set_viewXml('<View><Query><Where><And><Eq><FieldRef Name="DTMID" LookupId="TRUE" /><Value Type="Lookup">'
            + dtmid +
            '</Value></Eq><Eq><FieldRef Name="ContentTypeId"/><Value Type="ContentTypeId">'
            + '0x0100FEE567717D2DCD4490AE03E5A962E5CF006F21F04FB5B7094181BAD7362C8E72F9' +
            '</Value></Eq></And></Where></Query></View>');

        this.collListItem1 = oList1.getItems(camlQuery1);

        var lstObject = context.get_web().get_lists().getByTitle(ListName);

        this.oListItem = lstObject.getItemById(dtmid);

        context.load(collListItem1);
        context.load(oListItem);



        // Execute Asyncronous query
        context.executeQueryAsync(onQuerySucceeded, onQueryFail);

        function onQuerySucceeded() {

            var listItemEnumeratorCP = collListItem1.getEnumerator();

            var sb;
            while (listItemEnumeratorCP.moveNext()) {

                var objListItem1 = listItemEnumeratorCP.get_current();
                if (objListItem1.get_item('Review_x0020_Date') != null) {
                    sb = "yes";
                }
                else {
                    waitDialog.close(0);
                    alert("Please enter all Quick Check Review Dates. Scroll down to each of the highlighted Quick Check row(s) \n 1. Click in the Edit column immediately to the left of Quick Check \n 2. A window displays with a blank field where the projected review date is to be entered.\n 3. Enter the review date and Click Save. \n 4. Follow these steps to enter any additional Quick Check review dates.");

                    return;
                }
            }


            if (sb == "yes") {
                var method = $("select[id*=ff39] option:selected").text();
                var type = $("select[id*=formfield2] option:selected").text();
                var rider = $("select[id*=formfield3] option:selected").text();
                var pqoid = $("input[id*=formfield9]").val();
                var pqosubmit = "Yes";

                
                // Update Submit to pqo and status column
                oListItem.set_item('Submit_x0020_to_x0020_PQO', "Yes");
                if (pqosubmit == "Yes") {
                    oListItem.set_item('DTM_x0020_Status', "Submitted to PQO");
                    // alert("Submitted to PQO");
                }
                if (usertype == "pqo" && pqosubmit == "No") {
                    oListItem.set_item('DTM_x0020_Status', "Created");
                    //alert("Created");
                }
                if (usertype == "pm" && pqosubmit == "No") {
                    oListItem.set_item('DTM_x0020_Status', $("select[id*=DTMStatus] option:selected").text());
                    //alert($("select[id*=DTMStatus] option:selected").text());
                }


                //Update item 
                oListItem.update();
                context.load(oListItem);
                context.executeQueryAsync(onQuerySucceededFinal, onQueryFail);

            }

            else {

                waitDialog.close(0);
                alert("Please enter all Quick Check Review Dates. Scroll down to each of the highlighted Quick Check row(s) \n 1. Click in the Edit column immediately to the left of Quick Check \n 2. A window displays with a blank field where the projected review date is to be entered.\n 3. Enter the review date and Click Save. \n 4. Follow these steps to enter any additional Quick Check review dates.");
               // window.location.href = "http://sharepoint/sites/ProjectQualityRoom/Lists/DTMConfig/DTMResults.aspx?ID=" + dtmid + "&Source=" + source;
            }
        }

        function onQuerySucceededFinal() {
            waitDialog.close(0);
            window.location.href = "http://sharepoint/sites/ProjectQualityRoom/Lists/DTMConfig/DTMResults.aspx?ID=" + dtmid + "&Source=" + source;
        }

        function onQueryFail(sender, args) {
            waitDialog.close(0);
            alert('Failed to add new item. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace());
        }


    }
    
 
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }



