(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const menu = $('#mobile-menu'), toggle = $('.menu-toggle');
  const closeMenu = () => { menu.hidden = true; toggle.setAttribute('aria-expanded', 'false'); };
  toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; menu.hidden = !open; toggle.setAttribute('aria-expanded', String(open)); });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('click', e => { if (!e.target.closest('.site-header')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { closeMenu(); toggle.focus(); } });
  matchMedia('(min-width:901px)').addEventListener('change', closeMenu);
  const openDialog = (dialog, opener) => { dialog.opener = opener; dialog.showModal(); document.body.style.overflow = 'hidden'; };
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('close', () => { document.body.style.overflow = ''; dialog.opener?.focus({preventScroll:true}); });
    dialog.addEventListener('click', e => { const r = dialog.getBoundingClientRect(); if (e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) dialog.close(); });
  });
  const lightbox = $('#gallery-lightbox');
  if (lightbox) {
    const tiles = [...document.querySelectorAll('[data-gallery-index]')];
    let active = 0;
    const showPhoto = index => {
      active = (index + tiles.length) % tiles.length;
      const tile = tiles[active], photo = $('#gallery-full-photo');
      photo.src = tile.dataset.full; photo.alt = tile.querySelector('img').alt;
      $('#gallery-photo-title').textContent = tile.dataset.title;
      $('#gallery-photo-credit').textContent = tile.dataset.credit;
      $('#gallery-photo-source').href = tile.dataset.source;
      $('#gallery-position').textContent = `${active + 1} / ${tiles.length}`;
    };
    tiles.forEach((tile, index) => tile.addEventListener('click', () => { showPhoto(index); openDialog(lightbox, tile); }));
    $('#gallery-close').addEventListener('click', () => lightbox.close());
    $('#gallery-previous').addEventListener('click', () => showPhoto(active - 1));
    $('#gallery-next').addEventListener('click', () => showPhoto(active + 1));
    lightbox.addEventListener('keydown', e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); showPhoto(active + (e.key === 'ArrowRight' ? 1 : -1)); } });
  }
  const form = $('#inquiry-form');
  if (form) {
    const dialog = $('#brief-dialog'); let brief = '';
    form.addEventListener('submit', e => {
      e.preventDefault(); const data = new FormData(form);
      const rows = [['Name',data.get('name')],['Email',data.get('email')],['Event date',data.get('date') || 'To be confirmed'],['Occasion',data.get('type') || 'To be confirmed'],['Location',data.get('location')],['Your ideas',data.get('needs') || 'Let’s explore the collection together.']];
      const details = $('#brief-details'); details.replaceChildren();
      rows.forEach(([label,value]) => { const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=String(value);row.append(dt,dd);details.append(row); });
      brief = 'LAVISH EVENT RENTALS — EVENT BRIEF\nPresentation preview. Not submitted. No availability reserved.\n\n' + rows.map(([label,value]) => `${label}: ${value}`).join('\n\n') + '\n\nContact: info@lavisheventrentals.com\nMiami:305.731.2203 | Orlando:407.789.3975\n';
      openDialog(dialog, form.querySelector('button[type=submit]'));
    });
    dialog.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => dialog.close()));
    $('#download-brief').addEventListener('click', () => { const url=URL.createObjectURL(new Blob([brief],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='lavish-event-brief.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000); });
  }
})();
