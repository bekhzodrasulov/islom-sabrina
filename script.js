function openInvite() {
    let env = document.getElementById('envelopeEl');
    env.classList.add('open');
    setTimeout(function () {
        document.getElementById('gate').classList.add('hidden');
        document.getElementById('invite').classList.add('shown');
        document.body.style.overflow = 'auto';
    }, 1000);
}
document.body.style.overflow = 'hidden';

/* countdown */
let target = new Date('2026-11-14T18:00:00');
function tick() {
    let now = new Date();
    let diff = target - now;
    if (diff < 0) diff = 0;
    let d = Math.floor(diff / 86400000);
    let h = Math.floor(diff % 86400000 / 3600000);
    let m = Math.floor(diff % 3600000 / 60000);
    let s = Math.floor(diff % 60000 / 1000);
    document.getElementById('cd-days').textContent = d;
    document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
    document.getElementById('cd-min').textContent = String(m).padStart(2, '0');
    document.getElementById('cd-sec').textContent = String(s).padStart(2, '0');
}
tick();
setInterval(tick, 1000);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll(".animate").forEach((el) => {
    observer.observe(el);
});

/* languages */
const translations = {
    uz: {
        title: 'Islombek & Sabrina — Taklifnoma',
        gateTitle: 'Taklifnoma',
        gateHint: 'Ochish uchun ustiga bosing',
        date: '14 noyabr 2026',
        introTitle: 'Hurmatli aziz mehmonimiz!',
        introText: "Sizni hayotimizning eng go'zal va baxtli onlarida baxtimizga sherik bo'lishingizni istab shodiyonamizga taklif etamiz!",
        month: 'Noyabr',
        wd0: 'Du', wd1: 'Se', wd2: 'Cho', wd3: 'Pa', wd4: 'Ju', wd5: 'Sha', wd6: 'Ya',
        inviteTop: 'Sizni',
        inviteTime: '18:00 - «Kechgi bazim»ga',
        inviteBottom: "Lutfan taklif e'tamiz!",
        days: 'kun', hours: 'soat', minutes: 'daqiqa', seconds: 'soniya',
        venueTitle: 'Manzil:',
        venueText: "Navoiy shahar<br>«Muhtasham» to'yxonasi, Islom Karimov prospekti, 468A",
        mapBtn: "Kartadan ko'rish"
    },
    ru: {
        title: 'Islombek & Sabrina — Приглашение',
        gateTitle: 'Приглашение',
        gateHint: 'Нажмите, чтобы открыть',
        date: '14 ноября 2026',
        introTitle: 'Дорогие наши гости!',
        introText: 'Приглашаем вас разделить с нами радость самого прекрасного и счастливого дня в нашей жизни!',
        month: 'Ноябрь',
        wd0: 'Пн', wd1: 'Вт', wd2: 'Ср', wd3: 'Чт', wd4: 'Пт', wd5: 'Сб', wd6: 'Вс',
        inviteTop: 'Сердечно приглашаем вас',
        inviteTime: '18:00 — на вечернее торжество',
        inviteBottom: 'Будем рады видеть вас!',
        days: 'дней', hours: 'часов', minutes: 'минут', seconds: 'секунд',
        venueTitle: 'Адрес:',
        venueText: 'г. Навои<br>Банкетный зал «Muhtasham», проспект Ислама Каримова, 468A',
        mapBtn: 'Открыть на карте'
    },
    en: {
        title: 'Islombek & Sabrina — Invitation',
        gateTitle: 'Invitation',
        gateHint: 'Tap to open',
        date: 'November 14, 2026',
        introTitle: 'Dear guests!',
        introText: 'We would be delighted to have you share the joy of the most beautiful and happiest day of our lives!',
        month: 'November',
        wd0: 'Mo', wd1: 'Tu', wd2: 'We', wd3: 'Th', wd4: 'Fr', wd5: 'Sa', wd6: 'Su',
        inviteTop: 'We kindly invite you',
        inviteTime: '18:00 — Evening Reception',
        inviteBottom: 'We look forward to seeing you!',
        days: 'days', hours: 'hours', minutes: 'min', seconds: 'sec',
        venueTitle: 'Venue:',
        venueText: 'Navoi city<br>«Muhtasham» Wedding Hall, 468A Islam Karimov Avenue',
        mapBtn: 'View on map'
    }
};

function setLang(lang) {
    if (!translations[lang]) lang = 'uz';
    let t = translations[lang];
    document.documentElement.lang = lang;
    document.title = t.title;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t[el.dataset.i18n];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        el.innerHTML = t[el.dataset.i18nHtml];
    });
    document.querySelectorAll('.lang-switch button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    try { localStorage.setItem('lang', lang); } catch (e) { }
}

document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

let savedLang = null;
try { savedLang = localStorage.getItem('lang'); } catch (e) { }
setLang(new URLSearchParams(location.search).get('lang') || savedLang || 'uz');
