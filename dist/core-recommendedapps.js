/*! For license information please see core-recommendedapps.js.LICENSE.txt */
!function(){"use strict";var n,t={12996:function(n,t,e){var a,o=e(22200),r=e(9944),i=e(20144),s=e(17499),c=null===(a=(0,o.getCurrentUser)())?(0,s.getLoggerBuilder)().setApp("core").build():(0,s.getLoggerBuilder)().setApp("core").setUid(a.uid).build(),l=e(4820),p=e(79753),d=e(16453),u=e(63560),f=e(93379),g=e.n(f),m=e(7795),A=e.n(m),h=e(90569),v=e.n(h),b=e(3565),C=e.n(b),x=e(19216),_=e.n(x),w=e(44589),y=e.n(w),k=e(54887),B={};B.styleTagTransform=y(),B.setAttributes=C(),B.insert=v().bind(null,"head"),B.domAPI=A(),B.insertStyleElement=_(),g()(k.Z,B),k.Z&&k.Z.locals&&k.Z.locals;var P=e(51900),I=(0,P.Z)({name:"InstallButton"},(function(){var n=this,t=n.$createElement;return(n._self._c||t)("button",n._g({staticClass:"primary",attrs:{autofocus:!0}},n.$listeners),[n._v("\n\t"+n._s(n.t("core","Install recommended apps"))+"\n")])}),[],!1,null,"3933c599",null).exports;function O(n,t,e,a,o,r,i){try{var s=n[r](i),c=s.value}catch(n){return void e(n)}s.done?t(c):Promise.resolve(c).then(a,o)}var E={calendar:{description:(0,r.translate)("core","Schedule work & meetings, synced with all your devices."),icon:(0,p.imagePath)("core","places/calendar.svg")},contacts:{description:(0,r.translate)("core","Keep your colleagues and friends in one place without leaking their private info."),icon:(0,p.imagePath)("core","places/contacts.svg")},mail:{description:(0,r.translate)("core","Simple email app nicely integrated with Files, Contacts and Calendar."),icon:(0,p.imagePath)("core","actions/mail.svg")},spreed:{description:(0,r.translate)("core","Chatting, video calls, screensharing, online meetings and web conferencing – in your browser and with mobile apps."),icon:(0,p.imagePath)("core","apps/spreed.svg")},richdocuments:{description:(0,r.translate)("core","Collaboratively edit office documents."),icon:(0,p.imagePath)("core","apps/richdocuments.svg")},richdocumentscode:{description:(0,r.translate)("core","Local document editing back-end used by the Collabora Online app."),icon:(0,p.imagePath)("core","apps/richdocumentscode.svg")}},Z=Object.keys(E),D=(0,d.loadState)("core","defaultPageUrl"),j={name:"RecommendedApps",components:{InstallButton:I},data:function(){return{showInstallButton:!1,installingApps:!1,loadingApps:!0,loadingAppsError:!1,apps:[],defaultPageUrl:D}},computed:{recommendedApps:function(){return this.apps.filter((function(n){return Z.includes(n.id)}))}},mounted:function(){var n,t=this;return(n=regeneratorRuntime.mark((function n(){var e,a;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,l.default.get((0,p.generateUrl)("settings/apps/list"));case 3:e=n.sent,a=e.data,c.info("".concat(a.apps.length," apps fetched")),t.apps=a.apps.map((function(n){return Object.assign(n,{loading:!1,installationError:!1})})),c.debug("".concat(t.recommendedApps.length," recommended apps found"),{apps:t.recommendedApps}),t.showInstallButton=!0,n.next=15;break;case 11:n.prev=11,n.t0=n.catch(0),c.error("could not fetch app list",{error:n.t0}),t.loadingAppsError=!0;case 15:return n.prev=15,t.loadingApps=!1,n.finish(15);case 18:case"end":return n.stop()}}),n,null,[[0,11,15,18]])})),function(){var t=this,e=arguments;return new Promise((function(a,o){var r=n.apply(t,e);function i(n){O(r,a,o,i,s,"next",n)}function s(n){O(r,a,o,i,s,"throw",n)}i(void 0)}))})()},methods:{installApps:function(){this.showInstallButton=!1,this.installingApps=!0;var n=(0,u.Z)(1),t=this.recommendedApps.filter((function(n){return!n.active&&n.isCompatible&&n.canInstall})).map((function(t){return n((function(){return c.info("installing ".concat(t.id)),t.loading=!0,l.default.post((0,p.generateUrl)("settings/apps/enable"),{appIds:[t.id],groups:[]}).catch((function(n){c.error("could not install ".concat(t.id),{error:n}),t.installationError=!0})).then((function(){c.info("installed ".concat(t.id)),t.loading=!1}))}))}));c.debug("installing ".concat(t.length," recommended apps")),Promise.all(t).then((function(){c.info("all recommended apps installed, redirecting …"),window.location=D})).catch((function(n){return c.error("could not install recommended apps",{error:n})}))},customIcon:function(n){return n in E&&E[n].icon?E[n].icon:(c.warn("no app icon for recommended app ".concat(n)),(0,p.imagePath)("core","places/default-app-icon.svg"))},customDescription:function(n){return n in E?E[n].description:(c.warn("no app description for recommended app ".concat(n)),"")}}},S=j,T=e(12135),U={};U.styleTagTransform=y(),U.setAttributes=C(),U.insert=v().bind(null,"head"),U.domAPI=A(),U.insertStyleElement=_(),g()(T.Z,U),T.Z&&T.Z.locals&&T.Z.locals;var R=(0,P.Z)(S,(function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"body-login-container"},[e("h2",[n._v(n._s(n.t("core","Recommended apps")))]),n._v(" "),n.loadingApps?e("p",{staticClass:"loading text-center"},[n._v("\n\t\t"+n._s(n.t("core","Loading apps …"))+"\n\t")]):n.loadingAppsError?e("p",{staticClass:"loading-error text-center"},[n._v("\n\t\t"+n._s(n.t("core","Could not fetch list of apps from the App Store."))+"\n\t")]):n.installingApps?e("p",{staticClass:"text-center"},[n._v("\n\t\t"+n._s(n.t("core","Installing apps …"))+"\n\t")]):n._e(),n._v(" "),n._l(n.recommendedApps,(function(t){return e("div",{key:t.id,staticClass:"app"},[e("img",{attrs:{src:n.customIcon(t.id),alt:""}}),n._v(" "),e("div",{staticClass:"info"},[e("h3",[n._v("\n\t\t\t\t"+n._s(t.name)+"\n\t\t\t\t"),t.loading?e("span",{staticClass:"icon icon-loading-small-dark"}):t.active?e("span",{staticClass:"icon icon-checkmark-white"}):n._e()]),n._v(" "),e("p",{domProps:{innerHTML:n._s(n.customDescription(t.id))}}),n._v(" "),t.installationError?e("p",[e("strong",[n._v(n._s(n.t("core","App download or installation failed")))])]):t.isCompatible?t.canInstall?n._e():e("p",[e("strong",[n._v(n._s(n.t("core","Cannot install this app")))])]):e("p",[e("strong",[n._v(n._s(n.t("core","Cannot install this app because it is not compatible")))])])])])})),n._v(" "),n.showInstallButton?e("InstallButton",{on:{click:function(t){return t.stopPropagation(),t.preventDefault(),n.installApps.apply(null,arguments)}}}):n._e(),n._v(" "),e("p",{staticClass:"text-center"},[e("a",{attrs:{href:n.defaultPageUrl}},[n._v(n._s(n.t("core","Cancel")))])])],2)}),[],!1,null,"cbe02e2a",null),G=R.exports;e.nc=btoa((0,o.getRequestToken)()),i.default.mixin({methods:{t:r.translate}}),(new(i.default.extend(G))).$mount("#recommended-apps"),c.debug("recommended apps view rendered")},54887:function(n,t,e){var a=e(87537),o=e.n(a),r=e(23645),i=e.n(r)()(o());i.push([n.id,"button[data-v-3933c599]{margin:24px auto 10px auto;padding:10px 20px;font-size:20px}","",{version:3,sources:["webpack://./core/src/components/setup/InstallButton.vue"],names:[],mappings:"AAqCA,wBACC,0BAAA,CACA,iBAAA,CACA,cAAA",sourcesContent:["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nbutton {\n\tmargin: 24px auto 10px auto;\n\tpadding: 10px 20px;\n\tfont-size: 20px;\n}\n"],sourceRoot:""}]),t.Z=i},12135:function(n,t,e){var a=e(87537),o=e.n(a),r=e(23645),i=e.n(r)()(o());i.push([n.id,"p.loading[data-v-cbe02e2a],p.loading-error[data-v-cbe02e2a]{height:100px}p[data-v-cbe02e2a]:last-child{margin-top:10px}.text-center[data-v-cbe02e2a]{text-align:center}.app[data-v-cbe02e2a]{display:flex;flex-direction:row}.app img[data-v-cbe02e2a]{height:50px;width:50px;filter:invert(1)}.app img[data-v-cbe02e2a],.app .info[data-v-cbe02e2a]{padding:12px}.app .info h3[data-v-cbe02e2a],.app .info p[data-v-cbe02e2a]{text-align:left}.app .info h3[data-v-cbe02e2a]{color:#fff;margin-top:0}.app .info h3>span.icon[data-v-cbe02e2a]{display:inline-block}","",{version:3,sources:["webpack://./core/src/components/setup/RecommendedApps.vue"],names:[],mappings:"AAoMC,4DAEC,YAAA,CAGD,8BACC,eAAA,CAIF,8BACC,iBAAA,CAGD,sBACC,YAAA,CACA,kBAAA,CAEA,0BACC,WAAA,CACA,UAAA,CACA,gBAAA,CAGD,sDACC,YAAA,CAIA,6DACC,eAAA,CAGD,+BACC,UAAA,CACA,YAAA,CAGD,yCACC,oBAAA",sourcesContent:["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.body-login-container {\n\n}\n\np {\n\t&.loading,\n\t&.loading-error {\n\t\theight: 100px;\n\t}\n\n\t&:last-child {\n\t\tmargin-top: 10px;\n\t}\n}\n\n.text-center {\n\ttext-align: center;\n}\n\n.app {\n\tdisplay: flex;\n\tflex-direction: row;\n\n\timg {\n\t\theight: 50px;\n\t\twidth: 50px;\n\t\tfilter: invert(1);\n\t}\n\n\timg, .info {\n\t\tpadding: 12px;\n\t}\n\n\t.info {\n\t\th3, p {\n\t\t\ttext-align: left;\n\t\t}\n\n\t\th3 {\n\t\t\tcolor: #fff;\n\t\t\tmargin-top: 0;\n\t\t}\n\n\t\th3 > span.icon {\n\t\t\tdisplay: inline-block;\n\t\t}\n\t}\n}\n"],sourceRoot:""}]),t.Z=i}},e={};function a(n){var o=e[n];if(void 0!==o)return o.exports;var r=e[n]={id:n,loaded:!1,exports:{}};return t[n].call(r.exports,r,r.exports,a),r.loaded=!0,r.exports}a.m=t,a.amdD=function(){throw new Error("define cannot be used indirect")},a.amdO={},n=[],a.O=function(t,e,o,r){if(!e){var i=1/0;for(p=0;p<n.length;p++){e=n[p][0],o=n[p][1],r=n[p][2];for(var s=!0,c=0;c<e.length;c++)(!1&r||i>=r)&&Object.keys(a.O).every((function(n){return a.O[n](e[c])}))?e.splice(c--,1):(s=!1,r<i&&(i=r));if(s){n.splice(p--,1);var l=o();void 0!==l&&(t=l)}}return t}r=r||0;for(var p=n.length;p>0&&n[p-1][2]>r;p--)n[p]=n[p-1];n[p]=[e,o,r]},a.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return a.d(t,{a:t}),t},a.d=function(n,t){for(var e in t)a.o(t,e)&&!a.o(n,e)&&Object.defineProperty(n,e,{enumerable:!0,get:t[e]})},a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),a.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},a.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},a.nmd=function(n){return n.paths=[],n.children||(n.children=[]),n},a.j=1033,function(){a.b=document.baseURI||self.location.href;var n={1033:0};a.O.j=function(t){return 0===n[t]};var t=function(t,e){var o,r,i=e[0],s=e[1],c=e[2],l=0;if(i.some((function(t){return 0!==n[t]}))){for(o in s)a.o(s,o)&&(a.m[o]=s[o]);if(c)var p=c(a)}for(t&&t(e);l<i.length;l++)r=i[l],a.o(n,r)&&n[r]&&n[r][0](),n[r]=0;return a.O(p)},e=self.webpackChunknextcloud=self.webpackChunknextcloud||[];e.forEach(t.bind(null,0)),e.push=t.bind(null,e.push.bind(e))}();var o=a.O(void 0,[7874],(function(){return a(12996)}));o=a.O(o)}();
//# sourceMappingURL=core-recommendedapps.js.map?v=7042b33603146143d9d7