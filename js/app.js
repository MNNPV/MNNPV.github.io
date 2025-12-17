/* MNNPV System Logic */
const store = {
    lang: 'en',
    currentPage: 'home',
    timer: {
        active: false,
        startTime: null,
        taskName: '',
        projectName: '',
        intervalId: null
    },
    data: JSON.parse(localStorage.getItem('timeTrackerData')) || {}
};

/* Translations - Updated for MNNPV context */
const i18n = {
    en: {
        nav: {
            home: "Mission Control",
            project: "Project Intel",
            tracking: "Chronometer",
            teams: "Operatives",
            brand: "Protocol"
        },
        labels: {
            status: "SYSTEM STATUS: ONLINE",
            version: "V.2.0.24",
            welcome: "Welcome back, Commander.",
            quote: "Creativity. Inspiration. Excitement. Tranquility. Youth."
        },
        buttons: {
            start: "INITIATE",
            stop: "TERMINATE"
        }
    },
    km: {
        nav: {
            home: "មជ្ឈមណ្ឌលបញ្ជា",
            project: "ព័ត៌មានគម្រោង",
            tracking: "នាឡិកា",
            teams: "ប្រតិបត្តិករ",
            brand: "ប្រព័ន្ធ"
        },
        labels: {
            status: "ប្រព័ន្ធដំណើរការ: ធម្មតា",
            version: "V.2.0.24",
            welcome: "ស្វាគមន៍ត្រឡប់មកវិញ",
            quote: "ភាពច្នៃប្រឌិត ការបំផុសគំនិត ភាពរំភើប ភាពស្ងប់ស្ងាត់ និងយុវវ័យ"
        },
        buttons: {
            start: "ចាប់ផ្តើម",
            stop: "បញ្ឈប់"
        }
    }
};

/* Init */
function init() {
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
    restoreTimer();
}

function handleRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    store.currentPage = hash;
    render();
}

/* Rendering */
function render() {
    const app = document.getElementById('app');

    app.innerHTML = `
        ${renderMobileToggle()}
        ${renderSidebar()}
        <main class="content">
            <div class="status-bar">
                <span>[NET: SECURE]</span>
                <span>[LOC: LOCALHOST]</span>
                <span>[${new Date().toLocaleTimeString()}]</span>
            </div>
            ${renderPage(store.currentPage)}
        </main>
    `;

    attachEvents();
}

function renderMobileToggle() {
    return `
        <button class="fui-btn mobile-toggle" id="menuToggle">
            // MENU
        </button>
    `;
}

function renderSidebar() {
    const t = i18n[store.lang].nav;
    const links = [
        { id: 'home', label: t.home, icon: '⌂' },
        { id: 'project', label: t.project, icon: '◈' },
        { id: 'tracking', label: t.tracking, icon: '⏱' },
        { id: 'teams', label: t.teams, icon: '웃' },
        { id: 'brand', label: t.brand, icon: '§' },
    ];

    const activeClass = (id) => store.currentPage === id ? 'active' : '';

    return `
        <nav class="sidebar" id="sidebar">
            <div style="padding: 0 2rem;">
                <h1 class="mono" style="color: var(--color-error); font-size: 2rem;">MNNPV</h1>
                <p class="mono" style="font-size: 0.8rem; margin-bottom: 2rem; opacity: 0.7;">RESEARCH UNIT</p>
                <img src="brand/logo.svg" alt="Logo" style="width: 60px; margin-bottom: 2rem; opacity: 0.8;">
            </div>
            
            <div style="display: flex; flex-direction: column;">
                ${links.map(link => `
                    <a href="#${link.id}" class="nav-link ${activeClass(link.id)}">
                        <span style="width: 20px; margin-right: 10px;">${link.icon}</span> ${link.label}
                    </a>
                `).join('')}
            </div>

            <div style="padding: 2rem;">
                <button class="fui-btn" id="langToggle" style="width: 100%;">
                    [ ${store.lang.toUpperCase()} ]
                </button>
            </div>
        </nav>
    `;
}

function renderPage(page) {
    switch (page) {
        case 'home': return renderHome();
        case 'project': return renderProject();
        case 'tracking': return renderTracking();
        case 'teams': return renderTeams();
        case 'brand': return renderBrand();
        default: return renderHome();
    }
}

