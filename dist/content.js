(function(){"use strict";const f=()=>{const e="unique-link-ID";document.querySelectorAll(`a[class*="${e}-"]`).forEach(t=>{t.classList.forEach(i=>{i.startsWith(e)&&t.classList.remove(i)})});var l=0;return{data:Array.from(document.querySelectorAll("a")).filter(t=>!t.href.endsWith("/#")&&!t.href.includes("chrome-extension")&&!t.href.includes("wp-admin")&&!t.href.includes("/edit")&&!t.href.includes("nonce")&&!t.href.includes("preview=true")&&!t.href.includes("action=delete")&&!t.href.includes("admin")).map(t=>{const i=`${e}-${l++}`;return t.classList.add(i),{href:t.href,uniqueClass:i}})}},y=(e,l=5,n=300)=>{const t=i=>{const a=Array.from(document.querySelectorAll("a")).filter(o=>o.classList.contains(e));if(document.querySelectorAll(".zigzag-highlight").forEach(o=>{o.classList.remove("zigzag-highlight"),o.style.position=""}),document.querySelectorAll(".zigzag-popup").forEach(o=>o.remove()),document.querySelectorAll(".zigzag-popup-with-parent").forEach(o=>o.remove()),a.length===0){i>0?setTimeout(()=>t(i-1),n):chrome.runtime.sendMessage({type:"link-status",status:"not-found",href:e});return}const r=a[0],s=r.getBoundingClientRect();if(s.width===0&&s.height===0){chrome.runtime.sendMessage({type:"link-status",status:"hidden",href:e});return}if(r.scrollIntoView({behavior:"smooth",block:"center"}),r.classList.add("zigzag-highlight"),getComputedStyle(r).position==="static"&&(r.style.position="relative"),r.parentNode.children.length>1){const o=document.createElement("div");o.className="zigzag-popup",o.textContent="Here’s the link",r.appendChild(o);const d=o.getBoundingClientRect();d.right>window.innerWidth&&(o.style.left=`${window.innerWidth-d.width-10}px`),d.bottom>window.innerHeight&&(o.style.top=`${s.top-d.height-4}px`)}else{const o=document.createElement("div");o.className="zigzag-popup-with-parent",o.textContent="Here’s the link",r.parentElement.appendChild(o),o.left=45,r.parentElement.className+=" zigzag-highlight"}if(chrome.runtime.sendMessage({type:"link-status",status:"highlighted",href:e}),!document.getElementById("zigzag-style")){const o=document.createElement("style");o.id="zigzag-style",o.textContent=`
        .zigzag-popup {
          position: absolute;
          background: rgb(252, 198, 0);
          color: black;
          padding: 4px 8px;
         
          font-size: 12px;
          z-index: 99999;
          white-space: nowrap;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          top: 100%;
          left: -45px;
          margin-top: 4px;
        }
        .zigzag-popup-with-parent {
          position: absolute;
          background: rgb(252, 198, 0);
          color: black;
          padding: 4px 8px;
         
          font-size: 12px;
          z-index: 99999;
          white-space: nowrap;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          top: 100%;
          left: 50%;
          margin-top: 4px;
        }
        .zigzag-highlight {
          border: 3px dashed red;
          animation: pulse-border 1s infinite;
          z-index: 99999;
          background-color: rgba(255, 255, 0, 0.2);
        }
        @keyframes pulse-border {
          0% { border-color: red; }
          50% { border-color: orange; }
          100% { border-color: red; }
        }
      `,document.head.appendChild(o)}};t(l)},m=e=>{let l=0;if(e.preventDefault(),e.stopPropagation(),e.target.closest("[data-extension-panel]"))return;const n=e.target,t="unique-link-ID",i=new Set,c=n.closest("a");c&&i.add(c),n.querySelectorAll("a").forEach(r=>i.add(r));const a=Array.from(i).filter(r=>{try{const s=new URL(r.href);return["http:","https:","mailto:","sms:","tg:","whatsapp:"].includes(s.protocol)&&!s.href.startsWith("chrome-extension://")&&!s.href.includes("/wp-admin")&&!s.href.includes("/edit")&&!s.href.includes("nonce")&&!s.href.includes("preview=true")&&!s.href.includes("action=delete")}catch{return!1}}).map(r=>{const s=[...r.classList].find(p=>p.startsWith(t)),u=s||`${t}-${l++}`;return s||r.classList.add(u),{href:r.href,uniqueClass:u}});chrome.runtime.sendMessage({type:"LINKS_FOUND",links:a})},v=()=>{var e=document.createElement("div");e.id="custom-overlay",e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="100%",e.style.height="100%",e.style.zIndex="999999",e.style.cursor="crosshair",e.style.backgroundColor="transparent",e.style.pointerEvents="none",document.body.appendChild(e)},x=()=>{var e=document.createElement("style");e.id="custom-style",e.textContent=`
    .__hover-highlight {
      outline: 1px dashed purple ;
      background-color: rgba(0, 128, 0, 0.2) ;
     cursor: crosshair;
    }
  `,document.head.append(e)},h=e=>{var l;const n=document.elementFromPoint(e.clientX,e.clientY);!n||n===l||(l&&l.classList.remove("__hover-highlight"),n.classList.add("__hover-highlight"),l=n)},g=e=>{e.target.classList.remove("__hover-highlight")},z=()=>{document.querySelectorAll(".__hover-highlight").forEach(n=>{n.classList.remove("__hover-highlight")});var e=document.getElementById("custom-style");e&&e.remove();var l=document.getElementById("custom-overlay");l&&l.remove(),document.querySelectorAll(".zigzag-highlight").forEach(n=>{n.classList.remove("zigzag-highlight")}),document.querySelectorAll(".zigzag-popup").forEach(n=>n.remove()),document.querySelectorAll(".zigzag-popup-with-parent").forEach(n=>n.remove())};function b(){return[...document.querySelectorAll("img")].map(l=>l.src).filter(l=>l&&l.startsWith("http"))}chrome.runtime.onMessage.addListener((e,l,n)=>{if(e.type==="ping")return n({pong:!0}),!0;if(e.type==="featuredImages"){const t=document.querySelectorAll("meta");let i=null,c=null;t.forEach(r=>{const s=r.getAttribute("content"),u=r.getAttribute("property")||r.getAttribute("name")||"";s&&(!i&&u==="og:image"&&(i={property:"og:image",url:s}),!c&&u==="twitter:image"&&(c={property:"twitter:image",url:s}))});const a=[i,c].filter(Boolean);n({data:a})}if(e.type==="getPageInfo"){const t=document.querySelector('meta[name="description"]'),i=t?t.content:null,c=document.documentElement.lang||null,a=document.querySelector('link[rel="canonical"]'),r=a?a.href:null,s=document.title||null,u=!!document.querySelector('script[src*="lynx.younity.com/lynx/client"]');console.log("Lynx detected:",u),n({description:i,lang:c,canonical:r,title:s,hasLynxScript:u})}if(e.type==="getHyvorTalk"){const t=document.querySelector("hyvor-talk-comments");if(!t){n({data:[]});return}const i=[{tagName:t.tagName,attributes:Array.from(t.attributes).map(c=>({name:c.name,value:c.value}))}];n({data:i})}if(e.type==="getCategoryElements"){const i=Array.from(document.querySelectorAll("article")).filter(c=>Array.from(c.classList).some(a=>a.includes("category"))).map(c=>({tagName:c.tagName,classes:Array.from(c.classList),attributes:Array.from(c.attributes).map(a=>({name:a.name,value:a.value})),innerText:c.innerText.trim().slice(0,100)}));n({data:i})}if(e.type==="extract-links"){const{data:t}=f();n({data:t})}if(e.type==="locateLinkOnPage"){const t=e.targetHref;y(t)}if(e.type==="startInspecting"&&(document.querySelector("#custom-style")||x(),document.querySelector("#custom-overlay")||v(),document.addEventListener("mouseover",h),document.addEventListener("mouseout",g),document.addEventListener("click",m,!0)),e.type==="stopHoveringLink"&&(document.removeEventListener("mouseover",h),document.removeEventListener("mouseout",g),document.removeEventListener("click",m,!0),z(),chrome.runtime.sendMessage({type:"HOVERING_STOP"})),e.type==="extract_images"){const t=b();return n({images:t}),!0}return!0})})();
