/* Local presentation only. Catalog filtering never contacts WordPress. */
(() => {
 'use strict';
 const $=s=>document.querySelector(s);
 const menu=$('#mobile-menu'),toggle=$('.menu-toggle');
 function closeMenu(){menu.hidden=true;toggle.setAttribute('aria-expanded','false')}
 toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open))});
 menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
 document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu()});
 window.matchMedia('(min-width:901px)').addEventListener('change',closeMenu);
 const cards=[...document.querySelectorAll('.product-card')],filters=[...document.querySelectorAll('[data-filter]')],search=$('#product-search'),dialog=$('#product-dialog');
 let category='all',limit=24,previousFocus,activeQuotePiece;
 const params=new URLSearchParams(location.search);const requested=params.get('category');
 if(filters.some(b=>b.dataset.filter===requested))category=requested;
 function update(){
  const query=search.value.trim().toLowerCase();
  const matched=cards.filter(card=>(category==='all'||card.dataset.categories.split(' ').includes(category))&&card.dataset.name.toLowerCase().includes(query));
  const shown=new Set(matched.slice(0,limit));cards.forEach(card=>card.hidden=!shown.has(card));
  filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===category)));
  $('#results-count').textContent=`${matched.length} ${matched.length===1?'piece':'pieces'}${category==='all'?' in Seating':' · '+filters.find(b=>b.dataset.filter===category).textContent}`;
  $('#shown-count').textContent=`Showing ${shown.size} of ${matched.length} pieces`;
  $('#load-more').hidden=shown.size>=matched.length;$('#catalog-empty').hidden=matched.length!==0;
  $('#reset-filters').hidden=category==='all'&&!query;
 }
 filters.forEach(b=>b.addEventListener('click',()=>{category=b.dataset.filter;limit=24;update();const url=new URL(location.href);category==='all'?url.searchParams.delete('category'):url.searchParams.set('category',category);history.replaceState(null,'',url)}));
 search.addEventListener('input',()=>{limit=24;update()});
 function reset(){category='all';search.value='';limit=24;update();history.replaceState(null,'',location.pathname);search.focus()}
 $('#reset-filters').addEventListener('click',reset);$('#empty-reset').addEventListener('click',reset);
 $('#load-more').addEventListener('click',()=>{limit+=24;update()});
 cards.forEach(card=>card.querySelector('button')?.addEventListener('click',()=>{
  previousFocus=document.activeElement;const name=card.dataset.name;
  $('#product-title').textContent=name;$('#product-type').textContent=card.querySelector('.product-category').textContent;
  $('#product-image').src=card.querySelector('img').src;$('#product-image').alt=name;
  $('#original-product').href=card.dataset.url;
  activeQuotePiece={id:card.dataset.url.split('/').filter(Boolean).pop(),name,image:card.querySelector('img').getAttribute('src'),quantity:1};
  dialog.showModal();document.body.style.overflow='hidden';
 }));
 $('#product-inquiry').addEventListener('click',e=>{e.preventDefault();try{window.LavishQuote.add(activeQuotePiece);location.href='quote.html'}catch(error){$('#product-title').textContent=error.message}});
 $('#close-product').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>{document.body.style.overflow='';previousFocus?.focus({preventScroll:true})});
 dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dialog.close()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){closeMenu();toggle.focus()}});
 update();
})();
