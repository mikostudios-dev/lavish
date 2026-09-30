/* Rental inquiry list only. No pricing, checkout or network requests. */
(() => {
 const key='lavish-quote-v1';
 const quantity=v=>Math.min(999,Math.max(1,Math.trunc(Number(v)||1)));
 function read(){try{const a=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(a)?a.filter(x=>x&&typeof x.name==='string'&&typeof x.id==='string').map(x=>({...x,quantity:quantity(x.quantity)})):[]}catch{return []}}
 function save(items){try{localStorage.setItem(key,JSON.stringify(items))}catch{throw new Error('Your browser could not save the quote list. Please allow local storage and try again.')}document.dispatchEvent(new Event('quotechange'))}
 function updateCount(){const count=read().reduce((n,x)=>n+x.quantity,0);document.querySelectorAll('[data-quote-count]').forEach(e=>e.textContent=count?` (${count})`:'')}
 window.LavishQuote={read,quantity,add(item){const a=read(),existing=a.find(x=>x.id===item.id);if(existing)existing.quantity=quantity(existing.quantity+quantity(item.quantity));else a.push({...item,quantity:quantity(item.quantity)});save(a)},set(id,value){save(read().map(x=>x.id===id?{...x,quantity:quantity(value)}:x))},remove(id){save(read().filter(x=>x.id!==id))}};
 document.addEventListener('quotechange',updateCount);document.addEventListener('DOMContentLoaded',updateCount);window.addEventListener('storage',updateCount);
})();
