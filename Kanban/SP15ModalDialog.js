//function to open pages in a dialog
function openInDialog(dlgWidth, dlgHeight, dlgAllowMaximize,dlgShowClose,needCallbackFunction, pageUrl)
{
var options = { url: pageUrl, width: dlgWidth, height: dlgHeight, allowMaximize: dlgAllowMaximize,
showClose: dlgShowClose
};
if(needCallbackFunction)
{
options.dialogReturnValueCallback = Function.createDelegate(null,CloseDialogCallback);
}
SP.SOD.execute("sp.ui.dialog.js", "SP.UI.ModalDialog.showModalDialog", options);
}

function CloseDialogCallback(dialogResult, returnValue)
{
if(dialogResult == SP.UI.DialogResult.OK)
{
SP.SOD.execute("sp.ui.dialog.js", "SP.UI.ModalDialog.RefreshPage", SP.UI.DialogResult.OK);
}
else if(dialogResult == SP.UI.DialogResult.cancel)
{}
else
{}
}