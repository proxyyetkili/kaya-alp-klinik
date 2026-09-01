document.addEventListener('DOMContentLoaded', () => {
    const treatmentGroups = [
        { title: 'İmplant çözümleri', items: [['dental-implant', 'Dental implant'], ['all-on-four', 'All-on-4 implant'], ['implant-planlama', 'Dijital implant planlama'], ['kemik-guclendirme', 'Kemik güçlendirme uygulamaları']] },
        { title: 'Estetik diş hekimliği', items: [['lamine-kaplama', 'Lamine kaplama'], ['zirkonyum-kaplama', 'Zirkonyum kaplama'], ['porselen-kaplama', 'Porselen kaplama'], ['emax-kaplama', 'E-max kaplama'], ['gulus-tasarimi', 'Gülüş tasarımı'], ['pembe-estetik', 'Diş eti estetiği']] },
        { title: 'Restoratif tedaviler', items: [['kompozit-dolgu', 'Kompozit dolgu'], ['inlay-onlay', 'Inlay / onlay restorasyonlar'], ['estetik-dolgu', 'Estetik dolgu'], ['dis-asinmasi', 'Diş aşınması'], ['dis-kiriklari', 'Diş kırıkları tedavisi']] },
        { title: 'Ortodonti', items: [['seffaf-plak', 'Şeffaf plak'], ['seffaf-braket', 'Şeffaf braket'], ['ortodontik-muayene', 'Ortodontik değerlendirme']] },
        { title: 'Çocuk diş sağlığı', items: [['cocuk-muayenesi', 'Çocuk diş muayenesi'], ['sut-disi-dolgusu', 'Süt dişi dolgusu'], ['sut-disi-kanal', 'Süt dişi kanal tedavisi'], ['cocuk-travma', 'Çocuklarda diş travması'], ['pulpotomi', 'Pulpotomi uygulaması']] },
        { title: 'Ağız, çene ve cerrahi', items: [['gomulu-dis', 'Gömülü diş çekimi'], ['cene-eklemi', 'Çene eklemi değerlendirmesi'], ['apikal-rezeksiyon', 'Apikal rezeksiyon'], ['bruksizm', 'Bruksizm ve gece plağı'], ['masseter', 'Masseter botoksu']] },
        { title: 'Endodonti', items: [['kanal-tedavisi', 'Kanal tedavisi'], ['fiber-post', 'Fiber post uygulaması'], ['intrakoronal-beyazlatma', 'İntrakoronal beyazlatma']] },
        { title: 'Protez tedavileri', items: [['hareketli-protez', 'Hareketli protez'], ['barli-protez', 'Barlı protez'], ['atasmanli-protez', 'Ataşmanlı protez']] },
        { title: 'Diş eti sağlığı', items: [['dis-tasi', 'Diş taşı temizliği'], ['dis-eti-cekilmesi', 'Diş eti çekilmesi'], ['flap-operasyonu', 'Periodontal cerrahi'], ['agiz-kokusu', 'Ağız kokusu değerlendirmesi'], ['dis-eti-grefti', 'Diş eti grefti']] },
        { title: 'Dijital klinik teknolojileri', items: [['dental-tomografi', '3D dental tomografi'], ['panoramik-rontgen', 'Panoramik röntgen'], ['dijital-olcu', 'Dijital ölçü'], ['dijital-anestezi', 'Dijital anestezi'], ['sedasyon', 'Sedasyon ve genel anestezi']] }
    ];
    const treatmentHref = id => `tedavi.html?tedavi=${encodeURIComponent(id)}`;
    const link = (href, label, className = '') => `<a class="${className}" href="${href}"><span>${label}</span></a>`;
    const treatmentMega = treatmentGroups.map(group => `<section class="mega-group"><a class="mega-group__title" href="tedavilerimiz.html">${group.title}<i class="fa-solid fa-chevron-right"></i></a><div class="mega-group__links">${group.items.map(([id, label]) => link(treatmentHref(id), label)).join('')}</div></section>`).join('');
    const corporateLinks = [['kurumsal.html', 'Hakkımızda'], ['kurumsal-bilgi.html?konu=kariyer', 'Kariyer'], ['kurumsal-bilgi.html?konu=idari-kadro', 'İdari kadro'], ['kurumsal-bilgi.html?konu=kurumsal-kimlik', 'Kurumsal kimlik']];
    const pageName = location.pathname.split('/').pop() || 'index.html';
    const isHome = pageName === 'index.html' || pageName === '';
    const active = name => pageName === name || (name === 'tedavilerimiz.html' && pageName === 'tedavi.html') || (name === 'kurumsal.html' && pageName === 'kurumsal-bilgi.html') || (name === 'hekimlerimiz.html' && pageName === 'doktor.html') ? 'active' : '';
    const header = document.getElementById('siteHeader');
    const mobileMenu = document.getElementById('mobileMenu');

    if (header && mobileMenu) {
        header.innerHTML = `<div class="shell header-inner"><a class="brand" href="index.html" aria-label="Kaya Alp Ana Sayfa"><img src="https://media.nevasiteyonetimi.com/kayaalpdis/logo.png" alt="Kaya Alp Ağız ve Diş Sağlığı Polikliniği"></a><nav class="desktop-nav" aria-label="Ana navigasyon"><a class="${active('index.html')}" href="index.html">Anasayfa</a><div class="nav-dropdown ${active('kurumsal.html')}"><button type="button" aria-expanded="false">Kurumsal <i class="fa-solid fa-chevron-down"></i></button><div class="dropdown-panel dropdown-panel--corporate"><section class="mega-group mega-group--compact"><p class="mega-group__title">Kurumsal bilgiler</p><div class="mega-group__links">${corporateLinks.map(([href, label]) => link(href, label)).join('')}</div></section></div></div><div class="nav-dropdown ${active('tedavilerimiz.html')}"><button type="button" aria-expanded="false">Tedavilerimiz <i class="fa-solid fa-chevron-down"></i></button><div class="dropdown-panel dropdown-panel--mega">${treatmentMega}</div></div><div class="nav-dropdown ${active('subelerimiz.html')}"><button type="button" aria-expanded="false">Kliniğimiz <i class="fa-solid fa-chevron-down"></i></button><div class="dropdown-panel dropdown-panel--clinic">${link('subelerimiz.html', 'Klinik lokasyonumuz')}${link('subelerimiz.html?bolum=ulasim', 'Ulaşım ve ziyaret bilgisi')}</div></div><a class="${active('hekimlerimiz.html')}" href="hekimlerimiz.html">Hekimlerimiz</a><a class="${active('saglik-rehberi.html')}" href="saglik-rehberi.html">Sağlık Rehberi</a><a class="${active('iletisim.html')}" href="iletisim.html">İletişim</a><a class="${active('sss.html')}" href="sss.html">S.S.S.</a></nav><div class="header-actions"><a class="header-phone" href="tel:+902824400287" aria-label="Bizi arayın"><i class="fa-solid fa-phone"></i></a><a class="button button--header" href="randevu-talebi.html">Randevu Talebi <i class="fa-solid fa-arrow-up-right-from-square"></i></a><button class="menu-button" id="menuButton" aria-label="Menüyü aç" aria-controls="mobileMenu" aria-expanded="false"><span></span><span></span></button></div></div>`;
        const mobileTreatment = treatmentGroups.map(group => `<details class="mobile-nav-group"><summary>${group.title}<i class="fa-solid fa-plus"></i></summary><div class="mobile-subnav">${group.items.map(([id, label]) => link(treatmentHref(id), label)).join('')}</div></details>`).join('');
        mobileMenu.innerHTML = `<div class="mobile-menu__top"><img src="https://media.nevasiteyonetimi.com/kayaalpdis/logo.png" alt="Kaya Alp"><button type="button" id="menuClose" aria-label="Menüyü kapat"><i class="fa-solid fa-xmark"></i></button></div><nav aria-label="Mobil navigasyon"><a href="index.html">Anasayfa</a><details class="mobile-nav-group"><summary>Kurumsal<i class="fa-solid fa-plus"></i></summary><div class="mobile-subnav">${corporateLinks.map(([href, label]) => link(href, label)).join('')}</div></details><details class="mobile-nav-group"><summary>Tedavilerimiz<i class="fa-solid fa-plus"></i></summary><div class="mobile-subnav mobile-subnav--groups">${mobileTreatment}</div></details><details class="mobile-nav-group"><summary>Kliniğimiz<i class="fa-solid fa-plus"></i></summary><div class="mobile-subnav">${link('subelerimiz.html', 'Klinik lokasyonumuz')}${link('subelerimiz.html?bolum=ulasim', 'Ulaşım ve ziyaret bilgisi')}</div></details><a href="hekimlerimiz.html">Hekimlerimiz</a><a href="saglik-rehberi.html">Sağlık Rehberi</a><a href="iletisim.html">İletişim</a><a href="sss.html">Sık sorulan sorular</a></nav><div class="mobile-menu__bottom"><a href="tel:+902824400287">(0282) 440 02 87</a><a class="button" href="randevu-talebi.html">Randevu Talebi</a></div>`;
        const headerLogo = header.querySelector('.brand img');
        const updateHeaderLogo = () => {
            if (headerLogo) headerLogo.src = window.innerWidth <= 900
                ? 'https://media.nevasiteyonetimi.com/kayaalpdis/logo.png'
                : 'https://media.nevasiteyonetimi.com/kayaalpdis/logoyatay.png';
        };
        updateHeaderLogo();
        window.addEventListener('resize', updateHeaderLogo, { passive: true });
    }

    const homeDoctorPhotos = {
        'doctor-photo--one': ['https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=85', 'Temsili kadın diş hekimi portresi'],
        'doctor-photo--two': ['https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=85', 'Temsili erkek diş hekimi portresi'],
        'doctor-photo--three': ['https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=900', 'Temsili kadın diş hekimi portresi']
    };
    document.querySelectorAll('.doctors-page-grid .doctor-photo').forEach(photo => {
        if (photo.querySelector('img')) return;
        const source = Object.entries(homeDoctorPhotos).find(([className]) => photo.classList.contains(className))?.[1];
        if (source) photo.insertAdjacentHTML('afterbegin', `<img src="${source[0]}" alt="${source[1]}" loading="lazy">`);
    });
    const doctorsPageGrid = document.querySelector('.doctors-page-grid');
    if (doctorsPageGrid) {
        const doctorsPageIntro = doctorsPageGrid.previousElementSibling;
        if (doctorsPageIntro?.classList.contains('page-intro')) {
            doctorsPageIntro.innerHTML = '<p class="eyebrow">HEKİMLERİMİZ</p><h2>Uzmanlık, güven ve<br><span class="accent">ortak bir vizyon.</span></h2>';
        }
        doctorsPageGrid.className = 'doctor-grid doctors-page-grid';
        doctorsPageGrid.innerHTML = `<article class="doctor-card" data-reveal><div class="doctor-photo doctor-photo--one"><img src="${homeDoctorPhotos['doctor-photo--one'][0]}" alt="${homeDoctorPhotos['doctor-photo--one'][1]}" loading="lazy"></div><div><p>ESTETİK DİŞ HEKİMLİĞİ</p><h3>Dr. Ecem Kaya</h3><a href="doktor.html?hekim=ecem-kaya">Profil <i class="fa-solid fa-arrow-up-right-from-square"></i></a></div></article><article class="doctor-card" data-reveal><div class="doctor-photo doctor-photo--two"><img src="${homeDoctorPhotos['doctor-photo--two'][0]}" alt="${homeDoctorPhotos['doctor-photo--two'][1]}" loading="lazy"></div><div><p>İMPLANTOLOJİ &amp; CERRAHİ</p><h3>Dr. Mert Alp</h3><a href="doktor.html?hekim=mert-alp">Profil <i class="fa-solid fa-arrow-up-right-from-square"></i></a></div></article><article class="doctor-card" data-reveal><div class="doctor-photo doctor-photo--three"><img src="${homeDoctorPhotos['doctor-photo--three'][0]}" alt="${homeDoctorPhotos['doctor-photo--three'][1]}" loading="lazy"></div><div><p>ORTODONTİ &amp; PEDODONTİ</p><h3>Dr. Selin Arda</h3><a href="doktor.html?hekim=selin-arda">Profil <i class="fa-solid fa-arrow-up-right-from-square"></i></a></div></article>`;
    }
    document.querySelectorAll('.doctor-card').forEach(card => {
        const profileLink = card.querySelector('a[href^="doktor.html?hekim="]');
        if (!profileLink) return;
        const profileHref = profileLink.getAttribute('href');
        card.setAttribute('role', 'link');
        card.tabIndex = 0;
        card.addEventListener('click', event => {
            if (event.target.closest('a, button')) return;
            location.href = profileHref;
        });
        card.addEventListener('keydown', event => {
            if (event.target.closest('a, button') || (event.key !== 'Enter' && event.key !== ' ')) return;
            event.preventDefault();
            location.href = profileHref;
        });
    });
    const menuButton = document.getElementById('menuButton');
    const menuClose = document.getElementById('menuClose');
    const syncAnchorOffset = () => document.documentElement.style.setProperty('--header-offset', `${(header?.offsetHeight || 72) + 22}px`);
    const toggleHeader = () => { header?.classList.toggle('is-scrolled', !isHome || window.scrollY > 22); syncAnchorOffset(); };
    toggleHeader(); window.addEventListener('scroll', toggleHeader, { passive: true }); window.addEventListener('resize', syncAnchorOffset, { passive: true });
    const setMenu = isOpen => { if (!mobileMenu || !menuButton) return; mobileMenu.classList.toggle('is-open', isOpen); mobileMenu.setAttribute('aria-hidden', String(!isOpen)); menuButton.setAttribute('aria-expanded', String(isOpen)); document.body.classList.toggle('menu-open', isOpen); };
    menuButton?.addEventListener('click', () => setMenu(true)); menuClose?.addEventListener('click', () => setMenu(false)); mobileMenu?.querySelectorAll('a').forEach(item => item.addEventListener('click', () => setMenu(false))); document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
    document.querySelectorAll('.nav-dropdown > button').forEach(button => button.addEventListener('click', event => { event.stopPropagation(); const dropdown = button.parentElement; const wasOpen = dropdown?.classList.contains('is-open'); document.querySelectorAll('.nav-dropdown').forEach(item => item.classList.remove('is-open')); document.querySelectorAll('.nav-dropdown > button').forEach(item => item.setAttribute('aria-expanded', 'false')); if (!wasOpen) { dropdown?.classList.add('is-open'); button.setAttribute('aria-expanded', 'true'); } }));
    document.addEventListener('click', () => document.querySelectorAll('.nav-dropdown').forEach(item => item.classList.remove('is-open')));
    const secondaryHeroImages = {
        'kurumsal.html': 'https://images.pexels.com/photos/4269682/pexels-photo-4269682.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'kurumsal-bilgi.html': 'https://images.pexels.com/photos/4270379/pexels-photo-4270379.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'tedavilerimiz.html': 'https://images.pexels.com/photos/6812521/pexels-photo-6812521.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'hekimlerimiz.html': 'https://images.pexels.com/photos/6812569/pexels-photo-6812569.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'saglik-rehberi.html': 'https://images.pexels.com/photos/4269946/pexels-photo-4269946.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'iletisim.html': 'https://images.pexels.com/photos/3952124/pexels-photo-3952124.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'subelerimiz.html': 'https://images.pexels.com/photos/4269948/pexels-photo-4269948.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'sss.html': 'https://images.pexels.com/photos/19879746/pexels-photo-19879746/free-photo-of-a-dentist-performing-a-medical-procedure-on-a-patient.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'randevu-talebi.html': 'https://images.pexels.com/photos/15225509/pexels-photo-15225509/free-photo-of-silhouettes-of-dentists-working-with-patient-in-chair-in-clinic.jpeg?auto=compress&cs=tinysrgb&w=1920'
    };
    const applySecondaryHeroImage = () => {
        const image = secondaryHeroImages[pageName];
        if (!image) return;
        document.querySelectorAll('.inner-hero:not(.treatment-detail-hero)').forEach(hero => { hero.classList.add('page-hero-visual'); hero.style.setProperty('--page-hero', `url('${image}')`); });
        const appointmentPage = document.querySelector('.appointment-page');
        if (appointmentPage) { appointmentPage.classList.add('page-hero-visual', 'appointment-page--visual'); appointmentPage.style.setProperty('--page-hero', `url('${image}')`); }
    };
    applySecondaryHeroImage();
    const footerMarkup = `<div class="shell footer-main footer-main--expanded"><div class="footer-intro"><a class="footer-brand" href="index.html" aria-label="Kaya Alp ana sayfa"><img src="https://media.nevasiteyonetimi.com/kayaalpdis/logo.png" alt="Kaya Alp Ağız ve Diş Sağlığı Polikliniği"></a><p>Bilimsel, etik ve insani yaklaşımı bir araya getiren çağdaş diş hekimliği deneyimi.</p><p class="footer-location">Tekirdağ, Hürriyet Mahallesi, Değirmenaltı ve çevresinden gelen hastalar için planlı bakım ve şeffaf bilgilendirme.</p></div><div><p>KEŞFET</p><a href="kurumsal.html">Kurumsal</a><a href="tedavilerimiz.html">Tedavilerimiz</a><a href="hekimlerimiz.html">Hekimlerimiz</a><a href="subelerimiz.html">Kliniğimiz</a><a href="sss.html">Sık sorulan sorular</a></div><div><p>TEDAVİLER</p><a href="${treatmentHref('dental-implant')}">Dental implant</a><a href="${treatmentHref('gulus-tasarimi')}">Gülüş tasarımı</a><a href="${treatmentHref('seffaf-plak')}">Şeffaf plak</a><a href="${treatmentHref('kanal-tedavisi')}">Kanal tedavisi</a><a href="${treatmentHref('dis-tasi')}">Diş eti sağlığı</a></div><div><p>BİLGİ MERKEZİ</p><a href="saglik-rehberi.html">Sağlık rehberi</a><a href="randevu-talebi.html">Randevu talebi</a><a href="iletisim.html">İletişim</a><a href="iletisim.html#ulasim">Ulaşım bilgisi</a><a href="kurumsal-bilgi.html?konu=kalite-politikasi">Kalite politikamız</a></div><div class="footer-contact"><p>İLETİŞİM</p><a href="tel:+902824400287">(0282) 440 02 87</a><a href="mailto:info@kayaalpdis.com">info@kayaalpdis.com</a><a href="iletisim.html">Süleymanpaşa / Tekirdağ</a><span>Pzt - Cmt · 09.00 - 19.00</span><div class="footer-social" aria-label="Sosyal medya"><a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a><a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a><a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a></div></div></div><div class="shell footer-bottom"><span>© ${new Date().getFullYear()} Kaya Alp Ağız ve Diş Sağlığı Polikliniği</span><div><a href="kurumsal-bilgi.html?konu=kalite-politikasi">KVKK</a><a href="kurumsal-bilgi.html?konu=kalite-politikasi">Gizlilik</a><a href="iletisim.html">İletişim</a></div></div>`;
    document.querySelectorAll('.site-footer').forEach(footer => { footer.innerHTML = footerMarkup; });
    if (!document.querySelector('.sticky-appointment')) {
        const stickyAppointment = `<aside class="sticky-appointment is-open" aria-label="Hızlı randevu talebi"><button class="sticky-appointment__heading" type="button" aria-expanded="true" aria-controls="stickyAppointmentPanel"><span class="sticky-appointment__heading-copy"><span class="sticky-appointment__eyebrow">HIZLI RANDEVU</span><span class="sticky-appointment__title">Size ulaşalım</span></span><i class="sticky-appointment__toggle fa-solid fa-chevron-down" aria-hidden="true"></i></button><div class="sticky-appointment__panel" id="stickyAppointmentPanel"><form class="appointment-form is-visible sticky-appointment__form" data-appointment-form action="mailto:randevu@kayaalpdis.com" method="post" enctype="text/plain" data-mail-recipient="randevu@kayaalpdis.com"><label>Adınız soyadınız<input name="ad_soyad" autocomplete="name" required></label><label>Telefon numaranız<input name="telefon" type="tel" autocomplete="tel" required></label><label>İlgilendiğiniz alan<select name="tedavi" required><option value="" selected disabled>Seçim yapın</option><option>İmplant tedavileri</option><option>Estetik gülüş tasarımı</option><option>Ortodonti</option><option>Genel muayene</option><option>Diğer</option></select></label><label class="consent"><input name="kvkk" type="checkbox" value="KVKK aydınlatma metnini okudum ve iletişim kurulmasını kabul ediyorum." required><span></span> İletişim kurulmasını kabul ediyorum.</label><button class="button" type="submit">Talep gönder <i class="fa-regular fa-paper-plane"></i></button><a href="randevu-talebi.html">Detaylı randevu formu <i class="fa-solid fa-arrow-right"></i></a><p class="form-feedback" role="status"></p></form></div></aside>`;
        const footer = document.querySelector('.site-footer');
        if (footer) footer.insertAdjacentHTML('beforebegin', stickyAppointment);
        else document.body.insertAdjacentHTML('beforeend', stickyAppointment);
    }
    document.querySelectorAll('.sticky-appointment__heading').forEach(button => {
        const card = button.closest('.sticky-appointment');
        if (!card) return;
        button.addEventListener('click', () => {
            const isOpen = card.classList.toggle('is-open');
            button.setAttribute('aria-expanded', String(isOpen));
        });
    });
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .12, rootMargin: '0px 0px -24px' }); document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));

    const bindAppointmentForm = form => form.addEventListener('submit', event => { event.preventDefault(); if (!form.reportValidity()) return; const data = new FormData(form); const recipient = form.dataset.mailRecipient || form.action.replace('mailto:', ''); const labels = { ad_soyad: 'Ad Soyad', telefon: 'Telefon', email: 'E-posta', tedavi: 'İlgilenilen Tedavi', mesaj: 'Not' }; const lines = ['Kaya Alp web sitesi üzerinden yeni randevu talebi:', '']; Object.entries(labels).forEach(([key, label]) => { const value = String(data.get(key) || '').trim(); if (value) lines.push(`${label}: ${value}`); }); lines.push('', 'KVKK onayı: Verildi'); window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(`Randevu Talebi — ${data.get('ad_soyad')}`)}&body=${encodeURIComponent(lines.join('\n'))}`; const feedback = form.querySelector('.form-feedback'); if (feedback) feedback.textContent = 'E-posta uygulamanız açılıyor. Talebinizi gönderdikten sonra ekibimiz sizinle iletişime geçecektir.'; });
    document.querySelectorAll('#appointmentForm,[data-appointment-form]').forEach(bindAppointmentForm);

    document.querySelectorAll('[data-auto-carousel]').forEach(track => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || track.children.length < 2) return;
        let isPaused = false;
        const advance = () => {
            if (isPaused || document.hidden) return;
            const firstCard = track.children[0];
            const gap = Number.parseFloat(getComputedStyle(track).columnGap) || Number.parseFloat(getComputedStyle(track).gap) || 0;
            const step = Math.ceil(firstCard.getBoundingClientRect().width + gap);
            const end = Math.max(0, track.scrollWidth - track.clientWidth);
            const isAtEnd = track.scrollLeft >= end - 4;
            const next = isAtEnd ? 0 : Math.min(end, track.scrollLeft + step);
            track.scrollTo({ left: next, behavior: isAtEnd ? 'auto' : 'smooth' });
        };
        const pause = () => { isPaused = true; };
        const resume = () => { isPaused = false; };
        track.addEventListener('pointerenter', pause);
        track.addEventListener('pointerleave', resume);
        track.addEventListener('focusin', pause);
        track.addEventListener('focusout', resume);
        window.setInterval(advance, 4600);
    });

    const xrayForm = document.getElementById('xrayForm');
    if (xrayForm) xrayForm.addEventListener('submit', event => {
        event.preventDefault();
        if (!xrayForm.reportValidity()) return;
        const data = new FormData(xrayForm);
        const recipient = xrayForm.dataset.mailRecipient || xrayForm.action.replace('mailto:', '');
        const labels = { ad_soyad: 'İsim Soyisim', email: 'E-mail Adres', telefon: 'Telefon', sube: 'Şube', mesaj: 'Mesajınız', iletisim_tercihi: 'İletişim Tercihi' };
        const lines = ['Kaya Alp web sitesi üzerinden röntgen gönderim talebi:', ''];
        Object.entries(labels).forEach(([key, label]) => {
            const value = String(data.get(key) || '').trim();
            if (value) lines.push(`${label}: ${value}`);
        });
        lines.push('', 'K.V.K.K. onayı: Verildi');
        const feedback = xrayForm.querySelector('.form-feedback');
        if (feedback) feedback.textContent = 'E-posta uygulamanız açılıyor. Gönderimi tamamladıktan sonra ekibimiz sizinle iletişime geçecektir.';
        window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(`Röntgen Gönder — ${data.get('ad_soyad')}`)}&body=${encodeURIComponent(lines.join('\n'))}`;
    });

    const detailRoot = document.querySelector('[data-treatment-detail]');
    if (detailRoot) {
        const requested = new URLSearchParams(location.search).get('tedavi') || 'dental-implant';
        const treatment = treatmentGroups.flatMap(group => group.items.map(([id, title]) => ({ id, title, group: group.title }))).find(item => item.id === requested) || { id: 'dental-implant', title: 'Dental implant', group: 'İmplant çözümleri' };
        const heroImageSources = [
            'https://www.trakyadent.com.tr/wp-content/uploads/2025/09/227.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2025/10/all-on-four-nedir.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2025/09/227.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2026/08/kemik-artirma-islemi.jpg',
            'https://www.trakyadent.com.tr/wp-content/uploads/2025/10/lamine-dis-nasil-uygulanir.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2025/10/zirkonyum-kaplama-fiyatlari.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2025/10/porselen-kaplama-nasil-uygulanir.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2025/10/emax-kaplama-nasil-uygulanir.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2025/07/gulus-tasarimi-nedir.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2026/07/pembe-estetik.jpg',
            'https://www.trakyadent.com.tr/wp-content/uploads/2025/09/dis-dolgusu.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2025/09/inlay-onlay-dolgu.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2025/09/estetik-dolgu-nasil-yapilir.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2026/07/dis-asinmasi.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2026/08/dis-kiriklari.jpg',
            'https://www.trakyadent.com.tr/wp-content/uploads/2026/07/seffaf-plak.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2026/07/seffaf-braket.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2026/07/seffaf-braket.jpg',
            'https://www.trakyadent.com.tr/wp-content/uploads/2025/09/ilk-dis-muayenesi.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2026/07/sut-disi-dolgusu.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2026/07/sut-disi-kanal-tedavisi.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2026/07/cocuklarda-dis-travmasi.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2026/08/sut-disi-pulpotomi.jpg',
            'https://www.trakyadent.com.tr/wp-content/uploads/2025/10/20-yas-dis-cekimi.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2025/10/cene-ve-eklem-rahatsizliklari-nelerdir.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2026/07/apikal-rezeksiyon.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2025/09/bruksizm-nedir.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2025/10/masseter-botoksu.jpg',
            'https://www.trakyadent.com.tr/wp-content/uploads/2025/09/kanal-tedavisi-ic-sayfa.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2025/09/fiber-post-uygulamasi-nedir.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2026/07/intrakuronal-beyazlatma.jpg',
            'https://www.trakyadent.com.tr/wp-content/uploads/2026/07/hareketli-protez.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2026/07/barli-protez.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2026/08/locator-atacmanli-protez.jpg',
            'https://www.trakyadent.com.tr/wp-content/uploads/2025/09/dis-tasi-temizligi.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2025/09/dis-eti-cekilmesi.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2026/07/flap-operasyonu.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2025/09/agiz-kokusu-nedir.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2026/07/bag-doku-grefti.jpg',
            'https://www.trakyadent.com.tr/wp-content/uploads/2025/07/dental-tomografide-radyasyon-var-midir-1024x679-1.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2025/09/dis-rontgeni-nedir.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2026/07/dijital-olcu.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2026/07/dijital-anestezi.jpg', 'https://www.trakyadent.com.tr/wp-content/uploads/2025/09/sedasyon-ic-sayfa.jpg'
        ];
        const treatmentIndex = treatmentGroups.flatMap(group => group.items).findIndex(([id]) => id === treatment.id);
        const heroImage = heroImageSources[treatmentIndex] || heroImageSources[0];
        const heroFocusPositions = {
            'dental-implant': '50% 56%', 'all-on-four': '51% 53%', 'implant-planlama': '54% center', 'kemik-guclendirme': '55% center',
            'lamine-kaplama': '57% center', 'zirkonyum-kaplama': '52% center', 'porselen-kaplama': '56% center', 'emax-kaplama': '54% center', 'gulus-tasarimi': '59% center', 'pembe-estetik': '56% center',
            'kompozit-dolgu': '55% center', 'inlay-onlay': '57% center', 'estetik-dolgu': '55% center', 'dis-asinmasi': '58% center', 'dis-kiriklari': '56% center',
            'seffaf-plak': '56% center', 'seffaf-braket': '54% center', 'ortodontik-muayene': '56% center',
            'cocuk-muayenesi': '58% center', 'sut-disi-dolgusu': '57% center', 'sut-disi-kanal': '57% center', 'cocuk-travma': '58% center', 'pulpotomi': '56% center',
            'gomulu-dis': '58% center', 'cene-eklemi': '57% center', 'apikal-rezeksiyon': '58% center', 'bruksizm': '56% center', 'masseter': '58% center',
            'kanal-tedavisi': '57% center', 'fiber-post': '56% center', 'intrakoronal-beyazlatma': '57% center',
            'hareketli-protez': '56% center', 'barli-protez': '57% center', 'atasmanli-protez': '56% center',
            'dis-tasi': '57% center', 'dis-eti-cekilmesi': '57% center', 'flap-operasyonu': '58% center', 'agiz-kokusu': '56% center', 'dis-eti-grefti': '57% center',
            'dental-tomografi': '58% center', 'panoramik-rontgen': '57% center', 'dijital-olcu': '57% center', 'dijital-anestezi': '58% center', 'sedasyon': '57% center'
        };
        const heroFocusPosition = heroFocusPositions[treatment.id] || 'center';
        const implant = treatment.id === 'dental-implant';
        const profile = implant ? { lead: 'Dental implant, eksik dişlerin yerine çene kemiğine yerleştirilen titanyum kökler ve bunların üzerine planlanan protezlerle fonksiyonun desteklenmesini amaçlayan tedavi yaklaşımıdır.', intro: 'Tek diş eksikliğinden birden fazla diş kaybına kadar farklı durumlarda değerlendirilebilen implant planı; kemik yapısı, diş eti sağlığı, kapanış ilişkisi ve genel sağlık durumu birlikte ele alınarak hazırlanır.', sections: [['İmplant tedavisi hangi yararları sağlayabilir?', 'Eksik diş bölgesinin desteklenmesi; çiğneme fonksiyonu, konuşma ve estetik beklentiler açısından değerlendirilebilir. Uygun vakalarda komşu dişlere işlem yapılmadan sabit bir çözüm planlanması mümkün olabilir. Olası yararlar ve sınırlar, muayene sonrasında hekim tarafından kişiye özel olarak açıklanır.'], ['Planlama süreci nasıl ilerler?', 'İlk değerlendirmede genel sağlık öyküsü alınır; ağız içi muayene ve gerekli görüntüleme yöntemleri kullanılır. Üç boyutlu görüntüleme, implant konumu ve çevre anatomik yapıların incelenmesine yardımcı olabilir. Bu verilerle cerrahi ve üst yapı için aşamalı bir plan hazırlanır.'], ['Uygulama ve takip döneminde neler olur?', 'Cerrahi işlem, uygun anestezi koşullarında ve steril ortamda gerçekleştirilir. İşlem sonrasında iyileşme süreci, kontroller ve kişisel ağız bakım önerileri önem taşır. Üst yapının zamanlaması; kemik kalitesi, ek uygulamalar ve klinik değerlendirmenin sonucuna göre değişebilir.']], faqs: [['İmplant tedavisi herkese uygulanabilir mi?', 'Uygunluk; genel sağlık, kemik ve diş eti durumu ile kullanılan ilaçlar birlikte değerlendirilerek belirlenir.'], ['İşlem sırasında ağrı hissedilir mi?', 'Uygulama sırasında bölgesel anestezi kullanılır. Konfor ihtiyacı ve klinik durum için seçenekler hekim tarafından değerlendirilir.'], ['Tedavi ne kadar sürer?', 'Süre; implant sayısı, bölgenin koşulları ve ek işlemlere göre değişir. Kişisel zamanlama muayeneden sonra paylaşılır.'], ['İmplant sonrası bakım neden önemlidir?', 'Düzenli kontrol, doğru fırçalama ve arayüz temizliği implant çevresi dokuların sağlığını destekler.'], ['Aynı gün diş uygulaması mümkün müdür?', 'Bazı uygun vakalarda geçici restorasyon planlanabilir. Bu karar, klinik stabilite ve hekim değerlendirmesiyle verilir.']] } : { lead: `${treatment.title}, ${treatment.group.toLocaleLowerCase('tr-TR')} kapsamında kişinin ağız ve diş sağlığı ihtiyaçlarına göre değerlendirilen bir tedavi seçeneğidir.`, intro: 'Tedaviye uygunluk; ağız içi muayene, gerekli görüntüleme, beklentiler ve klinik koşullar birlikte değerlendirilerek belirlenir. Amaç, uygulanabilir seçenekleri anlaşılır biçimde paylaşmak ve güvenli bir tedavi süreci planlamaktır.', sections: [['İlk değerlendirme', 'Hekiminiz şikâyetinizi, medikal öykünüzü ve ağız içi bulguları birlikte ele alır. Gerektiğinde dijital görüntüleme ve ölçüm yöntemleri tedavi planını destekler.'], ['Kişiye özel planlama', `${treatment.title} için uygulanacak yaklaşım; hedeflenen sonuç, diş ve diş eti dokularının durumu ile günlük alışkanlıklarınız göz önünde bulundurularak hazırlanır.`], ['Uygulama ve takip', 'Uygulama adımları, bakım önerileri ve kontrol zamanları tedavi planı içerisinde açık biçimde paylaşılır. Tedavi sonrası takip, uzun dönem ağız sağlığının önemli bir parçasıdır.']], faqs: [['Bu tedavi bana uygun mu?', 'Uygunluk, klinik muayene ve gerekli incelemeler sonrasında belirlenir.'], ['Uygulama ne kadar sürer?', 'Süre; tedavinin kapsamına ve kişisel klinik ihtiyaçlara göre değişebilir.'], ['Tedavi sonrası nelere dikkat etmeliyim?', 'Hekiminizin bakım ve kontrol önerilerine düzenli şekilde uymanız önemlidir.'], ['Randevu öncesinde ne yapmalıyım?', 'Şikâyetlerinizi, kullandığınız ilaçları ve varsa önceki görüntülemelerinizi paylaşmanız değerlendirmeyi kolaylaştırabilir.']] };
        const localServiceNote = 'Tekirdağ, Hürriyet Mahallesi, Değirmenaltı ve çevre bölgelerden gelen randevu taleplerinde ilk hedefimiz; ihtiyacı doğru anlamak, seçenekleri açıkça konuşmak ve kontrollü bir bakım planı oluşturmaktır.';
        const groupFocus = {
            'İmplant çözümleri': 'eksik dişlerin fonksiyon, estetik ve çiğneme dengesi üzerindeki etkisini',
            'Estetik diş hekimliği': 'dişlerin rengi, formu, dizilimi ve gülüş çizgisinin birbiriyle ilişkisini',
            'Restoratif tedaviler': 'diş dokusunu mümkün olduğunca koruyarak fonksiyonu destekleme ihtiyacını',
            'Ortodonti': 'dişlerin sıralanışını, kapanış ilişkisini ve günlük ağız bakımını',
            'Çocuk diş sağlığı': 'çocuğun yaşını, gelişim dönemini, alışkanlıklarını ve koruyucu bakım gereksinimlerini',
            'Ağız, çene ve cerrahi': 'şikâyetin kaynağını, komşu anatomik yapıları ve güvenli işlem koşullarını',
            'Endodonti': 'dişin canlılığını, kök çevresi bulgularını ve korunabilir doku miktarını',
            'Protez tedavileri': 'çiğneme konforunu, konuşmayı, estetik beklentiyi ve mevcut ağız dokularını',
            'Diş eti sağlığı': 'diş eti dokusunu, kemik desteğini, günlük bakım alışkanlıklarını ve risk faktörlerini',
            'Dijital klinik teknolojileri': 'tanı sürecinde ihtiyaç duyulan görüntüleme ve ölçüm verilerini'
        };
        if (implant) {
            profile.lead = 'Dental implant, kaybedilen dişlerin kök görevini üstlenmek üzere çene kemiğinde planlanan titanyum esaslı yapılardır. Üzerine hazırlanan kişiye özel restorasyonlarla çiğneme, konuşma ve estetik beklentiler birlikte değerlendirilir.';
            profile.intro = 'Dental implant tedavisi tek bir eksik dişten çoklu diş kaybına kadar farklı ihtiyaçlarda ele alınabilir. Güvenli bir plan için kemik hacmi, diş eti sağlığı, kapanış, ağız hijyeni, sistemik sağlık durumu ve beklentiler birlikte incelenir; her aşama hasta ile anlaşılır biçimde paylaşılır.';
            profile.sections = [
                ['Dental implant nedir?', 'Dental implant; eksik diş bölgesinde kök fonksiyonunu desteklemek amacıyla çene kemiğine yerleştirilen yapay kök sistemidir. İyileşme ve klinik uygunluk değerlendirmesinin ardından implantın üzerine kron, köprü veya hareketli protezi destekleyen bir yapı planlanabilir. Tedavinin hedefi yalnızca boşluğu kapatmak değil; ağız içindeki dengeyi, çiğneme alışkanlığını ve temizlenebilirliği de birlikte ele almaktır.'],
                ['İmplant tedavisinin olası katkıları nelerdir?', 'Uygun olgularda implant destekli restorasyonlar; eksik diş alanının fonksiyonunu desteklemeye, komşu dişlere müdahale gereksinimini azaltmaya ve protez stabilitesini artırmaya yardımcı olabilir. Ancak her kişinin kemik yapısı, diş eti durumu ve beklentisi farklıdır. Bu nedenle elde edilebilecek sonuç, muayene bulgularına göre gerçekçi biçimde değerlendirilir.'],
                ['İlk muayenede hangi bilgiler değerlendirilir?', 'İlk görüşmede şikâyetiniz, genel sağlık geçmişiniz, düzenli kullandığınız ilaçlar, sigara kullanımı, varsa önceki tedavileriniz ve beklentileriniz konuşulur. Ağız içi muayene ile diş eti dokuları, kapanış, komşu dişler ve eksik alanın koşulları incelenir. Bu bilgiler, güvenli ve sürdürülebilir bir yaklaşım için temel oluşturur.'],
                ['Dijital planlama neden önemlidir?', 'Panoramik görüntüleme veya ihtiyaç halinde üç boyutlu tomografi, kemik seviyesinin ve anatomik yapıların değerlendirilmesine yardımcı olur. Dijital veriler implantın konumu, açısı ve üst yapıyla ilişkisi için planlamayı destekler. Görüntüleme tek başına karar verdirmez; hekim muayenesiyle birlikte yorumlanır.'],
                ['Cerrahi uygulama nasıl planlanır?', 'Cerrahi aşama, kişisel tedavi planına göre steril klinik koşullarda gerçekleştirilir. Lokal anestezi çoğu uygulamada yeterli olabilir; ek konfor seçenekleri ise kişinin sağlık durumu ve işlemin kapsamına göre değerlendirilir. İmplant sayısı, ek kemik veya yumuşak doku işlemi gereksinimi ve operasyonun ayrıntıları randevu öncesinde açıkça anlatılır.'],
                ['Uygulama ne kadar sürer?', 'İşlemin süresi yalnızca implantın yerleştirilmesine göre değil; gerekli hazırlıklara, implant sayısına, cerrahi erişime ve eşlik eden uygulamalara göre değişir. Bazı olgularda işlem tek seansta tamamlanabilirken, bazı planlarda kemik veya yumuşak doku iyileşmesi için ek zaman gerekebilir. Net zamanlama, muayene ve görüntüleme sonrasında paylaşılır.'],
                ['İyileşme ve üst yapı aşaması', 'İmplant ile kemik arasındaki biyolojik uyum süreci kişiden kişiye değişir. Kontrol randevularında iyileşme, ağız hijyeni ve dokuların tepkisi değerlendirilir. Uygun zamanda ölçü alınır ve diş formu, renk, kapanış ve temizlenebilirlik dikkate alınarak implant üstü restorasyon planlanır.'],
                ['Aynı gün geçici diş mümkün müdür?', 'Bazı klinik koşullarda geçici bir restorasyon planlanabilir; ancak bu yaklaşım her hasta ve her bölge için uygun değildir. İmplantın ilk stabilitesi, kemik kalitesi, kapanış kuvvetleri ve estetik gereksinimler karar sürecinde dikkate alınır. Güvenli olmayan durumlarda iyileşmeyi önceleyen farklı bir takvim önerilebilir.'],
                ['Kimler için değerlendirilir?', 'İmplant tedavisinin uygunluğu yaş tek başına belirlenmeden, genel sağlık durumu ve ağız içi koşullar birlikte değerlendirilerek kararlaştırılır. Büyüme gelişimi tamamlanmamış kişilerde, bazı sistemik hastalıklarda veya belirli ilaç kullanımlarında ek değerlendirme gerekebilir. Hekiminiz gerektiğinde ilgili branşlarla görüşmenizi isteyebilir.'],
                ['Bakım, kontrol ve maliyet planı', 'İmplant çevresi dokuların uzun dönem sağlığı için düzenli fırçalama, arayüz temizliği ve hekim kontrolleri önemlidir. Tedavi bütçesi; implant sayısı, kullanılacak üst yapı, ek cerrahi gereksinimler ve planın kapsamına göre değişir. Tüm aşamalar ve alternatifler muayene sonrasında yazılı ve şeffaf biçimde konuşulmalıdır.']
            ];
            profile.faqs = [
                ['İmplant tedavisi herkese uygulanabilir mi?', 'Uygunluk; genel sağlık, kemik ve diş eti koşulları, kullanılan ilaçlar ve ağız hijyeni birlikte değerlendirilerek belirlenir.'],
                ['Uygulama sırasında ağrı hissedilir mi?', 'İşlem sırasında kullanılan anestezi sayesinde konfor hedeflenir. İşlem sonrası süreç için kişisel bakım ve ilaç önerileri hekiminiz tarafından paylaşılır.'],
                ['İmplant sonrası ne zaman diş yapılır?', 'Üst yapının zamanlaması, iyileşme süreci ve implantın klinik stabilitesine göre planlanır. Her hasta için aynı süre geçerli değildir.'],
                ['Kemik yetersizse ne olur?', 'Bazı durumlarda ek kemik veya yumuşak doku uygulamaları değerlendirilebilir. Bunun gerekli olup olmadığı görüntüleme ve muayene ile anlaşılır.'],
                ['Sigara implant tedavisini etkiler mi?', 'Sigara kullanımı iyileşme ve ağız dokularının sağlığı üzerinde risk oluşturabilir. Kişisel durumunuz için hekiminizle açıkça konuşmanız önemlidir.'],
                ['İmplantlar doğal diş gibi temizlenir mi?', 'Düzenli fırçalama, arayüz temizliği ve profesyonel kontroller implant çevresi bakımının temel parçalarıdır. Size uygun araçlar hekim tarafından önerilir.'],
                ['Randevu öncesinde ne paylaşmalıyım?', 'Kullandığınız ilaçlar, bilinen hastalıklar, önceki görüntüler ve beklentilerinizi paylaşmanız değerlendirmeyi daha verimli hale getirir.']
            ];
        } else {
            const focus = groupFocus[treatment.group] || 'ağız ve diş sağlığı gereksinimlerini';
            profile.lead = `${treatment.title}, ${treatment.group.toLocaleLowerCase('tr-TR')} kapsamında; kişinin şikâyeti, ağız içi bulguları ve beklentileriyle birlikte değerlendirilen bir bakım seçeneğidir.`;
            profile.intro = `${treatment.title} için doğru yaklaşım, tek bir standart işlemden ibaret değildir. Hekim; ${focus} muayene, gerekli görüntüleme ve günlük alışkanlıklarla birlikte ele alır. Amaç, seçenekleri anlaşılır biçimde paylaşmak ve uzun vadeli ağız sağlığını gözeten kişisel bir plan hazırlamaktır.`;
            profile.sections = [
                [`${treatment.title} hangi durumlarda değerlendirilir?`, `${treatment.title}, kişinin mevcut şikâyetine ve klinik bulgularına göre gündeme gelebilir. Değerlendirme yalnızca görünen diş yüzeyiyle sınırlı değildir; diş eti dokuları, kapanış ilişkisi, komşu dişler, ağız bakım alışkanlıkları ve beklentiler birlikte incelenir. Böylece ihtiyaç ile uygulanabilecek yaklaşım arasında doğru bir denge kurulması hedeflenir.`],
                ['İlk muayene ve klinik değerlendirme', 'İlk randevuda sağlık geçmişi, düzenli kullanılan ilaçlar, önceki tedaviler ve mevcut şikâyetler konuşulur. Ağız içi muayene sırasında gerekli görülen alanlar detaylı biçimde değerlendirilir. İhtiyaca göre fotoğraf, röntgen, dijital ölçü veya farklı tanı yöntemleri planlamayı desteklemek için kullanılabilir.'],
                ['Kişiye özel planlama nasıl yapılır?', `Planlama aşamasında ${treatment.title.toLocaleLowerCase('tr-TR')} ile ulaşılmak istenen sonuç, işlem sınırları ve alternatif seçenekler açıkça konuşulur. Sürecin tek seansta mı yoksa aşamalı mı ilerleyeceği; mevcut dokuların durumu, işlemin kapsamı ve iyileşme gereksinimlerine göre belirlenir. Hasta, karar vermeden önce uygulama adımlarını ve bakım sorumluluklarını bilmelidir.`],
                ['Uygulama günü ve konfor yaklaşımı', 'Uygulama öncesinde işlem planı yeniden gözden geçirilir, gerekli bilgilendirme yapılır ve sorularınız yanıtlanır. Anestezi veya konfor yöntemleri, yapılacak işlemin niteliğine ve kişisel gereksinimlere göre değerlendirilir. Klinik ekip, işlem boyunca güvenlik, hijyen ve anlaşılır iletişim ilkelerini önceliklendirir.'],
                ['İyileşme, bakım ve kontroller', 'Tedavi sonrasındaki öneriler, yapılan işlemin türüne göre değişir. Beslenme, ağız hijyeni, olası hassasiyetler ve kontrol zamanları hekiminiz tarafından yazılı veya sözlü olarak paylaşılır. Düzenli takip, hem tedavinin sonucunu izlemek hem de gelecekte oluşabilecek ihtiyaçları erken fark etmek açısından önem taşır.'],
                ['Tekirdağ’da randevu ve bilgilendirme', `${localServiceNote} ${treatment.title} için ilk muayene öncesinde şikâyetlerinizi, önceki görüntülerinizi ve varsa kullandığınız ilaçları paylaşmanız planlama görüşmesini kolaylaştırabilir.`]
            ];
            profile.faqs = [
                ['Bu tedavi benim için uygun mu?', 'Uygunluk; klinik muayene, sağlık geçmişi ve gerekli incelemeler tamamlandıktan sonra belirlenir.'],
                ['Uygulama ne kadar sürer?', 'Süre; işlemin kapsamına, gerekli hazırlıklara ve kişisel klinik ihtiyaçlara göre değişir.'],
                ['İşlem öncesi nelere dikkat etmeliyim?', 'Kullandığınız ilaçları, sağlık durumunuzu ve varsa önceki görüntülerinizi hekiminizle paylaşmanız önemlidir.'],
                ['Tedavi sonrası bakım gerekli mi?', 'Evet. Hekiminizin bakım ve kontrol önerilerine düzenli uymak, ağız sağlığının korunmasına yardımcı olur.'],
                ['Alternatif tedaviler olabilir mi?', 'Bazı durumlarda birden fazla seçenek değerlendirilebilir. Alternatifler, avantajları ve sınırlarıyla muayene sonrasında paylaşılır.'],
                ['Randevu nasıl oluşturabilirim?', 'Randevu talep formunu doldurabilir veya kliniğimizi telefonla arayabilirsiniz. Ekibimiz uygun görüşme zamanı için sizinle iletişime geçer.']
            ];
        }
        const sections = profile.sections.map(([heading, body], index) => `<section class="treatment-article__section" id="bolum-${index + 1}"><span>${String(index + 1).padStart(2, '0')}</span><div><h2>${heading}</h2><p>${body}</p></div></section>`).join('');
        const faqs = profile.faqs.map(([question, answer]) => `<details class="faq-item"><summary>${question}<i class="fa-solid fa-plus"></i></summary><p>${answer}</p></details>`).join('');
        detailRoot.innerHTML = `<section class="inner-hero treatment-detail-hero" style="--treatment-hero:url('${heroImage}');--treatment-hero-position:${heroFocusPosition}"><div class="shell"><div class="breadcrumbs"><a href="index.html">ANASAYFA</a><i class="fa-solid fa-chevron-right"></i><a href="tedavilerimiz.html">TEDAVİLERİMİZ</a><i class="fa-solid fa-chevron-right"></i><span>${treatment.title.toLocaleUpperCase('tr-TR')}</span></div><p class="eyebrow eyebrow--light">${treatment.group.toLocaleUpperCase('tr-TR')}</p><h1>${treatment.title}</h1><p>${profile.lead}</p></div></section><section class="content-section treatment-article"><div class="shell"><div class="treatment-article__layout"><article><p class="eyebrow">TEDAVİ BİLGİLERİ</p><h2>${treatment.title} hakkında</h2><p class="lead">${profile.intro}</p><nav class="article-toc" aria-label="Sayfa içeriği"><p>İÇİNDEKİLER</p>${profile.sections.map(([heading], index) => `<a href="#bolum-${index + 1}">${heading}<i class="fa-solid fa-arrow-down"></i></a>`).join('')}<a href="#sss">Sıkça sorulan sorular<i class="fa-solid fa-arrow-down"></i></a></nav>${sections}<p class="treatment-disclaimer">Bu sayfadaki bilgiler genel bilgilendirme amacı taşır. Tanı ve tedavi için diş hekiminize başvurmanız gerekir.</p></article><aside class="treatment-detail-aside"><span>KA</span><h2>Size özel değerlendirme</h2><ul><li>Hekim muayenesi</li><li>Dijital planlama</li><li>Şeffaf bilgilendirme</li><li>Kontrollü takip</li></ul><a class="button" href="randevu-talebi.html">Randevu talebi oluştur <i class="fa-solid fa-arrow-right"></i></a></aside></div><section class="treatment-faq" id="sss"><div><p class="eyebrow">SIK SORULAN SORULAR</p><h2>Merak edilenler.</h2></div><div>${faqs}</div></section></div></section>`;
        detailRoot.querySelector('.treatment-detail-hero').insertAdjacentHTML('afterend', `<section class="treatment-feature-image" aria-label="${treatment.title} görseli"><div class="shell"><figure><img src="${heroImage}" alt="${treatment.title} tedavi görseli" decoding="async"></figure></div></section>`);
        const sourceContent = window.TREATMENT_SOURCE_CONTENT?.[treatment.id];
        if (sourceContent) detailRoot.querySelector('.treatment-article').outerHTML = `<section class="content-section treatment-source-copy"><div class="shell"><article>${sourceContent}</article></div></section>`;
        document.title = `${treatment.title} | Kaya Alp`;
    }

    const doctorProfileRoot = document.querySelector('[data-doctor-profile]');
    if (doctorProfileRoot) {
        const doctors = {
            'ecem-kaya': { name: 'Dr. Ecem Kaya', area: 'Estetik Diş Hekimliği', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=1200&q=85', alt: 'Temsili kadın diş hekimi portresi', lead: 'Doğal, dengeli ve size ait görünen gülüşler için yüz, diş ve diş eti uyumunu birlikte değerlendirir.', bio: 'Estetik yaklaşımın yalnızca görünümle sınırlı olmadığını; fonksiyon, temizlenebilirlik ve uzun dönem ağız sağlığıyla birlikte ele alınması gerektiğini önemser. İlk görüşmeden itibaren beklentileri dinleyen, seçenekleri anlaşılır biçimde paylaşan sakin bir planlama süreci hedefler.', focus: ['Gülüş tasarımı', 'Estetik restorasyonlar', 'Dijital planlama'], approach: 'Her plan, dişlerin doğal karakterini korurken günlük kullanım konforunu ve ağız sağlığını gözetir.' },
            'mert-alp': { name: 'Dr. Mert Alp', area: 'İmplantoloji & Cerrahi', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=85', alt: 'Temsili erkek diş hekimi portresi', lead: 'Cerrahi ve implant planlamasında güvenlik, öngörülebilirlik ve anlaşılır iletişimi birlikte önceliklendirir.', bio: 'Her implant ve cerrahi planın kişiye özel değerlendirme gerektirdiğini benimser. Muayene, görüntüleme ve genel sağlık öyküsünü birlikte ele alarak uygulama seçeneklerini, iyileşme sürecini ve bakım sorumluluklarını şeffaf biçimde paylaşmayı amaçlar.', focus: ['İmplant planlaması', 'Ağız, diş ve çene cerrahisi', 'Fonksiyonel rehabilitasyon'], approach: 'Süreç, en doğru ilk değerlendirmeyle başlar; tüm adımlar ihtiyaçlarınıza ve klinik bulgulara göre planlanır.' },
            'selin-arda': { name: 'Dr. Selin Arda', area: 'Ortodonti & Pedodonti', image: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Temsili kadın diş hekimi portresi', lead: 'Dişlerin dizilimi ve koruyucu bakım sürecinde, her yaş için anlaşılır ve destekleyici bir yaklaşım sunar.', bio: 'Ortodontik değerlendirme ve çocuk diş hekimliği süreçlerinde düzenli takip, koruyucu bakım ve açık iletişimi merkeze alır. Çocukların ilk deneyiminden yetişkinlerin ortodontik planlamasına kadar, sürecin rahat ve anlaşılır ilerlemesini önemser.', focus: ['Şeffaf plak tedavileri', 'Koruyucu çocuk diş hekimliği', 'Ortodontik değerlendirme'], approach: 'Hedef, günlük bakımı kolaylaştıran ve uzun dönemde ağız sağlığını destekleyen dengeli bir plan oluşturmaktır.' }
        };
        const doctorKey = new URLSearchParams(location.search).get('hekim') || 'ecem-kaya';
        const doctor = doctors[doctorKey] || doctors['ecem-kaya'];
        const otherDoctors = Object.entries(doctors).filter(([key]) => key !== doctorKey).map(([key, item]) => `<a class="doctor-profile-related__card" href="doktor.html?hekim=${key}"><span class="doctor-profile-related__media"><img src="${item.image}" alt="${item.alt}" loading="lazy"></span><span class="doctor-profile-related__content"><span class="doctor-profile-related__area">${item.area}</span><strong>${item.name}</strong><span class="doctor-profile-related__link">Profili inceleyin <i class="fa-solid fa-arrow-right"></i></span></span></a>`).join('');
        doctorProfileRoot.innerHTML = `<section class="doctor-profile-hero"><div class="shell doctor-profile-hero__layout"><div><div class="breadcrumbs"><a href="index.html">ANASAYFA</a><i class="fa-solid fa-chevron-right"></i><a href="hekimlerimiz.html">HEKİMLERİMİZ</a><i class="fa-solid fa-chevron-right"></i><span>${doctor.name.toLocaleUpperCase('tr-TR')}</span></div><p class="eyebrow eyebrow--light">${doctor.area.toLocaleUpperCase('tr-TR')}</p><h1>${doctor.name}</h1><p>${doctor.lead}</p><a class="button button--white" href="randevu-talebi.html">Randevu talebi oluştur <i class="fa-solid fa-arrow-right"></i></a></div><figure><img src="${doctor.image}" alt="${doctor.alt}"><figcaption>${doctor.area}</figcaption></figure></div></section><section class="content-section doctor-profile-content"><div class="shell doctor-profile-content__grid"><article><p class="eyebrow">HEKİM YAKLAŞIMI</p><h2>Her adımı anlaşılır, her planı size uygun.</h2><p class="lead">${doctor.bio}</p><div class="doctor-profile-focus"><p>İLGİ ALANLARI</p><ul>${doctor.focus.map(item => `<li>${item}</li>`).join('')}</ul></div></article><aside><i class="fa-solid fa-comments"></i><p>RANDEVU ÖNCESİ</p><h2>Görüşmenize hazırlanırken.</h2><span>${doctor.approach}</span><a href="randevu-talebi.html">Randevu talebi oluştur <i class="fa-solid fa-arrow-right"></i></a></aside></div></section><section class="content-section content-section--mist doctor-profile-related"><div class="shell"><div class="section-heading section-heading--compact"><div><p class="eyebrow">EKİBİMİZ</p><h2>Diğer <span class="accent">hekimlerimiz.</span></h2></div><a class="underlined-link" href="hekimlerimiz.html">Tüm ekibi görüntüleyin <i class="fa-solid fa-arrow-right"></i></a></div><div class="doctor-profile-related__grid">${otherDoctors}</div></div></section>`;
        document.title = `${doctor.name} | Kaya Alp`;
    }

    const infoRoot = document.querySelector('[data-information-page]');
    if (infoRoot) {
        const key = new URLSearchParams(location.search).get('konu') || 'kariyer';
        const info = { 'kariyer': ['Kariyer', 'Birlikte değer üreten bir ekip.', 'Kaya Alp’te açık iletişimi, mesleki gelişimi ve hasta odaklı hizmeti önemseyen ekip arkadaşlarıyla çalışmayı hedefliyoruz. Başvurularınızı insan kaynakları ekibimize iletebilirsiniz.'], 'idari-kadro': ['İdari kadro', 'Hasta deneyimini birlikte organize ediyoruz.', 'Randevu koordinasyonu, danışma ve klinik operasyon ekiplerimiz; her ziyaretin düzenli ve sakin ilerlemesi için birlikte çalışır.'], 'kalite-yonetimi': ['Kalite yönetimi', 'Süreçleri düzenli olarak gözden geçiriyoruz.', 'Hizmet standartlarımızı hasta güvenliği, açık iletişim ve sürekli iyileştirme ilkeleriyle geliştiriyoruz.'], 'kalite-belgeleri': ['Kalite belgeleri', 'Şeffaf ve izlenebilir bir yaklaşım.', 'Klinik süreçlere ilişkin güncel belge ve kayıtlar, yasal gereklilikler doğrultusunda takip edilir.'], 'kalite-politikasi': ['Kalite politikası', 'Özenli hizmet, sürdürülebilir güven.', 'Kaya Alp; bilimsel doğruluk, hijyen, güvenlik ve hasta memnuniyetini temel hizmet ilkeleri olarak benimser.'], 'kurumsal-kimlik': ['Kurumsal kimlik', 'Tutarlı, sade ve güven veren bir iletişim.', 'Kurumsal dilimizde açık iletişimi; görsel dünyamızda ise sakin, ulaşılabilir ve profesyonel bir yaklaşımı benimsiyoruz.'] }[key] || ['Kurumsal bilgi', 'Kaya Alp hakkında.', 'Kliniğimizin yaklaşımı, ekip yapısı ve hizmet standartları hakkında güncel bilgileri bu alanda bulabilirsiniz.'];
        infoRoot.innerHTML = `<section class="inner-hero"><div class="shell"><div class="breadcrumbs"><a href="index.html">ANASAYFA</a><i class="fa-solid fa-chevron-right"></i><a href="kurumsal.html">KURUMSAL</a><i class="fa-solid fa-chevron-right"></i><span>${info[0].toLocaleUpperCase('tr-TR')}</span></div><p class="eyebrow eyebrow--light">KAYA ALP POLİKLİNİĞİ</p><h1>${info[0]}</h1><p>${info[1]}</p></div></section><section class="content-section"><div class="shell information-layout"><div><p class="eyebrow">KURUMSAL BİLGİ</p><h2>${info[1]}</h2><p class="lead">${info[2]}</p><a class="button" href="iletisim.html">Bizimle iletişime geçin <i class="fa-solid fa-arrow-right"></i></a></div><aside><span>KA</span><p>Güven, özen ve süreklilik.</p></aside></div></section>`;
        document.title = `${info[0]} | Kaya Alp`;
        applySecondaryHeroImage();
    }
});
