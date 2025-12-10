// js/main.js — 交互：Swiper、语言切换、logo 动画、背景粒子、平滑锚点
document.addEventListener('DOMContentLoaded', () => {
  // 年份填充 (index 和 products 页均可用)
  document.querySelectorAll('#year,#yr2,#yr3').forEach(el => { if(el) el.textContent = new Date().getFullYear(); });

  // Swiper
  if(window.Swiper){
    new Swiper('#main-swiper', {
      loop: true,
      autoplay: { delay: 3200, disableOnInteraction: false },
      effect: 'fade',
      fadeEffect: { crossFade: true },
    });
  }

  // 语言
  const langs = {
    zh: {
      site_title: "FUTURE VOICE — 专业声学 & 高端家用",
      nav_home: "首页", nav_products: "产品", nav_about: "关于", nav_contact: "联系我们",
      hero_title: "让声音更有力量", hero_sub: "专业舞台级性能 + 高端家用体验 · 吸音板 / 隔音 / 声学工程",
      cta_products: "查看产品", cta_contact: "咨询我们",
      section_products: "精选产品",
      product1_name: "槽木吸音板", product1_short: "高性能吸音，适用于影院 / 会议厅。",
      product2_name: "聚酯纤维吸音板", product2_short: "环保材质、吸声效率高。",
      product3_name: "穿孔木吸音板", product3_short: "装饰性强、吸音可定制。",
      product4_name: "减振垫 / 隔振板", product4_short: "工业与设备减振。",
      section_about: "关于我们", about_text: "我们专注声学材料研发与工程，提供舞台级与家用级别一站式声学解决方案（示例）。",
      section_contact: "联系我们", contact_intro: "需要资料或报价？请填写下面表单，我们会尽快回复。",
      contact_info_title: "联系方式", label_tel: "电话：", label_addr: "地址：", contact_note: "示例占位：请上线前替换", send: "发送"
    },
    jp: {
      site_title: "FUTURE VOICE — プロ音響 & ハイエンドホーム",
      nav_home: "ホーム", nav_products: "製品", nav_about: "会社情報", nav_contact: "お問い合わせ",
      hero_title: "音に力を与える", hero_sub: "ステージ級の性能とハイエンドの家庭体験を両立",
      cta_products: "製品を見る", cta_contact: "お問い合わせ",
      section_products: "おすすめ製品",
      product1_name: "スロットウッド吸音パネル", product1_short: "映画館/会議室向けの高性能吸音。",
      product2_name: "ポリエステル吸音パネル", product2_short: "環境に優しい、吸音効率が高い。",
      product3_name: "パンチングウッド吸音パネル", product3_short: "意匠性と吸音を両立。",
      product4_name: "ダンピングパッド / 隔振板", product4_short: "機械/設備の防振ソリューション。",
      section_about: "会社情報", about_text: "音響材料の研究開発とエンジニアリングを専門に、ワンストップで提供します（サンプル）。",
      section_contact: "お問い合わせ", contact_intro: "資料や見積をご希望の方は、下記フォームをご入力ください。",
      contact_info_title: "連絡先", label_tel: "電話：", label_addr: "住所：", contact_note: "サンプル情報：公開前に差し替えてください", send: "送信"
    }
  };

  function setLang(lang){
    const dict = langs[lang] || langs['zh'];
    document.querySelectorAll('[data-lang]').forEach(el=>{
      const key = el.getAttribute('data-lang');
      if(dict[key]) el.textContent = dict[key];
    });
    document.title = dict.site_title || document.title;
    document.getElementById('btn-zh')?.classList.toggle('active', lang==='zh');
    document.getElementById('btn-jp')?.classList.toggle('active', lang==='jp');
    localStorage.setItem('site_lang', lang);
  }
  document.getElementById('btn-zh')?.addEventListener('click', ()=>setLang('zh'));
  document.getElementById('btn-jp')?.addEventListener('click', ()=>setLang('jp'));
  setLang(localStorage.getItem('site_lang') || 'zh');

  // 平滑滚动 (锚点)
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const t = document.querySelector(this.getAttribute('href'));
      if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth'}); }
    });
  });

  // Logo subtle animation (metal shine)
  (function logoPulse(){
    const svgs = document.querySelectorAll('.metal-logo');
    svgs.forEach(svg => {
      svg.addEventListener('mouseenter', ()=>{ svg.style.transform = 'scale(1.04)'; });
      svg.addEventListener('mouseleave', ()=>{ svg.style.transform = ''; });
    });
  })();

  // Canvas particle / subtle metal sheen
  (function particles(){
    const c = document.getElementById('bg-canvas');
    if(!c) return;
    const ctx = c.getContext('2d');
    let W = c.width = innerWidth;
    let H = c.height = innerHeight;
    const dots = [];
    const count = Math.max(20, Math.round((W*H)/140000));
    for(let i=0;i<count;i++){
      dots.push({ x: Math.random()*W, y:Math.random()*H, r: (Math.random()*1.8)+0.4, vx:(Math.random()-0.5)*0.3, vy:(Math.random()-0.5)*0.3, a:0.06+Math.random()*0.18 });
    }
    function resize(){ W = c.width = innerWidth; H = c.height = innerHeight; }
    window.addEventListener('resize', resize);
    function draw(){
      // subtle textured background
      ctx.clearRect(0,0,W,H);
      // faint radial light
      const g = ctx.createRadialGradient(W*0.1,H*0.1,20,W*0.6,H*0.4,Math.max(W,H)*0.9);
      g.addColorStop(0,'rgba(30,144,255,0.02)');
      g.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
      // tiny metallic specks
      for(const d of dots){
        d.x += d.vx; d.y += d.vy;
        if(d.x < -10) d.x = W+10;
        if(d.x > W+10) d.x = -10;
        if(d.y < -10) d.y = H+10;
        if(d.y > H+10) d.y = -10;
        ctx.beginPath();
        ctx.fillStyle = `rgba(30,144,255,${d.a})`;
        ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    draw();
  })();

});
