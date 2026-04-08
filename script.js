/* EMYR GREEN BUILDING CONSULTANTS — script.js */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar Scroll Effect ----
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ---- Mobile Menu ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ---- Back to Top Button ----
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Smooth Scrolling ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const id = this.getAttribute('href');
      if (id === '#') return;
      const el = document.querySelector(id);
      if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    });
  });

  // ---- Scroll Animations (AOS) ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

  // ---- Particles ----
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    for (let i = 0; i < 25; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 6 + 2;
      p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;animation-duration:${Math.random()*15+10}s;animation-delay:${Math.random()*10}s;opacity:${Math.random()*.5+.2}`;
      if (Math.random() > 0.5) p.style.background = 'rgba(79,142,247,.3)';
      particlesContainer.appendChild(p);
    }
  }

  // ---- Progress Bars Animation ----
  const progressBars = document.querySelectorAll('.progress-bar');
  if (progressBars.length) {
    const progObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.dataset.progress + '%';
          progObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });
    progressBars.forEach(bar => progObserver.observe(bar));
  }

  // ---- ROI Calculator ----
  const calcArea = document.getElementById('buildingArea');
  const calcType = document.getElementById('buildingType');
  const calcBtn = document.getElementById('calcBtn');
  if (calcArea && calcBtn) {
    const areaValue = document.getElementById('areaValue');
    if (areaValue) {
      calcArea.addEventListener('input', () => {
        areaValue.textContent = parseInt(calcArea.value).toLocaleString() + ' sq ft';
      });
    }
    calcBtn.addEventListener('click', () => {
      const area = parseInt(calcArea.value);
      const type = calcType ? calcType.value : 'commercial';
      const rates = { commercial: 12, residential: 8, industrial: 15, institutional: 10 };
      const rate = rates[type] || 10;
      const annualSavings = Math.round(area * rate * 0.3);
      const fiveYearSavings = annualSavings * 5;
      const co2Reduction = Math.round(area * 0.015);
      const waterSaved = Math.round(area * 2.5);
      
      const els = {
        annualSavings: document.getElementById('annualSavings'),
        fiveYearSavings: document.getElementById('fiveYearSavings'),
        co2Reduction: document.getElementById('co2Reduction'),
        waterSaved: document.getElementById('waterSaved')
      };
      if (els.annualSavings) els.annualSavings.textContent = '₹' + annualSavings.toLocaleString();
      if (els.fiveYearSavings) els.fiveYearSavings.textContent = '₹' + fiveYearSavings.toLocaleString();
      if (els.co2Reduction) els.co2Reduction.textContent = co2Reduction.toLocaleString() + ' tons';
      if (els.waterSaved) els.waterSaved.textContent = waterSaved.toLocaleString() + ' KL';
      
      const results = document.getElementById('calcResults');
      if (results) results.style.display = 'block';
    });
  }

  // ---- Lightbox for Gallery ----
  const galleryImages = document.querySelectorAll('.event-gallery img');
  if (galleryImages.length > 0) {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
      <span class="lightbox-close">&times;</span>
      <img class="lightbox-img" src="" alt="Full size photo">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    galleryImages.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; 
      });
    });

    closeBtn.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target !== lightboxImg && e.target !== closeBtn) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ---- Counter Animation ----
  document.querySelectorAll('.stat-num[data-count]').forEach(el => {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          let current = 0;
          const step = target / 60;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = Math.round(current) + suffix;
          }, 25);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    countObserver.observe(el);
  });
});

// ---- Contact Form Handler ----
function handleSubmit(event) {
  event.preventDefault();
  const submitBtn = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');
  if (!submitBtn || !formSuccess) return;
  
  submitBtn.innerHTML = 'Sending... ⏳';
  submitBtn.style.opacity = '0.8';
  submitBtn.disabled = true;

  setTimeout(() => {
    formSuccess.classList.remove('hidden');
    document.getElementById('contactForm').reset();
    submitBtn.innerHTML = 'Send Message 🚀';
    submitBtn.style.opacity = '1';
    submitBtn.disabled = false;
    setTimeout(() => formSuccess.classList.add('hidden'), 6000);
  }, 1500);
}
