var SiteURL = "/sites/ProjectQualityRoom/";
var ListName = "DTM Library";
var releasetracker = "PQO Release Tracker";
var context = new SP.ClientContext(SiteURL); // the current context is taken by default here
var dtmid = getParameter1ByName('ID');
var source = getParameter1ByName('Source');
var pqoid;

$(document).ready(function () {


    //Submit button click
    $("#btn1Sync").click(function () {
        if (confirm("Are you ready to sync this DTM to PQO Release and create a PQO ID ?") == true) {
            SPSOD1Action(["sp.js", "sp.ui.dialog.js"], function () {
                Update1Trackers();
            });
        } else { }

    });

});

function SPSOD1Action(sodScripts, onLoadAction) {
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
    newItem.set_item('Deployment_x0020_Date', oListItem.get_item('DD'));
    newItem.set_item('Initial_x0020_Methodology_x0020_', oListItem.get_item('Release_x0020_Methodology'));
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

function getParameter1ByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



