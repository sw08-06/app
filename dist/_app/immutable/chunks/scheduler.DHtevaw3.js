function O(){}function S(t,n){for(const e in n)t[e]=n[e];return t}function P(t){return t()}function Q(){return Object.create(null)}function C(t){t.forEach(P)}function R(t){return typeof t=="function"}function V(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function X(t){return Object.keys(t).length===0}function D(t,...n){if(t==null){for(const i of n)i(void 0);return O}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function Y(t,n,e){t.$$.on_destroy.push(D(n,e))}function Z(t,n,e,i){if(t){const c=E(t,n,e,i);return t[0](c)}}function E(t,n,e,i){return t[1]&&i?S(e.ctx.slice(),t[1](i(n))):e.ctx}function $(t,n,e,i){if(t[2]&&i){const c=t[2](i(e));if(n.dirty===void 0)return c;if(typeof c=="object"){const o=[],l=Math.max(n.dirty.length,c.length);for(let s=0;s<l;s+=1)o[s]=n.dirty[s]|c[s];return o}return n.dirty|c}return n.dirty}function tt(t,n,e,i,c,o){if(c){const l=E(n,e,i,o);t.p(l,c)}}function nt(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}function et(t){const n={};for(const e in t)e[0]!=="$"&&(n[e]=t[e]);return n}function it(t,n){const e={};n=new Set(n);for(const i in t)!n.has(i)&&i[0]!=="$"&&(e[i]=t[i]);return e}let m=!1;function ct(){m=!0}function lt(){m=!1}function T(t,n,e,i){for(;t<n;){const c=t+(n-t>>1);e(c)<=i?t=c+1:n=c}return t}function B(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const r=[];for(let u=0;u<n.length;u++){const a=n[u];a.claim_order!==void 0&&r.push(a)}n=r}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let c=0;for(let r=0;r<n.length;r++){const u=n[r].claim_order,a=(c>0&&n[e[c]].claim_order<=u?c+1:T(1,c,j=>n[e[j]].claim_order,u))-1;i[r]=e[a]+1;const k=a+1;e[k]=r,c=Math.max(k,c)}const o=[],l=[];let s=n.length-1;for(let r=e[c]+1;r!=0;r=i[r-1]){for(o.push(n[r-1]);s>=r;s--)l.push(n[s]);s--}for(;s>=0;s--)l.push(n[s]);o.reverse(),l.sort((r,u)=>r.claim_order-u.claim_order);for(let r=0,u=0;r<l.length;r++){for(;u<o.length&&l[r].claim_order>=o[u].claim_order;)u++;const a=u<o.length?o[u]:null;t.insertBefore(l[r],a)}}function M(t,n){if(m){for(B(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function rt(t,n,e){m&&!e?M(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function st(t){t.parentNode&&t.parentNode.removeChild(t)}function q(t){return document.createElement(t)}function v(t){return document.createTextNode(t)}function ot(){return v(" ")}function ut(){return v("")}function H(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}const I=["width","height"];function at(t,n){const e=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in n)n[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=n[i]:i==="__value"?t.value=t[i]=n[i]:e[i]&&e[i].set&&I.indexOf(i)===-1?t[i]=n[i]:H(t,i,n[i])}function ft(t){return t.dataset.svelteH}function _t(t){return Array.from(t.childNodes)}function z(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function N(t,n,e,i,c=!1){z(t);const o=(()=>{for(let l=t.claim_info.last_index;l<t.length;l++){const s=t[l];if(n(s)){const r=e(s);return r===void 0?t.splice(l,1):t[l]=r,c||(t.claim_info.last_index=l),s}}for(let l=t.claim_info.last_index-1;l>=0;l--){const s=t[l];if(n(s)){const r=e(s);return r===void 0?t.splice(l,1):t[l]=r,c?r===void 0&&t.claim_info.last_index--:t.claim_info.last_index=l,s}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function F(t,n,e,i){return N(t,c=>c.nodeName===n,c=>{const o=[];for(let l=0;l<c.attributes.length;l++){const s=c.attributes[l];e[s.name]||o.push(s.name)}o.forEach(l=>c.removeAttribute(l))},()=>i(n))}function dt(t,n,e){return F(t,n,e,q)}function U(t,n){return N(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>v(n),!0)}function ht(t){return U(t," ")}function mt(t,n){n=""+n,t.data!==n&&(t.data=n)}function pt(t,n,e,i){e==null?t.style.removeProperty(n):t.style.setProperty(n,e,"")}function W(t,n,{bubbles:e=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:n,bubbles:e,cancelable:i})}function bt(t,n){return new t(n)}let h;function b(t){h=t}function p(){if(!h)throw new Error("Function called outside component initialization");return h}function yt(t){p().$$.on_mount.push(t)}function xt(t){p().$$.after_update.push(t)}function gt(t){p().$$.on_destroy.push(t)}function vt(){const t=p();return(n,e,{cancelable:i=!1}={})=>{const c=t.$$.callbacks[n];if(c){const o=W(n,e,{cancelable:i});return c.slice().forEach(l=>{l.call(t,o)}),!o.defaultPrevented}return!0}}function kt(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach(i=>i.call(this,n))}const d=[],w=[];let _=[];const x=[],A=Promise.resolve();let g=!1;function G(){g||(g=!0,A.then(K))}function wt(){return G(),A}function J(t){_.push(t)}function Et(t){x.push(t)}const y=new Set;let f=0;function K(){if(f!==0)return;const t=h;do{try{for(;f<d.length;){const n=d[f];f++,b(n),L(n.$$)}}catch(n){throw d.length=0,f=0,n}for(b(null),d.length=0,f=0;w.length;)w.pop()();for(let n=0;n<_.length;n+=1){const e=_[n];y.has(e)||(y.add(e),e())}_.length=0}while(d.length);for(;x.length;)x.pop()();g=!1,y.clear(),b(t)}function L(t){if(t.fragment!==null){t.update(),C(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(J)}}function Nt(t){const n=[],e=[];_.forEach(i=>t.indexOf(i)===-1?n.push(i):e.push(i)),e.forEach(i=>i()),_=n}export{C as A,Q as B,K as C,R as D,X as E,J as F,Nt as G,h as H,b as I,P as J,d as K,G as L,ct as M,lt as N,S as O,at as P,it as Q,vt as R,gt as S,et as T,Et as U,kt as V,ft as W,ot as a,_t as b,dt as c,U as d,q as e,st as f,ht as g,M as h,rt as i,mt as j,Y as k,Z as l,nt as m,O as n,$ as o,ut as p,xt as q,yt as r,V as s,v as t,tt as u,H as v,pt as w,w as x,bt as y,wt as z};
