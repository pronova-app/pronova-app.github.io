'use strict';
(()=>{
 const {products,source}=window.MENU_DATA;
 const $=id=>document.getElementById(id);
 const money=n=>new Intl.NumberFormat('tr-TR',{style:'currency',currency:'TRY',maximumFractionDigits:0}).format(n);
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const normalize=s=>s.toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i');
 let category='Popüler',query='',limit=12,selected=null,toastTimer;
 const categoryNames=['Popüler','Tümü',...new Set(products.map(p=>p.category))];
 const fallback='<div class="image-fallback"><span>ks.</span><small>Görsel bulunmuyor</small></div>';
 function photo(p,large=false){return p.image?`<img src="${escape(p.image)}" alt="${escape(p.name)}" ${large?'fetchpriority="high"':'loading="lazy"'} width="700" height="700">`:fallback;}
 function bindImageErrors(scope){scope.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>img.outerHTML=fallback,{once:true}));}
 function card(p){return `<a class="product" href="#urun/${p.id}" ${selected?.id===p.id?'aria-current="true"':''}>${photo(p)}<div class="product-content"><h3>${escape(p.name)}</h3><p>${escape(p.category)}</p><strong>${money(p.price)} <span class="arrow" aria-hidden="true">↗</span></strong></div></a>`;}
 function renderCategories(){ $('categories').innerHTML=categoryNames.map(name=>`<button class="category" type="button" aria-pressed="${name===category}" data-category="${escape(name)}">${escape(name)}</button>`).join('');}
 function renderMenu(){
  const found=products.filter(p=>(category==='Tümü'||(category==='Popüler'?p.popular:p.category===category))&&normalize(p.name+' '+p.category).includes(normalize(query)));
  $('category-title').textContent=query?'Arama sonuçları':category==='Popüler'?'Popüler lezzetler':category==='Tümü'?'Tüm lezzetler':category;
  $('count').textContent=found.length+' ürün';$('products').innerHTML=found.slice(0,limit).map(card).join('');$('empty').hidden=found.length>0;$('more').hidden=limit>=found.length;bindImageErrors($('products'));
 }
 function renderDetail(p){
  selected=p;document.title=p.name+' — Kadıköy Simit';
  $('breadcrumb').innerHTML=`<a href="#menu">Lezzetlerimiz</a><span aria-hidden="true">/</span><a href="#menu" data-breadcrumb-category="${escape(p.category)}">${escape(p.category)}</a><span aria-hidden="true">/</span><span class="current">${escape(p.name)}</span>`;
  $('detail').innerHTML=`<div class="photo-wrap">${photo(p,true)}${p.popular?'<span class="popular-badge">★ Çok sevilen</span>':''}</div><div class="detail-copy"><div class="mini-rule"></div><span class="category-badge">${escape(p.category)}</span><h1 id="product-title">${escape(p.name)}</h1><p class="description">${escape(p.description)}</p><dl class="product-facts"><div><dt>Gramaj / porsiyon ${p.amountEstimated?'<span class="estimate">Tahmini</span>':'<span class="declared">Menü bilgisi</span>'}</dt><dd>${escape(p.amount)}</dd></div><div><dt>${p.category==='Poşet'?'Ürün türü':'Olası alerjenler'} ${p.allergens.length?'<span class="estimate">Tahmini</span>':''}</dt><dd>${p.category==='Poşet'?'Gıda dışı ürün':p.allergens.length?p.allergens.map(escape).join(' · '):'Doğrulanmadı'}</dd></div></dl><p class="allergen-note">${escape(p.allergenNote)}</p><div class="detail-price">${money(p.price)}</div><div class="detail-actions"><a class="order" href="${source}" target="_blank" rel="noopener">Yemeksepeti'nde sipariş ver <span aria-hidden="true">↗</span></a><button type="button" class="share" id="share">Bağlantıyı kopyala</button></div><p class="detail-note">Sipariş ve güncel fiyat bilgisi Yemeksepeti'nde.</p></div>`;
  bindImageErrors($('detail'));
  $('share').addEventListener('click',async()=>{
   const url=new URL(location.href);url.hash='urun/'+p.id;
   try{await navigator.clipboard.writeText(url.href);toast('Ürün bağlantısı kopyalandı.');}catch{toast('Ürün bağlantısını adres çubuğundan kopyalayabilirsin.');}
  });
 }
 function toast(message){clearTimeout(toastTimer);$('toast').textContent=message;$('toast').hidden=false;toastTimer=setTimeout(()=>$('toast').hidden=true,3500);}
 function route(scroll=false){
  const hash=location.hash;
  if(hash==='#menu'||hash==='#about')return;
  const id=hash.startsWith('#urun/')?hash.slice(6):null;
  const p=products.find(p=>p.id===id)||products.find(p=>p.id==='kasarli-simit-tost')||products[0];
  if(id&&!products.some(p=>p.id===id))toast('Bu ürün bulunamadı. Popüler bir lezzeti görüntülüyorsun.');
  renderDetail(p);renderMenu();if(scroll)window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 }
 $('categories').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;category=b.dataset.category;limit=12;renderCategories();renderMenu();});
 $('search').addEventListener('input',e=>{query=e.target.value;limit=12;if(query){category='Tümü';renderCategories();}renderMenu();});
 $('more').addEventListener('click',()=>{limit+=12;renderMenu();});
 $('breadcrumb').addEventListener('click',e=>{const a=e.target.closest('[data-breadcrumb-category]');if(a){category=a.dataset.breadcrumbCategory;query='';$('search').value='';limit=12;renderCategories();renderMenu();}});
 window.addEventListener('hashchange',()=>route(true));
 renderCategories();
 // Render a product before honoring menu/about anchor links on direct loads.
 const initial=location.hash;if(initial==='#menu'||initial==='#about'){renderDetail(products.find(p=>p.id==='kasarli-simit-tost'));renderMenu();requestAnimationFrame(()=>$(initial.slice(1)).scrollIntoView());}else route();
})();
