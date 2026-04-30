export function AppShell({ sidebar, children }) {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 lg:grid lg:grid-cols-[330px_minmax(0,1fr)]">
      {sidebar}
      <section className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(244,63,94,0.12),transparent_34%),linear-gradient(135deg,#020617_0%,#0f172a_48%,#111827_100%)]">
        {children}
      </section>
    </main>
  );
}
