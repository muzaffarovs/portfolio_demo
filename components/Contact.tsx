import Sec from "@/components/Sec";
import { CV, EMAIL, GITHUB, LINKEDIN, PHONE, PHONE_PRETTY, TELEGRAM } from "@/lib/site";

export default function Contact({ heading = "h2" }: { heading?: "h2" | "p" }) {
  return (
    <section className="block contact" id="contact">
      <div className="wrap">
        <Sec title="Contact" note="Tashkent, UTC+5" as={heading} />
        <p className="mail-row reveal">
          <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
        <p className="contact-links reveal">
          <button className="copy" id="copy" type="button" data-email={EMAIL}>Copy email</button>
          <span className="toast" id="toast" role="status" aria-live="polite"></span>
          <a href={TELEGRAM} target="_blank" rel="me noopener">Telegram</a>
          <a href={`tel:${PHONE}`}>{PHONE_PRETTY}</a>
          <a href={GITHUB} target="_blank" rel="me noopener">GitHub</a>
          <a href={LINKEDIN} target="_blank" rel="me noopener">LinkedIn</a>
          <a href={CV} target="_blank" rel="noopener">Résumé</a>
        </p>
      </div>
    </section>
  );
}
