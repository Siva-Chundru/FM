var SiteURL = "/sites/ProjectQualityRoom/";
var ListName = "DTM Library";
var deliverables = "DTM Results";
var releasetracker = "PQO Release Tracker";
var reviewtracker = "PQO Review Status Tracker";
var gbtracker = "GB Tracker";
var context = new SP.ClientContext(SiteURL); // the current context is taken by default here
var dtmid = getParameter2ByName('ID');
var source = getParameter2ByName('Source');
var pqoid;


$(document).ready(function () {

    $("#btn1Sync").click(function () {
        if (confirm("Are you ready to sync this DTM to PQO Release and create a PQO ID ?") == true) {
            SPSOD2Action(["sp.js", "sp.ui.dialog.js"], function () {
                Update1Trackers();
            });
        } else { }

    });

    $("#btn2Sync").click(function () {
        if (confirm("Are you ready to sync this DTM to PQO Trackers ?") == true) {
            SPSOD2Action(["sp.js", "sp.ui.dialog.js"], function () {
                Update2Trackers();
            });
        } else{}

    });

});

function SPSOD2Action(sodScripts, onLoadAction) {
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

function Update2Trackers() {

        waitDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose("Syncing DTM Results to Release and Review Trackers ", "Please wait...", 200, 1200);

        var lstObject = context.get_web().get_lists().getByTitle(ListName);
        var oList = context.get_web().get_lists().getByTitle(releasetracker);
        var oList1 = context.get_web().get_lists().getByTitle(deliverables);


        this.oListItem = lstObject.getItemById(dtmid);

        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name="DTM_x0020_ID" /><Value Type="Text">'
        + dtmid + '</Value></Eq></Where><OrderBy><FieldRef Name="ID" Ascending="False" /></OrderBy></Query><RowLimit>1</RowLimit></View>');
        this.collListItem = oList.getItems(camlQuery);

        var camlQuery1 = new SP.CamlQuery();
        camlQuery1.set_viewXml('<View><Query><Where><And><Eq><FieldRef Name="DTMID" LookupId="TRUE" /><Value Type="Lookup">'
            + dtmid +
            '</Value></Eq><Eq><FieldRef Name="ContentTypeId"/><Value Type="ContentTypeId">'
            + '0x0100FEE567717D2DCD4490AE03E5A962E5CF006F21F04FB5B7094181BAD7362C8E72F9' +
            '</Value></Eq></And></Where></Query></View>');

        this.collListItem1 = oList1.getItems(camlQuery1);

        context.load(collListItem);
        context.load(collListItem1);
        context.load(oListItem);

        context.executeQueryAsync(onQuery2Succeeded, onQuery2Fail);
  
}

