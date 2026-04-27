/* ══════════════════════════════════════════
   CumpStore – Main JavaScript
   ══════════════════════════════════════════ */

'use strict';

// ── DOM Ready ──
document.addEventListener('DOMContentLoaded', () => {
  initDropdown();
  initSlider();
  initScrollHeader();
  initRevealAnimations();
});

/* ══════════════════════════════════════════
   DROPDOWN (고객센터)
   ══════════════════════════════════════════ */
function initDropdown() {
  const wrapper = document.getElementById('customerDropdown');
  if (!wrapper) return;

  const trigger = wrapper.querySelector('.dropdown-trigger');

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = wrapper.classList.toggle('open');
    trigger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on outside click
  document.addEventListener('click', () => {
    wrapper.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      wrapper.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ══════════════════════════════════════════
   HERO SLIDER
   ══════════════════════════════════════════ */
function initSlider() {
  const track = document.getElementById('sliderTrack');
  const slides = track ? Array.from(track.querySelectorAll('.slide')) : [];
  const dots = Array.from(document.querySelectorAll('.dot'));
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const progressBar = document.getElementById('sliderProgressBar');

  if (!track || slides.length === 0) return;

  let current = 0;
  let autoTimer = null;
  let progressTimer = null;
  const INTERVAL = 5000; // 5s per slide
  const PROGRESS_STEP = 100 / (INTERVAL / 100); // step per 100ms

  /* ── Activate a slide ── */
  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('dot--active');
    dots[current]?.setAttribute('aria-selected', 'false');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('active');
    dots[current]?.classList.add('dot--active');
    dots[current]?.setAttribute('aria-selected', 'true');

    track.style.transform = `translateX(-${current * 100}%)`;

    restartProgress();
  }

  /* ── Progress bar ── */
  function restartProgress() {
    clearInterval(progressTimer);
    if (progressBar) progressBar.style.width = '0%';
    let pct = 0;
    progressTimer = setInterval(() => {
      pct += PROGRESS_STEP;
      if (progressBar) progressBar.style.width = `${Math.min(pct, 100)}%`;
      if (pct >= 100) clearInterval(progressTimer);
    }, 100);
  }

  /* ── Auto-play ── */
  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), INTERVAL);
  }

  function stopAuto() {
    clearInterval(autoTimer);
    clearInterval(progressTimer);
  }

  /* ── Controls ── */
  prevBtn?.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startAuto(); });
  });

  /* ── Touch / Swipe ── */
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1);
      startAuto();
    }
  });

  /* ── Pause on hover ── */
  const hero = document.getElementById('hero');
  hero?.addEventListener('mouseenter', stopAuto);
  hero?.addEventListener('mouseleave', startAuto);

  /* ── Init ── */
  goTo(0);
  startAuto();
}

/* ══════════════════════════════════════════
   STICKY HEADER SCROLL STATE
   ══════════════════════════════════════════ */
function initScrollHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ══════════════════════════════════════════
   SCROLL REVEAL ANIMATIONS
   ══════════════════════════════════════════ */
function initRevealAnimations() {
  // Add reveal class to target elements
  const targets = [
    '.section-header',
    '.product-card',
    '.showcase-text',
    '.showcase-image-wrap',
    '.feature-item',
  ];

  targets.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      // Stagger cards
      if (sel === '.product-card') {
        el.classList.add(`reveal-delay-${(i % 3) + 1}`);
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}
