export function AppShell({ sidebar, children }) {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950 lg:grid lg:grid-cols-[320px_minmax(0,1fr)]">
      {sidebar}
      <section className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),rgba(248,250,252,0.86)_42%,rgba(226,232,240,0.9))]">
        {children}
      </section>
    </main>
  );
}
