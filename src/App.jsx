import { useEffect, useRef, useState } from "react";

/* ---------- ICONS (simple inline SVG) ---------- */
const ICONS = {
  heart: <path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z" />,
  users: (<><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="17" cy="9" r="2.5" /><path d="M16 14.2c2.8.3 5 2.6 5 5.8" /></>),
  home: <path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  meals: (<><circle cx="12" cy="12" r="5" /><path d="M3 3v7M5.5 3v7M3 6.5h2.5M3 10h2.5v11M21 3c-2 1-3 3.5-3 6v2h3zM21 11v10" /></>),
  shield: (<><path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z" /><path d="M12 8.5v6M9 11.5h6" /></>),
  bowl: (<><path d="M3 11h18a9 9 0 0 1-18 0z" /><path d="M8 7c0-1 1-1.5 1-2.5M12 7c0-1 1-1.5 1-2.5M16 7c0-1 1-1.5 1-2.5" /></>),
  book: (<><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 5v16M8 7h7" /></>),
  medical: (<><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M12 7v10M7 12h10" /></>),
  check: (<><circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" /><path d="M7.5 12.5l3 3 6-6.5" stroke="#fff" /></>),
  pin: (<><path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></>),
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  mail: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>),
};

function Icon({ name, size = 24, className = "" }) {
  return (
    <svg className={`icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

/* Photo: shows your image if the file exists, otherwise our own illustration (art) */
function Photo({ src, alt, className = "", art }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`art ${className}`}>{art}</div>;
  return <img className={className} src={src} alt={alt} onError={() => setFailed(true)} />;
}

/* ---------- ILLUSTRATIONS (original vector art) ---------- */
function Kid({ x, y, s = 1, skin, hair = "#1d1d1f", shirt, pants = "#2b4a6b", girl = false, bag = "#ff7a2f" }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* school bag */}
      <rect x="-27" y="-78" width="16" height="38" rx="6" fill={bag} />
      {/* legs */}
      <rect x="-14" y="-32" width="11" height="32" rx="4" fill={pants} />
      <rect x="3" y="-32" width="11" height="32" rx="4" fill={pants} />
      <ellipse cx="-9" cy="1" rx="10" ry="4" fill="#222" />
      <ellipse cx="9" cy="1" rx="10" ry="4" fill="#222" />
      {/* body */}
      <rect x="-22" y="-82" width="44" height="54" rx="14" fill={shirt} />
      {/* arms */}
      <rect x="-31" y="-76" width="11" height="38" rx="5" fill={shirt} />
      <rect x="20" y="-76" width="11" height="38" rx="5" fill={shirt} />
      <circle cx="-25" cy="-36" r="6" fill={skin} />
      <circle cx="26" cy="-36" r="6" fill={skin} />
      {/* head */}
      <rect x="-5" y="-92" width="10" height="14" fill={skin} />
      <circle cx="0" cy="-102" r="23" fill={skin} />
      {/* hair */}
      <path d="M-23 -104 a23 23 0 0 1 46 0 q-8 -10 -23 -9 q-15 -1 -23 9z" fill={hair} />
      {girl && (
        <>
          <circle cx="-25" cy="-92" r="7" fill={hair} />
          <circle cx="25" cy="-92" r="7" fill={hair} />
          <circle cx="-25" cy="-100" r="3.5" fill="#ff4d6d" />
          <circle cx="25" cy="-100" r="3.5" fill="#ff4d6d" />
        </>
      )}
      {/* face */}
      <circle cx="-8" cy="-102" r="2.6" fill="#1d1d1f" />
      <circle cx="8" cy="-102" r="2.6" fill="#1d1d1f" />
      <circle cx="-13" cy="-94" r="4" fill="#ff8f8f" opacity=".45" />
      <circle cx="13" cy="-94" r="4" fill="#ff8f8f" opacity=".45" />
      <path d="M-7 -93 q7 8 14 0" stroke="#1d1d1f" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </g>
  );
}

const SKINS = ["#c68642", "#9b6030", "#e0a96d"];

function Cloud({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="#fff" opacity=".9">
      <ellipse cx="0" cy="0" rx="40" ry="16" />
      <ellipse cx="-20" cy="-10" rx="22" ry="14" />
      <ellipse cx="14" cy="-14" rx="26" ry="16" />
    </g>
  );
}

function AboutArt() {
  return (
    <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Smiling school children">
      <defs>
        <linearGradient id="skyA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fd8ff" /><stop offset="1" stopColor="#e6f6ff" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#skyA)" />
      <circle cx="500" cy="80" r="38" fill="#ffd95a" />
      <Cloud x={120} y={70} s={1.1} /><Cloud x={330} y={120} s={0.8} />
      <ellipse cx="130" cy="420" rx="340" ry="140" fill="#7bd88f" />
      <ellipse cx="500" cy="440" rx="360" ry="150" fill="#4fc178" />
      <path d="M300 70 c-14 -22 -44 -4 -26 18 l26 24 26 -24 c18 -22 -12 -40 -26 -18z" fill="#ff4d6d" />
      <Kid x={170} y={360} s={1.75} skin={SKINS[0]} shirt="#ffffff" girl bag="#0a9fe3" />
      <Kid x={300} y={370} s={1.95} skin={SKINS[1]} shirt="#0a9fe3" bag="#ff7a2f" />
      <Kid x={430} y={360} s={1.75} skin={SKINS[2]} shirt="#ffd95a" girl pants="#8a3ffc" bag="#2e9e5b" />
    </svg>
  );
}

function ClassArt() {
  return (
    <svg viewBox="0 0 800 520" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Children in a classroom">
      <rect width="800" height="520" fill="#d6eefb" />
      <rect y="400" width="800" height="120" fill="#d9b88a" />
      {/* blackboard */}
      <rect x="50" y="60" width="430" height="210" rx="10" fill="#2f6f5e" stroke="#9a6a35" strokeWidth="10" />
      <text x="90" y="150" fontSize="54" fontWeight="700" fill="#fff" opacity=".92" fontFamily="Segoe UI, Arial">A B C  1 2 3</text>
      <path d="M90 190 h300 M90 225 h200" stroke="#fff" strokeWidth="5" opacity=".6" strokeLinecap="round" />
      {/* window */}
      <rect x="560" y="70" width="190" height="170" rx="6" fill="#bfe9ff" stroke="#fff" strokeWidth="8" />
      <path d="M655 70 v170 M560 155 h190" stroke="#fff" strokeWidth="6" />
      <circle cx="710" cy="115" r="20" fill="#ffd95a" />
      {/* kids */}
      <Kid x={640} y={470} s={2.05} skin={SKINS[2]} shirt="#ff7a2f" girl pants="#2b4a6b" bag="#0a9fe3" />
      <Kid x={250} y={470} s={2.3} skin={SKINS[0]} shirt="#ffffff" girl bag="#ff7a2f" />
      {/* desk */}
      <rect x="110" y="365" width="330" height="22" rx="6" fill="#c98a4b" />
      <rect x="130" y="387" width="14" height="95" fill="#9a6a35" />
      <rect x="405" y="387" width="14" height="95" fill="#9a6a35" />
      <rect x="150" y="335" width="70" height="30" rx="3" fill="#e63946" />
      <rect x="160" y="310" width="70" height="26" rx="3" fill="#0a9fe3" />
      <rect x="320" y="340" width="60" height="25" rx="3" fill="#2e9e5b" />
    </svg>
  );
}

function HeroArt() {
  return (
    <svg viewBox="0 0 1200 500" preserveAspectRatio="xMidYMax slice" role="img" aria-label="Children walking to school">
      <defs>
        <linearGradient id="skyH" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a6fb0" /><stop offset="1" stopColor="#6fd3ff" />
        </linearGradient>
      </defs>
      <rect width="1200" height="500" fill="url(#skyH)" />
      <circle cx="1010" cy="110" r="62" fill="#ffe07a" opacity=".95" />
      <Cloud x={470} y={90} s={1.6} /><Cloud x={760} y={160} s={1.2} /><Cloud x={1120} y={230} s={1} />
      <ellipse cx="300" cy="520" rx="560" ry="150" fill="#3fae6a" />
      <ellipse cx="950" cy="540" rx="620" ry="170" fill="#2e9e5b" />
      {/* school building */}
      <g transform="translate(900 270)">
        <rect x="0" y="40" width="170" height="110" fill="#f3d9b1" />
        <path d="M-10 45 L85 -5 L180 45z" fill="#c8553d" />
        <rect x="70" y="90" width="30" height="60" rx="3" fill="#8a5a2b" />
        <rect x="18" y="68" width="30" height="30" fill="#bfe9ff" /><rect x="122" y="68" width="30" height="30" fill="#bfe9ff" />
        <path d="M85 -5 v-40" stroke="#555" strokeWidth="3" /><path d="M85 -45 h30 l-8 8 8 8 h-30z" fill="#ff7a2f" />
      </g>
      <Kid x={560} y={500} s={2.3} skin={SKINS[0]} shirt="#ffffff" girl bag="#0a9fe3" />
      <Kid x={670} y={510} s={2.55} skin={SKINS[1]} shirt="#ff7a2f" bag="#ffd95a" />
      <Kid x={780} y={500} s={2.2} skin={SKINS[2]} shirt="#ffd95a" girl pants="#8a3ffc" bag="#2e9e5b" />
    </svg>
  );
}

/* ---------- DATA ---------- */
const CAUSES = [
  { icon: "bowl", title: "Food", text: "Nutritious meals for children and families facing hunger.", impact: "₹500 feeds a child for a month" },
  { icon: "book", title: "Education", text: "School kits, fees and learning support so every child can study.", impact: "₹1,000 sponsors school kits" },
  { icon: "medical", title: "Medical", text: "Health check-ups, medicines and emergency care for those in need.", impact: "₹2,000 funds a medical camp visit" },
];

const AMOUNTS = [100, 500, 1000, 2000];

const STATS = [
  { icon: "users", value: 12500, label: "Children helped", suffix: "+" },
  { icon: "home", value: 85, label: "Villages reached", suffix: "" },
  { icon: "meals", value: 40000, label: "Meals served", suffix: "+" },
  { icon: "shield", value: 320, label: "Medical camps", suffix: "" },
];

const STORIES = [
  { name: "Priya, 12", text: "Because of HopeCare I got my school books and uniform. I want to become a teacher one day." },
  { name: "Murugan, parent", text: "The medical camp saved my son's health. We are thankful to every donor." },
  { name: "Anitha, volunteer", text: "Seeing children smile after a hot meal is the best part of my week." },
];

const FAQ = [
  { q: "Is my donation safe?", a: "This is a demo project, so no real payment is taken. A real site would use a secure payment gateway." },
  { q: "Will I get a receipt?", a: "Yes, a thank-you message with your receipt number is shown after donating." },
  { q: "Can I donate every month?", a: "Yes. Choose 'Monthly' on the donate form to support children regularly." },
];

const NAV = [
  ["Home", "home"],
  ["Who we are", "about"],
  ["What we do", "causes"],
  ["Stories", "stories"],
  ["Contact", "contact"],
];

/* ---------- HELPERS ---------- */
function useCountUp(target, start) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let frame;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / 1400, 1);
      setN(Math.floor(target * p));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start]);
  return n;
}

function Stat({ icon, value, label, suffix, start }) {
  const n = useCountUp(value, start);
  return (
    <div className="stat">
      <Icon name={icon} size={44} className="stat-icon" />
      <div>
        <div className="stat-num">{n.toLocaleString("en-IN")}{suffix}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}

function Stats() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section className="stats" ref={ref}>
      <div className="container stats-grid">
        {STATS.map((s) => <Stat key={s.label} {...s} start={seen} />)}
      </div>
    </section>
  );
}

/* ---------- HEADER ---------- */
function Header({ onNav }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const go = (id) => { setOpen(false); setActive(id); onNav(id); };

  return (
    <>
      <div className="langrow">
        <div className="container langrow-inner">
          <select aria-label="Language" defaultValue="English">
            <option>English</option>
            <option>தமிழ்</option>
            <option>हिन्दी</option>
          </select>
        </div>
      </div>
      <header className="header">
        <div className="container header-inner">
          <a className="logo" href="#home" onClick={() => go("home")}>
            <Icon name="heart" size={30} className="logo-icon" />
            <b>Hope</b>Care<small>for every child</small>
          </a>
          <button className="menu-btn" aria-label="Menu" onClick={() => setOpen(!open)}>
            {open ? "✕" : "☰"}
          </button>
          <nav className={`nav ${open ? "open" : ""}`}>
            {NAV.map(([label, id]) => (
              <a key={id} href={`#${id}`} className={active === id ? "active" : ""} onClick={() => go(id)}>{label}</a>
            ))}
            <a className="btn btn-small nav-donate" href="#donate" onClick={() => go("donate")}>
              <Icon name="heart" size={15} /> Donate
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}

/* ---------- HERO ---------- */
function Hero({ onNav }) {
  return (
    <section id="home" className="hero">
      {/* Your own photo at  public/images/hero.jpg  replaces the illustration */}
      <div className="hero-media">
        <Photo className="hero-img" src="/images/hero.jpg" alt="Smiling child" art={<HeroArt />} />
      </div>
      <div className="hero-shade" />
      <div className="container hero-grid">
        <div className="hero-text">
          <span className="pill">Child relief fund</span>
          <h1>Every child deserves food, education and <em>care</em></h1>
          <p>
            HopeCare is a charity working with families in need. Your donation
            gives a child a healthier, happier and brighter future.
          </p>
          <div className="hero-actions">
            <a className="btn btn-big" href="#donate" onClick={() => onNav("donate")}>Donate Now <Icon name="heart" size={16} /></a>
            <a className="btn btn-big btn-ghost" href="#causes" onClick={() => onNav("causes")}>See our work</a>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-art"><span>👦</span><span>👧</span><span className="red">❤️</span></div>
          <h3>Help us reach ₹5,00,000</h3>
          <div className="progress"><div className="progress-bar" style={{ width: "68%" }} /></div>
          <p><strong>₹3,40,000</strong> raised · 68% of goal</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- ABOUT ---------- */
function About() {
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        {/* Put your photo at  public/images/about.jpg  */}
        <Photo className="about-photo" src="/images/about.jpg" alt="Smiling children" art={<AboutArt />} />
        <div>
          <span className="kicker">About HopeCare</span>
          <h2>Together, We Can Make A Difference</h2>
          <p>
            HopeCare is a community-driven organization supporting underprivileged
            children and families. We focus on three areas: food, education and healthcare.
          </p>
          <p>
            Every donation, big or small, goes straight towards helping someone in
            need. We believe in transparency, compassion and lasting change.
          </p>
        </div>
        <ul className="checks">
          {[
            "100% of donations go to programs",
            "Transparent reports for every donor",
            "Run by local volunteers",
            "Focused on children and families",
          ].map((t) => (
            <li key={t}><Icon name="check" size={22} className="check" /> {t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- CAUSES ---------- */
function Causes({ onPick }) {
  return (
    <section id="causes" className="causes">
      <div className="container causes-grid">
        <div className="causes-head">
          <span className="kicker">What we do</span>
          <h2>Choose a cause close to your heart.</h2>
        </div>
        {CAUSES.map((c) => (
          <div className="cause-card" key={c.title}>
            <div className="cause-top">
              <span className="cause-icon"><Icon name={c.icon} size={26} /></span>
              <h3>{c.title}</h3>
            </div>
            <p>{c.text}</p>
            <div className="impact-pill">{c.impact}</div>
            <a className="btn btn-blue" href="#donate" onClick={() => onPick(c.title)}>Donate for {c.title}</a>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- FEATURED STORY (big photo + text) ---------- */
function Featured({ onNav }) {
  return (
    <section className="section">
      <div className="container featured">
        {/* Put your photo at  public/images/story.jpg  */}
        <figure className="featured-photo">
          <Photo className="featured-img" src="/images/story.jpg" alt="Children in a classroom" art={<ClassArt />} />
        </figure>
        <div>
          <span className="kicker">Featured story</span>
          <h2>Every child has the right to learn</h2>
          <p>
            In many villages, children still sit in crowded classrooms with no books
            and no school meals. With your support, HopeCare provides school kits,
            hot meals and learning help so that no child is left behind.
          </p>
          <p className="muted">Your donation can bring a child back to class.</p>
          <a className="btn btn-big" href="#donate" onClick={() => onNav("donate")}>
            Support a child <Icon name="heart" size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- STEPS ---------- */
function Steps() {
  const steps = [
    ["1", "Choose", "Pick an amount and a cause."],
    ["2", "Donate", "Enter your name and email."],
    ["3", "Impact", "We use it to help a child."],
  ];
  return (
    <section className="section">
      <div className="container">
        <h2 className="center">How your donation helps</h2>
        <div className="steps">
          {steps.map(([n, t, d]) => (
            <div className="step" key={n}>
              <div className="step-n">{n}</div>
              <h3>{t}</h3>
              <p className="muted">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- DONATE ---------- */
function Donate({ cause, setCause }) {
  const [freq, setFreq] = useState("once");
  const [amount, setAmount] = useState(500);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState("UPI");
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(null);

  const finalAmount = custom ? Number(custom) : amount;

  const submit = (ev) => {
    ev.preventDefault();
    const e = {};
    if (!finalAmount || finalAmount < 1) e.amount = "Please select or enter an amount";
    if (!name.trim()) e.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Please enter a valid email";
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setDone({ name: name.trim(), email, amount: finalAmount, cause, freq, method, id: "HC" + Date.now().toString().slice(-6) });
    }
  };

  const reset = () => { setDone(null); setName(""); setEmail(""); setCustom(""); setAmount(500); setFreq("once"); };

  return (
    <section id="donate" className="section donate-section">
      <div className="container donate-grid">
        <div className="donate-info">
          <span className="kicker light">Take action</span>
          <h2>Make a donation</h2>
          <p>Your gift today can give a child a meal, a book or medical care.</p>
          <ul className="ticks">
            <li>🍲 ₹500 feeds a child for a month</li>
            <li>📚 ₹1,000 sponsors school kits</li>
            <li>🩺 ₹2,000 funds a medical camp visit</li>
          </ul>
        </div>

        {done ? (
          <div className="success" role="status">
            <div className="tick">✅</div>
            <h3>Thank you for your donation!</h3>
            <p>
              Dear <strong>{done.name}</strong>, your {done.freq === "monthly" ? "monthly " : ""}
              donation of <strong>₹{done.amount.toLocaleString("en-IN")}</strong> towards{" "}
              <strong>{done.cause}</strong> will help a child in need.
            </p>
            <p className="muted small">Receipt no: {done.id} · Paid via {done.method} · Confirmation for {done.email}</p>
            <button className="btn" onClick={reset}>Donate Again</button>
          </div>
        ) : (
          <form className="form" onSubmit={submit} noValidate>
            <div className="toggle">
              <button type="button" className={freq === "once" ? "on" : ""} onClick={() => setFreq("once")}>One-time</button>
              <button type="button" className={freq === "monthly" ? "on" : ""} onClick={() => setFreq("monthly")}>Monthly</button>
            </div>

            <label>Choose an amount</label>
            <div className="amounts">
              {AMOUNTS.map((a) => (
                <button type="button" key={a} className={`amt ${!custom && amount === a ? "active" : ""}`}
                  onClick={() => { setAmount(a); setCustom(""); }}>
                  ₹{a.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
            <input type="number" min="1" placeholder="Or enter custom amount (₹)" value={custom} onChange={(e) => setCustom(e.target.value)} />
            {errors.amount && <span className="error">{errors.amount}</span>}

            <label htmlFor="cause">Cause</label>
            <select id="cause" value={cause} onChange={(e) => setCause(e.target.value)}>
              {CAUSES.map((c) => <option key={c.title}>{c.title}</option>)}
            </select>

            <label htmlFor="name">Full name</label>
            <input id="name" type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <span className="error">{errors.name}</span>}

            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <span className="error">{errors.email}</span>}

            <label>Payment method</label>
            <div className="methods">
              {[["UPI", "📱"], ["Card", "💳"], ["Net Banking", "🏦"]].map(([m, icon]) => (
                <button type="button" key={m} className={`method ${method === m ? "active" : ""}`} onClick={() => setMethod(m)}>
                  <span>{icon}</span> {m}
                </button>
              ))}
            </div>
            <div className="method-box">
              {method === "UPI" && <input type="text" placeholder="yourname@upi" />}
              {method === "Card" && (
                <>
                  <input type="text" inputMode="numeric" maxLength="19" placeholder="Card number (demo)" />
                  <div className="method-row">
                    <input type="text" placeholder="MM/YY" maxLength="5" />
                    <input type="password" placeholder="CVV" maxLength="3" />
                  </div>
                </>
              )}
              {method === "Net Banking" && (
                <select defaultValue="">
                  <option value="" disabled>Select your bank</option>
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Canara Bank</option>
                  <option>Indian Bank</option>
                </select>
              )}
            </div>

            <button className="btn btn-big" type="submit">
              Donate ₹{(finalAmount || 0).toLocaleString("en-IN")}{freq === "monthly" ? " / month" : ""}
            </button>
            <p className="muted center small">🔒 Demo project – no real payment is processed.</p>
          </form>
        )}
      </div>
    </section>
  );
}

/* ---------- STORIES ---------- */
function Stories() {
  return (
    <section id="stories" className="section alt">
      <div className="container">
        <span className="kicker center-k">Stories</span>
        <h2 className="center">Stories of hope</h2>
        <div className="cards3">
          {STORIES.map((s) => (
            <blockquote className="story" key={s.name}>
              <p>“{s.text}”</p>
              <footer>— {s.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section">
      <div className="container narrow">
        <h2 className="center">Questions</h2>
        {FAQ.map((f, i) => (
          <div className="faq" key={f.q}>
            <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
              {f.q}<span>{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <p className="faq-a">{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="section alt">
      <div className="container two-col">
        <div>
          <span className="kicker">Contact</span>
          <h2>Contact us</h2>
          <ul className="contact-info">
            <li><Icon name="pin" size={20} /> 12, Hope Street, Kovilpatti, Tamil Nadu</li>
            <li><Icon name="phone" size={20} /> +91 98765 43210</li>
            <li><Icon name="mail" size={20} /> help@hopecare.org</li>
          </ul>
        </div>
        {sent ? (
          <p className="success-inline">Thanks! We'll get back to you soon.</p>
        ) : (
          <form className="form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <input type="text" placeholder="Your name" required />
            <input type="email" placeholder="Your email" required />
            <textarea rows="4" placeholder="Your message" required />
            <button className="btn" type="submit">Send Message</button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer({ onNav }) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="logo foot-logo"><Icon name="heart" size={26} className="logo-icon" /><b>Hope</b>Care</div>
          <p>for every child</p>
        </div>
        <div>
          <h4>Explore</h4>
          {NAV.map(([t, id]) => <a key={id} href={`#${id}`} onClick={() => onNav(id)}>{t}</a>)}
        </div>
        <div>
          <h4>Get involved</h4>
          <a href="#donate" onClick={() => onNav("donate")}>Donate</a>
          <a href="#contact" onClick={() => onNav("contact")}>Volunteer</a>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} HopeCare. Made with ❤️ for a better tomorrow.
      </div>
    </footer>
  );
}

/* ---------- APP ---------- */
export default function App() {
  const [cause, setCause] = useState("Food");
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <Header onNav={scrollTo} />
      <main>
        <Hero onNav={scrollTo} />
        <Stats />
        <About />
        <Causes onPick={setCause} />
        <Featured onNav={scrollTo} />
        <Steps />
        <Donate cause={cause} setCause={setCause} />
        <Stories />
        <Faq />
        <Contact />
      </main>
      <Footer onNav={scrollTo} />
    </>
  );
}
