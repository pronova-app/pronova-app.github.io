'use strict';
(()=>{
 const normalize=s=>s.toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i');
 const menu=document.getElementById('products');
 if(menu){
  const cards=[...menu.querySelectorAll('.product-card')],buttons=[...document.querySelectorAll('[data-filter]')];
  const search=document.getElementById('search'),more=document.getElementById('more'),empty=document.getElementById('empty');
  const requested=new URLSearchParams(location.search).get('kategori');
  let category=buttons.some(b=>b.dataset.filter===requested)?requested:'Tümü',limit=12;
  function render(){
   const query=normalize(search.value.trim());
   const found=cards.filter(card=>(category==='Tümü'||(category==='Popüler'?card.dataset.popular==='true':card.dataset.category===category))&&normalize(card.dataset.name+' '+card.dataset.category).includes(query));
   const shown=new Set(found.slice(0,limit));cards.forEach(card=>card.hidden=!shown.has(card));
   buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===category)));
   document.getElementById('count').textContent=found.length+' ürün';
   document.getElementById('category-title').textContent=query?'Arama sonuçları':category==='Tümü'?'Tüm lezzetler':category;
   more.hidden=limit>=found.length;empty.hidden=found.length>0;
  }
  buttons.forEach(b=>b.addEventListener('click',()=>{category=b.dataset.filter;limit=12;render();}));
  search.addEventListener('input',()=>{limit=12;render();});more.addEventListener('click',()=>{limit+=12;render();});render();
 }
 const share=document.getElementById('share');let timer;
 if(share)share.addEventListener('click',async()=>{
  const toast=document.getElementById('toast');
  try{await navigator.clipboard.writeText(location.href);toast.textContent='Ürün bağlantısı kopyalandı.';}catch{toast.textContent='Ürün bağlantısını adres çubuğundan kopyalayabilirsiniz.';}
  toast.hidden=false;clearTimeout(timer);timer=setTimeout(()=>toast.hidden=true,3500);
 });
 // Keep previously shared product URLs working after the move to separate pages.
 if(location.hash.startsWith('#urun/')&&document.querySelector('.hero')){
  const id=location.hash.slice(6);
  if(/^[a-z0-9-]+$/.test(id))location.replace(new URL('urun/'+id+'/',location.href).href);
 }
})();
