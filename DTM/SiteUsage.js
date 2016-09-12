jQuery(document).ready(function ($) {


    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
        var context = new SP.ClientContext.get_current();
        var web = context.get_web();
        var currentUser = web.get_currentUser();
        context.load(currentUser);
        context.executeQueryAsync(
        function () {
            thisUserAccount = currentUser.get_loginName().split('\\')[1];

            function CreateListItemWithDetails(listName, webUrl, newItemTitle, success, failure) {
                var itemType = GetItemTypeForListName(listName);
                var item = {
                    "__metadata": { "type": itemType }, "Title": newItemTitle, "Path": metaPath, "URL": metaURL
                };

                $.ajax({
                    url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items",
                    type: "POST",
                    contentType: "application/json;odata=verbose",
                    data: JSON.stringify(item),
                    headers: {
                        "Accept": "application/json;odata=verbose",
                        "X-RequestDigest": $("#__REQUESTDIGEST").val()
                    },
                    success: function (data) {
                        success(data);
                    },
                    error: function (data) {
                        failure(data);
                    }
                });
            }

            // Get List Item Type metadata
            function GetItemTypeForListName(name) {
                return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
            }

            var listName = "SiteUsage";
            var ItemTitle = document.title;
            var newItemTitle = ItemTitle.toLowerCase();
            var pathname = window.location.pathname
            var URL = document.URL
            var metaURL = URL.toLowerCase();
            var metaPath = pathname.toLowerCase();
            // don't collect data from admins
            if (thisUserAccount == "admin2" || thisUserAccount == "syusic" ) {
                console.log('admin present no stats collected.')
            }
            else {

                CreateListItemWithDetails(listName, _spPageContextInfo.webAbsoluteUrl, newItemTitle, function () {
                    console.log("Usage tracked successfully.");
                }, function () {
                    console.log("Oops, an error occurred. Usage was not tracked");
                });
            }
        },
        function (sender, args) {
            console.log('Request failed. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace());
        });
    });
    // END GET CURRENT USER ID

    // gets full URL and shorter Pathname
    var pathname = window.location.pathname
    var URL = document.URL

    // converts both the full URL and shorter pathname to lower-case
    metaURL = URL.toLowerCase()
    metaPath = pathname.toLowerCase()

}); 



