/* JT.BS South Wales Ltd — Shared Scripts */

document.addEventListener('DOMContentLoaded',()=>{

  // --- Nav scroll ---
  const nav=document.getElementById('nav');
  if(nav){
    window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>20),{passive:true});
  }

  // --- Mobile nav toggle ---
  const toggle=document.querySelector('.nav-toggle');
  const html=document.documentElement;
  toggle?.addEventListener('click',()=>{
    const isOpen=html.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded',isOpen);
  });

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

  // --- Hero video: pause when out of view ---
  (function(){
    const video=document.querySelector('.hero-video');
    if(!video||!window.IntersectionObserver)return;
    const io=new IntersectionObserver(([e])=>{
      e.isIntersecting?video.play().catch(()=>{}):video.pause();
    },{threshold:.1});
    io.observe(video);
  })();

  // --- Project gallery filter ---
  (function(){
    const gallery=document.getElementById('project-gallery');
    if(!gallery)return;
    const btns=document.querySelectorAll('.filter-btn');
    const cards=gallery.querySelectorAll('.project-card');
    btns.forEach(btn=>{
      btn.addEventListener('click',()=>{
        btns.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const filter=btn.dataset.filter;
        cards.forEach(card=>{
          if(filter==='all'||card.dataset.filter===filter){
            card.style.display='';
            card.style.opacity='1';
            card.style.transform='';
          }else{
            card.style.opacity='0';
            card.style.transform='scale(.95)';
            setTimeout(()=>{card.style.display='none'},350);
          }
        });
      });
    });
  })();

  // --- Animated stat counters ---
  (function(){
    const nums=document.querySelectorAll('.stat-item .num');
    if(!nums.length||!window.IntersectionObserver)return;
    const animated=new Set();
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(!e.isIntersecting||animated.has(e.target))return;
        animated.add(e.target);obs.unobserve(e.target);
        const el=e.target;
        const txt=el.textContent.trim();
        // Extract numeric value, suffix, and prefix
        const numMatch=txt.match(/([0-9,]+)/);
        if(!numMatch||txt==='2016')return;
        const target=parseInt(numMatch[1].replace(/,/g,''),10);
        const suffix=txt.replace(numMatch[1],'').trim();
        const start=performance.now();
        const dur=1500;
        el.textContent='0'+suffix;
        function tick(now){
          const t=Math.min((now-start)/dur,1);
          // ease-out expo
          const v=t===1?1:1-Math.pow(2,-10*t);
          const val=Math.round(v*target);
          el.textContent=val.toLocaleString()+suffix;
          if(t<1)requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    },{threshold:.4});
    nums.forEach(n=>obs.observe(n));
  })();

  // --- Contact form validation ---
  const form=document.getElementById('contact-form');
  if(form){
    const fields={
      name:{label:'Full name'},
      email:{label:'Email address'},
      message:{label:'Project details'}
    };
    Object.keys(fields).forEach(id=>{
      const input=form.querySelector(`#${id}`);
      const err=document.createElement('span');
      err.className='form-error';
      err.id=`${id}-error`;
      err.style.cssText='display:block;font-size:.75rem;color:var(--red);margin-top:4px;min-height:0';
      input?.parentNode?.insertBefore(err,input.nextSibling);
    });
    form.addEventListener('submit',e=>{
      let valid=true;
      Object.keys(fields).forEach(id=>{
        const input=form.querySelector(`#${id}`);
        const err=document.getElementById(`${id}-error`);
        if(!input||!err)return;
        const val=input.value.trim();
        if(!val){
          err.textContent=`Please enter your ${fields[id].label.toLowerCase()}`;
          input.style.borderColor='var(--red)';
          valid=false;
        }else if(id==='email'&&!/^\S+@\S+\.\S+$/.test(val)){
          err.textContent='Please enter a valid email address';
          input.style.borderColor='var(--red)';
          valid=false;
        }else{
          err.textContent='';
          input.style.borderColor='';
        }
      });
      if(!valid)e.preventDefault();
    });
    form.querySelectorAll('input,textarea,select').forEach(el=>{
      el.addEventListener('input',()=>{
        el.style.borderColor='';
        const err=document.getElementById(`${el.id}-error`);
        if(err)err.textContent='';
      });
    });
  }

});
