      $(document).ready(function($) {
	      $('#sideNavBox').hide();
		$('#suiteBar').hide();
		
ExecuteOrDelayUntilScriptLoaded(createitems, "sp.js")

function createitems()
{
var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + _spPageContextInfo.userId + ")";
    var requestHeaders = { "accept": "application/json;odata=verbose" };
    $.ajax({
        url: requestUri,
        contentType: "application/json;odata=verbose",
        headers: requestHeaders,
        success: function (data) {
//        alert(data.d.LoginName);
        
        var siteUrl = "http://sharepoint/sites/PQO/SandBox/";
            /// add prefix, this needs to be changed based on scenario
            var accountName = data.d.LoginName;

            /// make an ajax call to get the site user
            $.ajax({
                url: siteUrl + "_api/web/siteusers(@v)?@v='" + 
                    encodeURIComponent(accountName) + "'",
                method: "GET",
                headers: { "Accept": "application/json; odata=verbose" },
                success: function (data) {
                    ///popup user id received from site users.
//                    alert("Received UserId" + data.d.Id);
						                    $.ajax({
						    url: 'http://sharepoint/sites/PQO/SandBox/_api/web/Lists/GetByTitle(\'Draglist\')/Items?$filter=Assigned eq ' + data.d.Id,
						    method: "GET",
						    headers: { "Accept": "application/json; odata=verbose" }, 
						    success: function (data) {
						if (data.d.results.length == "0")
						{     
						createListItems();
						}
						else {
						console.log(data.d.results.length); 
						
						}
						    },
						    error: function (data) {
						        console.log(data.responseText);
						    }
						});

                },
                error: function (data) {
                    console.log(JSON.stringify(data));
                }
            });
        
        },
        error: function (data) {
        console.log(data.responseText);
    }
    });

}

function createListItems() {
    
    var itemArray = [];
    var SiteURL = "http://sharepoint/sites/PQO/Sandbox/" ;
    var clientContext = new SP.ClientContext(SiteURL);
    var oList = clientContext.get_web().get_lists().getByTitle('DragList');
	var userid = _spPageContextInfo.userId;
	var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + userid + ")";
    var requestHeaders = { "accept": "application/json;odata=verbose" };
    $.ajax({
        url: requestUri,
        contentType: "application/json;odata=verbose",
        headers: requestHeaders,
        success: onSuccess,
        error: onError
    });
    function onSuccess(data, request) {
        var Logg = data.d;
 
        //get login name
        var loginName = Logg.Title ;
        //                alert(loginName);
        var litems = [["Kanban Task", "TO DO (Backlog)","This is in Backlog"]]
        
            for(var i = 0; i< 1; i++){
    
        var itemCreateInfo = new SP.ListItemCreationInformation();
        var oListItem = oList.addItem(itemCreateInfo);  
        oListItem.set_item('Title', litems[i][0]);  
        oListItem.set_item('ColumnType', litems[i][1]);
	    oListItem.set_item('Note', litems[i][2]);

        var PMT = SP.FieldUserValue.fromUser(loginName);
        oListItem.set_item('Assigned', PMT);  

        oListItem.update();
        itemArray[i] = oListItem;
        clientContext.load(itemArray[i]);
    }
    
		clientContext.executeQueryAsync(onQuerySucceeded, onQueryFailed);

//        var loginName = Logg.LoginName.split('|')[1];
        //get display name
//        alert(Logg.Title);
    }
    function onError(error) {
        alert("error");
    }         
    
}

function onQuerySucceeded() {

//    alert('Items created');
location.reload();
}

function onQueryFailed(sender, args) {

    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}
		
            $('.contact-item').click(function(e){return false;})
            $('.contact-item').bind("contextmenu",function(e){return false;});
           
            $("#phone,#meeting,#email,#proposal,#other").sortable({    
                  connectWith: ".actionColumn",
                  items:"ul",
                  placeholder: "contact-item-highlight",
                  receive: function( event, ui ) {
                  var thisThing = $(event.target)
                  var data = thisThing.attr('data')
                  updateListItem(ui.item.attr('id').split('_')[1] ,data , ui.item)
                  }  
            }).disableSelection();
           
            var updateListItem = function(item,data,etarg){
                  position = etarg.position();
                  var outputText = 'Item Successfully Updated';
                  if(data == "DOING (Work InProgress)")
                  {var outputText = 'CONGRATS ! You have started working on this task. Now, please move it to done';}
                  if(data == "DONE")
                  {var outputText = 'You have completed this task. Want to learn more, Please sign up for training';}
                  
 
                  $().SPServices({
                        operation: "UpdateListItems",
                        batchCmd: "Update",
                        listName: "DragList", //Make sure to use the name of your list
                        valuepairs: [["ColumnType",data]],
                        ID: item,
                        completefunc: function(xData, Status) {
                              if(Status != 'success'){ outputText = 'There was an error processing your request.'}
                              $('#output').css({'left':position.left,'top':position.top+75})
                                    .text(outputText)
                                    .fadeIn(900)
                                    .delay(2000)
                                    .fadeOut(900);       
                        }
                  });  

            }
      });              
