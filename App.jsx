import { useState, useEffect, useRef } from "react";

const EXPERTS_DATA = [
  { id: 1, name: "Khadija El Amrani", photo: "KE", domain: "Finance & Investment", speciality: "Private Equity, M&A", country: "🇫🇷 France", city: "Paris", experience: 22, languages: ["Français", "Arabe", "Anglais"], rating: 4.9, sessions: 47, bio: "Managing Director chez un fonds PE à Paris. Experte en structuration de deals et levée de fonds pour l'Afrique.", disponible: true },
  { id: 2, name: "Youssef Benali", photo: "YB", domain: "Tech & Digital", speciality: "SaaS, Product Management", country: "🇺🇸 États-Unis", city: "San Francisco", experience: 15, languages: ["Anglais", "Français", "Arabe"], rating: 4.8, sessions: 63, bio: "VP Product dans une licorne SaaS de la Silicon Valley. Mentor de startups tech au Maroc.", disponible: true },
  { id: 3, name: "Fatima-Zahra Idrissi", photo: "FI", domain: "Industrie & Manufacturing", speciality: "Supply Chain, Lean Management", country: "🇩🇪 Allemagne", city: "Munich", experience: 18, languages: ["Français", "Allemand", "Arabe"], rating: 4.7, sessions: 31, bio: "Directrice Supply Chain chez un groupe automobile allemand. Spécialiste de l'excellence opérationnelle.", disponible: false },
  { id: 4, name: "Omar Tazi", photo: "OT", domain: "Entrepreneuriat", speciality: "Scaling, Go-to-Market", country: "🇬🇧 Royaume-Uni", city: "Londres", experience: 12, languages: ["Anglais", "Français", "Arabe"], rating: 5.0, sessions: 89, bio: "Serial entrepreneur, 3 exits réussis. Advisor pour des fonds VC à Londres.", disponible: true },
  { id: 5, name: "Salma Chraibi", photo: "SC", domain: "Marketing & Communication", speciality: "Branding, Digital Marketing", country: "🇨🇦 Canada", city: "Montréal", experience: 10, languages: ["Français", "Anglais"], rating: 4.6, sessions: 25, bio: "Directrice Marketing dans une agence internationale. Experte en stratégie de marque pour les marchés émergents.", disponible: true },
  { id: 6, name: "Mehdi Alaoui", photo: "MA", domain: "Finance & Investment", speciality: "Corporate Finance, Audit", country: "🇦🇪 Émirats Arabes Unis", city: "Dubaï", experience: 20, languages: ["Arabe", "Français", "Anglais"], rating: 4.8, sessions: 52, bio: "CFO d'un groupe régional basé à Dubaï. Expert en structuration financière et gouvernance.", disponible: true },
];

const DOMAINS = ["Tous", "Finance & Investment", "Tech & Digital", "Industrie & Manufacturing", "Entrepreneuriat", "Marketing & Communication", "Juridique & Compliance", "RH & Management", "Santé & Pharma"];
const COUNTRIES = ["Tous", "🇫🇷 France", "🇺🇸 États-Unis", "🇩🇪 Allemagne", "🇬🇧 Royaume-Uni", "🇨🇦 Canada", "🇦🇪 Émirats Arabes Unis", "🇳🇱 Pays-Bas", "🇧🇪 Belgique"];
const LANGUAGES = ["Toutes", "Français", "Anglais", "Arabe", "Allemand", "Espagnol"];

// ─── Shared Components ───
function Nav({ currentPage, setCurrentPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    { id: "home", label: "Accueil" },
    { id: "experts", label: "Trouver un Expert" },
    { id: "register", label: "Devenir Expert" },
    { id: "how", label: "Comment ça marche" },
    { id: "about", label: "À propos" },
  ];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(10,25,47,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      transition: "all 0.4s ease",
      borderBottom: scrolled ? "1px solid rgba(45,212,191,0.15)" : "none",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <div onClick={() => setCurrentPage("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, background: "linear-gradient(135deg, #2dd4bf, #0d9488)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "#0a192f", letterSpacing: 1 }}>MW</div>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: "#e2e8f0", letterSpacing: -0.5 }}>MOW <span style={{ color: "#2dd4bf" }}>Connect</span></span>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {links.map(l => (
            <button key={l.id} onClick={() => { setCurrentPage(l.id); setMenuOpen(false); }}
              style={{
                background: currentPage === l.id ? "rgba(45,212,191,0.12)" : "transparent",
                border: "none", color: currentPage === l.id ? "#2dd4bf" : "#94a3b8",
                padding: "8px 16px", borderRadius: 8, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
                transition: "all 0.2s",
              }}>{l.label}</button>
          ))}
          <button onClick={() => setCurrentPage("register")} style={{
            background: "linear-gradient(135deg, #2dd4bf, #0d9488)", border: "none",
            color: "#0a192f", padding: "10px 22px", borderRadius: 10, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: 0.3,
            marginLeft: 8,
          }}>S'inscrire</button>
        </div>
      </div>
    </nav>
  );
}

