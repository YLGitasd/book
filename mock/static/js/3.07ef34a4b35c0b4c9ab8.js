webpackJsonp([3],{Cdx3:function(e,o,t){var n=t("sB3e"),r=t("lktj");t("uqUo")("keys",function(){return function(e){return r(n(e))}})},fZjL:function(e,o,t){e.exports={default:t("jFbC"),__esModule:!0}},jFbC:function(e,o,t){t("Cdx3"),e.exports=t("FeBl").Object.keys},secW:function(e,o){},uqUo:function(e,o,t){var n=t("kM2E"),r=t("FeBl"),a=t("S82l");e.exports=function(e,o){var t=(r.Object||{})[e]||Object[e],i={};i[e]=o(t),n(n.S+n.F*a(function(){t(1)}),"Object",i)}},wHgX:function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n=t("fZjL"),r=t.n(n),a=t("Xxa5"),i=t.n(a),u=t("exGp"),s=t.n(u),c=t("UeVD"),b=t("gyMJ"),f={name:"detail",data:function(){return{book:{}}},watch:{$route:function(){this.getData()}},created:function(){this.getData()},methods:{update:function(){var e=this;return s()(i.a.mark(function o(){return i.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Object(b.f)(e.bid,e.book);case 2:e.$router.push("/list");case 3:case"end":return o.stop()}},o,e)}))()},getData:function(){var e=this;return s()(i.a.mark(function o(){return i.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Object(b.b)(e.bid);case 2:e.book=o.sent,r()(e.book).length>0||e.$router.push("/list");case 4:case"end":return o.stop()}},o,e)}))()}},computed:{bid:function(){return this.$route.params.bid}},components:{MHeader:c.a}},l={render:function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",{staticClass:"detail"},[t("MHeader",{attrs:{back:!0}},[e._v("详情")]),e._v(" "),t("ul",[t("li",[t("label",{attrs:{for:"bookName"}},[e._v("书的名称")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.book.bookName,expression:"book.bookName"}],attrs:{type:"text",id:"bookName"},domProps:{value:e.book.bookName},on:{input:function(o){o.target.composing||e.$set(e.book,"bookName",o.target.value)}}})]),e._v(" "),t("li",[t("label",{attrs:{for:"bookInfo"}},[e._v("书的信息")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.book.bookInfo,expression:"book.bookInfo"}],attrs:{type:"text",id:"bookInfo"},domProps:{value:e.book.bookInfo},on:{input:function(o){o.target.composing||e.$set(e.book,"bookInfo",o.target.value)}}})]),e._v(" "),t("li",[t("label",{attrs:{for:"bookPrice"}},[e._v("书的价格")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model.number",value:e.book.bookPrice,expression:"book.bookPrice",modifiers:{number:!0}}],attrs:{type:"text",id:"bookPrice"},domProps:{value:e.book.bookPrice},on:{input:function(o){o.target.composing||e.$set(e.book,"bookPrice",e._n(o.target.value))},blur:function(o){e.$forceUpdate()}}})]),e._v(" "),t("button",{on:{click:e.update}},[e._v("确认修改")])])],1)},staticRenderFns:[]};var d=t("VU/8")(f,l,!1,function(e){t("secW")},"data-v-01164467",null);o.default=d.exports}});
//# sourceMappingURL=3.07ef34a4b35c0b4c9ab8.js.map