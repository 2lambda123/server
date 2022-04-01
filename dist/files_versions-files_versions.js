/*! For license information please see files_versions-files_versions.js.LICENSE.txt */
!function(){var e,i={22420:function(e,i,o){"use strict";o(29088),o(47673);var l=o(94702),s=o.n(l),r=o(97834),a=o.n(r);!function(){if(OCA.Files.DetailTabView){var e=OCA.Files.DetailTabView.extend({id:"versionsTabView",className:"tab versionsTabView",_template:null,$versionsContainer:null,events:{"click .revertVersion":"_onClickRevertVersion"},initialize:function(){OCA.Files.DetailTabView.prototype.initialize.apply(this,arguments),this.collection=new OCA.Versions.VersionCollection,this.collection.on("request",this._onRequest,this),this.collection.on("sync",this._onEndRequest,this),this.collection.on("update",this._onUpdate,this),this.collection.on("error",this._onError,this),this.collection.on("add",this._onAddModel,this)},getLabel:function(){return t("files_versions","Versions")},getIcon:function(){return"icon-history"},nextPage:function(){this._loading||this.collection.getFileInfo()&&this.collection.getFileInfo().isDirectory()||this.collection.fetch()},_onClickRevertVersion:function(e){var n=this,i=$(e.target),o=this.collection.getFileInfo();i.is("li")||(i=i.closest("li")),e.preventDefault();var l=i.attr("data-revision"),s=this.collection.get(l);s.revert({success:function(){n.$versionsContainer.empty(),n.collection.setFileInfo(o),n.collection.reset([],{silent:!0}),n.collection.fetch(),n.$el.find(".versions").removeClass("hidden"),o.trigger("busy",o,!1),o.set({size:s.get("size"),mtime:1e3*s.get("timestamp"),etag:s.get("id")+s.get("timestamp")})},error:function(){o.trigger("busy",o,!1),n.$el.find(".versions").removeClass("hidden"),n._toggleLoading(!1),OC.Notification.show(t("files_version","Failed to revert {file} to revision {timestamp}.",{file:s.getFullPath(),timestamp:OC.Util.formatDate(1e3*s.get("timestamp"))}),{type:"error"})}}),this._toggleLoading(!0),o.trigger("busy",o,!0)},_toggleLoading:function(e){this._loading=e,this.$el.find(".loading").toggleClass("hidden",!e)},_onRequest:function(){this._toggleLoading(!0)},_onEndRequest:function(){this._toggleLoading(!1),this.$el.find(".empty").toggleClass("hidden",!!this.collection.length)},_onAddModel:function(e){var n=$(this.itemTemplate(this._formatItem(e)));this.$versionsContainer.append(n),n.find(".has-tooltip").tooltip()},template:function(e){return a()(e)},itemTemplate:function(e){return s()(e)},setFileInfo:function(e){e?(this.render(),this.collection.setFileInfo(e),this.collection.reset([],{silent:!0}),this.nextPage()):(this.render(),this.collection.reset())},_formatItem:function(e){var i=1e3*e.get("timestamp"),o=e.has("size")?e.get("size"):0,l=OC.MimeType.getIconUrl(e.get("mimetype")),s=new Image;return s.onload=function(){$("li[data-revision="+e.get("id")+"] .preview").attr("src",e.getPreviewUrl())},s.src=e.getPreviewUrl(),_.extend({versionId:e.get("id"),formattedTimestamp:OC.Util.formatDate(i),relativeTimestamp:OC.Util.relativeModifiedDate(i),millisecondsTimestamp:i,humanReadableSize:OC.Util.humanFileSize(o,!0),altSize:n("files","%n byte","%n bytes",o),hasDetails:e.has("size"),downloadUrl:e.getDownloadUrl(),downloadIconUrl:OC.imagePath("core","actions/download"),downloadName:e.get("name"),revertIconUrl:OC.imagePath("core","actions/history"),previewUrl:l,revertLabel:t("files_versions","Restore"),canRevert:0!=(this.collection.getFileInfo().get("permissions")&OC.PERMISSION_UPDATE)},e.attributes)},render:function(){this.$el.html(this.template({emptyResultLabel:t("files_versions","No other versions available")})),this.$el.find(".has-tooltip").tooltip(),this.$versionsContainer=this.$el.find("ul.versions"),this.delegateEvents()},canDisplay:function(e){return!!e&&!e.isDirectory()}});OCA.Versions=OCA.Versions||{},OCA.Versions.VersionsTabView=e}}(),o(29020);var c=o(93379),u=o.n(c),d=o(7795),p=o.n(d),h=o(90569),m=o.n(h),f=o(3565),v=o.n(f),A=o(19216),g=o.n(A),C=o(44589),b=o.n(C),w=o(42028),y={};y.styleTagTransform=b(),y.setAttributes=v(),y.insert=m().bind(null,"head"),y.domAPI=p(),y.insertStyleElement=g(),u()(w.Z,y),w.Z&&w.Z.locals&&w.Z.locals,window.OCA.Versions=OCA.Versions},29020:function(){OCA.Versions=OCA.Versions||{},OCA.Versions.Util={attach:function(e){"trashbin"!==e.id&&"files.public"!==e.id&&e.registerTabView(new OCA.Versions.VersionsTabView("versionsTabView",{order:-10}))}},OC.Plugins.register("OCA.Files.FileList",OCA.Versions.Util)},47673:function(){var e;e=OC.Backbone.Collection.extend({model:OCA.Versions.VersionModel,sync:OC.Backbone.davSync,_fileInfo:null,_currentUser:null,_client:null,setFileInfo:function(e){this._fileInfo=e},getFileInfo:function(){return this._fileInfo},setCurrentUser:function(e){this._currentUser=e},getCurrentUser:function(){return this._currentUser||OC.getCurrentUser().uid},setClient:function(e){this._client=e},getClient:function(){return this._client||new OC.Files.Client({host:OC.getHost(),root:OC.linkToRemoteBase("dav")+"/versions/"+this.getCurrentUser(),useHTTPS:"https"===OC.getProtocol()})},url:function(){return OC.linkToRemoteBase("dav")+"/versions/"+this.getCurrentUser()+"/versions/"+this._fileInfo.get("id")},parse:function(e){var n=this._fileInfo.getFullPath(),t=this._fileInfo.get("id"),i=this._fileInfo.get("name"),o=this.getCurrentUser(),l=this.getClient();return _.map(e,(function(e){return e.fullPath=n,e.fileId=t,e.name=i,e.timestamp=parseInt(moment(new Date(e.timestamp)).format("X"),10),e.id=OC.basename(e.href),e.size=parseInt(e.size,10),e.user=o,e.client=l,e}))}}),OCA.Versions=OCA.Versions||{},OCA.Versions.VersionCollection=e},29088:function(){var e;e=OC.Backbone.Model.extend({sync:OC.Backbone.davSync,davProperties:{size:"{DAV:}getcontentlength",mimetype:"{DAV:}getcontenttype",timestamp:"{DAV:}getlastmodified"},revert:function(e){e=e?_.clone(e):{};var n=this;return this.get("client").move("/versions/"+this.get("fileId")+"/"+this.get("id"),"/restore/target",!0).done((function(){e.success&&e.success.call(e.context,n,{},e),n.trigger("revert",n,e)})).fail((function(){e.error&&e.error.call(e.context,n,{},e),n.trigger("error",n,{},e)}))},getFullPath:function(){return this.get("fullPath")},getPreviewUrl:function(){var e=OC.generateUrl("/apps/files_versions/preview"),n={file:this.get("fullPath"),version:this.get("id")};return e+"?"+OC.buildQueryString(n)},getDownloadUrl:function(){return OC.linkToRemoteBase("dav")+"/versions/"+this.get("user")+"/versions/"+this.get("fileId")+"/"+this.get("id")}}),OCA.Versions=OCA.Versions||{},OCA.Versions.VersionModel=e},42028:function(e,n,t){"use strict";var i=t(87537),o=t.n(i),l=t(23645),s=t.n(l)()(o());s.push([e.id,".versionsTabView .clear-float {\n\tclear: both;\n}\n\n.versionsTabView li {\n\twidth: 100%;\n\tcursor: default;\n\theight: 56px;\n\tfloat: left;\n\tborder-bottom: 1px solid rgba(100,100,100,.1);\n}\n.versionsTabView li:last-child {\n\tborder-bottom: none;\n}\n\n.versionsTabView a,\n.versionsTabView div > span {\n\tvertical-align: middle;\n\topacity: .5;\n}\n\n.versionsTabView li a{\n\tpadding: 15px 10px 11px;\n}\n\n.versionsTabView a:hover,\n.versionsTabView a:focus {\n\topacity: 1;\n}\n\n.versionsTabView .preview-container {\n\tdisplay: inline-block;\n  vertical-align: top;\n}\n\n.versionsTabView img {\n\tcursor: pointer;\n\tpadding-right: 4px;\n}\n\n.versionsTabView img.preview {\n\tcursor: default;\n}\n\n.versionsTabView .version-container {\n\tdisplay: inline-block;\n}\n\n.versionsTabView .versiondate {\n\tmin-width: 100px;\n\tvertical-align: super;\n}\n\n.versionsTabView .version-details {\n\ttext-align: left;\n}\n\n.versionsTabView .version-details > span {\n\tpadding: 0 10px;\n}\n\n.versionsTabView .revertVersion {\n\tcursor: pointer;\n\tfloat: right;\n\tmargin-right: -10px;\n}\n","",{version:3,sources:["webpack://./apps/files_versions/src/css/versions.css"],names:[],mappings:"AAAA;CACC,WAAW;AACZ;;AAEA;CACC,WAAW;CACX,eAAe;CACf,YAAY;CACZ,WAAW;CACX,6CAA6C;AAC9C;AACA;CACC,mBAAmB;AACpB;;AAEA;;CAEC,sBAAsB;CACtB,WAAW;AACZ;;AAEA;CACC,uBAAuB;AACxB;;AAEA;;CAEC,UAAU;AACX;;AAEA;CACC,qBAAqB;EACpB,mBAAmB;AACrB;;AAEA;CACC,eAAe;CACf,kBAAkB;AACnB;;AAEA;CACC,eAAe;AAChB;;AAEA;CACC,qBAAqB;AACtB;;AAEA;CACC,gBAAgB;CAChB,qBAAqB;AACtB;;AAEA;CACC,gBAAgB;AACjB;;AAEA;CACC,eAAe;AAChB;;AAEA;CACC,eAAe;CACf,YAAY;CACZ,mBAAmB;AACpB",sourcesContent:[".versionsTabView .clear-float {\n\tclear: both;\n}\n\n.versionsTabView li {\n\twidth: 100%;\n\tcursor: default;\n\theight: 56px;\n\tfloat: left;\n\tborder-bottom: 1px solid rgba(100,100,100,.1);\n}\n.versionsTabView li:last-child {\n\tborder-bottom: none;\n}\n\n.versionsTabView a,\n.versionsTabView div > span {\n\tvertical-align: middle;\n\topacity: .5;\n}\n\n.versionsTabView li a{\n\tpadding: 15px 10px 11px;\n}\n\n.versionsTabView a:hover,\n.versionsTabView a:focus {\n\topacity: 1;\n}\n\n.versionsTabView .preview-container {\n\tdisplay: inline-block;\n  vertical-align: top;\n}\n\n.versionsTabView img {\n\tcursor: pointer;\n\tpadding-right: 4px;\n}\n\n.versionsTabView img.preview {\n\tcursor: default;\n}\n\n.versionsTabView .version-container {\n\tdisplay: inline-block;\n}\n\n.versionsTabView .versiondate {\n\tmin-width: 100px;\n\tvertical-align: super;\n}\n\n.versionsTabView .version-details {\n\ttext-align: left;\n}\n\n.versionsTabView .version-details > span {\n\tpadding: 0 10px;\n}\n\n.versionsTabView .revertVersion {\n\tcursor: pointer;\n\tfloat: right;\n\tmargin-right: -10px;\n}\n"],sourceRoot:""}]),n.Z=s},94702:function(e,n,t){var i=t(40202);e.exports=(i.default||i).template({1:function(e,n,t,i,o){var l,s=null!=n?n:e.nullContext||{},r=e.hooks.helperMissing,a="function",c=e.escapeExpression,u=e.lookupProperty||function(e,n){if(Object.prototype.hasOwnProperty.call(e,n))return e[n]};return'\t\t\t\t<div class="version-details">\n\t\t\t\t\t<span class="size has-tooltip" title="'+c(typeof(l=null!=(l=u(t,"altSize")||(null!=n?u(n,"altSize"):n))?l:r)===a?l.call(s,{name:"altSize",hash:{},data:o,loc:{start:{line:14,column:43},end:{line:14,column:54}}}):l)+'">'+c(typeof(l=null!=(l=u(t,"humanReadableSize")||(null!=n?u(n,"humanReadableSize"):n))?l:r)===a?l.call(s,{name:"humanReadableSize",hash:{},data:o,loc:{start:{line:14,column:56},end:{line:14,column:77}}}):l)+"</span>\n\t\t\t\t</div>\n"},3:function(e,n,t,i,o){var l,s=null!=n?n:e.nullContext||{},r=e.hooks.helperMissing,a="function",c=e.escapeExpression,u=e.lookupProperty||function(e,n){if(Object.prototype.hasOwnProperty.call(e,n))return e[n]};return'\t\t\t<a href="#" class="revertVersion" title="'+c(typeof(l=null!=(l=u(t,"revertLabel")||(null!=n?u(n,"revertLabel"):n))?l:r)===a?l.call(s,{name:"revertLabel",hash:{},data:o,loc:{start:{line:19,column:44},end:{line:19,column:59}}}):l)+'"><img src="'+c(typeof(l=null!=(l=u(t,"revertIconUrl")||(null!=n?u(n,"revertIconUrl"):n))?l:r)===a?l.call(s,{name:"revertIconUrl",hash:{},data:o,loc:{start:{line:19,column:71},end:{line:19,column:88}}}):l)+'" /></a>\n'},compiler:[8,">= 4.3.0"],main:function(e,n,t,i,o){var l,s,r,a=null!=n?n:e.nullContext||{},c=e.hooks.helperMissing,u="function",d=e.escapeExpression,p=e.hooks.blockHelperMissing,h=e.lookupProperty||function(e,n){if(Object.prototype.hasOwnProperty.call(e,n))return e[n]},m='<li data-revision="'+d(typeof(s=null!=(s=h(t,"id")||(null!=n?h(n,"id"):n))?s:c)===u?s.call(a,{name:"id",hash:{},data:o,loc:{start:{line:1,column:19},end:{line:1,column:25}}}):s)+'">\n\t<div>\n\t\t<div class="preview-container">\n\t\t\t<img class="preview" src="'+d(typeof(s=null!=(s=h(t,"previewUrl")||(null!=n?h(n,"previewUrl"):n))?s:c)===u?s.call(a,{name:"previewUrl",hash:{},data:o,loc:{start:{line:4,column:29},end:{line:4,column:43}}}):s)+'" width="44" height="44"/>\n\t\t</div>\n\t\t<div class="version-container">\n\t\t\t<div>\n\t\t\t\t<a href="'+d(typeof(s=null!=(s=h(t,"downloadUrl")||(null!=n?h(n,"downloadUrl"):n))?s:c)===u?s.call(a,{name:"downloadUrl",hash:{},data:o,loc:{start:{line:8,column:13},end:{line:8,column:28}}}):s)+'" class="downloadVersion" download="'+d(typeof(s=null!=(s=h(t,"downloadName")||(null!=n?h(n,"downloadName"):n))?s:c)===u?s.call(a,{name:"downloadName",hash:{},data:o,loc:{start:{line:8,column:64},end:{line:8,column:80}}}):s)+'"><img src="'+d(typeof(s=null!=(s=h(t,"downloadIconUrl")||(null!=n?h(n,"downloadIconUrl"):n))?s:c)===u?s.call(a,{name:"downloadIconUrl",hash:{},data:o,loc:{start:{line:8,column:92},end:{line:8,column:111}}}):s)+'" />\n\t\t\t\t\t<span class="versiondate has-tooltip live-relative-timestamp" data-timestamp="'+d(typeof(s=null!=(s=h(t,"millisecondsTimestamp")||(null!=n?h(n,"millisecondsTimestamp"):n))?s:c)===u?s.call(a,{name:"millisecondsTimestamp",hash:{},data:o,loc:{start:{line:9,column:83},end:{line:9,column:108}}}):s)+'" title="'+d(typeof(s=null!=(s=h(t,"formattedTimestamp")||(null!=n?h(n,"formattedTimestamp"):n))?s:c)===u?s.call(a,{name:"formattedTimestamp",hash:{},data:o,loc:{start:{line:9,column:117},end:{line:9,column:139}}}):s)+'">'+d(typeof(s=null!=(s=h(t,"relativeTimestamp")||(null!=n?h(n,"relativeTimestamp"):n))?s:c)===u?s.call(a,{name:"relativeTimestamp",hash:{},data:o,loc:{start:{line:9,column:141},end:{line:9,column:162}}}):s)+"</span>\n\t\t\t\t</a>\n\t\t\t</div>\n";return s=null!=(s=h(t,"hasDetails")||(null!=n?h(n,"hasDetails"):n))?s:c,r={name:"hasDetails",hash:{},fn:e.program(1,o,0),inverse:e.noop,data:o,loc:{start:{line:12,column:3},end:{line:16,column:18}}},l=typeof s===u?s.call(a,r):s,h(t,"hasDetails")||(l=p.call(n,l,r)),null!=l&&(m+=l),m+="\t\t</div>\n",s=null!=(s=h(t,"canRevert")||(null!=n?h(n,"canRevert"):n))?s:c,r={name:"canRevert",hash:{},fn:e.program(3,o,0),inverse:e.noop,data:o,loc:{start:{line:18,column:2},end:{line:20,column:16}}},l=typeof s===u?s.call(a,r):s,h(t,"canRevert")||(l=p.call(n,l,r)),null!=l&&(m+=l),m+"\t</div>\n</li>\n"},useData:!0})},97834:function(e,n,t){var i=t(40202);e.exports=(i.default||i).template({compiler:[8,">= 4.3.0"],main:function(e,n,t,i,o){var l,s=null!=n?n:e.nullContext||{},r=e.hooks.helperMissing,a="function",c=e.escapeExpression,u=e.lookupProperty||function(e,n){if(Object.prototype.hasOwnProperty.call(e,n))return e[n]};return'<ul class="versions"></ul>\n<div class="clear-float"></div>\n<div class="empty hidden">\n\t<div class="emptycontent">\n\t\t<div class="icon-history"></div>\n\t\t<p>'+c(typeof(l=null!=(l=u(t,"emptyResultLabel")||(null!=n?u(n,"emptyResultLabel"):n))?l:r)===a?l.call(s,{name:"emptyResultLabel",hash:{},data:o,loc:{start:{line:6,column:5},end:{line:6,column:25}}}):l)+'</p>\n\t</div>\n</div>\n<input type="button" class="showMoreVersions hidden" value="'+c(typeof(l=null!=(l=u(t,"moreVersionsLabel")||(null!=n?u(n,"moreVersionsLabel"):n))?l:r)===a?l.call(s,{name:"moreVersionsLabel",hash:{},data:o,loc:{start:{line:9,column:60},end:{line:9,column:81}}}):l)+'" name="show-more-versions" id="show-more-versions" />\n<div class="loading hidden" style="height: 50px"></div>\n'},useData:!0})}},o={};function l(e){var n=o[e];if(void 0!==n)return n.exports;var t=o[e]={id:e,loaded:!1,exports:{}};return i[e].call(t.exports,t,t.exports,l),t.loaded=!0,t.exports}l.m=i,l.amdD=function(){throw new Error("define cannot be used indirect")},l.amdO={},e=[],l.O=function(n,t,i,o){if(!t){var s=1/0;for(u=0;u<e.length;u++){t=e[u][0],i=e[u][1],o=e[u][2];for(var r=!0,a=0;a<t.length;a++)(!1&o||s>=o)&&Object.keys(l.O).every((function(e){return l.O[e](t[a])}))?t.splice(a--,1):(r=!1,o<s&&(s=o));if(r){e.splice(u--,1);var c=i();void 0!==c&&(n=c)}}return n}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[t,i,o]},l.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(n,{a:n}),n},l.d=function(e,n){for(var t in n)l.o(n,t)&&!l.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},l.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),l.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e},l.j=1358,function(){l.b=document.baseURI||self.location.href;var e={1358:0};l.O.j=function(n){return 0===e[n]};var n=function(n,t){var i,o,s=t[0],r=t[1],a=t[2],c=0;if(s.some((function(n){return 0!==e[n]}))){for(i in r)l.o(r,i)&&(l.m[i]=r[i]);if(a)var u=a(l)}for(n&&n(t);c<s.length;c++)o=s[c],l.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return l.O(u)},t=self.webpackChunknextcloud=self.webpackChunknextcloud||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))}();var s=l.O(void 0,[7874],(function(){return l(22420)}));s=l.O(s)}();
//# sourceMappingURL=files_versions-files_versions.js.map?v=68f4bf4fb28e8b7a3a3f