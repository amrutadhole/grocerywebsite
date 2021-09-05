/*
* iziToast | v1.4.0
* http://izitoast.marcelodolce.com
* by Marcelo Dolce.
*/
!function(t,e){"function"==typeof define&&define.amd?define([],e(t)):"object"==typeof exports?module.exports=e(t):t.iziToast=e(t)}("undefined"!=typeof global?global:window||this.window||this.global,function(t){"use strict";var e={},n="iziToast",o=(document.querySelector("body"),!!/Mobi/.test(navigator.userAgent)),i=/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor),s="undefined"!=typeof InstallTrigger,a="ontouchstart"in document.documentElement,r=["bottomRight","bottomLeft","bottomCenter","topRight","topLeft","topCenter","center"],l={info:{color:"blue",icon:"ico-info"},success:{color:"green",icon:"ico-success"},warning:{color:"orange",icon:"ico-warning"},error:{color:"red",icon:"ico-error"},question:{color:"yellow",icon:"ico-question"}},d=568,c={};e.children={};var u={id:null,"class":"",title:"",titleColor:"",titleSize:"",titleLineHeight:"",message:"",messageColor:"",messageSize:"",messageLineHeight:"",backgroundColor:"",theme:"light",color:"",icon:"",iconText:"",iconColor:"",iconUrl:null,image:"",imageWidth:50,maxWidth:null,zindex:null,layout:1,balloon:!1,close:!0,closeOnEscape:!1,closeOnClick:!1,displayMode:0,position:"bottomRight",target:"",targetFirst:!0,timeout:5e3,rtl:!1,animateInside:!0,drag:!0,pauseOnHover:!0,resetOnHover:!1,progressBar:!0,progressBarColor:"",progressBarEasing:"linear",overlay:!1,overlayClose:!1,overlayColor:"rgba(0, 0, 0, 0.6)",transitionIn:"fadeInUp",transitionOut:"fadeOut",transitionInMobile:"fadeInUp",transitionOutMobile:"fadeOutDown",buttons:{},inputs:{},onOpening:function(){},onOpened:function(){},onClosing:function(){},onClosed:function(){}};if("remove"in Element.prototype||(Element.prototype.remove=function(){this.parentNode&&this.parentNode.removeChild(this)}),"function"!=typeof window.CustomEvent){var p=function(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n};p.prototype=window.Event.prototype,window.CustomEvent=p}var m=function(t,e,n){if("[object Object]"===Object.prototype.toString.call(t))for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.call(n,t[o],o,t);else if(t)for(var i=0,s=t.length;s>i;i++)e.call(n,t[i],i,t)},g=function(t,e){var n={};return m(t,function(e,o){n[o]=t[o]}),m(e,function(t,o){n[o]=e[o]}),n},f=function(t){var e=document.createDocumentFragment(),n=document.createElement("div");for(n.innerHTML=t;n.firstChild;)e.appendChild(n.firstChild);return e},v=function(t){var e=btoa(encodeURIComponent(t));return e.replace(/=/g,"")},y=function(t){return"#"==t.substring(0,1)||"rgb"==t.substring(0,3)||"hsl"==t.substring(0,3)},h=function(t){try{return btoa(atob(t))==t}catch(e){return!1}},b=function(){return{move:function(t,e,o,a){var r,l=.3,d=180;0!==a&&(t.classList.add(n+"-dragged"),t.style.transform="translateX("+a+"px)",a>0?(r=(d-a)/d,l>r&&e.hide(g(o,{transitionOut:"fadeOutRight",transitionOutMobile:"fadeOutRight"}),t,"drag")):(r=(d+a)/d,l>r&&e.hide(g(o,{transitionOut:"fadeOutLeft",transitionOutMobile:"fadeOutLeft"}),t,"drag")),t.style.opacity=r,l>r&&((i||s)&&(t.style.left=a+"px"),t.parentNode.style.opacity=l,this.stopMoving(t,null)))},startMoving:function(t,e,n,o){o=o||window.event;var i=a?o.touches[0].clientX:o.clientX,s=t.style.transform.replace("px)","");s=s.replace("translateX(","");var r=i-s;n.transitionIn&&t.classList.remove(n.transitionIn),n.transitionInMobile&&t.classList.remove(n.transitionInMobile),t.style.transition="",a?document.ontouchmove=function(o){o.preventDefault(),o=o||window.event;var i=o.touches[0].clientX,s=i-r;b.move(t,e,n,s)}:document.onmousemove=function(o){o.preventDefault(),o=o||window.event;var i=o.clientX,s=i-r;b.move(t,e,n,s)}},stopMoving:function(t,e){a?document.ontouchmove=function(){}:document.onmousemove=function(){},t.style.opacity="",t.style.transform="",t.classList.contains(n+"-dragged")&&(t.classList.remove(n+"-dragged"),t.style.transition="transform 0.4s ease, opacity 0.4s ease",setTimeout(function(){t.style.transition=""},400))}}}();return e.setSetting=function(t,n,o){e.children[t][n]=o},e.getSetting=function(t,n){return e.children[t][n]},e.destroy=function(){m(document.querySelectorAll("."+n+"-overlay"),function(t,e){t.remove()}),m(document.querySelectorAll("."+n+"-wrapper"),function(t,e){t.remove()}),m(document.querySelectorAll("."+n),function(t,e){t.remove()}),this.children={},document.removeEventListener(n+"-opened",{},!1),document.removeEventListener(n+"-opening",{},!1),document.removeEventListener(n+"-closing",{},!1),document.removeEventListener(n+"-closed",{},!1),document.removeEventListener("keyup",{},!1),c={}},e.settings=function(t){e.destroy(),c=t,u=g(u,t||{})},m(l,function(t,n){e[n]=function(e){var n=g(c,e||{});n=g(t,n||{}),this.show(n)}}),e.progress=function(t,e,o){var i=this,s=e.getAttribute("data-iziToast-ref"),a=g(this.children[s],t||{}),r=e.querySelector("."+n+"-progressbar div");return{start:function(){"undefined"==typeof a.time.REMAINING&&(e.classList.remove(n+"-reseted"),null!==r&&(r.style.transition="width "+a.timeout+"ms "+a.progressBarEasing,r.style.width="0%"),a.time.START=(new Date).getTime(),a.time.END=a.time.START+a.timeout,a.time.TIMER=setTimeout(function(){clearTimeout(a.time.TIMER),e.classList.contains(n+"-closing")||(i.hide(a,e,"timeout"),"function"==typeof o&&o.apply(i))},a.timeout),i.setSetting(s,"time",a.time))},pause:function(){if("undefined"!=typeof a.time.START&&!e.classList.contains(n+"-paused")&&!e.classList.contains(n+"-reseted")){if(e.classList.add(n+"-paused"),a.time.REMAINING=a.time.END-(new Date).getTime(),clearTimeout(a.time.TIMER),i.setSetting(s,"time",a.time),null!==r){var t=window.getComputedStyle(r),l=t.getPropertyValue("width");r.style.transition="none",r.style.width=l}"function"==typeof o&&setTimeout(function(){o.apply(i)},10)}},resume:function(){"undefined"!=typeof a.time.REMAINING?(e.classList.remove(n+"-paused"),null!==r&&(r.style.transition="width "+a.time.REMAINING+"ms "+a.progressBarEasing,r.style.width="0%"),a.time.END=(new Date).getTime()+a.time.REMAINING,a.time.TIMER=setTimeout(function(){clearTimeout(a.time.TIMER),e.classList.contains(n+"-closing")||(i.hide(a,e,"timeout"),"function"==typeof o&&o.apply(i))},a.time.REMAINING),i.setSetting(s,"time",a.time)):this.start()},reset:function(){clearTimeout(a.time.TIMER),delete a.time.REMAINING,i.setSetting(s,"time",a.time),e.classList.add(n+"-reseted"),e.classList.remove(n+"-paused"),null!==r&&(r.style.transition="none",r.style.width="100%"),"function"==typeof o&&setTimeout(function(){o.apply(i)},10)}}},e.hide=function(t,e,i){"object"!=typeof e&&(e=document.querySelector(e));var s=this,a=g(this.children[e.getAttribute("data-iziToast-ref")],t||{});a.closedBy=i||null,delete a.time.REMAINING,e.classList.add(n+"-closing"),function(){var t=document.querySelector("."+n+"-overlay");if(null!==t){var e=t.getAttribute("data-iziToast-ref");e=e.split(",");var o=e.indexOf(String(a.ref));-1!==o&&e.splice(o,1),t.setAttribute("data-iziToast-ref",e.join()),0===e.length&&(t.classList.remove("fadeIn"),t.classList.add("fadeOut"),setTimeout(function(){t.remove()},700))}}(),a.transitionIn&&e.classList.remove(a.transitionIn),a.transitionInMobile&&e.classList.remove(a.transitionInMobile),o||window.innerWidth<=d?a.transitionOutMobile&&e.classList.add(a.transitionOutMobile):a.transitionOut&&e.classList.add(a.transitionOut);var r=e.parentNode.offsetHeight;e.parentNode.style.height=r+"px",e.style.pointerEvents="none",(!o||window.innerWidth>d)&&(e.parentNode.style.transitionDelay="0.2s");try{var l=new CustomEvent(n+"-closing",{detail:a,bubbles:!0,cancelable:!0});document.dispatchEvent(l)}catch(c){console.warn(c)}setTimeout(function(){e.parentNode.style.height="0px",e.parentNode.style.overflow="",setTimeout(function(){delete s.children[a.ref],e.parentNode.remove();try{var t=new CustomEvent(n+"-closed",{detail:a,bubbles:!0,cancelable:!0});document.dispatchEvent(t)}catch(o){console.warn(o)}"undefined"!=typeof a.onClosed&&a.onClosed.apply(null,[a,e,i])},1e3)},200),"undefined"!=typeof a.onClosing&&a.onClosing.apply(null,[a,e,i])},e.show=function(t){var i=this,s=g(c,t||{});if(s=g(u,s),s.time={},null===s.id&&(s.id=v(s.title+s.message+s.color)),1===s.displayMode||"once"==s.displayMode)try{if(document.querySelectorAll("."+n+"#"+s.id).length>0)return!1}catch(l){console.warn("["+n+"] Could not find an element with this selector: #"+s.id+". Try to set an valid id.")}if(2===s.displayMode||"replace"==s.displayMode)try{m(document.querySelectorAll("."+n+"#"+s.id),function(t,e){i.hide(s,t,"replaced")})}catch(l){console.warn("["+n+"] Could not find an element with this selector: #"+s.id+". Try to set an valid id.")}s.ref=(new Date).getTime()+Math.floor(1e7*Math.random()+1),e.children[s.ref]=s;var p={body:document.querySelector("body"),overlay:document.createElement("div"),toast:document.createElement("div"),toastBody:document.createElement("div"),toastTexts:document.createElement("div"),toastCapsule:document.createElement("div"),cover:document.createElement("div"),buttons:document.createElement("div"),inputs:document.createElement("div"),icon:s.iconUrl?document.createElement("img"):document.createElement("i"),wrapper:null};p.toast.setAttribute("data-iziToast-ref",s.ref),p.toast.appendChild(p.toastBody),p.toastCapsule.appendChild(p.toast),function(){if(p.toast.classList.add(n),p.toast.classList.add(n+"-opening"),p.toastCapsule.classList.add(n+"-capsule"),p.toastBody.classList.add(n+"-body"),p.toastTexts.classList.add(n+"-texts"),o||window.innerWidth<=d?s.transitionInMobile&&p.toast.classList.add(s.transitionInMobile):s.transitionIn&&p.toast.classList.add(s.transitionIn),s["class"]){var t=s["class"].split(" ");m(t,function(t,e){p.toast.classList.add(t)})}s.id&&(p.toast.id=s.id),s.rtl&&(p.toast.classList.add(n+"-rtl"),p.toast.setAttribute("dir","rtl")),s.layout>1&&p.toast.classList.add(n+"-layout"+s.layout),s.balloon&&p.toast.classList.add(n+"-balloon"),s.maxWidth&&(isNaN(s.maxWidth)?p.toast.style.maxWidth=s.maxWidth:p.toast.style.maxWidth=s.maxWidth+"px"),""===s.theme&&"light"===s.theme||p.toast.classList.add(n+"-theme-"+s.theme),s.color&&(y(s.color)?p.toast.style.background=s.color:p.toast.classList.add(n+"-color-"+s.color)),s.backgroundColor&&(p.toast.style.background=s.backgroundColor,s.balloon&&(p.toast.style.borderColor=s.backgroundColor))}(),function(){s.image&&(p.cover.classList.add(n+"-cover"),p.cover.style.width=s.imageWidth+"px",h(s.image.replace(/ /g,""))?p.cover.style.backgroundImage="url(data:image/png;base64,"+s.image.replace(/ /g,"")+")":p.cover.style.backgroundImage="url("+s.image+")",s.rtl?p.toastBody.style.marginRight=s.imageWidth+10+"px":p.toastBody.style.marginLeft=s.imageWidth+10+"px",p.toast.appendChild(p.cover))}(),function(){s.close?(p.buttonClose=document.createElement("button"),p.buttonClose.type="button",p.buttonClose.classList.add(n+"-close"),p.buttonClose.addEventListener("click",function(t){t.target;i.hide(s,p.toast,"button")}),p.toast.appendChild(p.buttonClose)):s.rtl?p.toast.style.paddingLeft="18px":p.toast.style.paddingRight="18px"}(),function(){s.progressBar&&(p.progressBar=document.createElement("div"),p.progressBarDiv=document.createElement("div"),p.progressBar.classList.add(n+"-progressbar"),p.progressBarDiv.style.background=s.progressBarColor,p.progressBar.appendChild(p.progressBarDiv),p.toast.appendChild(p.progressBar)),s.timeout&&(s.pauseOnHover&&!s.resetOnHover&&(p.toast.addEventListener("mouseenter",function(t){i.progress(s,p.toast).pause()}),p.toast.addEventListener("mouseleave",function(t){i.progress(s,p.toast).resume()})),s.resetOnHover&&(p.toast.addEventListener("mouseenter",function(t){i.progress(s,p.toast).reset()}),p.toast.addEventListener("mouseleave",function(t){i.progress(s,p.toast).start()})))}(),function(){s.iconUrl?(p.icon.setAttribute("class",n+"-icon"),p.icon.setAttribute("src",s.iconUrl)):s.icon&&(p.icon.setAttribute("class",n+"-icon "+s.icon),s.iconText&&p.icon.appendChild(document.createTextNode(s.iconText)),s.iconColor&&(p.icon.style.color=s.iconColor)),(s.icon||s.iconUrl)&&(s.rtl?p.toastBody.style.paddingRight="33px":p.toastBody.style.paddingLeft="33px",p.toastBody.appendChild(p.icon))}(),function(){s.title.length>0&&(p.strong=document.createElement("strong"),p.strong.classList.add(n+"-title"),p.strong.appendChild(f(s.title)),p.toastTexts.appendChild(p.strong),s.titleColor&&(p.strong.style.color=s.titleColor),s.titleSize&&(isNaN(s.titleSize)?p.strong.style.fontSize=s.titleSize:p.strong.style.fontSize=s.titleSize+"px"),s.titleLineHeight&&(isNaN(s.titleSize)?p.strong.style.lineHeight=s.titleLineHeight:p.strong.style.lineHeight=s.titleLineHeight+"px")),s.message.length>0&&(p.p=document.createElement("p"),p.p.classList.add(n+"-message"),p.p.appendChild(f(s.message)),p.toastTexts.appendChild(p.p),s.messageColor&&(p.p.style.color=s.messageColor),s.messageSize&&(isNaN(s.titleSize)?p.p.style.fontSize=s.messageSize:p.p.style.fontSize=s.messageSize+"px"),s.messageLineHeight&&(isNaN(s.titleSize)?p.p.style.lineHeight=s.messageLineHeight:p.p.style.lineHeight=s.messageLineHeight+"px")),s.title.length>0&&s.message.length>0&&(s.rtl?p.strong.style.marginLeft="10px":2===s.layout||s.rtl||(p.strong.style.marginRight="10px"))}(),p.toastBody.appendChild(p.toastTexts);var L;!function(){s.inputs.length>0&&(p.inputs.classList.add(n+"-inputs"),m(s.inputs,function(t,e){p.inputs.appendChild(f(t[0])),L=p.inputs.childNodes,L[e].classList.add(n+"-inputs-child"),t[3]&&setTimeout(function(){L[e].focus()},300),L[e].addEventListener(t[1],function(e){var n=t[2];return n(i,p.toast,this,e)})}),p.toastBody.appendChild(p.inputs))}(),function(){s.buttons.length>0&&(p.buttons.classList.add(n+"-buttons"),m(s.buttons,function(t,e){p.buttons.appendChild(f(t[0]));var o=p.buttons.childNodes;o[e].classList.add(n+"-buttons-child"),t[2]&&setTimeout(function(){o[e].focus()},300),o[e].addEventListener("click",function(e){e.preventDefault();var n=t[1];return n(i,p.toast,this,e,L)})})),p.toastBody.appendChild(p.buttons)}(),s.message.length>0&&(s.inputs.length>0||s.buttons.length>0)&&(p.p.style.marginBottom="0"),(s.inputs.length>0||s.buttons.length>0)&&(s.rtl?p.toastTexts.style.marginLeft="10px":p.toastTexts.style.marginRight="10px",s.inputs.length>0&&s.buttons.length>0&&(s.rtl?p.inputs.style.marginLeft="8px":p.inputs.style.marginRight="8px")),function(){p.toastCapsule.style.visibility="hidden",setTimeout(function(){var t=p.toast.offsetHeight,e=p.toast.currentStyle||window.getComputedStyle(p.toast),n=e.marginTop;n=n.split("px"),n=parseInt(n[0]);var o=e.marginBottom;o=o.split("px"),o=parseInt(o[0]),p.toastCapsule.style.visibility="",p.toastCapsule.style.height=t+o+n+"px",setTimeout(function(){p.toastCapsule.style.height="auto",s.target&&(p.toastCapsule.style.overflow="visible")},500),s.timeout&&i.progress(s,p.toast).start()},100)}(),function(){var t=s.position;if(s.target)p.wrapper=document.querySelector(s.target),p.wrapper.classList.add(n+"-target"),s.targetFirst?p.wrapper.insertBefore(p.toastCapsule,p.wrapper.firstChild):p.wrapper.appendChild(p.toastCapsule);else{if(-1==r.indexOf(s.position))return void console.warn("["+n+"] Incorrect position.\nIt can be › "+r);t=o||window.innerWidth<=d?"bottomLeft"==s.position||"bottomRight"==s.position||"bottomCenter"==s.position?n+"-wrapper-bottomCenter":"topLeft"==s.position||"topRight"==s.position||"topCenter"==s.position?n+"-wrapper-topCenter":n+"-wrapper-center":n+"-wrapper-"+t,p.wrapper=document.querySelector("."+n+"-wrapper."+t),p.wrapper||(p.wrapper=document.createElement("div"),p.wrapper.classList.add(n+"-wrapper"),p.wrapper.classList.add(t),document.body.appendChild(p.wrapper)),"topLeft"==s.position||"topCenter"==s.position||"topRight"==s.position?p.wrapper.insertBefore(p.toastCapsule,p.wrapper.firstChild):p.wrapper.appendChild(p.toastCapsule)}isNaN(s.zindex)?console.warn("["+n+"] Invalid zIndex."):p.wrapper.style.zIndex=s.zindex}(),function(){s.overlay&&(null!==document.querySelector("."+n+"-overlay.fadeIn")?(p.overlay=document.querySelector("."+n+"-overlay"),p.overlay.setAttribute("data-iziToast-ref",p.overlay.getAttribute("data-iziToast-ref")+","+s.ref),isNaN(s.zindex)||null===s.zindex||(p.overlay.style.zIndex=s.zindex-1)):(p.overlay.classList.add(n+"-overlay"),p.overlay.classList.add("fadeIn"),p.overlay.style.background=s.overlayColor,p.overlay.setAttribute("data-iziToast-ref",s.ref),isNaN(s.zindex)||null===s.zindex||(p.overlay.style.zIndex=s.zindex-1),document.querySelector("body").appendChild(p.overlay)),s.overlayClose?(p.overlay.removeEventListener("click",{}),p.overlay.addEventListener("click",function(t){i.hide(s,p.toast,"overlay")})):p.overlay.removeEventListener("click",{}))}(),function(){if(s.animateInside){p.toast.classList.add(n+"-animateInside");var t=[200,100,300];"bounceInLeft"!=s.transitionIn&&"bounceInRight"!=s.transitionIn||(t=[400,200,400]),s.title.length>0&&setTimeout(function(){p.strong.classList.add("slideIn")},t[0]),s.message.length>0&&setTimeout(function(){p.p.classList.add("slideIn")},t[1]),(s.icon||s.iconUrl)&&setTimeout(function(){p.icon.classList.add("revealIn")},t[2]);var e=150;s.buttons.length>0&&p.buttons&&setTimeout(function(){m(p.buttons.childNodes,function(t,n){setTimeout(function(){t.classList.add("revealIn")},e),e+=150})},s.inputs.length>0?150:0),s.inputs.length>0&&p.inputs&&(e=150,m(p.inputs.childNodes,function(t,n){setTimeout(function(){t.classList.add("revealIn")},e),e+=150}))}}(),s.onOpening.apply(null,[s,p.toast]);try{var C=new CustomEvent(n+"-opening",{detail:s,bubbles:!0,cancelable:!0});document.dispatchEvent(C)}catch(w){console.warn(w)}setTimeout(function(){p.toast.classList.remove(n+"-opening"),p.toast.classList.add(n+"-opened");try{var t=new CustomEvent(n+"-opened",{detail:s,bubbles:!0,cancelable:!0});document.dispatchEvent(t)}catch(e){console.warn(e)}s.onOpened.apply(null,[s,p.toast])},1e3),s.drag&&(a?(p.toast.addEventListener("touchstart",function(t){b.startMoving(this,i,s,t)},!1),p.toast.addEventListener("touchend",function(t){b.stopMoving(this,t)},!1)):(p.toast.addEventListener("mousedown",function(t){t.preventDefault(),b.startMoving(this,i,s,t)},!1),p.toast.addEventListener("mouseup",function(t){t.preventDefault(),b.stopMoving(this,t)},!1))),s.closeOnEscape&&document.addEventListener("keyup",function(t){t=t||window.event,27==t.keyCode&&i.hide(s,p.toast,"esc")}),s.closeOnClick&&p.toast.addEventListener("click",function(t){i.hide(s,p.toast,"toast")}),i.toast=p.toast},e});
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.swal=e():t.swal=e()}(this,function(){return function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=8)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o="swal-button";e.CLASS_NAMES={MODAL:"swal-modal",OVERLAY:"swal-overlay",SHOW_MODAL:"swal-overlay--show-modal",MODAL_TITLE:"swal-title",MODAL_TEXT:"swal-text",ICON:"swal-icon",ICON_CUSTOM:"swal-icon--custom",CONTENT:"swal-content",FOOTER:"swal-footer",BUTTON_CONTAINER:"swal-button-container",BUTTON:o,CONFIRM_BUTTON:o+"--confirm",CANCEL_BUTTON:o+"--cancel",DANGER_BUTTON:o+"--danger",BUTTON_LOADING:o+"--loading",BUTTON_LOADER:o+"__loader"},e.default=e.CLASS_NAMES},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getNode=function(t){var e="."+t;return document.querySelector(e)},e.stringToNode=function(t){var e=document.createElement("div");return e.innerHTML=t.trim(),e.firstChild},e.insertAfter=function(t,e){var n=e.nextSibling;e.parentNode.insertBefore(t,n)},e.removeNode=function(t){t.parentElement.removeChild(t)},e.throwErr=function(t){throw t=t.replace(/ +(?= )/g,""),"SweetAlert: "+(t=t.trim())},e.isPlainObject=function(t){if("[object Object]"!==Object.prototype.toString.call(t))return!1;var e=Object.getPrototypeOf(t);return null===e||e===Object.prototype},e.ordinalSuffixOf=function(t){var e=t%10,n=t%100;return 1===e&&11!==n?t+"st":2===e&&12!==n?t+"nd":3===e&&13!==n?t+"rd":t+"th"}},function(t,e,n){"use strict";function o(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),o(n(25));var r=n(26);e.overlayMarkup=r.default,o(n(27)),o(n(28)),o(n(29));var i=n(0),a=i.default.MODAL_TITLE,s=i.default.MODAL_TEXT,c=i.default.ICON,l=i.default.FOOTER;e.iconMarkup='\n  <div class="'+c+'"></div>',e.titleMarkup='\n  <div class="'+a+'"></div>\n',e.textMarkup='\n  <div class="'+s+'"></div>',e.footerMarkup='\n  <div class="'+l+'"></div>\n'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1);e.CONFIRM_KEY="confirm",e.CANCEL_KEY="cancel";var r={visible:!0,text:null,value:null,className:"",closeModal:!0},i=Object.assign({},r,{visible:!1,text:"Cancel",value:null}),a=Object.assign({},r,{text:"OK",value:!0});e.defaultButtonList={cancel:i,confirm:a};var s=function(t){switch(t){case e.CONFIRM_KEY:return a;case e.CANCEL_KEY:return i;default:var n=t.charAt(0).toUpperCase()+t.slice(1);return Object.assign({},r,{text:n,value:t})}},c=function(t,e){var n=s(t);return!0===e?Object.assign({},n,{visible:!0}):"string"==typeof e?Object.assign({},n,{visible:!0,text:e}):o.isPlainObject(e)?Object.assign({visible:!0},n,e):Object.assign({},n,{visible:!1})},l=function(t){for(var e={},n=0,o=Object.keys(t);n<o.length;n++){var r=o[n],a=t[r],s=c(r,a);e[r]=s}return e.cancel||(e.cancel=i),e},u=function(t){var n={};switch(t.length){case 1:n[e.CANCEL_KEY]=Object.assign({},i,{visible:!1});break;case 2:n[e.CANCEL_KEY]=c(e.CANCEL_KEY,t[0]),n[e.CONFIRM_KEY]=c(e.CONFIRM_KEY,t[1]);break;default:o.throwErr("Invalid number of 'buttons' in array ("+t.length+").\n      If you want more than 2 buttons, you need to use an object!")}return n};e.getButtonListOpts=function(t){var n=e.defaultButtonList;return"string"==typeof t?n[e.CONFIRM_KEY]=c(e.CONFIRM_KEY,t):Array.isArray(t)?n=u(t):o.isPlainObject(t)?n=l(t):!0===t?n=u([!0,!0]):!1===t?n=u([!1,!1]):void 0===t&&(n=e.defaultButtonList),n}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(2),i=n(0),a=i.default.MODAL,s=i.default.OVERLAY,c=n(30),l=n(31),u=n(32),f=n(33);e.injectElIntoModal=function(t){var e=o.getNode(a),n=o.stringToNode(t);return e.appendChild(n),n};var d=function(t){t.className=a,t.textContent=""},p=function(t,e){d(t);var n=e.className;n&&t.classList.add(n)};e.initModalContent=function(t){var e=o.getNode(a);p(e,t),c.default(t.icon),l.initTitle(t.title),l.initText(t.text),f.default(t.content),u.default(t.buttons,t.dangerMode)};var m=function(){var t=o.getNode(s),e=o.stringToNode(r.modalMarkup);t.appendChild(e)};e.default=m},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(3),r={isOpen:!1,promise:null,actions:{},timer:null},i=Object.assign({},r);e.resetState=function(){i=Object.assign({},r)},e.setActionValue=function(t){if("string"==typeof t)return a(o.CONFIRM_KEY,t);for(var e in t)a(e,t[e])};var a=function(t,e){i.actions[t]||(i.actions[t]={}),Object.assign(i.actions[t],{value:e})};e.setActionOptionsFor=function(t,e){var n=(void 0===e?{}:e).closeModal,o=void 0===n||n;Object.assign(i.actions[t],{closeModal:o})},e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(3),i=n(0),a=i.default.OVERLAY,s=i.default.SHOW_MODAL,c=i.default.BUTTON,l=i.default.BUTTON_LOADING,u=n(5);e.openModal=function(){o.getNode(a).classList.add(s),u.default.isOpen=!0};var f=function(){o.getNode(a).classList.remove(s),u.default.isOpen=!1};e.onAction=function(t){void 0===t&&(t=r.CANCEL_KEY);var e=u.default.actions[t],n=e.value;if(!1===e.closeModal){var i=c+"--"+t;o.getNode(i).classList.add(l)}else f();u.default.promise.resolve(n)},e.getState=function(){var t=Object.assign({},u.default);return delete t.promise,delete t.timer,t},e.stopLoading=function(){for(var t=document.querySelectorAll("."+c),e=0;e<t.length;e++){t[e].classList.remove(l)}}},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){(function(e){t.exports=e.sweetAlert=n(9)}).call(e,n(7))},function(t,e,n){(function(e){t.exports=e.swal=n(10)}).call(e,n(7))},function(t,e,n){"undefined"!=typeof window&&n(11),n(16);var o=n(23).default;t.exports=o},function(t,e,n){var o=n(12);"string"==typeof o&&(o=[[t.i,o,""]]);var r={insertAt:"top"};r.transform=void 0;n(14)(o,r);o.locals&&(t.exports=o.locals)},function(t,e,n){e=t.exports=n(13)(void 0),e.push([t.i,'.swal-icon--error{border-color:#f27474;-webkit-animation:animateErrorIcon .5s;animation:animateErrorIcon .5s}.swal-icon--error__x-mark{position:relative;display:block;-webkit-animation:animateXMark .5s;animation:animateXMark .5s}.swal-icon--error__line{position:absolute;height:5px;width:47px;background-color:#f27474;display:block;top:37px;border-radius:2px}.swal-icon--error__line--left{-webkit-transform:rotate(45deg);transform:rotate(45deg);left:17px}.swal-icon--error__line--right{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);right:16px}@-webkit-keyframes animateErrorIcon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}to{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);opacity:1}}@keyframes animateErrorIcon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}to{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);opacity:1}}@-webkit-keyframes animateXMark{0%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}50%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}80%{-webkit-transform:scale(1.15);transform:scale(1.15);margin-top:-6px}to{-webkit-transform:scale(1);transform:scale(1);margin-top:0;opacity:1}}@keyframes animateXMark{0%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}50%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}80%{-webkit-transform:scale(1.15);transform:scale(1.15);margin-top:-6px}to{-webkit-transform:scale(1);transform:scale(1);margin-top:0;opacity:1}}.swal-icon--warning{border-color:#f8bb86;-webkit-animation:pulseWarning .75s infinite alternate;animation:pulseWarning .75s infinite alternate}.swal-icon--warning__body{width:5px;height:47px;top:10px;border-radius:2px;margin-left:-2px}.swal-icon--warning__body,.swal-icon--warning__dot{position:absolute;left:50%;background-color:#f8bb86}.swal-icon--warning__dot{width:7px;height:7px;border-radius:50%;margin-left:-4px;bottom:-11px}@-webkit-keyframes pulseWarning{0%{border-color:#f8d486}to{border-color:#f8bb86}}@keyframes pulseWarning{0%{border-color:#f8d486}to{border-color:#f8bb86}}.swal-icon--success{border-color:#a5dc86}.swal-icon--success:after,.swal-icon--success:before{content:"";border-radius:50%;position:absolute;width:60px;height:120px;background:#fff;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal-icon--success:before{border-radius:120px 0 0 120px;top:-7px;left:-33px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:60px 60px;transform-origin:60px 60px}.swal-icon--success:after{border-radius:0 120px 120px 0;top:-11px;left:30px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:0 60px;transform-origin:0 60px;-webkit-animation:rotatePlaceholder 4.25s ease-in;animation:rotatePlaceholder 4.25s ease-in}.swal-icon--success__ring{width:80px;height:80px;border:4px solid hsla(98,55%,69%,.2);border-radius:50%;box-sizing:content-box;position:absolute;left:-4px;top:-4px;z-index:2}.swal-icon--success__hide-corners{width:5px;height:90px;background-color:#fff;padding:1px;position:absolute;left:28px;top:8px;z-index:1;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal-icon--success__line{height:5px;background-color:#a5dc86;display:block;border-radius:2px;position:absolute;z-index:2}.swal-icon--success__line--tip{width:25px;left:14px;top:46px;-webkit-transform:rotate(45deg);transform:rotate(45deg);-webkit-animation:animateSuccessTip .75s;animation:animateSuccessTip .75s}.swal-icon--success__line--long{width:47px;right:8px;top:38px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-animation:animateSuccessLong .75s;animation:animateSuccessLong .75s}@-webkit-keyframes rotatePlaceholder{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}to{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@keyframes rotatePlaceholder{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}to{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@-webkit-keyframes animateSuccessTip{0%{width:0;left:1px;top:19px}54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}to{width:25px;left:14px;top:45px}}@keyframes animateSuccessTip{0%{width:0;left:1px;top:19px}54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}to{width:25px;left:14px;top:45px}}@-webkit-keyframes animateSuccessLong{0%{width:0;right:46px;top:54px}65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}to{width:47px;right:8px;top:38px}}@keyframes animateSuccessLong{0%{width:0;right:46px;top:54px}65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}to{width:47px;right:8px;top:38px}}.swal-icon--info{border-color:#c9dae1}.swal-icon--info:before{width:5px;height:29px;bottom:17px;border-radius:2px;margin-left:-2px}.swal-icon--info:after,.swal-icon--info:before{content:"";position:absolute;left:50%;background-color:#c9dae1}.swal-icon--info:after{width:7px;height:7px;border-radius:50%;margin-left:-3px;top:19px}.swal-icon{width:80px;height:80px;border-width:4px;border-style:solid;border-radius:50%;padding:0;position:relative;box-sizing:content-box;margin:20px auto}.swal-icon:first-child{margin-top:32px}.swal-icon--custom{width:auto;height:auto;max-width:100%;border:none;border-radius:0}.swal-icon img{max-width:100%;max-height:100%}.swal-title{color:rgba(0,0,0,.65);font-weight:600;text-transform:none;position:relative;display:block;padding:13px 16px;font-size:27px;line-height:normal;text-align:center;margin-bottom:0}.swal-title:first-child{margin-top:26px}.swal-title:not(:first-child){padding-bottom:0}.swal-title:not(:last-child){margin-bottom:13px}.swal-text{font-size:16px;position:relative;float:none;line-height:normal;vertical-align:top;text-align:left;display:inline-block;margin:0;padding:0 10px;font-weight:400;color:rgba(0,0,0,.64);max-width:calc(100% - 20px);overflow-wrap:break-word;box-sizing:border-box}.swal-text:first-child{margin-top:45px}.swal-text:last-child{margin-bottom:45px}.swal-footer{text-align:right;padding-top:13px;margin-top:13px;padding:13px 16px;border-radius:inherit;border-top-left-radius:0;border-top-right-radius:0}.swal-button-container{margin:5px;display:inline-block;position:relative}.swal-button{background-color:#7cd1f9;color:#fff;border:none;box-shadow:none;border-radius:5px;font-weight:600;font-size:14px;padding:10px 24px;margin:0;cursor:pointer}.swal-button:not([disabled]):hover{background-color:#78cbf2}.swal-button:active{background-color:#70bce0}.swal-button:focus{outline:none;box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(43,114,165,.29)}.swal-button[disabled]{opacity:.5;cursor:default}.swal-button::-moz-focus-inner{border:0}.swal-button--cancel{color:#555;background-color:#efefef}.swal-button--cancel:not([disabled]):hover{background-color:#e8e8e8}.swal-button--cancel:active{background-color:#d7d7d7}.swal-button--cancel:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(116,136,150,.29)}.swal-button--danger{background-color:#e64942}.swal-button--danger:not([disabled]):hover{background-color:#df4740}.swal-button--danger:active{background-color:#cf423b}.swal-button--danger:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(165,43,43,.29)}.swal-content{padding:0 20px;margin-top:20px;font-size:medium}.swal-content:last-child{margin-bottom:20px}.swal-content__input,.swal-content__textarea{-webkit-appearance:none;background-color:#fff;border:none;font-size:14px;display:block;box-sizing:border-box;width:100%;border:1px solid rgba(0,0,0,.14);padding:10px 13px;border-radius:2px;transition:border-color .2s}.swal-content__input:focus,.swal-content__textarea:focus{outline:none;border-color:#6db8ff}.swal-content__textarea{resize:vertical}.swal-button--loading{color:transparent}.swal-button--loading~.swal-button__loader{opacity:1}.swal-button__loader{position:absolute;height:auto;width:43px;z-index:2;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);text-align:center;pointer-events:none;opacity:0}.swal-button__loader div{display:inline-block;float:none;vertical-align:baseline;width:9px;height:9px;padding:0;border:none;margin:2px;opacity:.4;border-radius:7px;background-color:hsla(0,0%,100%,.9);transition:background .2s;-webkit-animation:swal-loading-anim 1s infinite;animation:swal-loading-anim 1s infinite}.swal-button__loader div:nth-child(3n+2){-webkit-animation-delay:.15s;animation-delay:.15s}.swal-button__loader div:nth-child(3n+3){-webkit-animation-delay:.3s;animation-delay:.3s}@-webkit-keyframes swal-loading-anim{0%{opacity:.4}20%{opacity:.4}50%{opacity:1}to{opacity:.4}}@keyframes swal-loading-anim{0%{opacity:.4}20%{opacity:.4}50%{opacity:1}to{opacity:.4}}.swal-overlay{position:fixed;top:0;bottom:0;left:0;right:0;text-align:center;font-size:0;overflow-y:auto;background-color:rgba(0,0,0,.4);z-index:10000;pointer-events:none;opacity:0;transition:opacity .3s}.swal-overlay:before{content:" ";display:inline-block;vertical-align:middle;height:100%}.swal-overlay--show-modal{opacity:1;pointer-events:auto}.swal-overlay--show-modal .swal-modal{opacity:1;pointer-events:auto;box-sizing:border-box;-webkit-animation:showSweetAlert .3s;animation:showSweetAlert .3s;will-change:transform}.swal-modal{width:478px;opacity:0;pointer-events:none;background-color:#fff;text-align:center;border-radius:5px;position:static;margin:20px auto;display:inline-block;vertical-align:middle;-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:50% 50%;transform-origin:50% 50%;z-index:10001;transition:opacity .2s,-webkit-transform .3s;transition:transform .3s,opacity .2s;transition:transform .3s,opacity .2s,-webkit-transform .3s}@media (max-width:500px){.swal-modal{width:calc(100% - 20px)}}@-webkit-keyframes showSweetAlert{0%{-webkit-transform:scale(1);transform:scale(1)}1%{-webkit-transform:scale(.5);transform:scale(.5)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}to{-webkit-transform:scale(1);transform:scale(1)}}@keyframes showSweetAlert{0%{-webkit-transform:scale(1);transform:scale(1)}1%{-webkit-transform:scale(.5);transform:scale(.5)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}to{-webkit-transform:scale(1);transform:scale(1)}}',""])},function(t,e){function n(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var i=o(r);return[n].concat(r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"})).concat([i]).join("\n")}return[n].join("\n")}function o(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var o=n(e,t);return e[2]?"@media "+e[2]+"{"+o+"}":o}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(o[i]=!0)}for(r=0;r<t.length;r++){var a=t[r];"number"==typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(t,e,n){function o(t,e){for(var n=0;n<t.length;n++){var o=t[n],r=m[o.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](o.parts[i]);for(;i<o.parts.length;i++)r.parts.push(u(o.parts[i],e))}else{for(var a=[],i=0;i<o.parts.length;i++)a.push(u(o.parts[i],e));m[o.id]={id:o.id,refs:1,parts:a}}}}function r(t,e){for(var n=[],o={},r=0;r<t.length;r++){var i=t[r],a=e.base?i[0]+e.base:i[0],s=i[1],c=i[2],l=i[3],u={css:s,media:c,sourceMap:l};o[a]?o[a].parts.push(u):n.push(o[a]={id:a,parts:[u]})}return n}function i(t,e){var n=v(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=w[w.length-1];if("top"===t.insertAt)o?o.nextSibling?n.insertBefore(e,o.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),w.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function a(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=w.indexOf(t);e>=0&&w.splice(e,1)}function s(t){var e=document.createElement("style");return t.attrs.type="text/css",l(e,t.attrs),i(t,e),e}function c(t){var e=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",l(e,t.attrs),i(t,e),e}function l(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function u(t,e){var n,o,r,i;if(e.transform&&t.css){if(!(i=e.transform(t.css)))return function(){};t.css=i}if(e.singleton){var l=h++;n=g||(g=s(e)),o=f.bind(null,n,l,!1),r=f.bind(null,n,l,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=c(e),o=p.bind(null,n,e),r=function(){a(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(e),o=d.bind(null,n),r=function(){a(n)});return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else r()}}function f(t,e,n,o){var r=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=x(e,r);else{var i=document.createTextNode(r),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}function d(t,e){var n=e.css,o=e.media;if(o&&t.setAttribute("media",o),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function p(t,e,n){var o=n.css,r=n.sourceMap,i=void 0===e.convertToAbsoluteUrls&&r;(e.convertToAbsoluteUrls||i)&&(o=y(o)),r&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var a=new Blob([o],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}var m={},b=function(t){var e;return function(){return void 0===e&&(e=t.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),v=function(t){var e={};return function(n){return void 0===e[n]&&(e[n]=t.call(this,n)),e[n]}}(function(t){return document.querySelector(t)}),g=null,h=0,w=[],y=n(15);t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");e=e||{},e.attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||(e.singleton=b()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=r(t,e);return o(n,e),function(t){for(var i=[],a=0;a<n.length;a++){var s=n[a],c=m[s.id];c.refs--,i.push(c)}if(t){o(r(t,e),e)}for(var a=0;a<i.length;a++){var c=i[a];if(0===c.refs){for(var l=0;l<c.parts.length;l++)c.parts[l]();delete m[c.id]}}}};var x=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,o=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var r=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(r))return t;var i;return i=0===r.indexOf("//")?r:0===r.indexOf("/")?n+r:o+r.replace(/^\.\//,""),"url("+JSON.stringify(i)+")"})}},function(t,e,n){var o=n(17);"undefined"==typeof window||window.Promise||(window.Promise=o),n(21),String.prototype.includes||(String.prototype.includes=function(t,e){"use strict";return"number"!=typeof e&&(e=0),!(e+t.length>this.length)&&-1!==this.indexOf(t,e)}),Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{value:function(t,e){if(null==this)throw new TypeError('"this" is null or not defined');var n=Object(this),o=n.length>>>0;if(0===o)return!1;for(var r=0|e,i=Math.max(r>=0?r:o-Math.abs(r),0);i<o;){if(function(t,e){return t===e||"number"==typeof t&&"number"==typeof e&&isNaN(t)&&isNaN(e)}(n[i],t))return!0;i++}return!1}}),"undefined"!=typeof window&&function(t){t.forEach(function(t){t.hasOwnProperty("remove")||Object.defineProperty(t,"remove",{configurable:!0,enumerable:!0,writable:!0,value:function(){this.parentNode.removeChild(this)}})})}([Element.prototype,CharacterData.prototype,DocumentType.prototype])},function(t,e,n){(function(e){!function(n){function o(){}function r(t,e){return function(){t.apply(e,arguments)}}function i(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],f(t,this)}function a(t,e){for(;3===t._state;)t=t._value;if(0===t._state)return void t._deferreds.push(e);t._handled=!0,i._immediateFn(function(){var n=1===t._state?e.onFulfilled:e.onRejected;if(null===n)return void(1===t._state?s:c)(e.promise,t._value);var o;try{o=n(t._value)}catch(t){return void c(e.promise,t)}s(e.promise,o)})}function s(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof i)return t._state=3,t._value=e,void l(t);if("function"==typeof n)return void f(r(n,e),t)}t._state=1,t._value=e,l(t)}catch(e){c(t,e)}}function c(t,e){t._state=2,t._value=e,l(t)}function l(t){2===t._state&&0===t._deferreds.length&&i._immediateFn(function(){t._handled||i._unhandledRejectionFn(t._value)});for(var e=0,n=t._deferreds.length;e<n;e++)a(t,t._deferreds[e]);t._deferreds=null}function u(t,e,n){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.promise=n}function f(t,e){var n=!1;try{t(function(t){n||(n=!0,s(e,t))},function(t){n||(n=!0,c(e,t))})}catch(t){if(n)return;n=!0,c(e,t)}}var d=setTimeout;i.prototype.catch=function(t){return this.then(null,t)},i.prototype.then=function(t,e){var n=new this.constructor(o);return a(this,new u(t,e,n)),n},i.all=function(t){var e=Array.prototype.slice.call(t);return new i(function(t,n){function o(i,a){try{if(a&&("object"==typeof a||"function"==typeof a)){var s=a.then;if("function"==typeof s)return void s.call(a,function(t){o(i,t)},n)}e[i]=a,0==--r&&t(e)}catch(t){n(t)}}if(0===e.length)return t([]);for(var r=e.length,i=0;i<e.length;i++)o(i,e[i])})},i.resolve=function(t){return t&&"object"==typeof t&&t.constructor===i?t:new i(function(e){e(t)})},i.reject=function(t){return new i(function(e,n){n(t)})},i.race=function(t){return new i(function(e,n){for(var o=0,r=t.length;o<r;o++)t[o].then(e,n)})},i._immediateFn="function"==typeof e&&function(t){e(t)}||function(t){d(t,0)},i._unhandledRejectionFn=function(t){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",t)},i._setImmediateFn=function(t){i._immediateFn=t},i._setUnhandledRejectionFn=function(t){i._unhandledRejectionFn=t},void 0!==t&&t.exports?t.exports=i:n.Promise||(n.Promise=i)}(this)}).call(e,n(18).setImmediate)},function(t,e,n){function o(t,e){this._id=t,this._clearFn=e}var r=Function.prototype.apply;e.setTimeout=function(){return new o(r.call(setTimeout,window,arguments),clearTimeout)},e.setInterval=function(){return new o(r.call(setInterval,window,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t&&t.close()},o.prototype.unref=o.prototype.ref=function(){},o.prototype.close=function(){this._clearFn.call(window,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout(function(){t._onTimeout&&t._onTimeout()},e))},n(19),e.setImmediate=setImmediate,e.clearImmediate=clearImmediate},function(t,e,n){(function(t,e){!function(t,n){"use strict";function o(t){"function"!=typeof t&&(t=new Function(""+t));for(var e=new Array(arguments.length-1),n=0;n<e.length;n++)e[n]=arguments[n+1];var o={callback:t,args:e};return l[c]=o,s(c),c++}function r(t){delete l[t]}function i(t){var e=t.callback,o=t.args;switch(o.length){case 0:e();break;case 1:e(o[0]);break;case 2:e(o[0],o[1]);break;case 3:e(o[0],o[1],o[2]);break;default:e.apply(n,o)}}function a(t){if(u)setTimeout(a,0,t);else{var e=l[t];if(e){u=!0;try{i(e)}finally{r(t),u=!1}}}}if(!t.setImmediate){var s,c=1,l={},u=!1,f=t.document,d=Object.getPrototypeOf&&Object.getPrototypeOf(t);d=d&&d.setTimeout?d:t,"[object process]"==={}.toString.call(t.process)?function(){s=function(t){e.nextTick(function(){a(t)})}}():function(){if(t.postMessage&&!t.importScripts){var e=!0,n=t.onmessage;return t.onmessage=function(){e=!1},t.postMessage("","*"),t.onmessage=n,e}}()?function(){var e="setImmediate$"+Math.random()+"$",n=function(n){n.source===t&&"string"==typeof n.data&&0===n.data.indexOf(e)&&a(+n.data.slice(e.length))};t.addEventListener?t.addEventListener("message",n,!1):t.attachEvent("onmessage",n),s=function(n){t.postMessage(e+n,"*")}}():t.MessageChannel?function(){var t=new MessageChannel;t.port1.onmessage=function(t){a(t.data)},s=function(e){t.port2.postMessage(e)}}():f&&"onreadystatechange"in f.createElement("script")?function(){var t=f.documentElement;s=function(e){var n=f.createElement("script");n.onreadystatechange=function(){a(e),n.onreadystatechange=null,t.removeChild(n),n=null},t.appendChild(n)}}():function(){s=function(t){setTimeout(a,0,t)}}(),d.setImmediate=o,d.clearImmediate=r}}("undefined"==typeof self?void 0===t?this:t:self)}).call(e,n(7),n(20))},function(t,e){function n(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function r(t){if(u===setTimeout)return setTimeout(t,0);if((u===n||!u)&&setTimeout)return u=setTimeout,setTimeout(t,0);try{return u(t,0)}catch(e){try{return u.call(null,t,0)}catch(e){return u.call(this,t,0)}}}function i(t){if(f===clearTimeout)return clearTimeout(t);if((f===o||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(t);try{return f(t)}catch(e){try{return f.call(null,t)}catch(e){return f.call(this,t)}}}function a(){b&&p&&(b=!1,p.length?m=p.concat(m):v=-1,m.length&&s())}function s(){if(!b){var t=r(a);b=!0;for(var e=m.length;e;){for(p=m,m=[];++v<e;)p&&p[v].run();v=-1,e=m.length}p=null,b=!1,i(t)}}function c(t,e){this.fun=t,this.array=e}function l(){}var u,f,d=t.exports={};!function(){try{u="function"==typeof setTimeout?setTimeout:n}catch(t){u=n}try{f="function"==typeof clearTimeout?clearTimeout:o}catch(t){f=o}}();var p,m=[],b=!1,v=-1;d.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];m.push(new c(t,e)),1!==m.length||b||r(s)},c.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=l,d.addListener=l,d.once=l,d.off=l,d.removeListener=l,d.removeAllListeners=l,d.emit=l,d.prependListener=l,d.prependOnceListener=l,d.listeners=function(t){return[]},d.binding=function(t){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(t){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},function(t,e,n){"use strict";n(22).polyfill()},function(t,e,n){"use strict";function o(t,e){if(void 0===t||null===t)throw new TypeError("Cannot convert first argument to object");for(var n=Object(t),o=1;o<arguments.length;o++){var r=arguments[o];if(void 0!==r&&null!==r)for(var i=Object.keys(Object(r)),a=0,s=i.length;a<s;a++){var c=i[a],l=Object.getOwnPropertyDescriptor(r,c);void 0!==l&&l.enumerable&&(n[c]=r[c])}}return n}function r(){Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:o})}t.exports={assign:o,polyfill:r}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(24),r=n(6),i=n(5),a=n(36),s=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if("undefined"!=typeof window){var n=a.getOpts.apply(void 0,t);return new Promise(function(t,e){i.default.promise={resolve:t,reject:e},o.default(n),setTimeout(function(){r.openModal()})})}};s.close=r.onAction,s.getState=r.getState,s.setActionValue=i.setActionValue,s.stopLoading=r.stopLoading,s.setDefaults=a.setDefaults,e.default=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(0),i=r.default.MODAL,a=n(4),s=n(34),c=n(35),l=n(1);e.init=function(t){o.getNode(i)||(document.body||l.throwErr("You can only use SweetAlert AFTER the DOM has loaded!"),s.default(),a.default()),a.initModalContent(t),c.default(t)},e.default=e.init},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.MODAL;e.modalMarkup='\n  <div class="'+r+'" role="dialog" aria-modal="true"></div>',e.default=e.modalMarkup},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.OVERLAY,i='<div \n    class="'+r+'"\n    tabIndex="-1">\n  </div>';e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.ICON;e.errorIconMarkup=function(){var t=r+"--error",e=t+"__line";return'\n    <div class="'+t+'__x-mark">\n      <span class="'+e+" "+e+'--left"></span>\n      <span class="'+e+" "+e+'--right"></span>\n    </div>\n  '},e.warningIconMarkup=function(){var t=r+"--warning";return'\n    <span class="'+t+'__body">\n      <span class="'+t+'__dot"></span>\n    </span>\n  '},e.successIconMarkup=function(){var t=r+"--success";return'\n    <span class="'+t+"__line "+t+'__line--long"></span>\n    <span class="'+t+"__line "+t+'__line--tip"></span>\n\n    <div class="'+t+'__ring"></div>\n    <div class="'+t+'__hide-corners"></div>\n  '}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.CONTENT;e.contentMarkup='\n  <div class="'+r+'">\n\n  </div>\n'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.BUTTON_CONTAINER,i=o.default.BUTTON,a=o.default.BUTTON_LOADER;e.buttonMarkup='\n  <div class="'+r+'">\n\n    <button\n      class="'+i+'"\n    ></button>\n\n    <div class="'+a+'">\n      <div></div>\n      <div></div>\n      <div></div>\n    </div>\n\n  </div>\n'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(4),r=n(2),i=n(0),a=i.default.ICON,s=i.default.ICON_CUSTOM,c=["error","warning","success","info"],l={error:r.errorIconMarkup(),warning:r.warningIconMarkup(),success:r.successIconMarkup()},u=function(t,e){var n=a+"--"+t;e.classList.add(n);var o=l[t];o&&(e.innerHTML=o)},f=function(t,e){e.classList.add(s);var n=document.createElement("img");n.src=t,e.appendChild(n)},d=function(t){if(t){var e=o.injectElIntoModal(r.iconMarkup);c.includes(t)?u(t,e):f(t,e)}};e.default=d},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),r=n(4),i=function(t){navigator.userAgent.includes("AppleWebKit")&&(t.style.display="none",t.offsetHeight,t.style.display="")};e.initTitle=function(t){if(t){var e=r.injectElIntoModal(o.titleMarkup);e.textContent=t,i(e)}},e.initText=function(t){if(t){var e=document.createDocumentFragment();t.split("\n").forEach(function(t,n,o){e.appendChild(document.createTextNode(t)),n<o.length-1&&e.appendChild(document.createElement("br"))});var n=r.injectElIntoModal(o.textMarkup);n.appendChild(e),i(n)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(4),i=n(0),a=i.default.BUTTON,s=i.default.DANGER_BUTTON,c=n(3),l=n(2),u=n(6),f=n(5),d=function(t,e,n){var r=e.text,i=e.value,d=e.className,p=e.closeModal,m=o.stringToNode(l.buttonMarkup),b=m.querySelector("."+a),v=a+"--"+t;if(b.classList.add(v),d){(Array.isArray(d)?d:d.split(" ")).filter(function(t){return t.length>0}).forEach(function(t){b.classList.add(t)})}n&&t===c.CONFIRM_KEY&&b.classList.add(s),b.textContent=r;var g={};return g[t]=i,f.setActionValue(g),f.setActionOptionsFor(t,{closeModal:p}),b.addEventListener("click",function(){return u.onAction(t)}),m},p=function(t,e){var n=r.injectElIntoModal(l.footerMarkup);for(var o in t){var i=t[o],a=d(o,i,e);i.visible&&n.appendChild(a)}0===n.children.length&&n.remove()};e.default=p},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(3),r=n(4),i=n(2),a=n(5),s=n(6),c=n(0),l=c.default.CONTENT,u=function(t){t.addEventListener("input",function(t){var e=t.target,n=e.value;a.setActionValue(n)}),t.addEventListener("keyup",function(t){if("Enter"===t.key)return s.onAction(o.CONFIRM_KEY)}),setTimeout(function(){t.focus(),a.setActionValue("")},0)},f=function(t,e,n){var o=document.createElement(e),r=l+"__"+e;o.classList.add(r);for(var i in n){var a=n[i];o[i]=a}"input"===e&&u(o),t.appendChild(o)},d=function(t){if(t){var e=r.injectElIntoModal(i.contentMarkup),n=t.element,o=t.attributes;"string"==typeof n?f(e,n,o):e.appendChild(n)}};e.default=d},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(2),i=function(){var t=o.stringToNode(r.overlayMarkup);document.body.appendChild(t)};e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(5),r=n(6),i=n(1),a=n(3),s=n(0),c=s.default.MODAL,l=s.default.BUTTON,u=s.default.OVERLAY,f=function(t){t.preventDefault(),v()},d=function(t){t.preventDefault(),g()},p=function(t){if(o.default.isOpen)switch(t.key){case"Escape":return r.onAction(a.CANCEL_KEY)}},m=function(t){if(o.default.isOpen)switch(t.key){case"Tab":return f(t)}},b=function(t){if(o.default.isOpen)return"Tab"===t.key&&t.shiftKey?d(t):void 0},v=function(){var t=i.getNode(l);t&&(t.tabIndex=0,t.focus())},g=function(){var t=i.getNode(c),e=t.querySelectorAll("."+l),n=e.length-1,o=e[n];o&&o.focus()},h=function(t){t[t.length-1].addEventListener("keydown",m)},w=function(t){t[0].addEventListener("keydown",b)},y=function(){var t=i.getNode(c),e=t.querySelectorAll("."+l);e.length&&(h(e),w(e))},x=function(t){if(i.getNode(u)===t.target)return r.onAction(a.CANCEL_KEY)},_=function(t){var e=i.getNode(u);e.removeEventListener("click",x),t&&e.addEventListener("click",x)},k=function(t){o.default.timer&&clearTimeout(o.default.timer),t&&(o.default.timer=window.setTimeout(function(){return r.onAction(a.CANCEL_KEY)},t))},O=function(t){t.closeOnEsc?document.addEventListener("keyup",p):document.removeEventListener("keyup",p),t.dangerMode?v():g(),y(),_(t.closeOnClickOutside),k(t.timer)};e.default=O},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(3),i=n(37),a=n(38),s={title:null,text:null,icon:null,buttons:r.defaultButtonList,content:null,className:null,closeOnClickOutside:!0,closeOnEsc:!0,dangerMode:!1,timer:null},c=Object.assign({},s);e.setDefaults=function(t){c=Object.assign({},s,t)};var l=function(t){var e=t&&t.button,n=t&&t.buttons;return void 0!==e&&void 0!==n&&o.throwErr("Cannot set both 'button' and 'buttons' options!"),void 0!==e?{confirm:e}:n},u=function(t){return o.ordinalSuffixOf(t+1)},f=function(t,e){o.throwErr(u(e)+" argument ('"+t+"') is invalid")},d=function(t,e){var n=t+1,r=e[n];o.isPlainObject(r)||void 0===r||o.throwErr("Expected "+u(n)+" argument ('"+r+"') to be a plain object")},p=function(t,e){var n=t+1,r=e[n];void 0!==r&&o.throwErr("Unexpected "+u(n)+" argument ("+r+")")},m=function(t,e,n,r){var i=typeof e,a="string"===i,s=e instanceof Element;if(a){if(0===n)return{text:e};if(1===n)return{text:e,title:r[0]};if(2===n)return d(n,r),{icon:e};f(e,n)}else{if(s&&0===n)return d(n,r),{content:e};if(o.isPlainObject(e))return p(n,r),e;f(e,n)}};e.getOpts=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n={};t.forEach(function(e,o){var r=m(0,e,o,t);Object.assign(n,r)});var o=l(n);n.buttons=r.getButtonListOpts(o),delete n.button,n.content=i.getContentOpts(n.content);var u=Object.assign({},s,c,n);return Object.keys(u).forEach(function(t){a.DEPRECATED_OPTS[t]&&a.logDeprecation(t)}),u}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r={element:"input",attributes:{placeholder:""}};e.getContentOpts=function(t){var e={};return o.isPlainObject(t)?Object.assign(e,t):t instanceof Element?{element:t}:"input"===t?r:null}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.logDeprecation=function(t){var n=e.DEPRECATED_OPTS[t],o=n.onlyRename,r=n.replacement,i=n.subOption,a=n.link,s=o?"renamed":"deprecated",c='SweetAlert warning: "'+t+'" option has been '+s+".";if(r){c+=" Please use"+(i?' "'+i+'" in ':" ")+'"'+r+'" instead.'}var l="https://sweetalert.js.org";c+=a?" More details: "+l+a:" More details: "+l+"/guides/#upgrading-from-1x",console.warn(c)},e.DEPRECATED_OPTS={type:{replacement:"icon",link:"/docs/#icon"},imageUrl:{replacement:"icon",link:"/docs/#icon"},customClass:{replacement:"className",onlyRename:!0,link:"/docs/#classname"},imageSize:{},showCancelButton:{replacement:"buttons",link:"/docs/#buttons"},showConfirmButton:{replacement:"button",link:"/docs/#button"},confirmButtonText:{replacement:"button",link:"/docs/#button"},confirmButtonColor:{},cancelButtonText:{replacement:"buttons",link:"/docs/#buttons"},closeOnConfirm:{replacement:"button",subOption:"closeModal",link:"/docs/#button"},closeOnCancel:{replacement:"buttons",subOption:"closeModal",link:"/docs/#buttons"},showLoaderOnConfirm:{replacement:"buttons"},animation:{},inputType:{replacement:"content",link:"/docs/#content"},inputValue:{replacement:"content",link:"/docs/#content"},inputPlaceholder:{replacement:"content",link:"/docs/#content"},html:{replacement:"content",link:"/docs/#content"},allowEscapeKey:{replacement:"closeOnEsc",onlyRename:!0,link:"/docs/#closeonesc"},allowClickOutside:{replacement:"closeOnClickOutside",onlyRename:!0,link:"/docs/#closeonclickoutside"}}}])});
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.vex = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
        /*
         * classList.js: Cross-browser full element.classList implementation.
         * 1.1.20170427
         *
         * By Eli Grey, http://eligrey.com
         * License: Dedicated to the public domain.
         *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
         */

        /*global self, document, DOMException */

        /*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

        if ("document" in window.self) {

// Full polyfill for browsers with no classList support
// Including IE < Edge missing SVGElement.classList
            if (!("classList" in document.createElement("_"))
                || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))) {

                (function (view) {

                    "use strict";

                    if (!('Element' in view)) return;

                    var
                        classListProp = "classList"
                        , protoProp = "prototype"
                        , elemCtrProto = view.Element[protoProp]
                        , objCtr = Object
                        , strTrim = String[protoProp].trim || function () {
                            return this.replace(/^\s+|\s+$/g, "");
                        }
                        , arrIndexOf = Array[protoProp].indexOf || function (item) {
                            var
                                i = 0
                                , len = this.length
                            ;
                            for (; i < len; i++) {
                                if (i in this && this[i] === item) {
                                    return i;
                                }
                            }
                            return -1;
                        }
                        // Vendors: please allow content code to instantiate DOMExceptions
                        , DOMEx = function (type, message) {
                            this.name = type;
                            this.code = DOMException[type];
                            this.message = message;
                        }
                        , checkTokenAndGetIndex = function (classList, token) {
                            if (token === "") {
                                throw new DOMEx(
                                    "SYNTAX_ERR"
                                    , "An invalid or illegal string was specified"
                                );
                            }
                            if (/\s/.test(token)) {
                                throw new DOMEx(
                                    "INVALID_CHARACTER_ERR"
                                    , "String contains an invalid character"
                                );
                            }
                            return arrIndexOf.call(classList, token);
                        }
                        , ClassList = function (elem) {
                            var
                                trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
                                , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
                                , i = 0
                                , len = classes.length
                            ;
                            for (; i < len; i++) {
                                this.push(classes[i]);
                            }
                            this._updateClassName = function () {
                                elem.setAttribute("class", this.toString());
                            };
                        }
                        , classListProto = ClassList[protoProp] = []
                        , classListGetter = function () {
                            return new ClassList(this);
                        }
                    ;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
                    DOMEx[protoProp] = Error[protoProp];
                    classListProto.item = function (i) {
                        return this[i] || null;
                    };
                    classListProto.contains = function (token) {
                        token += "";
                        return checkTokenAndGetIndex(this, token) !== -1;
                    };
                    classListProto.add = function () {
                        var
                            tokens = arguments
                            , i = 0
                            , l = tokens.length
                            , token
                            , updated = false
                        ;
                        do {
                            token = tokens[i] + "";
                            if (checkTokenAndGetIndex(this, token) === -1) {
                                this.push(token);
                                updated = true;
                            }
                        }
                        while (++i < l);

                        if (updated) {
                            this._updateClassName();
                        }
                    };
                    classListProto.remove = function () {
                        var
                            tokens = arguments
                            , i = 0
                            , l = tokens.length
                            , token
                            , updated = false
                            , index
                        ;
                        do {
                            token = tokens[i] + "";
                            index = checkTokenAndGetIndex(this, token);
                            while (index !== -1) {
                                this.splice(index, 1);
                                updated = true;
                                index = checkTokenAndGetIndex(this, token);
                            }
                        }
                        while (++i < l);

                        if (updated) {
                            this._updateClassName();
                        }
                    };
                    classListProto.toggle = function (token, force) {
                        token += "";

                        var
                            result = this.contains(token)
                            , method = result ?
                            force !== true && "remove"
                            :
                            force !== false && "add"
                        ;

                        if (method) {
                            this[method](token);
                        }

                        if (force === true || force === false) {
                            return force;
                        } else {
                            return !result;
                        }
                    };
                    classListProto.toString = function () {
                        return this.join(" ");
                    };

                    if (objCtr.defineProperty) {
                        var classListPropDesc = {
                            get: classListGetter
                            , enumerable: true
                            , configurable: true
                        };
                        try {
                            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                        } catch (ex) { // IE 8 doesn't support enumerable:true
                            // adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
                            // modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
                            if (ex.number === undefined || ex.number === -0x7FF5EC54) {
                                classListPropDesc.enumerable = false;
                                objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                            }
                        }
                    } else if (objCtr[protoProp].__defineGetter__) {
                        elemCtrProto.__defineGetter__(classListProp, classListGetter);
                    }

                }(window.self));

            }

// There is full or partial native classList support, so just check if we need
// to normalize the add/remove and toggle APIs.

            (function () {
                "use strict";

                var testElement = document.createElement("_");

                testElement.classList.add("c1", "c2");

                // Polyfill for IE 10/11 and Firefox <26, where classList.add and
                // classList.remove exist but support only one argument at a time.
                if (!testElement.classList.contains("c2")) {
                    var createMethod = function(method) {
                        var original = DOMTokenList.prototype[method];

                        DOMTokenList.prototype[method] = function(token) {
                            var i, len = arguments.length;

                            for (i = 0; i < len; i++) {
                                token = arguments[i];
                                original.call(this, token);
                            }
                        };
                    };
                    createMethod('add');
                    createMethod('remove');
                }

                testElement.classList.toggle("c3", false);

                // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
                // support the second argument.
                if (testElement.classList.contains("c3")) {
                    var _toggle = DOMTokenList.prototype.toggle;

                    DOMTokenList.prototype.toggle = function(token, force) {
                        if (1 in arguments && !this.contains(token) === !force) {
                            return force;
                        } else {
                            return _toggle.call(this, token);
                        }
                    };

                }

                testElement = null;
            }());

        }

    },{}],2:[function(require,module,exports){

        /**
         * Expose `parse`.
         */

        module.exports = parse;

        /**
         * Tests for browser support.
         */

        var innerHTMLBug = false;
        var bugTestDiv;
        if (typeof document !== 'undefined') {
            bugTestDiv = document.createElement('div');
            // Setup
            bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
            // Make sure that link elements get serialized correctly by innerHTML
            // This requires a wrapper element in IE
            innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
            bugTestDiv = undefined;
        }

        /**
         * Wrap map from jquery.
         */

        var map = {
            legend: [1, '<fieldset>', '</fieldset>'],
            tr: [2, '<table><tbody>', '</tbody></table>'],
            col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
            // for script/link/style tags to work in IE6-8, you have to wrap
            // in a div with a non-whitespace character in front, ha!
            _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
        };

        map.td =
            map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

        map.option =
            map.optgroup = [1, '<select multiple="multiple">', '</select>'];

        map.thead =
            map.tbody =
                map.colgroup =
                    map.caption =
                        map.tfoot = [1, '<table>', '</table>'];

        map.polyline =
            map.ellipse =
                map.polygon =
                    map.circle =
                        map.text =
                            map.line =
                                map.path =
                                    map.rect =
                                        map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

        /**
         * Parse `html` and return a DOM Node instance, which could be a TextNode,
         * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
         * instance, depending on the contents of the `html` string.
         *
         * @param {String} html - HTML string to "domify"
         * @param {Document} doc - The `document` instance to create the Node for
         * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
         * @api private
         */

        function parse(html, doc) {
            if ('string' != typeof html) throw new TypeError('String expected');

            // default to the global `document` object
            if (!doc) doc = document;

            // tag name
            var m = /<([\w:]+)/.exec(html);
            if (!m) return doc.createTextNode(html);

            html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

            var tag = m[1];

            // body support
            if (tag == 'body') {
                var el = doc.createElement('html');
                el.innerHTML = html;
                return el.removeChild(el.lastChild);
            }

            // wrap map
            var wrap = map[tag] || map._default;
            var depth = wrap[0];
            var prefix = wrap[1];
            var suffix = wrap[2];
            var el = doc.createElement('div');
            el.innerHTML = prefix + html + suffix;
            while (depth--) el = el.lastChild;

            // one element
            if (el.firstChild == el.lastChild) {
                return el.removeChild(el.firstChild);
            }

            // several elements
            var fragment = doc.createDocumentFragment();
            while (el.firstChild) {
                fragment.appendChild(el.removeChild(el.firstChild));
            }

            return fragment;
        }

    },{}],3:[function(require,module,exports){
        /**
         * Code refactored from Mozilla Developer Network:
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
         */

        'use strict';

        function assign(target, firstSource) {
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }

            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) {
                    continue;
                }

                var keysArray = Object.keys(Object(nextSource));
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }

        function polyfill() {
            if (!Object.assign) {
                Object.defineProperty(Object, 'assign', {
                    enumerable: false,
                    configurable: true,
                    writable: true,
                    value: assign
                });
            }
        }

        module.exports = {
            assign: assign,
            polyfill: polyfill
        };

    },{}],4:[function(require,module,exports){
// get successful control from form and assemble into object
// http://www.w3.org/TR/html401/interact/forms.html#h-17.13.2

// types which indicate a submit action and are not successful controls
// these will be ignored
        var k_r_submitter = /^(?:submit|button|image|reset|file)$/i;

// node names which could be successful controls
        var k_r_success_contrls = /^(?:input|select|textarea|keygen)/i;

// Matches bracket notation.
        var brackets = /(\[[^\[\]]*\])/g;

// serializes form fields
// @param form MUST be an HTMLForm element
// @param options is an optional argument to configure the serialization. Default output
// with no options specified is a url encoded string
//    - hash: [true | false] Configure the output type. If true, the output will
//    be a js object.
//    - serializer: [function] Optional serializer function to override the default one.
//    The function takes 3 arguments (result, key, value) and should return new result
//    hash and url encoded str serializers are provided with this module
//    - disabled: [true | false]. If true serialize disabled fields.
//    - empty: [true | false]. If true serialize empty fields
        function serialize(form, options) {
            if (typeof options != 'object') {
                options = { hash: !!options };
            }
            else if (options.hash === undefined) {
                options.hash = true;
            }

            var result = (options.hash) ? {} : '';
            var serializer = options.serializer || ((options.hash) ? hash_serializer : str_serialize);

            var elements = form && form.elements ? form.elements : [];

            //Object store each radio and set if it's empty or not
            var radio_store = Object.create(null);

            for (var i=0 ; i<elements.length ; ++i) {
                var element = elements[i];

                // ingore disabled fields
                if ((!options.disabled && element.disabled) || !element.name) {
                    continue;
                }
                // ignore anyhting that is not considered a success field
                if (!k_r_success_contrls.test(element.nodeName) ||
                    k_r_submitter.test(element.type)) {
                    continue;
                }

                var key = element.name;
                var val = element.value;

                // we can't just use element.value for checkboxes cause some browsers lie to us
                // they say "on" for value when the box isn't checked
                if ((element.type === 'checkbox' || element.type === 'radio') && !element.checked) {
                    val = undefined;
                }

                // If we want empty elements
                if (options.empty) {
                    // for checkbox
                    if (element.type === 'checkbox' && !element.checked) {
                        val = '';
                    }

                    // for radio
                    if (element.type === 'radio') {
                        if (!radio_store[element.name] && !element.checked) {
                            radio_store[element.name] = false;
                        }
                        else if (element.checked) {
                            radio_store[element.name] = true;
                        }
                    }

                    // if options empty is true, continue only if its radio
                    if (!val && element.type == 'radio') {
                        continue;
                    }
                }
                else {
                    // value-less fields are ignored unless options.empty is true
                    if (!val) {
                        continue;
                    }
                }

                // multi select boxes
                if (element.type === 'select-multiple') {
                    val = [];

                    var selectOptions = element.options;
                    var isSelectedOptions = false;
                    for (var j=0 ; j<selectOptions.length ; ++j) {
                        var option = selectOptions[j];
                        var allowedEmpty = options.empty && !option.value;
                        var hasValue = (option.value || allowedEmpty);
                        if (option.selected && hasValue) {
                            isSelectedOptions = true;

                            // If using a hash serializer be sure to add the
                            // correct notation for an array in the multi-select
                            // context. Here the name attribute on the select element
                            // might be missing the trailing bracket pair. Both names
                            // "foo" and "foo[]" should be arrays.
                            if (options.hash && key.slice(key.length - 2) !== '[]') {
                                result = serializer(result, key + '[]', option.value);
                            }
                            else {
                                result = serializer(result, key, option.value);
                            }
                        }
                    }

                    // Serialize if no selected options and options.empty is true
                    if (!isSelectedOptions && options.empty) {
                        result = serializer(result, key, '');
                    }

                    continue;
                }

                result = serializer(result, key, val);
            }

            // Check for all empty radio buttons and serialize them with key=""
            if (options.empty) {
                for (var key in radio_store) {
                    if (!radio_store[key]) {
                        result = serializer(result, key, '');
                    }
                }
            }

            return result;
        }

        function parse_keys(string) {
            var keys = [];
            var prefix = /^([^\[\]]*)/;
            var children = new RegExp(brackets);
            var match = prefix.exec(string);

            if (match[1]) {
                keys.push(match[1]);
            }

            while ((match = children.exec(string)) !== null) {
                keys.push(match[1]);
            }

            return keys;
        }

        function hash_assign(result, keys, value) {
            if (keys.length === 0) {
                result = value;
                return result;
            }

            var key = keys.shift();
            var between = key.match(/^\[(.+?)\]$/);

            if (key === '[]') {
                result = result || [];

                if (Array.isArray(result)) {
                    result.push(hash_assign(null, keys, value));
                }
                else {
                    // This might be the result of bad name attributes like "[][foo]",
                    // in this case the original `result` object will already be
                    // assigned to an object literal. Rather than coerce the object to
                    // an array, or cause an exception the attribute "_values" is
                    // assigned as an array.
                    result._values = result._values || [];
                    result._values.push(hash_assign(null, keys, value));
                }

                return result;
            }

            // Key is an attribute name and can be assigned directly.
            if (!between) {
                result[key] = hash_assign(result[key], keys, value);
            }
            else {
                var string = between[1];
                // +var converts the variable into a number
                // better than parseInt because it doesn't truncate away trailing
                // letters and actually fails if whole thing is not a number
                var index = +string;

                // If the characters between the brackets is not a number it is an
                // attribute name and can be assigned directly.
                if (isNaN(index)) {
                    result = result || {};
                    result[string] = hash_assign(result[string], keys, value);
                }
                else {
                    result = result || [];
                    result[index] = hash_assign(result[index], keys, value);
                }
            }

            return result;
        }

// Object/hash encoding serializer.
        function hash_serializer(result, key, value) {
            var matches = key.match(brackets);

            // Has brackets? Use the recursive assignment function to walk the keys,
            // construct any missing objects in the result tree and make the assignment
            // at the end of the chain.
            if (matches) {
                var keys = parse_keys(key);
                hash_assign(result, keys, value);
            }
            else {
                // Non bracket notation can make assignments directly.
                var existing = result[key];

                // If the value has been assigned already (for instance when a radio and
                // a checkbox have the same name attribute) convert the previous value
                // into an array before pushing into it.
                //
                // NOTE: If this requirement were removed all hash creation and
                // assignment could go through `hash_assign`.
                if (existing) {
                    if (!Array.isArray(existing)) {
                        result[key] = [ existing ];
                    }

                    result[key].push(value);
                }
                else {
                    result[key] = value;
                }
            }

            return result;
        }

// urlform encoding serializer
        function str_serialize(result, key, value) {
            // encode newlines as \r\n cause the html spec says so
            value = value.replace(/(\r)?\n/g, '\r\n');
            value = encodeURIComponent(value);

            // spaces should be '+' rather than '%20'.
            value = value.replace(/%20/g, '+');
            return result + (result ? '&' : '') + encodeURIComponent(key) + '=' + value;
        }

        module.exports = serialize;

    },{}],5:[function(require,module,exports){
        (function (global){
            (function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.vexDialog = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

                    /**
                     * Expose `parse`.
                     */

                    module.exports = parse;

                    /**
                     * Tests for browser support.
                     */

                    var innerHTMLBug = false;
                    var bugTestDiv;
                    if (typeof document !== 'undefined') {
                        bugTestDiv = document.createElement('div');
                        // Setup
                        bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
                        // Make sure that link elements get serialized correctly by innerHTML
                        // This requires a wrapper element in IE
                        innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
                        bugTestDiv = undefined;
                    }

                    /**
                     * Wrap map from jquery.
                     */

                    var map = {
                        legend: [1, '<fieldset>', '</fieldset>'],
                        tr: [2, '<table><tbody>', '</tbody></table>'],
                        col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
                        // for script/link/style tags to work in IE6-8, you have to wrap
                        // in a div with a non-whitespace character in front, ha!
                        _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
                    };

                    map.td =
                        map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

                    map.option =
                        map.optgroup = [1, '<select multiple="multiple">', '</select>'];

                    map.thead =
                        map.tbody =
                            map.colgroup =
                                map.caption =
                                    map.tfoot = [1, '<table>', '</table>'];

                    map.polyline =
                        map.ellipse =
                            map.polygon =
                                map.circle =
                                    map.text =
                                        map.line =
                                            map.path =
                                                map.rect =
                                                    map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

                    /**
                     * Parse `html` and return a DOM Node instance, which could be a TextNode,
                     * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
                     * instance, depending on the contents of the `html` string.
                     *
                     * @param {String} html - HTML string to "domify"
                     * @param {Document} doc - The `document` instance to create the Node for
                     * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
                     * @api private
                     */

                    function parse(html, doc) {
                        if ('string' != typeof html) throw new TypeError('String expected');

                        // default to the global `document` object
                        if (!doc) doc = document;

                        // tag name
                        var m = /<([\w:]+)/.exec(html);
                        if (!m) return doc.createTextNode(html);

                        html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

                        var tag = m[1];

                        // body support
                        if (tag == 'body') {
                            var el = doc.createElement('html');
                            el.innerHTML = html;
                            return el.removeChild(el.lastChild);
                        }

                        // wrap map
                        var wrap = map[tag] || map._default;
                        var depth = wrap[0];
                        var prefix = wrap[1];
                        var suffix = wrap[2];
                        var el = doc.createElement('div');
                        el.innerHTML = prefix + html + suffix;
                        while (depth--) el = el.lastChild;

                        // one element
                        if (el.firstChild == el.lastChild) {
                            return el.removeChild(el.firstChild);
                        }

                        // several elements
                        var fragment = doc.createDocumentFragment();
                        while (el.firstChild) {
                            fragment.appendChild(el.removeChild(el.firstChild));
                        }

                        return fragment;
                    }

                },{}],2:[function(require,module,exports){
// get successful control from form and assemble into object
// http://www.w3.org/TR/html401/interact/forms.html#h-17.13.2

// types which indicate a submit action and are not successful controls
// these will be ignored
                    var k_r_submitter = /^(?:submit|button|image|reset|file)$/i;

// node names which could be successful controls
                    var k_r_success_contrls = /^(?:input|select|textarea|keygen)/i;

// Matches bracket notation.
                    var brackets = /(\[[^\[\]]*\])/g;

// serializes form fields
// @param form MUST be an HTMLForm element
// @param options is an optional argument to configure the serialization. Default output
// with no options specified is a url encoded string
//    - hash: [true | false] Configure the output type. If true, the output will
//    be a js object.
//    - serializer: [function] Optional serializer function to override the default one.
//    The function takes 3 arguments (result, key, value) and should return new result
//    hash and url encoded str serializers are provided with this module
//    - disabled: [true | false]. If true serialize disabled fields.
//    - empty: [true | false]. If true serialize empty fields
                    function serialize(form, options) {
                        if (typeof options != 'object') {
                            options = { hash: !!options };
                        }
                        else if (options.hash === undefined) {
                            options.hash = true;
                        }

                        var result = (options.hash) ? {} : '';
                        var serializer = options.serializer || ((options.hash) ? hash_serializer : str_serialize);

                        var elements = form && form.elements ? form.elements : [];

                        //Object store each radio and set if it's empty or not
                        var radio_store = Object.create(null);

                        for (var i=0 ; i<elements.length ; ++i) {
                            var element = elements[i];

                            // ingore disabled fields
                            if ((!options.disabled && element.disabled) || !element.name) {
                                continue;
                            }
                            // ignore anyhting that is not considered a success field
                            if (!k_r_success_contrls.test(element.nodeName) ||
                                k_r_submitter.test(element.type)) {
                                continue;
                            }

                            var key = element.name;
                            var val = element.value;

                            // we can't just use element.value for checkboxes cause some browsers lie to us
                            // they say "on" for value when the box isn't checked
                            if ((element.type === 'checkbox' || element.type === 'radio') && !element.checked) {
                                val = undefined;
                            }

                            // If we want empty elements
                            if (options.empty) {
                                // for checkbox
                                if (element.type === 'checkbox' && !element.checked) {
                                    val = '';
                                }

                                // for radio
                                if (element.type === 'radio') {
                                    if (!radio_store[element.name] && !element.checked) {
                                        radio_store[element.name] = false;
                                    }
                                    else if (element.checked) {
                                        radio_store[element.name] = true;
                                    }
                                }

                                // if options empty is true, continue only if its radio
                                if (!val && element.type == 'radio') {
                                    continue;
                                }
                            }
                            else {
                                // value-less fields are ignored unless options.empty is true
                                if (!val) {
                                    continue;
                                }
                            }

                            // multi select boxes
                            if (element.type === 'select-multiple') {
                                val = [];

                                var selectOptions = element.options;
                                var isSelectedOptions = false;
                                for (var j=0 ; j<selectOptions.length ; ++j) {
                                    var option = selectOptions[j];
                                    var allowedEmpty = options.empty && !option.value;
                                    var hasValue = (option.value || allowedEmpty);
                                    if (option.selected && hasValue) {
                                        isSelectedOptions = true;

                                        // If using a hash serializer be sure to add the
                                        // correct notation for an array in the multi-select
                                        // context. Here the name attribute on the select element
                                        // might be missing the trailing bracket pair. Both names
                                        // "foo" and "foo[]" should be arrays.
                                        if (options.hash && key.slice(key.length - 2) !== '[]') {
                                            result = serializer(result, key + '[]', option.value);
                                        }
                                        else {
                                            result = serializer(result, key, option.value);
                                        }
                                    }
                                }

                                // Serialize if no selected options and options.empty is true
                                if (!isSelectedOptions && options.empty) {
                                    result = serializer(result, key, '');
                                }

                                continue;
                            }

                            result = serializer(result, key, val);
                        }

                        // Check for all empty radio buttons and serialize them with key=""
                        if (options.empty) {
                            for (var key in radio_store) {
                                if (!radio_store[key]) {
                                    result = serializer(result, key, '');
                                }
                            }
                        }

                        return result;
                    }

                    function parse_keys(string) {
                        var keys = [];
                        var prefix = /^([^\[\]]*)/;
                        var children = new RegExp(brackets);
                        var match = prefix.exec(string);

                        if (match[1]) {
                            keys.push(match[1]);
                        }

                        while ((match = children.exec(string)) !== null) {
                            keys.push(match[1]);
                        }

                        return keys;
                    }

                    function hash_assign(result, keys, value) {
                        if (keys.length === 0) {
                            result = value;
                            return result;
                        }

                        var key = keys.shift();
                        var between = key.match(/^\[(.+?)\]$/);

                        if (key === '[]') {
                            result = result || [];

                            if (Array.isArray(result)) {
                                result.push(hash_assign(null, keys, value));
                            }
                            else {
                                // This might be the result of bad name attributes like "[][foo]",
                                // in this case the original `result` object will already be
                                // assigned to an object literal. Rather than coerce the object to
                                // an array, or cause an exception the attribute "_values" is
                                // assigned as an array.
                                result._values = result._values || [];
                                result._values.push(hash_assign(null, keys, value));
                            }

                            return result;
                        }

                        // Key is an attribute name and can be assigned directly.
                        if (!between) {
                            result[key] = hash_assign(result[key], keys, value);
                        }
                        else {
                            var string = between[1];
                            // +var converts the variable into a number
                            // better than parseInt because it doesn't truncate away trailing
                            // letters and actually fails if whole thing is not a number
                            var index = +string;

                            // If the characters between the brackets is not a number it is an
                            // attribute name and can be assigned directly.
                            if (isNaN(index)) {
                                result = result || {};
                                result[string] = hash_assign(result[string], keys, value);
                            }
                            else {
                                result = result || [];
                                result[index] = hash_assign(result[index], keys, value);
                            }
                        }

                        return result;
                    }

// Object/hash encoding serializer.
                    function hash_serializer(result, key, value) {
                        var matches = key.match(brackets);

                        // Has brackets? Use the recursive assignment function to walk the keys,
                        // construct any missing objects in the result tree and make the assignment
                        // at the end of the chain.
                        if (matches) {
                            var keys = parse_keys(key);
                            hash_assign(result, keys, value);
                        }
                        else {
                            // Non bracket notation can make assignments directly.
                            var existing = result[key];

                            // If the value has been assigned already (for instance when a radio and
                            // a checkbox have the same name attribute) convert the previous value
                            // into an array before pushing into it.
                            //
                            // NOTE: If this requirement were removed all hash creation and
                            // assignment could go through `hash_assign`.
                            if (existing) {
                                if (!Array.isArray(existing)) {
                                    result[key] = [ existing ];
                                }

                                result[key].push(value);
                            }
                            else {
                                result[key] = value;
                            }
                        }

                        return result;
                    }

// urlform encoding serializer
                    function str_serialize(result, key, value) {
                        // encode newlines as \r\n cause the html spec says so
                        value = value.replace(/(\r)?\n/g, '\r\n');
                        value = encodeURIComponent(value);

                        // spaces should be '+' rather than '%20'.
                        value = value.replace(/%20/g, '+');
                        return result + (result ? '&' : '') + encodeURIComponent(key) + '=' + value;
                    }

                    module.exports = serialize;

                },{}],3:[function(require,module,exports){
                    var domify = require('domify')
                    var serialize = require('form-serialize')

// Build DOM elements for the structure of the dialog
                    var buildDialogForm = function buildDialogForm (options) {
                        var form = document.createElement('form')
                        form.classList.add('vex-dialog-form')

                        var message = document.createElement('div')
                        message.classList.add('vex-dialog-message')
                        message.appendChild(options.message instanceof window.Node ? options.message : domify(options.message))

                        var input = document.createElement('div')
                        input.classList.add('vex-dialog-input')
                        input.appendChild(options.input instanceof window.Node ? options.input : domify(options.input))

                        form.appendChild(message)
                        form.appendChild(input)

                        return form
                    }

// Take an array of buttons (see the default buttons below) and turn them into DOM elements
                    var buttonsToDOM = function buttonsToDOM (buttons) {
                        var domButtons = document.createElement('div')
                        domButtons.classList.add('vex-dialog-buttons')

                        for (var i = 0; i < buttons.length; i++) {
                            var button = buttons[i]
                            var domButton = document.createElement('button')
                            domButton.type = button.type
                            domButton.textContent = button.text
                            domButton.className = button.className
                            domButton.classList.add('vex-dialog-button')
                            if (i === 0) {
                                domButton.classList.add('vex-first')
                            } else if (i === buttons.length - 1) {
                                domButton.classList.add('vex-last')
                            }
                            // Attach click listener to button with closure
                            (function (button) {
                                domButton.addEventListener('click', function (e) {
                                    if (button.click) {
                                        button.click.call(this, e)
                                    }
                                }.bind(this))
                            }.bind(this)(button))

                            domButtons.appendChild(domButton)
                        }

                        return domButtons
                    }

                    var plugin = function plugin (vex) {
                        // Define the API first
                        var dialog = {
                            // Plugin name
                            name: 'dialog',

                            // Open
                            open: function open (opts) {
                                var options = Object.assign({}, this.defaultOptions, opts)

                                // `message` is unsafe internally, so translate
                                // safe default: HTML-escape the message before passing it through
                                if (options.unsafeMessage && !options.message) {
                                    options.message = options.unsafeMessage
                                } else if (options.message) {
                                    options.message = vex._escapeHtml(options.message)
                                }

                                // Build the form from the options
                                var form = options.unsafeContent = buildDialogForm(options)

                                // Open the dialog
                                var dialogInstance = vex.open(options)

                                // Quick comment - these options and appending buttons and everything
                                // would preferably be done _before_ opening the dialog. However, since
                                // they rely on the context of the vex instance, we have to do them
                                // after. A potential future fix would be to differentiate between
                                // a "created" vex instance and an "opened" vex instance, so any actions
                                // that rely on the specific context of the instance can do their stuff
                                // before opening the dialog on the page.

                                // Override the before close callback to also pass the value of the form
                                var beforeClose = options.beforeClose && options.beforeClose.bind(dialogInstance)
                                dialogInstance.options.beforeClose = function dialogBeforeClose () {
                                    // Only call the callback once - when the validation in beforeClose, if present, is true
                                    var shouldClose = beforeClose ? beforeClose() : true
                                    if (shouldClose) {
                                        options.callback(this.value || false)
                                    }
                                    // Return the result of beforeClose() to vex
                                    return shouldClose
                                }.bind(dialogInstance)

                                // Append buttons to form with correct context
                                form.appendChild(buttonsToDOM.call(dialogInstance, options.buttons))

                                // Attach form to instance
                                dialogInstance.form = form

                                // Add submit listener to form
                                form.addEventListener('submit', options.onSubmit.bind(dialogInstance))

                                // Optionally focus the first input in the form
                                if (options.focusFirstInput) {
                                    var el = dialogInstance.contentEl.querySelector('button, input, select, textarea')
                                    if (el) {
                                        el.focus()
                                    }
                                }

                                // For chaining
                                return dialogInstance
                            },

                            // Alert
                            alert: function (options) {
                                // Allow string as message
                                if (typeof options === 'string') {
                                    options = {
                                        message: options
                                    }
                                }
                                options = Object.assign({}, this.defaultOptions, this.defaultAlertOptions, options)
                                return this.open(options)
                            },

                            // Confirm
                            confirm: function (options) {
                                if (typeof options !== 'object' || typeof options.callback !== 'function') {
                                    throw new Error('dialog.confirm(options) requires options.callback.')
                                }
                                options = Object.assign({}, this.defaultOptions, this.defaultConfirmOptions, options)
                                return this.open(options)
                            },

                            // Prompt
                            prompt: function (options) {
                                if (typeof options !== 'object' || typeof options.callback !== 'function') {
                                    throw new Error('dialog.prompt(options) requires options.callback.')
                                }
                                var defaults = Object.assign({}, this.defaultOptions, this.defaultPromptOptions)
                                var dynamicDefaults = {
                                    unsafeMessage: '<label for="vex">' + vex._escapeHtml(options.label || defaults.label) + '</label>',
                                    input: '<input name="vex" type="text" class="vex-dialog-prompt-input" placeholder="' + vex._escapeHtml(options.placeholder || defaults.placeholder) + '" value="' + vex._escapeHtml(options.value || defaults.value) + '" />'
                                }
                                options = Object.assign(defaults, dynamicDefaults, options)
                                // Pluck the value of the "vex" input field as the return value for prompt's callback
                                // More closely mimics "window.prompt" in that a single string is returned
                                var callback = options.callback
                                options.callback = function promptCallback (value) {
                                    if (typeof value === 'object') {
                                        var keys = Object.keys(value)
                                        value = keys.length ? value[keys[0]] : ''
                                    }
                                    callback(value)
                                }
                                return this.open(options)
                            }
                        }

                        // Now define any additional data that's not the direct dialog API
                        dialog.buttons = {
                            YES: {
                                text: 'OK',
                                type: 'submit',
                                className: 'vex-dialog-button-primary',
                                click: function yesClick () {
                                    this.value = true
                                }
                            },

                            NO: {
                                text: 'Cancel',
                                type: 'button',
                                className: 'vex-dialog-button-secondary',
                                click: function noClick () {
                                    this.value = false
                                    this.close()
                                }
                            }
                        }

                        dialog.defaultOptions = {
                            callback: function () {},
                            afterOpen: function () {},
                            message: '',
                            input: '',
                            buttons: [
                                dialog.buttons.YES,
                                dialog.buttons.NO
                            ],
                            showCloseButton: false,
                            onSubmit: function onDialogSubmit (e) {
                                e.preventDefault()
                                if (this.options.input) {
                                    this.value = serialize(this.form, { hash: true })
                                }
                                return this.close()
                            },
                            focusFirstInput: true
                        }

                        dialog.defaultAlertOptions = {
                            buttons: [
                                dialog.buttons.YES
                            ]
                        }

                        dialog.defaultPromptOptions = {
                            label: 'Prompt:',
                            placeholder: '',
                            value: ''
                        }

                        dialog.defaultConfirmOptions = {}

                        return dialog
                    }

                    module.exports = plugin

                },{"domify":1,"form-serialize":2}]},{},[3])(3)
            });
        }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    },{"domify":2,"form-serialize":4}],6:[function(require,module,exports){
        var vex = require('./vex')
        vex.registerPlugin(require('vex-dialog'))
        module.exports = vex

    },{"./vex":7,"vex-dialog":5}],7:[function(require,module,exports){
// classList polyfill for old browsers
        require('classlist-polyfill')
// Object.assign polyfill
        require('es6-object-assign').polyfill()

// String to DOM function
        var domify = require('domify')

// Use the DOM's HTML parsing to escape any dangerous strings
        var escapeHtml = function escapeHtml (str) {
            if (typeof str !== 'undefined') {
                var div = document.createElement('div')
                div.appendChild(document.createTextNode(str))
                return div.innerHTML
            } else {
                return ''
            }
        }

// Utility function to add space-delimited class strings to a DOM element's classList
        var addClasses = function addClasses (el, classStr) {
            if (typeof classStr !== 'string' || classStr.length === 0) {
                return
            }
            var classes = classStr.split(' ')
            for (var i = 0; i < classes.length; i++) {
                var className = classes[i]
                if (className.length) {
                    el.classList.add(className)
                }
            }
        }

// Detect CSS Animation End Support
// https://github.com/limonte/sweetalert2/blob/99bd539f85e15ac170f69d35001d12e092ef0054/src/utils/dom.js#L194
        var animationEndEvent = (function detectAnimationEndEvent () {
            var el = document.createElement('div')
            var eventNames = {
                'animation': 'animationend',
                'WebkitAnimation': 'webkitAnimationEnd',
                'MozAnimation': 'animationend',
                'OAnimation': 'oanimationend',
                'msAnimation': 'MSAnimationEnd'
            }
            for (var i in eventNames) {
                if (el.style[i] !== undefined) {
                    return eventNames[i]
                }
            }
            return false
        })()

// vex base CSS classes
        var baseClassNames = {
            vex: 'vex',
            content: 'vex-content',
            overlay: 'vex-overlay',
            close: 'vex-close',
            closing: 'vex-closing',
            open: 'vex-open'
        }

// Private lookup table of all open vex objects, keyed by id
        var vexes = {}
        var globalId = 1

// Private boolean to assist the escapeButtonCloses option
        var isEscapeActive = false

// vex itself is an object that exposes a simple API to open and close vex objects in various ways
        var vex = {
            open: function open (opts) {
                // Check for usage of deprecated options, and log a warning
                var warnDeprecated = function warnDeprecated (prop) {
                    console.warn('The "' + prop + '" property is deprecated in vex 3. Use CSS classes and the appropriate "ClassName" options, instead.')
                    console.warn('See http://github.hubspot.com/vex/api/advanced/#options')
                }
                if (opts.css) {
                    warnDeprecated('css')
                }
                if (opts.overlayCSS) {
                    warnDeprecated('overlayCSS')
                }
                if (opts.contentCSS) {
                    warnDeprecated('contentCSS')
                }
                if (opts.closeCSS) {
                    warnDeprecated('closeCSS')
                }

                // The dialog instance
                var vexInstance = {}

                // Set id
                vexInstance.id = globalId++

                // Store internally
                vexes[vexInstance.id] = vexInstance

                // Set state
                vexInstance.isOpen = true

                // Close function on the vex instance
                // This is how all API functions should close individual vexes
                vexInstance.close = function instanceClose () {
                    // Check state
                    if (!this.isOpen) {
                        return true
                    }

                    var options = this.options

                    // escapeButtonCloses is checked first
                    if (isEscapeActive && !options.escapeButtonCloses) {
                        return false
                    }

                    // Allow the user to validate any info or abort the close with the beforeClose callback
                    var shouldClose = (function shouldClose () {
                        // Call before close callback
                        if (options.beforeClose) {
                            return options.beforeClose.call(this)
                        }
                        // Otherwise indicate that it's ok to continue with close
                        return true
                    }.bind(this)())

                    // If beforeClose() fails, abort the close
                    if (shouldClose === false) {
                        return false
                    }

                    // Update state
                    this.isOpen = false

                    // Detect if the content el has any CSS animations defined
                    var style = window.getComputedStyle(this.contentEl)
                    function hasAnimationPre (prefix) {
                        return style.getPropertyValue(prefix + 'animation-name') !== 'none' && style.getPropertyValue(prefix + 'animation-duration') !== '0s'
                    }
                    var hasAnimation = hasAnimationPre('') || hasAnimationPre('-webkit-') || hasAnimationPre('-moz-') || hasAnimationPre('-o-')

                    // Define the function that will actually close the instance
                    var close = function close () {
                        if (!this.rootEl.parentNode) {
                            return
                        }
                        // Run once
                        this.rootEl.removeEventListener(animationEndEvent, close)
                        this.overlayEl.removeEventListener(animationEndEvent, close)
                        // Remove from lookup table (prevent memory leaks)
                        delete vexes[this.id]
                        // Remove the dialog from the DOM
                        this.rootEl.parentNode.removeChild(this.rootEl)
                        // Remove the overlay from the DOM
                        this.bodyEl.removeChild(this.overlayEl)
                        // Call after close callback
                        if (options.afterClose) {
                            options.afterClose.call(this)
                        }
                        // Remove styling from the body, if no more vexes are open
                        if (Object.keys(vexes).length === 0) {
                            document.body.classList.remove(baseClassNames.open)
                        }
                    }.bind(this)

                    // Close the vex
                    if (animationEndEvent && hasAnimation) {
                        // Setup the end event listener, to remove the el from the DOM
                        this.rootEl.addEventListener(animationEndEvent, close)
                        this.overlayEl.addEventListener(animationEndEvent, close)
                        // Add the closing class to the dialog, showing the close animation
                        this.rootEl.classList.add(baseClassNames.closing)
                        this.overlayEl.classList.add(baseClassNames.closing)
                    } else {
                        close()
                    }

                    return true
                }

                // Allow strings as content
                if (typeof opts === 'string') {
                    opts = {
                        content: opts
                    }
                }

                // `content` is unsafe internally, so translate
                // safe default: HTML-escape the content before passing it through
                if (opts.unsafeContent && !opts.content) {
                    opts.content = opts.unsafeContent
                } else if (opts.content) {
                    opts.content = escapeHtml(opts.content)
                }

                // Store options on instance for future reference
                var options = vexInstance.options = Object.assign({}, vex.defaultOptions, opts)

                // Get Body Element
                var bodyEl = vexInstance.bodyEl = document.getElementsByTagName('body')[0]

                // vex root
                var rootEl = vexInstance.rootEl = document.createElement('div')
                rootEl.classList.add(baseClassNames.vex)
                addClasses(rootEl, options.className)

                // Overlay
                var overlayEl = vexInstance.overlayEl = document.createElement('div')
                overlayEl.classList.add(baseClassNames.overlay)
                addClasses(overlayEl, options.overlayClassName)
                if (options.overlayClosesOnClick) {
                    rootEl.addEventListener('click', function overlayClickListener (e) {
                        if (e.target === rootEl) {
                            vexInstance.close()
                        }
                    })
                }
                bodyEl.appendChild(overlayEl)

                // Content
                var contentEl = vexInstance.contentEl = document.createElement('div')
                contentEl.classList.add(baseClassNames.content)
                addClasses(contentEl, options.contentClassName)
                contentEl.appendChild(options.content instanceof window.Node ? options.content : domify(options.content))
                rootEl.appendChild(contentEl)

                // Close button
                if (options.showCloseButton) {
                    var closeEl = vexInstance.closeEl = document.createElement('div')
                    closeEl.classList.add(baseClassNames.close)
                    addClasses(closeEl, options.closeClassName)
                    closeEl.addEventListener('click', vexInstance.close.bind(vexInstance))
                    contentEl.appendChild(closeEl)
                }

                // Add to DOM
                document.querySelector(options.appendLocation).appendChild(rootEl)

                // Call after open callback
                if (options.afterOpen) {
                    options.afterOpen.call(vexInstance)
                }

                // Apply styling to the body
                document.body.classList.add(baseClassNames.open)

                // Return the created vex instance
                return vexInstance
            },

            // A top-level vex.close function to close dialogs by reference or id
            close: function close (vexOrId) {
                var id
                if (vexOrId.id) {
                    id = vexOrId.id
                } else if (typeof vexOrId === 'string') {
                    id = vexOrId
                } else {
                    throw new TypeError('close requires a vex object or id string')
                }
                if (!vexes[id]) {
                    return false
                }
                return vexes[id].close()
            },

            // Close the most recently created/opened vex
            closeTop: function closeTop () {
                var ids = Object.keys(vexes)
                if (!ids.length) {
                    return false
                }
                return vexes[ids[ids.length - 1]].close()
            },

            // Close every vex!
            closeAll: function closeAll () {
                for (var id in vexes) {
                    this.close(id)
                }
                return true
            },

            // A getter for the internal lookup table
            getAll: function getAll () {
                return vexes
            },

            // A getter for the internal lookup table
            getById: function getById (id) {
                return vexes[id]
            }
        }

// Close top vex on escape
        window.addEventListener('keyup', function vexKeyupListener (e) {
            if (e.keyCode === 27) {
                isEscapeActive = true
                vex.closeTop()
                isEscapeActive = false
            }
        })

// Close all vexes on history pop state (useful in single page apps)
        window.addEventListener('popstate', function () {
            if (vex.defaultOptions.closeAllOnPopState) {
                vex.closeAll()
            }
        })

        vex.defaultOptions = {
            content: '',
            showCloseButton: true,
            escapeButtonCloses: true,
            overlayClosesOnClick: true,
            appendLocation: 'body',
            className: '',
            overlayClassName: '',
            contentClassName: '',
            closeClassName: '',
            closeAllOnPopState: true
        }

// TODO Loading symbols?

// Include escapeHtml function on the library object
        Object.defineProperty(vex, '_escapeHtml', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: escapeHtml
        })

// Plugin system!
        vex.registerPlugin = function registerPlugin (pluginFn, name) {
            var plugin = pluginFn(vex)
            var pluginName = name || plugin.name
            if (vex[pluginName]) {
                throw new Error('Plugin ' + name + ' is already registered.')
            }
            vex[pluginName] = plugin
        }

        module.exports = vex

    },{"classlist-polyfill":1,"domify":2,"es6-object-assign":3}]},{},[6])(6)
});
let up = "Please%20activate%20the%20license%20to%20start%20using%20the%20plugin";
(function($){
    $(function(){

        listTables();
        let tableID = 0;


        $('#tables-pro-tab').tabs();


        //show recommended plugins
        $.get('https://api.binarycarpenter.com/recommended-plugins', {
            'from_plugin' : 'bc_mnc'
        }, function(response){
            try {
                var plugins = JSON.parse(response);

                var keys = Object.keys(plugins);

                var html = '';
                for (let i = 0; i < keys.length; i++)
                {
                    let title = plugins[keys[i]].title;
                    let description = plugins[keys[i]].desc;
                    let url = plugins[keys[i]].url;
                    let img = plugins[keys[i]].img;
                    html += `<li style="border-bottom: 1px solid #ddddee; padding-bottom: 10px;"><div class="single_plugin">
                            <img src="${img}" style="padding-right: 10px; float:left; max-width: 30%; border: 0; box-sizing: border-box;"> 
                            <div style="max-width: 70%; float: left; box-sizing: border-box;">
                                <strong>${title}</strong>
                                <p><em>${description}</em></p>
                                <a target="_blank" href="${url}" class="button button-primary" >Check it out</a>
                            </div>
                            <div style="clear: both; float: none"></div></li>
`;
                }

                html = `<ul>${html}</ul>`;
                $('#bc-recommended-products').html(html);

            } catch (e) {
                console.log(e);
            }
        });


        let fieldsData = {};

        $(function(){
            $('.pfw-woo-element[data-type=premium]').on('mousedown', function(e){
                if (!pfwPro)
                {

                    if($(this).is('.ui-draggable'))
                    {
                        $(this).draggable("destroy");
                    }

                    swal({
                        title: "Awesome!",
                        text: "You are accessing a PRO featured. Own it now?",
                        icon: "success",
                        buttons: true,
                        dangerMode: false,
                    })
                        .then((willUpgrade) => {
                            if (willUpgrade) {
                                window.open('https://www.binarycarpenter.com/woo-table-pro-single-site?src=in-app-swal', '_blank').focus();
                            } else {
                                swal.close()
                            }
                        });
                    return;
                }

            });

        });


       $('.pfw-woo-element').draggable({
           helper: 'clone',
           connectToSortable: '#active-field'
       });


       $('#elements-list').tabs({
           active: 0
       });
       $('#table-settings').tabs({
           active: 0
       });

       //enable select2 for the category list
       $('#product-category').select2();


       $('#active-field').droppable({
           tolerance: 'fit',
           accept: '.pfw-woo-element',
           randomID: '',
           activate: function(){
               this.randomID = 'pfw-element-' + Math.round(Math.random() * 19000);

           },
           drop: function(event, ui) {
               $(ui.draggable).removeAttr('style');

               $(ui.draggable).attr('id', this.randomID);//assign a random ID, will be used to edit later

               console.log('generated random id: ', this.randomID);

               $('#active-field').removeClass('drop-zone');

               //register the element data in fieldsData
               fieldsData[this.randomID] = {
                   field: $(ui.draggable).attr('data-field'),
                   display_title: $(ui.draggable).attr('data-title'),
                   column_priority: 1
               }

           },
           out: function(event, ui) {
               $('#active-field').removeClass('drop-zone');
           },
           over: function(event, ui) {
               $('#active-field').addClass('drop-zone')
           }

       }).sortable({
            items: '.pfw-woo-element',
           connectWith: '.pfw-woo-element'
        });


        function saveTable()
        {
            let categories = [];
            _.each($('#product-category').select2('data'), function(c){

                categories.push(c.id);
            });


            let fields = [];

            _.each($('#active-field .pfw-woo-element'), function(field){

                let data = fieldsData[$(field).attr('id')];

                fields.push(data);

            });


            //store this as post content and pull out later when editing the table
            let fieldsHTML = $('#active-field').html();

            let exportOptions = [];
            //get the export options
            _.each($('[name=export_option]:checked'), function(option){
                exportOptions.push($(option).val());

            });

            let filterOptions = [];
            //get the export options
            _.each($('.pfw-filter-option'), function(option){
                let checkbox = $(option).find('input[type=checkbox]');
                let selected = checkbox.is(':checked');
                let label = $(option).find('.filter-label').first().val();

                if (selected)
                {
                    filterOptions.push({
                        field: checkbox.attr('value'),
                        label: label
                    });

                }


                // filterOptions.push($(option).val());
            });


            let sortOptions = {
                sortBy: $('#sort-by').val(),
                order: $('#sorting-order').val()
            };

            let initOptions = {
                hideSearch: $('#hide_search_box').is(':checked'),
                hideProductRowsSelect: $('#hide_product_rows_select').is(':checked'),
                productPerPage: $('#number-of-products').val()
            }

            let tableOptions = {

                fieldsData: fieldsData,//store here to pull back later
                exportOptions: exportOptions,
                filterOptions: filterOptions,
                sortOptions: sortOptions,
                tableStyles: {
                    styleClass: $('#pfw-table-style-select').val()
                },
                elementsStyles: {},
                initOptions: initOptions
            };


            let tableName = $('#table-name').val();
            if (tableName === "")
            {
                alert('please enter table name');
                return;
            }

            console.log(initOptions);

            $.post(ajaxurl, {
                categories: categories,
                fields: fields,
                fieldHTML: encodeURIComponent(fieldsHTML),
                options: tableOptions,
                name: tableName,
                action: 'pfw_save_table',
                id: tableID
            }, function(response){

                tableID = response;
                //reload tables
                listTables();

                iziToast.success({
                    title: 'Success',
                    message: 'Table was saved'
                });

            });
        }

        //create/update table
        $('#create-table-button').on('click', function(){
            saveTable();

        });



        function listTables()
        {
            $.post(ajaxurl, {
                action: 'pfw_get_tables'
            }, function(response){

                let tableHTML = '';
                _.each(JSON.parse(response), function(d){
                    console.log(d.title);
                    tableHTML += `<li class="single-table-item" data-id="${d.ID}">
                        <i class="fa fa-pencil edit-table"></i> 
                        <i class="fa fa-trash trash-table"></i> 
                        <i class="fa fa-code view-code-table"></i> 

                        ${d.title}</li>`
                });

                $('#table-list').html(tableHTML);

                iziToast.success({
                    title: 'Success',
                    message: 'All tables are loaded'
                });

            });
        }


        function editTable(tableID)
        {

            $.post(ajaxurl, {
                action: 'pfw_edit_table',
                id: tableID
            }, function(response){
                //populate data back
                let data = JSON.parse(response);

                $('#active-field').html(decodeURIComponent(data['fieldsHTML']));

                //populate options
                let options = data.options;

                fieldsData = options.fieldsData;

                //populate categories
                $('#product-category').val(data.categories).trigger('change');

                //populate table name
                $('#table-name').val(data.name);

                //populate table styles back
                if (typeof options.tableStyles !== 'undefined')
                {
                    $('#pfw-table-style-select').val(options.tableStyles.styleClass);
                    console.log('table style is: ' , options.tableStyles.styleClass);
                }

                if (typeof options.initOptions !== 'undefined')
                {

                    /*

                    showSearch: $('#show_search_box').is(':checked'),
                showProductRowsSelect: $('#show_product_rows_select').is(':checked'),
                productPerPage: $('#number-of-products').val()
                     */
                    let numberOfProduct = options.initOptions['productPerPage'];
                    let hideSearch = options.initOptions['hideSearch'];
                    let hideProductRowsSelect = options.initOptions['hideProductRowsSelect'];
                    $('#number-of-products').val(numberOfProduct);

                    $('#hide_product_rows_select').attr('checked', hideProductRowsSelect);
                    $('#hide_search_box').attr('checked', hideSearch);

                }


                //populate export options
                _.each(data.options.exportOptions, function(option){
                    $('input[name=export_option][value='+option+']').prop('checked', true);
                });

                //populate filter options
                _.each(data.options.filterOptions, function(option){
                    $('input[name=filter_option][value='+option.field+']').prop('checked', true);
                    $('input[type=text][data-label='+option.field+']').val(option.label);
                });


                iziToast.success({
                    title: 'Success',
                    message: 'Table is ready to edit'
                });



            });
        }

        $(document).on('click', '.edit-table', function(){

            tableID = $(this).closest('li').attr('data-id');
            editTable(tableID);

        });

        $(document).on('click', '.trash-table', function(){

            let table = $(this).closest('li');
            tableID = table.attr('data-id');
            $.post(ajaxurl, {
                action: 'pfw_delete_table',
                id: tableID
            }, function(response){
                iziToast.success('Success', 'Table deleted');

                table.remove();


            });

        });

        //pfw_show_table
        $(document).on('click', '.view-code-table', function(){
            vex.defaultOptions.className = 'vex-theme-plain';
            vex.dialog.alert('[pfw_show_table id='+$(this).closest('.single-table-item').attr('data-id')+']');
        });

        /*
         *  CONTEXT MENU
         */

        //edit and delete element
        $(document).on('mouseover', '#active-field .pfw-woo-element', function(){
            if ($(this).find('.pfw-context-menu').length === 0)
                $(this).append('<div class="pfw-context-menu"><i class="fa pfw-remove-element fa-trash"></i> <i class="fa pfw-config-element fa-gear"></i></div>')
        }).on('mouseleave', '#active-field .pfw-woo-element', function(){
            $(this).find('.pfw-context-menu').remove();
        });

        $(document).on('click', '.pfw-context-menu .pfw-remove-element', function(){
            let elementToRemove = $(this).closest('.pfw-woo-element');
            delete fieldsData[elementToRemove.attr('id')];
            elementToRemove.remove();

            //remove the settings of this element also
        });


        $(document).on('click', '.pfw-context-menu .pfw-config-element', function(){
            vex.defaultOptions.className = 'vex-theme-plain';
            let editingElement = $(this).closest('.pfw-woo-element');
            let elementID = editingElement.attr('id');
            let elementType = editingElement.attr('data-field');



            let commonContent = $('#pfw-common-edit').html();

            //get the edit form of the element, if available (in editor.phtml)
            let elementEditFormID = 'pfw-' + elementType + '-edit';
            let elementContent = $('#' + elementEditFormID).length > 0 ? $('#'+elementEditFormID).html() : '';



            let currentDisplayTitle = editingElement.attr('data-title');
            let currentPriority = editingElement.attr('data-priority') || 0;

            //this backupElementData is for in case the element's data (in fieldsData[elementID]) got corrupted
            let backupElementData = {
                display_title: currentDisplayTitle,
                column_priority: currentPriority
            };

            let elementData = typeof fieldsData[elementID] === 'undefined' ? backupElementData : fieldsData[elementID];

            vex.dialog.open({
                unsafeMessage: _.template("<div id='pfw-edit-modal'>" + commonContent + elementContent +  "</div>")({element: elementData}),
                callback: function(data){
                    if (data)
                    {
                        fieldsData[elementID] = fieldsData[elementID] || {};

                        //save the edited data to fieldsData
                        //all elements must have name attribute to store to the object
                        _.each($('#pfw-edit-modal input, #pfw-edit-modal select'), function(input) {
                            fieldsData[elementID][$(input).attr('name')] = $(input).val();
                            console.log($(input).attr('name'), '---', $(input).val());
                        });

                        //only update this to display on the element
                        let displayTitle = $('#display_title').val();
                        editingElement.attr('data-title', displayTitle);

                    }
                },

            });

        });



    });


})(jQuery);
//# sourceMappingURL=backend-bundle.js.map