function Footer({ setCurrentPage }) {
  return (
    <footer style={{ background: "#060f1d", borderTop: "1px solid rgba(45,212,191,0.1)", padding: "60px 24px 30px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 34, height: 34, background: "linear-gradient(135deg, #2dd4bf, #0d9488)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, color: "#0a192f" }}>MW</div>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: "#e2e8f0" }}>MOW <span style={{ color: "#2dd4bf" }}>Connect</span></span>
            </div>
            <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7, maxWidth: 320 }}>La plateforme qui connecte l'expertise de la diaspora marocaine avec les entrepreneurs et managers au Maroc.</p>
          </div>
          <div>
            <h4 style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 16 }}>Plateforme</h4>
            {["Trouver un Expert", "Devenir Expert", "Tarification", "FAQ"].map(t => (
              <p key={t} style={{ color: "#64748b", fontSize: 14, marginBottom: 10, cursor: "pointer" }}>{t}</p>
            ))}
          </div>
          <div>
            <h4 style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 16 }}>Ressources</h4>
            {["Blog", "Success Stories", "Guide du Mentor", "Partenaires"].map(t => (
              <p key={t} style={{ color: "#64748b", fontSize: 14, marginBottom: 10, cursor: "pointer" }}>{t}</p>
            ))}
          </div>
          <div>
            <h4 style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 16 }}>Contact</h4>
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 10 }}>contact@mowconnect.com</p>
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 10 }}>Africa Business School, UM6P</p>
            <p style={{ color: "#64748b", fontSize: 14 }}>Ben Guerir, Maroc</p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(100,116,139,0.2)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ color: "#475569", fontSize: 13 }}>© 2026 MOW Connect. Tous droits réservés.</p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Conditions d'utilisation", "Politique de confidentialité", "Mentions légales"].map(t => (
              <span key={t} style={{ color: "#475569", fontSize: 13, cursor: "pointer" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function SectionTitle({ tag, title, subtitle }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 56 }}>
      {tag && <div style={{ display: "inline-block", background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.25)", color: "#2dd4bf", padding: "6px 18px", borderRadius: 100, fontSize: 13, fontWeight: 600, letterSpacing: 0.8, marginBottom: 16 }}>{tag}</div>}
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 42, fontWeight: 700, color: "#e2e8f0", lineHeight: 1.2, margin: "0 0 16px" }}>{title}</h2>
      {subtitle && <p style={{ color: "#64748b", fontSize: 17, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>{subtitle}</p>}
    </div>
  );
}

// ─── Home Page ───
function HomePage({ setCurrentPage }) {
  return (
    <div>
      {/* Hero */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "radial-gradient(ellipse at 30% 20%, rgba(45,212,191,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(13,148,136,0.06) 0%, transparent 50%), #0a192f",
        padding: "120px 24px 80px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "15%", left: "8%", width: 300, height: 300, borderRadius: "50%", border: "1px solid rgba(45,212,191,0.06)", animation: "float 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(45,212,191,0.04)", animation: "float 10s ease-in-out infinite reverse" }} />
        <div style={{ maxWidth: 900, textAlign: "center", position: "relative" }}>
          <div style={{ display: "inline-block", background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.25)", color: "#2dd4bf", padding: "8px 20px", borderRadius: 100, fontSize: 14, fontWeight: 600, letterSpacing: 0.5, marginBottom: 32 }}>
            🌍 Moroccans of the World
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 64, fontWeight: 700, color: "#e2e8f0", lineHeight: 1.1, margin: "0 0 24px", letterSpacing: -1 }}>
            L'expertise de la diaspora<br />au service du <span style={{ color: "#2dd4bf", fontStyle: "italic" }}>Maroc</span>
          </h1>
          <p style={{ fontSize: 19, color: "#94a3b8", lineHeight: 1.7, maxWidth: 650, margin: "0 auto 40px" }}>
            Connectez-vous avec des experts marocains du monde entier. Sessions de conseil de 45 minutes. Payez ce que ça vaut pour vous.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <button onClick={() => setCurrentPage("experts")} style={{
              background: "linear-gradient(135deg, #2dd4bf, #0d9488)", border: "none",
              color: "#0a192f", padding: "16px 36px", borderRadius: 12, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700,
              boxShadow: "0 4px 24px rgba(45,212,191,0.25)",
            }}>Trouver un Expert →</button>
            <button onClick={() => setCurrentPage("register")} style={{
              background: "transparent", border: "1px solid rgba(45,212,191,0.4)",
              color: "#2dd4bf", padding: "16px 36px", borderRadius: 12, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600,
            }}>Devenir Expert</button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "#0d1f3c", padding: "48px 24px", borderTop: "1px solid rgba(45,212,191,0.08)", borderBottom: "1px solid rgba(45,212,191,0.08)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32, textAlign: "center" }}>
          {[
            { n: "5M+", l: "Marocains de la diaspora" },
            { n: "48", l: "Pays représentés" },
            { n: "250+", l: "Experts inscrits" },
            { n: "1 200+", l: "Sessions réalisées" },
          ].map(s => (
            <div key={s.l}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 38, fontWeight: 700, color: "#2dd4bf" }}>{s.n}</div>
              <div style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works summary */}
      <section style={{ background: "#0a192f", padding: "100px 24px" }}>
        <SectionTitle tag="SIMPLE & EFFICACE" title="Comment ça marche ?" subtitle="Un processus en 3 étapes pour accéder à l'expertise de la diaspora" />
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}>
          {[
            { step: "01", icon: "🔍", title: "Trouvez votre expert", desc: "Recherchez par domaine d'expertise, pays, langue ou disponibilité. Consultez les profils détaillés et les évaluations." },
            { step: "02", icon: "📅", title: "Réservez une session", desc: "Choisissez un créneau de 45 minutes qui vous convient. Décrivez votre besoin pour que l'expert se prépare." },
            { step: "03", icon: "💡", title: "Payez ce que ça vaut", desc: "Après la session, évaluez sa valeur et payez ce que vous estimez juste. Notre modèle repose sur la réciprocité." },
          ].map(c => (
            <div key={c.step} style={{
              background: "linear-gradient(135deg, rgba(45,212,191,0.04), rgba(13,148,136,0.02))",
              border: "1px solid rgba(45,212,191,0.1)", borderRadius: 20, padding: 40,
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 16, right: 20, fontFamily: "'Playfair Display', Georgia, serif", fontSize: 64, fontWeight: 700, color: "rgba(45,212,191,0.06)" }}>{c.step}</div>
              <div style={{ fontSize: 40, marginBottom: 20 }}>{c.icon}</div>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, color: "#e2e8f0", marginBottom: 12 }}>{c.title}</h3>
              <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.7 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured experts */}
      <section style={{ background: "#0d1f3c", padding: "100px 24px" }}>
        <SectionTitle tag="EXPERTS EN VEDETTE" title="Rencontrez nos experts" subtitle="Des professionnels marocains de haut niveau prêts à partager leur expertise" />
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {EXPERTS_DATA.slice(0, 3).map(e => (
            <ExpertCard key={e.id} expert={e} onClick={() => {}} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <button onClick={() => setCurrentPage("experts")} style={{
            background: "transparent", border: "1px solid rgba(45,212,191,0.4)",
            color: "#2dd4bf", padding: "14px 32px", borderRadius: 10, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
          }}>Voir tous les experts →</button>
        </div>
      </section>

      {/* Pay what it's worth */}
      <section style={{ background: "#0a192f", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-block", background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.25)", color: "#2dd4bf", padding: "6px 18px", borderRadius: 100, fontSize: 13, fontWeight: 600, marginBottom: 20 }}>MODÈLE INNOVANT</div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 38, fontWeight: 700, color: "#e2e8f0", lineHeight: 1.2, marginBottom: 20 }}>Payez ce que<br />ça <span style={{ color: "#2dd4bf", fontStyle: "italic" }}>vaut</span> pour vous</h2>
            <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
              Notre modèle unique s'inspire des valeurs de réciprocité et de solidarité de la culture marocaine. Les demandeurs de conseil évaluent librement la valeur de chaque session.
            </p>
            {["L'expert paie un abonnement mensuel pour accéder à la plateforme", "Le demandeur paie ce qu'il estime juste après la session", "MOW Connect retient 10% pour assurer la pérennité du service", "Un système d'évaluation mutuelle garantit la qualité"].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(45,212,191,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2dd4bf", fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</div>
                <span style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.6 }}>{t}</span>
              </div>
            ))}
          </div>
          <div style={{
            background: "linear-gradient(135deg, rgba(45,212,191,0.06), rgba(13,148,136,0.03))",
            border: "1px solid rgba(45,212,191,0.12)", borderRadius: 24, padding: 48, textAlign: "center",
          }}>
            <div style={{ fontSize: 14, color: "#2dd4bf", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 24 }}>Abonnement Expert</div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 56, fontWeight: 700, color: "#e2e8f0" }}>29€<span style={{ fontSize: 20, color: "#64748b", fontWeight: 400 }}>/mois</span></div>
            <p style={{ color: "#64748b", fontSize: 14, margin: "16px 0 32px" }}>Accès illimité à la plateforme</p>
            {["Profil expert vérifié", "Agenda intégré", "Visioconférence intégrée", "Tableau de bord analytics", "Badge MOW certifié"].map(f => (
              <div key={f} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12, justifyContent: "center" }}>
                <span style={{ color: "#2dd4bf", fontSize: 14 }}>✓</span>
                <span style={{ color: "#94a3b8", fontSize: 15 }}>{f}</span>
              </div>
            ))}
            <button onClick={() => setCurrentPage("register")} style={{
              background: "linear-gradient(135deg, #2dd4bf, #0d9488)", border: "none",
              color: "#0a192f", padding: "14px 36px", borderRadius: 10, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, marginTop: 28, width: "100%",
            }}>Devenir Expert →</button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: "linear-gradient(135deg, rgba(45,212,191,0.12), rgba(13,148,136,0.06)), #0a192f",
        padding: "100px 24px", textAlign: "center",
      }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 42, fontWeight: 700, color: "#e2e8f0", marginBottom: 16 }}>Prêt à connecter ?</h2>
        <p style={{ color: "#94a3b8", fontSize: 17, marginBottom: 40, maxWidth: 500, margin: "0 auto 40px" }}>Rejoignez la communauté MOW Connect et contribuez au développement du Maroc.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <button onClick={() => setCurrentPage("experts")} style={{ background: "linear-gradient(135deg, #2dd4bf, #0d9488)", border: "none", color: "#0a192f", padding: "16px 36px", borderRadius: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700 }}>Je cherche un expert</button>
          <button onClick={() => setCurrentPage("register")} style={{ background: "transparent", border: "1px solid rgba(45,212,191,0.4)", color: "#2dd4bf", padding: "16px 36px", borderRadius: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600 }}>Je suis expert diaspora</button>
        </div>
      </section>
    </div>
  );
}

