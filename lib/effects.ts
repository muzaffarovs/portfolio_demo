/* Imperative page effects, ported from the original single-file site.
   Everything is tied to an AbortSignal so client-side navigation tears it down cleanly. */

type El = HTMLElement;
const $ = <T extends Element = El>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = El>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = () => matchMedia("(hover: hover) and (pointer: fine)").matches;

class Aborted extends Error {}

function sleeper(signal: AbortSignal) {
  return (ms: number) =>
    new Promise<void>((res, rej) => {
      if (signal.aborted) return rej(new Aborted());
      const t = setTimeout(res, ms);
      signal.addEventListener("abort", () => { clearTimeout(t); rej(new Aborted()); }, { once: true });
    });
}

/* visibility helper: loops only run while on screen */
function watcher(signal: AbortSignal) {
  return (el: Element) => {
    const s = { on: false, q: [] as (() => void)[], ready: () => Promise.resolve() };
    const io = new IntersectionObserver(es => {
      s.on = es[es.length - 1].isIntersecting;
      if (s.on) s.q.splice(0).forEach(f => f());
    }, { rootMargin: "80px" });
    io.observe(el);
    signal.addEventListener("abort", () => io.disconnect(), { once: true });
    s.ready = () =>
      s.on ? Promise.resolve() : new Promise<void>((res, rej) => {
        s.q.push(res);
        signal.addEventListener("abort", () => rej(new Aborted()), { once: true });
      });
    return s;
  };
}

const quiet = (p: Promise<unknown>) => p.catch(e => { if (!(e instanceof Aborted)) console.error(e); });

/* ---- obsidian renderer: faceted volcanic glass, a roaming light, rising embers ---- */
const hash = (n: number) => { n = Math.sin(n * 127.1) * 43758.5453; return n - Math.floor(n); };
type Pt = [number, number];
type Tri = { p: Pt[]; cx: number; cy: number; nx: number; ny: number; nz: number; tone: number };
type Spark = { x: number; y: number; vy: number; vx: number; r: number; life: number; decay: number; seed: number };

