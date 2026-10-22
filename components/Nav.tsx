import Link from "next/link";
import { EMAIL } from "@/lib/site";

export default function Nav() {
  return (
    <nav className="nav" id="top" aria-label="Primary">
      <div className="wrap nav-in">
        <Link className="mark" href="/" aria-label="Rajab Muzaffarov, home"><i aria-hidden="true"></i>RM</Link>
        <ul className="nav-links">
          <li><Link href="/work/">Work</Link></li>
          <li><Link href="/about/">About</Link></li>
          <li><Link href="/#stack">Toolbox</Link></li>
          <li><Link href="/#contact">Contact</Link></li>
        </ul>
        <div className="nav-actions">
          <button className="icon-btn" id="theme" type="button" aria-label="Switch theme">
            <svg className="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" /></svg>
            <svg className="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true"><path d="M20 14.6A8.4 8.4 0 0 1 9.4 4 8.4 8.4 0 1 0 20 14.6Z" /></svg>
          </button>
          <a className="btn primary sm magnetic" href={`mailto:${EMAIL}`}>Say salom</a>
        </div>
      </div>
    </nav>
  );
}
