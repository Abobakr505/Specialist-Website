// =========================================
// DINA ASHRAF PORTFOLIO — SCRIPTS
// =========================================

// 1. منطق تبديل الوضع الداكن (Dark Mode)
const themeToggleBtn = document.getElementById('theme-toggle');
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');

if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    lightIcon.classList.remove('hidden');
} else {
    document.documentElement.classList.remove('dark');
    darkIcon.classList.remove('hidden');
}

themeToggleBtn.addEventListener('click', function () {
    darkIcon.classList.toggle('hidden');
    lightIcon.classList.toggle('hidden');
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
    }
});

// 2. منطق الأكورديون (FAQs)
document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const answer = btn.nextElementSibling;
        const plusIcon = btn.querySelector('svg path');

        answer.classList.toggle('active');

        if (answer.classList.contains('active')) {
            plusIcon.setAttribute('d', 'M6 12h12');
        } else {
            plusIcon.setAttribute('d', 'M12 6v12M6 12h12');
        }

        document.querySelectorAll('.faq-answer').forEach(other => {
            if (other !== answer) {
                other.classList.remove('active');
                other.previousElementSibling.querySelector('svg path').setAttribute('d', 'M12 6v12M6 12h12');
            }
        });
    });
});

// Filter Logic (Experience section)
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active-filter'));
        btn.classList.add('active-filter');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'flex';
                card.classList.remove('in-view');
                requestAnimationFrame(() => card.classList.add('in-view'));
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// 3. قائمة الهاتف المحمول (Premium Mobile Menu)
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');

function openMobileMenu() {
    if (!mobileMenu) return;

    mobileMenu.classList.remove('hidden');
    void mobileMenu.offsetHeight;

    mobileMenu.classList.add('mobile-menu-open');
    menuToggle.classList.add('open');

    menuToggle.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('mobile-menu-active');
}

function closeMobileMenu() {
    if (!mobileMenu) return;

    mobileMenu.classList.remove('mobile-menu-open');
    menuToggle.classList.remove('open');

    menuToggle.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('mobile-menu-active');

    setTimeout(() => {
        if (!mobileMenu.classList.contains('mobile-menu-open')) {
            mobileMenu.classList.add('hidden');
        }
    }, 650);
}

menuToggle.addEventListener('click', () => {
    if (mobileMenu.classList.contains('mobile-menu-open')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

mobileMenuClose.addEventListener('click', () => {
    closeMobileMenu();
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('mobile-menu-open')) {
        closeMobileMenu();
    }
});

// 4. أنيميشن الظهور عند التمرير (Scroll reveal)
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// =========================================
// PREMIUM SCROLL TO TOP
// =========================================

const scrollToTop = document.getElementById('scroll-to-top');

function updateScrollButton() {
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

    scrollToTop.style.setProperty('--scroll-progress', `${progress}%`);

    if (scrollTop > 500) {
        scrollToTop.classList.add('show');
    } else {
        scrollToTop.classList.remove('show');
    }
}

window.addEventListener('scroll', updateScrollButton, { passive: true });

scrollToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

updateScrollButton();

// =========================================
// PREMIUM PAGE LOADER
// =========================================

const pageLoader = document.getElementById('page-loader');
const loaderPercent = document.getElementById('loader-percent');
const loaderLine = document.querySelector('.loader-line span');

let progress = 0;

const loaderInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 2;

    if (progress >= 100) {
        progress = 100;
    }

    loaderPercent.textContent = progress;
    loaderLine.style.width = `${progress}%`;

    if (progress >= 100) {
        clearInterval(loaderInterval);

        setTimeout(() => {
            pageLoader.classList.add('loaded');
            document.body.style.overflow = '';
        }, 500);
    }
}, 80);

// Prevent scrolling while loading
document.body.style.overflow = 'hidden';

// Make sure loader disappears when everything is loaded
window.addEventListener('load', () => {
    setTimeout(() => {
        progress = 100;

        loaderPercent.textContent = '100';
        loaderLine.style.width = '100%';

        setTimeout(() => {
            pageLoader.classList.add('loaded');
            document.body.style.overflow = '';
        }, 500);
    }, 300);
});

// 5. تأثير خفيف للنافبار عند التمرير (يضيف ظل بسيط)
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        nav.classList.add('shadow-md');
    } else {
        nav.classList.remove('shadow-md');
    }
});

// Animated Counter for stat numbers
function animateCounter(el, target, suffix = '') {
    let current = 0;
    const duration = 1500;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(counter);
        }
        el.textContent = Math.floor(current) + suffix;
    }, stepTime);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count);
            const suffix = el.dataset.suffix || '';
            animateCounter(el, target, suffix);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// Mouse-follow glow in hero section (desktop only)
const heroSection = document.querySelector('section.min-h-screen');
if (heroSection && window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
        position: absolute; width: 500px; height: 500px;
        background: radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%);
        border-radius: 50%; pointer-events: none; z-index: 0;
        transform: translate(-50%, -50%); transition: opacity 0.3s ease; opacity: 0;
    `;
    heroSection.style.position = 'relative';
    heroSection.appendChild(glow);

    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        glow.style.left = (e.clientX - rect.left) + 'px';
        glow.style.top = (e.clientY - rect.top) + 'px';
        glow.style.opacity = '1';
    });
    heroSection.addEventListener('mouseleave', () => glow.style.opacity = '0');
}

// Magnetic buttons
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
        btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    btn.addEventListener('mousedown', () => btn.style.transition = 'none');
});
