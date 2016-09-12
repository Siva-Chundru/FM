var SiteURL = "/sites/ProjectQualityRoom/";
var ListName = "CMDB";
var context = new SP.ClientContext(SiteURL); // the current context is taken by default here
var assetid;


$(document).ready(function () {

    
    //Submit button click
    $("#btnCMDB").click(function () {
        SPSODAction(["sp.js", "sp.ui.dialog.js"], function () {
            UpdateCMDB();
        });

    });

});

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

function UpdateCMDB() {

    waitDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose("Getting Asset Details from CMDB", "Please wait...", 200, 1200);
	assetid = $("input[id*='ff4']").val();
    var oList = context.get_web().get_lists().getByTitle(ListName);

    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name="Asset_x0020_Id" /><Value Type="Text">'
        + assetid +
        '</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>');

    this.collListItem = oList.getItems(camlQuery);

    context.load(collListItem);

    context.executeQueryAsync(onQuerySucceeded, onQueryFail);

}

function onQuerySucceeded() {

    var listItemEnumerator = collListItem.getEnumerator();

    while (listItemEnumerator.moveNext()) {

        var objListItem = listItemEnumerator.get_current();
        waitDialog.close(0);
        alert(objListItem.get_item('Title'));
        alert(objListItem.get_item('Operational_x0020_Risk'));
        alert(objListItem.get_item('Asset_x0020_Type'));
        alert(objListItem.get_item('NPIFLAG'));
        return ;

      //  $("input[id*='ff5']").val(assetname);

    }
    
      waitDialog.close(0);
        alert('Failed to get data from CMDB: This Asset ID# is not present.');
        

    
}

function onQueryFail(sender, args) {
    waitDialog.close(0);
        alert('Failed to get data from CMDB. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace());
}



