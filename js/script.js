/* J.T Building Services — Shared Scripts */

document.addEventListener('DOMContentLoaded',()=>{

  // --- Nav scroll ---
  const nav=document.getElementById('nav');
  if(nav){
    window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>20),{passive:true});
  }

  // --- Mobile nav toggle ---
  const toggle=document.querySelector('.nav-toggle');
  const html=document.documentElement;
  toggle?.addEventListener('click',()=>html.classList.toggle('nav-open'));

  // Close mobile nav on link click
  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.addEventListener('click',()=>html.classList.remove('nav-open'));
  });

  // --- Set active nav link ---
  const path=window.location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{
    const href=a.getAttribute('href');
    if(href===path||(path===''&&href==='index.html')){
      a.classList.add('active');
    }
  });

  // --- Scroll reveal ---
  if(window.matchMedia('(prefers-reduced-motion:no-preference)').matches){
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target)}
      });
    },{threshold:.12,margin:'0px 0px -40px 0px'});
    document.querySelectorAll('.rv').forEach(el=>obs.observe(el));
  }else{
    document.querySelectorAll('.rv').forEach(el=>el.classList.add('vis'));
  }

});
