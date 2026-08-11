document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('siteHeader');
    const menuButton = document.getElementById('menuButton');
    const menuClose = document.getElementById('menuClose');
    const mobileMenu = document.getElementById('mobileMenu');

    const toggleHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 22);
    toggleHeader();
    window.addEventListener('scroll', toggleHeader, { passive: true });

    const setMenu = isOpen => {
        if (!mobileMenu || !menuButton) return;
        mobileMenu.classList.toggle('is-open', isOpen);
        mobileMenu.setAttribute('aria-hidden', String(!isOpen));
        menuButton.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('menu-open', isOpen);
    };
    menuButton?.addEventListener('click', () => setMenu(true));
    menuClose?.addEventListener('click', () => setMenu(false));
    mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });

    document.querySelectorAll('.nav-dropdown > button').forEach(button => {
        button.addEventListener('click', () => {
            const dropdown = button.parentElement;
            const isOpen = button.getAttribute('aria-expanded') === 'true';
            document.querySelectorAll('.nav-dropdown > button').forEach(item => item.setAttribute('aria-expanded', 'false'));
            button.setAttribute('aria-expanded', String(!isOpen));
            dropdown?.classList.toggle('is-open', !isOpen);
        });
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -24px' });
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));

    const appointmentForm = document.getElementById('appointmentForm');
    appointmentForm?.addEventListener('submit', event => {
        event.preventDefault();
        if (!appointmentForm.reportValidity()) return;

        const data = new FormData(appointmentForm);
        const recipient = appointmentForm.dataset.mailRecipient || appointmentForm.action.replace('mailto:', '');
        const fieldLabels = { ad_soyad: 'Ad Soyad', telefon: 'Telefon', email: 'E-posta', tedavi: 'İlgilenilen Tedavi', mesaj: 'Not' };
        const lines = ['Kaya Alp web sitesi üzerinden yeni randevu talebi:', ''];
        Object.entries(fieldLabels).forEach(([key, label]) => {
            const value = String(data.get(key) || '').trim();
            if (value) lines.push(`${label}: ${value}`);
        });
        lines.push('', 'KVKK onayı: Verildi');
        const subject = `Randevu Talebi — ${data.get('ad_soyad')}`;
        const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
        window.location.href = mailto;
        const feedback = appointmentForm.querySelector('.form-feedback');
        if (feedback) feedback.textContent = 'E-posta uygulamanız açılıyor. Talebinizi gönderdikten sonra ekibimiz sizinle iletişime geçecektir.';
    });
});
