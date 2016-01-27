

// universal module definition
( function( window, factory ) {
    'use strict';
    // browser global
    window.revDialog = factory(window);

}( window, function factory(window) {
'use strict';

    var RevDialog = function() {
        var that = this;
        this.id = 'rev-opt-out';
        //this.url = url;
        //setTimeout(function() {that.render();}, 100);
        this.resizeEnd;

        this.addEventHandler(window, 'load', function() {
            that.render();
        });

        this.addEventHandler(window, 'resize', function() {
            clearTimeout(that.resizeEnd);
            that.resizeEnd = setTimeout(function() {
                that.resize();
            }, 100);
        });
    };

    RevDialog.prototype.addEventHandler = function(elem,eventType,handler) {
     if (elem.addEventListener)
         elem.addEventListener (eventType,handler,false);
     else if (elem.attachEvent)
         elem.attachEvent ('on'+eventType,handler);
    }

    RevDialog.prototype.resize = function() {
        this.containerWidth = document.documentElement.clientWidth;
        this.containerHeight = document.documentElement.clientHeight;
        if (this.containerHeight < 455) {
            this.setFullHeight();
        } else if (this.containerHeight >= 455) {
            this.setNormalHeight();
            this.centerDialog();
        }
    };

    RevDialog.prototype.setFullHeight = function() {
        var revDialogBox = document.querySelector('.rd-box');
        this.removeClass(revDialogBox, 'rd-normal');
        this.addClass(revDialogBox, 'rd-full-screen');
        revDialogBox.style.left = '15px';
        revDialogBox.style.top = '15px';
    };

    RevDialog.prototype.setNormalHeight = function() {
        var revDialogBox = document.querySelector('.rd-box');
        this.removeClass(revDialogBox, 'rd-full-screen');
        this.addClass(revDialogBox, 'rd-normal');

    };

    RevDialog.prototype.getContainerWidth = function() {
        var revDialogBox = document.querySelector('.rd-box');
        return revDialogBox.offsetWidth;
    };

    RevDialog.prototype.getContainerHeight = function() {
        var revDialogBox = document.querySelector('.rd-box');
        return revDialogBox.offsetWidth;
    };


    RevDialog.prototype.render = function() {
        var html = '<div class="rd-box-wrap" style="display:none;">' +
                        '<div class="rd-box-overlay" onclick="revDialog.closeDialog()"> &nbsp; </div>' +
                        '<div class="rd-vertical-offset" >' +
                            '<div class="rd-box rd-normal">' +
                                '<div class="rd-header">' +
                                    '<a class="rd-close-button" onclick="revDialog.closeDialog()">' +
                                        '<svg xmlns="http://www.w3.org/2000/svg" fit="" height="20" width="20" preserveAspectRatio="xMidYMid meet" style="pointer-events: none; display: block;" viewBox="0 0 36 36"><path d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z"/></svg>' +
                                    '</a>' +
                                '</div>' +
                                '<div class="rd-content">' +
                                    '<div class="rd-about rd-modal-content">' +
                                        '<a href="http://www.revcontent.com" target="_blank" class="rd-logo"></a>' +
                                        '<p id="main">The content you see here is paid for by the advertiser or content provider whose link you click on, and is recommended to you by <a href="http://www.revcontent.com" target="_blank">Revcontent</a>. As the leading platform for native advertising and content recommendation, <a href="http://www.revcontent.com" target="_blank">Revcontent</a> uses interest based targeting to select content that we think will be of particular interest to you. We encourage you to view our <a href="http://faq.revcontent.com/support/solutions/articles/5000615200-revcontent-s-privacy-policy">Privacy Policy</a> and your opt out options here: <a class="rc-opt-out-link" href="http://faq.revcontent.com/support/solutions/articles/5000615200" target="_blank">Opt Out Options</a></p>' +
                                        '<div class="rd-well">' +
                                    	'<h2>Want your content to appear on sites like this?</h2>' +
                                    	'<p><a href="http://www.revcontent.com" target="_blank">Increase your visitor engagement now!</a></p>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>';

        var el = document.querySelector('#'+this.id);
        if (el) {this.remove(el);}
        var wrap = document.createElement('div');
        wrap.className = 'revdialog';
        wrap.id = this.id;
        wrap.innerHTML = html;
        var bodyEl = document.getElementsByTagName("BODY")[0];
        if (bodyEl !== undefined)
            this.append(bodyEl, wrap);

    };



    RevDialog.prototype.showDialog = function() {
        document.querySelector('.rd-box-wrap').style.display = 'block';
        this.resize();
        return false;
    };

    RevDialog.prototype.closeDialog = function() {
        document.querySelector('.rd-box-wrap').style.display = 'none';
        return false;
    };

    RevDialog.prototype.centerDialog = function() {
        var db = document.querySelector('.rd-box');
        var w = db.offsetWidth;
        var h = db.offsetHeight;

        var left = (this.containerWidth/2)-(w/2);
        var top = (this.containerHeight/2)-(h/2);

        db.style.top = top+'px';
        db.style.left = left+'px';
    };

    RevDialog.prototype.addEventListener = function(el, eventName, handler) {
      if (el.addEventListener) {
        el.addEventListener(eventName, handler);
      } else {
        el.attachEvent('on' + eventName, function(){
          handler.call(el);
        });
      }
    };

    RevDialog.prototype.addClass = function(el, className) {
        if (!el) return false;
        if (el.classList)
          el.classList.add(className);
        else
          el.className += ' ' + className;
    };

    RevDialog.prototype.removeClass = function(el, className) {
        if (!el) return false;
        if (el.classList)
            el.classList.remove(className);
        else
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    };

    RevDialog.prototype.append = function(el, html) {
        if (el !== undefined)
            el.appendChild(html);
    };

    RevDialog.prototype.remove = function(el) {
        el.parentNode.removeChild(el);
    };

    var rD = new RevDialog();

    return rD;

}));
/*! jQuery v1.11.1 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l="1.11.1",m=function(a,b){return new m.fn.init(a,b)},n=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,o=/^-ms-/,p=/-([\da-z])/gi,q=function(a,b){return b.toUpperCase()};m.fn=m.prototype={jquery:l,constructor:m,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=m.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return m.each(this,a,b)},map:function(a){return this.pushStack(m.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},m.extend=m.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||m.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(m.isPlainObject(c)||(b=m.isArray(c)))?(b?(b=!1,f=a&&m.isArray(a)?a:[]):f=a&&m.isPlainObject(a)?a:{},g[d]=m.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},m.extend({expando:"jQuery"+(l+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===m.type(a)},isArray:Array.isArray||function(a){return"array"===m.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return!m.isArray(a)&&a-parseFloat(a)>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==m.type(a)||a.nodeType||m.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(k.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&m.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(o,"ms-").replace(p,q)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=r(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(n,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(r(Object(a))?m.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=r(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),m.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||m.guid++,e):void 0},now:function(){return+new Date},support:k}),m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function r(a){var b=a.length,c=m.type(a);return"function"===c||m.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var s=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+-new Date,v=a.document,w=0,x=0,y=gb(),z=gb(),A=gb(),B=function(a,b){return a===b&&(l=!0),0},C="undefined",D=1<<31,E={}.hasOwnProperty,F=[],G=F.pop,H=F.push,I=F.push,J=F.slice,K=F.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},L="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",N="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=N.replace("w","w#"),P="\\["+M+"*("+N+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+O+"))|)"+M+"*\\]",Q=":("+N+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+P+")*)|.*)\\)|)",R=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),S=new RegExp("^"+M+"*,"+M+"*"),T=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp("="+M+"*([^\\]'\"]*?)"+M+"*\\]","g"),V=new RegExp(Q),W=new RegExp("^"+O+"$"),X={ID:new RegExp("^#("+N+")"),CLASS:new RegExp("^\\.("+N+")"),TAG:new RegExp("^("+N.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+Q),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+L+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{I.apply(F=J.call(v.childNodes),v.childNodes),F[v.childNodes.length].nodeType}catch(eb){I={apply:F.length?function(a,b){H.apply(a,J.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],!a||"string"!=typeof a)return d;if(1!==(k=b.nodeType)&&9!==k)return[];if(p&&!e){if(f=_.exec(a))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return I.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return I.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=9===k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+qb(o[l]);w=ab.test(a)&&ob(b.parentNode)||b,x=o.join(",")}if(x)try{return I.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function gb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function hb(a){return a[u]=!0,a}function ib(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function jb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function kb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||D)-(~a.sourceIndex||D);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function lb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function nb(a){return hb(function(b){return b=+b,hb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function ob(a){return a&&typeof a.getElementsByTagName!==C&&a}c=fb.support={},f=fb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fb.setDocument=function(a){var b,e=a?a.ownerDocument||a:v,g=e.defaultView;return e!==n&&9===e.nodeType&&e.documentElement?(n=e,o=e.documentElement,p=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){m()},!1):g.attachEvent&&g.attachEvent("onunload",function(){m()})),c.attributes=ib(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ib(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(e.getElementsByClassName)&&ib(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=ib(function(a){return o.appendChild(a).id=u,!e.getElementsByName||!e.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==C&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c=typeof a.getAttributeNode!==C&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==C?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==C&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(e.querySelectorAll))&&(ib(function(a){a.innerHTML="<select msallowclip=''><option selected=''></option></select>",a.querySelectorAll("[msallowclip^='']").length&&q.push("[*^$]="+M+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+M+"*(?:value|"+L+")"),a.querySelectorAll(":checked").length||q.push(":checked")}),ib(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+M+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ib(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",Q)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===v&&t(v,a)?-1:b===e||b.ownerDocument===v&&t(v,b)?1:k?K.call(k,a)-K.call(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],i=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:k?K.call(k,a)-K.call(k,b):0;if(f===g)return kb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?kb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},e):n},fb.matches=function(a,b){return fb(a,null,null,b)},fb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fb(b,n,null,[a]).length>0},fb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&E.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fb.selectors={cacheLength:50,createPseudo:hb,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+M+")"+a+"("+M+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==C&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?hb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=K.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:hb(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?hb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:hb(function(a){return function(b){return fb(a,b).length>0}}),contains:hb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:hb(function(a){return W.test(a||"")||fb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:nb(function(){return[0]}),last:nb(function(a,b){return[b-1]}),eq:nb(function(a,b,c){return[0>c?c+b:c]}),even:nb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:nb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:nb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:nb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=lb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=mb(b);function pb(){}pb.prototype=d.filters=d.pseudos,d.setFilters=new pb,g=fb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fb.error(a):z(a,i).slice(0)};function qb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function rb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function sb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function tb(a,b,c){for(var d=0,e=b.length;e>d;d++)fb(a,b[d],c);return c}function ub(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function vb(a,b,c,d,e,f){return d&&!d[u]&&(d=vb(d)),e&&!e[u]&&(e=vb(e,f)),hb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||tb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ub(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ub(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?K.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ub(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):I.apply(g,r)})}function wb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=rb(function(a){return a===b},h,!0),l=rb(function(a){return K.call(b,a)>-1},h,!0),m=[function(a,c,d){return!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>i;i++)if(c=d.relative[a[i].type])m=[rb(sb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return vb(i>1&&sb(m),i>1&&qb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&wb(a.slice(i,e)),f>e&&wb(a=a.slice(e)),f>e&&qb(a))}m.push(c)}return sb(m)}function xb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=G.call(i));s=ub(s)}I.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&fb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?hb(f):f}return h=fb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xb(e,d)),f.selector=a}return f},i=fb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&ob(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qb(j),!a)return I.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&ob(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ib(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ib(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||jb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ib(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||jb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ib(function(a){return null==a.getAttribute("disabled")})||jb(L,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fb}(a);m.find=s,m.expr=s.selectors,m.expr[":"]=m.expr.pseudos,m.unique=s.uniqueSort,m.text=s.getText,m.isXMLDoc=s.isXML,m.contains=s.contains;var t=m.expr.match.needsContext,u=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,v=/^.[^:#\[\.,]*$/;function w(a,b,c){if(m.isFunction(b))return m.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return m.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(v.test(b))return m.filter(b,a,c);b=m.filter(b,a)}return m.grep(a,function(a){return m.inArray(a,b)>=0!==c})}m.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?m.find.matchesSelector(d,a)?[d]:[]:m.find.matches(a,m.grep(b,function(a){return 1===a.nodeType}))},m.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(m(a).filter(function(){for(b=0;e>b;b++)if(m.contains(d[b],this))return!0}));for(b=0;e>b;b++)m.find(a,d[b],c);return c=this.pushStack(e>1?m.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(w(this,a||[],!1))},not:function(a){return this.pushStack(w(this,a||[],!0))},is:function(a){return!!w(this,"string"==typeof a&&t.test(a)?m(a):a||[],!1).length}});var x,y=a.document,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=m.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||x).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof m?b[0]:b,m.merge(this,m.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:y,!0)),u.test(c[1])&&m.isPlainObject(b))for(c in b)m.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=y.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return x.find(a);this.length=1,this[0]=d}return this.context=y,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):m.isFunction(a)?"undefined"!=typeof x.ready?x.ready(a):a(m):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),m.makeArray(a,this))};A.prototype=m.fn,x=m(y);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};m.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!m(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),m.fn.extend({has:function(a){var b,c=m(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(m.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=t.test(a)||"string"!=typeof a?m(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&m.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?m.unique(f):f)},index:function(a){return a?"string"==typeof a?m.inArray(this[0],m(a)):m.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(m.unique(m.merge(this.get(),m(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}m.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return m.dir(a,"parentNode")},parentsUntil:function(a,b,c){return m.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return m.dir(a,"nextSibling")},prevAll:function(a){return m.dir(a,"previousSibling")},nextUntil:function(a,b,c){return m.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return m.dir(a,"previousSibling",c)},siblings:function(a){return m.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return m.sibling(a.firstChild)},contents:function(a){return m.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:m.merge([],a.childNodes)}},function(a,b){m.fn[a]=function(c,d){var e=m.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=m.filter(d,e)),this.length>1&&(C[a]||(e=m.unique(e)),B.test(a)&&(e=e.reverse())),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return m.each(a.match(E)||[],function(a,c){b[c]=!0}),b}m.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):m.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){m.each(b,function(b,c){var d=m.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&m.each(arguments,function(a,c){var d;while((d=m.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?m.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},m.extend({Deferred:function(a){var b=[["resolve","done",m.Callbacks("once memory"),"resolved"],["reject","fail",m.Callbacks("once memory"),"rejected"],["notify","progress",m.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return m.Deferred(function(c){m.each(b,function(b,f){var g=m.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&m.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?m.extend(a,d):d}},e={};return d.pipe=d.then,m.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&m.isFunction(a.promise)?e:0,g=1===f?a:m.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&m.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;m.fn.ready=function(a){return m.ready.promise().done(a),this},m.extend({isReady:!1,readyWait:1,holdReady:function(a){a?m.readyWait++:m.ready(!0)},ready:function(a){if(a===!0?!--m.readyWait:!m.isReady){if(!y.body)return setTimeout(m.ready);m.isReady=!0,a!==!0&&--m.readyWait>0||(H.resolveWith(y,[m]),m.fn.triggerHandler&&(m(y).triggerHandler("ready"),m(y).off("ready")))}}});function I(){y.addEventListener?(y.removeEventListener("DOMContentLoaded",J,!1),a.removeEventListener("load",J,!1)):(y.detachEvent("onreadystatechange",J),a.detachEvent("onload",J))}function J(){(y.addEventListener||"load"===event.type||"complete"===y.readyState)&&(I(),m.ready())}m.ready.promise=function(b){if(!H)if(H=m.Deferred(),"complete"===y.readyState)setTimeout(m.ready);else if(y.addEventListener)y.addEventListener("DOMContentLoaded",J,!1),a.addEventListener("load",J,!1);else{y.attachEvent("onreadystatechange",J),a.attachEvent("onload",J);var c=!1;try{c=null==a.frameElement&&y.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!m.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}I(),m.ready()}}()}return H.promise(b)};var K="undefined",L;for(L in m(k))break;k.ownLast="0"!==L,k.inlineBlockNeedsLayout=!1,m(function(){var a,b,c,d;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",k.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(d))}),function(){var a=y.createElement("div");if(null==k.deleteExpando){k.deleteExpando=!0;try{delete a.test}catch(b){k.deleteExpando=!1}}a=null}(),m.acceptData=function(a){var b=m.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var M=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,N=/([A-Z])/g;function O(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(N,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:M.test(c)?m.parseJSON(c):c}catch(e){}m.data(a,b,c)}else c=void 0}return c}function P(a){var b;for(b in a)if(("data"!==b||!m.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function Q(a,b,d,e){if(m.acceptData(a)){var f,g,h=m.expando,i=a.nodeType,j=i?m.cache:a,k=i?a[h]:a[h]&&h;
if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||m.guid++:h),j[k]||(j[k]=i?{}:{toJSON:m.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=m.extend(j[k],b):j[k].data=m.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[m.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[m.camelCase(b)])):f=g,f}}function R(a,b,c){if(m.acceptData(a)){var d,e,f=a.nodeType,g=f?m.cache:a,h=f?a[m.expando]:m.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){m.isArray(b)?b=b.concat(m.map(b,m.camelCase)):b in d?b=[b]:(b=m.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!P(d):!m.isEmptyObject(d))return}(c||(delete g[h].data,P(g[h])))&&(f?m.cleanData([a],!0):k.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}m.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?m.cache[a[m.expando]]:a[m.expando],!!a&&!P(a)},data:function(a,b,c){return Q(a,b,c)},removeData:function(a,b){return R(a,b)},_data:function(a,b,c){return Q(a,b,c,!0)},_removeData:function(a,b){return R(a,b,!0)}}),m.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=m.data(f),1===f.nodeType&&!m._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=m.camelCase(d.slice(5)),O(f,d,e[d])));m._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){m.data(this,a)}):arguments.length>1?this.each(function(){m.data(this,a,b)}):f?O(f,a,m.data(f,a)):void 0},removeData:function(a){return this.each(function(){m.removeData(this,a)})}}),m.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=m._data(a,b),c&&(!d||m.isArray(c)?d=m._data(a,b,m.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=m.queue(a,b),d=c.length,e=c.shift(),f=m._queueHooks(a,b),g=function(){m.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return m._data(a,c)||m._data(a,c,{empty:m.Callbacks("once memory").add(function(){m._removeData(a,b+"queue"),m._removeData(a,c)})})}}),m.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?m.queue(this[0],a):void 0===b?this:this.each(function(){var c=m.queue(this,a,b);m._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&m.dequeue(this,a)})},dequeue:function(a){return this.each(function(){m.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=m.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=m._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=["Top","Right","Bottom","Left"],U=function(a,b){return a=b||a,"none"===m.css(a,"display")||!m.contains(a.ownerDocument,a)},V=m.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===m.type(c)){e=!0;for(h in c)m.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,m.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(m(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},W=/^(?:checkbox|radio)$/i;!function(){var a=y.createElement("input"),b=y.createElement("div"),c=y.createDocumentFragment();if(b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",k.leadingWhitespace=3===b.firstChild.nodeType,k.tbody=!b.getElementsByTagName("tbody").length,k.htmlSerialize=!!b.getElementsByTagName("link").length,k.html5Clone="<:nav></:nav>"!==y.createElement("nav").cloneNode(!0).outerHTML,a.type="checkbox",a.checked=!0,c.appendChild(a),k.appendChecked=a.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,c.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,k.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){k.noCloneEvent=!1}),b.cloneNode(!0).click()),null==k.deleteExpando){k.deleteExpando=!0;try{delete b.test}catch(d){k.deleteExpando=!1}}}(),function(){var b,c,d=y.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(k[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),k[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var X=/^(?:input|select|textarea)$/i,Y=/^key/,Z=/^(?:mouse|pointer|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=/^([^.]*)(?:\.(.+)|)$/;function ab(){return!0}function bb(){return!1}function cb(){try{return y.activeElement}catch(a){}}m.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=m.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof m===K||a&&m.event.triggered===a.type?void 0:m.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(E)||[""],h=b.length;while(h--)f=_.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=m.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=m.event.special[o]||{},l=m.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&m.expr.match.needsContext.test(e),namespace:p.join(".")},i),(n=g[o])||(n=g[o]=[],n.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?n.splice(n.delegateCount++,0,l):n.push(l),m.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m.hasData(a)&&m._data(a);if(r&&(k=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=_.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=m.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,n=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=n.length;while(f--)g=n[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(n.splice(f,1),g.selector&&n.delegateCount--,l.remove&&l.remove.call(a,g));i&&!n.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||m.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)m.event.remove(a,o+b[j],c,d,!0);m.isEmptyObject(k)&&(delete r.handle,m._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,o=[d||y],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||y,3!==d.nodeType&&8!==d.nodeType&&!$.test(p+m.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[m.expando]?b:new m.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:m.makeArray(c,[b]),k=m.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!m.isWindow(d)){for(i=k.delegateType||p,$.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||y)&&o.push(l.defaultView||l.parentWindow||a)}n=0;while((h=o[n++])&&!b.isPropagationStopped())b.type=n>1?i:k.bindType||p,f=(m._data(h,"events")||{})[b.type]&&m._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&m.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&m.acceptData(d)&&g&&d[p]&&!m.isWindow(d)){l=d[g],l&&(d[g]=null),m.event.triggered=p;try{d[p]()}catch(r){}m.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=m.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(m._data(this,"events")||{})[a.type]||[],k=m.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=m.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((m.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?m(c,this).index(i)>=0:m.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[m.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=Z.test(e)?this.mouseHooks:Y.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new m.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||y),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||y,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==cb()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===cb()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return m.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return m.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=m.extend(new m.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?m.event.trigger(e,null,b):m.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},m.removeEvent=y.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===K&&(a[d]=null),a.detachEvent(d,c))},m.Event=function(a,b){return this instanceof m.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ab:bb):this.type=a,b&&m.extend(this,b),this.timeStamp=a&&a.timeStamp||m.now(),void(this[m.expando]=!0)):new m.Event(a,b)},m.Event.prototype={isDefaultPrevented:bb,isPropagationStopped:bb,isImmediatePropagationStopped:bb,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ab,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ab,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ab,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},m.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){m.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!m.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.submitBubbles||(m.event.special.submit={setup:function(){return m.nodeName(this,"form")?!1:void m.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=m.nodeName(b,"input")||m.nodeName(b,"button")?b.form:void 0;c&&!m._data(c,"submitBubbles")&&(m.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),m._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&m.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return m.nodeName(this,"form")?!1:void m.event.remove(this,"._submit")}}),k.changeBubbles||(m.event.special.change={setup:function(){return X.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(m.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),m.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),m.event.simulate("change",this,a,!0)})),!1):void m.event.add(this,"beforeactivate._change",function(a){var b=a.target;X.test(b.nodeName)&&!m._data(b,"changeBubbles")&&(m.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||m.event.simulate("change",this.parentNode,a,!0)}),m._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return m.event.remove(this,"._change"),!X.test(this.nodeName)}}),k.focusinBubbles||m.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){m.event.simulate(b,a.target,m.event.fix(a),!0)};m.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=m._data(d,b);e||d.addEventListener(a,c,!0),m._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=m._data(d,b)-1;e?m._data(d,b,e):(d.removeEventListener(a,c,!0),m._removeData(d,b))}}}),m.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=bb;else if(!d)return this;return 1===e&&(g=d,d=function(a){return m().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=m.guid++)),this.each(function(){m.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,m(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=bb),this.each(function(){m.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){m.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?m.event.trigger(a,b,c,!0):void 0}});function db(a){var b=eb.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var eb="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",fb=/ jQuery\d+="(?:null|\d+)"/g,gb=new RegExp("<(?:"+eb+")[\\s/>]","i"),hb=/^\s+/,ib=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,jb=/<([\w:]+)/,kb=/<tbody/i,lb=/<|&#?\w+;/,mb=/<(?:script|style|link)/i,nb=/checked\s*(?:[^=]|=\s*.checked.)/i,ob=/^$|\/(?:java|ecma)script/i,pb=/^true\/(.*)/,qb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,rb={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:k.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},sb=db(y),tb=sb.appendChild(y.createElement("div"));rb.optgroup=rb.option,rb.tbody=rb.tfoot=rb.colgroup=rb.caption=rb.thead,rb.th=rb.td;function ub(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==K?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==K?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||m.nodeName(d,b)?f.push(d):m.merge(f,ub(d,b));return void 0===b||b&&m.nodeName(a,b)?m.merge([a],f):f}function vb(a){W.test(a.type)&&(a.defaultChecked=a.checked)}function wb(a,b){return m.nodeName(a,"table")&&m.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function xb(a){return a.type=(null!==m.find.attr(a,"type"))+"/"+a.type,a}function yb(a){var b=pb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function zb(a,b){for(var c,d=0;null!=(c=a[d]);d++)m._data(c,"globalEval",!b||m._data(b[d],"globalEval"))}function Ab(a,b){if(1===b.nodeType&&m.hasData(a)){var c,d,e,f=m._data(a),g=m._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)m.event.add(b,c,h[c][d])}g.data&&(g.data=m.extend({},g.data))}}function Bb(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!k.noCloneEvent&&b[m.expando]){e=m._data(b);for(d in e.events)m.removeEvent(b,d,e.handle);b.removeAttribute(m.expando)}"script"===c&&b.text!==a.text?(xb(b).text=a.text,yb(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),k.html5Clone&&a.innerHTML&&!m.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&W.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}m.extend({clone:function(a,b,c){var d,e,f,g,h,i=m.contains(a.ownerDocument,a);if(k.html5Clone||m.isXMLDoc(a)||!gb.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(tb.innerHTML=a.outerHTML,tb.removeChild(f=tb.firstChild)),!(k.noCloneEvent&&k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||m.isXMLDoc(a)))for(d=ub(f),h=ub(a),g=0;null!=(e=h[g]);++g)d[g]&&Bb(e,d[g]);if(b)if(c)for(h=h||ub(a),d=d||ub(f),g=0;null!=(e=h[g]);g++)Ab(e,d[g]);else Ab(a,f);return d=ub(f,"script"),d.length>0&&zb(d,!i&&ub(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,l,n=a.length,o=db(b),p=[],q=0;n>q;q++)if(f=a[q],f||0===f)if("object"===m.type(f))m.merge(p,f.nodeType?[f]:f);else if(lb.test(f)){h=h||o.appendChild(b.createElement("div")),i=(jb.exec(f)||["",""])[1].toLowerCase(),l=rb[i]||rb._default,h.innerHTML=l[1]+f.replace(ib,"<$1></$2>")+l[2],e=l[0];while(e--)h=h.lastChild;if(!k.leadingWhitespace&&hb.test(f)&&p.push(b.createTextNode(hb.exec(f)[0])),!k.tbody){f="table"!==i||kb.test(f)?"<table>"!==l[1]||kb.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)m.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}m.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),k.appendChecked||m.grep(ub(p,"input"),vb),q=0;while(f=p[q++])if((!d||-1===m.inArray(f,d))&&(g=m.contains(f.ownerDocument,f),h=ub(o.appendChild(f),"script"),g&&zb(h),c)){e=0;while(f=h[e++])ob.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=m.expando,j=m.cache,l=k.deleteExpando,n=m.event.special;null!=(d=a[h]);h++)if((b||m.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)n[e]?m.event.remove(d,e):m.removeEvent(d,e,g.handle);j[f]&&(delete j[f],l?delete d[i]:typeof d.removeAttribute!==K?d.removeAttribute(i):d[i]=null,c.push(f))}}}),m.fn.extend({text:function(a){return V(this,function(a){return void 0===a?m.text(this):this.empty().append((this[0]&&this[0].ownerDocument||y).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?m.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||m.cleanData(ub(c)),c.parentNode&&(b&&m.contains(c.ownerDocument,c)&&zb(ub(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&m.cleanData(ub(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&m.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return m.clone(this,a,b)})},html:function(a){return V(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(fb,""):void 0;if(!("string"!=typeof a||mb.test(a)||!k.htmlSerialize&&gb.test(a)||!k.leadingWhitespace&&hb.test(a)||rb[(jb.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(ib,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(m.cleanData(ub(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,m.cleanData(ub(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,n=this,o=l-1,p=a[0],q=m.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&nb.test(p))return this.each(function(c){var d=n.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(i=m.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=m.map(ub(i,"script"),xb),f=g.length;l>j;j++)d=i,j!==o&&(d=m.clone(d,!0,!0),f&&m.merge(g,ub(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,m.map(g,yb),j=0;f>j;j++)d=g[j],ob.test(d.type||"")&&!m._data(d,"globalEval")&&m.contains(h,d)&&(d.src?m._evalUrl&&m._evalUrl(d.src):m.globalEval((d.text||d.textContent||d.innerHTML||"").replace(qb,"")));i=c=null}return this}}),m.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){m.fn[a]=function(a){for(var c,d=0,e=[],g=m(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),m(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Cb,Db={};function Eb(b,c){var d,e=m(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:m.css(e[0],"display");return e.detach(),f}function Fb(a){var b=y,c=Db[a];return c||(c=Eb(a,b),"none"!==c&&c||(Cb=(Cb||m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Cb[0].contentWindow||Cb[0].contentDocument).document,b.write(),b.close(),c=Eb(a,b),Cb.detach()),Db[a]=c),c}!function(){var a;k.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,d;return c=y.getElementsByTagName("body")[0],c&&c.style?(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(y.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(d),a):void 0}}();var Gb=/^margin/,Hb=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ib,Jb,Kb=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ib=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||m.contains(a.ownerDocument,a)||(g=m.style(a,b)),Hb.test(g)&&Gb.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):y.documentElement.currentStyle&&(Ib=function(a){return a.currentStyle},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Hb.test(g)&&!Kb.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Lb(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h;if(b=y.createElement("div"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=d&&d.style){c.cssText="float:left;opacity:.5",k.opacity="0.5"===c.opacity,k.cssFloat=!!c.cssFloat,b.style.backgroundClip="content-box",b.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===b.style.backgroundClip,k.boxSizing=""===c.boxSizing||""===c.MozBoxSizing||""===c.WebkitBoxSizing,m.extend(k,{reliableHiddenOffsets:function(){return null==g&&i(),g},boxSizingReliable:function(){return null==f&&i(),f},pixelPosition:function(){return null==e&&i(),e},reliableMarginRight:function(){return null==h&&i(),h}});function i(){var b,c,d,i;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),b.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",e=f=!1,h=!0,a.getComputedStyle&&(e="1%"!==(a.getComputedStyle(b,null)||{}).top,f="4px"===(a.getComputedStyle(b,null)||{width:"4px"}).width,i=b.appendChild(y.createElement("div")),i.style.cssText=b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",b.style.width="1px",h=!parseFloat((a.getComputedStyle(i,null)||{}).marginRight)),b.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=b.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",g=0===i[0].offsetHeight,g&&(i[0].style.display="",i[1].style.display="none",g=0===i[0].offsetHeight),c.removeChild(d))}}}(),m.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Mb=/alpha\([^)]*\)/i,Nb=/opacity\s*=\s*([^)]*)/,Ob=/^(none|table(?!-c[ea]).+)/,Pb=new RegExp("^("+S+")(.*)$","i"),Qb=new RegExp("^([+-])=("+S+")","i"),Rb={position:"absolute",visibility:"hidden",display:"block"},Sb={letterSpacing:"0",fontWeight:"400"},Tb=["Webkit","O","Moz","ms"];function Ub(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Tb.length;while(e--)if(b=Tb[e]+c,b in a)return b;return d}function Vb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=m._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&U(d)&&(f[g]=m._data(d,"olddisplay",Fb(d.nodeName)))):(e=U(d),(c&&"none"!==c||!e)&&m._data(d,"olddisplay",e?c:m.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Wb(a,b,c){var d=Pb.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Xb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=m.css(a,c+T[f],!0,e)),d?("content"===c&&(g-=m.css(a,"padding"+T[f],!0,e)),"margin"!==c&&(g-=m.css(a,"border"+T[f]+"Width",!0,e))):(g+=m.css(a,"padding"+T[f],!0,e),"padding"!==c&&(g+=m.css(a,"border"+T[f]+"Width",!0,e)));return g}function Yb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ib(a),g=k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Jb(a,b,f),(0>e||null==e)&&(e=a.style[b]),Hb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Xb(a,b,c||(g?"border":"content"),d,f)+"px"}m.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Jb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":k.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=m.camelCase(b),i=a.style;if(b=m.cssProps[h]||(m.cssProps[h]=Ub(i,h)),g=m.cssHooks[b]||m.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Qb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(m.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||m.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=m.camelCase(b);return b=m.cssProps[h]||(m.cssProps[h]=Ub(a.style,h)),g=m.cssHooks[b]||m.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Jb(a,b,d)),"normal"===f&&b in Sb&&(f=Sb[b]),""===c||c?(e=parseFloat(f),c===!0||m.isNumeric(e)?e||0:f):f}}),m.each(["height","width"],function(a,b){m.cssHooks[b]={get:function(a,c,d){return c?Ob.test(m.css(a,"display"))&&0===a.offsetWidth?m.swap(a,Rb,function(){return Yb(a,b,d)}):Yb(a,b,d):void 0},set:function(a,c,d){var e=d&&Ib(a);return Wb(a,c,d?Xb(a,b,d,k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,e),e):0)}}}),k.opacity||(m.cssHooks.opacity={get:function(a,b){return Nb.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=m.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===m.trim(f.replace(Mb,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Mb.test(f)?f.replace(Mb,e):f+" "+e)}}),m.cssHooks.marginRight=Lb(k.reliableMarginRight,function(a,b){return b?m.swap(a,{display:"inline-block"},Jb,[a,"marginRight"]):void 0}),m.each({margin:"",padding:"",border:"Width"},function(a,b){m.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+T[d]+b]=f[d]||f[d-2]||f[0];return e}},Gb.test(a)||(m.cssHooks[a+b].set=Wb)}),m.fn.extend({css:function(a,b){return V(this,function(a,b,c){var d,e,f={},g=0;if(m.isArray(b)){for(d=Ib(a),e=b.length;e>g;g++)f[b[g]]=m.css(a,b[g],!1,d);return f}return void 0!==c?m.style(a,b,c):m.css(a,b)},a,b,arguments.length>1)},show:function(){return Vb(this,!0)},hide:function(){return Vb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){U(this)?m(this).show():m(this).hide()})}});function Zb(a,b,c,d,e){return new Zb.prototype.init(a,b,c,d,e)}m.Tween=Zb,Zb.prototype={constructor:Zb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(m.cssNumber[c]?"":"px")
},cur:function(){var a=Zb.propHooks[this.prop];return a&&a.get?a.get(this):Zb.propHooks._default.get(this)},run:function(a){var b,c=Zb.propHooks[this.prop];return this.pos=b=this.options.duration?m.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Zb.propHooks._default.set(this),this}},Zb.prototype.init.prototype=Zb.prototype,Zb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=m.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){m.fx.step[a.prop]?m.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[m.cssProps[a.prop]]||m.cssHooks[a.prop])?m.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Zb.propHooks.scrollTop=Zb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},m.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},m.fx=Zb.prototype.init,m.fx.step={};var $b,_b,ac=/^(?:toggle|show|hide)$/,bc=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),cc=/queueHooks$/,dc=[ic],ec={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=bc.exec(b),f=e&&e[3]||(m.cssNumber[a]?"":"px"),g=(m.cssNumber[a]||"px"!==f&&+d)&&bc.exec(m.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,m.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function fc(){return setTimeout(function(){$b=void 0}),$b=m.now()}function gc(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=T[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function hc(a,b,c){for(var d,e=(ec[b]||[]).concat(ec["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ic(a,b,c){var d,e,f,g,h,i,j,l,n=this,o={},p=a.style,q=a.nodeType&&U(a),r=m._data(a,"fxshow");c.queue||(h=m._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,n.always(function(){n.always(function(){h.unqueued--,m.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=m.css(a,"display"),l="none"===j?m._data(a,"olddisplay")||Fb(a.nodeName):j,"inline"===l&&"none"===m.css(a,"float")&&(k.inlineBlockNeedsLayout&&"inline"!==Fb(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",k.shrinkWrapBlocks()||n.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],ac.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||m.style(a,d)}else j=void 0;if(m.isEmptyObject(o))"inline"===("none"===j?Fb(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=m._data(a,"fxshow",{}),f&&(r.hidden=!q),q?m(a).show():n.done(function(){m(a).hide()}),n.done(function(){var b;m._removeData(a,"fxshow");for(b in o)m.style(a,b,o[b])});for(d in o)g=hc(q?r[d]:0,d,n),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function jc(a,b){var c,d,e,f,g;for(c in a)if(d=m.camelCase(c),e=b[d],f=a[c],m.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=m.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kc(a,b,c){var d,e,f=0,g=dc.length,h=m.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=$b||fc(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:m.extend({},b),opts:m.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:$b||fc(),duration:c.duration,tweens:[],createTween:function(b,c){var d=m.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jc(k,j.opts.specialEasing);g>f;f++)if(d=dc[f].call(j,a,k,j.opts))return d;return m.map(k,hc,j),m.isFunction(j.opts.start)&&j.opts.start.call(a,j),m.fx.timer(m.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}m.Animation=m.extend(kc,{tweener:function(a,b){m.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],ec[c]=ec[c]||[],ec[c].unshift(b)},prefilter:function(a,b){b?dc.unshift(a):dc.push(a)}}),m.speed=function(a,b,c){var d=a&&"object"==typeof a?m.extend({},a):{complete:c||!c&&b||m.isFunction(a)&&a,duration:a,easing:c&&b||b&&!m.isFunction(b)&&b};return d.duration=m.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in m.fx.speeds?m.fx.speeds[d.duration]:m.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){m.isFunction(d.old)&&d.old.call(this),d.queue&&m.dequeue(this,d.queue)},d},m.fn.extend({fadeTo:function(a,b,c,d){return this.filter(U).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=m.isEmptyObject(a),f=m.speed(b,c,d),g=function(){var b=kc(this,m.extend({},a),f);(e||m._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=m.timers,g=m._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&cc.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&m.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=m._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=m.timers,g=d?d.length:0;for(c.finish=!0,m.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),m.each(["toggle","show","hide"],function(a,b){var c=m.fn[b];m.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gc(b,!0),a,d,e)}}),m.each({slideDown:gc("show"),slideUp:gc("hide"),slideToggle:gc("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){m.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),m.timers=[],m.fx.tick=function(){var a,b=m.timers,c=0;for($b=m.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||m.fx.stop(),$b=void 0},m.fx.timer=function(a){m.timers.push(a),a()?m.fx.start():m.timers.pop()},m.fx.interval=13,m.fx.start=function(){_b||(_b=setInterval(m.fx.tick,m.fx.interval))},m.fx.stop=function(){clearInterval(_b),_b=null},m.fx.speeds={slow:600,fast:200,_default:400},m.fn.delay=function(a,b){return a=m.fx?m.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e;b=y.createElement("div"),b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=y.createElement("select"),e=c.appendChild(y.createElement("option")),a=b.getElementsByTagName("input")[0],d.style.cssText="top:1px",k.getSetAttribute="t"!==b.className,k.style=/top/.test(d.getAttribute("style")),k.hrefNormalized="/a"===d.getAttribute("href"),k.checkOn=!!a.value,k.optSelected=e.selected,k.enctype=!!y.createElement("form").enctype,c.disabled=!0,k.optDisabled=!e.disabled,a=y.createElement("input"),a.setAttribute("value",""),k.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),k.radioValue="t"===a.value}();var lc=/\r/g;m.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=m.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,m(this).val()):a,null==e?e="":"number"==typeof e?e+="":m.isArray(e)&&(e=m.map(e,function(a){return null==a?"":a+""})),b=m.valHooks[this.type]||m.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=m.valHooks[e.type]||m.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(lc,""):null==c?"":c)}}}),m.extend({valHooks:{option:{get:function(a){var b=m.find.attr(a,"value");return null!=b?b:m.trim(m.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&m.nodeName(c.parentNode,"optgroup"))){if(b=m(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=m.makeArray(b),g=e.length;while(g--)if(d=e[g],m.inArray(m.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),m.each(["radio","checkbox"],function(){m.valHooks[this]={set:function(a,b){return m.isArray(b)?a.checked=m.inArray(m(a).val(),b)>=0:void 0}},k.checkOn||(m.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var mc,nc,oc=m.expr.attrHandle,pc=/^(?:checked|selected)$/i,qc=k.getSetAttribute,rc=k.input;m.fn.extend({attr:function(a,b){return V(this,m.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){m.removeAttr(this,a)})}}),m.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===K?m.prop(a,b,c):(1===f&&m.isXMLDoc(a)||(b=b.toLowerCase(),d=m.attrHooks[b]||(m.expr.match.bool.test(b)?nc:mc)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=m.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void m.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=m.propFix[c]||c,m.expr.match.bool.test(c)?rc&&qc||!pc.test(c)?a[d]=!1:a[m.camelCase("default-"+c)]=a[d]=!1:m.attr(a,c,""),a.removeAttribute(qc?c:d)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&m.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),nc={set:function(a,b,c){return b===!1?m.removeAttr(a,c):rc&&qc||!pc.test(c)?a.setAttribute(!qc&&m.propFix[c]||c,c):a[m.camelCase("default-"+c)]=a[c]=!0,c}},m.each(m.expr.match.bool.source.match(/\w+/g),function(a,b){var c=oc[b]||m.find.attr;oc[b]=rc&&qc||!pc.test(b)?function(a,b,d){var e,f;return d||(f=oc[b],oc[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,oc[b]=f),e}:function(a,b,c){return c?void 0:a[m.camelCase("default-"+b)]?b.toLowerCase():null}}),rc&&qc||(m.attrHooks.value={set:function(a,b,c){return m.nodeName(a,"input")?void(a.defaultValue=b):mc&&mc.set(a,b,c)}}),qc||(mc={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},oc.id=oc.name=oc.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},m.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:mc.set},m.attrHooks.contenteditable={set:function(a,b,c){mc.set(a,""===b?!1:b,c)}},m.each(["width","height"],function(a,b){m.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),k.style||(m.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var sc=/^(?:input|select|textarea|button|object)$/i,tc=/^(?:a|area)$/i;m.fn.extend({prop:function(a,b){return V(this,m.prop,a,b,arguments.length>1)},removeProp:function(a){return a=m.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),m.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!m.isXMLDoc(a),f&&(b=m.propFix[b]||b,e=m.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=m.find.attr(a,"tabindex");return b?parseInt(b,10):sc.test(a.nodeName)||tc.test(a.nodeName)&&a.href?0:-1}}}}),k.hrefNormalized||m.each(["href","src"],function(a,b){m.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),k.optSelected||(m.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),m.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){m.propFix[this.toLowerCase()]=this}),k.enctype||(m.propFix.enctype="encoding");var uc=/[\t\r\n\f]/g;m.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=m.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?m.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(m.isFunction(a)?function(c){m(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=m(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===K||"boolean"===c)&&(this.className&&m._data(this,"__className__",this.className),this.className=this.className||a===!1?"":m._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(uc," ").indexOf(b)>=0)return!0;return!1}}),m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){m.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),m.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var vc=m.now(),wc=/\?/,xc=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;m.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=m.trim(b+"");return e&&!m.trim(e.replace(xc,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():m.error("Invalid JSON: "+b)},m.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||m.error("Invalid XML: "+b),c};var yc,zc,Ac=/#.*$/,Bc=/([?&])_=[^&]*/,Cc=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Dc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Ec=/^(?:GET|HEAD)$/,Fc=/^\/\//,Gc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Hc={},Ic={},Jc="*/".concat("*");try{zc=location.href}catch(Kc){zc=y.createElement("a"),zc.href="",zc=zc.href}yc=Gc.exec(zc.toLowerCase())||[];function Lc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(m.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Mc(a,b,c,d){var e={},f=a===Ic;function g(h){var i;return e[h]=!0,m.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Nc(a,b){var c,d,e=m.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&m.extend(!0,a,c),a}function Oc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Pc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}m.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:zc,type:"GET",isLocal:Dc.test(yc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Jc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":m.parseJSON,"text xml":m.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Nc(Nc(a,m.ajaxSettings),b):Nc(m.ajaxSettings,a)},ajaxPrefilter:Lc(Hc),ajaxTransport:Lc(Ic),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=m.ajaxSetup({},b),l=k.context||k,n=k.context&&(l.nodeType||l.jquery)?m(l):m.event,o=m.Deferred(),p=m.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Cc.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||zc)+"").replace(Ac,"").replace(Fc,yc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=m.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(c=Gc.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===yc[1]&&c[2]===yc[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(yc[3]||("http:"===yc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=m.param(k.data,k.traditional)),Mc(Hc,k,b,v),2===t)return v;h=k.global,h&&0===m.active++&&m.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Ec.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(wc.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Bc.test(e)?e.replace(Bc,"$1_="+vc++):e+(wc.test(e)?"&":"?")+"_="+vc++)),k.ifModified&&(m.lastModified[e]&&v.setRequestHeader("If-Modified-Since",m.lastModified[e]),m.etag[e]&&v.setRequestHeader("If-None-Match",m.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Jc+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Mc(Ic,k,b,v)){v.readyState=1,h&&n.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Oc(k,v,c)),u=Pc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(m.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(m.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&n.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(n.trigger("ajaxComplete",[v,k]),--m.active||m.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return m.get(a,b,c,"json")},getScript:function(a,b){return m.get(a,void 0,b,"script")}}),m.each(["get","post"],function(a,b){m[b]=function(a,c,d,e){return m.isFunction(c)&&(e=e||d,d=c,c=void 0),m.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),m.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){m.fn[b]=function(a){return this.on(b,a)}}),m._evalUrl=function(a){return m.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},m.fn.extend({wrapAll:function(a){if(m.isFunction(a))return this.each(function(b){m(this).wrapAll(a.call(this,b))});if(this[0]){var b=m(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(m.isFunction(a)?function(b){m(this).wrapInner(a.call(this,b))}:function(){var b=m(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=m.isFunction(a);return this.each(function(c){m(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){m.nodeName(this,"body")||m(this).replaceWith(this.childNodes)}).end()}}),m.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!k.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||m.css(a,"display"))},m.expr.filters.visible=function(a){return!m.expr.filters.hidden(a)};var Qc=/%20/g,Rc=/\[\]$/,Sc=/\r?\n/g,Tc=/^(?:submit|button|image|reset|file)$/i,Uc=/^(?:input|select|textarea|keygen)/i;function Vc(a,b,c,d){var e;if(m.isArray(b))m.each(b,function(b,e){c||Rc.test(a)?d(a,e):Vc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==m.type(b))d(a,b);else for(e in b)Vc(a+"["+e+"]",b[e],c,d)}m.param=function(a,b){var c,d=[],e=function(a,b){b=m.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=m.ajaxSettings&&m.ajaxSettings.traditional),m.isArray(a)||a.jquery&&!m.isPlainObject(a))m.each(a,function(){e(this.name,this.value)});else for(c in a)Vc(c,a[c],b,e);return d.join("&").replace(Qc,"+")},m.fn.extend({serialize:function(){return m.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=m.prop(this,"elements");return a?m.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!m(this).is(":disabled")&&Uc.test(this.nodeName)&&!Tc.test(a)&&(this.checked||!W.test(a))}).map(function(a,b){var c=m(this).val();return null==c?null:m.isArray(c)?m.map(c,function(a){return{name:b.name,value:a.replace(Sc,"\r\n")}}):{name:b.name,value:c.replace(Sc,"\r\n")}}).get()}}),m.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&Zc()||$c()}:Zc;var Wc=0,Xc={},Yc=m.ajaxSettings.xhr();a.ActiveXObject&&m(a).on("unload",function(){for(var a in Xc)Xc[a](void 0,!0)}),k.cors=!!Yc&&"withCredentials"in Yc,Yc=k.ajax=!!Yc,Yc&&m.ajaxTransport(function(a){if(!a.crossDomain||k.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Wc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Xc[g],b=void 0,f.onreadystatechange=m.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Xc[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function Zc(){try{return new a.XMLHttpRequest}catch(b){}}function $c(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}m.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return m.globalEval(a),a}}}),m.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),m.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=y.head||m("head")[0]||y.documentElement;return{send:function(d,e){b=y.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var _c=[],ad=/(=)\?(?=&|$)|\?\?/;m.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=_c.pop()||m.expando+"_"+vc++;return this[a]=!0,a}}),m.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(ad.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&ad.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=m.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(ad,"$1"+e):b.jsonp!==!1&&(b.url+=(wc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||m.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,_c.push(e)),g&&m.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),m.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||y;var d=u.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=m.buildFragment([a],b,e),e&&e.length&&m(e).remove(),m.merge([],d.childNodes))};var bd=m.fn.load;m.fn.load=function(a,b,c){if("string"!=typeof a&&bd)return bd.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=m.trim(a.slice(h,a.length)),a=a.slice(0,h)),m.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&m.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?m("<div>").append(m.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},m.expr.filters.animated=function(a){return m.grep(m.timers,function(b){return a===b.elem}).length};var cd=a.document.documentElement;function dd(a){return m.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}m.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=m.css(a,"position"),l=m(a),n={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=m.css(a,"top"),i=m.css(a,"left"),j=("absolute"===k||"fixed"===k)&&m.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),m.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(n.top=b.top-h.top+g),null!=b.left&&(n.left=b.left-h.left+e),"using"in b?b.using.call(a,n):l.css(n)}},m.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){m.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,m.contains(b,e)?(typeof e.getBoundingClientRect!==K&&(d=e.getBoundingClientRect()),c=dd(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===m.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),m.nodeName(a[0],"html")||(c=a.offset()),c.top+=m.css(a[0],"borderTopWidth",!0),c.left+=m.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-m.css(d,"marginTop",!0),left:b.left-c.left-m.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||cd;while(a&&!m.nodeName(a,"html")&&"static"===m.css(a,"position"))a=a.offsetParent;return a||cd})}}),m.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);m.fn[a]=function(d){return V(this,function(a,d,e){var f=dd(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?m(f).scrollLeft():e,c?e:m(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),m.each(["top","left"],function(a,b){m.cssHooks[b]=Lb(k.pixelPosition,function(a,c){return c?(c=Jb(a,b),Hb.test(c)?m(a).position()[b]+"px":c):void 0})}),m.each({Height:"height",Width:"width"},function(a,b){m.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){m.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return V(this,function(b,c,d){var e;return m.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?m.css(b,c,g):m.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),m.fn.size=function(){return this.length},m.fn.andSelf=m.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return m});var ed=a.jQuery,fd=a.$;return m.noConflict=function(b){return a.$===m&&(a.$=fd),b&&a.jQuery===m&&(a.jQuery=ed),m},typeof b===K&&(a.jQuery=a.$=m),m});
/**
 * RevChimp.js
 *
 * @author     Julien Chinapen <julien@revcontent.com>
 * @copyright  2015 Integraclick Inc.
 * @license    http://www.integraclick.com Integraclick License
 * @link       http://www.revcontent.com
 * @todo       Remove console.logs
 * @todo       Integrate with Gulp build process
 * @todo       Finalize CDN Endpoint for Subscription URL!
 */