function makeObsidian(canvas: HTMLCanvasElement, o: { cell?: number; embers?: number } = {}) {
  const ctx = canvas.getContext("2d")!;
  const CELL = o.cell || 64, EMBERS = o.embers ?? 40;
  let W = 1, H = 1, tris: Tri[] = [], sparks: Spark[] = [], last = 0;
  const st = { px: -1e4, py: -1e4, heat: 0, heatT: 0, lx: 0, ly: 0 };
  const spark = (x?: number, y?: number, hot?: boolean): Spark => ({
    x: x ?? Math.random() * W, y: y ?? H + Math.random() * H * 0.5,
    vy: (hot ? 0.06 : 0.02) + Math.random() * 0.05, vx: (Math.random() - 0.5) * (hot ? 0.08 : 0.02),
    r: 0.6 + Math.random() * (hot ? 1.8 : 1.3), life: 1, decay: hot ? 0.0009 + Math.random() * 0.0012 : 0, seed: Math.random() * 6.283,
  });
  function resize() {
    const r = canvas.getBoundingClientRect();
    W = Math.max(1, r.width); H = Math.max(1, r.height);
    const dpr = Math.min(2, devicePixelRatio || 1);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // jittered grid, each quad split into two facets with a random tilt
    const cols = Math.ceil(W / CELL) + 2, rows = Math.ceil(H / CELL) + 2, g: Pt[] = [];
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const k = y * cols + x;
      g.push([(x - 1) * CELL + (hash(k + 1) - 0.5) * CELL * 0.9, (y - 1) * CELL + (hash(k + 99) - 0.5) * CELL * 0.9]);
    }
    tris = [];
    for (let y = 0; y < rows - 1; y++) for (let x = 0; x < cols - 1; x++) {
      const a = g[y * cols + x], b = g[y * cols + x + 1], c = g[(y + 1) * cols + x], d = g[(y + 1) * cols + x + 1];
      const pair = hash(y * 31 + x * 7) > 0.5 ? [[a, b, d], [a, d, c]] : [[a, b, c], [b, d, c]];
      for (const p of pair) {
        const s = tris.length + 1;
        let nx = (hash(s * 3.1) - 0.5) * 1.5, ny = (hash(s * 5.7) - 0.5) * 1.5, nz = 1;
        const m = Math.hypot(nx, ny, nz); nx /= m; ny /= m; nz /= m;
        tris.push({ p, cx: (p[0][0] + p[1][0] + p[2][0]) / 3, cy: (p[0][1] + p[1][1] + p[2][1]) / 3, nx, ny, nz, tone: hash(s * 9.3) });
      }
    }
    sparks = Array.from({ length: EMBERS }, () => { const e = spark(); e.y = Math.random() * H; return e; });
    st.lx = W * 0.7; st.ly = H * 0.25;
  }
  function burst(x: number, y: number) { if (sparks.length < EMBERS + 60) sparks.push(spark(x, y, true)); }
  function draw(t: number) {
    const dt = Math.min(48, last ? t - last : 16); last = t;
    st.heat += (st.heatT - st.heat) * 0.06;
    const tx = st.heatT ? st.px : W * (0.5 + 0.38 * Math.sin(t * 0.00031));
    const ty = st.heatT ? st.py : H * (0.38 + 0.3 * Math.cos(t * 0.00023));
    st.lx += (tx - st.lx) * 0.07; st.ly += (ty - st.ly) * 0.07;
    const R2 = (Math.max(W, H) * 0.55) ** 2;
    ctx.fillStyle = "#050407"; ctx.fillRect(0, 0, W, H);
    ctx.lineJoin = "round";
    for (const f of tris) {
      const dx = st.lx - f.cx, dy = st.ly - f.cy, dz = 260;
      const m = Math.hypot(dx, dy, dz);
      const lam = Math.max(0, (f.nx * dx + f.ny * dy + f.nz * dz) / m);
      const fall = 1 / (1 + (dx * dx + dy * dy) / R2);
      const spec = lam ** 28 * fall;
      const k = lam * lam * fall;
      const v = 8 + f.tone * 6;
      ctx.fillStyle = `rgb(${v + 30 * k + 225 * spec | 0},${v - 2 + 18 * k + 205 * spec | 0},${v + 6 + 40 * k + 215 * spec | 0})`;
      ctx.beginPath(); ctx.moveTo(f.p[0][0], f.p[0][1]); ctx.lineTo(f.p[1][0], f.p[1][1]); ctx.lineTo(f.p[2][0], f.p[2][1]); ctx.closePath();
      ctx.fill();
      // cracks run hot near the pointer
      const near = Math.max(0, 1 - Math.hypot(st.px - f.cx, st.py - f.cy) / 170) * st.heat;
      ctx.strokeStyle = `rgba(240,53,75,${0.05 + near * 0.75 + spec * 0.3})`;
      ctx.lineWidth = 0.7 + near * 1.2;
      ctx.stroke();
    }
    ctx.globalCompositeOperation = "lighter";
    if (st.heat > 0.02) {
      const g = ctx.createRadialGradient(st.px, st.py, 0, st.px, st.py, 190);
      g.addColorStop(0, `rgba(240,53,75,${0.22 * st.heat})`); g.addColorStop(1, "rgba(240,53,75,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    }
    for (let i = sparks.length - 1; i >= 0; i--) {
      const e = sparks[i];
      e.y -= e.vy * dt; e.x += (e.vx + Math.sin(t * 0.0012 + e.seed) * 0.012) * dt;
      if (e.decay) e.life -= e.decay * dt;
      if (e.life <= 0) { sparks.splice(i, 1); continue; }
      if (e.y < -10) { if (e.decay) { sparks.splice(i, 1); continue; } Object.assign(e, spark()); }
      const fl = 0.55 + 0.45 * Math.sin(t * 0.01 + e.seed * 7);
      ctx.fillStyle = e.seed > 3.6 ? `rgba(255,107,44,${0.85 * fl * e.life})` : `rgba(240,53,75,${0.9 * fl * e.life})`;
      ctx.beginPath(); ctx.arc(e.x, e.y, e.r, 0, 6.283); ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
    const v = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.25, W / 2, H / 2, Math.max(W, H) * 0.75);
    v.addColorStop(0, "rgba(0,0,0,0)"); v.addColorStop(1, "rgba(0,0,0,.7)");
    ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
  }
  return { resize, draw, burst, st };
}

function runGlass(signal: AbortSignal, canvas: HTMLCanvasElement, host: Element, opts: { cell?: number; embers?: number }, animate: boolean) {
  const ob = makeObsidian(canvas, opts);
  const t0 = performance.now();
  const still = 4200;
  const rm = reduce();
  ob.resize(); ob.draw(still);
  const ro = new ResizeObserver(() => { ob.resize(); ob.draw(animate && !rm ? performance.now() - t0 : still); });
  ro.observe(host);
  signal.addEventListener("abort", () => ro.disconnect(), { once: true });
  if (!animate || rm) return ob;
  const vis = watcher(signal)(host);
  const frame = (now: number) => {
    if (signal.aborted) return;
    if (!vis.on) { quiet(vis.ready().then(() => { requestAnimationFrame(frame); })); return; }
    ob.draw(now - t0 + still);
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
  return ob;
}

/* ================= chrome: lives in the layout, runs once ================= */
export function initChrome(signal: AbortSignal) {
  const root = document.documentElement;
  const on = { signal };

  /* ---- theme ---- */
  const store = {
    get(k: string) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* storage blocked */ } },
  };
  const sysLight = matchMedia("(prefers-color-scheme: light)");
  const saved = store.get("rm-theme");
  if (saved === "light" || saved === "dark") root.dataset.theme = saved;
  const effective = () => root.dataset.theme || (sysLight.matches ? "light" : "dark");
  const themeBtn = $("#theme");
  const syncTheme = () => {
    if (!themeBtn) return;
    const t = effective();
    themeBtn.dataset.mode = t;
    themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
  };
  themeBtn?.addEventListener("click", () => {
    const next = effective() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    store.set("rm-theme", next);
    syncTheme();
  }, on);
  sysLight.addEventListener("change", syncTheme, on);
  const mo = new MutationObserver(syncTheme);
  mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  signal.addEventListener("abort", () => mo.disconnect(), { once: true });
  syncTheme();

  /* ---- Tashkent clock ---- */
  let fmt: Intl.DateTimeFormat | null = null;
  try { fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Tashkent", hour: "2-digit", minute: "2-digit" }); } catch { /* old engine */ }
  const tick = () => {
    const d = new Date();
    const s = fmt ? fmt.format(d) : new Date(d.getTime() + 5 * 36e5).toISOString().slice(11, 16);
    $$("[data-clock]").forEach(n => { n.textContent = s; });
  };
  tick();
  const iv = setInterval(tick, 20000);
  signal.addEventListener("abort", () => clearInterval(iv), { once: true });

  /* ---- scroll progress fallback ---- */
  if (!(window.CSS && CSS.supports("animation-timeline: scroll()"))) {
    const nav = $(".nav")!; let queued = false;
    const upd = () => {
      queued = false;
      const h = root.scrollHeight - innerHeight;
      nav.style.setProperty("--p", h > 0 ? (scrollY / h).toFixed(4) : "0");
    };
    addEventListener("scroll", () => { if (!queued) { queued = true; requestAnimationFrame(upd); } }, { passive: true, signal });
    upd();
  }

  const selvage = $<HTMLCanvasElement>("#selvage");
  if (selvage) runGlass(signal, selvage, $(".selvage")!, { cell: 22, embers: 30 }, true);

  /* ---- type "metal" anywhere: the page headbangs ---- */
  let buf = "";
  addEventListener("keydown", e => {
    if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
    buf = (buf + e.key.toLowerCase()).slice(-5);
    if (buf !== "metal" || root.classList.contains("ritual")) return;
    buf = "";
    root.classList.add("ritual");
    setTimeout(() => root.classList.remove("ritual"), reduce() ? 900 : 2300);
  }, on);

  if (reduce()) return;

  /* ---- ash: sparse flakes falling, embers rising, about 30 fps ---- */
  const cv = document.createElement("canvas");
  cv.className = "ash"; cv.setAttribute("aria-hidden", "true");
  document.body.prepend(cv);
  signal.addEventListener("abort", () => cv.remove(), { once: true });
  const ctx = cv.getContext("2d")!;
  type Flake = { ember: boolean; x: number; y: number; v: number; r: number; a: number; s: number; w: number };
  let W = 0, H = 0, flakes: Flake[] = [], tint = "", last = 0, frame = 0;
  const flake = (top: boolean): Flake => {
    const ember = Math.random() < 0.12;
    return {
      ember, x: Math.random() * W, y: top ? Math.random() * H : (ember ? H + 10 : -10),
      v: ember ? -(0.012 + Math.random() * 0.02) : 0.008 + Math.random() * 0.018,
      r: ember ? 0.8 + Math.random() * 1.1 : 0.6 + Math.random() * 1.6,
      a: ember ? 0.45 + Math.random() * 0.4 : 0.12 + Math.random() * 0.22,
      s: Math.random() * 6.283, w: 0.15 + Math.random() * 0.35,
    };
  };
  const size = () => {
    const dpr = Math.min(1.5, devicePixelRatio || 1);
    W = innerWidth; H = innerHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = W < 720 ? 26 : 54;
    flakes = Array.from({ length: n }, () => flake(true));
  };
  size(); addEventListener("resize", size, on);
  const draw = (now: number) => {
    if (signal.aborted) return;
    requestAnimationFrame(draw);
    if (now - last < 32) return;
    const dt = Math.min(64, now - last); last = now;
    if (frame++ % 60 === 0) tint = getComputedStyle(root).getPropertyValue("--ink-2").trim() || "#A8A0AE";
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < flakes.length; i++) {
      const f = flakes[i];
      f.y += f.v * dt; f.x += Math.sin(now * 0.0006 + f.s) * f.w * dt * 0.02;
      if (f.y > H + 12 || f.y < -12) flakes[i] = flake(false);
      if (f.ember) {
        ctx.globalAlpha = f.a * (0.6 + 0.4 * Math.sin(now * 0.008 + f.s * 5));
        ctx.fillStyle = f.s > 3.1 ? "#FF6B2C" : "#F0354B";
      } else {
        ctx.globalAlpha = f.a; ctx.fillStyle = tint;
      }
      ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.283); ctx.fill();
    }
    ctx.globalAlpha = 1;
  };
  requestAnimationFrame(draw);
}