function onQuery2Succeeded() {
    

            var listItemEnumerator = collListItem.getEnumerator();

            while (listItemEnumerator.moveNext()) {

                var objListItem = listItemEnumerator.get_current();
                pqoid = objListItem.get_item('Releases');
                var newpqoid;
                newpqoid = pqoid;

                if (oListItem.get_item('Sampled_x0020_Out') == "Yes")
                { objListItem.set_item('Lifecyle_x0020_Phase', "Sampled Out"); }
                if (oListItem.get_item('Sampled_x0020_Out') == "Yes")
                { objListItem.set_item('Sampled_x0020_Out', true); }
                objListItem.set_item('Opted_x0020_In_x002d__x0020_Samp', false);
                if (oListItem.get_item('Opted_x0020_In_x002d_Sampling') == "Yes")
                { objListItem.set_item('Opted_x0020_In_x002d__x0020_Samp', true); }
                objListItem.set_item('RTF_x0020_Score', oListItem.get_item('RTF_x0020_Stability_x0020_Score'));
                objListItem.set_item('Sampling_x0020_Comments', oListItem.get_item('Smapling_x0020_Comments'));

                objListItem.update();
                context.load(objListItem);
               
            }

     


            var oListGB = context.get_web().get_lists().getByTitle(gbtracker);
            var itemCreateInfoGB = new SP.ListItemCreationInformation();
            var newItemGB = oListGB.addItem(itemCreateInfoGB);

          //  newItemGB.set_item('Release_x0020_Name', oListItem.get_item('Title'));
            newItemGB.set_item('PQO_x0020_Project_x0020_ID', newpqoid);
            newItemGB.set_item('Assets', oListItem.get_item('Asset_x0020_Name') + ";" + oListItem.get_item('Other_x0020_Assets'));
            newItemGB.set_item('DTM_x0020_ID', dtmid);

            //newItemGB.set_item('Deployment_x0020_Date', oListItem.get_item('DD'));
            //newItemGB.set_item('Project_x0020_Manager', oListItem.get_item('PMT'));
            
            //newItemGB.set_item('Release_x0020_Status', "Active");
            //if (oListItem.get_item('Sampled_x0020_Out') == "Yes") {
            //    newItemGB.set_item('Release_x0020_Status', "Non-Active");
            //}

            newItemGB.set_item('Lifecycle_x0020_Phase', "Initiation");
            if (oListItem.get_item('Sampled_x0020_Out') == "Yes") {
                newItemGB.set_item('Lifecycle_x0020_Phase', "Sampled Out");
                newItemGB.set_item('Sampled_x0020_Out', true);
            }

            newItemGB.set_item('APT', false);
            if (oListItem.get_item('APT') == "Yes")
            { newItemGB.set_item('APT', true); }

            newItemGB.set_item('ARB', false);
            if (oListItem.get_item('ARB') == "Yes")
            { newItemGB.set_item('ARB', true); }

            newItemGB.set_item('Legal', false);
            if (oListItem.get_item('Legal') == "Yes")
            { newItemGB.set_item('Legal', true); }

            newItemGB.set_item('MRM', false);
            if (oListItem.get_item('MRM') == "Yes")
            { newItemGB.set_item('MRM', true); }

            newItemGB.set_item('Privacy', false);
            if (oListItem.get_item('Privacy') == "Yes")
            { newItemGB.set_item('Privacy', true); }

            newItemGB.set_item('SBI', false);
            if (oListItem.get_item('SBI') == "Yes")
            { newItemGB.set_item('SBI', true); }

            newItemGB.set_item('SCM', false);
            if (oListItem.get_item('SCM') == "Yes")
            { newItemGB.set_item('SCM', true); }

            newItemGB.set_item('SOX', false);
            if (oListItem.get_item('SOX') == "Yes")
            { newItemGB.set_item('SOX', true); }

            newItemGB.set_item('EDG', false);
            if (oListItem.get_item('EDG_x0020_Architecture') == "Yes")
            { newItemGB.set_item('EDG', true); }

            newItemGB.set_item('TCP', false);
            if (oListItem.get_item('TCP') == "Yes")
            { newItemGB.set_item('TCP', true); }

            newItemGB.set_item('Business_x0020_Architecture', false);
            if (oListItem.get_item('Business_x0020_Architecture') == "Yes")
            { newItemGB.set_item('Business_x0020_Architecture', true); }

            newItemGB.set_item('EDG_x0020_Self_x0020_Governed', false);
            if (oListItem.get_item('EDG_x0020_Self_x0020_Governed') == "Yes")
            { newItemGB.set_item('EDG_x0020_Self_x0020_Governed', true); }

            newItemGB.set_item('RM', false);
            if (oListItem.get_item('RM') == "Yes")
            { newItemGB.set_item('RM', true); }



            newItemGB.update();
            context.load(newItemGB);



            var oListCP = context.get_web().get_lists().getByTitle(reviewtracker);
    
            var listItemEnumeratorCP = collListItem1.getEnumerator();
            var checkpoint = [];
    

            while (listItemEnumeratorCP.moveNext()) {

                var objListItem1 = listItemEnumeratorCP.get_current();

                var itemCreateInfoCP = new SP.ListItemCreationInformation();
                var newItemCP = oListCP.addItem(itemCreateInfoCP);
               
                if (objListItem1.get_item('Review_x0020_Date') != null) {
                    newItemCP.set_item('PQO_x0020_Project_x0020_ID', newpqoid);
                    newItemCP.set_item('Title', oListItem.get_item('Title'));
                    newItemCP.set_item('Parent_x0020_Remedy_x0020_Ticket', oListItem.get_item('Change_x0020_Release'));
                    newItemCP.set_item('DTM_x0020_ID', dtmid);

                    var ckp = objListItem1.get_item('Title');
                    var res = ckp.substring(0, ckp.indexOf(' '));
                    newItemCP.set_item('Checkpoint', res);
                    //newItemCP.set_item('Checkpoint', "Implementation Review Approval Package");
                    newItemCP.set_item('Release_x0020_Status', "Active");

                    if (oListItem.get_item('Sampled_x0020_Out') == "Yes")
                        {
                        newItemCP.set_item('Checkpoint_x0020_Review_x0020_St', "Sampled Out");
                    }
                    else
                    {
                        newItemCP.set_item('Checkpoint_x0020_Review_x0020_St', "Not Submitted");
                        newItemCP.set_item('Checkpoint_x0020_Review_x0020_Ta', objListItem1.get_item('Review_x0020_Date'));
                    }

                    newItemCP.update();
                    checkpoint.push(newItemCP);
                    context.load(checkpoint[checkpoint.length - 1]);
                }
                else
                {
                    onQueryFail();
                    return;
                }

            }

            oListItem.set_item("PQO_x0020_ID", newpqoid);
            oListItem.set_item("DTM_x0020_Status", "Sync Completed");
            oListItem.update();
            context.load(oListItem);
        
        context.executeQueryAsync(onQuery2SucceededFinal, onQuery2FailFinal);

}

function onQuery2SucceededFinal(sender, args) {
    waitDialog.close(0);
    window.location.href = "http://sharepoint/sites/ProjectQualityRoom/Lists/DTMConfig/DTMResults.aspx?ID=" + dtmid + "&Source=" + source;

}