(function ($, window, document, undefined) {

    var RevChimp = {
        exitMask: $('#revexitmask'),
        exitUnit: $('#revexitunit'),
        formName: 'form_revsubscriber',
        endpoints: {
            production: 'https://trends.revcontent.com/rx_subscribe.php?callback=revchimpCallback',
            dev: 'http://delivery.localhost/rx_subscribe.php?callback=revchimpCallback',
            local: 'http://localhost/rx_subscribe.php?callback=revchimpCallback'
        },
        subscription_url: '',
        apiKey: null,
        listID: null,
        email: null,
        choice: '',
        subscriberElement: $('.revexitsubscriber:first'),
        selectElement: $("#RevChimpInputSelect"),
        inputElement: $("#RevChimpInputEmail"),
        submitElement: $("#RevChimpSubscribeButton"),
        alertElement: null,
        spinnerElement: null,
        message: "",
        serviceUnavailable: "Server endpoint unavailable, please try again later.",
        subscriber: null,
        styles: '/* inject:css */.revexititem{position:relative;overflow:hidden}.revexititem .revexitsubscriber.hidden{top:-500px}#revexitunit .revexititem .revexitsubscriber,#revexitunit .revexititem .revexitsubscriber *,#revexitunit .revexititem:last-of-type{box-sizing:border-box}.revexititem .revexitsubscriber{width:100%;height:100%;overflow:hidden;font-size:13px;color:#676767;z-index:2147483605;position:absolute;top:0;left:0;font-family:Montseratt,Arial,sans-serif;border:1px solid transparent;padding:8px;box-sizing:border-box;-webkit-transition:all .5s ease-in-out;transition:all .5s ease-in-out;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAFoCAYAAADttMYPAAAAGXRFW…Zt27bD2rZt23ZY27Zt27Yd1rZt27Zth7Vt27Y/1v4lwABrGsduKxaPMQAAAABJRU5ErkJggg==)}.revexititem .revexitsubscriber.successful{background-color:#dff0d8;border-color:#d6e9c6;color:#3c763d}.revexititem .revexitsubscriber.successful:before{font-size:18px;content:" Subscription Confirmed ";font-weight:700;margin:0 0 10px;display:block;color:#3c763d}.revexititem .revexitsubscriber.successful .subscribe-header,.revexititem .revexitsubscriber.successful .subscribe-message{display:none}.revexititem .revexitsubscriber.failed{background-color:#f2dede;border-color:transparent;color:#a94442}.revexititem .revexitsubscriber.failed .subscribe-alert.failed-subscription{color:#676767;background-color:rgba(220,220,220,.95)}.revexititem .revexitsubscriber.failed .subscribe-alert.failed-subscription:before{content:"Error! ";font-weight:700}.revexititem .revexitsubscriber.successful .subscribe-alert.successful-subscription{color:#3c763d;background-color:rgba(223,240,216,.95)}.revexititem .revexitsubscriber.successful .subscribe-alert.successful-subscription:before{content:"Success! ";font-weight:700}.revexititem .revexitsubscriber div{margin:0;padding:0}.revexititem .revexitsubscriber .subscribe-close{position:absolute;right:10px;bottom:10px;width:16px;height:16px;display:block;cursor:pointer;z-index:2147483605;background-color:#111;color:#ddd;-webkit-transition:all .5s ease-in-out;transition:all .5s ease-in-out;line-height:16px;text-align:center;border-radius:2px;-webkit-border-radius:2px;-moz-border-radius:2px;-o-border-radius:2px}.revexititem .revexitsubscriber .subscribe-close:hover{background-color:#4cc93d;color:#fff}.revexititem .revexitsubscriber .subscribe-close:after{content:" x "}.revexititem .revexitsubscriber .subscribe-alert{position:absolute;top:0;left:0;width:100%;height:100%;padding:10px;font-size:14px;color:#444;background-color:rgba(220,220,220,.9)}.revexititem .revexitsubscriber .subscribe-header{font-weight:700;font-size:18px;line-height:120%;margin-bottom:10px;color:#444;text-transform:none}.revexititem .revexitsubscriber .subscribe-message{font-size:14px;color:inherit}.revexititem .revexitsubscriber .subscribe-button,.revexititem .revexitsubscriber .subscribe-input{display:block;width:100%;font-size:12px;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;-o-border-radius:3px;height:32px;line-height:32px;padding:0 10px;z-index:inherit;outline:0;-webkit-transition:all .5s ease-in;transition:all .5s ease-in}.revexititem .revexitsubscriber .subscribe-input:focus{border-color:#4cc93d}.revexititem .revexitsubscriber .subscribe-input{border:1px solid #ddd;margin:7px 0;color:#444}.revexititem .revexitsubscriber .subscribe-button{border:1px solid #555;background-color:#333;color:#fff;text-transform:uppercase;letter-spacing:1px;font-weight:700;cursor:pointer;font-size:14px}.revexititem .revexitsubscriber .subscribe-button:hover{background-color:#4cc93d}.revexititem .revexitsubscriber .subscribe-loader{display:none;position:absolute;left:8px;bottom:18px;width:50px;height:16px;border:0;z-index:2147483605}.chimploader{list-style:none;margin:0;padding:0;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%);font-size:0}.chimploader.reversed li{border:3px solid #fff;-webkit-animation:LOADINGREV 2s infinite;animation:LOADINGREV 2s infinite}.chimploader.reversed li:nth-child(1n){-webkit-animation-delay:0s;animation-delay:0s}.chimploader.reversed li:nth-child(2n){-webkit-animation-delay:.2s;animation-delay:.2s}.chimploader.reversed li:nth-child(3n){-webkit-animation-delay:.4s;animation-delay:.4s}.chimploader li{position:absolute;top:50%;left:0;margin:0;height:10px;width:10px;border:3px solid #4cc93d;border-radius:100%;-webkit-transform:transformZ(0);-ms-transform:transformZ(0);transform:transformZ(0);-webkit-animation:LOADING 2s infinite;animation:LOADING 2s infinite}.chimploader li:nth-child(1n){left:-20px;-webkit-animation-delay:0s;animation-delay:0s}.chimploader li:nth-child(2n){left:0;-webkit-animation-delay:.2s;animation-delay:.2s}.chimploader li:nth-child(3n){left:20px;-webkit-animation-delay:.4s;animation-delay:.4s}.grid-row:after{content:"";display:table;clear:both}.grid-row .col{position:absolute;top:0;left:0;bottom:0;width:50%}.grid-row .col+.col{background:#2b8ccd;left:auto;right:0}@-webkit-keyframes LOADING{0%{-webkit-transform:scale(.5);transform:scale(.5);background:#2b8ccd}50%{-webkit-transform:scale(1);transform:scale(1);background:#fff}100%{-webkit-transform:scale(.5);transform:scale(.5);background:#4cc93d}}@keyframes LOADING{0%,100%{-webkit-transform:scale(.5);transform:scale(.5);background:#4cc93d}50%{-webkit-transform:scale(1);transform:scale(1);background:#fff}}@-webkit-keyframes LOADINGREV{0%,100%{-webkit-transform:scale(.5);transform:scale(.5);background:#fff}50%{-webkit-transform:scale(1);transform:scale(1);background:#4cc93d}}@keyframes LOADINGREV{0%,100%{-webkit-transform:scale(.5);transform:scale(.5);background:#fff}50%{-webkit-transform:scale(1);transform:scale(1);background:#4cc93d}}#revexitunit{transition:all .3s ease-out;-moz-transition:all .3s ease-out;-webkit-transition:all .3s ease-out;-o-transition:all .3s ease-out}.modal-hd.taskbar-theme #revexitunit{width:956px;max-width:956px;padding:0;transition:all .3s ease-out;-moz-transition:all .3s ease-out;-webkit-transition:all .3s ease-out;-o-transition:all .3s ease-out}.modal-hd.taskbar-theme #revexitadpanel{width:956px;max-width:956px;margin:0;transition:all .3s ease-out;-moz-transition:all .3s ease-out;-webkit-transition:all .3s ease-out;-o-transition:all .3s ease-out}.modal-hd.taskbar-theme #revexitadpanel.white-bg{background-color:rgba(255,255255,.9)}.modal-hd.taskbar-theme #revexitheader{margin:0;padding:0 18px;height:40px;line-height:40px;font-size:23px;background-color:#eee;border-bottom:1px solid #4cc93d;transition:all .3s ease-out;-moz-transition:all .3s ease-out;-webkit-transition:all .3s ease-out;-o-transition:all .3s ease-out}.modal-hd.taskbar-theme #revexitcloseme{right:20px;background-size:contain;width:15px;height:15px;margin-top:15px}.modal-hd.taskbar-theme .revexititem{margin-right:0;margin-bottom:0}#revexitmask.modal-hd.taskbar-theme>#revexitunit.revexitunitwrap{background:0 0;padding:0}#revexitmask.modal-hd.taskbar-theme>#revexitunit.revexitunitwrap.white-bg{padding:0}.modal-hd.taskbar-theme #revexitheader.white-bg{background-color:#fff;border-bottom:1px solid #fff}#revtaskbar.revtaskbar{display:block;width:100%;padding:0;top:0;min-height:92px;box-sizing:border-box;background-color:#252525;border-top:1px solid #4cc93d;color:#eee;font-family:Montsteratt,sans-serif;position:relative;opacity:1;transition:all .3s ease-out;-moz-transition:all .3s ease-out;-webkit-transition:all .3s ease-out;-o-transition:all .3s ease-out}#revtaskbar.revtaskbar.hidden{top:-50px;opacity:0;transition:all .3s ease-out;-moz-transition:all .3s ease-out;-webkit-transition:all .3s ease-out;-o-transition:all .3s ease-out}#revtaskbar.revtaskbar.detached{top:50px;opacity:0}#revtaskbar.revtaskbar p{margin:0 0 10px;padding:0}#revtaskbar.revtaskbar:before{content:"";width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid #4cc93d;position:absolute;top:0;left:46%}#revtaskbar.revtaskbar:hover{border-top:6px solid #4cc93d}#revtaskbar.revtaskbar .padder{padding:18px}#revtaskbar.revtaskbar button,#revtaskbar.revtaskbar input,#revtaskbar.revtaskbar select,#revtaskbar.revtaskbar textarea{height:28px;line-height:28px;padding:0 6px;border:1px solid #666;margin-right:15px;border-radius:4px;outline:0!important;box-sizing:border-box;font-size:15px;box-shadow:3px 3px 1px rgba(0,0,0,.25);-webkit-box-shadow:3px 3px 1px rgba(0,0,0,.25);-moz-box-shadow:3px 3px 1px rgba(0,0,0,.25);-o-box-shadow:3px 3px 1px rgba(0,0,0,.25);transition:all .3s ease-out;-moz-transition:all .3s ease-out;-webkit-transition:all .3s ease-out;-o-transition:all .3s ease-out;font-family:Montsteratt,sans-serif;color:#333}#revtaskbar.revtaskbar select{float:left;width:200px}#revtaskbar.revtaskbar input{float:left;width:200px;margin-right:0;border-top-right-radius:0;border-bottom-right-radius:0;border-right:0}#revtaskbar.revtaskbar input:focus{border-color:#4cc93d}#revtaskbar .subscribe-loader{display:none;position:absolute;right:36px;bottom:26px;width:50px;height:16px;border:0;z-index:2147483605}#revtaskbar.revtaskbar button{float:left;border-top-left-radius:0;border-bottom-left-radius:0;border-left:0;cursor:pointer;padding:0 10px;text-transform:uppercase;font-weight:700}#revtaskbar.revtaskbar button:hover{background-color:#4cc93d;color:#fff}#revtaskbar.revtaskbar .subscribe-alert{position:absolute;top:0;left:0;width:100%;display:block;height:100%;opacity:.8;padding:18px;text-align:center;font-size:16px;color:#444;background-color:rgba(220,220,220,.9)}#revtaskbar.revtaskbar .subscribe-alert.failed-subscription{color:#676767;background-color:rgba(220,220,220,.95)}#revtaskbar.revtaskbar .subscribe-alert.failed-subscription:before{content:"Error! ";font-weight:700}#revtaskbar.revtaskbar .subscribe-alert.successful-subscription{color:#3c763d;background-color:rgba(223,240,216,.95)}#revtaskbar.revtaskbar .subscribe-alert.successful-subscription:before{content:"Success! ";font-weight:700}#revtaskbar.revtaskbar .subscribe-message{margin-bottom:10px}/* endinject */',
        init: function () {
            console.log("RevChimp: Initializing Revchimp");
            window.RevChimp = RevChimp;
        },
        shutdown: function(){
            console.log("RevChimp: Shutting Down! Detaching nodes and cleaning up...");
            $('#revexitmask').removeClass("taskbar-theme");
            $('#revexitmask').removeClass("tile-theme");
            $("#revexitunit").removeClass("chimp-initialized");
            if(this.subscriber !== null && typeof this.subscriber === "object"){
                this.subscriber.detach();
            }
            if( typeof $('#revtaskbar') === "object" && $('#revtaskbar').length > 0){
                $('#revtaskbar').detach();
            }
            if( typeof $('#revexit_styles_alt') === "object" && $('#revexit_styles_alt').length > 0){
                $('revexit_styles_alt').detach();
            }
        },
        configureEndpoint: function(){
            this.subscription_url = /localhost|local/i.test(top.location.hostname) ? this.endpoints.dev : this.endpoints.production;
            console.log("Configuring JSONP Endpoint URL ... --> " + this.subscription_url);
        },
        loadSettings: function(subscription_settings){
            console.log("RevChimp: Loading Settings: ", subscription_settings);
            this.settings = subscription_settings;
        },
        selectUI: function(parent_node){
            console.log("RevChimp: Selecting UI Theme");
            switch(this.settings.theme){
                case "tile":
                    this.tileUI(parent_node);
                break;
                case "taskbar":
                default:
                    this.taskbarUI(parent_node);
                break;
            }

        },
        render: function(subscription_settings){
            console.log("RevChimp: Rendering UI ...");
            console.log("RevChimp: Associating Parent Node: " + $("#revexitunit").attr('id'));
            var that = this;
            that.loadSettings(subscription_settings);
            that.selectUI($("#revexitunit"));
            that.renderStyles();
            that.setupBindings();
            that.setProperties();
            $("#revexitunit").addClass("chimp-initialized");
        },
        renderStyles: function(){
            console.log("RevChimp: Injecting Stylesheets..");
            $('#revexit_styles_alt').detach();
            var styles = $('<style type="text/css" id="revexit_styles_alt" />');
            styles.html(this.styles);
            $('body').append(styles);
        },
        setProperties: function () {
            console.log("RevChimp: Setup Internal Properties");
            this.configureEndpoint();
            this.email = this.inputElement.val();
            this.choice = this.selectElement.val();
            this.apiKey = this.subscriberElement.attr("data-apikey");
            this.listID = this.subscriberElement.attr("data-listid");
            this.message = this.subscriberElement.attr("data-message");
        },
        setupBindings: function () {
            console.log("RevChimp: Setup Event Bindings");
            this.exitMask = $('#revexitmask');
            this.exitUnit = $('#revexitunit');
            this.subscriberElement = $('.revexitsubscriber:first');
            this.selectElement = $("#RevChimpInputSelect");
            this.inputElement = $("#RevChimpInputEmail");
            this.submitElement = $("#RevChimpSubscribeButton");
            this.alertElement = this.subscriberElement.find('.subscribe-alert');
            this.spinnerElement = this.subscriberElement.find('.subscribe-loader');
            this.submitElement.on('click', this.subscribe);
        },
        subscribe: function () {
            console.log("RevChimp: Subscription Request Started...");
            var that = RevChimp;
            that.setProperties();
            var subscribe_ajax = $.ajax({
                url: that.subscription_url,
                xhrFields: {
                    withCredentials: true
                },
                timeout: 15000,
                crossDomain: true,
                dataType: 'jsonp',
                jsonp: false,
                jsonpCallback: "revchimpCallback",
                type: 'post',
                data: {api_key: that.apiKey, list_id: that.listID, email: that.email, choice: that.choice},
                beforeSend: function () {
                    that.submitElement.addClass("disabled").attr({disabled: true});
                    that.spinnerElement.fadeIn(300);
                },
                success: function (subscription_response) {
                    that.spinnerElement.fadeOut(300, function () {
                        if (subscription_response.subscribed == true) {
                            console.log("RevChimp: Completed subscription....", subscription_response);
                            that.subscriberElement.find('.subscribe-message').fadeOut(200);
                            that.inputElement.fadeOut(200);
                            that.selectElement.fadeOut(200);
                            that.submitElement.removeClass("disabled").attr({disabled: false}).fadeOut(200);
                            that.subscriberElement.removeClass("failed").addClass("successful");
                            that.alertElement.removeClass("failed-subscription").addClass("successful-subscription").text(subscription_response.message).fadeIn(200, function(){

                                if(that.settings.theme === "taskbar") {
                                    $(this).delay(5000).fadeOut(200, function () {

                                    });

                                    setTimeout(function () {
                                        that.subscriber.addClass("detached");
                                        that.shutdown();
                                        $('#revexitmask').removeClass("taskbar-theme");
                                        $('.revexititem').animate({margin: '4px 4px'}, 500, function () {
                                            $('#revexitheader').addClass("white-bg");
                                            $('#revexitadpanel').addClass("white-bg");
                                        });

                                    }, 6000);
                                }

                            });

                        } else {
                            console.log("RevChimp: Failed subscription....");
                            that.inputElement.fadeIn(200);
                            that.selectElement.fadeIn(200);
                            that.submitElement.removeClass("disabled").attr({disabled: false});
                            that.subscriberElement.removeClass("successful").addClass("failed");
                            that.subscriberElement.find('.subscribe-alert').removeClass("successful-subscription").addClass("failed-subscription").text(subscription_response.message).fadeIn(200).delay(3000).fadeOut(200, function(){
                                setTimeout(function () {
                                    that.subscriberElement.removeClass("failed");
                                }, 5000);
                            });

                        }
                    });
                },
                error: function (subscription_response) {
                    console.log("RevChimp: Connection failed....");
                    that.spinnerElement.fadeOut(300, function () {
                        that.inputElement.fadeIn(200);
                        that.selectElement.fadeIn(200);
                        that.submitElement.removeClass("disabled").attr({disabled: false});
                        that.subscriberElement.addClass("failed");
                        that.subscriberElement.find('.subscribe-alert').removeClass("successful-subscription").addClass("failed-subscription").text(that.serviceUnavailable).fadeIn(200).delay(3000).fadeOut();
                    });
                },
                complete: function(xhrObj){
                    console.log("RevChimp: AJAX Completed....");
                }
            });
        },
        buildOptionsList: function(choices) {
          var options_stack = [],
              choices_list = choices.split(','),
              total_choices = choices_list.length;
            if(total_choices > 0){
                for(c=0;c<total_choices;c++){
                    var opt_html = '<option value="' + choices_list[c] + '">' + choices_list[c] + '</option>';
                    options_stack.push(opt_html);
                }
            }

            return options_stack;
        },
        taskbarUI: function (parent_node) {
            console.log("RevChimp: Build Taskbar UI (Affix to Bottom of Modal)...");
            var that = this;
            $('.revexitsubscriber').detach();
            if (typeof parent_node == "object") {
                console.log("RevChimp: Attaching to Parent Node..." + parent_node.id);
                $('#revexitmask').removeClass("tile-theme").addClass("taskbar-theme");
                var subscriber_taskbar = $('<div />'),
                    subscriber_form = $('<form method="post" action="' + this.subscription_url + '" name="' + this.formName + '" id="' + this.formName + '" />'),
                    subscriber_padder = $('<div />').addClass('padder'),
                    subscriber_alert = $('<div />').addClass("subscribe-alert").hide(),
                    subscriber_choice = $('<select />').attr({id: "RevChimpInputSelect", name: "RevChimpInputSelect"}).append(this.buildOptionsList(this.settings.choices)),
                    subscriber_loader = $('<div />').addClass("subscribe-loader").hide().append($('<ul />').addClass("chimploader").append(['<li></li>', '<li></li>', '<li></li>'])),
                    subscriber_message = $('<div />').addClass("subscribe-message").text(this.settings.message),

                    subscriber_input = $('<input />').addClass("subscribe-input").attr({
                        'id': 'RevChimpInputEmail',
                        'name': 'RevChimpInputEmail',
                        'type': 'text',
                        'placeholder': 'E-mail Address'
                    }),
                    subscriber_button = $('<button />').addClass("subscribe-button").attr({
                        'id': 'RevChimpSubscribeButton',
                        'name': 'RevChimpSubscribeButton',
                        'type': 'button'
                    }).text(this.settings.button),
                    clearfix = $('<div />').attr('style', 'clear:both;display:block;');
                    subscriber_taskbar.attr({"id": "revtaskbar"}).addClass("revtaskbar revexitsubscriber hidden").append([subscriber_alert, subscriber_loader, subscriber_padder.append([subscriber_form.append(this.settings.choices.length > 0 ? [subscriber_message, subscriber_choice, subscriber_input, subscriber_button] : [subscriber_message, subscriber_input, subscriber_button] )], clearfix)]).attr({
                        'data-apikey': this.settings.apiKey,
                        'data-listid': this.settings.listID
                    });

                this.subscriber = subscriber_taskbar;
                parent_node.append(this.subscriber);

                setTimeout(function () {
                    that.subscriber.removeClass("hidden");
                }, 2000);
            }
        },
        tileUI: function (parent_node) {
            console.log("RevChimp: Build Tile UI (Replace Last Ad Tile)...");
            var that = this;
            var $last_item = $('#revexitunit').find(".revexititem:last");
            console.log("Last Ad Item = ", $last_item );
            var $item_card = $last_item.length > 0 ? $($last_item[0]) : undefined;
            $('.revexitsubscriber').detach();
            console.log("Attaching to Item Card: ". $item_card);
            if($item_card !==  undefined && $item_card.length > 0) {
                $('#revexitmask').removeClass("taskbar-theme").addClass("tile-theme");
                var subscriber_alert = $('<div />').addClass("subscribe-alert").hide(),
                    subscriber_loader = $('<div />').addClass("subscribe-loader").append($('<ul />').addClass("chimploader").append(['<li></li>','<li></li>','<li></li>'])),
                    //subscriber_close = $('<span />').addClass("subscribe-close"),
                    subscriber_header = $('<div />').addClass("subscribe-header").text(this.settings.headline),
                    subscriber_message = $('<div />').addClass("subscribe-message").text(this.settings.message),
                    subscriber_input = $('<input />').addClass("subscribe-input").attr({
                        'id': 'RevChimpInputEmail',
                        'type': 'text',
                        'placeholder': 'E-mail Address'
                    }),
                    subscriber_button = $('<button />').addClass("subscribe-button").attr({
                        'id': 'RevChimpSubscribeButton',
                        'type': 'button'
                    }).text(this.settings.button),
                    subscriber = $('<div />').addClass("revexitsubscriber hidden").append([subscriber_alert, subscriber_loader,/*subscriber_close,*/ subscriber_header, subscriber_message, subscriber_input, subscriber_button]).attr({
                        'data-apikey': this.settings.apiKey,
                        'data-listid': this.settings.listID
                    });

                this.subscriber = subscriber;
                $item_card.prepend(this.subscriber).children('a:first').css({'visibility': 'hidden'});

                //setTimeout(function () {
                    that.subscriber.removeClass("hidden");
                //}, 1000);
            }
        }
    };

    $(window).load(RevChimp.init);


}(jQuery, window, document));



