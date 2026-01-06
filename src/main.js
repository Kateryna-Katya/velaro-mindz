document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация иконок
    lucide.createIcons();

    // 2. МОБИЛЬНОЕ МЕНЮ
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    const toggleMenu = () => {
        burgerBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    };

    burgerBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) toggleMenu();
        });
    });

    // 3. GSAP АНИМАЦИИ
    gsap.registerPlugin(ScrollTrigger);

    // Анимация Hero
    gsap.from(".hero__title", {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power4.out"
    });

    // Анимация появления секций при скролле
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
            },
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power2.out"
        });
    });

    // 4. ЛОГИКА КАПЧИ
    const captchaLabel = document.getElementById('captchaLabel');
    if (captchaLabel) {
        const n1 = Math.floor(Math.random() * 10);
        const n2 = Math.floor(Math.random() * 5);
        const result = n1 + n2;
        captchaLabel.innerText = `${n1} + ${n2} = ?`;

        // 5. ВАЛИДАЦИЯ ФОРМЫ
        const contactForm = document.getElementById('mainForm');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const captchaInput = document.getElementById('captchaInput').value;
            const status = document.getElementById('formStatus');

            if (parseInt(captchaInput) !== result) {
                alert("Ошибка: Неверный ответ на капчу.");
                return;
            }

            status.innerText = "Отправка сообщения...";
            status.className = "form-status active";

            // Имитация AJAX
            setTimeout(() => {
                status.innerText = "Ваш запрос успешно отправлен! Платформа уже доступна в Европе.";
                status.classList.add('success');
                contactForm.reset();
            }, 2000);
        });
    }

    // 6. COOKIE POPUP
    const cookiePopup = document.getElementById('cookiePopup');
    const acceptCookies = document.getElementById('acceptCookies');

    if (!localStorage.getItem('velaro_cookies')) {
        setTimeout(() => {
            cookiePopup.style.display = 'block';
            gsap.from(cookiePopup, { y: 100, opacity: 0 });
        }, 3000);
    }

    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('velaro_cookies', 'true');
        cookiePopup.style.display = 'none';
    });
});