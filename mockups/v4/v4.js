/* Independently authored; no scroll-craft runtime, libraries or remote requests. */
(() => {
 'use strict';
 document.querySelectorAll('[data-local-submit]').forEach(button => { button.disabled=false; });
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 const scenes=[...document.querySelectorAll('[data-motion]')];
 let queued=false;
 const clamp=n=>Math.max(0,Math.min(1,n));
 function draw(){
  queued=false;
  if(preference.matches)return;
  const vh=innerHeight;
  for(const el of scenes){
   const r=el.getBoundingClientRect();
   if(r.bottom<0||r.top>vh)continue;
   const p=el.dataset.motion==='assembly'?clamp((88-r.top)/Math.max(r.height-vh,1)):el.dataset.motion==='opening'?clamp(-r.top/Math.max(r.height,1)):clamp((vh-r.top)/(vh+r.height));
   el.style.setProperty('--p',p.toFixed(4));
  }
 }
 function schedule(){if(!queued&&!document.hidden){queued=true;requestAnimationFrame(draw)}}
 function configure(){document.documentElement.classList.toggle('motion-ready',!preference.matches);scenes.forEach(el=>el.style.removeProperty('--p'));schedule()}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});document.addEventListener('visibilitychange',schedule);preference.addEventListener('change',configure);configure();
})();
