'use strict';
document.documentElement.classList.add('js');
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#main-nav');
function closeMenu(){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});
nav.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
const wide=window.matchMedia('(min-width:801px)');
wide.addEventListener('change',()=>closeMenu());
const filters=document.querySelectorAll('[data-filter]');
filters.forEach(button=>button.addEventListener('click',()=>{const category=button.dataset.filter;let count=0;document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=category!=='すべて'&&card.dataset.category!==category;if(!card.hidden)count++;});filters.forEach(filter=>filter.setAttribute('aria-pressed',String(filter===button)));document.querySelector('#filter-status').textContent=`${category}：${count}件の日記を表示`;}));
const form=document.querySelector('#demo-form');
if(form){
  const preview=document.querySelector('#form-preview');
  const complete=document.querySelector('#form-complete');
  const previewButton=document.querySelector('#preview-button');
  const values=document.querySelector('#preview-values');
  previewButton.disabled=false;
  form.addEventListener('submit',event=>event.preventDefault());
  form.addEventListener('keydown',event=>{if(event.key==='Enter'&&event.target.tagName==='INPUT'&&event.target.type!=='checkbox')event.preventDefault();});
  previewButton.addEventListener('click',()=>{
    if(!form.reportValidity())return;
    values.replaceChildren();
    for(const [id,label] of [['kind','ご相談の内容'],['visitor','お名前（架空）'],['email','メール（架空）'],['grade','学年'],['message','確認したいこと']]){
      const row=document.createElement('div');const dt=document.createElement('dt');const dd=document.createElement('dd');dt.textContent=label;dd.textContent=document.getElementById(id).value;row.append(dt,dd);values.append(row);
    }
    form.hidden=true;preview.hidden=false;preview.focus();
  });
  document.querySelector('#edit-button').addEventListener('click',()=>{preview.hidden=true;values.replaceChildren();form.hidden=false;document.querySelector('#kind').focus();});
  document.querySelector('#finish-button').addEventListener('click',()=>{form.reset();values.replaceChildren();preview.hidden=true;complete.hidden=false;complete.focus();});
  document.querySelector('#restart-button').addEventListener('click',()=>{complete.hidden=true;form.hidden=false;document.querySelector('#kind').focus();});
  window.addEventListener('pagehide',()=>{form.reset();values.replaceChildren();preview.hidden=true;complete.hidden=true;form.hidden=false;});
}
