import { useState, useEffect, useRef } from "react";

// ─── Copy Button ─────────────────────────────────────────────────────────────
function CopyButton({ text, light = false }: { text: string; light?: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold transition-all duration-200 ${
        light
          ? "bg-white/10 hover:bg-white/20 text-white/70 hover:text-white border border-white/15"
          : "bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700"
      }`}
    >
      {copied ? (
        <><span>✓</span><span>Copied!</span></>
      ) : (
        <><span>⧉</span><span>Copy</span></>
      )}
    </button>
  );
}

// ─── Code Block ───────────────────────────────────────────────────────────────
function CodeBlock({
  code, lang = "dart", filename, light = false,
}: {
  code: string; lang?: string; filename?: string; light?: boolean;
}) {
  const langColors: Record<string, string> = {
    dart: "text-cyan-400",
    yaml: "text-yellow-400",
    bash: "text-emerald-400",
    markdown: "text-violet-400",
    text: "text-slate-400",
  };
  return (
    <div className={`rounded-2xl overflow-hidden border ${light ? "border-white/10 bg-black/30" : "border-slate-800 bg-[#0d1117]"} shadow-xl`}>
      <div className={`flex items-center justify-between px-4 py-2.5 border-b ${light ? "border-white/10 bg-white/5" : "border-slate-800 bg-slate-900"}`}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <div className="flex items-center gap-2">
            {filename && <span className={`text-xs font-semibold ${light ? "text-white/60" : "text-slate-400"}`}>{filename}</span>}
            {filename && <span className={`text-xs ${light ? "text-white/20" : "text-slate-700"}`}>·</span>}
            <span className={`text-xs font-bold uppercase tracking-widest ${langColors[lang] || "text-slate-500"}`}>{lang}</span>
          </div>
        </div>
        <CopyButton text={code} light={light} />
      </div>
      <pre className={`p-5 overflow-x-auto text-sm leading-relaxed font-mono ${light ? "text-white/90" : "text-slate-300"}`}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ─── Section Heading ──────────────────────────────────────────────────────────
function SectionHeading({ id, children, sub }: { id: string; children: React.ReactNode; sub?: string }) {
  return (
    <div id={id} className="mb-8 scroll-mt-24">
      <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">{children}</h2>
      {sub && <p className="mt-2 text-slate-500 text-base leading-relaxed">{sub}</p>}
      <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" />
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
function Badge({ children, color = "slate" }: { children: React.ReactNode; color?: string }) {
  const colors: Record<string, string> = {
    green: "bg-emerald-100 text-emerald-700 border-emerald-200",
    red: "bg-red-100 text-red-700 border-red-200",
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    violet: "bg-violet-100 text-violet-700 border-violet-200",
    amber: "bg-amber-100 text-amber-700 border-amber-200",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    cyan: "bg-cyan-100 text-cyan-700 border-cyan-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold border ${colors[color]}`}>
      {children}
    </span>
  );
}

// ─── Prop Row ─────────────────────────────────────────────────────────────────
function PropRow({ name, type, defaultVal, desc, required = false }: {
  name: string; type: string; defaultVal?: string; desc: string; required?: boolean;
}) {
  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors group">
      <td className="py-3 px-4 align-top">
        <div className="flex items-center gap-2">
          <code className="text-violet-600 font-bold text-sm bg-violet-50 px-2 py-0.5 rounded-md">{name}</code>
          {required && <span className="text-red-500 text-xs font-black">*</span>}
        </div>
      </td>
      <td className="py-3 px-4 align-top">
        <code className="text-cyan-600 text-xs bg-cyan-50 px-2 py-0.5 rounded-md font-mono">{type}</code>
      </td>
      <td className="py-3 px-4 align-top">
        {defaultVal ? (
          <code className="text-slate-500 text-xs bg-slate-100 px-2 py-0.5 rounded-md font-mono">{defaultVal}</code>
        ) : (
          <span className="text-slate-300 text-xs">—</span>
        )}
      </td>
      <td className="py-3 px-4 align-top text-sm text-slate-600 leading-relaxed">{desc}</td>
    </tr>
  );
}

