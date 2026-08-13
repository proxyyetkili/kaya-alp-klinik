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
    const directLink = (href, label, className = '') => `<a class="${className}" href="${href}"><span>${label}</span></a>`;
    const treatmentMega = treatmentGroups.map(group => `<section class="mega-group"><a class="mega-group__title" href="tedavilerimiz.html#${group.title.toLocaleLowerCase('tr-TR').replaceAll(' ', '-')}">${group.title}<i class="fa-solid fa-arrow-up-right-from-square"></i></a><div class="mega-group__links">${group.items.map(([id, label]) => directLink(treatmentHref(id), label)).join('')}</div></section>`).join('');
    const corporateLinks = [
        ['kurumsal.html', 'Hakkımızda'],
        ['kurumsal-bilgi.html?konu=kariyer', 'Kariyer'],
        ['kurumsal-bilgi.html?konu=idari-kadro', 'İdari kadro'],
        ['kurumsal.html#kalite', 'Kalite yaklaşımımız'],
        ['kurumsal-bilgi.html?konu=kalite-yonetimi', 'Kalite yönetimi'],
        ['kurumsal-bilgi.html?konu=kalite-belgeleri', 'Kalite belgeleri'],
        ['kurumsal-bilgi.html?konu=kalite-politikasi', 'Kalite politikası'],
        ['kurumsal-bilgi.html?konu=kurumsal-kimlik', 'Kurumsal kimlik']
    ];
    const corporateMega = `<section class="mega-group mega-group--compact"><p class="mega-group__title">Kurumsal bilgiler</p><div class="mega-group__links">${corporateLinks.map(([href, label]) => directLink(href, label)).join('')}</div></section>`;
    const pageName = location.pathname.split('/').pop() || 'index.html';
    const isHome = pageName === 'index.html' || pageName === '';
    const active = name => pageName === name || (name === 'tedavilerimiz.html' && pageName === 'tedavi.html') || (name === 'kurumsal.html' && pageName === 'kurumsal-bilgi.html') ? 'active' : '';
    const header = document.getElementById('siteHeader');
    const mobileMenu = document.getElementById('mobileMenu');

    if (header && mobileMenu) {
        header.innerHTML = `<div class="shell header-inner"><a class="brand" href="index.html" aria-label="Kaya Alp Ana Sayfa"><img src="https://media.nevasiteyonetimi.com/kayaalpdis/logo.png" alt="Kaya Alp Ağız ve Diş Sağlığı Polikliniği"></a><nav class="desktop-nav" aria-label="Ana navigasyon"><a class="${active('index.html')}" href="index.html">Anasayfa</a><div class="nav-dropdown ${active('kurumsal.html')}"><button type="button" aria-expanded="false">Kurumsal <i class="fa-solid fa-chevron-down"></i></button><div class="dropdown-panel dropdown-panel--corporate">${corporateMega}</div></div><div class="nav-dropdown ${active('tedavilerimiz.html')}"><button type="button" aria-expanded="false">Tedavilerimiz <i class="fa-solid fa-chevron-down"></i></button><div class="dropdown-panel dropdown-panel--mega">${treatmentMega}</div></div><div class="nav-dropdown ${active('subelerimiz.html')}"><button type="button" aria-expanded="false">Kliniğimiz <i class="fa-solid fa-chevron-down"></i></button><div class="dropdown-panel dropdown-panel--clinic">${directLink('subelerimiz.html', 'Klinik lokasyonumuz')}${directLink('subelerimiz.html?bolum=ulasim', 'Ulaşım ve ziyaret bilgisi')}</div></div><a class="${active('hekimlerimiz.html')}" href="hekimlerimiz.html">Hekimlerimiz</a><a class="${active('saglik-rehberi.html')}" href="saglik-rehberi.html">Sağlık Rehberi</a><a class="${active('iletisim.html')}" href="iletisim.html">İletişim</a><a class="${active('sss.html')}" href="sss.html">S.S.S.</a></nav><div class="header-actions"><a class="header-phone" href="tel:+902824400287" aria-label="Bizi arayın"><i class="fa-solid fa-phone"></i></a><a class="button button--header" href="randevu-talebi.html">Randevu Talebi <i class="fa-solid fa-arrow-up-right-from-square"></i></a><button class="menu-button" id="menuButton" aria-label="Menüyü aç" aria-controls="mobileMenu" aria-expanded="false"><span></span><span></span></button></div></div>`;

        const mobileTreatmentGroups = treatmentGroups.map(group => `<details class="mobile-nav-group"><summary>${group.title}<i class="fa-solid fa-plus"></i></summary><div class="mobile-subnav">${group.items.map(([id, label]) => directLink(treatmentHref(id), label)).join('')}</div></details>`).join('');
        mobileMenu.innerHTML = `<div class="mobile-menu__top"><img src="https://media.nevasiteyonetimi.com/kayaalpdis/logo.png" alt="Kaya Alp"><button type="button" id="menuClose" aria-label="Menüyü kapat"><i class="fa-solid fa-xmark"></i></button></div><nav aria-label="Mobil navigasyon"><a href="index.html">Anasayfa</a><details class="mobile-nav-group"><summary>Kurumsal<i class="fa-solid fa-plus"></i></summary><div class="mobile-subnav">${corporateLinks.map(([href, label]) => directLink(href, label)).join('')}</div></details><details class="mobile-nav-group"><summary>Tedavilerimiz<i class="fa-solid fa-plus"></i></summary><div class="mobile-subnav mobile-subnav--groups">${mobileTreatmentGroups}</div></details><details class="mobile-nav-group"><summary>Kliniğimiz<i class="fa-solid fa-plus"></i></summary><div class="mobile-subnav">${directLink('subelerimiz.html', 'Klinik lokasyonumuz')}${directLink('subelerimiz.html?bolum=ulasim', 'Ulaşım ve ziyaret bilgisi')}</div></details><a href="hekimlerimiz.html">Hekimlerimiz</a><a href="saglik-rehberi.html">Sağlık Rehberi</a><a href="iletisim.html">İletişim</a><a href="sss.html">Sık sorulan sorular</a></nav><div class="mobile-menu__bottom"><a href="tel:+902824400287">(0282) 440 02 87</a><a class="button" href="randevu-talebi.html">Randevu Talebi</a></div>`;
    }

    const menuButton = document.getElementById('menuButton');
    const menuClose = document.getElementById('menuClose');
    const toggleHeader = () => header?.classList.toggle('is-scrolled', !isHome || window.scrollY > 22);
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
        button.addEventListener('click', event => {
            event.stopPropagation();
            const dropdown = button.parentElement;
            const isOpen = dropdown?.classList.contains('is-open');
            document.querySelectorAll('.nav-dropdown').forEach(item => item.classList.remove('is-open'));
            document.querySelectorAll('.nav-dropdown > button').forEach(item => item.setAttribute('aria-expanded', 'false'));
            if (!isOpen) { dropdown?.classList.add('is-open'); button.setAttribute('aria-expanded', 'true'); }
        });
    });
    document.addEventListener('click', () => document.querySelectorAll('.nav-dropdown').forEach(item => item.classList.remove('is-open')));

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
        Object.entries(fieldLabels).forEach(([key, label]) => { const value = String(data.get(key) || '').trim(); if (value) lines.push(`${label}: ${value}`); });
        lines.push('', 'KVKK onayı: Verildi');
        window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(`Randevu Talebi — ${data.get('ad_soyad')}`)}&body=${encodeURIComponent(lines.join('\n'))}`;
        const feedback = appointmentForm.querySelector('.form-feedback');
        if (feedback) feedback.textContent = 'E-posta uygulamanız açılıyor. Talebinizi gönderdikten sonra ekibimiz sizinle iletişime geçecektir.';
    });

    const detailRoot = document.querySelector('[data-treatment-detail]');
    if (detailRoot) {
        const requested = new URLSearchParams(location.search).get('tedavi') || 'dental-implant';
        const treatment = treatmentGroups.flatMap(group => group.items.map(([id, title]) => ({ id, title, group: group.title }))).find(item => item.id === requested) || { id: 'dental-implant', title: 'Dental implant', group: 'İmplant çözümleri' };
        const descriptions = {
            'dental-implant': 'Eksik dişlerin fonksiyonunu ve estetik görünümünü, kişiye özel planlama ile destekleyen sabit tedavi seçeneğidir.',
            'all-on-four': 'Uygun vakalarda sabit protez planlamasına imkân veren implant destekli rehabilitasyon yaklaşımıdır.',
            'gulus-tasarimi': 'Diş, diş eti, dudak ve yüz uyumunu birlikte değerlendiren kişiye özel estetik planlama sürecidir.',
            'seffaf-plak': 'Ortodontik değerlendirme sonrasında, kontrollü diş hareketleri için planlanan şeffaf plak yaklaşımıdır.',
            'kanal-tedavisi': 'Dişin iç dokusundaki problemleri koruyucu yaklaşımla ele alan endodontik tedavi sürecidir.'
        };
        const description = descriptions[treatment.id] || `${treatment.title}, ağız ve diş sağlığı değerlendirmesi sonrasında kişisel ihtiyaçlara göre planlanan bir uygulamadır.`;
        detailRoot.innerHTML = `<section class="inner-hero"><div class="shell"><div class="breadcrumbs"><a href="index.html">ANASAYFA</a><i class="fa-solid fa-chevron-right"></i><a href="tedavilerimiz.html">TEDAVİLERİMİZ</a><i class="fa-solid fa-chevron-right"></i><span>${treatment.title.toLocaleUpperCase('tr-TR')}</span></div><p class="eyebrow eyebrow--light">${treatment.group.toLocaleUpperCase('tr-TR')}</p><h1>${treatment.title}</h1><p>${description}</p></div></section><section class="content-section"><div class="shell treatment-detail-layout"><article class="treatment-detail-copy"><p class="eyebrow">TEDAVİYE YAKLAŞIMIMIZ</p><h2>Planlama, doğru bilgilendirme ve düzenli takip.</h2><p>Her tedavi, kapsamlı muayene ve gerekli görüntüleme yöntemleriyle değerlendirilir. Hekiminiz seçenekleri, uygulama adımlarını ve bakım önerilerini sizinle açık biçimde paylaşır.</p><p>Bu sayfadaki bilgiler genel bilgilendirme amaçlıdır. Size uygun yaklaşım, klinik muayene sonrasında belirlenir.</p><a class="button" href="randevu-talebi.html">Randevu talebi oluştur <i class="fa-solid fa-arrow-right"></i></a></article><aside class="treatment-detail-aside"><span>01</span><h2>Size özel değerlendirme</h2><ul><li>Hekim muayenesi</li><li>Dijital planlama</li><li>Şeffaf bilgilendirme</li><li>Kontrollü takip</li></ul></aside></div></section>`;
        document.title = `${treatment.title} | Kaya Alp`;
    }

    const infoRoot = document.querySelector('[data-information-page]');
    if (infoRoot) {
        const key = new URLSearchParams(location.search).get('konu') || 'kariyer';
        const info = {
            'kariyer': ['Kariyer', 'Birlikte değer üreten bir ekip.', 'Kaya Alp’te açık iletişimi, mesleki gelişimi ve hasta odaklı hizmeti önemseyen ekip arkadaşlarıyla çalışmayı hedefliyoruz. Başvurularınızı insan kaynakları ekibimize iletebilirsiniz.'],
            'idari-kadro': ['İdari kadro', 'Hasta deneyimini birlikte organize ediyoruz.', 'Randevu koordinasyonu, danışma ve klinik operasyon ekiplerimiz; her ziyaretin düzenli ve sakin ilerlemesi için birlikte çalışır.'],
            'kalite-yonetimi': ['Kalite yönetimi', 'Süreçleri düzenli olarak gözden geçiriyoruz.', 'Hizmet standartlarımızı hasta güvenliği, açık iletişim ve sürekli iyileştirme ilkeleriyle geliştiriyoruz.'],
            'kalite-belgeleri': ['Kalite belgeleri', 'Şeffaf ve izlenebilir bir yaklaşım.', 'Klinik süreçlere ilişkin güncel belge ve kayıtlar, yasal gereklilikler doğrultusunda takip edilir.'],
            'kalite-politikasi': ['Kalite politikası', 'Özenli hizmet, sürdürülebilir güven.', 'Kaya Alp; bilimsel doğruluk, hijyen, güvenlik ve hasta memnuniyetini temel hizmet ilkeleri olarak benimser.'],
            'kurumsal-kimlik': ['Kurumsal kimlik', 'Tutarlı, sade ve güven veren bir iletişim.', 'Kurumsal dilimizde açık iletişimi; görsel dünyamızda ise sakin, ulaşılabilir ve profesyonel bir yaklaşımı benimsiyoruz.']
        }[key] || ['Kurumsal bilgi', 'Kaya Alp hakkında.', 'Kliniğimizin yaklaşımı, ekip yapısı ve hizmet standartları hakkında güncel bilgileri bu alanda bulabilirsiniz.'];
        infoRoot.innerHTML = `<section class="inner-hero"><div class="shell"><div class="breadcrumbs"><a href="index.html">ANASAYFA</a><i class="fa-solid fa-chevron-right"></i><a href="kurumsal.html">KURUMSAL</a><i class="fa-solid fa-chevron-right"></i><span>${info[0].toLocaleUpperCase('tr-TR')}</span></div><p class="eyebrow eyebrow--light">KAYA ALP POLİKLİNİĞİ</p><h1>${info[0]}</h1><p>${info[1]}</p></div></section><section class="content-section"><div class="shell information-layout"><div><p class="eyebrow">KURUMSAL BİLGİ</p><h2>${info[1]}</h2><p class="lead">${info[2]}</p><a class="button" href="iletisim.html">Bizimle iletişime geçin <i class="fa-solid fa-arrow-right"></i></a></div><aside><span>KA</span><p>Güven, özen ve süreklilik.</p></aside></div></section>`;
        document.title = `${info[0]} | Kaya Alp`;
    }
});
