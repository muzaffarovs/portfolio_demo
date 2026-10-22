/* Decorative, seeded QR-style pattern for the Sifat Nazorat demo, built at compile time. */
export function qrPath() {
  const N = 25; let s = 20260915;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const inBox = (x: number, y: number, bx: number, by: number, n: number) => x >= bx && x < bx + n && y >= by && y < by + n;
  const reserved = (x: number, y: number) => inBox(x, y, 0, 0, 8) || inBox(x, y, N - 8, 0, 8) || inBox(x, y, 0, N - 8, 8) || inBox(x, y, 16, 16, 5);
  let d = "";
  const mod = (x: number, y: number) => { d += `M${x} ${y}h1v1h-1z`; };
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    if (reserved(x, y)) continue;
    if (x === 6 || y === 6) { if ((x + y) % 2 === 0) mod(x, y); continue; }
    if (rnd() > 0.52) mod(x, y);
  }
  const finder = (bx: number, by: number, n: number) => {
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const edge = i === 0 || j === 0 || i === n - 1 || j === n - 1;
      const core = n === 7 ? (i >= 2 && i <= 4 && j >= 2 && j <= 4) : (i === 2 && j === 2);
      if (edge || core) mod(bx + i, by + j);
    }
  };
  finder(0, 0, 7); finder(N - 7, 0, 7); finder(0, N - 7, 7); finder(16, 16, 5);
  return d;
}
