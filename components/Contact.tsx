import { CV, EMAIL, GITHUB, LINKEDIN, PHONE, PHONE_PRETTY, TELEGRAM } from "@/lib/site";

export default function Contact({ heading = "h2" }: { heading?: "h2" | "p" }) {
  const H = heading;
  return (
    <section className="wrap contact" id="contact">
      <p className="eyebrow">Contact</p>
      <H className="big reveal">Got a platform to build? <span>Let&apos;s make it loud.</span></H>
      <div className="mail-row reveal">
        <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <button className="btn ghost sm" id="copy" type="button">Copy email</button>
        <span id="toast" role="status" aria-live="polite"></span>
      </div>
      <ul className="links reveal">
        <li><a href={GITHUB} target="_blank" rel="me noopener">GitHub <small>muzaffarovs</small> ↗</a></li>
        <li><a href={LINKEDIN} target="_blank" rel="me noopener">LinkedIn <small>in/muzaffarov</small> ↗</a></li>
        <li><a href={TELEGRAM} target="_blank" rel="me noopener">Telegram <small>@urgeekboy</small> ↗</a></li>
        <li><a href={`tel:${PHONE}`}>Phone <small>{PHONE_PRETTY}</small></a></li>
        <li><a href={CV} target="_blank" rel="noopener">Résumé <small>PDF</small> ↗</a></li>
      </ul>
    </section>
  );
}