/**
 /$$$$$$$                       /$$$$$$$$           /$$   /$$
 | $$__  $$                     | $$_____/          |__/  | $$
 | $$  \ $$  /$$$$$$  /$$    /$$| $$       /$$   /$$ /$$ /$$$$$$
 | $$$$$$$/ /$$__  $$|  $$  /$$/| $$$$$   |  $$ /$$/| $$|_  $$_/
 | $$__  $$| $$$$$$$$ \  $$/$$/ | $$__/    \  $$$$/ | $$  | $$
 | $$  \ $$| $$_____/  \  $$$/  | $$        >$$  $$ | $$  | $$ /$$
 | $$  | $$|  $$$$$$$   \  $/   | $$$$$$$$ /$$/\  $$| $$  |  $$$$/
 |__/  |__/ \_______/    \_/    |________/|__/  \__/|__/   \___/

 Project: RevExit
 Version: 2
 Author: chris@revcontent.com

 Query String Parameters:
 w = widget id
 p = publisher id
 k = api key
 d = domain
 t = testing (set value to true to always pop onload, no cookie check!) default is false
 i = internal (none, rndm, top, btm, or all) default is none, internal ads will have provider labels attached, set to "all" for internal only
 s = change api end point server, ex: s=trends-stg.revcontent.com, default is production (trends.revcontent.com)
 x = "both" or "true", default is "both", can also can be set to "mobileonly" or "mobile" if enabled will pop on mobile/tablet after "z" seconds of inactivity, for Desktop only use "desktop" or "false"
 z = inactivity trigger duration in seconds, defaults to 6 seconds if not provided, minimum of 6 seconds allowed
 j = background mode, defaults to "default", options are "classic", "default" OR custom RGBA OR Hexadecimal color OR a handful of HTML color names (red, blue etc.)
 ps = Panel Size, choices are "3x2" or "4x2" defaults to 4x2, NOTE: for HD modes only!
 ml = "Mailing List" Feature, multi-key parameter for Mailchimp Integration, ml=API_KEY;LIST_ID;HEADLINE;MESSAGE;BUTTON;THEME;CHOICES, default = disabled, THEME options are "taskbar" or "tile", CHOICES is comma separated list of options.
 ch = "Closed Hours", The interval at which RevExit will remain closed for. Defaults to 24 Hours or 1-day if not provided.
 r = "Regions" or zones that RevExit will trigger once departed, default = "all", can be set to "top", "bottom", "left" or "right". Combinations are also accepted, ex. "left,right"
 dl = "Disclosure Label", allows custom branding label to meet FTC guidelines, defaults to "Sponsored by Revcontent", 50 Character limit
 po = "Provider Options", control display of provider label on ad units. Choices are "disabled", "all", "sponsored" or "internal" (Default)

 **/
