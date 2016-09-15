var lname ;
      $(document).ready(function($) {
			 lname = $("#DeltaPlaceHolderPageTitleInTitleArea").text().trim();
     
  	      $('#sideNavBox').hide();
			$('#suiteBar').hide();
			 

          /*  $.ajax({
			    url: _spPageContextInfo.webAbsoluteUrl +'/_api/web/Lists/GetByTitle(\'KanbanTasks\')/Items?$filter=Assigned eq ' + _spPageContextInfo.userId,
			    method: "GET",
			    headers: { "Accept": "application/json; odata=verbose" }, 
			    success: function (data) {
			console.log(data.d.results.length); 
			    },
			    error: function (data) {
			        console.log(data.responseText);
			    }
			});
			
			
			
*/

 $("#sh").click(function() {
            $("#backlog").toggle();
        });

 $.ajax({
        url: "http://sharepoint/sites/PQO/Kanban/_api/web/lists/GetByTitle('" + lname + "')/fields?$filter=EntityPropertyName eq 'Category'",
        type: "GET",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data) {
           
			var option = '<option value="0">All Items</option>';
			for (var i=1;i <= data.d.results[0].Choices.results.length;i++){
			   option += '<option value="'+ i + '">' + data.d.results[0].Choices.results[i-1] + '</option>';
			}
			$('#category').append(option);
			
			var category = getParameterByName('Category');
				  if(category == "*")
				  {
				  category = "*";
				  }
				  
				  $("#category option").each(function() {
				  if($(this).text() == category) {
				    $(this).attr('selected', 'selected');            
				  }                        
				});

				$("#category").change(function () {
				  var cat = $('#category option:selected').text();
				  if(cat == "All Items")
				  {
				  cat = "*";
				  }
				            window.open("http://sharepoint/sites/PQO/Kanban/Lists/Test/KanbanBoard.aspx?Category=" + cat ,"_self")
				  });

			
        },
        error: function (error) {
            alert(JSON.stringify(error));
        }

    });
			$('#kanbantitle').text($('#DeltaPlaceHolderPageTitleInTitleArea').text());
					
            $('.author').click(function(e){return false;})
            $('.author').bind("contextmenu",function(e){return false;});
/*            $('img[id*="img_"]').each(function(){
//            alert($(this).attr('id').split("_")[1]);
            $(this).wrap($('<a>',{
   			href: 'http://sharepoint/sites/PQO/Reporting/Lists/KanbanTasks/Editform.aspx?ID=' + $(this).attr('id').split("_")[1]
			}));
            });
*/           
            $("#analysis,#construction,#acceptance").sortable({    
                  connectWith: ".actionColumn",
                  items:"ul",
                  placeholder: "contact-item-highlight",
                  receive: function( event, ui ) {
                  var thisThing = $(event.target)
                  var data = thisThing.attr('data')
                  updateListItem(ui.item.attr('id').split('_')[1] ,data , ui.item)
                  }  
            }).disableSelection();
              $("#Done,#backlog").sortable({    
				  connectWith: ".actionColumn",
                  items:"ul",
                  placeholder: "contact-item-highlight",
                  receive: function( event, ui ) {
                  var thisThing = $(event.target)
                  var data = thisThing.attr('data')
                  updateListItem1(ui.item.attr('id').split('_')[1] ,data , ui.item )
                  }  
            }).disableSelection();

                       var updateListItem1 = function(item,data,etarg){
                  position = etarg.position();
//                  alert(data.split('-')[0]);
//                  alert(item);
                  var outputText = 'Item Successfully Updated';

                  $().SPServices({
                        operation: "UpdateListItems",
                        batchCmd: "Update",
                        listName: lname, //Make sure to use the name of your list
                        valuepairs: [["Status",data.split('-')[0]]],
                        ID: item,
                        completefunc: function(xData, Status) {
                              if(Status != 'success'){ outputText = 'There was an error processing your request.'}
                              $('#output').css({'left':position.left,'top':position.top+75})
                                    .text(outputText)
                                    .fadeIn(200)
                                    .delay(500)
                                    .fadeOut(200);       
                          
                        }
                  });  

            }

           
           
            var updateListItem = function(item,data,etarg){
                  position = etarg.position();
                  
               //   alert(data.split('-')[0]);
               //   alert(data.split('-')[1]);
                  var outputText = 'Item Successfully Updated';

                  $().SPServices({
                        operation: "UpdateListItems",
                        batchCmd: "Update",
                        listName: lname, //Make sure to use the name of your list
                        valuepairs: [["Status",data.split('-')[0]],["Service",data.split('-')[1]]],
                        ID: item,
                        completefunc: function(xData, Status) {
                              if(Status != 'success'){ outputText = 'There was an error processing your request.'}
                            $('#output').css({'left':position.left,'top':position.top+75})
                                    .text(outputText)
                                    .fadeIn(200)
                                    .delay(500)
                                    .fadeOut(200);       
                        }
                  });  

            }
            
      });              


            //function to open pages in a dialog
function openInDialog1(dlgWidth, dlgHeight, dlgAllowMaximize,dlgShowClose,needCallbackFunction, pageUrl)
{
var url = window.location.href;
var url_parts = url.replace(/\/\s*$/,'').split('/'); 
url_parts.shift(); 

var pUrl = "/sites/PQO/Kanban/Lists/" + url_parts[url_parts.length - 2] + "/EditForm.aspx?ID=" + pageUrl;
var options = { url: pUrl, width: dlgWidth, height: dlgHeight, allowMaximize: dlgAllowMaximize,
showClose: dlgShowClose
};
if(needCallbackFunction)
{
options.dialogReturnValueCallback = Function.createDelegate(null,CloseDialogCallback);
}
SP.SOD.execute("sp.ui.dialog.js", "SP.UI.ModalDialog.showModalDialog", options);
}


            //function to open pages in a dialog
function openInDialog(dlgWidth, dlgHeight, dlgAllowMaximize,dlgShowClose,needCallbackFunction, pageUrl)
{
var url = window.location.href;
var url_parts = url.replace(/\/\s*$/,'').split('/'); 
url_parts.shift(); 

var pUrl = "/sites/PQO/Kanban/Lists/" + url_parts[url_parts.length - 2] + pageUrl ;
var options = { url: pUrl, width: dlgWidth, height: dlgHeight, allowMaximize: dlgAllowMaximize,
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

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


    