import { CV, EMAIL, GITHUB, LINKEDIN, PHONE, PHONE_PRETTY, TELEGRAM } from "@/lib/site";

export default function Contact({ heading = "h2" }: { heading?: "h2" | "p" }) {
  const H = heading;
  return (
    <section className="contact" id="contact">
      <div className="wrap grid">
        <p className="label col-label">Contact</p>
        <div className="contact-body">
          <H className="contact-title reveal">Have something to build? Write to me.</H>
          <p className="mail-row reveal">
            <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <button className="copy" id="copy" type="button" data-email={EMAIL}>Copy</button>
            <span className="toast" id="toast" role="status" aria-live="polite"></span>
          </p>
          <dl className="contact-links reveal">
            <div><dt>Telegram</dt><dd><a href={TELEGRAM} target="_blank" rel="me noopener">@urgeekboy</a></dd></div>
            <div><dt>Phone</dt><dd><a href={`tel:${PHONE}`}>{PHONE_PRETTY}</a></dd></div>
            <div><dt>GitHub</dt><dd><a href={GITHUB} target="_blank" rel="me noopener">muzaffarovs</a></dd></div>
            <div><dt>LinkedIn</dt><dd><a href={LINKEDIN} target="_blank" rel="me noopener">in/muzaffarov</a></dd></div>
            <div><dt>Résumé</dt><dd><a href={CV} target="_blank" rel="noopener">Download PDF</a></dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