/* Pages */
function renderHome() {
    const t = i18n[store.lang];
    const teamMessage = store.lang === 'en'
        ? "We are a committee dedicated to the success of this research project. We promise to deliver high-quality results through collaboration and innovation."
        : "យើងជាគណៈកម្មាធិការដែលប្តេជ្ញាចិត្តចំពោះជោគជ័យនៃគម្រោងស្រាវជ្រាវនេះ។ យើងសន្យថានឹងផ្តល់លទ្ធផលប្រកបដោយគុណភាពតាមរយៈការសហការនិងការច្នៃប្រឌិត។";

    return `
        <div style="animation: slideIn 0.5s ease-out;">
            <div class="fui-panel hero-frame" style="padding: 0; overflow: hidden; max-width: 900px; margin: 0 auto 2rem auto;">
                <img src="brand/firstloadingbg17_add.jpg" alt="Cover" style="width: 100%; height: auto; display: block;">
                <div style="position: absolute; bottom: 0; left: 0; width: 100%; background: linear-gradient(0deg, var(--color-background), transparent); padding: 5rem 2rem 2rem 2rem;">
                     <h1 style="font-size: 3rem; color: var(--color-error);">TEAL</h1>
                     <p class="mono" style="font-size: 1.1rem;">// ${t.labels.quote}</p>
                </div>
            </div>
            
            <div class="fui-panel" style="max-width: 800px; margin: 0 auto; text-align: center;">
                <h3 style="color: var(--color-error); margin-bottom: 1rem;">:: COMMITTEE PROTOCOL ::</h3>
                <p class="mono" style="line-height: 1.8;">${teamMessage}</p>
            </div>
        </div>
    `;
}

function renderProject() {
    const isEn = store.lang === 'en';
    return `
        <div style="animation: slideIn 0.5s ease-out;">
            <div class="fui-panel">
                <span class="mono" style="color: var(--color-error); font-size: 0.8rem;">[PROJECT CLASSIFIED]</span>
                <h1 style="margin: 1rem 0; font-size: 2rem;">${isEn ? "Online Purchasing Mgt. System" : "ប្រព័ន្ធគ្រប់គ្រងការទិញលក់ទំនិញអនឡាញ"}</h1>
                <p class="mono" style="opacity: 0.7;">Target: SMEs / Retail / F&B</p>
            </div>

            <div class="grid-3">
                ${['Research Method', 'Documentation', 'GitHub Repo'].map((title, i) => `
                    <a href="#" class="fui-panel" style="text-decoration: none; color: inherit; display: block;">
                        <span style="font-size: 2rem; color: var(--color-error); opacity: 0.5;">0${i + 1}</span>
                        <h3>${title}</h3>
                        <p class="mono" style="font-size: 0.8rem; margin-top: 1rem;">ACCESS DENIED >></p>
                    </a>
                `).join('')}
            </div>
        </div>
    `;
}

