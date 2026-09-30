/* Local product presentation. No server requests, messages or reservations. */
(() => {
 'use strict';
 const $=s=>document.querySelector(s),menu=$('#mobile-menu'),toggle=$('.menu-toggle');
 const closeMenu=()=>{menu.hidden=true;toggle.setAttribute('aria-expanded','false')};
 toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open))});
 menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
 document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu()});
 window.matchMedia('(min-width:901px)').addEventListener('change',closeMenu);
 let photo=1;const dialog=$('#photo-dialog'),thumbs=[...document.querySelectorAll('[data-photo]')];
 function showPhoto(n){photo=(n+1)%2+1;const src=`assets/abundant-chair/abundant-${photo}.webp`,alt=photo===1?'Abundant bouclé armchair with beech wood legs, three-quarter view':'Abundant bouclé armchair, front view';
  $('#main-photo').src=src;$('#main-photo').alt=alt;$('#enlarged-photo').src=src;$('#enlarged-photo').alt=alt;
  thumbs.forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.photo)===photo)));
  $('#photo-counter').textContent=`0${photo} / 02`;$('#enlarged-count').textContent=`${photo} / 2`;
 }
 thumbs.forEach(b=>b.addEventListener('click',()=>showPhoto(Number(b.dataset.photo))));
 $('#open-photo').addEventListener('click',()=>{dialog.showModal();document.body.style.overflow='hidden'});
 $('#close-photo').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>{document.body.style.overflow='';$('#open-photo').focus({preventScroll:true})});
 $('#next-photo').addEventListener('click',()=>showPhoto(photo+1));$('#previous-photo').addEventListener('click',()=>showPhoto(photo-1));
 document.addEventListener('keydown',e=>{if(dialog.open&&e.key==='ArrowRight')showPhoto(photo+1);if(dialog.open&&e.key==='ArrowLeft')showPhoto(photo-1);if(e.key==='Escape'&&!menu.hidden){closeMenu();toggle.focus()}});
 const quantity=$('#piece-quantity');
 function normalized(){return Math.min(999,Math.max(1,Math.trunc(Number(quantity.value)||1)))}
 function quantityState(){quantity.value=normalized();$('#quantity-less').disabled=Number(quantity.value)<=1;$('#quantity-more').disabled=Number(quantity.value)>=999}
 $('#quantity-less').addEventListener('click',()=>{quantity.value=normalized()-1;quantityState()});
 $('#quantity-more').addEventListener('click',()=>{quantity.value=normalized()+1;quantityState()});
 quantity.addEventListener('change',quantityState);
 $('#add-piece-form').addEventListener('submit',e=>{e.preventDefault();quantityState();try{window.LavishQuote.add({id:'abundant-chair',name:'Abundant Chair',image:'assets/abundant-chair/abundant-1.webp',quantity:normalized()});location.href='quote.html'}catch(error){$('#piece-status').textContent=error.message;$('#piece-confirmation').hidden=false}});
 quantityState();
})();
