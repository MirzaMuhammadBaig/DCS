"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6186],{20874:function(t,e,n){n.d(e,{W:function(){return h}});var r=n(15671),i=n(43144),a=n(97326),s=n(60136),c=n(29388),o=n(46170),u=n(68911),h=function(t){(0,s.Z)(n,t);var e=(0,c.Z)(n);function n(t){var i;(0,r.Z)(this,n);var s=t.chains,c=void 0===s?u.gL9:s,h=t.options;return i=e.call(this),(0,o._)((0,a.Z)(i),"id",void 0),(0,o._)((0,a.Z)(i),"name",void 0),(0,o._)((0,a.Z)(i),"chains",void 0),(0,o._)((0,a.Z)(i),"options",void 0),(0,o._)((0,a.Z)(i),"ready",void 0),i.chains=c,i.options=h,i}return(0,i.Z)(n,[{key:"getBlockExplorerUrls",value:function(t){var e,n,r=null!==(e=null===(n=t.explorers)||void 0===n?void 0:n.map((function(t){return t.url})))&&void 0!==e?e:[];return r.length>0?r:void 0}},{key:"isChainUnsupported",value:function(t){return!this.chains.some((function(e){return e.chainId===t}))}},{key:"updateChains",value:function(t){this.chains=t}}]),n}(n(13631).Z)},79089:function(t,e,n){n.d(e,{A:function(){return d},C:function(){return l},R:function(){return v},S:function(){return Z},U:function(){return w},a:function(){return f}});var r=n(43144),i=n(15671),a=n(97326),s=n(60136),c=n(29388),o=n(98737),u=n(46170),h=function(t){(0,s.Z)(n,t);var e=(0,c.Z)(n);function n(t,r){var s;(0,i.Z)(this,n);var c=r.cause,o=r.code,h=r.data;if(!Number.isInteger(o))throw new Error('"code" must be an integer.');if(!t||"string"!==typeof t)throw new Error('"message" must be a nonempty string.');return s=e.call(this,"".concat(t,". Cause: ").concat(JSON.stringify(c))),(0,u._)((0,a.Z)(s),"cause",void 0),(0,u._)((0,a.Z)(s),"code",void 0),(0,u._)((0,a.Z)(s),"data",void 0),s.cause=c,s.code=o,s.data=h,s}return(0,r.Z)(n)}((0,o.Z)(Error)),p=function(t){(0,s.Z)(n,t);var e=(0,c.Z)(n);function n(t,r){(0,i.Z)(this,n);var a=r.cause,s=r.code,c=r.data;if(!(Number.isInteger(s)&&s>=1e3&&s<=4999))throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');return e.call(this,t,{cause:a,code:s,data:c})}return(0,r.Z)(n)}(h),d=function(t){(0,s.Z)(n,t);var e=(0,c.Z)(n);function n(){var t;return(0,i.Z)(this,n),t=e.apply(this,arguments),(0,u._)((0,a.Z)(t),"name","AddChainError"),(0,u._)((0,a.Z)(t),"message","Error adding chain"),t}return(0,r.Z)(n)}((0,o.Z)(Error)),l=function(t){(0,s.Z)(n,t);var e=(0,c.Z)(n);function n(t){var r;(0,i.Z)(this,n);var s=t.chainId,c=t.connectorId;return r=e.call(this,'Chain "'.concat(s,'" not configured for connector "').concat(c,'".')),(0,u._)((0,a.Z)(r),"name","ChainNotConfigured"),r}return(0,r.Z)(n)}((0,o.Z)(Error)),f=function(t){(0,s.Z)(n,t);var e=(0,c.Z)(n);function n(){var t;return(0,i.Z)(this,n),t=e.apply(this,arguments),(0,u._)((0,a.Z)(t),"name","ConnectorNotFoundError"),(0,u._)((0,a.Z)(t),"message","Connector not found"),t}return(0,r.Z)(n)}((0,o.Z)(Error)),v=function(t){(0,s.Z)(n,t);var e=(0,c.Z)(n);function n(t){var r;return(0,i.Z)(this,n),r=e.call(this,"Resource unavailable",{cause:t,code:-32002}),(0,u._)((0,a.Z)(r),"name","ResourceUnavailable"),r}return(0,r.Z)(n)}(h),Z=function(t){(0,s.Z)(n,t);var e=(0,c.Z)(n);function n(t){var r;return(0,i.Z)(this,n),r=e.call(this,"Error switching chain",{cause:t,code:4902}),(0,u._)((0,a.Z)(r),"name","SwitchChainError"),r}return(0,r.Z)(n)}(p),w=function(t){(0,s.Z)(n,t);var e=(0,c.Z)(n);function n(t){var r;return(0,i.Z)(this,n),r=e.call(this,"User rejected request",{cause:t,code:4001}),(0,u._)((0,a.Z)(r),"name","UserRejectedRequestError"),r}return(0,r.Z)(n)}(p)},6186:function(t,e,n){n.r(e),n.d(e,{WalletConnectConnector:function(){return j}});var r=n(84506),i=n(93433),a=n(29439),s=n(74165),c=n(15861),o=n(1413),u=n(15671),h=n(43144),p=n(97326),d=n(60136),l=n(29388),f=n(41146),v=n(63700),Z=n(46170),w=n(97419),m=n(60723),b=n(49716),g=n(9176),x=n(20874),k=n(79089),C=(n(13631),new Set([1,137,10,42161,56])),y="eip155",_="wagmi.requestedChains",I="wallet_addEthereumChain",E="last-used-chain-id",S=new WeakMap,N=new WeakMap,U=new WeakMap,W=new WeakSet,A=new WeakSet,M=new WeakSet,P=new WeakSet,L=new WeakSet,O=new WeakSet,D=new WeakSet,q=new WeakSet,j=function(t){(0,d.Z)(n,t);var e=(0,l.Z)(n);function n(t){var r;return(0,u.Z)(this,n),r=e.call(this,(0,o.Z)((0,o.Z)({},t),{},{options:(0,o.Z)({isNewChainsStale:!0},t.options)})),(0,f._)((0,p.Z)(r),q),(0,f._)((0,p.Z)(r),D),(0,f._)((0,p.Z)(r),O),(0,f._)((0,p.Z)(r),L),(0,f._)((0,p.Z)(r),P),(0,f._)((0,p.Z)(r),M),(0,f._)((0,p.Z)(r),A),(0,f._)((0,p.Z)(r),W),(0,Z._)((0,p.Z)(r),"id",g.w.walletConnect),(0,Z._)((0,p.Z)(r),"name","WalletConnect"),(0,Z._)((0,p.Z)(r),"ready",!0),(0,v._)((0,p.Z)(r),S,{writable:!0,value:void 0}),(0,v._)((0,p.Z)(r),N,{writable:!0,value:void 0}),(0,v._)((0,p.Z)(r),U,{writable:!0,value:void 0}),(0,Z._)((0,p.Z)(r),"filteredChains",void 0),(0,Z._)((0,p.Z)(r),"onAccountsChanged",(function(t){0===t.length?r.emit("disconnect"):r.emit("change",{account:w.getAddress(t[0])})})),(0,Z._)((0,p.Z)(r),"onChainChanged",function(){var t=(0,c.Z)((0,s.Z)().mark((function t(e){var n,i;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=Number(e),i=r.isChainUnsupported(n),t.next=4,(0,v.b)((0,p.Z)(r),U).setItem(E,String(e));case 4:r.emit("change",{chain:{id:n,unsupported:i}});case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),(0,Z._)((0,p.Z)(r),"onDisconnect",(0,c.Z)((0,s.Z)().mark((function t(){return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,f.a)((0,p.Z)(r),L,F).call((0,p.Z)(r),[]);case 2:return t.next=4,(0,v.b)((0,p.Z)(r),U).removeItem(E);case 4:r.emit("disconnect");case 5:case"end":return t.stop()}}),t)})))),(0,Z._)((0,p.Z)(r),"onDisplayUri",(function(t){r.emit("message",{type:"display_uri",data:t})})),(0,Z._)((0,p.Z)(r),"onConnect",(function(){r.emit("connect",{provider:(0,v.b)((0,p.Z)(r),S)})})),(0,v.a)((0,p.Z)(r),U,t.options.storage),(0,f.a)((0,p.Z)(r),W,T).call((0,p.Z)(r)),r.filteredChains=r.chains.length>50?r.chains.filter((function(t){return C.has(t.chainId)})):r.chains,r}return(0,h.Z)(n,[{key:"connect",value:function(){var t=(0,c.Z)((0,s.Z)().mark((function t(){var e,n,r,i,a,c,o,u,h,p,d,l,Z,b,g=arguments;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=(e=g.length>0&&void 0!==g[0]?g[0]:{}).chainId,r=e.pairingTopic,t.prev=1,i=n){t.next=9;break}return t.next=6,(0,v.b)(this,U).getItem(E);case 6:a=t.sent,c=a?parseInt(a):void 0,i=c&&!this.isChainUnsupported(c)?c:null===(o=this.filteredChains[0])||void 0===o?void 0:o.chainId;case 9:if(i){t.next=11;break}throw new Error("No chains found on connector.");case 11:return t.next=13,this.getProvider();case 13:return u=t.sent,this.setupListeners(),t.next=17,(0,f.a)(this,M,V).call(this);case 17:if(h=t.sent,!u.session||!h){t.next=21;break}return t.next=21,u.disconnect();case 21:if(u.session&&!h){t.next=28;break}return p=this.filteredChains.filter((function(t){return t.chainId!==i})).map((function(t){return t.chainId})),this.emit("message",{type:"connecting"}),t.next=26,u.connect({pairingTopic:r,chains:[i],optionalChains:p.length>0?p:[i]});case 26:return t.next=28,(0,f.a)(this,L,F).call(this,this.filteredChains.map((function(t){return t.chainId})));case 28:return t.next=30,u.enable();case 30:if(0!==(d=t.sent).length){t.next=33;break}throw new Error("No accounts found on provider.");case 33:return l=w.getAddress(d[0]),t.next=36,this.getChainId();case 36:return Z=t.sent,b=this.isChainUnsupported(Z),t.abrupt("return",{account:l,chain:{id:Z,unsupported:b},provider:new m.Q(u)});case 41:if(t.prev=41,t.t0=t.catch(1),!/user rejected/i.test(null===t.t0||void 0===t.t0?void 0:t.t0.message)){t.next=45;break}throw new k.U(t.t0);case 45:throw t.t0;case 46:case"end":return t.stop()}}),t,this,[[1,41]])})));return function(){return t.apply(this,arguments)}}()},{key:"disconnect",value:function(){var t=(0,c.Z)((0,s.Z)().mark((function t(){var e,n,r,i=this;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(e=function(){if("undefined"!==typeof localStorage)for(var t in localStorage)t.startsWith("wc@2")&&localStorage.removeItem(t)})(),t.next=4,this.getProvider();case 4:n=t.sent,r=function(){var t=(0,c.Z)((0,s.Z)().mark((function t(){return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,n.disconnect();case 3:t.next=9;break;case 5:if(t.prev=5,t.t0=t.catch(0),/No matching key/i.test(t.t0.message)){t.next=9;break}throw t.t0;case 9:return t.prev=9,(0,f.a)(i,P,B).call(i),t.next=13,(0,f.a)(i,L,F).call(i,[]);case 13:return e(),t.finish(9);case 15:case"end":return t.stop()}}),t,null,[[0,5,9,15]])})));return function(){return t.apply(this,arguments)}}(),r();case 7:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"getAccount",value:function(){var t=(0,c.Z)((0,s.Z)().mark((function t(){var e,n;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.getProvider();case 2:if(e=t.sent,0!==(n=e.accounts).length){t.next=6;break}throw new Error("No accounts found on provider.");case 6:return t.abrupt("return",w.getAddress(n[0]));case 7:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"getChainId",value:function(){var t=(0,c.Z)((0,s.Z)().mark((function t(){var e,n;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.getProvider();case 2:return e=t.sent,n=e.chainId,t.abrupt("return",n);case 5:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"getProvider",value:function(){var t=(0,c.Z)((0,s.Z)().mark((function t(){var e,n=arguments;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=(n.length>0&&void 0!==n[0]?n[0]:{}).chainId,(0,v.b)(this,S)){t.next=4;break}return t.next=4,(0,f.a)(this,W,T).call(this);case 4:if(!e){t.next=7;break}return t.next=7,this.switchChain(e);case 7:if((0,v.b)(this,S)){t.next=9;break}throw new Error("No provider found.");case 9:return t.abrupt("return",(0,v.b)(this,S));case 10:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"getSigner",value:function(){var t=(0,c.Z)((0,s.Z)().mark((function t(){var e,n,r,i,c,o=arguments;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=(o.length>0&&void 0!==o[0]?o[0]:{}).chainId,t.next=3,Promise.all([this.getProvider({chainId:e}),this.getAccount()]);case 3:return n=t.sent,r=(0,a.Z)(n,2),i=r[0],c=r[1],t.abrupt("return",new m.Q(i,e).getSigner(c));case 8:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"isAuthorized",value:function(){var t=(0,c.Z)((0,s.Z)().mark((function t(){var e,n,r,i,c;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Promise.all([this.getAccount(),this.getProvider()]);case 3:return e=t.sent,n=(0,a.Z)(e,2),r=n[0],i=n[1],t.next=9,(0,f.a)(this,M,V).call(this);case 9:if(c=t.sent,r){t.next=12;break}return t.abrupt("return",!1);case 12:if(!c||!i.session){t.next=21;break}return t.prev=13,t.next=16,i.disconnect();case 16:t.next=20;break;case 18:t.prev=18,t.t0=t.catch(13);case 20:return t.abrupt("return",!1);case 21:return t.abrupt("return",!0);case 24:return t.prev=24,t.t1=t.catch(0),t.abrupt("return",!1);case 27:case"end":return t.stop()}}),t,this,[[0,24],[13,18]])})));return function(){return t.apply(this,arguments)}}()},{key:"switchChain",value:function(){var t=(0,c.Z)((0,s.Z)().mark((function t(e){var n,r,a,c,u,h,p,d;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=this.chains.find((function(t){return t.chainId===e}))){t.next=3;break}throw new k.S("Chain with ID: ".concat(e,", not found on connector."));case 3:return t.prev=3,t.next=6,this.getProvider();case 6:if(r=t.sent,a=(0,f.a)(this,D,X).call(this),c=(0,f.a)(this,q,Y).call(this),a.includes(e)||!c.includes(I)){t.next=20;break}return h=null!==(u=n.explorers)&&void 0!==u&&u.length?{blockExplorerUrls:[n.explorers[0].url]}:{},t.next=14,r.request({method:I,params:[(0,o.Z)({chainId:b.hexValue(n.chainId),chainName:n.name,nativeCurrency:n.nativeCurrency,rpcUrls:(0,i.Z)(n.rpc)},h)]});case 14:return t.next=16,(0,f.a)(this,O,G).call(this);case 16:return(p=t.sent).push(e),t.next=20,(0,f.a)(this,L,F).call(this,p);case 20:return t.next=22,r.request({method:"wallet_switchEthereumChain",params:[{chainId:b.hexValue(e)}]});case 22:return t.abrupt("return",n);case 25:if(t.prev=25,t.t0=t.catch(3),d="string"===typeof t.t0?t.t0:null===t.t0||void 0===t.t0?void 0:t.t0.message,!/user rejected request/i.test(d)){t.next=30;break}throw new k.U(t.t0);case 30:throw new k.S(t.t0);case 31:case"end":return t.stop()}}),t,this,[[3,25]])})));return function(e){return t.apply(this,arguments)}}()},{key:"setupListeners",value:function(){var t=(0,c.Z)((0,s.Z)().mark((function t(){return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if((0,v.b)(this,S)){t.next=2;break}return t.abrupt("return");case 2:(0,f.a)(this,P,B).call(this),(0,v.b)(this,S).on("accountsChanged",this.onAccountsChanged),(0,v.b)(this,S).on("chainChanged",this.onChainChanged),(0,v.b)(this,S).on("disconnect",this.onDisconnect),(0,v.b)(this,S).on("session_delete",this.onDisconnect),(0,v.b)(this,S).on("display_uri",this.onDisplayUri),(0,v.b)(this,S).on("connect",this.onConnect);case 9:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()}]),n}(x.W);function T(){return R.apply(this,arguments)}function R(){return(R=(0,c.Z)((0,s.Z)().mark((function t(){return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(0,v.b)(this,N)||(0,v.a)(this,N,(0,f.a)(this,A,J).call(this)),t.abrupt("return",(0,v.b)(this,N));case 2:case"end":return t.stop()}}),t,this)})))).apply(this,arguments)}function J(){return Q.apply(this,arguments)}function Q(){return(Q=(0,c.Z)((0,s.Z)().mark((function t(){var e,i,a,c,o,u,h,p;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.e(5894).then(n.bind(n,75894));case 2:if(e=t.sent,i=e.default,a=e.OPTIONAL_EVENTS,c=e.OPTIONAL_METHODS,o=this.filteredChains.map((function(t){return t.chainId})),u=(0,r.Z)(o),h=u[0],p=u.slice(1),!h){t.next=15;break}return t.t0=v.a,t.t1=this,t.t2=S,t.next=13,i.init({showQrModal:!1!==this.options.qrcode,projectId:this.options.projectId,optionalMethods:c,optionalEvents:a,chains:[h],optionalChains:p,metadata:{name:this.options.dappMetadata.name,description:this.options.dappMetadata.description||"",url:this.options.dappMetadata.url,icons:[this.options.dappMetadata.logoUrl||""]},rpcMap:Object.fromEntries(this.filteredChains.map((function(t){return[t.chainId,t.rpc[0]]}))),qrModalOptions:this.options.qrModalOptions});case 13:t.t3=t.sent,(0,t.t0)(t.t1,t.t2,t.t3);case 15:case"end":return t.stop()}}),t,this)})))).apply(this,arguments)}function V(){return z.apply(this,arguments)}function z(){return(z=(0,c.Z)((0,s.Z)().mark((function t(){var e,n,r;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(0,f.a)(this,q,Y).call(this).includes(I)){t.next=3;break}return t.abrupt("return",!1);case 3:if(this.options.isNewChainsStale){t.next=5;break}return t.abrupt("return",!1);case 5:return t.next=7,(0,f.a)(this,O,G).call(this);case 7:if(e=t.sent,n=this.filteredChains.map((function(t){return t.chainId})),!(r=(0,f.a)(this,D,X).call(this)).length||r.some((function(t){return n.includes(t)}))){t.next=12;break}return t.abrupt("return",!1);case 12:return t.abrupt("return",!n.every((function(t){return e.includes(t)})));case 13:case"end":return t.stop()}}),t,this)})))).apply(this,arguments)}function B(){(0,v.b)(this,S)&&((0,v.b)(this,S).removeListener("accountsChanged",this.onAccountsChanged),(0,v.b)(this,S).removeListener("chainChanged",this.onChainChanged),(0,v.b)(this,S).removeListener("disconnect",this.onDisconnect),(0,v.b)(this,S).removeListener("session_delete",this.onDisconnect),(0,v.b)(this,S).removeListener("display_uri",this.onDisplayUri),(0,v.b)(this,S).removeListener("connect",this.onConnect))}function F(t){return H.apply(this,arguments)}function H(){return(H=(0,c.Z)((0,s.Z)().mark((function t(e){return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,v.b)(this,U).setItem(_,JSON.stringify(e));case 2:case"end":return t.stop()}}),t,this)})))).apply(this,arguments)}function G(){return K.apply(this,arguments)}function K(){return(K=(0,c.Z)((0,s.Z)().mark((function t(){var e;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,v.b)(this,U).getItem(_);case 2:return e=t.sent,t.abrupt("return",e?JSON.parse(e):[]);case 4:case"end":return t.stop()}}),t,this)})))).apply(this,arguments)}function X(){var t;if(!(0,v.b)(this,S))return[];var e=null===(t=(0,v.b)(this,S).session)||void 0===t||null===(t=t.namespaces[y])||void 0===t||null===(t=t.chains)||void 0===t?void 0:t.map((function(t){return parseInt(t.split(":")[1]||"")}));return null!==e&&void 0!==e?e:[]}function Y(){var t;if(!(0,v.b)(this,S))return[];var e=null===(t=(0,v.b)(this,S).session)||void 0===t||null===(t=t.namespaces[y])||void 0===t?void 0:t.methods;return null!==e&&void 0!==e?e:[]}}}]);
//# sourceMappingURL=6186.80f58dee.chunk.js.map