/* ================= page: re-runs on every route change ================= */
export function initPage(signal: AbortSignal) {
  const on = { signal };
  const rm = reduce();

  /* ---- copy email ---- */
  const copy = $("#copy");
  copy?.addEventListener("click", async () => {
    const toast = $("#toast") as (El & { _h?: ReturnType<typeof setTimeout> }) | null;
    if (!toast) return;
    const email = $(".mail")?.textContent || "";
    try {
      await navigator.clipboard.writeText(email);
      toast.textContent = "Copied to clipboard";
    } catch {
      const r = document.createRange();
      r.selectNodeContents($(".mail")!);
      const s = getSelection()!; s.removeAllRanges(); s.addRange(r);
      toast.textContent = "Selected. Press Ctrl/⌘ + C to copy";
    }
    clearTimeout(toast._h);
    toast._h = setTimeout(() => { toast.textContent = ""; }, 2600);
  }, on);

  /* ---- pointer spotlight + magnetic buttons ---- */
  if (fine()) {
    $$("[data-spot]").forEach(el => el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", (e.clientX - r.left) + "px");
      el.style.setProperty("--my", (e.clientY - r.top) + "px");
    }, on));
    if (!rm) $$(".magnetic").forEach(b => {
      b.addEventListener("pointermove", e => {
        const r = b.getBoundingClientRect();
        b.style.setProperty("--bx", ((e.clientX - r.left - r.width / 2) * 0.22) + "px");
        b.style.setProperty("--by", ((e.clientY - r.top - r.height / 2) * 0.3) + "px");
      }, on);
      b.addEventListener("pointerleave", () => { b.style.removeProperty("--bx"); b.style.removeProperty("--by"); }, on);
    });
  }

  const cloth = $("#cloth");
  if (cloth) initHome(signal, cloth);
}

