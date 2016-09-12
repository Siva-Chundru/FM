<%@ Page language="C#" MasterPageFile="~masterurl/default.master"    Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage,Microsoft.SharePoint,Version=15.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document"  %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Import Namespace="Microsoft.SharePoint" %> <%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="ApplicationPages" Namespace="Microsoft.SharePoint.ApplicationPages.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceHolderId="PlaceHolderPageTitle" runat="server">
	<SharePoint:ListProperty Property="TitleOrFolder" runat="server"/> - 
	<SharePoint:ListProperty Property="CurrentViewTitle" runat="server"/></asp:Content>
<asp:content contentplaceholderid="PlaceHolderAdditionalPageHead" runat="server">
	<SharePoint:RssLink runat="server"/>
	 <script type="text/javascript" src="../../SiteAssets/Scripts/jquery-1.12.3.min.js"></script>
      <script type="text/javascript" src="../../SiteAssets/Scripts/jquery-ui.min.js"></script>
      <script type="text/javascript" src="../../SiteAssets/Scripts/jquery.SPServices-2014.02.min.js"></script>
      <script type="text/javascript" src="../../SiteAssets/Drag.js"></script>
      <style type="text/css" >
      .s4-title {display:none;}
      #showRibbon {
            float:right;position:absolute;right:3px; top:3px;
            cursor:pointer; border-bottom:1px solid #333;border-left:1px solid #333;
            width:150px;text-align:center; padding:2px 10px;     
      }
 
      #colWrapper { width:100%;margin:0 auto;}
     #s4-titlerow{
display: none;
height:0px;
border-top:0px;
padding-top:0px;
}
#contentRow{
	padding-top:0px;
}
#contentBox{
	margin-left:0px;
}

     #titleAreaBox{
display: none;
}
     #s4-ribbonrow{
display: none;
}
#contentBox
{
	margin-left:0px;
}
      .actionColumn {
            width:216px;
            display:inline-block;
            padding-bottom:20px;
            padding-left:20px;
            padding-right:20px;
            min-height:100%;
            text-align:left;
      }
      .actionColumn h3{
            text-align:center;
            border-bottom:2px solid #333;
            padding-bottom:3px;
            width:222px;
      }
 
      .contact-item {
            list-style:none;
            cursor:pointer;
            width:200px;
            height:60px;
            padding:10px 10px 20px 10px ;
            margin:0 0 10px 0;
            border:1px solid #666;
            position:relative;
            overflow:hidden;
            color:#555;
      }
      .contact-item-highlight {
            width:200px;
            height:80px;
            padding:10px 10px 20px 10px ;
            margin:0 0 10px 0;
            border:1px solid #dd7;
            background-color:#FFFFAA!important;
      }
     
      .actionColumn:first-child ul { float:left; margin-right:9px;}
      .actionColumn:first-child ul.contact-item-highlight { float:left; }
      .contact-item li:first-child{
            font-weight:bold;
            padding-bottom:5px;
            margin-bottom:5px;
            color:#000;
           
      }
      #phone ul{ background-color:#8EC840}
      #meeting ul { background-color:#F8CD4E;}
      #email ul { background-color:#7BABDF}
      #proposal ul {background-color:#FF9A35}
      #other ul { background-color:#FF7171}
      .titlecontent {
            overflow:hidden; height:20pt;
            width:auto; line-height:10pt; margin:5pt  0 0 5pt;
            color:#000; font-size:9pt; font-style:italic; padding-left:2pt;text-indent:-2pt;
      }
      .author {
            text-align:right; text-transform:capitalize;
            position:absolute; bottom:5px; right:5px;
           
      }
      #output {
            position:absolute;display:none;z-index:10000;
            width: 250px; height:75px;
            text-align:left;
            border:1px solid #ccc; background-color:#fff;
      }
</style>
</asp:content>
<asp:Content ContentPlaceHolderId="PlaceHolderPageImage" runat="server">
	<SharePoint:ViewIcon Width="145" Height="54" runat="server"/></asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderLeftActions" runat="server">
<SharePoint:RecentChangesMenu runat="server" id="RecentChanges"/>
<SharePoint:ModifySettingsLink runat="server"/>
</asp:Content>
<asp:Content ContentPlaceHolderId ="PlaceHolderBodyLeftBorder" runat="server">
	<div height="100%" class="ms-pagemargin"><img src="/_layouts/15/images/blank.gif?rev=23" width='6' height='1' alt="" /></div>
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
		<WebPartPages:WebPartZone runat="server" FrameType="None" ID="Main" Title="loc:Main"><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone>
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderPageDescription" runat="server">
<SharePoint:ListProperty CssClass="ms-listdescription" Property="Description" runat="server"/>
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderCalendarNavigator" runat="server">
	<SharePoint:SPCalendarNavigator id="CalendarNavigatorId" runat="server"/>
  <ApplicationPages:CalendarAggregationPanel id="AggregationPanel" runat="server"/>
</asp:Content>
