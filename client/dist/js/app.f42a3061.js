(function(e){function t(t){for(var c,i,s=t[0],o=t[1],l=t[2],d=0,b=[];d<s.length;d++)i=s[d],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&b.push(a[i][0]),a[i]=0;for(c in o)Object.prototype.hasOwnProperty.call(o,c)&&(e[c]=o[c]);u&&u(t);while(b.length)b.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],c=!0,s=1;s<n.length;s++){var o=n[s];0!==a[o]&&(c=!1)}c&&(r.splice(t--,1),e=i(i.s=n[0]))}return e}var c={},a={app:0},r=[];function i(t){if(c[t])return c[t].exports;var n=c[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=c,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)i.d(n,c,function(t){return e[t]}.bind(null,c));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],o=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var u=o;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"07ba":function(e,t,n){"use strict";n("7a9e")},"188f":function(e,t,n){"use strict";n("cde5")},2436:function(e,t,n){},"25f07":function(e,t,n){"use strict";n("9963")},3647:function(e,t,n){"use strict";n("fcfc")},"416b":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var c=n("7a23");function a(e,t,n,a,r,i){var s=Object(c["v"])("Main");return Object(c["p"])(),Object(c["e"])(s)}var r={class:"container"},i={class:"content"};function s(e,t,n,a,s,o){var l=Object(c["v"])("Header"),u=Object(c["v"])("Random"),d=Object(c["v"])("Search"),b=Object(c["v"])("Footer");return Object(c["p"])(),Object(c["e"])("div",r,[Object(c["i"])(l),Object(c["i"])("div",i,[Object(c["i"])(u),Object(c["i"])(d)]),Object(c["i"])(b)])}var o=n("bc3a"),l=n.n(o),u=Object(c["s"])({conferences:[],speakers:[],topics:[]}),d=l.a.create({baseURL:"/",withCredentials:!1,headers:{Accept:"application/json","Content-Type":"application/json"}}),b={getTalks:function(){return d.get("/talks")},getSearchParams:function(){return d.get("/search")},submitSearch:function(){return d.post("/talks/search",u)}},f=Object(c["C"])("data-v-6d4b7424");Object(c["r"])("data-v-6d4b7424");var p={class:"header"},j=Object(c["g"])('<div class="header__title" data-v-6d4b7424><h1 data-v-6d4b7424><span class="title-line title-random" data-v-6d4b7424>Random</span><span class="title-line" data-v-6d4b7424><span class="title-word" data-v-6d4b7424>General</span><span class="title-word" data-v-6d4b7424>Conference</span></span></h1></div><div class="header__subtitle" data-v-6d4b7424><h2 data-v-6d4b7424><span data-v-6d4b7424>Find random talks from the the general conferences of </span><span data-v-6d4b7424>The Church of Jesus Christ of Latter-day Saints.</span></h2><h3 class="tagline" data-v-6d4b7424>Find old favorites. Discover new gems.</h3></div>',2);Object(c["q"])();var O=f((function(e,t){return Object(c["p"])(),Object(c["e"])("header",p,[j])}));n("bd6e");const h={};h.render=O,h.__scopeId="data-v-6d4b7424";var v=h,m=Object(c["C"])("data-v-1035c9f8");Object(c["r"])("data-v-1035c9f8");var _={class:"footer"},k=Object(c["i"])("div",{class:"footer__text"},[Object(c["i"])("p",null," This website is NOT an official website of The Church of Jesus Christ of Latter-day Saints. "),Object(c["i"])("p",null," © 2021 Jordan Werre. ")],-1);Object(c["q"])();var g=m((function(e,t){return Object(c["p"])(),Object(c["e"])("header",_,[k])}));n("188f");const S={};S.render=g,S.__scopeId="data-v-1035c9f8";var w=S,y=Object(c["C"])("data-v-25937691");Object(c["r"])("data-v-25937691");var C={class:"slider"},T={class:"slider__container"},G={class:"slider__content"},P={class:"slider__content--title"},M={key:0,class:"slider__content--speaker"},x={key:1,class:"slider__content--conference"},I={key:2,class:"slider__content--topics"},R={key:0};Object(c["q"])();var L=y((function(e,t,n,a,r,i){var s=Object(c["v"])("swiper-slide"),o=Object(c["v"])("swiper");return Object(c["p"])(),Object(c["e"])("div",C,[Object(c["i"])("div",T,[i.talks.length>0?(Object(c["p"])(),Object(c["e"])(o,{key:0,effect:"flip",grabCursor:!1,navigation:!0,onSwiper:i.initSwiper},{default:y((function(){return[(Object(c["p"])(!0),Object(c["e"])(c["a"],null,Object(c["u"])(i.talks,(function(e,t){return Object(c["p"])(),Object(c["e"])(s,{key:t},{default:y((function(){return[Object(c["i"])("div",G,[Object(c["i"])("a",{href:i.fullUrl(e.url),target:"_blank",class:"slider__content--link"},[Object(c["i"])("div",P,Object(c["w"])(e.title),1),e.speaker[0]?(Object(c["p"])(),Object(c["e"])("div",M,Object(c["w"])(i.getSpeaker(e)),1)):Object(c["f"])("",!0),e.conference[0]?(Object(c["p"])(),Object(c["e"])("div",x,Object(c["w"])(i.getConference(e)),1)):Object(c["f"])("",!0),e.topics.length?(Object(c["p"])(),Object(c["e"])("div",I,[(Object(c["p"])(!0),Object(c["e"])(c["a"],null,Object(c["u"])(e.topics,(function(t,n){return Object(c["p"])(),Object(c["e"])("span",{key:e.url+"_"+n,class:"slider__content--topic-item"},[n>0?(Object(c["p"])(),Object(c["e"])("span",R," • ")):Object(c["f"])("",!0),Object(c["h"])(Object(c["w"])(t.topicname),1)])})),128))])):Object(c["f"])("",!0)],8,["href"])])]})),_:2},1024)})),128))]})),_:1},8,["onSwiper"])):Object(c["f"])("",!0)])])})),q=(n("b0c0"),n("498a"),n("d3b7"),n("25f0"),n("6d3b")),A=n("8343"),U=n("98af"),F=n("90ea"),J=n("a16a");n("e25d");q["a"].use([A["a"],U["a"]]);var B={inject:["GTalks"],components:{Swiper:F["a"],SwiperSlide:J["a"]},data:function(){return{random:null,swiper:null}},computed:{baseURL:function(){var e;return null===(e=this.GTalks.talks)||void 0===e?void 0:e.baseURL},language:function(){var e;return null===(e=this.GTalks.talks)||void 0===e?void 0:e.language},talks:function(){var e,t=null===(e=this.GTalks.talks)||void 0===e?void 0:e.talks;if(!t)return[];var n,c,a=t.length;while(0!==a)c=Math.floor((this.random?this.random:Math.random())*a),a-=1,n=t[a],t[a]=t[c],t[c]=n;return t}},watch:{talks:function(){this.setRandom(),this.swiper&&this.swiper.slideTo(0,0)}},methods:{initSwiper:function(e){this.swiper=e},fullUrl:function(e){return e?this.baseURL+e+this.language:"#"},getSpeaker:function(e){var t;return(null===(t=e.speaker[0])||void 0===t?void 0:t.name)||""},getConference:function(e){return e.conference[0]?(e.conference[0].month+" "+e.conference[0].year.toString()).trim():""},setRandom:function(){this.random=Math.random()}},created:function(){this.setRandom()}};n("5dfe");B.render=L,B.__scopeId="data-v-25937691";var N=B,H=n("96af"),$=n.n(H),z=Object(c["C"])("data-v-7282c734");Object(c["r"])("data-v-7282c734");var D=$.a+"#info-circle",E={class:"search"},V={class:"search__descr"},W=Object(c["h"])(" Search category criteria to specialize your random "),K={class:"inline-block"},Q=Object(c["h"])("talks. "),X=Object(c["i"])("svg",{class:"search__descr--info"},[Object(c["i"])("use",{"xlink:href":D})],-1),Y={class:"search__btn-row"},Z=Object(c["h"])(" Clear Selection"),ee={key:1,class:"searchBars"};Object(c["q"])();var te=z((function(e,t,n,a,r,i){var s=Object(c["v"])("InstructionModal"),o=Object(c["v"])("SelectedParams"),l=Object(c["v"])("SearchBar");return Object(c["p"])(),Object(c["e"])("div",E,[Object(c["i"])("div",V,[W,Object(c["i"])("span",K,[Q,Object(c["i"])("span",{class:"search__modal-click",onClick:t[1]||(t[1]=function(e){return r.showModal=!0})},[X])])]),r.showModal?(Object(c["p"])(),Object(c["e"])(s,{key:0,onClick:t[2]||(t[2]=function(e){return r.showModal=!1})})):Object(c["f"])("",!0),Object(c["i"])(o),Object(c["i"])("div",Y,[Object(c["i"])("button",{class:"search__btn",onClick:t[3]||(t[3]=function(){return i.submitSearch&&i.submitSearch.apply(i,arguments)})}," Find Random Talks "),Object(c["i"])("button",{class:"search__btn",disabled:!i.foundParams,onClick:t[4]||(t[4]=function(){return i.clearParams&&i.clearParams.apply(i,arguments)})},[Z,Object(c["A"])(Object(c["i"])("span",null,"s",512),[[c["y"],i.foundParams>1]])],8,["disabled"])]),r.searchParams?(Object(c["p"])(),Object(c["e"])("div",ee,[Object(c["i"])(l,{title:"Conferences",list:r.searchParams.conferences,collection:"conferences"},null,8,["list"]),Object(c["i"])(l,{title:"Speakers",list:r.searchParams.speakers,collection:"speakers"},null,8,["list"]),Object(c["i"])(l,{title:"Topics",list:r.searchParams.topics,collection:"topics"},null,8,["list"])])):Object(c["f"])("",!0)])})),ne=Object(c["C"])("data-v-3efe1361"),ce=ne((function(e,t,n,a,r,i){var s=Object(c["v"])("ListItems");return Object(c["p"])(!0),Object(c["e"])(c["a"],null,Object(c["u"])(i.GStore,(function(e,t){return Object(c["p"])(),Object(c["e"])("div",{key:t,class:"list-group"},[Object(c["i"])(s,{list:e,name:t},null,8,["list","name"])])})),128)})),ae=(n("ac1f"),n("841c"),Object(c["C"])("data-v-46f16661"));Object(c["r"])("data-v-46f16661");var re={key:0};Object(c["q"])();var ie=ae((function(e,t,n,a,r,i){return Object(c["p"])(!0),Object(c["e"])(c["a"],null,Object(c["u"])(n.list,(function(e,t){return Object(c["p"])(),Object(c["e"])("span",{key:e},[t>0?(Object(c["p"])(),Object(c["e"])("span",re,"   •   ")):Object(c["f"])("",!0),Object(c["i"])("span",{onClick:function(t){return i.remove(e)},class:"item"},Object(c["w"])(e.search),9,["onClick"])])})),128)})),se=(n("4de4"),{inject:["GStore"],props:["list","name"],methods:{remove:function(e){this.GStore[this.name]=this.GStore[this.name].filter((function(t){return t._id!==e._id}))}}});n("8ff8");se.render=ie,se.__scopeId="data-v-46f16661";var oe=se,le={inject:["GStore"],components:{ListItems:oe}};n("07ba");le.render=ce,le.__scopeId="data-v-3efe1361";var ue=le,de=Object(c["C"])("data-v-50c6171c");Object(c["r"])("data-v-50c6171c");var be=$.a+"#x",fe={action:"#",class:"searchbar"},pe=Object(c["i"])("use",{"xlink:href":be},null,-1),je={class:"list-container"},Oe={key:0,class:"list"};Object(c["q"])();var he=de((function(e,t,n,a,r,i){return Object(c["p"])(),Object(c["e"])(c["a"],null,[Object(c["i"])("form",fe,[Object(c["A"])(Object(c["i"])("input",{"onUpdate:modelValue":t[1]||(t[1]=function(e){return r.input=e}),placeholder:n.title,class:"searchbar__input"},null,8,["placeholder"]),[[c["x"],r.input]]),Object(c["i"])("button",{onClick:t[2]||(t[2]=Object(c["B"])((function(){return i.clearSearch&&i.clearSearch.apply(i,arguments)}),["prevent"])),class:"searchbar__button"},[(Object(c["p"])(),Object(c["e"])("svg",{class:[{hidden:!r.input},"searchbar__clear"]},[pe],2))])]),Object(c["i"])("div",je,[i.filtered.length>0?(Object(c["p"])(),Object(c["e"])("ul",Oe,[(Object(c["p"])(!0),Object(c["e"])(c["a"],null,Object(c["u"])(i.filtered,(function(e){return Object(c["p"])(),Object(c["e"])("li",{key:e._id,class:"list__item",onClick:function(t){return i.selected(e)}},Object(c["w"])(e.search),9,["onClick"])})),128))])):Object(c["f"])("",!0)])],64)}));n("4d63"),n("d81d");function ve(e,t){var n;return function(){var c=this,a=arguments;clearTimeout(n),n=setTimeout((function(){return e.apply(c,a)}),t)}}var me={inject:["GStore"],props:{title:{type:String,default:""},list:{type:Array,required:!0},collection:{type:String,required:!0}},data:function(){return{input:"",dbInput:""}},computed:{filtered:function(){var e=this;if(""===this.dbInput)return[];var t=new RegExp("^.*"+this.dbInput.toLowerCase()+".*$");return this.list.filter((function(n){return!(e.GStore[e.collection].map((function(e){return e.search})).indexOf(n.search)>-1)&&t.test(n.search.toLowerCase())}))}},watch:{input:ve((function(e){this.dbInput=e}),500)},methods:{selected:function(e){var t=this.filtered.length;this.GStore[this.collection].push(e),t<=1&&(this.input="")},clearSearch:function(){this.input=""}}};n("25f07");me.render=he,me.__scopeId="data-v-50c6171c";var _e=me,ke=Object(c["C"])("data-v-96f20b86");Object(c["r"])("data-v-96f20b86");var ge={class:"modal__mask"},Se={class:"modal__wrapper"},we={class:"modal__container"},ye=Object(c["i"])("div",{class:"modal__text"},[Object(c["i"])("div",null," Talks will be selected that match at least one of a given criteria for each category (Conferences, Speakers, or Topics). Categories with no criteria will not be considered when selecting talks. "),Object(c["i"])("div",null,[Object(c["h"])(" For example, to search all talks given by Russell M. Nelson given during "),Object(c["i"])("span",{class:"italics"},"either"),Object(c["h"])(" the April 2018 or October 2018 General Conference, select... "),Object(c["i"])("ul",null,[Object(c["i"])("li",null,'Conferences: "April 2018", "October 2018"'),Object(c["i"])("li",null,'Speakers: "Russell M. Nelson"')])]),Object(c["i"])("div",null," To select a random sampling of all available talks, simply omit all criteria from each category. ")],-1);Object(c["q"])();var Ce=ke((function(e,t,n,a,r,i){return Object(c["p"])(),Object(c["e"])(c["b"],{name:"modal"},{default:ke((function(){return[Object(c["i"])("div",ge,[Object(c["i"])("div",Se,[Object(c["i"])("div",we,[ye,Object(c["i"])("button",{class:"modal__close-button",onClick:t[1]||(t[1]=function(t){return e.$emit("close")})}," Close ")])])])]})),_:1})})),Te={emits:["close"]};n("6404");Te.render=Ce,Te.__scopeId="data-v-96f20b86";var Ge=Te,Pe={inject:["GStore","GTalks"],components:{SelectedParams:ue,SearchBar:_e,InstructionModal:Ge},data:function(){return{searchParams:null,showModal:!1}},computed:{foundParams:function(){var e=0;for(var t in this.GStore)e+=this.GStore[t].length;return e}},methods:{submitSearch:function(){var e=this;b.submitSearch().then((function(t){e.GTalks.talks=t.data})).catch((function(e){console.log(e)}))},clearParams:function(){for(var e in this.GStore)this.GStore[e]=[]}},created:function(){var e=this;b.getSearchParams().then((function(t){e.searchParams=t.data})).catch((function(e){console.log(e)}))}};n("b374");Pe.render=te,Pe.__scopeId="data-v-7282c734";var Me=Pe,xe={name:"App",inject:["GTalks"],components:{Header:v,Footer:w,Random:N,Search:Me},created:function(){var e=this;b.getTalks().then((function(t){e.GTalks.talks=t.data})).catch((function(e){console.log(e)}))}};n("3647");xe.render=s;var Ie=xe,Re={name:"App",components:{Main:Ie}};n("eda2");Re.render=a;var Le=Re,qe=Object(c["s"])({talks:{}});Object(c["d"])(Le).provide("GStore",u).provide("GTalks",qe).mount("#app")},"5dfe":function(e,t,n){"use strict";n("416b")},6404:function(e,t,n){"use strict";n("984c")},"710d":function(e,t,n){},"7a9e":function(e,t,n){},"7c21":function(e,t,n){},"8ff8":function(e,t,n){"use strict";n("9b4f")},"96af":function(e,t,n){e.exports=n.p+"img/bootstrap-icons.982100e4.svg"},"984c":function(e,t,n){},9963:function(e,t,n){},"9b4f":function(e,t,n){},b374:function(e,t,n){"use strict";n("2436")},bd6e:function(e,t,n){"use strict";n("7c21")},cde5:function(e,t,n){},eda2:function(e,t,n){"use strict";n("710d")},fcfc:function(e,t,n){}});
//# sourceMappingURL=app.f42a3061.js.map