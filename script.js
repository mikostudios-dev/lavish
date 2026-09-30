/* Dependency-free presentation interactions. No fetch, analytics or form submission. */
(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const site = 'https://www.lavisheventrentals.com';
  const collections = {
    seating: {name:'Seating', image:'seating', description:'Set the scene with lounge seating, dining chairs and pieces that bring everyone together.', links:[['All seating','/seating/'],['Side & dining chairs','/seatings/side-and-dining/'],['Armchairs','/seatings/armchairs/'],['Sofas & loveseats','/seatings/sofas-loveseats/'],['Cubes & ottomans','/seatings/cubes-ottomans/'],['Barstools','/seatings/barstools/']]},
    tables: {name:'Tables', image:'tables', description:'A place for conversation, celebration and every considered detail in between.', links:[['All tables','/tables/'],['Dining tables','/table/dining/'],['Cocktail tables','/table/cocktail/'],['Coffee tables','/table/coffee/'],['End & accent tables','/table/end-accent/'],['Highboy tables','/table/highboy/']]},
    bars: {name:'Bars & DJ booths', image:'bars', description:'Create a natural gathering point with bars, back bars and DJ booths.', links:[['All bars & DJ','/bars/'],['Bars','/bar/bars/'],['Back bars','/bar/back-bars/'],['DJ booths','/bar/dj-booths/']]},
    outdoor: {name:'Outdoor', image:'outdoor', description:'Bring the gathering outside with seating, tables and umbrellas from the outdoor collection.', links:[['All outdoor','/outdoors/'],['Outdoor seating','/outdoor/seating/'],['Outdoor tables','/outdoor/tables/'],['Umbrellas','/outdoor/umbrellas/']]},
    tableware: {name:'Tableware', image:'tableware', description:'Bring the table together with glassware, plates, cutlery and thoughtful accents.', links:[['All tableware','/tableware/'],['Glassware','/tableware/glassware/'],['Cutlery','/tableware/cutlery/'],['Plates','/tableware/plates/'],['Accessories','/tableware/accessories/']]},
    accents: {name:'Décor & accents', image:'accents', description:'The finishing touches: displays, lighting, props and event accessories.', links:[['All accessories','/misc-accessories-miami-orlando/'],['Pedestals & displays','/miscs/pedestals-displays/'],['Lamps & lanterns','/miscs/lamps-lanterns/'],['Props','/miscs/props/'],['Holiday','/miscs/holiday/'],['Other accessories','/miscs/other/']]}
  };
  const events = [
    {title:'Corporate dinner, 11 11 Lincoln Road', image:'event-corporate', alt:'Long dinner tables and transparent chairs overlooking Miami at 11 11 Lincoln Road', credit:'Event design by Advantage DMS. From the Lavish Event Rentals gallery.'},
    {title:'Lima Mederos Wedding, Mandarin Oriental', image:'event-wedding', alt:'Candlelit wedding tables with white flowers at Mandarin Oriental', credit:'Event design by Karla. Photography by Maloman Studios. From the Lavish Event Rentals gallery.'}
  ];
  let activeCollection;
  let activeGallery = 0;
  let briefText = '';
  const chosen = new Set();
  const requestedPiece = new URLSearchParams(location.search).get('piece');
  if (requestedPiece) { const quantity = Math.min(999, Math.max(1, parseInt(new URLSearchParams(location.search).get('quantity'),10) || 1)); $('#needs').value = 'Interested in: ' + requestedPiece.slice(0,200) + (quantity > 1 ? ' · Quantity: ' + quantity : '') + '.'; $('#selection-status').textContent = requestedPiece.slice(0,200) + ' added to your event brief.'; }
  const menuButton = $('.menu-toggle');
  const menu = $('#mobile-menu');
  const closeMenu = () => { menu.hidden = true; menuButton.setAttribute('aria-expanded','false'); };
  menuButton.addEventListener('click',() => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menu.hidden = !open; menuButton.setAttribute('aria-expanded',String(open)); });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !menu.hidden) { closeMenu(); menuButton.focus(); } });
  window.matchMedia('(min-width:901px)').addEventListener('change',closeMenu);
  let returnFocus = null;
  function openDialog(dialog) { returnFocus = document.activeElement; closeMenu(); dialog.showModal(); document.body.style.overflow='hidden'; }
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click',() => dialog.close()));
    dialog.addEventListener('click', event => { const r=dialog.getBoundingClientRect(); if (event.target===dialog && (event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom)) dialog.close(); });
    dialog.addEventListener('close', () => { document.body.style.overflow=''; if (returnFocus?.isConnected) returnFocus.focus({preventScroll:true}); });
  });
  document.querySelectorAll('[data-collection]').forEach(button => button.addEventListener('click',() => {
    activeCollection = collections[button.dataset.collection];
    $('#collection-dialog-title').textContent=activeCollection.name;
    $('#collection-dialog-description').textContent=activeCollection.description;
    $('#collection-dialog-image').src=`assets/${activeCollection.image}.webp`;
    $('#collection-dialog-image').alt=button.querySelector('img').alt;
    const list=$('#collection-dialog-links'); list.replaceChildren();
    activeCollection.links.forEach(([label,path])=> { const li=document.createElement('li');const a=document.createElement('a'); a.href=site+path; a.textContent=label+' ↗';a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label',label+' on the current Lavish website (new tab)');li.append(a);list.append(li); });
    $('#add-category').disabled=chosen.has(activeCollection.name);
    $('#add-category').textContent=chosen.has(activeCollection.name)?'Added to your event ✓':'Add to my event +';
    openDialog($('#collection-dialog'));
  }));
  $('#add-category').addEventListener('click',() => {
    const name=activeCollection.name; chosen.add(name);
    const needs=$('#needs'); needs.value=(needs.value.trim()?needs.value.trim()+'\n':'')+'Interested in: '+name+'.';
    $('#selection-status').textContent=name+' added to your event brief.';
    returnFocus=needs;
    $('#collection-dialog').close();
    $('#inquiry').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    needs.focus({preventScroll:true});
  });
  function showGallery(index) {
    activeGallery=(index+events.length)%events.length;
    const event=events[activeGallery];
    $('#gallery-dialog-image').src=`assets/${event.image}.webp`;
    $('#gallery-dialog-image').alt=event.alt;
    $('#gallery-dialog-title').textContent=event.title;
    $('#gallery-dialog-credit').textContent=event.credit;
    $('#gallery-count').textContent=`${activeGallery+1} / ${events.length}`;
  }
  document.querySelectorAll('[data-gallery]').forEach(button => button.addEventListener('click',()=>{showGallery(Number(button.dataset.gallery));openDialog($('#gallery-dialog'));}));
  $('#gallery-prev').addEventListener('click',()=>showGallery(activeGallery-1));
  $('#gallery-next').addEventListener('click',()=>showGallery(activeGallery+1));
  $('#gallery-dialog').addEventListener('keydown',event=>{if(event.key==='ArrowLeft')showGallery(activeGallery-1);if(event.key==='ArrowRight')showGallery(activeGallery+1);});
  $('#inquiry-form').addEventListener('submit',event => {
    event.preventDefault();
    const data=new FormData(event.currentTarget);
    const rows=[['Name',data.get('name')],['Email',data.get('email')],['Event date',data.get('date')||'To be confirmed'],['Occasion',data.get('type')||'To be confirmed'],['Location',data.get('location')],['Your ideas',data.get('needs')||'Let’s explore the collection together.']];
    const dl=$('#brief-details');dl.replaceChildren();
    rows.forEach(([label,value]) => {const div=document.createElement('div');const dt=document.createElement('dt');const dd=document.createElement('dd');dt.textContent=label;dd.textContent=String(value);div.append(dt,dd);dl.append(div);});
    briefText='LAVISH EVENT RENTALS — EVENT BRIEF\nPresentation preview. Not submitted. No availability reserved.\n\n'+rows.map(([label,value])=>label+': '+value).join('\n\n')+'\n\nContact: info@lavisheventrentals.com\nMiami: 305.731.2203 | Orlando: 407.789.3975\n';
    openDialog($('#brief-dialog'));
  });
  $('#download-brief').addEventListener('click',() => {
    const blob=new Blob([briefText],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='lavish-event-brief.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
})();