function onQuery2FailFinal(sender, args) {
    waitDialog.close(0);
    alert('Failed to add new item. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace());
}

function onQuery2Fail(sender, args) {
    waitDialog.close(0);
    alert('Failed to add new item. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace());
}

function Update1Trackers() {

    waitDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose("Syncing DTM to PQO Release and creating a DTM ID", "Please wait...", 200, 1200);

    var lstObject = context.get_web().get_lists().getByTitle(ListName);
    var oList = context.get_web().get_lists().getByTitle(releasetracker);


    this.oListItem = lstObject.getItemById(dtmid);

    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query><OrderBy><FieldRef Name="ID" Ascending="False" /></OrderBy>'
    + '</Query><RowLimit>1</RowLimit></View>');
    this.collListItem = oList.getItems(camlQuery);


    context.load(collListItem);
    context.load(oListItem);

    context.executeQueryAsync(onQuery1Succeeded, onQuery1Fail);

}

function onQuery1Succeeded() {


    var listItemEnumerator = collListItem.getEnumerator();

    while (listItemEnumerator.moveNext()) {

        var objListItem = listItemEnumerator.get_current();
        pqoid = objListItem.get_item('Releases');
        var newpqoid;
        //if (pqoid >= 9000) {
        //    newpqoid = pqoid + 1;
        //}
        //else {
        //    newpqoid = "9990";
        newpqoid = pqoid + 1
        //}
    }

    var oList = context.get_web().get_lists().getByTitle(releasetracker);
    var itemCreateInfo = new SP.ListItemCreationInformation();
    var newItem = oList.addItem(itemCreateInfo);

    newItem.set_item('Title', oListItem.get_item('Title'));
    newItem.set_item('Releases', newpqoid);
    newItem.set_item('Application_x0020_Category', oListItem.get_item('Asset_x0020_Rider'));
    if (oListItem.get_item('Asset_x0020_Rider') == "Model Application") {
        newItem.set_item('Application_x0020_Category', "Modeling Application");
    }
    if (oListItem.get_item('Asset_x0020_Rider') == "Model EUC") {
        newItem.set_item('Application_x0020_Category', "Modeling EUC");
    }
    newItem.set_item('Deployment_x0020_Date', oListItem.get_item('DD'));
    if (oListItem.get_item('Release_x0020_Methodology') == "Waterfall") {
        newItem.set_item('Initial_x0020_Methodology_x0020_', "Modified Waterfall");
    }
    if (oListItem.get_item('Release_x0020_Methodology') == "Agile") {
        newItem.set_item('Initial_x0020_Methodology_x0020_', "Agile");
    }
    newItem.set_item('Lifecyle_x0020_Phase', "Initiation");
    newItem.set_item('PAM_x0020_ID', oListItem.get_item('PAM_x0020_ID_x0020__x0023_'));
    newItem.set_item('Project_x0020_Manager_x0020_Busi', oListItem.get_item('PMB'));
    newItem.set_item('Project_x0020_Manager_x0020_Tech', oListItem.get_item('PMT'));
    newItem.set_item('Release_x0020_Initiation_x0020_D', oListItem.get_item('RID'));
    newItem.set_item('Parent_x0020_Remedy_x0020_Ticket', oListItem.get_item('Change_x0020_Release'));
    newItem.set_item('SDLC_x0020_Change_x0020_Type', oListItem.get_item('Change_x0020_Type'));
    newItem.set_item('SDLC_x0020_Version', "5.0");
    newItem.set_item('DTM_x0020_ID', dtmid);
    newItem.set_item('Sampled_x0020_Out', false);
    newItem.set_item('Opted_x0020_In_x002d__x0020_Samp', false);

    if (oListItem.get_item('SI_x0020_Name').get_lookupValue() != "N/A") {
        newItem.set_item('Is_x0020_Project_x0020_part_x002', "Yes");
        newItem.set_item('SI_x0020_Name', oListItem.get_item('SI_x0020_Name').get_lookupValue());
    }
    else {
        newItem.set_item('Is_x0020_Project_x0020_part_x002', "No");
        newItem.set_item('SI_x0020_Name', oListItem.get_item('SI_x0020_Name').get_lookupValue());
    }

    //            if(oListItem.get_item('SI_x0020_Name') != "N/A")
    //newItem.set_item('',);
    newItem.update();
    context.load(newItem);

    oListItem.set_item("PQO_x0020_ID", newpqoid);
    oListItem.set_item("DTM_x0020_Status", "PQO Review Completed");
    oListItem.update();
    context.load(oListItem);

    context.executeQueryAsync(onQuery1SucceededFinal, onQuery1FailFinal);

}

function onQuery1SucceededFinal(sender, args) {
    waitDialog.close(0);
    window.location.href = "http://sharepoint/sites/ProjectQualityRoom/Lists/DTMConfig/DTMResults.aspx?ID=" + dtmid + "&Source=" + source;

}

function onQuery1FailFinal(sender, args) {
    waitDialog.close(0);
    alert('Failed to add new item. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace());
}

function onQuery1Fail(sender, args) {
    waitDialog.close(0);
    alert('Failed to add new item. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace());
}

function getParameter2ByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



