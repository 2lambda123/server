!function(){"use strict";var n,e={49e3:function(n,e,t){var o=t(4820),r=(0,t(79753).getRootUrl)()+"/status.php";!function n(){console.info("checking the Nextcloud maintenance status"),o.default.get(r).then((function(n){return n.data})).then((function(e){if(!1===e.maintenance)return console.info("Nextcloud is not in maintenance mode anymore -> reloading"),void window.location.reload();console.info("Nextcloud is still in maintenance mode"),setTimeout(n,2e4)})).catch(console.error.bind(void 0))}()}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var i=t[n]={id:n,loaded:!1,exports:{}};return e[n].call(i.exports,i,i.exports,o),i.loaded=!0,i.exports}o.m=e,o.amdD=function(){throw new Error("define cannot be used indirect")},o.amdO={},n=[],o.O=function(e,t,r,i){if(!t){var u=1/0;for(l=0;l<n.length;l++){t=n[l][0],r=n[l][1],i=n[l][2];for(var c=!0,a=0;a<t.length;a++)(!1&i||u>=i)&&Object.keys(o.O).every((function(n){return o.O[n](t[a])}))?t.splice(a--,1):(c=!1,i<u&&(u=i));if(c){n.splice(l--,1);var f=r();void 0!==f&&(e=f)}}return e}i=i||0;for(var l=n.length;l>0&&n[l-1][2]>i;l--)n[l]=n[l-1];n[l]=[t,r,i]},o.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return o.d(e,{a:e}),e},o.d=function(n,e){for(var t in e)o.o(e,t)&&!o.o(n,t)&&Object.defineProperty(n,t,{enumerable:!0,get:e[t]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),o.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},o.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},o.nmd=function(n){return n.paths=[],n.children||(n.children=[]),n},o.j=1802,function(){o.b=document.baseURI||self.location.href;var n={1802:0};o.O.j=function(e){return 0===n[e]};var e=function(e,t){var r,i,u=t[0],c=t[1],a=t[2],f=0;if(u.some((function(e){return 0!==n[e]}))){for(r in c)o.o(c,r)&&(o.m[r]=c[r]);if(a)var l=a(o)}for(e&&e(t);f<u.length;f++)i=u[f],o.o(n,i)&&n[i]&&n[i][0](),n[i]=0;return o.O(l)},t=self.webpackChunknextcloud=self.webpackChunknextcloud||[];t.forEach(e.bind(null,0)),t.push=e.bind(null,t.push.bind(t))}();var r=o.O(void 0,[7874],(function(){return o(49e3)}));r=o.O(r)}();
//# sourceMappingURL=core-maintenance.js.map?v=1b4f16bb5395363395e8