	var SiteURL = "/sites/ProjectQualityRoom/" ;
	var ListName = "DTM Library";
    var Results = "DTM Results";
    var CMDBList = "CMDB";
    var context = new SP.ClientContext(SiteURL); // the current context is taken by default here
    var dtmid = getParameterByName('ID');
    var source = getParameterByName('Source');
    var usertype ;
    var currentuser ;
    var createdby ;
    var	waitDialog ;

    $(document).ready(function () {
    
                    Cascade({
            parentFormField: "SI Name", //Display name on form of field from parent list
            childList: "Program Names", //List name of child list
            childLookupField: "Title", //Internal field name in Child List used in lookup
            childFormField: "Program Name", //Display name on form of the child field
            parentFieldInChildList: "Strategic_x0020_Initiative", //Internal field name in Child List of the parent field
            parentList: "SI Names",
        });

    
        var selectList = $("select[id*='formfield29_ctl00_Lookup'] option");

        selectList.sort(function (a, b) {
            a = a.value;
            b = b.value;

            return a - b;
        });

        $("input[id*=ff61]").val('');
        $("input[id*=ff62]").val('');

        $("select[id*='formfield29_ctl00_Lookup']").html(selectList);

        //remove boder spacing on page for webpart
        $('.ms-webpartPage-root').css("border-spacing", "0px");
        $('#DeltaPlaceHolderPageTitleInTitleArea').text("DTM Form: " + $("input[id*='ff1']").val());

        $("select[id*=formfield12]").attr("disabled", "disabled");
        $("select[id*=formfield13]").attr("disabled", "disabled");
        $("select[id*=formfield12]").closest('tr').hide();
        $("select[id*=formfield13]").closest('tr').hide();

        $("select[id*=formfield11]").change(function () {
            if ($("select[id*=formfield11] option:selected").text() == "Yes") {
                $("select[id*=formfield12]").closest('tr').show();
                $("select[id*=formfield13]").closest('tr').show();
                $("select[id*=formfield12]").attr("disabled", false);
                $("select[id*=formfield13]").attr("disabled", false);
            }
            else {
                $("select[id*=formfield12]").closest('tr').hide();
                $("select[id*=formfield13]").closest('tr').hide();
                $("select[id*=formfield12]").val('No');
                $("select[id*=formfield13]").val('No');
                $("select[id*=formfield12]").attr("disabled", "disabled");
                $("select[id*=formfield13]").attr("disabled", "disabled");
            }
        });

        $('.ms-cui-group').hide();
        if ($("select[id*=ff39] option:selected").text() == "Agile") {
            $('#Ag').show();
        }
        else {
            $('#Ag').hide();
        }
        if ($("select[id*=formfield10] option:selected").text() == "Yes") {
            alert("When “Yes” is selected for Pre-Implementation, a Pre-Implementation Quick Check and 2 additional deliverables will be added to the DTM Deliverables, Quick Checks, Approvals & Notification section.");
        }

        $("select[id*=formfield10]").change(function () {
            if ($("select[id*=formfield10] option:selected").text() == "Yes") {
                alert("When “Yes” is selected for Pre-Implementation, a Pre-Implementation Quick Check and 2 additional deliverables will be added to the DTM Deliverables, Quick Checks, Approvals & Notification section.");
            }

        });
        $("select[id*=ff39]").change(function () {
            
            if ($("select[id*=ff39] option:selected").text() == "Agile") {
                $("input[id*=fieldAg]").val('');
                $("input[id*=fieldAscore]").val('');
                $('#Ag').show();
            }
            else {
                $("input[id*=fieldAg]").val('NA');
                $("input[id*=fieldAscore]").val('0');
                $('#Ag').hide();
            }
        });

        $("input[id*=fieldAscore]").change(function () {
            var numbers = /^[0-9]+$/;
            if ($("input[id*=fieldAscore]").val().match(numbers)) {
                if ($("input[id*=fieldAscore]").val() < '35') {
                    alert("Your Score didn't meet Fannie Mae Agile requirements at this point in time, please contact Dev CoE Support for next steps and further coaching and training opportunities.");
                    $("#btnSub1").hide();
                    $("#btnSub").hide();
                }
                else {
                    $("#btnSub1").show();
                    $("#btnSub").show();
                }
            }
            else {
                alert("Please enter your Agile score in Number format only.");
                $("#btnSub1").hide();
                $("#btnSub").hide();
            }

        });


        
        if ($("select[id*=formfield2_] option:selected").text() == "Build") {
            $('#NoAssetID').show();
        }
        else {
            $('#NoAssetID').hide();
        }
        $("select[id*=formfield2_]").change(function () {
            if ($("select[id*=formfield2_] option:selected").text() == "Build") {
                $('#NoAssetID').show();
            }
            else {
                $('#NoAssetID').hide();
                $("input[id*=ff41_]").prop("disabled", false);
                $("input[id*=ff41_]").val("");
                $("input[id*=ff51_]").val("");
                $("select[id*=formfield19_]").val("");
                $("select[id*=formfield5_]").val("");
                $("select[id*=formfield6_]").val("");
                $("select[id*=ff101_]").val("");
                $("select[id*=ff171_]").val("");
                $("select[id*=ff71_]").val("");
                $("select[id*=formfield7_]").val("");
                $("select[id*=formfield8_]").val("");
                $("select[id*=ffield2_]").val("Yes");

            }
        });
        $("select[id*=ffield2_]").change(function () {
            if ($("select[id*=ffield2_] option:selected").text() == "No") {
                $("input[id*=ff41_]").val("NA");
                $("input[id*=ff51_]").val("NA");
                $("select[id*=formfield19_]").val("No Rating");
                $("select[id*=formfield5_]").val("NA");
                $("select[id*=formfield6_]").val("NA");
                $("select[id*=ff101_]").val("NA");
                $("select[id*=ff171_]").val("NA");
                $("select[id*=ff71_]").val("NA");
                $("select[id*=formfield7_]").val("NA");
                $("select[id*=formfield8_]").val("NA");

                $("input[id*=ff4_]").prop("disabled", true);
            }
            else {
                $("input[id*=ff41_]").prop("disabled", false);
                $("input[id*=ff41_]").val("");
                $("input[id*=ff51_]").val("");
                $("select[id*=formfield19_]").val("");
                $("select[id*=formfield5_]").val("");
                $("select[id*=formfield6_]").val("");
                $("select[id*=ff101_]").val("");
                $("select[id*=ff171_]").val("");
                $("select[id*=ff71_]").val("");
                $("select[id*=formfield7_]").val("");
                $("select[id*=formfield8_]").val("");

            }

        });


        $("input[id*='ff5']").prop("disabled", true);
        $("select[id*='formfield19']").prop("disabled", true);
        $("select[id*='ff10']").prop("disabled", true);
        $("select[id*='ff17']").prop("disabled", true);
        $("select[id*='ff7']").prop("disabled", true);
        $("select[id*='formfield5']").prop("disabled", true);
        $("select[id*='formfield6']").prop("disabled", true);
        $("select[id*='formfield7']").prop("disabled", true);
        $("select[id*='formfield8']").prop("disabled", true);

        if ($("select[id*=DTMStatus] option:selected").text() == "Sync Completed")
        {
            //$("input[id*=formfield]").attr("disabled", "disabled");
            //$("input[id*=ff]").attr("disabled", "disabled");
            //$("select[id*=formfield]").attr("disabled", "disabled");
            //$("select[id*=ff]").attr("disabled", "disabled");
            //$("div[id*=ff]").attr("disabled", "disabled");
            //$("a[id*='ff']").prop('onclick', null).off('click');
            //$("select[id*=Sampled]").attr("disabled", "disabled");
            //$("select[id*=Opted]").attr("disabled", "disabled");
            //$("input[id*=RTF]").attr("disabled", "disabled");
            //$("textarea[id*=Comments]").attr("disabled", "disabled");
            //$("select[id*=SubmitPQO]").attr("disabled", "disabled");
            //$("#btnSub").hide();
            //$("#btnSub1").hide();

        }

        //$("input[id*=ff64]").attr("disabled", "disabled");

        //$("select[id*=ff63]").change(function () {
        //    if ($("select[id*=ff63] option:selected").text() == "Yes") {
        //        $("input[id*=ff64]").attr("disabled", false);
        //    }
        //    else {
        //        $("input[id*=ff64]").val("NA");
        //        $("input[id*=ff64]").attr("disabled", "disabled");
        //    }
        //});

        if ($("select[id*=formfield2_ctl00_DropDownChoice] option:selected").text() != "Emergency EBF")
        {
            $("select[id*=formfield22]").closest('tr').hide();
            $("select[id*=formfield23]").closest('tr').hide();
        }

        $("select[id*=formfield22_ctl00_DropDownChoice]").change(function () {
            if (($("select[id*=formfield22_ctl00_DropDownChoice] option:selected").text() == "No") &&
                ($("select[id*=formfield23_ctl00_DropDownChoice] option:selected").text() == "No")) {
                alert("You cannot use Emergency EBF path");
                $("#btnSub").hide();
                $("#btnSub1").hide();
            }
            else {
                $("#btnSub").show();
                $("#btnSub1").show();
            }
        });
        $("select[id*=formfield23_ctl00_DropDownChoice]").change(function () {
            if (($("select[id*=formfield22_ctl00_DropDownChoice] option:selected").text() == "No") &&
                ($("select[id*=formfield23_ctl00_DropDownChoice] option:selected").text() == "No")) {
                alert("You cannot use Emergency EBF path");
                $("#btnSub").hide();
                $("#btnSub1").hide();

            }
            else {
                $("#btnSub").show();
                $("#btnSub1").show();
            }
        });

        if (($("select[id*=formfield2_ctl00_DropDownChoice] option:selected").text() == "Retire") ||
                ($("select[id*=formfield2_ctl00_DropDownChoice] option:selected").text() == "Emergency EBF")) {
            $("select[id*=formfield10_]").val('No');
            $("select[id*=formfield10_]").attr("disabled", "disabled");
            if ($("select[id*=formfield2_ctl00_DropDownChoice] option:selected").text() == "Emergency EBF") {
                $("select[id*=formfield22]").attr("disabled", false);
                $("select[id*=formfield23]").attr("disabled", false);
                //$("select[id*=formfield22]").val('');
                //$("select[id*=formfield23]").val('');
                $("select[id*=formfield22]").closest('tr').show();
                $("select[id*=formfield23]").closest('tr').show();
            }
            else {
                $("select[id*=formfield22]").val('Yes');
                $("select[id*=formfield22]").attr("disabled", "disabled");
                $("select[id*=formfield23]").val('Yes');
                $("select[id*=formfield23]").attr("disabled", "disabled");
                $("select[id*=formfield22]").closest('tr').hide();
                $("select[id*=formfield23]").closest('tr').hide();

            }

        }
        else {
            $("select[id*=formfield10_]").attr("disabled", false);
            $("select[id*=formfield22]").val('Yes');
            $("select[id*=formfield22]").attr("disabled", "disabled");
            $("select[id*=formfield23]").val('Yes');
            $("select[id*=formfield23]").attr("disabled", "disabled");
            $("select[id*=formfield22]").closest('tr').hide();
            $("select[id*=formfield23]").closest('tr').hide();


        }

        $("select[id*=formfield2_ctl00_DropDownChoice]").change(function () {
            if (($("select[id*=formfield2_ctl00_DropDownChoice] option:selected").text() == "Retire") ||
                ($("select[id*=formfield2_ctl00_DropDownChoice] option:selected").text() == "Emergency EBF")) {
                $("select[id*=formfield10_]").val('No');
                $("select[id*=formfield10_]").attr("disabled", "disabled");
                if ($("select[id*=formfield2_ctl00_DropDownChoice] option:selected").text() == "Emergency EBF") {
                    $("select[id*=formfield22]").attr("disabled", false);
                    $("select[id*=formfield23]").attr("disabled", false);
                    //$("select[id*=formfield22]").val('');
                    //$("select[id*=formfield23]").val('');
                    $("select[id*=formfield22]").closest('tr').show();
                    $("select[id*=formfield23]").closest('tr').show();
                }
                else {
                    $("select[id*=formfield22]").val('Yes');
                    $("select[id*=formfield22]").attr("disabled", "disabled");
                    $("select[id*=formfield23]").val('Yes');
                    $("select[id*=formfield23]").attr("disabled", "disabled");
                    $("select[id*=formfield22]").closest('tr').hide();
                    $("select[id*=formfield23]").closest('tr').hide();

                }

            }
            else {
                $("select[id*=formfield10_]").attr("disabled", false);
                $("select[id*=formfield22]").val('Yes');
                $("select[id*=formfield22]").attr("disabled", "disabled");
                $("select[id*=formfield23]").val('Yes');
                $("select[id*=formfield23]").attr("disabled", "disabled");
                $("select[id*=formfield22]").closest('tr').hide();
                $("select[id*=formfield23]").closest('tr').hide();


            }

        });


        ExecuteOrDelayUntilScriptLoaded(findusertype, 'SP.js');

        $("input[id*='ff4']").change(function () {
            SPSODAction(["sp.js", "sp.ui.dialog.js"], function () {
                UpdateCMDB();
            });
        });
        
        //Submit button click
        $("#btnSub").click(function () {
            var allfields = "yes";

            var d1 = new Date($("input[id*=ff61]").val());
            var d2 = new Date($("input[id*=ff62]").val());

            if (d2 < d1) {
                alert("Please enter Deployment Date after Release Initiation Date");
                $("input[id*=ff62]").val("");
            }

   	   			if(!(($("input[id*='ff4']").val() == "AST000000000145255")||(($("select[id*='formfield2_ctl00_DropDownChoice']").val()=="Build")&&($("select[id*='ffield2_ctl00_DropDownChoice']").val()=="No"))))
				{
				if($("input[id*=ff8]").val().length != 10)
				{
				alert("Please enter 10 Digit Corporate Change Management Ticket#. If you don't have one, please create one in MyServices.");
				$("input[id*=ff8]").val("");
				}
				}


            $("#DTMForm :input").each(function () {
                $(this).closest("td").find("span.ms-formvalidation").remove();

                if ($(this).val() == "") {
                    if ($(this).closest("td").has("div").text() != "")
                    { }
                    else {
                        $(this).closest("td").append("<span class='ms-formvalidation' role='alert'>You must specify a value for this required field.</span>");
                        allfields = "no";
                    }
                }

            });

             $("select[id*='formfield29_ctl00_Lookup']").closest("td").find("span.ms-formvalidation").remove();

                    if ($("select[id*='formfield29_ctl00_Lookup']").val() == null) {
                        if ($("select[id*='formfield29_ctl00_Lookup']").closest("td").has("div").text() != "")
                        { }
                        else {
                            $("select[id*='formfield29_ctl00_Lookup']").closest("td").append("<span class='ms-formvalidation' role='alert'>You must specify a value for this required field.</span>");
                                        allfields = "no";
           }
                    }

           // allfields = "yes" ;

            //Load CSOM context after sp.js
            if (allfields == "yes") {
                //			SP.SOD.loadMultiple(['sp.js', 'sp.ui.dialog.js'], AddListItem());
                SPSODAction(["sp.js", "sp.ui.dialog.js"], function () {
                    AddListItem();
                });
            }
        });

        $("#btnSub1").click(function () {
            var allfields = "yes";

            var d1 = new Date($("input[id*=ff61]").val());
            var d2 = new Date($("input[id*=ff62]").val());

            if (d2 < d1) {
                alert("Please enter Deployment Date after Release Initiation Date");
                $("input[id*=ff62]").val("");
            }

   	   			if(!(($("input[id*='ff4']").val() == "AST000000000145255")||(($("select[id*='formfield2_ctl00_DropDownChoice']").val()=="Build")&&($("select[id*='ffield2_ctl00_DropDownChoice']").val()=="No"))))
				{
				if($("input[id*=ff8]").val().length != 10)
				{
				alert("Please enter 10 Digit Corporate Change Management Ticket#. If you don't have one, please create one in MyServices.");
				$("input[id*=ff8]").val("");
				}
				}


            $("#DTMForm :input").each(function () {
                $(this).closest("td").find("span.ms-formvalidation").remove();

                if ($(this).val() == "") {

                    if ($(this).closest("td").has("div").text() != "")
                    { }
                    else {
                        $(this).closest("td").append("<span class='ms-formvalidation' role='alert'>You must specify a value for this required field.</span>");
                        allfields = "no";
                    }
                }

            });

               $("select[id*='formfield29_ctl00_Lookup']").closest("td").find("span.ms-formvalidation").remove();

                    if ($("select[id*='formfield29_ctl00_Lookup']").val() == null) {
                        if ($("select[id*='formfield29_ctl00_Lookup']").closest("td").has("div").text() != "")
                        { }
                        else {
                            $("select[id*='formfield29_ctl00_Lookup']").closest("td").append("<span class='ms-formvalidation' role='alert'>You must specify a value for this required field.</span>");
                                        allfields = "no";
           }
                    }

            // allfields = "yes" ;

            //Load CSOM context after sp.js
            if (allfields == "yes") {
                //			SP.SOD.loadMultiple(['sp.js', 'sp.ui.dialog.js'], AddListItem());
                SPSODAction(["sp.js", "sp.ui.dialog.js"], function () {
                    AddListItem();
                });
            }
        });

    });

    function UpdateCMDB() {

        $("input[id*='ff5']").val("");
        $("select[id*='formfield19']").val("");
        $("select[id*='ff10']").val("");
        $("select[id*='ff17']").val("");
        $("select[id*='ff7']").val("");
        $("select[id*='formfield5']").val("");
        $("select[id*='formfield6']").val("");
        $("select[id*='formfield7']").val("");

        assetid = $("input[id*='ff4']").val();
        var oList = context.get_web().get_lists().getByTitle(CMDBList);

        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name="Asset_x0020_Id" /><Value Type="Text">'
            + assetid +
            '</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>');

        this.collListItem = oList.getItems(camlQuery);

        context.load(collListItem);

        context.executeQueryAsync(onQuerySucceededCMDB, onQueryFailCMDB);

    }

    function onQuerySucceededCMDB() {

        var listItemEnumerator = collListItem.getEnumerator();

        while (listItemEnumerator.moveNext()) {

            var objListItem = listItemEnumerator.get_current();

            $("input[id*='ff5']").val(objListItem.get_item('Title'));
            $("select[id*='formfield19']").val(objListItem.get_item('Operational_x0020_Risk'));
            $("select[id*='ff10']").val(objListItem.get_item('FR'));
            $("select[id*='formfield5']").val(objListItem.get_item('NPIFLAG'));
            $("select[id*='formfield6']").val(objListItem.get_item('Information_x0020_Classification'));
            $("select[id*='formfield7']").val(objListItem.get_item('HAMP'));

            $("select[id*='ff17']").val("Not in Scope");
            if (objListItem.get_item('SOX_x0020_Relevance') == "1")
            {
                $("select[id*='ff17']").val("SOX1 (High)");
            }
            if (objListItem.get_item('SOX_x0020_Relevance') == "2") {
                $("select[id*='ff17']").val("SOX 2 (Non-High)");
            }
            $("select[id*='ff7']").val('Other');
            if (objListItem.get_item('Buy_x002f_Hold_x002f_Sell') == "Buy") {
                $("select[id*='ff7']").val('Buy');
            }
            if (objListItem.get_item('Buy_x002f_Hold_x002f_Sell') == "Hold to Keep") {
                $("select[id*='ff7']").val('Hold to Keep');
            }
            $("select[id*='formfield8']").val("No");
            if (objListItem.get_item('Asset_x0020_Type') == "Utility") {
                $("select[id*='formfield8']").val("Yes");
            }

            $("input[id*='ff5']").prop("disabled", true);
            $("select[id*='formfield19']").prop("disabled", true);
            $("select[id*='ff10']").prop("disabled", true);
            $("select[id*='ff17']").prop("disabled", true);
            $("select[id*='formfield5']").prop("disabled", true);
            $("select[id*='formfield6']").prop("disabled", true);
            $("select[id*='formfield7']").prop("disabled", true);
            $("select[id*='formfield8']").prop("disabled", true);
            $("select[id*='ff7']").prop("disabled", true);
            $("#btnSub").show();
            $("#btnSub1").show();

            return;

        }

        alert('Failed to get data from CMDB: Asset ID# is not present.');
        $("#btnSub").hide();
        $("#btnSub1").hide();

    }

    function onQueryFailCMDB(sender, args) {
        alert('Failed to get data from CMDB. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace());
        $("#btnSub").hide();
        $("#btnSub1").hide();
    }


    function SPSODAction(sodScripts, onLoadAction) {
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
        $("select[id*=DTMStatus]").attr("disabled", "disabled");
        var dtmstatus = $("select[id*=DTMStatus] option:selected").text();
        var pqosubmit = $("select[id*=SubmitPQO] option:selected").text();

        SelectRibbonTab("Ribbon.Read", true);

        //if (usertype == "pm" || pqosubmit == "No")
        //{
        //    $("tr[id*='sampling']").hide();
        //}


        //if (usertype == "pqo" || (createdby == currentuser)) {
        //    if (pqosubmit == "Yes") {
        //        $("input[id*=formfield]").attr("disabled", "disabled");
        //        $("input[id*=ff]").attr("disabled", "disabled");
        //        $("select[id*=formfield]").attr("disabled", "disabled");
        //        $("select[id*=ff]").attr("disabled", "disabled");
        //        $("div[id*=ff]").attr("disabled", "disabled");
        //        $("a[id*='ff']").prop('onclick', null).off('click');
        //        if (usertype == "pm") {
        //            $("select[id*=Sampled]").attr("disabled", "disabled");
        //            $("select[id*=Opted]").attr("disabled", "disabled");
        //            $("input[id*=RTF]").attr("disabled", "disabled");
        //            $("textarea[id*=Comments]").attr("disabled", "disabled");
        //            $("select[id*=SubmitPQO]").attr("disabled", "disabled");
        //            $("#btnSub").hide();
        //            $("#btnSub1").hide();

        //        }
        //    }

        //    else {
        //        $("select[id*=SubmitPQO]").attr("disabled", "disabled");
        //        $("select[id*=SubmitPQO]").closest('tr').hide();

        //        $("select[id*=Sampled]").attr("disabled", "disabled");
        //        $("select[id*=Opted]").attr("disabled", "disabled");
        //        $("input[id*=RTF]").attr("disabled", "disabled");
        //        $("textarea[id*=Comments]").attr("disabled", "disabled");


        //    }

        //}

        //else {
        //    $("input[id*=formfield]").attr("disabled", "disabled");
        //    $("input[id*=ff]").attr("disabled", "disabled");
        //    $("select[id*=formfield]").attr("disabled", "disabled");
        //    $("select[id*=ff]").attr("disabled", "disabled");
        //    $("select[id*=Sampled]").attr("disabled", "disabled");
        //    $("select[id*=Opted]").attr("disabled", "disabled");
        //    $("input[id*=RTF]").attr("disabled", "disabled");
        //    $("textarea[id*=Comments]").attr("disabled", "disabled");
        //    $("select[id*=SubmitPQO]").attr("disabled", "disabled");
        //    $("#btnSub").hide();
        //    $("#btnSub1").hide();

        //}

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

        var method = $("select[id*=ff39] option:selected").text();
        var type = $("select[id*=formfield2_ctl00_DropDownChoice] option:selected").text();
        var rider = $("select[id*=formfield3] option:selected").text();
        var pqoid = $("input[id*=formfield9]").val();
        SelectRibbonTab("Ribbon.Read", true);

        waitDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose("Calculating DTM Results", "Please wait...", 200, 700);



        //return GB engagements in a array
        var GB = GBLogic();

        var lstObject = context.get_web().get_lists().getByTitle(ListName);
        var listItemCreationInfo = new SP.ListItemCreationInformation();
        var newItem = lstObject.addItem(listItemCreationInfo);


        // save item details from form inputs

        newItem.set_item('Title', $("input[id*='ff1']").val());
        newItem.set_item('Asset_x0020_Criticality', $("select[id*=formfield19] option:selected").text());
        newItem.set_item('Asset_x0020_ID_x0023_', $("input[id*='ff4']").val());
        newItem.set_item('Asset_x0020_Name', $("input[id*='ff5']").val());
        newItem.set_item('Asset_x0020_Rider', $("select[id*=formfield3] option:selected").text());
        newItem.set_item('Change_x0020_Type', $("select[id*=formfield2_ctl00_DropDownChoice] option:selected").text());
        newItem.set_item('EBFQ1', $("select[id*=formfield22_ctl00_DropDownChoice] option:selected").text());
        newItem.set_item('EBFQ2', $("select[id*=formfield23_ctl00_DropDownChoice] option:selected").text());
        newItem.set_item('Buy_x002f_Hold_x002f_Sell', $("select[id*=ff7] option:selected").text());
        newItem.set_item('Change_x0020_Release', $("input[id*='ff8']").val());
        newItem.set_item('Financial_x0020_Reporting_x0020_', $("select[id*=ff10] option:selected").text());
        newItem.set_item('Information_x0020_Classification', $("select[id*=formfield6] option:selected").text());
        newItem.set_item('Infrastructure_x0020_System_x002', $("select[id*=formfield4] option:selected").text());
        newItem.set_item('MHA', $("select[id*=formfield7] option:selected").text());
        newItem.set_item('Utility', $("select[id*=formfield8] option:selected").text());
        newItem.set_item('NPI', $("select[id*=formfield5] option:selected").text());
        newItem.set_item('PAM_x0020_ID_x0020__x0023_', $("input[id*='ff15']").val());
        newItem.set_item('PQO_x0020_ID', $("input[id*='formfield9']").val());
        newItem.set_item('SOX_x0020_Relevant', $("select[id*=ff17] option:selected").text());
        newItem.set_item('Will_x0020_there_x0020_be_x0020_', $("select[id*=formfield10] option:selected").text());
        newItem.set_item('Release_x0020_Methodology', $("select[id*=ff39] option:selected").text());
        newItem.set_item('Other_x0020_Assets', $("input[id*=ff78]").val());
        var rid = new Date($("input[id*=ff61]").val());
        newItem.set_item('RID', rid);
        var dd = new Date($("input[id*=ff62]").val());
        newItem.set_item('DD', dd);
        newItem.set_item('NoAssetID', $("select[id*=ffield2_] option:selected").text());
        newItem.set_item('AgileAssessment', $("input[id*=fieldAg]").val());
        newItem.set_item('AScore', $("input[id*=fieldAscore]").val());


        var si = new SP.FieldLookupValue();
        si.set_lookupId($("select[id*=formfield29_ctl00_Lookup] option:selected").val());
        newItem.set_item('SI_x0020_Name', si);
        newItem.set_item('Program', $("input[id*=ff64]").val());

        var PMB = SP.FieldUserValue.fromUser($("div[id*=ff65]").text());

        newItem.set_item('PMB', PMB);
        var PMT = SP.FieldUserValue.fromUser($("div[id*=ff66]").text());
        newItem.set_item('PMT', PMT);


        // Save GB engagements to item
        for (i = 0; i < 13; i++) {
            newItem.set_item(GB[i][0], GB[i][1]);
        }

        //Save GB Questions to item

        newItem.set_item('SourceCode', $("select[id*=formfield11] option:selected").text());
        newItem.set_item('AppCode', $("select[id*=formfield12] option:selected").text());
        newItem.set_item('Mainframe', $("select[id*=formfield13] option:selected").text());
        newItem.set_item('Dataelements', $("select[id*=formfield14] option:selected").text());
        newItem.set_item('thirdparty', $("select[id*=ff83] option:selected").text());
        newItem.set_item('Definition', $("select[id*=ff84] option:selected").text());
        newItem.set_item('CMStandard', $("select[id*=ff85] option:selected").text());
        newItem.set_item('changes', $("select[id*=ff86] option:selected").text());
        newItem.set_item('Business', $("select[id*=ff87] option:selected").text());
        newItem.set_item('sensitive', $("select[id*=ff88] option:selected").text());

        newItem.set_item('SingleFamily', $("select[id*=ff90] option:selected").text());
        newItem.set_item('effortchange', $("select[id*=ff91] option:selected").text());
        newItem.set_item('Dispose', $("select[id*=ff92] option:selected").text());
        newItem.set_item('disposeinformation', $("select[id*=ff93] option:selected").text());
        newItem.set_item('disposeorphaned', $("select[id*=ff94] option:selected").text());


        //Update item 
        newItem.update();
        //     context.load(newItem);



        // Execute Asyncronous query
        context.executeQueryAsync(onQuerySucceeded, onQueryFail);

        function onQuerySucceeded() {
            dtmid = newItem.get_id();
            CreateDeliverables(dtmid);
        }


        function onQueryFail(sender, args) {
            alert('Failed to add new item. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace());
            waitDialog.close(0);

        }



    }

    function CreateDeliverables(dtmid) {
        var Deliverable = Deliverables();
        var oList = context.get_web().get_lists().getByTitle(Results);
        var itemArray = [];
        for (var i = 0; i < Deliverable.length ; i++) {

            var itemCreateInfo = new SP.ListItemCreationInformation();
            var oListItem = oList.addItem(itemCreateInfo);

            if (Deliverable[i][1] == "Deliverable") {
                oListItem.set_item('ContentTypeId', "0x0100A75B4B9F254DBA4D9E8BFB831B4D235A");
                oListItem.set_item('Title', Deliverable[i][2]);
                oListItem.set_item('SDLC_x0020_Phase', Deliverable[i][0]);
                oListItem.set_item('Deliverable', Deliverable[i][2]);
                oListItem.set_item('DTMID', dtmid);
            }
            if (Deliverable[i][1] == "Quick Check") {
                oListItem.set_item('ContentTypeId', "0x0100FEE567717D2DCD4490AE03E5A962E5CF006F21F04FB5B7094181BAD7362C8E72F9");
                oListItem.set_item('Title', Deliverable[i][2]);
                oListItem.set_item('SDLC_x0020_Phase', Deliverable[i][0]);
                oListItem.set_item('CheckPoint', Deliverable[i][2]);
                oListItem.set_item('DTMID', dtmid);
            }
            if (Deliverable[i][1] == "Approvals - Notifications") {
                oListItem.set_item('ContentTypeId', "0x0100D3CF1527293ED54DACC273BD000E04EA000120221A171CD64FAFB7B9E0C0825761");
                oListItem.set_item('Title', Deliverable[i][2]);
                oListItem.set_item('SDLC_x0020_Phase', Deliverable[i][0]);
                oListItem.set_item('AN', Deliverable[i][2]);
                oListItem.set_item('DTMID', dtmid);
            }


            oListItem.update();
            itemArray[i] = oListItem;
            context.load(itemArray[i]);
        }

        context.executeQueryAsync(onQuerySucceeded2, onQueryFailed);
        function onQuerySucceeded2() {
            //	    alert('DTM Deliverables are created successfully');
            waitDialog.close(0);
            window.location.href = "http://sharepoint/sites/ProjectQualityRoom/Lists/DTMConfig/DTMResults.aspx?ID=" + dtmid + "&Source=http%3A%2F%2Fsharepoint%2Fsites%2FProjectQualityRoom%2FLists%2FDTMConfig%2FMy%2520DTMs%2Easpx";
        }

        function onQueryFailed(sender, args) {
            alert('Failed to add new item. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace());
            waitDialog.close(0);

        }
    }

    function GBLogic() {
        var method = $("select[id*=ff39] option:selected").text();
        var type = $("select[id*=formfield2_ctl00_DropDownChoice] option:selected").text();
        var rider = $("select[id*=formfield3] option:selected").text();
        var pqoid = $("input[id*='formfield9']").val();

        var CT = type;
        var AC = $("select[id*=formfield19] option:selected").text();
        var AR = $("select[id*=formfield3] option:selected").text();
        var NPI = $("select[id*=formfield5] option:selected").text();
        var IC = $("select[id*=formfield6] option:selected").text();
        var FR = $("select[id*=ff10] option:selected").text();
        var SOX = $("select[id*=ff17] option:selected").text();
        var BHS = $("select[id*=ff7] option:selected").text();
        var M = $("select[id*=formfield7] option:selected").text();
        var U = $("select[id*=formfield8] option:selected").text();
        var Q1 = $("select[id*=formfield11] option:selected").text();
        var Q1a = $("select[id*=formfield12] option:selected").text();
        var Q1b = $("select[id*=formfield13] option:selected").text();
        var Q2 = $("select[id*=formfield14] option:selected").text();
        var Q3 = $("select[id*=ff83] option:selected").text();
        var Q4 = $("select[id*=ff84] option:selected").text();
        var Q5 = $("select[id*=ff85] option:selected").text();
        var Q6 = $("select[id*=ff86] option:selected").text();
        var Q7 = $("select[id*=ff87] option:selected").text();
        var Q8 = $("select[id*=ff88] option:selected").text();
        var Q8 = $("select[id*=ff88] option:selected").text();
        var Q9 = $("select[id*=ff90] option:selected").text();
        var Q10 = $("select[id*=ff91] option:selected").text();
        var Q11 = $("select[id*=ff92] option:selected").text();
        var Q12 = $("select[id*=ff93] option:selected").text();
        var Q13 = $("select[id*=ff94] option:selected").text();
        var pname = $("select[id*=ff64_new_ctl00_Lookup] option:selected").val();
        var excludep = ["Lawton Harper - Advisory", "Transformation Office (TO)", "Data and Document Management", "E2E Loan Processing", "Securitization", "Dev Ops", "Digital Workplace", "Hosting and Engineering Services (HES) Reston Transformation/ Data Center Optimization", "Hosting and Engineering Services Roadmap (Service Operations)", "Information Security"];


        var noasset = $("select[id*=ffield2_] option:selected").text();

        var GB = [["APT", "No"], ["ARB", "No"], ["EDG_x0020_Self_x0020_Governed", "No"], ["EDG_x0020_Architecture", "No"], ["Business_x0020_Architecture", "No"], ["Legal", "No"], ["MRM", "No"], ["Privacy", "No"], ["SBI", "No"], ["SOX", "No"], ["TCP", "No"], ["SCM", "No"], ["RM", "No"]];

        if (noasset == "No") {
            GB[0][1] = "Yes";
            GB[1][1] = "Yes";
            GB[3][1] = "Yes";
            GB[4][1] = "Yes";
            GB[5][1] = "Yes";
            GB[6][1] = "Yes";
            GB[7][1] = "Yes";
            GB[8][1] = "Yes";
            GB[9][1] = "Yes";
            GB[10][1] = "Yes";
            GB[11][1] = "Yes";
            GB[12][1] = "Yes";
            return GB;
        }
        else {

            if ((CT == "Build" || CT == "Enhance") && (FR == "Yes" || SOX == "SOX1 (High)" || SOX == "SOX 2 (Non-High)"))
            { GB[0][1] = "Yes"; }

            if ((CT == "Build" || CT == "Enhance") && (AR == "Application" || AR == "COTS Application" || AR == "ASP Application" || AR == "Model Application"))
            { GB[1][1] = "Yes"; }

            if ((CT == "Build" || CT == "Enhance") && (M == "No" && U == "No") && (Q2 == "Yes" && Q7 == "Yes") && (AC == "Low" || BHS == "Other"))
            { GB[2][1] = "Yes"; }

            if ((CT == "Build" || CT == "Enhance") && (M == "No" && U == "No") && (Q2 == "Yes" && Q7 == "No") && (AC == "High" || AC == "Medium" || AC == "Low"))
            { GB[2][1] = "Yes"; }

            if ((CT == "Build" || CT == "Enhance") && (M == "No" && U == "No") && (Q2 == "Yes" && Q7 == "Yes") && (AC == "High" || AC == "Medium") && (BHS == "Buy" || BHS == "Hold to Keep"))
            { GB[3][1] = "Yes"; }

            if ((CT == "Build" || CT == "Enhance") &&
   (AR == "Application" || AR == "COTS Application" || AR == "ASP Application" || AR == "Model Application") &&
   (Q2 == "Yes" || Q4 == "Yes" || Q6 == "Yes" || Q7 == "Yes" || Q9 == "Yes" || Q10 == "Yes") &&
   (jQuery.inArray(pname, excludep) == -1)
   )
            { GB[4][1] = "Yes"; }

            if ((CT == "Build" || CT == "Enhance") && (AR == "Application" || AR == "Model Application" || AR == "ASP Application" || AR == "Model EUC") && (Q1 == "Yes" || Q8 == "Yes") && (Q6 == "Yes"))
            { GB[5][1] = "Yes"; }

            if ((CT == "Build" || CT == "Enhance") && (AR == "COTS Application") && (Q3 == "Yes"))
            { GB[5][1] = "Yes"; }

            if ((CT == "Build" || CT == "Enhance") && (AR == "Model EUC") && (Q1 == "Yes" || Q6 == "Yes"))
            { GB[5][1] = "Yes"; }

            if ((CT == "Build" || CT == "Enhance") && (IC == "FM Highly Restricted"))
            { GB[5][1] = "Yes"; }

            if ((CT == "Build" || CT == "Enhance" || CT == "Retire") && (Q4 == "Yes"))
            { GB[6][1] = "Yes"; }

            if ((CT == "Build" || CT == "Enhance" || CT == "Retire") && (NPI == "Yes"))
            { GB[7][1] = "Yes"; }

            if ((CT == "Build" || CT == "Enhance" || CT == "Retire") && (IC == "FM Highly Restricted"))
            { GB[7][1] = "Yes"; }

            if ((CT == "Build" || CT == "Enhance") && (AR == "Application" || AR == "Model Application") && (Q1 == "Yes") && (Q1 == "Yes" && Q1a == "Yes" && Q1b == "No"))
            { GB[8][1] = "Yes"; }

            if ((CT == "Build" || CT == "Enhance" || CT == "Emergency EBF") && (SOX == "SOX1 (High)" || SOX == "SOX 2 (Non-High)" || FR == "Yes"))
            { GB[9][1] = "Yes"; }

            if ((CT == "Build" || CT == "Enhance") && (AR == "Application" || AR == "ASP Application" || AR == "Model Application"))
            { GB[10][1] = "Yes"; }

            if (Q5 == "No")
            { GB[11][1] = "Yes"; }

            if (Q11 == "Yes" || Q12 == "Yes" || Q13 == "Yes")
            { GB[12][1] = "Yes"; }

            return GB;

        }

    }

    function Deliverables() {

        var method = $("select[id*=ff39] option:selected").text();
        var type = $("select[id*=formfield2_ctl00_DropDownChoice] option:selected").text();
        var rider = $("select[id*=formfield3] option:selected").text();
        var pqoid = $("input[id*='formfield9']").val();
        var preimp = $("select[id*=formfield10] option:selected").text();

        if ((method == "Waterfall") && (type == "Build" || type == "Enhance")) {
            if (preimp == "Yes") {
                var Deliverables = new Array(24);
                for (var i = 0; i < 24; i++)
                { Deliverables[i] = new Array(3); }
            }
            else {
                var Deliverables = new Array(20);
                for (var i = 0; i < 20; i++)
                { Deliverables[i] = new Array(3); }
            }
            Deliverables[0] = ["Initiation", "Approvals - Notifications", "Initiation Authorization Approval"];
            Deliverables[1] = ["Planning", "Deliverable", "Scope Document"];
            Deliverables[2] = ["Planning", "Approvals - Notifications", "Upstream / Downstream Notification"];
            Deliverables[3] = ["Planning", "Deliverable", "Risk Register"];
            Deliverables[4] = ["Analysis", "Deliverable", "Stakeholder Requirements"];
            Deliverables[5] = ["Design", "Deliverable", "Architecture Document"];
            Deliverables[6] = ["Design", "Deliverable", "Solution Specifications and Detailed Design"];
            Deliverables[7] = ["Design", "Deliverable", "System Test Plan/Risk Based Matrix"];
            Deliverables[8] = ["Design", "Deliverable", "User Test Plan + Reconciliation Test Plan/Risk Based Matrix"];
            Deliverables[9] = ["Construction", "Deliverable", "Operations Manual"];
            Deliverables[10] = ["Construction", "Deliverable", "Requirements Traceability Matrix(RTM) - System Test"];
            Deliverables[11] = ["Construction", "Deliverable", "Requirements Traceability Matrix(RTM) - User Test"];
            Deliverables[12] = ["Construction", "Approvals - Notifications", "Upstream / Downstream Interface Responses (if applicable)"];
            Deliverables[13] = ["Construction", "Quick Check", "Construction Review"];
            if (preimp == "Yes") {
                Deliverables[14] = ["Implementation", "Deliverable", "Pre-Implementation Shakeout Test Plan"];
                Deliverables[15] = ["Implementation", "Deliverable", "Pre-Implementation Deployment Plan"];
                Deliverables[16] = ["Implementation", "Quick Check", "Pre-Implementation Review (1. Pre-Implementation Risks 2. Pre-Implementation Corporate Change Management System ticket #)"];
                Deliverables[17] = ["Implementation", "Approvals - Notifications", "Pre-Implementation Deployment Approval"];
                Deliverables[18] = ["System Test", "Deliverable", "System Test Results Summary & System Test Incident Report"];
                Deliverables[19] = ["User Test", "Deliverable", "User Test Results Summary & User Test Incident Report"];
                Deliverables[20] = ["Implementation", "Deliverable", "Implementation Plan(including Backout & Shakeout Plans)"];
                Deliverables[21] = ["Implementation", "Approvals - Notifications", "CIA Interface Testing Signoffs (if applicable)"];
                Deliverables[22] = ["Implementation", "Quick Check", "Implementation Review (1. Updated Risk Register)"];
                Deliverables[23] = ["Implementation", "Approvals - Notifications", "Deployment Approval"];
            }
            else {
                Deliverables[14] = ["System Test", "Deliverable", "System Test Results Summary & System Test Incident Report"];
                Deliverables[15] = ["User Test", "Deliverable", "User Test Results Summary & User Test Incident Report"];
                Deliverables[16] = ["Implementation", "Deliverable", "Implementation Plan(including Backout & Shakeout Plans)"];
                Deliverables[17] = ["Implementation", "Approvals - Notifications", "CIA Interface Testing Signoffs (if applicable)"];
                Deliverables[18] = ["Implementation", "Quick Check", "Implementation Review (1. Updated Risk Register)"];
                Deliverables[19] = ["Implementation", "Approvals - Notifications", "Deployment Approval"];
            }


        }

        if ((method == "Agile") && (type == "Build" || type == "Enhance")) {
            if (preimp == "Yes") {
                var Deliverables = new Array(19);
                for (var i = 0; i < 19; i++)
                { Deliverables[i] = new Array(3); }
            }
            else {
                var Deliverables = new Array(15);
                for (var i = 0; i < 15; i++)
                { Deliverables[i] = new Array(3); }
            }
            Deliverables[0] = ["Initiation", "Approvals - Notifications", "Initiation Authorization Approval"];
            Deliverables[1] = ["Planning", "Deliverable", "Release Vision Statement"];
            Deliverables[2] = ["Planning", "Approvals - Notifications", "Upstream / Downstream Notification"];
            Deliverables[3] = ["Planning", "Deliverable", "Risk Register"];
            Deliverables[4] = ["Development", "Deliverable", "Stakeholder Features Description Document"];
            Deliverables[5] = ["Development", "Deliverable", "Architecture Document"];
            Deliverables[6] = ["Development", "Deliverable", "Solution Specifications & Detailed Design"];
            Deliverables[7] = ["Development", "Deliverable", "Agile Testing Document"];
            Deliverables[8] = ["Development", "Deliverable", "Operations Manual"];
            Deliverables[9] = ["Development", "Approvals - Notifications", "Upstream / Downstream Interface Responses (if applicable)"];
            Deliverables[10] = ["Development", "Quick Check", "Development Review"];
            if (preimp == "Yes") {
                Deliverables[11] = ["Implementation", "Deliverable", "Pre-Implementation Shakeout Test Plan"];
                Deliverables[12] = ["Implementation", "Deliverable", "Pre-Implementation Deployment Plan"];
                Deliverables[13] = ["Implementation", "Quick Check", "Pre-Implementation Review (1. Pre-Implementation Risks 2. Pre-Implementation Corporate Change Management System ticket #)"];
                Deliverables[14] = ["Implementation", "Approvals - Notifications", "Pre-Implementation Deployment Approval"];
                Deliverables[15] = ["Implementation", "Deliverable", "Implementation Plan (including Backout & Shakeout Plans)"];
                Deliverables[16] = ["Implementation", "Approvals - Notifications", "CIA Interface Testing Signoffs (if applicable)"];
                Deliverables[17] = ["Implementation", "Quick Check", "Implementation Review (1. Updated Risk Register 2. Updated Agile Testing Document)"];
                Deliverables[18] = ["Implementation", "Approvals - Notifications", "Deployment Approval"];
            }
            else {
                Deliverables[11] = ["Implementation", "Deliverable", "Implementation Plan (including Backout & Shakeout Plans)"];
                Deliverables[12] = ["Implementation", "Approvals - Notifications", "CIA Interface Testing Signoffs (if applicable)"];
                Deliverables[13] = ["Implementation", "Quick Check", "Implementation Review (1. Updated Risk Register 2. Updated Agile Testing Document)"];
                Deliverables[14] = ["Implementation", "Approvals - Notifications", "Deployment Approval"];
            }

        }
        if (type == "Retire") {
            var Deliverables = new Array(7);
            for (var i = 0; i < 7; i++)
            { Deliverables[i] = new Array(3); }
            Deliverables[0] = ["Initiation", "Approvals - Notifications", "Initiation Authorization Approval"];
            Deliverables[1] = ["Planning", "Approvals - Notifications", "Upstream / Downstream Notification"];
            Deliverables[2] = ["Analysis", "Deliverable", "Retirement Plan"];
            Deliverables[3] = ["Construction", "Approvals - Notifications", "Upstream / Downstream Interface Responses (if applicable)"];
            Deliverables[4] = ["Implementation", "Approvals - Notifications", "CIA Interface Testing Signoffs (if applicable)"];
            Deliverables[5] = ["Implementation", "Quick Check", "Implementation Review (1. Updated Risk Register)"];
            Deliverables[6] = ["Implementation", "Approvals - Notifications", "Deployment Approval"];



        }
        if (type == "Emergency EBF") {
            if (method == "Waterfall") {
                var Deliverables = new Array(10);
                for (var i = 0; i < 10; i++)
                { Deliverables[i] = new Array(3); }
                Deliverables[0] = ["Initiation", "Approvals - Notifications", "Initiation Authorization Approval"];
                Deliverables[1] = ["Planning", "Deliverable", "Scope Document"];
                Deliverables[2] = ["Planning", "Approvals - Notifications", "Upstream / Downstream Notification"];
                Deliverables[3] = ["Design", "Deliverable", "User Test Plan & Reconciliation Test Plan/Risk Based Matrix"];
                Deliverables[4] = ["Construction", "Approvals - Notifications", "Upstream / Downstream Interface Responses (if applicable)"];
                Deliverables[5] = ["User Test", "Deliverable", "User Test Results Summary & User Test Incident Report"];
                Deliverables[6] = ["Implementation", "Deliverable", "Implementation Plan (including Backout & Shakeout Plans)"];
                Deliverables[7] = ["Implementation", "Approvals - Notifications", "CIA Interface Testing Signoffs (if applicable)"];
                Deliverables[8] = ["Implementation", "Quick Check", "Implementation Review (1. Updated Risk Register)"];
                Deliverables[9] = ["Implementation", "Approvals - Notifications", "Deployment Approval"];

            }
            else {
                var Deliverables = new Array(9);
                for (var i = 0; i < 9; i++)
                { Deliverables[i] = new Array(3); }
                Deliverables[0] = ["Initiation", "Approvals - Notifications", "Initiation Authorization Approval"];
                Deliverables[1] = ["Planning", "Deliverable", "Release Vision Statement"];
                Deliverables[2] = ["Planning", "Approvals - Notifications", "Upstream / Downstream Notification"];
                Deliverables[3] = ["Development", "Deliverable", "Agile Testing Document"];
                Deliverables[4] = ["Development", "Approvals - Notifications", "Upstream / Downstream Interface Responses (if applicable)"];
                Deliverables[5] = ["Implementation", "Deliverable", "Implementation Plan (including Backout & Shakeout Plans)"];
                Deliverables[6] = ["Implementation", "Approvals - Notifications", "CIA Interface Testing Signoffs (if applicable)"];
                Deliverables[7] = ["Implementation", "Quick Check", "Implementation Review (1. Updated Risk Register 2. Updated Agile Testing Document)"];
                Deliverables[8] = ["Implementation", "Approvals - Notifications", "Deployment Approval"];

            }
        }
        return Deliverables;
    }


    function Cascade(params) {

        var parent = $("select[Title='" + params.parentFormField + "'], select[Title='" +
            params.parentFormField + " Required Field']");

        $(parent).empty();

        var poptions = "";

        var call = $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/GetByTitle('SI%20Names')/items?$select=Id,Title&$filter=Status%20eq%20%27Active%27",
            type: "GET",
            dataType: "json",
            headers: {
                Accept: "application/json;odata=verbose"
            }

        });
        call.done(function (data, textStatus, jqXHR) {

            for (index in data.d.results) {
                poptions += "<option value='" + data.d.results[index].Id + "'>" +
                    data.d.results[index][params.childLookupField] + "</option>";
            }
            $(parent).append(poptions);
            var currentParent = $(parent).val();
            if (currentParent != 0) {
                DoCascade(currentParent, params);
            }


        });
        call.fail(function (jqXHR, textStatus, errorThrown) {
            alert("Error retrieving information from list: " + params.childList + jqXHR.responseText);
            $(parent).append(poptions);
        });




        $(parent).change(function () {
            DoCascade(this.value, params);
        });

        var currentParent = $(parent).val();
        if (currentParent != 0) {
            DoCascade(currentParent, params);
        }

    }


    function DoCascade(parentID, params) {

        var child = $("select[Title='" + params.childFormField + "'], select[Title='" +
            params.childFormField + " Required Field']," +
           "select[Title='" + params.childFormField + " possible values']");

        $(child).empty();

        var options = "";

        var call = $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/GetByTitle('" + params.childList +
                "')/items?$select=Id," + params.childLookupField + "," + params.parentFieldInChildList +
                "/Id&$expand=" + params.parentFieldInChildList + "/Id&$filter=" + params.parentFieldInChildList +
                "/Id eq " + parentID,
            type: "GET",
            dataType: "json",
            headers: {
                Accept: "application/json;odata=verbose"
            }

        });
        call.done(function (data, textStatus, jqXHR) {

            for (index in data.d.results) {
                options += "<option value='" + data.d.results[index].Id + "'>" +
                    data.d.results[index][params.childLookupField] + "</option>";
            }
            $(child).append(options);

        });
        call.fail(function (jqXHR, textStatus, errorThrown) {
            alert("Error retrieving information from list: " + params.childList + jqXHR.responseText);
            $(child).append(options);
        });

    }

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
   