(function(j,q,u,e,r,y,R,o,x){try{o=jQuery;if(o&&(!R||(R&&o.fn.jquery==R))){x=true}}catch(er){}if(!x||(R&&o.fn.jquery!=R)){(q=j.createElement(q)).type='text/javascript';if(r){q.async=true}q.src='//ajax.googleapis.com/ajax/libs/jquery/'+(R||1)+'/jquery.min.js';u=j.getElementsByTagName(u)[0];q.onload=q.onreadystatechange=(function(){if(!e&&(!this.readyState||this.readyState=='loaded'||this.readyState=='complete')){e=true;x=jQuery;jQuery.noConflict(true)(function(){y(x)});q.onload=q.onreadystatechange=null;u.removeChild(q)}});u.appendChild(q)}else{y(o)}})(document,'script','head',false,false,(function($){$(function(){

    $(document).ready(function() {

        revcontentInit({"fastclick":{enabled: true}});

        $(document).on("click","#revexitcloseme, #revexitmask",function(e){
            var target_el = e.relatedTarget ? e.relatedTarget : (e.toElement ? e.toElement : e.target);
            if(typeof target_el == "object" && (target_el.id == "revexitcloseme" || target_el.id == "revexitmask")) {
                $('#revexitmask').hide().detach();
                $('#revexitunit').hide().detach();
                $('.revexitmaskwrap').hide().detach();
                $('.revexitunitwrap').hide().detach();
                $('#revexit_style').detach();
                $('body.revexit-open').css({'overflow-y': 'inherit', 'height': 'auto'}).removeClass("revexit-open");
                $('html').css({'overflow-y': 'visible'}).removeClass("revexit-open");
                var viewport_meta = $('meta[name="viewport"]:first-of-type');
                if(viewport_meta.length === 1) {
                    viewport_meta.attr({
                        'content': viewport_meta.attr('data-originalcontent')
                    });
                }
            }
        });

        //get the api vars from the script tag
        var revcontentexiturl = document.getElementById('rev2exit').src,
            revcontentexitvars = [], revcontentexithash,
            revcontentexithashes = revcontentexiturl.slice(revcontentexiturl.indexOf('?') + 1).split('&');

        for (var i = 0; i < revcontentexithashes.length; i++) {
            revcontentexithash = revcontentexithashes[i].split('=');
            revcontentexitvars.push(revcontentexithash[0]);
            revcontentexitvars[revcontentexithash[0]] = revcontentexithash[1];
        }

        // Closed Hours
        if(revcontentexitvars.ch === undefined || isNaN(revcontentexitvars.ch)) {
            revcontentexitvars.ch = 24;
        } else if(revcontentexitvars.ch < 1) {
            revcontentexitvars.ch = 24;
        }

        // Exit Regions
        var exit_regions = ["all"];
        if(revcontentexitvars.r === undefined) {
            revcontentexitvars.r = "all";
        } else if(revcontentexitvars.r.length === 0){
            revcontentexitvars.r = "all";
        } else {
            exit_regions = revcontentexitvars.r.split(",");
        }

        // Setup Exit Mode
        var exitMode = "desktop";
        switch(revcontentexitvars.x) {
            case "mobile":
            case "mobileonly":
                exitMode = "mobile";
                break;
            case "both":
            case "true":
                exitMode = "desktop+mobile";
                break;
            case undefined:
            case "false":
            case "desktop":
            case "default":
                exitMode = "desktop";
                break;
        }

        // Mailing List Feature
        var enableSubscriptions = false;
        if(revcontentexitvars.ml !== undefined){
            enableSubscriptions = true;
        }

        // Provider Options
        var providerOptions = "internal";
        if(revcontentexitvars.po !== undefined && (revcontentexitvars.po.toLowerCase() === "sponsored"
            || revcontentexitvars.po.toLowerCase() === "internal"
            || revcontentexitvars.po.toLowerCase() === "disabled"
            || revcontentexitvars.po.toLowerCase() === "all")){
            providerOptions = revcontentexitvars.po;
        }

        $('body').attr({'data-revexitmode': exitMode });
        var userHasRevcontent = revcontentGetCookie("revcontentapibeforego_" + revcontentexitvars.w);
        var revExitMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        var revExitIPhone = /iPhone|Android|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        var revExitIPad = /iPad/i.test(navigator.userAgent);

        if (userHasRevcontent != "" && revcontentexitvars.t != "true") {
            $('body').attr({'data-revexit': 'expired'});
        } else {
            var exit_expired = $('body').attr('data-revexit') == 'expired' ? true : false;
            if (false == exit_expired && revExitMobile == false && exitMode != "mobileonly" && (exitMode == "desktop" || exitMode == "desktop+mobile")) {
                //console.log("event1");
                window.rxMouseOutEvent = function(e){

                        e = e ? e : window.event;
                        var revcontentfrom = e.relatedTarget || e.toElement;
                        var mouse_x = e.clientX;
                        var mouse_y = e.clientY;
                        var viewport_dimensions = {width: $(window).width(), height: $(window).height()};

                        var fire_rx = false;

                        // Exit on ALL regions
                        if(exit_regions.indexOf("all") !== -1) {
                            if (mouse_x <= 0 || (mouse_x >= viewport_dimensions.width) || mouse_y <= 0 || mouse_y >= viewport_dimensions.height) {
                                console.log("Exiting from ALL zones");
                                fire_rx = true;
                            }
                        }

                        // Exit on TOP
                        if(exit_regions.indexOf("all") === -1 && exit_regions.indexOf("top") !== -1) {
                            if (mouse_y <= 0 && mouse_y < viewport_dimensions.height) {
                                console.log("Exiting from TOP zone");
                                fire_rx = true;
                            }
                        }

                        // Exit on LEFT
                        if(exit_regions.indexOf("all") === -1 && exit_regions.indexOf("left") !== -1) {
                            if (mouse_x <= 0 && mouse_x < viewport_dimensions.width) {
                                console.log("Exiting from LEFT zone");
                                fire_rx = true;
                            }
                        }

                        // Exit on BOTTOM
                        if(exit_regions.indexOf("all") === -1 && exit_regions.indexOf("bottom") !== -1) {
                            if (mouse_y > 0 && mouse_y >= viewport_dimensions.height) {
                                console.log("Exiting from BOTTOM zone");
                                fire_rx = true;
                            }
                        }

                        // Exit on RIGHT
                        if(exit_regions.indexOf("all") === -1 && exit_regions.indexOf("right") !== -1) {
                            if (mouse_x > 0 && mouse_x >= viewport_dimensions.width) {
                                console.log("Exiting from RIGHT zone");
                                fire_rx = true;
                            }
                        }

                        if(true === fire_rx){
                            if ($('body').attr('data-revexit') === undefined || revcontentexitvars.t == "true") {
                                revcontentExecute(revcontentexitvars, revExitMobile, revExitIPhone, revExitIPad, enableSubscriptions);
                            }
                        }

                }
                revcontentDelEvent(document, "mouseout", rxMouseOutEvent);
                revcontentAddEvent(document, "mouseout", rxMouseOutEvent);
            } else if (false === exit_expired && revExitMobile == true && exitMode != "desktop" && (exitMode == "desktop+mobile" || exitMode == "mobileonly" || exitMode == "mobile")) {
                //console.log("event2");
                var idleTimer = null;
                var idleState = false;
                var idleWait  = ((revcontentexitvars.z !== undefined && parseInt(revcontentexitvars.z, 10) >= 6) ? parseInt(revcontentexitvars.z, 10) * 1000 : 6000);

                $('*').bind('mousemove keydown scroll touchmove', function () {

                    clearTimeout(idleTimer);
                    idleState = false;

                    idleTimer = setTimeout(function () {
                        revcontentExecute(revcontentexitvars, revExitMobile, revExitIPhone, revExitIPad, enableSubscriptions);
                        idleState = true;
                    }, idleWait);
                });

                $("body").trigger("mousemove touchmove");
            }
        }

        // Initialize RevDialog (OPT-Out feature)
        if(typeof RevDialog === "function") {
            window.revDialog = new RevDialog();
        }

    });

    function revcontentInitChimpanzee(subscription_settings){
        if(window.RevChimp !== undefined){
            if(typeof window.RevChimp.render === "function" && !$("#revexitunit").hasClass("chimp-initialized")) {
                window.RevChimp.render(subscription_settings);
            }
        }
    }

    function revcontentDetachChimpanzee(){
        if(window.RevChimp !== undefined){
            if(typeof window.RevChimp.shutdown === "function") {
                window.RevChimp.shutdown();
            }
        }
    }

    function revcontentInit(modules){
        if(!modules){ modules = {}; }
        if(modules["fastclick"] !== undefined && modules["fastclick"].enabled === true) {
            if (typeof FastClick === "function" && 'addEventListener' in document) {
                document.addEventListener('DOMContentLoaded', function() {
                    FastClick.attach(document.body);
                }, false);
            }
        }
    }

    function revcontentAddEvent(obj, evt, fn) {

        if (obj.addEventListener) {
            obj.addEventListener(evt, fn, false);
        }
        else if (obj.attachEvent) {
            obj.attachEvent("on" + evt, fn);
        }

    }

    function revcontentDelEvent(obj, evt, fn) {

        if (obj.removeEventListener) {
            obj.removeEventListener(evt, fn, false);
        }
        else if (obj.detachEvent) {
            obj.detachEvent("on" + evt, fn);
        }

    }

    function revcontentSetCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        var cpath = "; path=/; domain=" + top.location.host;
        document.cookie = cname + "=" + cvalue + "; " + expires + cpath;
        $('body').attr({'data-revexit': "expired"});
    }

    function revcontentGetCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    function revcontentExtractRandom(arr) {
        var index = Math.floor(Math.random() * arr.length);
        var result = arr[index];

        arr.splice(index, 1);
        return(result);
    }

    function revcontentBGControl(revcontentexitvars, revExitMobile, revExitIPhone, revExitIPad){
        // Setup BG Control
        var backgroundMode = "default";
        var backgroundMask = "rgba(0,0,0,0.75)";
        var backgroundUnit = "rgba(255,255,255,0.85)";
        var backgroundCustom = revcontentexitvars.j;
        var bgPatternRgba = /^rgba\(([0-255]){1,3}\,([0-255]){1,3}\,([0-255]){1,3}\,(0|1)?(\.)?([1-999]){0,4}?\)/i;
        var bgPatternHex = /^#[a-f0-9]{3,6}/i;
        var bgPatternNames = /(gold|deepskyblue|aqua|aquamarine|darkorange|lightgreen|tomato|silver|blue|green|red|orange|yellow|cyan|pink|purple|magenta|teal|white|black|dodgerblue|seagreen|darkseagreen|gray|ivory|khaki|royalblue)/i;
        switch(revcontentexitvars.j) {
            case "classic":
            backgroundMask = "rgba(255,255,255,1)";
            backgroundUnit = "rgba(255,255,255,1)";
            break;
            case "default":
            backgroundMask = "rgba(0,0,0,0.75)";
            backgroundUnit = "rgba(255,255,255,0.85)";
            break;
        }

        if(bgPatternRgba.test(backgroundCustom) || bgPatternHex.test(backgroundCustom) || bgPatternNames.test(backgroundCustom)){
            backgroundMask = backgroundCustom;
        }

        $(document).ready(function(){
            $('#revexitmask').css({'background-color': backgroundMask});
            $('#revexitunit').css({'background-color': backgroundUnit});
        });
    }

    function revcontentSetupViewport(revExitMobile, revExitIPhone, revExitIPad, revcontentexitvars){
        if(!revExitMobile){ revExitMobile = false; }
        if(!revExitIPhone){ revExitIPhone   = false;   }
        if(!revExitIPad)  { revExitIPad   = false;   }
        if(!revcontentexitvars) { revcontentexitvars = false; }
        var revPanelSize = revcontentexitvars ? revcontentexitvars.ps : "4x2";

        var enableSubscriptions = false;
        if(revcontentexitvars.ml !== undefined){
            enableSubscriptions = true;
            var default_headline = "Get Daily News";
            var default_message =  "Enter your e-mail to get started.";
            var default_theme = "taskbar";
            var default_button = "subscribe";
            var default_choices = "";
            var subscription_settings = {apiKey: null, listID: null, headline: default_headline, message: default_message, button: default_button, theme: default_theme, choices: default_choices };
            var extracted_settings = revcontentexitvars.ml.split(";");
            subscription_settings.apiKey = extracted_settings[0] !== undefined && extracted_settings[0].length > 0 ? extracted_settings[0] : null;
            subscription_settings.listID = extracted_settings[1] !== undefined && extracted_settings[1].length > 0 ? extracted_settings[1] : null;
            subscription_settings.headline = extracted_settings[2] !== undefined &&  extracted_settings[2].length > 0 ? decodeURI(extracted_settings[2]) : default_headline;
            subscription_settings.message = extracted_settings[3] !== undefined &&  extracted_settings[3].length > 0 ? decodeURI(extracted_settings[3]) : default_message;
            subscription_settings.button = extracted_settings[4] !== undefined &&  extracted_settings[4].length > 0 ? decodeURI(extracted_settings[4]).toLowerCase() : default_button;
            subscription_settings.theme = extracted_settings[5] !== undefined &&  extracted_settings[5].length > 0 ? decodeURI(extracted_settings[5]).toLowerCase() : default_theme;
            subscription_settings.choices = extracted_settings[6] !== undefined &&  extracted_settings[6].length > 0 ? decodeURI(extracted_settings[6]) : default_choices;


        }

        var $mask_n_wrap   = $('#revexitmask, #revexitunit');
        var $exit_mask     = $('#revexitmask');
        var $exit_wrap     = $('#revexitunit');
        var $ad_items      = $exit_wrap.find('.revexititem');
        var $total_height  = parseInt(($($ad_items[0]).height() * $ad_items.length), 10);
        var $wrap_height   = ($exit_wrap.height() > 0 ? $exit_wrap.height() : 1024);
        var viewport_meta  = $('meta[name="viewport"]:first-of-type');
        var viewport_width = parseInt($(window).width(), 10);

        if(viewport_meta.length === 1) {
            var vpm_initial   = viewport_meta.attr('content');
            viewport_meta.attr({
                'data-originalcontent': vpm_initial,
                'content': 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0'
            });
        }

        $('html,body').addClass("revexit-open");
        $exit_mask.removeClass("modal-hd modal-lg modal-md modal-sm fullscreen");
        $exit_wrap.scrollTop(0);

        if(true === revExitMobile){
            $('html.revexit-open').css({'overflow-y': 'hidden'/*, '-webkit-overflow-scrolling': 'none'*/});
            $('body.revexit-open').css({'overflow-y': 'hidden', 'height': $wrap_height/*, '-webkit-overflow-scrolling': 'none'*/});
            $mask_n_wrap.css({'overflow-y': 'hidden', 'height': $wrap_height, 'position': 'fixed'/*, '-webkit-overflow-scrolling': 'none'*/});
            $exit_wrap.css({'overflow-y': 'scroll'});
            $exit_mask.addClass("modal-mobile");
            if(true === revExitIPhone) {
                $wrap_height = '100%' || 480;
                $exit_mask.addClass("modal-phone");
            }
            else if (true === revExitIPad) {
                $wrap_height = '100%' || 768;
                $exit_mask.addClass("modal-tablet");
                $('#revexitsponsor').css({'padding': '0 0 0 18px', 'color':'rgba(0,0,0,0.5)', 'margin':'0 0 !important', 'position':'absolute', 'top': 0, 'right': '80px', 'display':'inline-block', 'width': 'auto','text-align': 'right', 'max-width': $('#revexitunit').width() + 'px'});

            } else {
                $wrap_height = $total_height;
            }
            $exit_mask.css({'height': '100%', 'position': 'fixed',/*'z-index': '10000',*/ 'overflow-x': 'auto', '-webkit-overflow-scrolling': 'touch'});
            $exit_wrap.css({'height': $wrap_height, 'position': 'relative', /*'z-index': '11000',*/ '-webkit-overflow-scrolling': 'touch'});
            //$('body.revexit-open > div:not(".revexitunitwrap, .revexitmaskwrap")').css({'height':0, 'overflow':'hidden'});
            //console.log("Mobile / Tablet case!");
        }
        else if(false === revExitMobile && (viewport_width > 768) && (viewport_width <= 1024)) {
            $('body.revexit-open').css({'overflow-y': 'hidden', 'height': $wrap_height});
            $mask_n_wrap.css({'height': $wrap_height, 'position': 'fixed'});
            $exit_mask.css({'overflow-y': 'hidden', 'height': '100%'/*,'padding': '0 36px 0 0'*/}).addClass("modal-lg");
            $exit_wrap.css({'position': 'static', /*'padding': '18px',*/ 'height': $(window).height() - (0.12 * $(window).height()), 'width': '80%' /*$('#revexitadpanel').innerWidth()*/});
            //console.log("Large Desktop case >= 768 & <= 992");
            var spnsr_mrgns = (100 * ((($(window).width() - $('#revexitunit').width()) / 2) / $(window).width())) || 5;    
            $('#revexitsponsor').css({'padding': '0 0 0 18px', 'color':'rgba(0,0,0,0.5)', 'margin':'0 0 !important', 'position':'absolute', 'top': '11px', 'right': '40px', 'display':'inline-block', 'width': 'auto','text-align': 'right', 'max-width': $('#revexitunit').width() + 'px'});
        }
        else if(false === revExitMobile && (viewport_width > 480) && (viewport_width <= 768)) {
            $('body.revexit-open').css({'overflow-y': 'hidden', 'height': $wrap_height});
            $mask_n_wrap.css({'height': $wrap_height, 'position': 'fixed'});
            $exit_mask.css({'overflow-y': 'hidden', 'height': '100%'/*,'padding': '0 36px 0 0'*/}).addClass("modal-md");
            $exit_wrap.css({'overflow-y': 'scroll', 'position': 'static', /*'padding': '18px',*/ 'height': $(window).height() - (0.12 * $(window).height()), 'width': '80%' /*$('#revexitadpanel').innerWidth()*/});
            //console.log("Desktop case >= 480 & <= 768");
            $('#revexitsponsor').css({'padding': '0 0 0 18px', 'color':'rgba(0,0,0,0.5)', 'margin':'0 0 !important', 'position':'absolute', 'top': '1.85em', 'right': '0px', 'left': '0px', 'left': '0px', 'display':'inline-block', 'width': 'auto','text-align': 'left', 'max-width': $('#revexitunit').width() + 'px'});
        }
        else if(false === revExitMobile && viewport_width <= 480) {
            $('body.revexit-open').css({'overflow-y': 'hidden', 'height': $wrap_height});
            $mask_n_wrap.css({'height': $wrap_height, 'position': 'fixed'});
            $exit_mask.css({'overflow-y': 'hidden', 'height': '100%'/*,'padding': '0 36px 0 0'*/}).addClass("modal-sm");
            $exit_wrap.css({'overflow-y': 'scroll', 'position': 'static'/*, 'padding': '18px'*/, 'height': '80%', 'width': '80%'});
            //console.log("Small Desktop case <= 480");
            $('#revexitsponsor').css({'padding': '0 0 0 18px', 'color':'rgba(0,0,0,0.5)', 'margin':'0 0 !important', 'position':'absolute', 'top': '1.55em', 'right': '0px', 'left': '0px', 'left': '0px', 'display':'inline-block', 'width': 'auto','text-align': 'left', 'max-width': $('#revexitunit').width() + 'px'});
        }
        else if(false === revExitMobile && viewport_width >= 1024) {
            $('body.revexit-open').css({'overflow': 'hidden', 'height': '100%'});
            $exit_mask.css({'height': '100%', 'position': 'fixed', 'overflow': 'hidden'}).addClass("modal-hd");
            $exit_wrap.css({'position': 'static', 'overflow': 'hidden', 'height': 'auto', 'width': $('#revexitadpanel').innerWidth() || 992 });
            //console.log("HD Desktop case");
            var spnsr_mrgns = (100 * ((($(window).width() - $('#revexitunit').width()) / 2) / $(window).width())) || 5;    
            //$('#revexitsponsor').css({'text-shadow':'0 0 2px rgba(30,30,30, 0.8)', 'border': '0', 'margin':'0 ' + spnsr_mrgns + '%' ,'position':'fixed','top':'4%','left':0,'display':'block','width': $('#revexitunit').width(),'text-align': 'right','max-width': $('#revexitunit').width() + 'px'});    
            $('#revexitsponsor').css({'padding': '0 18px 0 0', 'color':'rgba(0,0,0,0.5)', 'margin': '0', 'margin':'0 0 !important', 'position':'absolute', 'top': '11px', 'right': '50px', 'display':'inline-block', 'width': 'auto','text-align': 'right', 'max-width': $('#revexitunit').width() + 'px'});
            if(false === enableSubscriptions && (($exit_wrap.outerHeight() + ($(window).height() * 0.10)) > $(window).height())) {
                $exit_mask.addClass('fullscreen');
            }
            switch(revPanelSize) {
                case "3x2":
                    $exit_mask.addClass("panel-3x2");
                    break;
                case "4x2":
                case "default":
                    break;
            }
        }
        else {
            $('body.revexit-open').css({'overflow-y': 'hidden', 'height': '100%'});
            $mask_n_wrap.css({'height': '100%', 'position': 'fixed', 'overflow': 'hidden'});
            //console.log("ELSE VIEWPORT case!");
            $('#revexitsponsor').attr({'style':''});
        }

        $('#revexitunit').fadeIn(400);
        $( ".revexititem .revexitheadline" ).slideDown( "slow" );
        if($(window).innerWidth() >= $(window).innerHeight()) {
            $('#revexitmask').attr({'data-orientation': 'landscape'});
        } else {
            $('#revexitmask').attr({'data-orientation': 'portrait'});
        }

        if(!$exit_mask.hasClass('modal-mobile') && !$exit_mask.hasClass('modal-phone') && !$exit_mask.hasClass('modal-tablet')) {
            $('#revexitunit, .revexitunitwrap').css({'box-sizing':'content-box'});
            $('#revexitunit > *, #revexitunit > *:before, #revexitunit > *:after').css({'box-sizing':'inherit'});
        }

        if(true === enableSubscriptions && $exit_mask.hasClass("modal-hd")){
            revcontentInitChimpanzee(subscription_settings);
        } else {
            revcontentDetachChimpanzee();
        }
    }

    function revcontentExecute(revcontentexitvars, revExitMobile, revExitIPhone, revExitIPad, enableSubscriptions) {
        if($('body').hasClass('revexit-open')){ return; }
        if(!revExitMobile){ revExitMobile = false; }
        if(!revExitIPhone){ revExitIPhone = false; }
        if(!revExitIPad){ revExitIPad = false; }
        if(!enableSubscriptions){ enableSubscriptions = false; }

        // exit on expired exit (except for test mode) ...
        var exit_expired = $('body').attr('data-revexit') == 'expired' ? true : false;
        if(true === exit_expired && revcontentexitvars.t != "true") { return; }

        //make revcontent api call first
        var revcontentexitendpoint = 'https://trends.revcontent.com/api/v1/?', sponsored_count = 8, internal_count = 0;

        if (revcontentexitvars.i == "btm" || revcontentexitvars.i == "top") {
            sponsored_count = 4;
            internal_count = 4;
        } else if (revcontentexitvars.i == "rndm") {
            internal_count = Math.floor(Math.random() * 4) + 1  ;
            sponsored_count = 8 - internal_count;
        } else if (revcontentexitvars.i == "all") {
            internal_count = 8;
            sponsored_count = 0;
        }

        if (typeof revcontentexitvars.s !== "undefined" && revcontentexitvars.s != "" && revcontentexitvars.s != null) {
            revcontentexitendpoint = 'https://'+revcontentexitvars.s+'/api/v1/?';
        }

        // Ad Bypass for "Tile" UI Theme
        var subscriber_theme = "taskbar";
        if(true === enableSubscriptions && revcontentexitvars.ml !== undefined) {
            var ml_vars = revcontentexitvars.ml.split(";");
            subscriber_theme = ml_vars[4] !== undefined ? ml_vars[4].toLowerCase() : "taskbar";
            if(subscriber_theme === "tile"){
                if(internal_count === 8) {
                    internal_count--;
                } else {
                    sponsored_count--;
                }
            }

        }

        var revcontentexitdata = {
            'api_key' : revcontentexitvars.k,
            'pub_id' : revcontentexitvars.p,
            'widget_id' : revcontentexitvars.w,
            'domain' : revcontentexitvars.d,
            'sponsored_count' : sponsored_count,
            'internal_count' : internal_count,
            'img_h':   274,
            'img_w': 239,
            'api_source': 'exit'
        };

        var clientCall = $.getJSON(revcontentexitendpoint, revcontentexitdata, function(revcontentexitdata) {
            var styles_panel3x2 = " #revexitmask.modal-hd.panel-3x2 #revexititem_3{margin-right:1%}#revexitmask.modal-hd.panel-3x2 .revexititem{width:32%}#revexitmask.modal-hd.panel-3x2 #revexititem_6,#revexitmask.modal-hd.panel-3x2 #revexititem_7{display:none} ";
            var styles_hd = " #revexitmask.modal-hd {background-color: rgba(0,0,0,0.75)} #revexitmask.modal-hd > #revexitunit.revexitunitwrap {position:static;width: auto;height:auto;/*min-height:600px;*/background:rgba(255,255,255,0.95);margin:5% auto;padding: 0 36px;overflow:hidden;box-shadow: 0px 1px 5px rgba(100,100,100,0,3);-moz-box-shadow: 0px 1px 5px rgba(100,100,100,0,3); } #revexitmask.modal-hd #revexitunit #revexitheader {font-size: 25px;height:45px;line-height:45px} ";
            var styles_lg = " #revexitmask.modal-lg {background-color: rgba(0,0,0,0.75)} #revexitmask.modal-lg #revexitunit {position:static;width: auto;height:auto;/*min-height:480px;*/background:rgba(255,255,255,0.95);margin:5% auto!important;padding: 0 36px 0 0!important;overflow:hidden;box-shadow: 0px 1px 5px rgba(100,100,100,0,3);-moz-box-shadow: 0px 1px 5px rgba(100,100,100,0,3); } #revexitmask.modal-lg #revexitunit #revexitadpanel {padding: 18px!important} #revexitmask.modal-lg #revexitunit #revexitheader {font-size: 22px;padding-left: 18px;} ";
            var styles_md = " #revexitmask.modal-md {background-color: rgba(0,0,0,0.75)} #revexitmask.modal-md #revexitunit {position:static;width: auto;height:auto;/*min-height:480px;*/background:rgba(255,255,255,0.95);margin:5% auto!important;padding: 0 36px 0 0!important;overflow:hidden;box-shadow: 0px 1px 5px rgba(100,100,100,0,3);-moz-box-shadow: 0px 1px 5px rgba(100,100,100,0,3); } #revexitmask.modal-md #revexitunit #revexitadpanel {padding: 18px!important} #revexitmask.modal-md #revexitunit #revexitheader {font-size: 18px;padding-left: 18px;} ";
            var styles_sm = " #revexitmask.modal-sm {background-color: rgba(0,0,0,0.75)} #revexitmask.modal-sm #revexitunit {position:static;width: auto;height:auto;/*min-height:480px;*/background:rgba(255,255,255,0.95);margin:5% auto!important;padding: 0 36px 0 0!important;overflow:hidden;box-shadow: 0px 1px 5px rgba(100,100,100,0,3);-moz-box-shadow: 0px 1px 5px rgba(100,100,100,0,3); } #revexitmask.modal-sm #revexitunit #revexitadpanel {padding: 18px!important} #revexitmask.modal-sm #revexitunit #revexitheader {padding-top: 5px; font-size: 14px;padding-left: 18px;height:20px!important;line-height:20px!important}  #revexitmask.modal-sm #revexitcloseme {right: 0;margin: 10px -10px 0 5px;background-size:contain;width:14px;height:14px} ";
            var styles_mobile = " #revexitmask.modal-mobile #revexitunit #revexitheader {transform:all 0.5s ease;} #revexitmask.modal-mobile #revexitunit {width:90%;} #revexitmask.modal-mobile #revexitcloseme {margin-right: 0;margin-top:0;background-size:contain;width:14px;height:14px} #revexitmask.modal-mobile #revexitadpanel {margin-top:10px;clear:both;} ";
            var styles_tablet = " #revexitmask.modal-tablet {background: rgba(0,0,0,0.5);} #revexitmask.modal-tablet #revexitheader {padding: 0 0 0 18px;} #revexitmask.modal-tablet #revexitheader #revexitcloseme {margin-right: 30px} #revexitmask.modal-tablet #revexitunit {margin:0;width:100%;background-color:rgba(255,255,255,0.82);overflow-x:hidden} ";
            var styles_phone = " #revexitmask.modal-phone[data-orientation=\"landscape\"] #revexitheader.docked #revexitcloseme {margin-right: 15px;} body.revheader-docked #revexitmask.modal-phone #revexitadpanel {margin-top:52px;} #revexitmask.modal-phone[data-orientation=\"landscape\"] #revexitunit #revexitheader {padding: 2px 0 0 10px;} #revexitmask.modal-phone[data-orientation=\"landscape\"] #revexitunit #revexitheader  > span.rxlabel {font-size:17px;max-width:80%;line-height:160%} #revexitmask.modal-phone #revexitheader.docked #revexitsponsor em {display:block} #revexitmask.modal-phone #revexitheader #revexitsponsor {display:none;font-size:8px} #revexitmask.modal-phone #revexitheader #revexitsponsor em {display:none}  #revexitmask.modal-phone #revexitunit > #revexitheader.docked > span.rxlabel {font-size: inherit; max-width:100%;} #revexitmask.modal-phone #revexitheader.docked #revexitcloseme {margin-top: 18px;margin-right:5px} #revexitmask.modal-phone #revexitheader #revexitcloseme {margin-top: 5px;margin-right:11px} #revexitmask.modal-phone #revexitunit #revexitheader {line-height:140%;font-size: 10px;padding: 7px 0 0 10px;height:auto;font-weight:bold} #revexitmask.modal-phone #revexitunit #revexitheader > span.rxlabel {display:inline-block;font-size:14px;max-width:55%} #revexitmask.modal-phone #revexitunit #revexitsponsor {float:right;clear:both;display: inline-block;clear:both; padding: 0 0;opacity:1;margin-right:12px;margin-top:17px} #revexitmask.modal-phone #revexitunit #revexitheader.docked #revexitsponsor {opacity:0;display:none} ";
            var styles_dock_header = " #revexitheader.docked #revexitcloseme {width:11px;height:11px;background-size:contain;margin-top:15px;margin-right:0;right:40px} #revexitunit > #revexitheader.docked {overflow:hidden;font-size: 12px;padding: 0 0 0 10px;margin:4% 0 0 0;z-index:2147483620;position:fixed;width:100%;display:block;top:0;left: 0px;text-indent: 4%;background-color:rgba(255,255,255,0.95);height:42px!important;line-height:42px!important;box-shadow: 0 3px 20px -5px rgba(0,0,0,0.6);-webkit-box-shadow: 0 3px 20px -5px rgba(0,0,0,0.6);-moz-box-shadow: 0 3px 20px -5px rgba(0,0,0,0.6);-o-box-shadow: 0 3px 20px -5px rgba(0,0,0,0.6);} ";
            var styles_fullscreen = " body.revexit-open > #revexitmask.fullscreen > #revexitunit {width:100%!important;max-width: 992px;height:88%!important;margin:3% auto!important;padding:0 2%!important;background:rgba(255,255,255,0.85)} body.revexit-open > #revexitmask.fullscreen > #revexitunit > #revexitheader {margin: 10px auto;max-width:992px} body.revexit-open > #revexitmask.fullscreen > #revexitunit .revexititem {height: 40%} body.revexit-open > #revexitmask.fullscreen > #revexitunit .revexititem .revexitheadline {font-size: 17px}  body.revexit-open > #revexitmask.fullscreen > #revexitunit .revexititem .revexitheadlinewrap {height: 90%} ";
            var styles_boxdefense = " .revexititemmask *, .revexititemmask *::after, .revexititemmask *::before { box-sizing: content-box; } ";
            var styles_injected = " /* inject:css */#rev-opt-out .rd-close-button{position:absolute;cursor:pointer;right:10px;z-index:10}#rev-opt-out a{cursor:pointer!important}#rev-opt-out .rd-box-wrap{display:none;z-index:2147483641}#rev-opt-out .rd-box-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000;opacity:.5;filter:alpha(opacity=50);z-index:2147483641}#rev-opt-out .rd-vertical-offset{position:fixed;display:table-cell;top:0;width:100%;z-index:2147483642}#rev-opt-out .rd-box{position:absolute;vertical-align:middle;background-color:#fff;padding:10px;border:1px solid #555;border-radius:12px;-webkit-border-radius:12px;-moz-border-radius:12px;overflow:auto;box-shadow:3px 3px 10px 4px #555}#rev-opt-out .rd-normal{min-width:270px;max-width:435px;width:90%;margin:10px auto}#rev-opt-out .rd-full-screen{position:fixed;right:15px;left:15px;top:15px;bottom:15px}#rev-opt-out .rd-header{height:20px;position:absolute;right:0}#rev-opt-out .rd-about{font-family:Arial,sans-serif;font-size:14px;text-align:left;box-sizing:content-box;color:#333;padding:15px}#rev-opt-out .rd-about .rd-logo{background:url(https://serve.revcontent.com/assets/img/rc-logo.png) bottom center no-repeat;width:220px;height:48px;display:block;margin:0 auto}#rev-opt-out .rd-about p{margin:16px 0;color:#555;font-size:14px;line-height:16px}#rev-opt-out .rd-about p#main{text-align:left}#rev-opt-out .rd-about h2{color:#777;font-family:Arial,sans-serif;font-size:16px;line-height:18px}#rev-opt-out .rd-about a{color:#00cb43}#rev-opt-out .rd-well{border:1px solid #E0E0E0;padding:20px;text-align:center;border-radius:2px;margin:20px 0 0}#rev-opt-out .rd-well h2{margin-top:0}#rev-opt-out .rd-well p{margin-bottom:0}#rev-opt-out .rd-opt-out{text-align:center}#rev-opt-out .rd-opt-out a{margin-top:6px;display:inline-block}/* endinject */ ";
            var revpayload1 = "", revpayload = [], internalArray = [], sponsoredArray = [], revstyle = "body.revexit-open{padding:0!important;margin:0!important;overflow:hidden;width:100%;height:100%;-webkit-overflow-scrolling: touch;}body.revexit-open > #revexitunit,body.revexit-open > .revexitunitwrap {min-height:100%;height: auto}#revexitmask,#revexitunit{top:0;width:100%;position:fixed;left:0}#revexitheader{position:relative;} #revexitsponsor {font-family:Arial,Tahoma,Helvetica,sans-serif;font-weight:normal!important;line-height: 18px;font-size: 12px;color:#737373;text-decoration:none!important;text-transform:none!important;} #revexitsponsor > span {text-transform:none!important} #revexitheader,.revexitheadline{font-family:Montserrat,Helvetica,sans-serif;text-transform:uppercase}#revexit,.revexitheadline{position:absolute;cursor:pointer}#revexitmask{height:100%;background:rgba(0,0,0,0.8);z-index:2147483600}#revexitunit{height:750px;background-color:#fff;display:block;z-index:2147483600;margin:5% auto;overflow-y:scroll;overflow-x:hidden} .revexitprovider{margin-top:4px;color:#ffffff;opacity:0.75;text-decoration:none;display:block;clear:both;font-size: 11px;text-align:left;} #revexitheader{color:#202526;display:block;/*font-size:26px;*/font-weight:400;/*height:42px;line-height:42px;*/text-align:left;margin:2% 0 0 0;-webkit-font-smoothing:antialiased}#revexitadpanel{height:100%;top:0;width:992px;margin:16px auto;position:relative}.revexititem{display:block;float:left;cursor:pointer;width:239px;height:274px;margin-right:12px;margin-bottom:20px}#revexititem_3,#revexititem_7{margin-right:0}.revexititem .revexititemmask{width:100%;height:100%;background-image:url(data:image/png;base64,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);background-position-y:274px;background-size:cover}.revexititem .revexititemmask:hover{background-image:none;background-color:rgba(88,86,214,.5);transition:all .6s ease-in-out}.revexitheadlinewrap{width:214px;padding:13px;height:244px;position:relative}.revexititem .revexititemmask:hover .revexitheadline{bottom:10px;transition:all .4s ease}.revexitheadline{line-height:24px;color:#fff;font-size:20px;font-weight:700;text-align:left;display:none;bottom:5px;word-wrap:break-word;width:218px}.revexitimgholder{width:100%;height:100%;background-size:cover}#revexitsponsor{font-size:10px;font-family:arial;text-decoration:none} #revexitcloseme{cursor:pointer;position:absolute;z-index:2147483601;display:block;margin-top:10px;top:0;right:0;width:20px;height:20px;text-decoration:none!important;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAOdJREFUeNq0lMEKwjAMhrPsRfTgfKYJDm/D5/EwdhiMHewz6cUXUWYiEWR26T/QwE+zpXxNy99mq01xIqKjqBfVt+vlQQtiXWxzGVrRQdRkArxLklv9LKpQqMEG0c5+Pdg6e4cWBpu4FKbRK7C2zmDoDEwZNdv2KhTqwF5HpR0SCk3B9CMbxxFa3XIX9gV0oMHG0oNFgQ6UUjANjs3+ONMQKQfPq0w/Dk74rIyUS8+nDJ5fmGx/1qcMmnZvSpqfUdOi5mf0BqA3Sp8vCIbeZ7bHEYYlOm3/8sA2moi6JbBJp50xmqcAAwCU66Sx7jStPgAAAABJRU5ErkJggg==);opacity:.2}#revexitcloseme:hover{opacity:1;transition:all .6s ease-in-out}@media only screen and (max-width :320px){#revexitheader{/*font-size:14px!important;height:16px!important;line-height:16px!important*/}#revexitadpanel{width:100%!important}.revexititem{display:block;float:left;cursor:pointer;width:96%!important;height:274px;margin:2% 2% 0}.revexititem .revexititemmask{background-position-y:330px}#revexitunit{height:2228px}#revexitsponsor{/*top:2386px!important;width:100%;left:0;padding-bottom: 40px; margin-bottom: 40px;*/ }#revexitcloseme{/*right:13px!important*/}}@media only screen and (max-width :480px){#revexitheader{/*font-size:16px!important;height:16px!important;line-height:16px!important*/}.revexititem .revexititemmask{background-position-y:330px}#revexitadpanel{width:100%!important; }.revexititem{display:block;float:left;cursor:pointer;width:96%!important;height:274px;margin:0 2% 2%}#revexitsponsor{/*top:2386px!important;width:100%;left:0; padding-bottom: 40px; margin-bottom: 40px;*/}#revexitsponsor span {/*top: -20px; position: relative;*/}#revexitcloseme{/*right:13px!important*/}}@media only screen and (max-width :1004px){#revexitadpanel{width:754px}#revexititem_3,#revexititem_7{margin-right:12px}#revexititem_0{width:488px}#revexititem_0 .revexitheadline,#revexititem_0 .revexitheadlinewrap{width:400px}#revexitunit{height:950px}.revexititem{margin-bottom:14px} #revexitsponsor{/*top:935px;width:100%;left:0*/}}@media only screen and (max-width :747px){#revexititem_0{width:239px}#revexititem_0 .revexitheadline,#revexititem_0 .revexitheadlinewrap{width:218px}#revexitadpanel{width:490px}#revexititem_1,#revexititem_3,#revexititem_5,#revexititem_7{margin-right:0}#revexitheader{/*font-size:23px*/}#revexitcloseme{right:1px}#revexitsponsor{/*top:1235px;width:100%;left:0;padding-bottom: 40px; margin-bottom: 40px;*/}}@media only screen and (min-device-width : 320px) and (max-device-width : 480px) and (orientation : portrait) { #revexitheader{/*font-size:12px!important*/}}@media only screen and (min-device-width : 320px) and (max-device-width : 480px) and (orientation : landscape) { #revexitheader{/*font-size:12px!important*/}}" +  ' ' + styles_hd + ' ' + styles_lg + ' ' + styles_md + ' ' + styles_sm + ' ' + styles_mobile+ ' ' + styles_tablet + ' ' + styles_phone + ' ' + styles_dock_header + ' ' + styles_fullscreen + ' ' + styles_boxdefense;
            revstyle += (' ' + styles_injected + ' ');
            //seperate types
            for (i = 0; i < revcontentexitdata.length; i++) {
                if (revcontentexitdata[i].type == "internal") {
                    internalArray.push(revcontentexitdata[i]);
                } else {
                    sponsoredArray.push(revcontentexitdata[i]);
                }
            }

            //fun with sortin
            if (revcontentexitvars.i == "btm" ) {
                revpayload = sponsoredArray.concat(internalArray);
            } else if (revcontentexitvars.i == "top") {
                revpayload = internalArray.concat(sponsoredArray);
            } else if (revcontentexitvars.i == "rndm") {
                while (internalArray.length || sponsoredArray.length) {
                    if (sponsoredArray.length) {
                        revpayload.push(revcontentExtractRandom(sponsoredArray));
                    }
                    if (internalArray.length){
                        revpayload.push(revcontentExtractRandom(internalArray));
                    }
                }
            } else if (revcontentexitvars.i == "all") {
                while (internalArray.length) {
                    revpayload.push(revcontentExtractRandom(internalArray));
                }
            } else {
                revpayload = sponsoredArray;
            }

            // Pseudo-tile for Mailing List Feature: "Tile Theme"
            if(subscriber_theme === "tile" && true === enableSubscriptions && typeof revcontentexitvars.ml !== undefined) {
                var fake_payload = {
                    headline: "",
                    url: "#",
                    image: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=",
                    brand: "RevContent",
                    type: "sponsored",
                    uid: null
                }
                revpayload.push(fake_payload);
            }

            for (i = 0; i < revpayload.length; i++) {
                revpayload1 = revpayload1 + "<div class='revexititem' id='revexititem_"+i+"'><a rel='nofollow' title='"+revpayload[i].headline+"' href='"+revpayload[i].url+"' target='_blank'><div class='revexitimgholder' style='background-image: url(http:"+ revpayload[i].image +");'><div class='revexititemmask'><div class='revexitheadlinewrap'><div class='revexitheadline'>"+ revpayload[i].headline + revcontentAdProviderLabel(revcontentexitvars.po, revpayload[i].type, revpayload[i].brand) + "</div></div></div></div></a></div>";
            }

            var revexit_package = "<style id='revexit_style'>" + revstyle + styles_panel3x2 + "</style><div id='revexitmask' class='revexitmaskwrap'><div id='revexitunit' class='revexitunitwrap' style='display:none;'><div id='revexitheader'><span href='#' id='revexitcloseme'></span><span class='rxlabel'>BEFORE YOU GO, CHECK OUT MORE</span> <a href='javascript:;' rel='nofollow' id='revexitsponsor' onclick='revDialog.showDialog();'>" + revcontentDisclosureLabel(revcontentexitvars.dl) + "</a></div><div id='revexitadpanel'>"+revpayload1+"<div style='clear:both;display:block;'></div></div></div>";
            $('#revexitmask, #revexitunit, .revexitmaskwrap, .revexitunitwrap, #revexit_style').detach();

            if(true === revExitIPhone) {
                $(revexit_package).prependTo('body');
            } else {
                $("body").append(function() {
                    $('#revexitmask, #revexitunit, .revexitmaskwrap, .revexitunitwrap, #revexit_style').detach();
                    return revexit_package;
                });
            }

            $("html, body").animate({ scrollTop: 0 }, "fast");
            revcontentBGControl(revcontentexitvars, revExitMobile, revExitIPhone, revExitIPad);

            //$( "#revexitunit" ).fadeIn( "slow", function() {
                revcontentSetupViewport(revExitMobile, revExitIPhone, revExitIPad, revcontentexitvars);
                $(window).on('resize', function(){
                   if($('body').hasClass('revexit-open')){
                       clearTimeout(viewportSetupTimeout);
                       var viewportSetupTimeout = setTimeout(function(){
                           revcontentSetupViewport(revExitMobile, revExitIPhone, revExitIPad, revcontentexitvars);
                       }, 900);
                   }
                });
                if($('#revexitmask').hasClass('modal-mobile') && !$('#revexitmask').hasClass('modal-tablet')){
                    $('#revexitunit').on('touchstart', function(ev){
                       var rvx_hdr = $(ev.target).closest('#revexitheader');
                       if(rvx_hdr.length === 0 && parseInt($('#revexitunit').scrollTop(), 10) > 48){ $('#revexitheader').hide(); }
                    });

                    $('#revexitunit').on('touchend', function(){
                        var dockInterval = setInterval(function(){
                            var current_pos = $('#revexitunit').scrollTop();
                            setTimeout(function(){
                                var rxunit_pos = parseInt($('#revexitunit').scrollTop(), 10);
                                if(rxunit_pos >= 48 && current_pos === parseInt($('#revexitunit').scrollTop(), 10)) {
                                    $('#revexitheader').addClass('docked');
                                    $('body').addClass('revheader-docked');
                                    if($('#revexitheader').css('display') == 'none'){
                                        $('#revexitheader').dequeue().fadeIn(800);
                                    }
                                } else if(rxunit_pos < 48) {
                                    $('#revexitheader').removeClass('docked');
                                    $('body').removeClass('revheader-docked');
                                    $('#revexitheader').dequeue().fadeIn(800);
                                } else {

                                }
                            }, 900);

                            clearInterval(this);

                        }, 4000);
                    });
                }
            //});

        });

        revcontentSetCookie("revcontentapibeforego_" + revcontentexitvars.w, 1, revcontentexitvars.ch/24);
    }

    function revcontentAdProviderLabel(providerOptions, type, provider){
        if(!providerOptions) {
            providerOptions = "internal";
        }
        var providerHtml = '';
        switch(providerOptions) {
            case "internal":
                providerHtml = (type === "internal" ? "<span class='revexitprovider'>" + provider + "</span>" :  '');
                break;
            case "sponsored":
                providerHtml = (type === "sponsored" ? "<span class='revexitprovider'>" + provider + "</span>" : '');
                break;
            case "all":
                providerHtml = "<span class='revexitprovider'>" + provider + "</span>";
                break;
            case "disabled":
                providerHtml = '';
                break;
        }

        return providerHtml;
    }

    function revcontentDisclosureLabel(customLabel) {
        var labelHtml = '';
        var disclosureLabel = "Sponsored "
            + "<em class='sponsor-noshow' style='font-style:normal!important'>"
            + "By Revcontent"
            + "</em>";

        if (customLabel !== undefined && customLabel.length > 2 && customLabel.length < 50) {
            disclosureLabel = decodeURI(customLabel.toString()).replace(/['"]+/g, '');
        }
        labelHtml = '<span>'
            + disclosureLabel
            + '</span>';

        return labelHtml;
    }

})}),'2.1.4');