// ─── Expert Card ───
function ExpertCard({ expert, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: "linear-gradient(145deg, rgba(45,212,191,0.04), rgba(13,31,60,0.8))",
      border: "1px solid rgba(45,212,191,0.1)", borderRadius: 18, padding: 28,
      cursor: "pointer", transition: "all 0.3s",
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(45,212,191,0.35)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(45,212,191,0.1)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 16 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 14,
          background: `linear-gradient(135deg, #2dd4bf, #0d9488)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#0a192f", fontWeight: 800, fontSize: 18,
        }}>{expert.photo}</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 16 }}>{expert.name}</div>
          <div style={{ color: "#64748b", fontSize: 13 }}>{expert.country} · {expert.city}</div>
        </div>
        {expert.disponible && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#2dd4bf", boxShadow: "0 0 8px rgba(45,212,191,0.5)" }} />}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
        <span style={{ background: "rgba(45,212,191,0.1)", color: "#2dd4bf", padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{expert.domain}</span>
        <span style={{ background: "rgba(148,163,184,0.1)", color: "#94a3b8", padding: "4px 12px", borderRadius: 6, fontSize: 12 }}>{expert.experience} ans exp.</span>
      </div>
      <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, marginBottom: 16, minHeight: 44 }}>{expert.bio.substring(0, 100)}...</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(45,212,191,0.08)", paddingTop: 14 }}>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <span style={{ color: "#f59e0b", fontSize: 14 }}>★</span>
          <span style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 600 }}>{expert.rating}</span>
          <span style={{ color: "#64748b", fontSize: 13 }}>({expert.sessions} sessions)</span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {expert.languages.slice(0, 2).map(l => (
            <span key={l} style={{ background: "rgba(100,116,139,0.15)", color: "#94a3b8", padding: "3px 8px", borderRadius: 4, fontSize: 11 }}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Experts Directory ───
function ExpertsPage() {
  const [domain, setDomain] = useState("Tous");
  const [country, setCountry] = useState("Tous");
  const [language, setLanguage] = useState("Toutes");
  const [search, setSearch] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);

  const filtered = EXPERTS_DATA.filter(e => {
    if (domain !== "Tous" && e.domain !== domain) return false;
    if (country !== "Tous" && e.country !== country) return false;
    if (language !== "Toutes" && !e.languages.includes(language)) return false;
    if (onlyAvailable && !e.disponible) return false;
    if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !e.speciality.toLowerCase().includes(search.toLowerCase()) && !e.bio.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const selectStyle = {
    background: "rgba(15,35,64,0.8)", border: "1px solid rgba(45,212,191,0.15)",
    color: "#e2e8f0", padding: "12px 16px", borderRadius: 10, fontSize: 14,
    fontFamily: "'DM Sans', sans-serif", outline: "none", cursor: "pointer", flex: 1, minWidth: 160,
    appearance: "none", WebkitAppearance: "none",
  };

  return (
    <div style={{ background: "#0a192f", minHeight: "100vh", paddingTop: 100 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <SectionTitle tag="ANNUAIRE" title="Trouvez votre expert" subtitle="Filtrez par domaine, pays, langue ou disponibilité pour trouver l'expert idéal" />

        {/* Filters */}
        <div style={{
          background: "rgba(13,31,60,0.6)", border: "1px solid rgba(45,212,191,0.1)",
          borderRadius: 18, padding: 28, marginBottom: 40,
        }}>
          <div style={{ marginBottom: 20 }}>
            <input type="text" placeholder="🔍  Rechercher par nom, spécialité, mot-clé..." value={search} onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%", background: "rgba(10,25,47,0.8)", border: "1px solid rgba(45,212,191,0.15)",
                color: "#e2e8f0", padding: "14px 20px", borderRadius: 12, fontSize: 15,
                fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box",
              }} />
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <select value={domain} onChange={e => setDomain(e.target.value)} style={selectStyle}>
              {DOMAINS.map(d => <option key={d} value={d}>{d === "Tous" ? "📂 Domaine" : d}</option>)}
            </select>
            <select value={country} onChange={e => setCountry(e.target.value)} style={selectStyle}>
              {COUNTRIES.map(d => <option key={d} value={d}>{d === "Tous" ? "🌍 Pays" : d}</option>)}
            </select>
            <select value={language} onChange={e => setLanguage(e.target.value)} style={selectStyle}>
              {LANGUAGES.map(d => <option key={d} value={d}>{d === "Toutes" ? "🗣 Langue" : d}</option>)}
            </select>
            <label style={{ display: "flex", gap: 8, alignItems: "center", color: "#94a3b8", fontSize: 14, cursor: "pointer", whiteSpace: "nowrap" }}>
              <input type="checkbox" checked={onlyAvailable} onChange={e => setOnlyAvailable(e.target.checked)}
                style={{ accentColor: "#2dd4bf" }} />
              Disponibles uniquement
            </label>
          </div>
        </div>

        {/* Results */}
        <div style={{ marginBottom: 24, color: "#64748b", fontSize: 14 }}>{filtered.length} expert{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, paddingBottom: 80 }}>
          {filtered.map(e => <ExpertCard key={e.id} expert={e} onClick={() => setSelectedExpert(e)} />)}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 80, color: "#64748b" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 16 }}>Aucun expert ne correspond à vos critères.</p>
            <p style={{ fontSize: 14, marginTop: 8 }}>Essayez d'élargir vos filtres.</p>
          </div>
        )}
      </div>

      {/* Expert Detail Modal */}
      {selectedExpert && (
        <div onClick={() => setSelectedExpert(null)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 2000,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
          backdropFilter: "blur(4px)",
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: "#0f2340", border: "1px solid rgba(45,212,191,0.2)",
            borderRadius: 24, padding: 48, maxWidth: 600, width: "100%", position: "relative",
          }}>
            <button onClick={() => setSelectedExpert(null)} style={{
              position: "absolute", top: 16, right: 20, background: "none", border: "none",
              color: "#64748b", fontSize: 24, cursor: "pointer",
            }}>×</button>
            <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 24 }}>
              <div style={{ width: 72, height: 72, borderRadius: 18, background: "linear-gradient(135deg, #2dd4bf, #0d9488)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0a192f", fontWeight: 800, fontSize: 22 }}>{selectedExpert.photo}</div>
              <div>
                <h3 style={{ color: "#e2e8f0", fontSize: 22, fontWeight: 700, margin: 0 }}>{selectedExpert.name}</h3>
                <div style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>{selectedExpert.country} · {selectedExpert.city}</div>
                <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 6 }}>
                  <span style={{ color: "#f59e0b" }}>★</span>
                  <span style={{ color: "#e2e8f0", fontWeight: 600 }}>{selectedExpert.rating}</span>
                  <span style={{ color: "#64748b", fontSize: 13 }}>· {selectedExpert.sessions} sessions</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              <span style={{ background: "rgba(45,212,191,0.12)", color: "#2dd4bf", padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600 }}>{selectedExpert.domain}</span>
              <span style={{ background: "rgba(148,163,184,0.1)", color: "#94a3b8", padding: "6px 14px", borderRadius: 8, fontSize: 13 }}>{selectedExpert.speciality}</span>
              <span style={{ background: "rgba(148,163,184,0.1)", color: "#94a3b8", padding: "6px 14px", borderRadius: 8, fontSize: 13 }}>{selectedExpert.experience} ans</span>
            </div>
            <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>{selectedExpert.bio}</p>
            <div style={{ marginBottom: 28 }}>
              <div style={{ color: "#64748b", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Langues</div>
              <div style={{ display: "flex", gap: 8 }}>
                {selectedExpert.languages.map(l => <span key={l} style={{ background: "rgba(100,116,139,0.15)", color: "#94a3b8", padding: "5px 12px", borderRadius: 6, fontSize: 13 }}>{l}</span>)}
              </div>
            </div>
            <button style={{
              width: "100%", background: selectedExpert.disponible ? "linear-gradient(135deg, #2dd4bf, #0d9488)" : "rgba(100,116,139,0.2)",
              border: "none", color: selectedExpert.disponible ? "#0a192f" : "#64748b",
              padding: "16px", borderRadius: 12, cursor: selectedExpert.disponible ? "pointer" : "not-allowed",
              fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700,
            }}>{selectedExpert.disponible ? "📅 Réserver une session de 45 min" : "Indisponible actuellement"}</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Registration Form ───
function RegisterPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ nom: "", prenom: "", email: "", pays: "", ville: "", domain: "", specialite: "", experience: "", bio: "", linkedin: "", langues: [], motivation: "" });

  const inputStyle = {
    width: "100%", background: "rgba(10,25,47,0.8)", border: "1px solid rgba(45,212,191,0.15)",
    color: "#e2e8f0", padding: "14px 18px", borderRadius: 10, fontSize: 15,
    fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box",
  };

  const labelStyle = { color: "#94a3b8", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8, letterSpacing: 0.3 };

  return (
    <div style={{ background: "#0a192f", minHeight: "100vh", paddingTop: 100, paddingBottom: 80 }}>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px" }}>
        <SectionTitle tag="INSCRIPTION EXPERT" title="Rejoignez la communauté" subtitle="Partagez votre expertise avec les entrepreneurs et managers au Maroc" />

        {/* Progress */}
        <div style={{ display: "flex", gap: 8, marginBottom: 48 }}>
          {["Identité", "Expertise", "Motivation"].map((s, i) => (
            <div key={s} style={{ flex: 1 }}>
              <div style={{
                height: 4, borderRadius: 4,
                background: i + 1 <= step ? "linear-gradient(90deg, #2dd4bf, #0d9488)" : "rgba(100,116,139,0.2)",
                transition: "all 0.4s",
              }} />
              <div style={{ color: i + 1 <= step ? "#2dd4bf" : "#475569", fontSize: 12, fontWeight: 600, marginTop: 8, textAlign: "center" }}>Étape {i + 1}: {s}</div>
            </div>
          ))}
        </div>

        <div style={{
          background: "rgba(13,31,60,0.6)", border: "1px solid rgba(45,212,191,0.1)",
          borderRadius: 22, padding: 44,
        }}>
          {step === 1 && (
            <div>
              <h3 style={{ color: "#e2e8f0", fontSize: 22, fontWeight: 700, marginBottom: 28, fontFamily: "'Playfair Display', Georgia, serif" }}>Informations personnelles</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                <div><label style={labelStyle}>Prénom *</label><input style={inputStyle} value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })} placeholder="Votre prénom" /></div>
                <div><label style={labelStyle}>Nom *</label><input style={inputStyle} value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} placeholder="Votre nom" /></div>
              </div>
              <div style={{ marginBottom: 20 }}><label style={labelStyle}>Email professionnel *</label><input type="email" style={inputStyle} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="votre@email.com" /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                <div><label style={labelStyle}>Pays de résidence *</label><input style={inputStyle} value={form.pays} onChange={e => setForm({ ...form, pays: e.target.value })} placeholder="Ex: France" /></div>
                <div><label style={labelStyle}>Ville *</label><input style={inputStyle} value={form.ville} onChange={e => setForm({ ...form, ville: e.target.value })} placeholder="Ex: Paris" /></div>
              </div>
              <div><label style={labelStyle}>Profil LinkedIn</label><input style={inputStyle} value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} placeholder="https://linkedin.com/in/..." /></div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h3 style={{ color: "#e2e8f0", fontSize: 22, fontWeight: 700, marginBottom: 28, fontFamily: "'Playfair Display', Georgia, serif" }}>Votre expertise</h3>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Domaine d'expertise *</label>
                <select style={{ ...inputStyle, cursor: "pointer" }} value={form.domain} onChange={e => setForm({ ...form, domain: e.target.value })}>
                  <option value="">Sélectionnez un domaine</option>
                  {DOMAINS.filter(d => d !== "Tous").map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 20 }}><label style={labelStyle}>Spécialité(s) *</label><input style={inputStyle} value={form.specialite} onChange={e => setForm({ ...form, specialite: e.target.value })} placeholder="Ex: Private Equity, M&A, Levée de fonds" /></div>
              <div style={{ marginBottom: 20 }}><label style={labelStyle}>Années d'expérience *</label><input type="number" style={inputStyle} value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} placeholder="Ex: 15" /></div>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Langues parlées *</label>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {["Français", "Anglais", "Arabe", "Espagnol", "Allemand", "Autre"].map(l => (
                    <label key={l} style={{
                      display: "flex", gap: 6, alignItems: "center",
                      background: form.langues.includes(l) ? "rgba(45,212,191,0.12)" : "rgba(100,116,139,0.1)",
                      border: `1px solid ${form.langues.includes(l) ? "rgba(45,212,191,0.4)" : "rgba(100,116,139,0.15)"}`,
                      padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontSize: 14,
                      color: form.langues.includes(l) ? "#2dd4bf" : "#94a3b8",
                    }}>
                      <input type="checkbox" checked={form.langues.includes(l)} onChange={() => setForm({ ...form, langues: form.langues.includes(l) ? form.langues.filter(x => x !== l) : [...form.langues, l] })} style={{ display: "none" }} />
                      {l}
                    </label>
                  ))}
                </div>
              </div>
              <div><label style={labelStyle}>Biographie professionnelle *</label><textarea rows={4} style={{ ...inputStyle, resize: "vertical" }} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} placeholder="Décrivez votre parcours et ce que vous pouvez apporter aux entrepreneurs et managers marocains..." /></div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h3 style={{ color: "#e2e8f0", fontSize: 22, fontWeight: 700, marginBottom: 28, fontFamily: "'Playfair Display', Georgia, serif" }}>Votre motivation</h3>
              <div style={{ marginBottom: 24 }}><label style={labelStyle}>Pourquoi souhaitez-vous rejoindre MOW Connect ? *</label><textarea rows={5} style={{ ...inputStyle, resize: "vertical" }} value={form.motivation} onChange={e => setForm({ ...form, motivation: e.target.value })} placeholder="Qu'est-ce qui vous motive à partager votre expertise avec le Maroc ?" /></div>
              <div style={{
                background: "rgba(45,212,191,0.06)", border: "1px solid rgba(45,212,191,0.15)",
                borderRadius: 14, padding: 24, marginBottom: 24,
              }}>
                <h4 style={{ color: "#2dd4bf", fontSize: 15, fontWeight: 700, marginBottom: 12 }}>📋 Récapitulatif</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    ["Nom", `${form.prenom} ${form.nom}`],
                    ["Email", form.email],
                    ["Localisation", `${form.ville}, ${form.pays}`],
                    ["Domaine", form.domain],
                    ["Spécialité", form.specialite],
                    ["Expérience", `${form.experience} ans`],
                  ].map(([k, v]) => (
                    <div key={k}><span style={{ color: "#64748b", fontSize: 12 }}>{k}</span><div style={{ color: "#e2e8f0", fontSize: 14 }}>{v || "—"}</div></div>
                  ))}
                </div>
              </div>
              <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 12, padding: 20 }}>
                <p style={{ color: "#f59e0b", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                  💡 En soumettant votre candidature, vous acceptez nos conditions d'utilisation. Votre profil sera vérifié par notre équipe sous 48h. L'abonnement mensuel de 29€/mois sera activé après validation.
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 36 }}>
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} style={{
                background: "transparent", border: "1px solid rgba(100,116,139,0.3)",
                color: "#94a3b8", padding: "12px 28px", borderRadius: 10, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
              }}>← Retour</button>
            ) : <div />}
            <button onClick={() => step < 3 ? setStep(step + 1) : alert("✅ Candidature soumise avec succès ! Vous recevrez un email de confirmation.")} style={{
              background: "linear-gradient(135deg, #2dd4bf, #0d9488)", border: "none",
              color: "#0a192f", padding: "12px 32px", borderRadius: 10, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700,
            }}>{step < 3 ? "Continuer →" : "Soumettre ma candidature ✓"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── How It Works ───
function HowPage() {
  return (
    <div style={{ background: "#0a192f", minHeight: "100vh", paddingTop: 100, paddingBottom: 80 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        <SectionTitle tag="GUIDE" title="Comment ça marche" subtitle="Tout ce que vous devez savoir pour utiliser MOW Connect" />

        {/* For seekers */}
        <div style={{ marginBottom: 64 }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#2dd4bf", fontSize: 26, fontWeight: 700, marginBottom: 32 }}>🎯 Pour les demandeurs de conseil</h3>
          {[
            { step: "1", title: "Créez votre compte gratuit", desc: "Inscription rapide avec votre email. Aucun frais d'inscription. Décrivez votre profil et vos besoins." },
            { step: "2", title: "Explorez l'annuaire d'experts", desc: "Filtrez par domaine d'expertise, pays de résidence, langue, disponibilité. Consultez les profils, évaluations et biographies." },
            { step: "3", title: "Réservez une session", desc: "Sélectionnez un créneau de 45 minutes dans l'agenda de l'expert. Décrivez votre problématique pour optimiser la session." },
            { step: "4", title: "Participez à la visioconférence", desc: "Rejoignez la session directement depuis la plateforme. Échangez avec l'expert, posez vos questions, obtenez des conseils actionnables." },
            { step: "5", title: "Évaluez et payez ce que ça vaut", desc: "Après la session, notez l'expert et indiquez combien cette session valait pour vous. Le paiement est libre et confidentiel." },
          ].map(s => (
            <div key={s.step} style={{ display: "flex", gap: 24, marginBottom: 28, alignItems: "flex-start" }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: "rgba(45,212,191,0.12)", border: "1px solid rgba(45,212,191,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#2dd4bf", fontWeight: 800, fontSize: 18,
              }}>{s.step}</div>
              <div>
                <div style={{ color: "#e2e8f0", fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{s.title}</div>
                <div style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.7 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* For experts */}
        <div style={{ marginBottom: 64 }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#2dd4bf", fontSize: 26, fontWeight: 700, marginBottom: 32 }}>🌍 Pour les experts de la diaspora</h3>
          {[
            { step: "1", title: "Soumettez votre candidature", desc: "Remplissez le formulaire d'inscription en 3 étapes. Notre équipe vérifie chaque profil sous 48h." },
            { step: "2", title: "Configurez votre profil", desc: "Complétez votre biographie, ajoutez vos spécialités, définissez vos disponibilités dans l'agenda intégré." },
            { step: "3", title: "Recevez des demandes", desc: "Les entrepreneurs et managers marocains vous contactent directement via la plateforme pour réserver des sessions." },
            { step: "4", title: "Partagez votre expertise", desc: "Conduisez des sessions de 45 minutes en visioconférence. Apportez des conseils concrets et actionnables." },
            { step: "5", title: "Développez votre impact", desc: "Suivez vos statistiques, recueillez des évaluations, et construisez votre réputation dans la communauté MOW." },
          ].map(s => (
            <div key={s.step} style={{ display: "flex", gap: 24, marginBottom: 28, alignItems: "flex-start" }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#f59e0b", fontWeight: 800, fontSize: 18,
              }}>{s.step}</div>
              <div>
                <div style={{ color: "#e2e8f0", fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{s.title}</div>
                <div style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.7 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{
          background: "rgba(13,31,60,0.6)", border: "1px solid rgba(45,212,191,0.1)",
          borderRadius: 22, padding: 44,
        }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#e2e8f0", fontSize: 26, fontWeight: 700, marginBottom: 32 }}>❓ Questions fréquentes</h3>
          {[
            { q: "Combien coûte une session pour le demandeur ?", a: "Le demandeur paie ce qu'il estime juste après la session. Il n'y a pas de prix fixe — c'est le principe du « Pay What It's Worth ». MOW Connect retient 10% du montant." },
            { q: "Combien coûte l'accès pour les experts ?", a: "Les experts paient un abonnement mensuel de 29€/mois pour accéder à la plateforme. Cet abonnement donne accès à toutes les fonctionnalités : profil vérifié, agenda, visioconférence, analytics." },
            { q: "Comment sont vérifiés les experts ?", a: "Chaque candidature est examinée par notre équipe. Nous vérifions l'identité, le parcours professionnel (via LinkedIn notamment) et les compétences déclarées." },
            { q: "Quelle est la durée d'une session ?", a: "Les sessions durent 45 minutes. Ce format a été choisi pour permettre un échange substantiel tout en restant compatible avec les agendas chargés des experts de la diaspora." },
            { q: "Puis-je annuler une session ?", a: "Oui, les annulations sont possibles jusqu'à 24h avant la session sans pénalité. Au-delà, la session est considérée comme réalisée." },
          ].map((f, i) => (
            <div key={i} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: i < 4 ? "1px solid rgba(100,116,139,0.15)" : "none" }}>
              <div style={{ color: "#e2e8f0", fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{f.q}</div>
              <div style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.7 }}>{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── About Page ───
function AboutPage() {
  return (
    <div style={{ background: "#0a192f", minHeight: "100vh", paddingTop: 100, paddingBottom: 80 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        <SectionTitle tag="À PROPOS" title="Notre mission" subtitle="Mobiliser l'expertise de la diaspora marocaine au service du développement économique du Maroc" />

        <div style={{
          background: "rgba(13,31,60,0.6)", border: "1px solid rgba(45,212,191,0.1)",
          borderRadius: 22, padding: 48, marginBottom: 48,
        }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#e2e8f0", fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Le constat</h3>
          <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
            Plus de 5 millions de Marocains vivent à l'étranger dans 48 pays. Parmi eux, des milliers de cadres, entrepreneurs et experts de haut niveau ont accumulé une expertise considérable dans les plus grandes entreprises et institutions du monde.
          </p>
          <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
            Parallèlement, les entrepreneurs et managers au Maroc font face à des défis complexes — scaling, internationalisation, transformation digitale, levée de fonds — pour lesquels l'accès à une expertise pointue et contextualisée peut faire toute la différence.
          </p>
          <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.8 }}>
            MOW Connect comble ce fossé en créant un pont direct entre ces deux mondes.
          </p>
        </div>

        <div style={{
          background: "rgba(13,31,60,0.6)", border: "1px solid rgba(45,212,191,0.1)",
          borderRadius: 22, padding: 48, marginBottom: 48,
        }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#e2e8f0", fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Notre approche unique</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            {[
              { icon: "🤝", title: "Réciprocité", desc: "Le modèle 'Pay What It's Worth' s'ancre dans les valeurs de solidarité et d'entraide de la culture marocaine." },
              { icon: "✅", title: "Qualité vérifiée", desc: "Chaque expert est vérifié par notre équipe. Les évaluations mutuelles garantissent la qualité des échanges." },
              { icon: "🎯", title: "Expertise ciblée", desc: "Des sessions de 45 min focalisées sur vos problématiques concrètes, pas de conseils génériques." },
              { icon: "🌍", title: "Réseau mondial", desc: "Des experts dans 48 pays, couvrant tous les fuseaux horaires et secteurs d'activité." },
            ].map(c => (
              <div key={c.title} style={{ background: "rgba(45,212,191,0.04)", borderRadius: 14, padding: 24 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{c.icon}</div>
                <div style={{ color: "#e2e8f0", fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{c.title}</div>
                <div style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: "rgba(13,31,60,0.6)", border: "1px solid rgba(45,212,191,0.1)",
          borderRadius: 22, padding: 48, marginBottom: 48,
        }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#e2e8f0", fontSize: 24, fontWeight: 700, marginBottom: 20 }}>L'équipe</h3>
          <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
            MOW Connect est une initiative portée par l'Africa Business School (UM6P) et conçue par le Professeur Hamid Bouchikhi, expert en management et entrepreneuriat.
          </p>
          <div style={{ display: "flex", gap: 24, alignItems: "center", background: "rgba(45,212,191,0.04)", borderRadius: 16, padding: 28 }}>
            <div style={{ width: 80, height: 80, borderRadius: 20, background: "linear-gradient(135deg, #2dd4bf, #0d9488)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0a192f", fontWeight: 800, fontSize: 24, flexShrink: 0 }}>HB</div>
            <div>
              <div style={{ color: "#e2e8f0", fontSize: 18, fontWeight: 700 }}>Prof. Hamid Bouchikhi</div>
              <div style={{ color: "#2dd4bf", fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Fondateur & Directeur Académique</div>
              <div style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7 }}>Professeur de Management & Entrepreneuriat à l'Africa Business School (UM6P). Auteur de publications académiques et d'ouvrages sur l'identité organisationnelle et l'entrepreneuriat.</div>
            </div>
          </div>
        </div>

        <div style={{
          background: "rgba(13,31,60,0.6)", border: "1px solid rgba(45,212,191,0.1)",
          borderRadius: 22, padding: 48,
        }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#e2e8f0", fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Partenaires stratégiques</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              { name: "UM6P / Africa Business School", desc: "Ancrage académique et réseau" },
              { name: "MeM by CGEM (13ème Région)", desc: "Réseau d'affaires diaspora" },
              { name: "Ministère MRE", desc: "Soutien institutionnel" },
              { name: "Centres Régionaux d'Investissement", desc: "Relais territorial" },
              { name: "GIZ / Enabel", desc: "Coopération internationale" },
              { name: "Réseau consulaire", desc: "Mobilisation diaspora" },
            ].map(p => (
              <div key={p.name} style={{ background: "rgba(45,212,191,0.04)", borderRadius: 12, padding: 20, textAlign: "center" }}>
                <div style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{p.name}</div>
                <div style={{ color: "#64748b", fontSize: 12 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ───
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => { window.scrollTo(0, 0); }, [currentPage]);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#0a192f", minHeight: "100vh", color: "#e2e8f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: rgba(45,212,191,0.3); color: #e2e8f0; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0a192f; }
        ::-webkit-scrollbar-thumb { background: rgba(45,212,191,0.3); border-radius: 4px; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        select option { background: #0f2340; color: #e2e8f0; }
        input::placeholder, textarea::placeholder { color: #475569; }
      `}</style>
      <Nav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === "home" && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === "experts" && <ExpertsPage />}
      {currentPage === "register" && <RegisterPage />}
      {currentPage === "how" && <HowPage />}
      {currentPage === "about" && <AboutPage />}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
