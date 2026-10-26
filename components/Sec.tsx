/** Full-width section rule: name on the left, a count or note on the right. */
export default function Sec({ id, title, note, as: H = "h2" }: { id?: string; title: string; note?: string; as?: "h2" | "p" }) {
  return (
    <div className="sec">
      <H id={id}>{title}</H>
      {note && <span>{note}</span>}
    </div>
  );
}