// ─── Dialog Type Card ─────────────────────────────────────────────────────────
function DialogTypeCard({ icon, name, color, animation, iconAnim, description, gradient }: {
  icon: string; name: string; color: string; animation: string; iconAnim: string; description: string; gradient: string;
}) {
  return (
    <div className="group relative rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 bg-white">
      <div className={`h-2 ${gradient}`} />
      <div className="p-5">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 ${gradient} shadow-lg`}>
          {icon}
        </div>
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-black text-slate-800 text-lg">{name}</h3>
          <code className={`text-xs font-bold px-2 py-0.5 rounded-full ${color}`}>{name.toLowerCase()}</code>
        </div>
        <p className="text-slate-500 text-sm leading-relaxed mb-3">{description}</p>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 w-20 shrink-0">Entry anim</span>
            <code className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">{animation}</code>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 w-20 shrink-0">Icon anim</span>
            <code className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">{iconAnim}</code>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar Nav ──────────────────────────────────────────────────────────────
const navSections = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "installation", label: "Installation" },
  { id: "quickstart", label: "Quick Start" },
  { id: "dialog-types", label: "Dialog Types" },
  { id: "animations", label: "Animations" },
  { id: "api-reference", label: "API Reference" },
  { id: "showprodialog", label: "showProDialog()" },
  { id: "dialogbutton", label: "DialogButton" },
  { id: "prodialogtheme", label: "ProDialogTheme" },
  { id: "examples", label: "Examples" },
  { id: "theming", label: "Theming" },
  { id: "accessibility", label: "Accessibility" },
  { id: "changelog", label: "Changelog" },
  { id: "license", label: "License" },
];

function Sidebar({ active }: { active: string }) {
  return (
    <aside className="hidden xl:block w-60 shrink-0">
      <div className="sticky top-6 space-y-1">
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest px-3 mb-3">Contents</p>
        {navSections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`block px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              active === s.id
                ? "bg-violet-100 text-violet-700 font-bold"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            }`}
          >
            {s.label}
          </a>
        ))}
      </div>
    </aside>
  );
}

// ─── Tip / Note / Warning Boxes ───────────────────────────────────────────────
function Callout({ type = "tip", children }: { type?: "tip" | "note" | "warning" | "info"; children: React.ReactNode }) {
  const styles = {
    tip: { bg: "bg-emerald-50 border-emerald-300", icon: "💡", title: "Pro Tip", text: "text-emerald-800" },
    note: { bg: "bg-blue-50 border-blue-300", icon: "📌", title: "Note", text: "text-blue-800" },
    warning: { bg: "bg-amber-50 border-amber-300", icon: "⚠️", title: "Warning", text: "text-amber-800" },
    info: { bg: "bg-violet-50 border-violet-300", icon: "ℹ️", title: "Info", text: "text-violet-800" },
  };
  const s = styles[type];
  return (
    <div className={`flex gap-3 rounded-xl border-l-4 p-4 ${s.bg} my-4`}>
      <span className="text-xl shrink-0">{s.icon}</span>
      <div>
        <p className={`font-black text-sm mb-1 ${s.text}`}>{s.title}</p>
        <div className={`text-sm leading-relaxed ${s.text} opacity-90`}>{children}</div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    navSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── Top Nav ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-violet-200">P</div>
            <span className="font-black text-slate-800 text-lg tracking-tight">ProDialog</span>
            <Badge color="violet">v1.0.0</Badge>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {["overview","features","installation","examples","api-reference"].map(id => (
              <a key={id} href={`#${id}`} className={`px-3 py-1.5 rounded-lg text-sm font-semibold capitalize transition-colors ${activeSection===id ? "bg-violet-100 text-violet-700" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"}`}>
                {navSections.find(n=>n.id===id)?.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="https://pub.dev" target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-sm font-bold hover:bg-slate-700 transition-colors">
              <span>pub.dev</span><span>↗</span>
            </a>
            <button className="xl:hidden p-2 rounded-lg hover:bg-slate-100" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
              <span className="text-xl">{mobileNavOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
        {mobileNavOpen && (
          <div className="xl:hidden border-t border-slate-200 bg-white px-4 py-3 grid grid-cols-2 gap-1">
            {navSections.map(s => (
              <a key={s.id} href={`#${s.id}`} onClick={() => setMobileNavOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100">
                {s.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-16">
          {/* Top badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { label: "pub.dev", color: "from-violet-500 to-violet-700", icon: "📦" },
              { label: "MIT License", color: "from-emerald-500 to-emerald-700", icon: "⚖️" },
              { label: "Flutter 3.10+", color: "from-cyan-500 to-blue-600", icon: "🐦" },
              { label: "Dart 3.0+", color: "from-blue-500 to-indigo-600", icon: "🎯" },
              { label: "Zero Dependencies", color: "from-orange-500 to-red-600", icon: "⚡" },
            ].map(b => (
              <span key={b.label} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${b.color} shadow-lg`}>
                {b.icon} {b.label}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-center text-5xl md:text-7xl font-black text-white tracking-tight leading-none mb-4">
            Pro<span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">Dialog</span>
          </h1>
          <p className="text-center text-slate-400 text-xl md:text-2xl font-light tracking-wide mb-2">
            Animated · Customizable · Production-Ready
          </p>
          <p className="text-center text-slate-500 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            A beautiful, highly reusable animated dialog framework for Flutter. Drop into any project in seconds — <span className="text-white font-semibold">zero external dependencies</span> required.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            <a href="#quickstart" className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-black text-sm hover:opacity-90 transition shadow-xl shadow-violet-900/40">
              🚀 Get Started
            </a>
            <a href="#api-reference" className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white font-bold text-sm hover:bg-white/20 transition">
              📖 API Reference
            </a>
            <a href="#examples" className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white font-bold text-sm hover:bg-white/20 transition">
              💡 Examples
            </a>
          </div>

          {/* Hero image */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 max-w-5xl mx-auto">
            <img src="/images/hero-banner.png" alt="ProDialog showcase" className="w-full object-cover" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-3xl mx-auto">
            {[
              { val: "6", label: "Dialog Types" },
              { val: "5", label: "Entry Animations" },
              { val: "5", label: "Icon Animations" },
              { val: "0", label: "Dependencies" },
            ].map(s => (
              <div key={s.label} className="text-center p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-3xl font-black text-white mb-1">{s.val}</p>
                <p className="text-slate-400 text-xs font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 py-16 flex gap-10">
        <Sidebar active={activeSection} />

        <main className="flex-1 min-w-0 space-y-24">

          {/* ── OVERVIEW ── */}
          <section id="overview">
            <SectionHeading id="overview" sub="Everything you need to know about ProDialog at a glance.">
              📦 Overview
            </SectionHeading>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                <strong>ProDialog</strong> is a Flutter package that provides a fully animated, highly customizable dialog system. Whether you need a simple success toast, a destructive confirmation, or a fully custom-themed dialog with gradient backgrounds and glassmorphism — ProDialog handles it all with a single, elegant function call.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: "🎨", title: "Beautifully Designed", desc: "Six dialog types with smart defaults — each ships with a matching color palette, icon, shadow, and animation combo." },
                  { icon: "⚡", title: "Zero Dependencies", desc: "Relies only on Flutter SDK internals. No third-party packages, no bloat, no version conflicts — ever." },
                  { icon: "♿", title: "Fully Accessible", desc: "Every dialog element wraps with Semantics labels. Works out of the box with screen readers on iOS and Android." },
                  { icon: "🔧", title: "Fully Customizable", desc: "Override any default — colors, fonts, animations, button styles, icon sizes, border radii, gradients, and more." },
                  { icon: "🚀", title: "Production Ready", desc: "Used in real apps. Handles edge cases like loading states, auto-dismiss, barrier dismissal, and close buttons." },
                  { icon: "📱", title: "Responsive Layout", desc: "Respects max-width constraints (380px default) for clean display on phones, tablets, and desktop Flutter apps." },
                ].map(c => (
                  <div key={c.title} className="p-5 rounded-2xl border border-slate-200 hover:border-violet-200 hover:shadow-lg transition-all group">
                    <div className="text-3xl mb-3">{c.icon}</div>
                    <h3 className="font-black text-slate-800 mb-2 group-hover:text-violet-700 transition-colors">{c.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FEATURES ── */}
          <section id="features">
            <SectionHeading id="features" sub="A complete feature matrix for ProDialog v1.0.0.">
              ✨ Features
            </SectionHeading>
            <div className="grid md:grid-cols-2 gap-3 mb-8">
              {[
                ["🟢", "6 semantic dialog types", "Success, Error, Warning, Info, Question, Custom"],
                ["🎬", "5 entry animation styles", "Scale, Fade, SlideUp, SlideDown, Bounce"],
                ["💫", "5 icon animation styles", "Bounce, Pulse, Rotate, Shake, None"],
                ["🌈", "Gradient icon backgrounds", "Per-type gradient with matching shadow glow"],
                ["🔮", "Glassmorphism mode", "Frosted glass card with subtle border"],
                ["🎨", "Gradient card background", "Linear gradient fills the entire dialog card"],
                ["⏱", "Auto-dismiss support", "Automatically pop after a configurable duration"],
                ["⏳", "Loading state", "Built-in spinner on icon + linear progress bar"],
                ["✕", "Close button overlay", "Optional X button pinned to top-right corner"],
                ["🔘", "3 button visual styles", "Filled, Outlined, Text-only per button"],
                ["↕️", "Flexible button layout", "Horizontal row or vertical column axis"],
                ["🏷️", "Custom button icons", "Leading icon on any action button"],
                ["🔒", "Barrier control", "Configure tappable vs non-dismissible backdrop"],
                ["📐", "Max-width constraint", "Tablet & desktop safe with configurable maxWidth"],
                ["♿", "Semantics support", "All dialogs and buttons have accessibility labels"],
                ["🎯", "Type-safe API", "Full null safety, enums, and typed parameters"],
              ].map(([icon, title, detail]) => (
                <div key={title} className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all">
                  <span className="text-xl shrink-0">{icon}</span>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{title}</p>
                    <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── INSTALLATION ── */}
          <section id="installation">
            <SectionHeading id="installation" sub="Add ProDialog to your Flutter project in under 60 seconds.">
              📥 Installation
            </SectionHeading>

            <div className="space-y-6">
              <div>
                <h3 className="font-black text-slate-800 text-lg mb-3">1. Add to pubspec.yaml</h3>
                <CodeBlock filename="pubspec.yaml" lang="yaml" code={`dependencies:
  flutter:
    sdk: flutter
  pro_dialog: ^1.0.0`} />
              </div>

              <div>
                <h3 className="font-black text-slate-800 text-lg mb-3">2. Run pub get</h3>
                <CodeBlock filename="terminal" lang="bash" code={`flutter pub get`} />
              </div>

              <div>
                <h3 className="font-black text-slate-800 text-lg mb-3">3. Import in your Dart file</h3>
                <CodeBlock filename="your_screen.dart" lang="dart" code={`import 'package:pro_dialog/pro_dialog.dart';`} />
              </div>

              <Callout type="tip">
                ProDialog has <strong>zero external dependencies</strong>. It uses only the Flutter SDK — no extra packages will be added to your pubspec.lock.
              </Callout>

              <div>
                <h3 className="font-black text-slate-800 text-lg mb-3">Platform Support</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {[
                    { os: "Android", icon: "🤖", support: "✅ Full" },
                    { os: "iOS", icon: "🍎", support: "✅ Full" },
                    { os: "Web", icon: "🌐", support: "✅ Full" },
                    { os: "macOS", icon: "🖥️", support: "✅ Full" },
                    { os: "Windows", icon: "🪟", support: "✅ Full" },
                    { os: "Linux", icon: "🐧", support: "✅ Full" },
                  ].map(p => (
                    <div key={p.os} className="p-3 rounded-xl border border-slate-200 text-center hover:border-emerald-200 hover:bg-emerald-50 transition-all">
                      <div className="text-2xl mb-1">{p.icon}</div>
                      <p className="font-bold text-slate-700 text-xs">{p.os}</p>
                      <p className="text-emerald-600 text-xs font-semibold mt-1">{p.support}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── QUICK START ── */}
          <section id="quickstart">
            <SectionHeading id="quickstart" sub="Go from zero to a working dialog in 3 lines of code.">
              🚀 Quick Start
            </SectionHeading>

            <div className="space-y-8">
              <div>
                <h3 className="font-black text-slate-800 text-lg mb-1">Minimal — One Line</h3>
                <p className="text-slate-500 text-sm mb-3">The simplest possible ProDialog call. All other parameters have smart defaults.</p>
                <CodeBlock filename="example.dart" lang="dart" code={`showProDialog(context, type: DialogType.success, title: 'All done!');`} />
              </div>

              <div>
                <h3 className="font-black text-slate-800 text-lg mb-1">With Description & Buttons</h3>
                <CodeBlock filename="example.dart" lang="dart" code={`showProDialog(
  context,
  type: DialogType.error,
  title: 'Delete Account',
  description: 'This will permanently remove your account and all associated data. This action cannot be undone.',
  buttons: [
    DialogButton(
      text: 'Cancel',
      style: DialogButtonStyle.text,
      onPressed: () => Navigator.pop(context),
    ),
    DialogButton(
      text: 'Delete Forever',
      isPrimary: true,
      icon: Icons.delete_forever_rounded,
      onPressed: () {
        // perform deletion
        Navigator.pop(context);
      },
    ),
  ],
);`} />
              </div>

              <div>
                <h3 className="font-black text-slate-800 text-lg mb-1">Convenience Helpers</h3>
                <p className="text-slate-500 text-sm mb-3">Use the typed shorthand functions for the most common dialog types.</p>
                <CodeBlock filename="example.dart" lang="dart" code={`// ✅ Success
showSuccessDialog(
  context,
  title: 'Payment Sent!',
  description: 'Your transfer of \$250.00 was completed.',
);

// ❌ Error
showErrorDialog(
  context,
  title: 'Connection Failed',
  description: 'Check your internet connection and try again.',
);

// ⚠️ Warning
showWarningDialog(
  context,
  title: 'Unsaved Changes',
  description: 'You have unsaved changes. Leave anyway?',
);

// ⏳ Loading (non-dismissible, call Navigator.pop when done)
showLoadingDialog(
  context,
  title: 'Uploading…',
  description: 'Please wait while we process your file.',
);`} />
              </div>
            </div>
          </section>

          {/* ── DIALOG TYPES ── */}
          <section id="dialog-types">
            <SectionHeading id="dialog-types" sub="Six semantic types, each with opinionated smart defaults you can override.">
              🎨 Dialog Types
            </SectionHeading>
            <div className="mb-6">
              <img src="/images/dialog-types.png" alt="All 6 dialog types" className="w-full rounded-2xl border border-slate-200 shadow-xl" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <DialogTypeCard icon="✅" name="Success" description="Green check-circle. Use for completed operations, confirmations, successful payments, or any positive outcome." color="bg-emerald-100 text-emerald-700" animation="bounce" iconAnim="bounce" gradient="bg-gradient-to-br from-emerald-400 to-green-600" />
              <DialogTypeCard icon="❌" name="Error" description="Red error circle. Use for failures, validation errors, destructive confirmations, or anything that needs urgent attention." color="bg-red-100 text-red-700" animation="scale" iconAnim="shake" gradient="bg-gradient-to-br from-red-400 to-red-600" />
              <DialogTypeCard icon="⚠️" name="Warning" description="Amber triangle. Use for cautionary messages, irreversible action confirmations, or content that needs careful consideration." color="bg-amber-100 text-amber-700" animation="slideUp" iconAnim="pulse" gradient="bg-gradient-to-br from-amber-400 to-orange-500" />
              <DialogTypeCard icon="ℹ️" name="Info" description="Blue info circle. Use for onboarding tips, feature announcements, contextual help, or any purely informational message." color="bg-blue-100 text-blue-700" animation="fade" iconAnim="none" gradient="bg-gradient-to-br from-blue-400 to-blue-600" />
              <DialogTypeCard icon="❓" name="Question" description="Purple help circle. Use for yes/no choices, multi-step confirmations, or any decision the user needs to make." color="bg-violet-100 text-violet-700" animation="slideUp" iconAnim="rotate" gradient="bg-gradient-to-br from-violet-400 to-purple-600" />
              <DialogTypeCard icon="⚙️" name="Custom" description="No opinionated defaults. Bring your own icon, colors, animations, and content. The blank canvas for creative dialogs." color="bg-slate-100 text-slate-700" animation="scale" iconAnim="none" gradient="bg-gradient-to-br from-slate-400 to-slate-600" />
            </div>

            <CodeBlock filename="dialog_types.dart" lang="dart" code={`// Use the type parameter to select a type
showProDialog(context, type: DialogType.success);
showProDialog(context, type: DialogType.error);
showProDialog(context, type: DialogType.warning);
showProDialog(context, type: DialogType.info);
showProDialog(context, type: DialogType.question);
showProDialog(context, type: DialogType.custom);`} />
          </section>

          {/* ── ANIMATIONS ── */}
          <section id="animations">
            <SectionHeading id="animations" sub="Fluid, physics-based animations for every personality.">
              🎬 Animations
            </SectionHeading>

            <div className="space-y-8">
              <div>
                <h3 className="font-black text-slate-800 text-xl mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center text-sm">E</span>
                  Entry Animation Styles — <code className="text-sm font-mono text-violet-600 bg-violet-50 px-2 py-0.5 rounded-lg">DialogAnimationStyle</code>
                </h3>
                <div className="space-y-3 mb-5">
                  {[
                    { name: "scale", desc: "Scales from 0→1 with an elastic overshoot. Also fades in. Great all-rounder.", icon: "⬡", color: "bg-violet-50 border-violet-200 text-violet-800" },
                    { name: "bounce", desc: "Scale with a stronger elastic bounce — the most energetic and playful entry style.", icon: "🏀", color: "bg-pink-50 border-pink-200 text-pink-800" },
                    { name: "fade", desc: "Pure opacity fade-in — subtle and elegant. Ideal for info dialogs.", icon: "🌫️", color: "bg-blue-50 border-blue-200 text-blue-800" },
                    { name: "slideUp", desc: "Slides up from below while fading in. Material Design feel.", icon: "⬆️", color: "bg-emerald-50 border-emerald-200 text-emerald-800" },
                    { name: "slideDown", desc: "Slides down from above while fading in. Dramatic top-entry effect.", icon: "⬇️", color: "bg-amber-50 border-amber-200 text-amber-800" },
                  ].map(a => (
                    <div key={a.name} className={`flex items-start gap-4 p-4 rounded-xl border ${a.color}`}>
                      <span className="text-2xl shrink-0">{a.icon}</span>
                      <div>
                        <code className="font-black text-sm">{a.name}</code>
                        <p className="text-sm opacity-80 mt-0.5 leading-relaxed">{a.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <CodeBlock filename="animation_styles.dart" lang="dart" code={`showProDialog(
  context,
  type: DialogType.success,
  title: 'Done!',
  theme: ProDialogTheme(
    animationStyle: DialogAnimationStyle.bounce,     // try: scale, fade, slideUp, slideDown
    entryDuration: Duration(milliseconds: 480),      // default: 480ms
  ),
);`} />
              </div>

              <div>
                <h3 className="font-black text-slate-800 text-xl mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-cyan-100 text-cyan-600 flex items-center justify-center text-sm">I</span>
                  Icon Animation Styles — <code className="text-sm font-mono text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-lg">IconAnimationStyle</code>
                </h3>
                <div className="space-y-3 mb-5">
                  {[
                    { name: "bounce", desc: "Elastic scale from 0→1 after the dialog settles. Best for success dialogs.", icon: "🎈", color: "bg-emerald-50 border-emerald-200 text-emerald-800" },
                    { name: "pulse", desc: "Continuously scales up/down in a loop (1.0→1.14→1.0). Best for warnings.", icon: "💓", color: "bg-amber-50 border-amber-200 text-amber-800" },
                    { name: "rotate", desc: "Rotates 360° once on entry with easeOutBack easing. Best for question/info.", icon: "🔄", color: "bg-violet-50 border-violet-200 text-violet-800" },
                    { name: "shake", desc: "Horizontal shake on entry (like a device vibration). Best for errors.", icon: "📳", color: "bg-red-50 border-red-200 text-red-800" },
                    { name: "none", desc: "No icon animation. Icon appears instantly. Best for info dialogs.", icon: "🔇", color: "bg-slate-50 border-slate-200 text-slate-700" },
                  ].map(a => (
                    <div key={a.name} className={`flex items-start gap-4 p-4 rounded-xl border ${a.color}`}>
                      <span className="text-2xl shrink-0">{a.icon}</span>
                      <div>
                        <code className="font-black text-sm">{a.name}</code>
                        <p className="text-sm opacity-80 mt-0.5 leading-relaxed">{a.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <CodeBlock filename="icon_animation.dart" lang="dart" code={`showProDialog(
  context,
  type: DialogType.warning,
  title: 'Are you sure?',
  theme: ProDialogTheme(
    iconAnimationStyle: IconAnimationStyle.pulse,     // loops continuously
    iconAnimDuration: Duration(milliseconds: 700),    // one-shot anim duration
  ),
);`} />
              </div>
            </div>
          </section>

          {/* ── API REFERENCE ── */}
          <section id="api-reference">
            <SectionHeading id="api-reference" sub="Complete reference for every public class, function, and enum.">
              📖 API Reference
            </SectionHeading>
            <div className="p-5 rounded-2xl bg-slate-900 text-white mb-6">
              <p className="font-black text-lg mb-3">Public Surface</p>
              <div className="grid md:grid-cols-2 gap-2 text-sm font-mono">
                {[
                  ["fn", "showProDialog()", "Main dialog function"],
                  ["fn", "showSuccessDialog()", "Convenience helper"],
                  ["fn", "showErrorDialog()", "Convenience helper"],
                  ["fn", "showWarningDialog()", "Convenience helper"],
                  ["fn", "showLoadingDialog()", "Convenience helper"],
                  ["cls", "DialogButton", "Button model class"],
                  ["cls", "ProDialogTheme", "Theme configuration class"],
                  ["enum", "DialogType", "6 dialog type variants"],
                  ["enum", "DialogAnimationStyle", "5 entry animation variants"],
                  ["enum", "IconAnimationStyle", "5 icon animation variants"],
                  ["enum", "DialogButtonStyle", "3 button visual styles"],
                ].map(([tag, name, desc]) => (
                  <div key={name} className="flex items-center gap-2">
                    <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${tag==="fn"?"bg-violet-600":"bg-cyan-700"}`}>{tag}</span>
                    <span className="text-slate-200 font-bold">{name}</span>
                    <span className="text-slate-500 text-xs">— {desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── showProDialog ── */}
          <section id="showprodialog">
            <SectionHeading id="showprodialog" sub="The main entry point. Returns Future<T?> that resolves when the dialog is dismissed.">
              🔧 showProDialog()
            </SectionHeading>

            <CodeBlock filename="signature" lang="dart" code={`Future<T?> showProDialog<T>(
  BuildContext context, {
  // ─── Content ───────────────────────────────────────────
  DialogType type = DialogType.custom,
  String? title,
  String? description,
  IconData? icon,
  Color? iconColor,
  Color? iconBackgroundColor,
  Widget? customContent,

  // ─── Buttons ───────────────────────────────────────────
  List<DialogButton> buttons = const [],
  Axis buttonsAxis = Axis.horizontal,

  // ─── State ─────────────────────────────────────────────
  bool isLoading = false,

  // ─── Behavior ──────────────────────────────────────────
  bool barrierDismissible = true,
  bool showCloseButton = false,
  Duration? autoDismissAfter,
  VoidCallback? onDismiss,

  // ─── Appearance ────────────────────────────────────────
  ProDialogTheme? theme,
})`} />

            <div className="mt-6 rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
                <p className="font-black text-slate-700 text-sm">Parameter Reference</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200">
                      <th className="py-2.5 px-4 text-xs font-black text-slate-600 uppercase tracking-wider">Parameter</th>
                      <th className="py-2.5 px-4 text-xs font-black text-slate-600 uppercase tracking-wider">Type</th>
                      <th className="py-2.5 px-4 text-xs font-black text-slate-600 uppercase tracking-wider">Default</th>
                      <th className="py-2.5 px-4 text-xs font-black text-slate-600 uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <PropRow name="context" type="BuildContext" desc="The build context. Required by showGeneralDialog internally." required />
                    <PropRow name="type" type="DialogType" defaultVal="DialogType.custom" desc="Sets the dialog personality: icon, color, animations. Override any of these individually." />
                    <PropRow name="title" type="String?" desc="Bold heading displayed below the icon. Supports up to 2 lines comfortably." />
                    <PropRow name="description" type="String?" desc="Body text below the title. Supports multiline with 1.6 line-height." />
                    <PropRow name="icon" type="IconData?" desc="Override the type's default icon. Any Material icon or custom IconData." />
                    <PropRow name="iconColor" type="Color?" desc="Override the icon color. Default is white (works on both gradient and solid backgrounds)." />
                    <PropRow name="iconBackgroundColor" type="Color?" desc="Override the start color of the icon circle gradient. Defaults to type primary color." />
                    <PropRow name="customContent" type="Widget?" desc="Injected below the description. Use for text fields, radio buttons, checkboxes, etc." />
                    <PropRow name="buttons" type="List<DialogButton>" defaultVal="[]" desc="Action buttons. Renders in horizontal row or vertical column depending on buttonsAxis." />
                    <PropRow name="buttonsAxis" type="Axis" defaultVal="Axis.horizontal" desc="Layout direction for multiple buttons. Use Axis.vertical for 3+ buttons." />
                    <PropRow name="isLoading" type="bool" defaultVal="false" desc="Replaces icon with spinner and shows a linear progress bar. Disables button taps." />
                    <PropRow name="barrierDismissible" type="bool" defaultVal="true" desc="Whether tapping the dark overlay dismisses the dialog." />
                    <PropRow name="showCloseButton" type="bool" defaultVal="false" desc="Shows an X button pinned to the top-right corner of the dialog." />
                    <PropRow name="autoDismissAfter" type="Duration?" desc="Auto-pops the dialog after this duration. Calls onDismiss before popping." />
                    <PropRow name="onDismiss" type="VoidCallback?" desc="Called when autoDismissAfter fires, just before Navigator.pop." />
                    <PropRow name="theme" type="ProDialogTheme?" desc="Full theme override. See ProDialogTheme for all available properties." />
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ── DialogButton ── */}
          <section id="dialogbutton">
            <SectionHeading id="dialogbutton" sub="Model class for action buttons. Pass a list to showProDialog's buttons parameter.">
              🔘 DialogButton
            </SectionHeading>

            <CodeBlock filename="dialog_button.dart" lang="dart" code={`DialogButton({
  required String text,
  required VoidCallback onPressed,
  bool isPrimary = false,                         // highlighted primary action
  DialogButtonStyle style = DialogButtonStyle.filled,
  Color? color,                                   // overrides type color
  IconData? icon,                                 // leading icon
  bool isLoading = false,                         // shows spinner inside button
  Widget? customWidget,                           // replaces entire button UI
  String? semanticLabel,                          // accessibility label
})`} />

            <div className="mt-6 rounded-2xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    <th className="py-2.5 px-4 text-xs font-black text-slate-600 uppercase tracking-wider">Parameter</th>
                    <th className="py-2.5 px-4 text-xs font-black text-slate-600 uppercase tracking-wider">Type</th>
                    <th className="py-2.5 px-4 text-xs font-black text-slate-600 uppercase tracking-wider">Default</th>
                    <th className="py-2.5 px-4 text-xs font-black text-slate-600 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <PropRow name="text" type="String" desc="The visible button label." required />
                  <PropRow name="onPressed" type="VoidCallback" desc="Callback when tapped. Not called when isLoading is true." required />
                  <PropRow name="isPrimary" type="bool" defaultVal="false" desc="Primary buttons use the dialog type color as fill. Secondary buttons use a muted fill." />
                  <PropRow name="style" type="DialogButtonStyle" defaultVal="filled" desc="Visual style: filled (solid background), outlined (border only), or text (no background)." />
                  <PropRow name="color" type="Color?" desc="Override the button color. Affects background (filled), border (outlined), or text (text style)." />
                  <PropRow name="icon" type="IconData?" desc="Optional leading icon shown before the label text." />
                  <PropRow name="isLoading" type="bool" defaultVal="false" desc="Replaces label with a CircularProgressIndicator. Disables tap." />
                  <PropRow name="customWidget" type="Widget?" desc="When set, completely replaces the default button UI. Still wrapped in GestureDetector." />
                  <PropRow name="semanticLabel" type="String?" desc="Override the accessibility label for screen readers. Falls back to text." />
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <h3 className="font-black text-slate-800 mb-3">Button Style Variants</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { name: "filled", enum: "DialogButtonStyle.filled", desc: "Solid colored background. Primary uses type color, secondary uses muted fill.", preview: "bg-violet-600 text-white" },
                  { name: "outlined", enum: "DialogButtonStyle.outlined", desc: "Transparent background with a 1.5px colored border. Elegant secondary action.", preview: "border-2 border-violet-600 text-violet-600" },
                  { name: "text", enum: "DialogButtonStyle.text", desc: "No background or border — text only. Lowest visual weight for Cancel-style actions.", preview: "text-violet-600" },
                ].map(s => (
                  <div key={s.name} className="p-4 rounded-2xl border border-slate-200 hover:shadow-md transition-all">
                    <div className={`px-4 py-2 rounded-xl text-sm font-bold text-center mb-3 ${s.preview}`}>{s.name}</div>
                    <code className="text-xs text-violet-600 block mb-2">{s.enum}</code>
                    <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── ProDialogTheme ── */}
          <section id="prodialogtheme">
            <SectionHeading id="prodialogtheme" sub="Full theming control over every visual aspect of the dialog.">
              🎨 ProDialogTheme
            </SectionHeading>

            <CodeBlock filename="pro_dialog_theme.dart" lang="dart" code={`ProDialogTheme({
  Color? backgroundColor,                         // card background
  bool useGlassmorphism = false,                  // frosted glass effect
  bool useGradientBackground = false,             // gradient card fill
  List<Color>? gradientColors,                    // gradient colors (requires useGradientBackground)
  AlignmentGeometry gradientBegin = Alignment.topLeft,
  AlignmentGeometry gradientEnd = Alignment.bottomRight,
  double borderRadius = 24.0,                     // card corner radius
  double iconSize = 48.0,                         // icon widget size
  TextStyle? titleStyle,                          // title text style override
  TextStyle? descriptionStyle,                    // description text style override
  DialogAnimationStyle animationStyle = DialogAnimationStyle.bounce,
  IconAnimationStyle iconAnimationStyle = IconAnimationStyle.bounce,
  bool showIconBackground = true,                 // circular icon background
  double? iconBackgroundSize,                     // defaults to iconSize + 32
  double maxWidth = 380.0,                        // max card width
  EdgeInsetsGeometry? contentPadding,             // content padding
  double elevation = 24.0,                        // card shadow elevation
  Color? shadowColor,                             // drop shadow color
  Color? barrierColor,                            // overlay backdrop color
  Duration entryDuration = Duration(milliseconds: 480),
  Duration iconAnimDuration = Duration(milliseconds: 700),
})`} />

            <div className="mt-6 rounded-2xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    <th className="py-2.5 px-4 text-xs font-black text-slate-600 uppercase tracking-wider">Property</th>
                    <th className="py-2.5 px-4 text-xs font-black text-slate-600 uppercase tracking-wider">Type</th>
                    <th className="py-2.5 px-4 text-xs font-black text-slate-600 uppercase tracking-wider">Default</th>
                    <th className="py-2.5 px-4 text-xs font-black text-slate-600 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <PropRow name="backgroundColor" type="Color?" desc="Dialog card background. Defaults to surface color (white in light, #1E1E2E in dark)." />
                  <PropRow name="useGlassmorphism" type="bool" defaultVal="false" desc="Frosted glass card with white/10 fill and white/18 border. Best on colorful backgrounds." />
                  <PropRow name="useGradientBackground" type="bool" defaultVal="false" desc="Fills the card with a LinearGradient. Uses type colors if gradientColors is null." />
                  <PropRow name="gradientColors" type="List<Color>?" desc="Custom gradient stops. Requires useGradientBackground: true." />
                  <PropRow name="gradientBegin" type="AlignmentGeometry" defaultVal="topLeft" desc="Start point of the gradient." />
                  <PropRow name="gradientEnd" type="AlignmentGeometry" defaultVal="bottomRight" desc="End point of the gradient." />
                  <PropRow name="borderRadius" type="double" defaultVal="24.0" desc="Card corner radius in pixels." />
                  <PropRow name="iconSize" type="double" defaultVal="48.0" desc="Size of the icon widget (icon itself, not the circle)." />
                  <PropRow name="titleStyle" type="TextStyle?" desc="Fully overrides the title text style." />
                  <PropRow name="descriptionStyle" type="TextStyle?" desc="Fully overrides the description text style." />
                  <PropRow name="animationStyle" type="DialogAnimationStyle" defaultVal="bounce" desc="Entry/exit animation style for the dialog card." />
                  <PropRow name="iconAnimationStyle" type="IconAnimationStyle" defaultVal="bounce" desc="Post-entry animation for the icon widget." />
                  <PropRow name="showIconBackground" type="bool" defaultVal="true" desc="Show a gradient circle behind the icon. Set false for a minimal look." />
                  <PropRow name="iconBackgroundSize" type="double?" desc="Size of the icon background circle. Defaults to iconSize + 32." />
                  <PropRow name="maxWidth" type="double" defaultVal="380.0" desc="Maximum dialog width. Critical for tablet/desktop layouts." />
                  <PropRow name="contentPadding" type="EdgeInsetsGeometry?" desc="Padding inside the card. Default: fromLTRB(24, 32, 24, 24)." />
                  <PropRow name="elevation" type="double" defaultVal="24.0" desc="Material elevation for drop shadow." />
                  <PropRow name="shadowColor" type="Color?" desc="Drop shadow color. Defaults to type color at 28% opacity." />
                  <PropRow name="barrierColor" type="Color?" desc="Modal backdrop color. Default: black at 52% opacity." />
                  <PropRow name="entryDuration" type="Duration" defaultVal="480ms" desc="Total duration of the dialog entry animation." />
                  <PropRow name="iconAnimDuration" type="Duration" defaultVal="700ms" desc="Duration of one-shot icon animations (bounce, rotate, shake)." />
                </tbody>
              </table>
            </div>
          </section>

          {/* ── EXAMPLES ── */}
          <section id="examples">
            <SectionHeading id="examples" sub="Real-world usage patterns for common scenarios.">
              💡 Examples
            </SectionHeading>

            <div className="space-y-10">
              {/* Loading */}
              <div>
                <h3 className="font-black text-slate-800 text-xl mb-1">⏳ Loading Dialog</h3>
                <p className="text-slate-500 text-sm mb-4">Non-dismissible. Dismiss programmatically when the async operation finishes.</p>
                <CodeBlock filename="loading_example.dart" lang="dart" code={`Future<void> uploadFile() async {
  // Show loading — user cannot dismiss by tapping outside
  showLoadingDialog(
    context,
    title: 'Uploading File…',
    description: 'Please wait. Do not close the app.',
  );

  try {
    await myApi.uploadFile(file);
    Navigator.pop(context); // dismiss loading

    showSuccessDialog(
      context,
      title: 'Upload Complete!',
      description: 'Your file was uploaded successfully.',
      buttons: [
        DialogButton(
          text: 'Great!',
          isPrimary: true,
          icon: Icons.check_rounded,
          onPressed: () => Navigator.pop(context),
        ),
      ],
    );
  } catch (e) {
    Navigator.pop(context); // dismiss loading

    showErrorDialog(
      context,
      title: 'Upload Failed',
      description: e.toString(),
      buttons: [
        DialogButton(text: 'Retry', isPrimary: true, onPressed: uploadFile),
        DialogButton(text: 'Cancel', style: DialogButtonStyle.text, onPressed: () => Navigator.pop(context)),
      ],
    );
  }
}`} />
              </div>

              {/* Confirmation */}
              <div>
                <h3 className="font-black text-slate-800 text-xl mb-1">🗑️ Destructive Confirmation</h3>
                <p className="text-slate-500 text-sm mb-4">Capture the return value to know which button the user tapped.</p>
                <CodeBlock filename="confirmation_example.dart" lang="dart" code={`final confirmed = await showProDialog<bool>(
  context,
  type: DialogType.error,
  title: 'Delete All Data',
  description:
    'This will permanently erase your account, history, and all saved data. '
    'This action is irreversible.',
  buttons: [
    DialogButton(
      text: 'Cancel',
      style: DialogButtonStyle.outlined,
      onPressed: () => Navigator.pop(context, false),
    ),
    DialogButton(
      text: 'Delete Everything',
      isPrimary: true,
      icon: Icons.delete_forever_rounded,
      onPressed: () => Navigator.pop(context, true),
    ),
  ],
);

if (confirmed == true) {
  await deleteAccount();
}`} />
              </div>

              {/* Auto-dismiss */}
              <div>
                <h3 className="font-black text-slate-800 text-xl mb-1">⏱ Auto-Dismiss Toast Style</h3>
                <p className="text-slate-500 text-sm mb-4">Automatically closes after a set duration — great for non-critical notifications.</p>
                <CodeBlock filename="auto_dismiss_example.dart" lang="dart" code={`showProDialog(
  context,
  type: DialogType.success,
  title: 'Message Sent!',
  description: 'This dialog will close automatically in 3 seconds.',
  showCloseButton: true,
  autoDismissAfter: const Duration(seconds: 3),
  onDismiss: () {
    print('Auto-dismissed!');
  },
);`} />
              </div>

              {/* Custom Content */}
              <div>
                <h3 className="font-black text-slate-800 text-xl mb-1">🛠️ Custom Content Widget</h3>
                <p className="text-slate-500 text-sm mb-4">Inject any Flutter widget — forms, sliders, checkboxes, lists — inside the dialog.</p>
                <CodeBlock filename="custom_content_example.dart" lang="dart" code={`showProDialog(
  context,
  type: DialogType.question,
  title: 'Rate Your Experience',
  description: 'How would you rate our service today?',
  customContent: Row(
    mainAxisAlignment: MainAxisAlignment.center,
    children: List.generate(5, (i) => IconButton(
      icon: Icon(
        i < selectedStars ? Icons.star_rounded : Icons.star_border_rounded,
        color: Colors.amber,
        size: 36,
      ),
      onPressed: () => setState(() => selectedStars = i + 1),
    )),
  ),
  buttons: [
    DialogButton(text: 'Skip', style: DialogButtonStyle.text, onPressed: () => Navigator.pop(context)),
    DialogButton(text: 'Submit', isPrimary: true, icon: Icons.send_rounded, onPressed: () => submitRating()),
  ],
);`} />
              </div>

              {/* Vertical buttons */}
              <div>
                <h3 className="font-black text-slate-800 text-xl mb-1">↕️ Vertical Button Layout</h3>
                <p className="text-slate-500 text-sm mb-4">Use vertical axis for 3+ buttons, or when button labels are long.</p>
                <CodeBlock filename="vertical_buttons_example.dart" lang="dart" code={`showProDialog(
  context,
  type: DialogType.question,
  title: 'How do you want to sign in?',
  description: 'Choose your preferred sign-in method.',
  buttonsAxis: Axis.vertical,
  buttons: [
    DialogButton(
      text: 'Continue with Google',
      isPrimary: true,
      icon: Icons.g_mobiledata_rounded,
      onPressed: () => signInWithGoogle(),
    ),
    DialogButton(
      text: 'Continue with Apple',
      icon: Icons.apple_rounded,
      onPressed: () => signInWithApple(),
    ),
    DialogButton(
      text: 'Use Email & Password',
      style: DialogButtonStyle.outlined,
      icon: Icons.email_rounded,
      onPressed: () => signInWithEmail(),
    ),
    DialogButton(
      text: 'Continue as Guest',
      style: DialogButtonStyle.text,
      onPressed: () => continueAsGuest(),
    ),
  ],
);`} />
              </div>
            </div>
          </section>

          {/* ── THEMING ── */}
          <section id="theming">
            <SectionHeading id="theming" sub="Advanced theming — glassmorphism, gradients, custom typography, and dark mode.">
              🎨 Theming
            </SectionHeading>

            <div className="space-y-8">
              <div>
                <h3 className="font-black text-slate-800 text-xl mb-1">🔮 Glassmorphism</h3>
                <p className="text-slate-500 text-sm mb-4">Frosted glass dialog — spectacular over gradient or image backgrounds.</p>
                <CodeBlock filename="glassmorphism_example.dart" lang="dart" code={`showProDialog(
  context,
  type: DialogType.custom,
  title: 'Premium Unlocked',
  description: 'You now have access to all premium features.',
  icon: Icons.workspace_premium_rounded,
  buttons: [
    DialogButton(
      text: 'Start Exploring',
      isPrimary: true,
      icon: Icons.explore_rounded,
      onPressed: () => Navigator.pop(context),
    ),
  ],
  theme: const ProDialogTheme(
    useGlassmorphism: true,
    animationStyle: DialogAnimationStyle.slideUp,
    iconAnimationStyle: IconAnimationStyle.pulse,
    borderRadius: 32,
    barrierColor: Color(0x99000000),
  ),
);`} />
              </div>

              <div>
                <h3 className="font-black text-slate-800 text-xl mb-1">🌈 Gradient Background</h3>
                <p className="text-slate-500 text-sm mb-4">The entire card is filled with a custom gradient. Buttons adapt their colors automatically.</p>
                <CodeBlock filename="gradient_example.dart" lang="dart" code={`showProDialog(
  context,
  type: DialogType.success,
  title: 'Level Up! 🎉',
  description: 'You have reached Level 42. Keep up the amazing work!',
  buttons: [
    DialogButton(text: 'Claim Reward', isPrimary: true, onPressed: claimReward),
    DialogButton(text: 'Later', style: DialogButtonStyle.outlined, onPressed: () => Navigator.pop(context)),
  ],
  theme: ProDialogTheme(
    useGradientBackground: true,
    gradientColors: const [Color(0xFF6C63FF), Color(0xFF48CAE4)],
    gradientBegin: Alignment.topLeft,
    gradientEnd: Alignment.bottomRight,
    animationStyle: DialogAnimationStyle.bounce,
    iconAnimationStyle: IconAnimationStyle.bounce,
    borderRadius: 28,
    elevation: 32,
    shadowColor: Color(0x556C63FF),
  ),
);`} />
              </div>

              <div>
                <h3 className="font-black text-slate-800 text-xl mb-1">🌙 Dark Mode</h3>
                <p className="text-slate-500 text-sm mb-4">ProDialog automatically adapts to your app's brightness theme — no extra configuration needed.</p>
                <CodeBlock filename="dark_mode_example.dart" lang="dart" code={`// Dark mode is fully automatic!
// ProDialog reads Theme.of(context).brightness internally.
//
// Light theme → white card (#FFFFFF)
// Dark theme  → dark card (#1E1E2E)
//
// To force a specific background color in any mode:
showProDialog(
  context,
  type: DialogType.info,
  title: 'Dark Theme',
  description: 'This dialog uses a forced dark background regardless of theme.',
  theme: ProDialogTheme(
    backgroundColor: const Color(0xFF1E1E2E),
  ),
);`} />
              </div>

              <div>
                <h3 className="font-black text-slate-800 text-xl mb-1">✍️ Custom Typography</h3>
                <CodeBlock filename="typography_example.dart" lang="dart" code={`showProDialog(
  context,
  type: DialogType.info,
  title: 'Custom Fonts',
  description: 'Using your app\'s custom font family and sizing.',
  theme: ProDialogTheme(
    titleStyle: const TextStyle(
      fontFamily: 'Poppins',
      fontSize: 22,
      fontWeight: FontWeight.w900,
      color: Color(0xFF1A1A2E),
      letterSpacing: -0.5,
    ),
    descriptionStyle: const TextStyle(
      fontFamily: 'Poppins',
      fontSize: 14,
      fontWeight: FontWeight.w400,
      color: Color(0xFF64748B),
      height: 1.7,
    ),
  ),
);`} />
              </div>
            </div>
          </section>

          {/* ── ACCESSIBILITY ── */}
          <section id="accessibility">
            <SectionHeading id="accessibility" sub="ProDialog is built with accessibility as a first-class feature.">
              ♿ Accessibility
            </SectionHeading>

            <div className="space-y-5">
              <Callout type="info">
                ProDialog wraps all dialogs in <code className="bg-violet-100 px-1 rounded text-xs">Semantics</code> widgets and all buttons with <code className="bg-violet-100 px-1 rounded text-xs">button: true</code> semantic labels. It works out of the box with TalkBack (Android) and VoiceOver (iOS).
              </Callout>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Dialog Semantics", desc: "Each dialog type has a built-in semantic label: 'Success dialog', 'Error dialog', etc. Override with the DialogType.custom type and a custom label." },
                  { title: "Button Labels", desc: "Every DialogButton uses its text as the semantic label by default. Override with the semanticLabel parameter for screen readers." },
                  { title: "Barrier Label", desc: "The modal barrier uses Flutter's standard MaterialLocalizations.modalBarrierDismissLabel for localization." },
                  { title: "Focus Management", desc: "showGeneralDialog handles focus trapping automatically — focus stays inside the dialog while it's visible." },
                ].map(a => (
                  <div key={a.title} className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <h4 className="font-black text-slate-800 mb-1 flex items-center gap-2"><span>♿</span>{a.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{a.desc}</p>
                  </div>
                ))}
              </div>

              <CodeBlock filename="accessibility_example.dart" lang="dart" code={`// Custom semantic labels for screen readers
showProDialog(
  context,
  type: DialogType.error,
  title: 'Delete Account',
  description: 'This cannot be undone.',
  buttons: [
    DialogButton(
      text: 'Cancel',
      semanticLabel: 'Cancel account deletion',   // custom label
      onPressed: () => Navigator.pop(context),
    ),
    DialogButton(
      text: 'Delete',
      isPrimary: true,
      semanticLabel: 'Confirm delete account permanently',
      onPressed: deleteAccount,
    ),
  ],
);`} />
            </div>
          </section>

          {/* ── CHANGELOG ── */}
          <section id="changelog">
            <SectionHeading id="changelog" sub="A record of all notable changes to ProDialog.">
              📋 Changelog
            </SectionHeading>

            <div className="space-y-4">
              {[
                {
                  version: "1.0.0",
                  date: "2024",
                  badge: "Latest",
                  badgeColor: "green",
                  changes: [
                    ["✨", "Added", "6 dialog types: success, error, warning, info, question, custom"],
                    ["✨", "Added", "5 entry animations: scale, fade, slideUp, slideDown, bounce"],
                    ["✨", "Added", "5 icon animations: bounce, pulse, rotate, shake, none"],
                    ["✨", "Added", "Glassmorphism and gradient background support"],
                    ["✨", "Added", "Auto-dismiss with autoDismissAfter and onDismiss callback"],
                    ["✨", "Added", "Loading state — icon spinner + linear progress bar"],
                    ["✨", "Added", "Close button overlay (showCloseButton)"],
                    ["✨", "Added", "Three button visual styles: filled, outlined, text"],
                    ["✨", "Added", "Convenience helpers: showSuccessDialog, showErrorDialog, showWarningDialog, showLoadingDialog"],
                    ["✨", "Added", "Full Semantics/accessibility support for TalkBack and VoiceOver"],
                    ["✨", "Added", "Dark mode automatic support"],
                    ["✨", "Added", "Zero external dependencies"],
                  ],
                },
              ].map(release => (
                <div key={release.version} className="rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 bg-slate-50 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <h3 className="font-black text-slate-800 text-lg">v{release.version}</h3>
                      <Badge color={release.badgeColor as "green"}>{release.badge}</Badge>
                    </div>
                    <span className="text-slate-400 text-sm">{release.date}</span>
                  </div>
                  <div className="p-5">
                    <ul className="space-y-2">
                      {release.changes.map(([icon, tag, desc]) => (
                        <li key={desc} className="flex items-start gap-3 text-sm">
                          <span>{icon}</span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 shrink-0">{tag}</span>
                          <span className="text-slate-600 leading-relaxed">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── LICENSE ── */}
          <section id="license">
            <SectionHeading id="license" sub="ProDialog is open source and freely available.">
              ⚖️ License
            </SectionHeading>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">⚖️</span>
                <div>
                  <h3 className="font-black text-slate-800 text-xl">MIT License</h3>
                  <p className="text-slate-500 text-sm">Copyright © 2024 ProDialog Contributors</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold">
                  <span>✅</span> Commercial Use
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold">
                  <span>✅</span> Modification
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold">
                  <span>✅</span> Distribution
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold">
                  <span>✅</span> Private Use
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm font-semibold">
                  <span>⚠️</span> License Notice Required
                </div>
              </div>
            </div>
          </section>

          {/* ── Footer CTA ── */}
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 text-white p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-cyan-600/10 pointer-events-none" />
            <div className="relative">
              <div className="text-5xl mb-4">🚀</div>
              <h2 className="text-3xl font-black mb-3 tracking-tight">Ready to ship beautiful dialogs?</h2>
              <p className="text-slate-400 max-w-md mx-auto mb-8 leading-relaxed text-sm">
                Add ProDialog to your pubspec.yaml and have a production-quality, animated dialog in your app within minutes.
              </p>
              <CodeBlock code="flutter pub add pro_dialog" lang="bash" light />
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <a href="#quickstart" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-black text-sm hover:opacity-90 transition shadow-lg">
                  🚀 Quick Start Guide
                </a>
                <a href="https://pub.dev" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-bold text-sm hover:bg-white/20 transition">
                  📦 View on pub.dev ↗
                </a>
              </div>
            </div>
          </div>

        </main>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-slate-50 py-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white font-black text-xs">P</div>
            <span className="font-bold text-slate-700">ProDialog</span>
            <span className="text-slate-300">·</span>
            <span>v1.0.0</span>
            <span className="text-slate-300">·</span>
            <span>MIT License</span>
          </div>
          <p>Built with ❤️ for the Flutter community · © 2024 ProDialog Contributors</p>
          <div className="flex items-center gap-4">
            <a href="https://pub.dev" target="_blank" rel="noopener noreferrer" className="hover:text-violet-600 font-semibold transition-colors">pub.dev ↗</a>
            <a href="https://dart.dev/tools/pub/publishing" target="_blank" rel="noopener noreferrer" className="hover:text-violet-600 font-semibold transition-colors">Docs ↗</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
