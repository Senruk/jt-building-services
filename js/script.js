/* JT.BS South Wales Ltd - Shared Scripts */

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

  // --- Hero frame animation ---
  // Mobile + data-saver phones get the static poster frame instead of the
  // full 180-frame sequence (~19.5MB). That loading cost is not worth it on
  // small screens or capped data plans.
  (function(){
    const img=document.getElementById('hero-video');
    if(!img)return;
    if(!window.matchMedia('(prefers-reduced-motion:no-preference)').matches)return;
    const isMobile=window.matchMedia('(max-width:1023px)').matches;
    const saveData=!!(navigator.connection&&navigator.connection.saveData);
    if(isMobile||saveData)return;
    const total=180,fps=30;
    const frames=[];
    let loaded=0,running=false,interval=null;

    function start(){
      if(running)return;
      running=true;
      let idx=1;
      interval=setInterval(()=>{
        img.src=frames[idx].src;
        idx=(idx+1)%total;
      },1000/fps);
    }
    function stop(){
      if(!running)return;
      running=false;
      if(interval){clearInterval(interval);interval=null}
    }

    for(let i=1;i<=total;i++){
      const f=new Image();
      const n=String(i).padStart(3,'0');
      f.onload=f.onerror=()=>{loaded++;if(loaded===total)start()};
      f.src='images/hero-frames/ezgif-frame-'+n+'.jpg';
      frames.push(f);
    }

    const hero=document.querySelector('.hero');
    if(hero){
      const io=new IntersectionObserver(([e])=>{
        e.isIntersecting&&loaded===total?start():stop();
      },{threshold:.1});
      io.observe(hero);
    }
  })();

  // --- Before/After Slider ---
  (function(){
    const containers=document.querySelectorAll('.ba-container');
    containers.forEach(ba=>{
      if(!ba)return;
      const after=ba.querySelector('.ba-after');
      const handle=ba.querySelector('.ba-handle');
      let active=false;
      function setPos(e){
        const rect=ba.getBoundingClientRect();
        const x=e.touches?e.touches[0].clientX:e.clientX;
        let pct=((x-rect.left)/rect.width)*100;
        pct=Math.max(0,Math.min(100,pct));
        after.style.width=pct+'%';
        handle.style.left=(100-pct)+'%';
      }
      ba.addEventListener('mousedown',e=>{active=true;setPos(e)});
      window.addEventListener('mouseup',()=>{active=false});
      window.addEventListener('mousemove',e=>{if(active)setPos(e)});
      ba.addEventListener('touchstart',e=>{active=true;setPos(e)},{passive:true});
      window.addEventListener('touchend',()=>{active=false});
      window.addEventListener('touchmove',e=>{if(active)setPos(e)},{passive:true});
    });
  })();

  // --- Before/After carousel navigation ---
  (function(){
    const carousel=document.querySelector('.ba-carousel');
    if(!carousel)return;
    const containers=carousel.querySelectorAll('.ba-container');
    if(!containers.length)return;
    const prevBtn=document.querySelector('.ba-nav-prev');
    const nextBtn=document.querySelector('.ba-nav-next');
    const dots=carousel.parentElement.querySelectorAll('.ba-dot');
    let current=0;
    containers.forEach((c,i)=>{if(c.classList.contains('active'))current=i});
    function goTo(index){
      if(index<0)index=containers.length-1;
      if(index>=containers.length)index=0;
      containers.forEach((c,i)=>c.classList.toggle('active',i===index));
      dots.forEach((d,i)=>{
        const on=i===index;
        d.classList.toggle('active',on);
        d.setAttribute('aria-selected',on);
      });
      current=index;
    }
    prevBtn?.addEventListener('click',()=>goTo(current-1));
    nextBtn?.addEventListener('click',()=>goTo(current+1));
    dots.forEach((d,i)=>d.addEventListener('click',()=>goTo(i)));
  })();

  // --- Video autoplay on scroll ---
  (function(){
    const videos=document.querySelectorAll('.video-card video');
    if(!videos.length||!window.IntersectionObserver)return;
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        const v=e.target;
        if(e.isIntersecting){
          v.play().catch(()=>{});
        }else{
          v.pause();
        }
      });
    },{threshold:.3});
    videos.forEach(v=>obs.observe(v));
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
        if(!numMatch||txt==='2013')return;
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
