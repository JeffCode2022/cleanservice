import{t as e}from"./gsap.CvDoa17S.js";import{t}from"./ScrollTrigger.CDDhF-DF.js";e.registerPlugin(t),document.addEventListener(`DOMContentLoaded`,()=>{let t=e.timeline({scrollTrigger:{trigger:`#calculator-section`,start:`top 70%`,end:`bottom 80%`,toggleActions:`play none none reverse`}});t.fromTo(`.clip-reveal`,{y:50,opacity:0,clipPath:`polygon(0 0, 100% 0, 100% 0, 0 0)`},{y:0,opacity:1,clipPath:`polygon(0 0, 100% 0, 100% 100%, 0% 100%)`,duration:.8,stagger:.2,ease:`power3.out`}),t.fromTo(`.calc-item`,{y:40,opacity:0},{y:0,opacity:1,duration:.6,stagger:.1,ease:`back.out(1.2)`},`-=0.4`),t.fromTo(`.calc-addons`,{y:30,opacity:0},{y:0,opacity:1,duration:.6,ease:`power2.out`},`-=0.2`),t.fromTo(`.calc-summary-container`,{x:30,opacity:0},{x:0,opacity:1,duration:.8,ease:`power3.out`},`-=0.6`);let n={items:{},addons:[]},r=document.getElementById(`empty-state`),i=document.getElementById(`summary-items-list`),a=document.getElementById(`total-price`),o=document.getElementById(`total-count`),s=document.getElementById(`total-time`),c=document.getElementById(`whatsapp-cta`);document.querySelectorAll(`.calc-item`).forEach(e=>{let t=e.dataset.id,r=e.dataset.name,i=parseFloat(e.dataset.price),a=parseInt(e.dataset.time),o=e.querySelector(`.minus`),s=e.querySelector(`.plus`),c=e.querySelector(`.qty-val`);n.items[t]={qty:0,name:r,price:i,time:a},o.addEventListener(`click`,()=>{n.items[t].qty>0&&(n.items[t].qty--,c.textContent=n.items[t].qty,l())}),s.addEventListener(`click`,()=>{n.items[t].qty++,c.textContent=n.items[t].qty,l()})}),document.querySelectorAll(`.addon-checkbox`).forEach(e=>{e.addEventListener(`change`,e=>{let t=e.target.dataset.name,r=parseFloat(e.target.dataset.price);e.target.checked?n.addons.push({name:t,price:r}):n.addons=n.addons.filter(e=>e.name!==t),l()})});function l(){let e=0,t=0,l=0,f=``;for(let r in n.items){let i=n.items[r];if(i.qty>0){let n=i.qty*i.price;e+=n,t+=i.qty,l+=i.qty*i.time,f+=`
            <div class="flex justify-between items-start text-sm">
              <div class="flex flex-col">
                <span class="font-display text-slate-800">${i.name} <span class="text-slate-400 font-body text-xs">x${i.qty}</span></span>
              </div>
              <span class="font-body-alt font-medium text-slate-900">S/ ${n.toFixed(2)}</span>
            </div>
          `}}if(t>0&&n.addons.length>0&&(f+=`<div class="w-full h-px bg-slate-100 my-2"></div>`,n.addons.forEach(t=>{e+=t.price,f+=`
            <div class="flex justify-between items-start text-sm">
              <div class="flex flex-col">
                <span class="font-display text-emerald-600 text-xs uppercase tracking-wide">Extra</span>
                <span class="font-body text-slate-700">${t.name}</span>
              </div>
              <span class="font-body-alt font-medium text-slate-900">S/ ${t.price.toFixed(2)}</span>
            </div>
          `})),t>0){r.style.display=`none`,i.innerHTML=f,c.classList.remove(`pointer-events-none`,`opacity-50`),u(a,parseFloat(a.textContent),e,500),o.textContent=t;let n=Math.floor(l/60),p=l%60;s.textContent=n>0?`${n}h ${p}m`:`${p} min`,d(e,t)}else r.style.display=`block`,i.innerHTML=``,i.appendChild(r),c.classList.add(`pointer-events-none`,`opacity-50`),a.textContent=`0`,o.textContent=`0`,s.textContent=`0 min`,c.href=`#`}function u(t,n,r,i){n!==r&&e.timeline().to(t,{scale:1.1,color:`#0284C7`,duration:.1,onStart:()=>{let e=null,a=o=>{e||=o;let s=Math.min((o-e)/i,1);t.innerHTML=(s*(r-n)+n).toFixed(2),s<1?window.requestAnimationFrame(a):t.innerHTML=r.toFixed(2)};window.requestAnimationFrame(a)}}).to(t,{scale:1,duration:.3,ease:`back.out(2)`})}function d(e,t){let r=`¡Hola CleanMaster! 👋
Me gustaría agendar un servicio. Aquí está mi cotización:

*SERVICIOS:*
`;for(let e in n.items){let t=n.items[e];t.qty>0&&(r+=`- ${t.qty}x ${t.name} (S/ ${t.qty*t.price})\n`)}n.addons.length>0&&(r+=`
*ADICIONALES:*
`,n.addons.forEach(e=>{r+=`- ${e.name} (+S/ ${e.price})\n`})),r+=`\n*TOTAL ESTIMADO: S/ ${e.toFixed(2)}*\n\n¿Qué disponibilidad tienen?`,c.href=`https://wa.me/51999999999?text=${encodeURIComponent(r)}`}});