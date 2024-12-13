document.addEventListener('DOMContentLoaded', function() {
    var swiper = new Swiper(".slider-swiper", {
        between: 0,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        speed: 1000,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        on: {
          realIndexChange: function () {
            // Önce tüm slide'lardaki animasyonları sıfırla
            this.slides.forEach(slide => {
              const texts = slide.querySelectorAll('h4, h1');
              texts.forEach(text => {
                text.classList.remove('opacity-100', 'translate-y-0');
                text.classList.add('opacity-0', 'translate-y-10');
              });
            });
  
            // Aktif slide'ın animasyonunu başlat
            setTimeout(() => {
              const activeSlide = this.slides[this.activeIndex];
              const texts = activeSlide.querySelectorAll('h4, h1');
              texts.forEach(text => {
                text.classList.remove('opacity-0', 'translate-y-10');
                text.classList.add('opacity-100', 'translate-y-0');
              });
            }, 50);
          }
        }
      });
  
      // İlk yüklemede animasyonu tetikle
      setTimeout(() => {
        const activeSlide = swiper.slides[swiper.activeIndex];
        const texts = activeSlide.querySelectorAll('h4, h1');
        texts.forEach(text => {
          text.classList.remove('opacity-0', 'translate-y-10');
          text.classList.add('opacity-100', 'translate-y-0');
        });
      }, 100);

      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(".scroll-image-1", 
        { yPercent: 100 }, 
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: ".scroll-image-2",
            start: "top center",
            end: "center center",
            scrub: 3
          }
      });
  
      gsap.fromTo(".scroll-image-2", 
        { yPercent: -100 },
        {
          yPercent: 0, 
          ease: "none",
          scrollTrigger: {
            trigger: ".scroll-image-2",
            start: "top center",
            end: "center center",
            scrub: 3
          }
      });

      var swiper = new Swiper(".events-swiper", {
        slidesPerView: 1.5,
        spaceBetween: 10,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView:3,
            spaceBetween: 10,
          },
        },
      });

      var swiper = new Swiper('.logo-slider', {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 0,
          disableOnInteraction: false
        },
        speed: 6000,
        allowTouchMove: false,
        breakpoints: {
          640: {
            slidesPerView: 3
          },
          768: {
            slidesPerView: 4
          },
          1024: {
            slidesPerView: 5
          }
        }
      });

     // Smooth scroll function
    function smoothScroll(target, duration) {
      const targetElement = document.querySelector(target);
      if (!targetElement) return;
      
      const targetPosition = targetElement.offsetTop - 80; // 80px offset
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      let startTime = null;

      function animation(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const run = ease(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      function ease(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
      }

      requestAnimationFrame(animation);
  }

  // Click event for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = this.getAttribute('href');
          console.log('Scrolling to:', target); // Debug için
          smoothScroll(target, 1000);
      });
  });

  // Scroll spy
  function updateActiveLink() {
      const sections = document.querySelectorAll('section[id], footer[id]');
      const navLinks = document.querySelectorAll('.nav-link');

      let current = '';

      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          const scrollPosition = window.pageYOffset;

          if (scrollPosition >= sectionTop - 200) {
              current = section.getAttribute('id');
          }
      });

      navLinks.forEach(link => {
          link.style.setProperty('--nav-width', '0');
          link.classList.remove('active');
          
          if (link.getAttribute('href') === `#${current}`) {
              link.style.setProperty('--nav-width', '100%');
              link.classList.add('active');
          }
      });
  }

  // Initial call
  updateActiveLink();

  // Scroll event listener
  window.addEventListener('scroll', () => {
      updateActiveLink();
  });
});