function initHome(signal: AbortSignal, cloth: El) {
  const on = { signal };
  const rm = reduce();
  const sleep = sleeper(signal);
  const watch = watcher(signal);
  const me = $("#me")!;

  const hero = runGlass(signal, $<HTMLCanvasElement>("#ikat")!, cloth, { cell: 62, embers: 46 }, true);
  cloth.addEventListener("pointermove", e => {
    const r = cloth.getBoundingClientRect();
    hero.st.px = e.clientX - r.left; hero.st.py = e.clientY - r.top; hero.st.heatT = 1;
    if (rm) { hero.draw(4200); return; }
    if (Math.random() < 0.5) hero.burst(hero.st.px, hero.st.py);
    // the paper figure drifts against the pointer, so it reads as standing in front of the glass
    me.style.setProperty("--fx", (((e.clientX - r.left) / r.width - 0.5) * -16) + "px");
    me.style.setProperty("--fy", (((e.clientY - r.top) / r.height - 0.5) * -8) + "px");
  }, on);
  cloth.addEventListener("pointerleave", () => {
    hero.st.heatT = 0;
    me.style.removeProperty("--fx"); me.style.removeProperty("--fy");
  }, on);
  runGlass(signal, $<HTMLCanvasElement>("#post-ikat")!, $(".post-img")!, { cell: 34, embers: 18 }, true);

  /* ---- name: letters trade weight near the pointer ---- */
  if (!rm) {
    const nameEl = $(".name")!, letters = $$(".name .l");
    let rects: DOMRect[] | null = null, raf = 0, ev: PointerEvent | null = null;
    const measure = () => { rects = letters.map(l => l.getBoundingClientRect()); };
    nameEl.addEventListener("pointerenter", measure, on);
    addEventListener("scroll", () => { rects = null; }, { passive: true, signal });
    nameEl.addEventListener("pointermove", e => {
      ev = e;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!rects) measure();
        letters.forEach((l, k) => {
          const r = rects![k];
          const d = Math.hypot(ev!.clientX - (r.left + r.width / 2), (ev!.clientY - (r.top + r.height / 2)) * 1.6);
          const f = Math.max(0, 1 - d / 220) ** 1.5;
          const top = l.parentElement!.classList.contains("n1");
          l.style.setProperty("--g", String(top ? 900 - 650 * f : 300 + 600 * f));
        });
      });
    }, on);
    nameEl.addEventListener("pointerleave", () => {
      rects = null;
      letters.forEach(l => { l.style.removeProperty("--g"); });
    }, on);
  }

  if (rm) return;

  /* ---- Aylo demo loop ---- */
  quiet((async () => {
    const cm = $("#aylo-comments")!, dm = $("#aylo-dm")!, rule = $("#aylo-rule")!;
    const msgs = [...dm.children].map(n => n.cloneNode(true) as El);
    const fresh = cm.querySelector(".new")!.cloneNode(true) as El;
    fresh.querySelector("mark")!.classList.remove("lit");
    const vis = watch($("#demo-aylo")!);
    const typing = () => {
      const t = document.createElement("div");
      t.className = "typing enter"; t.innerHTML = "<i></i><i></i><i></i>";
      return t;
    };
    await sleep(2400);
    for (;;) {
      await vis.ready();
      cm.querySelector(".new")?.remove();
      dm.innerHTML = '<p class="dm-empty">Waiting for a matching comment…</p>';
      rule.classList.remove("hit");
      await sleep(1000);
      const c = fresh.cloneNode(true) as El; c.classList.add("enter"); cm.append(c);
      await sleep(1000);
      c.querySelector("mark")!.classList.add("lit"); rule.classList.add("hit");
      await sleep(900);
      dm.innerHTML = "";
      for (const m of msgs) {
        if (m.classList.contains("ai")) { const t = typing(); dm.append(t); await sleep(1200); t.remove(); }
        else await sleep(900);
        const n = m.cloneNode(true) as El; n.classList.add("enter"); dm.append(n);
        await sleep(1300);
      }
      await sleep(3600);
    }
  })());

  /* ---- Sifat Nazorat QR loop ---- */
  quiet((async () => {
    const sc = $("#scanner")!, cert = $("#cert")!, slug = $("#slug")!;
    const full = slug.textContent || "";
    const vis = watch($("#demo-qr")!);
    await sleep(2000);
    for (;;) {
      await vis.ready();
      cert.classList.add("pending"); slug.textContent = "…";
      sc.classList.add("scanning");
      await sleep(2000);
      for (let i = 1; i <= full.length; i++) { slug.textContent = full.slice(0, i); await sleep(35); }
      sc.classList.remove("scanning"); sc.classList.add("hit");
      await sleep(250);
      cert.classList.remove("pending");
      await sleep(1500);
      sc.classList.remove("hit");
      await sleep(4000);
    }
  })());

  /* ---- Frutera extraction loop ---- */
  quiet((async () => {
    const chat = $("#fru-chat")!, rec = $("#fru-rec")!, rows = $("#fru-rows")!, kind = $("#fru-kind")!, rule = $("#fru-rule")!;
    const pay = document.createElement("p");
    pay.className = "msg ai";
    pay.innerHTML = "Karimov 12 000$ o'tkazdi, Andijon yuki uchun <em class=\"tr\">Karimov sent $12,000 for the Andijan load</em>";
    const samples = [
      { msg: chat.firstElementChild!.cloneNode(true) as El, kind: "● shipment", rows: rows.innerHTML },
      {
        msg: pay,
        kind: "● client payment",
        rows: [["Type", "Client payment"], ["Client", "Karimov <small>(sample)</small>"], ["Amount", "$12 000"], ["Linked to", "Andijon → Moskva shipment"]]
          .map(([t, d], i) => `<div class="row" style="--d:${i}"><dt>${t}</dt><dd>${d}</dd></div>`).join(""),
      },
    ];
    const vis = watch($("#demo-fru")!);
    await sleep(2200);
    for (;;) {
      chat.innerHTML = "";
      for (const smp of samples) {
        await vis.ready();
        rec.classList.add("pending"); rule.classList.remove("hit");
        await sleep(700);
        const m = smp.msg.cloneNode(true) as El; m.classList.add("enter"); chat.append(m);
        await sleep(900);
        kind.textContent = "extracting…";
        await sleep(1100);
        kind.textContent = smp.kind; rows.innerHTML = smp.rows;
        rec.classList.remove("pending");
        await sleep(1300);
        rule.classList.add("hit");
        await sleep(3200);
      }
    }
  })());

  /* ---- Cresta CRM kanban loop ---- */
  quiet((async () => {
    const cols = $$("#kanban .kcol");
    const pool = [["Bot booking", "via bot"], ["Site inquiry"], ["Referral"], ["Telegram lead", "via bot"], ["Call back"], ["Site inquiry"]];
    let p = 0;
    const vis = watch($("#kanban")!);
    const hop = (el: El) => { el.classList.remove("hop"); void el.offsetWidth; el.classList.add("hop"); };
    const card = ([label, via]: string[]) => {
      const el = document.createElement("div"); el.className = "kc";
      el.innerHTML = `<span>${label}</span>` + (via ? `<em>${via}</em>` : "");
      return el;
    };
    const top = (col: El, el: El) => col.insertBefore(el, col.querySelector(".kc"));
    for (;;) {
      await vis.ready();
      await sleep(2100);
      const a = cols[1].querySelector<El>(".kc:last-of-type");
      if (a) { top(cols[2], a); hop(a); }
      const extra = cols[2].querySelectorAll(".kc");
      if (extra.length > 2) extra[extra.length - 1].remove();
      await sleep(500);
      const b = cols[0].querySelector<El>(".kc:last-of-type");
      if (b) { top(cols[1], b); hop(b); }
      await sleep(500);
      const n = card(pool[p++ % pool.length]); top(cols[0], n); hop(n);
    }
  })());

  /* ---- T-SX CMS loop ---- */
  quiet((async () => {
    const tgl = $("#tgl")!, state = $("#tgl-state")!, tiles = $$("#gal span");
    const vis = watch($("#cms")!);
    let k = 0;
    for (;;) {
      await vis.ready();
      await sleep(1600);
      const isOn = !tgl.classList.contains("on");
      tgl.classList.toggle("on", isOn);
      state.textContent = isOn ? "Live" : "Draft";
      const t = tiles[k++ % tiles.length];
      t.classList.remove("fresh"); void t.offsetWidth; t.classList.add("fresh");
    }
  })());

  /* ---- Fimtext loupe ---- */
  const weave = $("#weave")!, lens = $("#loupe")!;
  let hover = false;
  const place = (x: number, y: number) => { lens.style.setProperty("--lx", x + "px"); lens.style.setProperty("--ly", y + "px"); };
  weave.addEventListener("pointermove", e => {
    hover = true;
    const r = weave.getBoundingClientRect();
    place(e.clientX - r.left, e.clientY - r.top);
  }, on);
  weave.addEventListener("pointerleave", () => { hover = false; }, on);
  const vis = watch(weave);
  const frame = (now: number) => {
    if (signal.aborted) return;
    if (!vis.on) { quiet(vis.ready().then(() => { requestAnimationFrame(frame); })); return; }
    if (!hover) place(weave.clientWidth * (0.5 + 0.32 * Math.sin(now / 2100)), weave.clientHeight * (0.5 + 0.26 * Math.sin(now / 1300)));
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
