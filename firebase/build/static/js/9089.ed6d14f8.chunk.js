"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9089],{19089:function(t,r,e){e.r(r),e.d(r,{MarketplaceV3:function(){return p}});var n=e(74165),a=e(15861),i=e(15671),c=e(43144),s=e(4942),o=e(96632),p=(e(80518),e(20737),e(78262),e(66315),e(13631),e(84255),function(){function t(r,e,n){(0,i.Z)(this,t);var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},c=arguments.length>4?arguments[4]:void 0,s=arguments.length>5?arguments[5]:void 0,p=arguments.length>6&&void 0!==arguments[6]?arguments[6]:new o.d4(r,e,c,a,n);this._chainId=s,this.abi=o.e.parse(c||[]),this.contractWrapper=p,this.storage=n,this.metadata=new o.ag(this.contractWrapper,o.ds,this.storage),this.app=new o.a$(this.contractWrapper,this.metadata,this.storage),this.roles=new o.ah(this.contractWrapper,t.contractRoles),this.encoder=new o.af(this.contractWrapper),this.estimator=new o.aP(this.contractWrapper),this.events=new o.aQ(this.contractWrapper),this.platformFees=new o.aS(this.contractWrapper),this.interceptor=new o.aR(this.contractWrapper)}return(0,c.Z)(t,[{key:"directListings",get:function(){return(0,o.b_)(this.detectDirectListings(),o.dt)}},{key:"englishAuctions",get:function(){return(0,o.b_)(this.detectEnglishAuctions(),o.du)}},{key:"offers",get:function(){return(0,o.b_)(this.detectOffers(),o.dv)}},{key:"chainId",get:function(){return this._chainId}},{key:"onNetworkUpdated",value:function(t){this.contractWrapper.updateSignerOrProvider(t)}},{key:"getAddress",value:function(){return this.contractWrapper.readContract.address}},{key:"prepare",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r,e,a){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",o.aV.fromContractWrapper({contractWrapper:this.contractWrapper,method:r,args:e,overrides:a}));case 1:case"end":return t.stop()}}),t,this)})));return function(r,e,n){return t.apply(this,arguments)}}()},{key:"call",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r,e,a){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.contractWrapper.call(r,e,a));case 1:case"end":return t.stop()}}),t,this)})));return function(r,e,n){return t.apply(this,arguments)}}()},{key:"detectDirectListings",value:function(){if((0,o.b$)(this.contractWrapper,"DirectListings"))return new o.aM(this.contractWrapper,this.storage)}},{key:"detectEnglishAuctions",value:function(){if((0,o.b$)(this.contractWrapper,"EnglishAuctions"))return new o.aN(this.contractWrapper,this.storage)}},{key:"detectOffers",value:function(){if((0,o.b$)(this.contractWrapper,"Offers"))return new o.aO(this.contractWrapper,this.storage)}}]),t}());(0,s.Z)(p,"contractRoles",o.dr)}}]);
//# sourceMappingURL=9089.ed6d14f8.chunk.js.map