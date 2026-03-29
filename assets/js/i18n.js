const translations = {
  en: {
    nav: {
      about: "About", accelerators: "Experience", clients: "Clients",
      blog: "Blog", contact: "Contact", book: "Book a call"
    },
    hero: {
      tag: "Startup Advisor · Investor · BizDev",
      name: "Vasilii Likhachev",
      subtitle: "I help seed and pre-seed founders build traction, prepare for investment, and scale to new markets.",
      cta_primary: "Book a call", cta_secondary: "Read the blog"
    },
    stats: {
      title: "By the numbers",
      items: [
        { value: "4,000+", label: "Hours of tracking & advisory" },
        { value: "500+",   label: "Startups reviewed as expert" },
        { value: "100+",   label: "Businesses from idea to first sales" },
        { value: "×15",    label: "Revenue growth at client companies" },
        { value: "30+",    label: "Accelerators & programs" },
        { value: "10+",    label: "Countries entered with clients" },
        { value: "₽2B+",   label: "Annual revenue managed as ex-CEO" },
        { value: "2019",   label: "Professional tracker since" }
      ]
    },
    about: {
      title: "About",
      p1: "I'm a professional business tracker and startup advisor with a background as a founder and CEO. Since 2019, I've worked with seed and pre-seed startups across Russia, Kazakhstan, the MENA region, the EU, and the US.",
      p2: "I've been a tracker, senior tracker, expert and speaker at 30+ accelerators including Sberbank, FRII, Scalerator, Startup Garage, and Astana Hub. Corporate tracker at VkusVill and Sravni.ru. Organized accelerator programs for VkusVill, TUSUR AI, and Agama Run.",
      p3: "Before advisory work, I was CEO of a company with annual revenue of ₽2B+. Expert at Google for Startups and Hero Training by Draper University in Silicon Valley. English B2."
    },
    accelerators: { title: "Accelerators & Programs", subtitle: "Tracker, senior tracker, expert and speaker" },
    clients: { title: "Corporate Clients", subtitle: "Companies I've worked with as a corporate tracker and accelerator organizer" },
    blog: { title: "Blog", subtitle: "Practical insights for founders on fundraising, growth, and building teams", read_more: "Read more", view_all: "View all articles" },
    calendar: { title: "Book a call", subtitle: "Choose a time that works for you. 30-minute intro call." },
    contact: { title: "Get in touch", email_label: "Email", follow: "Follow" },
    footer: { copy: "© 2025 Vasilii Likhachev. All rights reserved." }
  },
  ru: {
    nav: {
      about: "Обо мне", accelerators: "Опыт", clients: "Клиенты",
      blog: "Блог", contact: "Контакты", book: "Записаться"
    },
    hero: {
      tag: "Стартап-советник · Инвестор · BizDev",
      name: "Василий Лихачёв",
      subtitle: "Помогаю фаундерам на стадии seed и pre-seed выстроить тракцию, подготовиться к инвестициям и выйти на новые рынки.",
      cta_primary: "Записаться", cta_secondary: "Читать блог"
    },
    stats: {
      title: "В цифрах",
      items: [
        { value: "4 000+", label: "Часов трекинга и консультаций" },
        { value: "500+",   label: "Проектов как эксперт" },
        { value: "100+",   label: "Бизнесов от идеи до первых продаж" },
        { value: "×15",    label: "Рост выручки у клиентов" },
        { value: "30+",    label: "Акселераторов и программ" },
        { value: "10+",    label: "Стран с клиентами" },
        { value: "2 млрд+", label: "Оборот компании в роли ex-CEO" },
        { value: "2019",   label: "Профессиональный трекер с" }
      ]
    },
    about: {
      title: "Обо мне",
      p1: "Профессиональный бизнес-трекер и стартап-советник с опытом фаундера и CEO. С 2019 года работаю с seed и pre-seed стартапами в России, Казахстане, MENA, ЕС и США.",
      p2: "Трекер, старший трекер, эксперт и спикер в 30+ акселераторах: Сбербанк, ФРИИ, Scalerator, Startup-Garage, Астана Хаб и других. Корпоративный трекер ВкусВилл и Sravni.ru.",
      p3: "До трекинга — CEO компании с оборотом 2+ млрд руб. в год. Эксперт Google for Startups и Hero Training by Draper University. Английский B2."
    },
    accelerators: { title: "Акселераторы и программы", subtitle: "Трекер, старший трекер, эксперт и спикер" },
    clients: { title: "Корпоративные клиенты", subtitle: "Компании, с которыми работал в роли корпоративного трекера" },
    blog: { title: "Блог", subtitle: "Практические материалы для фаундеров: инвестиции, рост, команда", read_more: "Читать", view_all: "Все статьи" },
    calendar: { title: "Записаться на встречу", subtitle: "Выберите удобное время. Вводная встреча 30 минут." },
    contact: { title: "Написать", email_label: "Email", follow: "Соцсети" },
    footer: { copy: "© 2025 Василий Лихачёв. Все права защищены." }
  }
};

let currentLang = 'en';

function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = getKey(translations[lang], el.dataset.i18n);
    if (val !== undefined) el.textContent = val;
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  renderStats(lang);
  localStorage.setItem('lang', lang);
}

function getKey(obj, path) {
  return path.split('.').reduce((acc, k) => acc && acc[k], obj);
}

function t(path) {
  return getKey(translations[currentLang], path) || path;
}

function renderStats(lang) {
  const grid = document.getElementById('stats-grid');
  if (!grid) return;
  grid.innerHTML = translations[lang].stats.items.map((item, i) => `
    <div class="stat-card" style="animation-delay:${i * 0.07}s">
      <div class="stat-value">${item.value}</div>
      <div class="stat-label">${item.label}</div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  setLang(localStorage.getItem('lang') || 'en');
});
