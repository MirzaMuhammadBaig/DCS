"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8494],{44231:function(r,t,e){e.d(t,{S:function(){return i}});var n=e(74165),a=e(15861),c=e(15671),u=e(43144),s=e(4942),o=e(96632),i=function(){function r(t,e,u){var i=this;(0,c.Z)(this,r),(0,s.Z)(this,"transfer",(0,o.db)(function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t,e){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",i.erc721.transfer.prepare(t,e));case 1:case"end":return r.stop()}}),r)})));return function(t,e){return r.apply(this,arguments)}}())),(0,s.Z)(this,"setApprovalForAll",(0,o.db)(function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t,e){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",i.erc721.setApprovalForAll.prepare(t,e));case 1:case"end":return r.stop()}}),r)})));return function(t,e){return r.apply(this,arguments)}}())),(0,s.Z)(this,"setApprovalForToken",(0,o.db)(function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t,e){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.t0=o.aV,r.t1=i.contractWrapper,r.next=4,(0,o.cq)(t);case 4:return r.t2=r.sent,r.t3=e,r.t4=[r.t2,r.t3],r.t5={contractWrapper:r.t1,method:"approve",args:r.t4},r.abrupt("return",r.t0.fromContractWrapper.call(r.t0,r.t5));case 9:case"end":return r.stop()}}),r)})));return function(t,e){return r.apply(this,arguments)}}())),this.contractWrapper=t,this.storage=e,this.erc721=new o.aC(this.contractWrapper,this.storage,u),this._chainId=u}return(0,u.Z)(r,[{key:"chainId",get:function(){return this._chainId}},{key:"onNetworkUpdated",value:function(r){this.contractWrapper.updateSignerOrProvider(r)}},{key:"getAddress",value:function(){return this.contractWrapper.readContract.address}},{key:"getAll",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",this.erc721.getAll(t));case 1:case"end":return r.stop()}}),r,this)})));return function(t){return r.apply(this,arguments)}}()},{key:"getOwned",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!t){r.next=4;break}return r.next=3,(0,o.cq)(t);case 3:t=r.sent;case 4:return r.abrupt("return",this.erc721.getOwned(t));case 5:case"end":return r.stop()}}),r,this)})));return function(t){return r.apply(this,arguments)}}()},{key:"getOwnedTokenIds",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!t){r.next=4;break}return r.next=3,(0,o.cq)(t);case 3:t=r.sent;case 4:return r.abrupt("return",this.erc721.getOwnedTokenIds(t));case 5:case"end":return r.stop()}}),r,this)})));return function(t){return r.apply(this,arguments)}}()},{key:"totalSupply",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",this.erc721.totalCirculatingSupply());case 1:case"end":return r.stop()}}),r,this)})));return function(){return r.apply(this,arguments)}}()},{key:"get",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",this.erc721.get(t));case 1:case"end":return r.stop()}}),r,this)})));return function(t){return r.apply(this,arguments)}}()},{key:"ownerOf",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",this.erc721.ownerOf(t));case 1:case"end":return r.stop()}}),r,this)})));return function(t){return r.apply(this,arguments)}}()},{key:"balanceOf",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",this.erc721.balanceOf(t));case 1:case"end":return r.stop()}}),r,this)})));return function(t){return r.apply(this,arguments)}}()},{key:"balance",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",this.erc721.balance());case 1:case"end":return r.stop()}}),r,this)})));return function(){return r.apply(this,arguments)}}()},{key:"isApproved",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t,e){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",this.erc721.isApproved(t,e));case 1:case"end":return r.stop()}}),r,this)})));return function(t,e){return r.apply(this,arguments)}}()}]),r}()},48494:function(r,t,e){e.r(t),e.d(t,{NFTCollection:function(){return Z}});var n=e(74165),a=e(15861),c=e(15671),u=e(43144),s=e(97326),o=e(60136),i=e(29388),p=e(4942),f=e(96632),h=e(44231),l=e(68624),Z=(e(80518),e(20737),e(78262),e(66315),e(13631),e(84255),function(r){(0,o.Z)(e,r);var t=(0,i.Z)(e);function e(r,u,o){var i;(0,c.Z)(this,e);var h=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},l=arguments.length>4?arguments[4]:void 0,Z=arguments.length>5?arguments[5]:void 0,d=arguments.length>6&&void 0!==arguments[6]?arguments[6]:new f.d4(r,u,l,h,o);return i=t.call(this,d,o,Z),(0,p.Z)((0,s.Z)(i),"mint",(0,f.db)(function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",i.erc721.mint.prepare(t));case 1:case"end":return r.stop()}}),r)})));return function(t){return r.apply(this,arguments)}}())),(0,p.Z)((0,s.Z)(i),"mintTo",(0,f.db)(function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t,e){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",i.erc721.mintTo.prepare(t,e));case 1:case"end":return r.stop()}}),r)})));return function(t,e){return r.apply(this,arguments)}}())),(0,p.Z)((0,s.Z)(i),"mintBatch",(0,f.db)(function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",i.erc721.mintBatch.prepare(t));case 1:case"end":return r.stop()}}),r)})));return function(t){return r.apply(this,arguments)}}())),(0,p.Z)((0,s.Z)(i),"mintBatchTo",(0,f.db)(function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t,e){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",i.erc721.mintBatchTo.prepare(t,e));case 1:case"end":return r.stop()}}),r)})));return function(t,e){return r.apply(this,arguments)}}())),(0,p.Z)((0,s.Z)(i),"burn",(0,f.db)((function(r){return i.erc721.burn.prepare(r)}))),i.abi=f.e.parse(l||[]),i.metadata=new f.ag(i.contractWrapper,f.dz,i.storage),i.app=new f.a$(i.contractWrapper,i.metadata,i.storage),i.roles=new f.ah(i.contractWrapper,e.contractRoles),i.royalties=new f.ai(i.contractWrapper,i.metadata),i.sales=new f.aj(i.contractWrapper),i.encoder=new f.af(i.contractWrapper),i.estimator=new f.aP(i.contractWrapper),i.events=new f.aQ(i.contractWrapper),i.platformFees=new f.aS(i.contractWrapper),i.interceptor=new f.aR(i.contractWrapper),i.signature=new f.aD(i.contractWrapper,i.storage),i.owner=new f.aU(i.contractWrapper),i}return(0,u.Z)(e,[{key:"onNetworkUpdated",value:function(r){this.contractWrapper.updateSignerOrProvider(r)}},{key:"getAddress",value:function(){return this.contractWrapper.readContract.address}},{key:"isTransferRestricted",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(){var t;return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,this.contractWrapper.readContract.hasRole((0,f.bH)("transfer"),l.d);case 2:return t=r.sent,r.abrupt("return",!t);case 4:case"end":return r.stop()}}),r,this)})));return function(){return r.apply(this,arguments)}}()},{key:"getMintTransaction",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t,e){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",this.erc721.getMintTransaction(t,e));case 1:case"end":return r.stop()}}),r,this)})));return function(t,e){return r.apply(this,arguments)}}()},{key:"prepare",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t,e,a){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",f.aV.fromContractWrapper({contractWrapper:this.contractWrapper,method:t,args:e,overrides:a}));case 1:case"end":return r.stop()}}),r,this)})));return function(t,e,n){return r.apply(this,arguments)}}()},{key:"call",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t,e,a){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",this.contractWrapper.call(t,e,a));case 1:case"end":return r.stop()}}),r,this)})));return function(t,e,n){return r.apply(this,arguments)}}()}]),e}(h.S));(0,p.Z)(Z,"contractRoles",f.dn)}}]);
//# sourceMappingURL=8494.1080fef2.chunk.js.map