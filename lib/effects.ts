const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

const store = {
  get: (k: string) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
};

/** Runs once per page load: theme toggle and the Tashkent clock. */
export function initChrome(signal: AbortSignal) {
  const root = document.documentElement;
  const saved = store.get("rm-theme");
  if (saved === "light" || saved === "dark") root.dataset.theme = saved;
  const sysDark = matchMedia("(prefers-color-scheme: dark)");
  const effective = () => root.dataset.theme || (sysDark.matches ? "dark" : "light");

  const btn = $("#theme");
  const label = () => {
    if (!btn) return;
    const t = effective();
    btn.textContent = t === "dark" ? "Light" : "Dark";
    btn.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
  };
  label();
  btn?.addEventListener("click", () => {
    const next = effective() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    store.set("rm-theme", next);
    label();
  }, { signal });
  sysDark.addEventListener("change", label, { signal });

  const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Tashkent", hour: "2-digit", minute: "2-digit", hour12: false });
  const tick = () => { const s = fmt.format(new Date()); $$("[data-clock]").forEach(n => { n.textContent = s; }); };
  tick();
  const id = setInterval(tick, 15_000);
  signal.addEventListener("abort", () => clearInterval(id));
}

/** Runs on every route: scroll reveals. */
export function initPage(signal: AbortSignal) {
  const els = $$(".reveal");
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    els.forEach(e => e.classList.add("in"));
  } else {
    const io = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }, { rootMargin: "0px 0px -6% 0px" });
    els.forEach(e => io.observe(e));
    signal.addEventListener("abort", () => io.disconnect());
  }
}
