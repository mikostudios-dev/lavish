/* Concept 04 additions. All forms stay local; no network requests. */
(() => {
  'use strict';
  const page=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.desktop-nav a,.mobile-menu a').forEach(a=>{if(a.getAttribute('href')===page)a.setAttribute('aria-current','page')});
  const interest=new URLSearchParams(location.search).get('interest');
  const needs=document.querySelector('#needs');
  const allowed=['Tables','Bars & DJ booths','Outdoor','Tableware','Décor & accents','Groups'];
  if(needs&&allowed.includes(interest))needs.value='Interested in: '+interest+'.';
  const dialog=document.querySelector('#category-preview');
  if(!dialog)return;
  const copy={Tables:'Dining tables, cocktail tables and accent tables. Find the right gathering point for your space.','Bars & DJ booths':'Bars, back bars and DJ booths for the center of the celebration.',Outdoor:'Seating, tables and umbrellas for gatherings under the open sky.',Tableware:'Glassware, plates, cutlery and accessories. The details that bring a table together.','Décor & accents':'Displays, lighting, props and event accessories for the finishing touch.'};
  let opener;
  document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>{
    opener=button;const name=button.dataset.category,img=button.querySelector('img');
    document.querySelector('#category-title').textContent=name;
    document.querySelector('#category-description').textContent=copy[name];
    document.querySelector('#category-photo').src=img.src;
    document.querySelector('#category-photo').alt=img.alt;
    document.querySelector('#category-contact').href='contact.html?interest='+encodeURIComponent(name)+'#inquiry';
    dialog.showModal();document.body.style.overflow='hidden';
  }));
  document.querySelector('#category-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{document.body.style.overflow='';opener?.focus({preventScroll:true})});
})();
