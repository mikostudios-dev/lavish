/* Quiet native-flow motion and user-controlled settings. No external runtime. */
(()=>{'use strict';document.querySelectorAll('[data-local-submit]').forEach(b=>b.disabled=false);
const preference=matchMedia('(prefers-reduced-motion: reduce)'),images=[...document.querySelectorAll('[data-gentle],.piece-image')];let queued=false;
function draw(){queued=false;if(preference.matches)return;for(const el of images){const r=el.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)continue;el.style.setProperty('--drift',Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight+r.height))).toFixed(4))}}
function schedule(){if(!queued&&!document.hidden){queued=true;requestAnimationFrame(draw)}}
function configure(){document.documentElement.classList.toggle('gentle-motion',!preference.matches);schedule()}
preference.addEventListener('change',configure);addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});document.addEventListener('visibilitychange',schedule);configure();
const hero=document.querySelector('#showroom-image');
if(hero){
 const settings={lounge:['hero-lounge','Sage sofa and ivory lounge chairs around black occasional tables'],seating:['seating','Lavish dining chairs and curved upholstered seating'],dining:['tables','White dining tables with natural wood chairs'],bars:['bars','Lavish bars and back bar furniture'],misc:['accents','Lavish decorative accents and event accessories'],outdoor:['outdoor','Outdoor lounge furniture with ivory cushions'],tableware:['tableware','Lavish tableware and place settings'],groups:['lounge-group','A coordinated Lavish lounge furniture grouping']};
 const destinations=[...document.querySelectorAll('[data-collection-link]')],links=[...document.querySelectorAll('.category-nav a')],keys=['seating','dining','bars','misc','outdoor','tableware','groups'],cache=new Map();
 const overlay=hero.cloneNode();overlay.removeAttribute('id');overlay.removeAttribute('fetchpriority');overlay.alt='';overlay.setAttribute('aria-hidden','true');overlay.className='showroom-transition';hero.after(overlay);
 let sequence=0,state={key:'seating',src:hero.src,alt:hero.alt},fade;
 function commit(next){state=next;hero.src=state.src;hero.alt=state.alt;const active=links[keys.indexOf(state.key)];destinations.forEach(link=>{link.href=active.href;link.setAttribute('aria-label','Explore '+active.textContent.trim()+' collection')});links.forEach((link,i)=>link.classList.toggle('is-previewing',keys[i]===state.key))}
 commit(state);
 function load(key){if(!cache.has(key)){cache.set(key,new Promise(resolve=>{const image=new Image();image.onload=async()=>{try{await image.decode()}catch{}resolve(image)};image.onerror=()=>{cache.delete(key);resolve(null)};image.src='../../assets/'+settings[key][0]+'.webp'}))}return cache.get(key)}
 async function preview(key){const request=++sequence;const image=await load(key);if(request!==sequence||!image)return;
  if(state.src===image.src)return;
  fade?.cancel();overlay.src=hero.src;commit({key,src:image.src,alt:settings[key][1]});
  if(!preference.matches)fade=overlay.animate([{opacity:1},{opacity:0}],{duration:260,easing:'ease-out'});
 }
 links.forEach((link,i)=>{link.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'||event.pointerType==='pen')preview(keys[i])});link.addEventListener('focus',()=>{if(link.matches(':focus-visible'))preview(keys[i])})});
 preference.addEventListener('change',()=>{if(preference.matches)fade?.cancel()});
 // Keep the current image visible until the next is decoded. Warm desktop previews after the initial page load.
 function warm(){if(matchMedia('(hover: hover) and (pointer: fine)').matches)Object.keys(settings).forEach(load)}
 if(document.readyState==='complete')warm();else addEventListener('load',warm,{once:true});
}
if(location.pathname.endsWith('seating.html')||location.pathname.endsWith('product-abundant-chair.html'))document.querySelector('.category-nav a')?.setAttribute('aria-current','page');})();
