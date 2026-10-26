import Link from "next/link";
import Logo from "@/components/Logo";

export default function Nav() {
  return (
    <header className="bar" id="top">
      <div className="wrap grid bar-in">
        <Link className="mark" href="/" aria-label="Rajab Muzaffarov, home"><Logo /></Link>
        <p className="bar-role">Full-stack developer<br />Tashkent, <span data-clock>--:--</span></p>
        <nav className="bar-nav" aria-label="Primary">
          <Link href="/work/">Work</Link>
          <Link href="/about/">About</Link>
          <Link href="/#contact">Contact</Link>
          <button className="theme" id="theme" type="button" aria-label="Switch theme">Dark</button>
        </nav>
      </div>
    </header>
  );
}