function renderTeams() {
    const members = [
        { name: "Earm Vimorl", img: "brand/morl_24nhzb24nhzb24nh.png", role: "FULL STACK", id: "OP-01" },
        { name: "Kri Kon Nga", img: "brand/nga_w8dzvuw8dzvuw8dz.png", role: "FRONTEND", id: "OP-02" },
        { name: "Long Sreynet", img: "brand/net_xpak9qxpak9qxpak.png", role: "ANALYST", id: "OP-03" },
        { name: "Tan Saphea", img: "brand/phea_ei5rr2ei5rr2ei5r.png", role: "DATABASE", id: "OP-04" },
        { name: "Vi Srie", img: "brand/vi_ca63cgca63cgca63.png", role: "UI/UX", id: "OP-05" }
    ];

    return `
        <div style="animation: slideIn 0.5s ease-out;">
            <h2 style="margin-bottom: 2rem;">// OPERATIVE UNIT</h2>
            <div class="grid-3">
                ${members.map(m => `
                    <div class="fui-id-card">
                        <div class="id-header">
                            <span class="mono">ID: ${m.id}</span>
                            <span class="mono">UN: MNNPV</span>
                        </div>
                        
                        <div class="id-photo-frame">
                            <img src="${m.img}" alt="${m.name}">
                        </div>
                        
                        <h3 style="font-size: 1rem; margin-bottom: 0.2rem;">${m.name}</h3>
                        <p class="mono" style="color: var(--color-error); font-size: 0.8rem;">[${m.role}]</p>
                        
                        <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem; font-size: 0.7rem; color: var(--color-text-secondary);">
                             <span>STR: 54</span>
                             <span>INT: 88</span>
                             <span>AGI: 21</span>
                        </div>

                        <div class="id-barcode"></div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderTracking() {
    const t = i18n[store.lang];
    const today = new Date().toLocaleDateString();
    const todaysTasks = store.data[today] || [];

    // Logic duplicate from before, simplified for display
    const activeClass = store.timer.active ? 'hidden' : '';
    const stopClass = store.timer.active ? '' : 'hidden';

    return `
        <div style="animation: slideIn 0.5s ease-out;">
             <div class="fui-panel" style="text-align: center; border-width: 2px;">
                <span class="mono" style="font-size: 0.9rem; opacity: 0.7;">SESSION DURATION</span>
                <h1 class="mono" style="font-size: 4rem; color: var(--color-error); text-shadow: 0 0 10px var(--color-error-dim);" id="timer-display">00:00:00</h1>
                
                 <div id="controls" class="${activeClass} mt-2">
                    <input type="text" id="taskInput" class="fui-input" placeholder="TASK NAME..." style="margin-right: 1rem;">
                    <button class="fui-btn" onclick="startTimer()">${t.buttons.start}</button>
                </div>

                <div id="active-controls" class="${stopClass} mt-2">
                    <p class="mono text-error" id="active-task-display" style="margin-bottom: 1rem; animation: pulse 2s infinite;">RECORDING...</p>
                    <button class="fui-btn" onclick="stopTimer()">${t.buttons.stop}</button>
                </div>
             </div>

             <div class="fui-panel">
                <h3>// LOGS [${today}]</h3>
                <table style="width: 100%; text-align: left; margin-top: 1rem; border-collapse: collapse;">
                    <thead class="mono" style="color: var(--color-error); font-size: 0.8rem;">
                        <tr>
                            <th style="padding: 0.5rem;">TASK</th>
                            <th style="padding: 0.5rem;">DUR</th>
                            <th style="padding: 0.5rem;">STATUS</th>
                        </tr>
                    </thead>
                    <tbody class="mono" style="font-size: 0.9rem;">
                        ${todaysTasks.slice().reverse().map(task => `
                            <tr style="border-bottom: 1px solid var(--color-error-dim);">
                                <td style="padding: 0.8rem 0.5rem;">${task.name}</td>
                                <td style="padding: 0.8rem 0.5rem;">${formatDuration(task.duration)}</td>
                                <td style="padding: 0.8rem 0.5rem; color: var(--color-error);">DONE</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
             </div>
        </div>
    `;
}

function renderBrand() {
    return `
        <div class="fui-panel">
            <h1>// VISUAL PROTOCOL</h1>
            <div class="grid-2 mt-2">
                <div>
                     <p class="mono mb-2">PRIMARY_COLOR: #B00020</p>
                     <div style="width: 100%; height: 50px; background: var(--color-error); clip-path: polygon(0 0, 100% 0, 95% 100%, 0 100%);"></div>
                </div>
                <div>
                     <p class="mono mb-2">SURFACE_COLOR: #FFFFFF</p>
                     <div style="width: 100%; height: 50px; background: #FFF; border: 1px solid #ddd; clip-path: polygon(0 0, 100% 0, 95% 100%, 0 100%);"></div>
                </div>
            </div>
            <div class="mt-2">
                <p class="mono">TYPOGRAPHY_MAIN: OUTFIT</p>
                <p class="mono">TYPOGRAPHY_DATA: JETBRAINS MONO</p>
            </div>
        </div>
    `;
}

/* Base Logic (Same as before) */
function attachEvents() {
    const toggle = document.getElementById('menuToggle');
    if (toggle) toggle.addEventListener('click', () => document.getElementById('sidebar').classList.toggle('open'));

    const langBtn = document.getElementById('langToggle');
    if (langBtn) langBtn.addEventListener('click', () => {
        store.lang = store.lang === 'en' ? 'km' : 'en';
        render();
    });
}

window.startTimer = function () {
    const taskName = document.getElementById('taskInput').value;
    if (!taskName) return alert('INPUT REQUIRED');

    store.timer.active = true;
    store.timer.startTime = new Date();
    store.timer.taskName = taskName;
    render();

    if (store.timer.intervalId) clearInterval(store.timer.intervalId);
    store.timer.intervalId = setInterval(updateTimerDisplay, 1000);
    updateTimerDisplay();
}

window.stopTimer = function () {
    if (!store.timer.active) return;

    const durationMin = Math.max(0.1, (new Date() - store.timer.startTime) / 60000);
    const today = new Date().toLocaleDateString();

    if (!store.data[today]) store.data[today] = [];
    store.data[today].push({
        name: store.timer.taskName,
        duration: durationMin
    });

    localStorage.setItem('timeTrackerData', JSON.stringify(store.data));

    store.timer.active = false;
    clearInterval(store.timer.intervalId);
    render();
}

function updateTimerDisplay() {
    if (!store.timer.active) return;
    const diff = new Date() - store.timer.startTime;
    const display = new Date(diff).toISOString().substr(11, 8);

    const el = document.getElementById('timer-display');
    if (el) el.innerText = display;
}

function formatDuration(mins) {
    if (mins < 1) return "< 1m";
    return `${Math.round(mins)}m`;
}

function restoreTimer() { }

init();
