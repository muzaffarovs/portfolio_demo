import Lead from "@/components/Lead";
import { EMAIL, GITHUB, LINKEDIN, TELEGRAM } from "@/lib/site";

export default function Contact() {
  return (
    <section className="block contact" id="contact">
      <Lead label="Contact" links={[
        { href: TELEGRAM, label: "Telegram", external: true },
        { href: GITHUB, label: "GitHub", external: true },
        { href: LINKEDIN, label: "LinkedIn", external: true },
      ]}>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </Lead>
    </section>
  );
}
