import { useState, useEffect, createContext, useContext } from "react";

// ─── Translations ───────────────────────────────────────────────────────────
const translations = {
  fr: {
    nav: {
      home: "Accueil",
      about: "L'Observatoire",
      panorama: "Panorama ESS",
      publications: "Publications",
      news: "Actualités",
      contact: "Contact",
    },
    hero: {
      badge: "Province de Rhamna · Maroc",
      title1: "Observatoire Territorial",
      title2: "de l'Économie Sociale",
      titleHighlight: "et Solidaire",
      subtitle:
        "Un outil d'observation, d'analyse et de valorisation du tissu ESS de la province de Rhamna pour un développement local inclusif et durable.",
      ctaPrimary: "Découvrir l'ESS →",
      ctaSecondary: "Consulter les données",
    },
    stats: {
      cooperatives: "Coopératives",
      associations: "Associations",
      beneficiaries: "Bénéficiaires",
      communes: "Communes couvertes",
    },
    mission: {
      tag: "NOTRE MISSION",
      title: "Un observatoire au service du territoire",
      desc: "L'Observatoire Territorial de l'ESS de la Province de Rhamna est un espace de connaissance, de veille et d'animation territoriale dédié à l'économie sociale et solidaire. Il vise à produire des données fiables pour orienter les politiques publiques locales et renforcer les acteurs de l'ESS.",
      objectives: [
        { icon: "📊", title: "Observer & Mesurer", desc: "Collecter et analyser des données sur les acteurs et activités ESS du territoire pour un suivi rigoureux." },
        { icon: "🗺️", title: "Cartographier", desc: "Visualiser et localiser l'écosystème ESS de la province de Rhamna par commune et secteur." },
        { icon: "📢", title: "Valoriser", desc: "Mettre en lumière les initiatives, les bonnes pratiques et les success stories de l'ESS locale." },
        { icon: "🤝", title: "Concerter", desc: "Faciliter le dialogue entre acteurs publics, privés et associatifs pour une gouvernance partagée." },
      ],
    },
    sectors: {
      tag: "COMPOSANTES ESS",
      title: "Les piliers de l'ESS à Rhamna",
      subtitle: "Quatre grandes familles constituent le tissu de l'économie sociale et solidaire de la province",
      items: [
        { icon: "🌿", name: "Coopératives", count: 127, desc: "Agricoles, artisanales, de femmes et de pêche" },
        { icon: "🏛️", name: "Associations", count: 342, desc: "Développement, culture, sport, solidarité" },
        { icon: "🤲", name: "Mutuelles", count: 8, desc: "Santé, prévoyance et protection sociale" },
        { icon: "🔗", name: "GIE", count: 15, desc: "Groupements d'intérêt économique" },
      ],
    },
    indicators: {
      tag: "TABLEAU DE BORD",
      title: "Indicateurs clés du territoire",
      subtitle: "Données actualisées sur l'écosystème ESS de la province de Rhamna",
      items: [
        { label: "Taux de couverture territorial", value: 78, unit: "%", type: "bar" },
        { label: "Part des femmes dans l'ESS", value: 62, unit: "%", type: "bar" },
        { label: "Emplois créés par l'ESS", value: 4200, unit: "+", type: "number" },
        { label: "Volume d'activité annuel", value: 85, unit: "M MAD", type: "number" },
      ],
    },
    publications: {
      tag: "RESSOURCES",
      title: "Publications & Rapports",
      items: [
        {
          type: "Rapport Annuel",
          date: "Décembre 2024",
          title: "État de l'ESS dans la Province de Rhamna 2024",
          desc: "Panorama complet des acteurs, activités et indicateurs clés de l'économie sociale et solidaire.",
          color: "#D8F3DC",
          textColor: "#2D6A4F",
        },
        {
          type: "Étude",
          date: "Octobre 2024",
          title: "Les coopératives féminines : moteurs du développement local",
          desc: "Analyse approfondie du rôle des coopératives de femmes dans l'économie rurale de Rhamna.",
          color: "#FFF3CD",
          textColor: "#856404",
        },
        {
          type: "Note de veille",
          date: "Septembre 2024",
          title: "Impact du programme Intelaka sur les TPE de l'ESS",
          desc: "Évaluation de l'accès au financement pour les petites structures de l'économie solidaire.",
          color: "#E8F4FD",
          textColor: "#0056b3",
        },
        {
          type: "Cartographie",
          date: "Juillet 2024",
          title: "Atlas ESS de la Province de Rhamna",
          desc: "Cartographie géoréférencée de l'ensemble des acteurs ESS par commune et secteur d'activité.",
          color: "#FCE4EC",
          textColor: "#880E4F",
        },
      ],
      download: "Télécharger",
      viewAll: "Voir toutes les publications →",
    },
    news: {
      tag: "ACTUALITÉS",
      title: "Dernières nouvelles de l'ESS",
      items: [
        {
          date: "15 Avril 2025",
          category: "Événement",
          catColor: "#FFF3CD",
          catText: "#856404",
          title: "Forum Provincial de l'ESS : Rhamna 2025",
          desc: "La province de Rhamna accueille son premier forum territorial dédié à l'économie sociale et solidaire, réunissant 200 acteurs.",
        },
        {
          date: "02 Mars 2025",
          category: "Formation",
          catColor: "#E8F4FD",
          catText: "#0056b3",
          title: "Programme de renforcement des capacités pour les coopératives",
          desc: "Lancement d'un nouveau cycle de formation pour 50 dirigeants de coopératives de la province.",
        },
        {
          date: "18 Janvier 2025",
          category: "Partenariat",
          catColor: "#D8F3DC",
          catText: "#2D6A4F",
          title: "Convention avec l'ODCO pour l'accompagnement des coopératives",
          desc: "Signature d'une convention-cadre pour le développement et la structuration du mouvement coopératif à Rhamna.",
        },
      ],
      readMore: "Lire la suite →",
      viewAll: "Toutes les actualités →",
    },
    partners: {
      tag: "PARTENAIRES",
      title: "Nos partenaires institutionnels",
      subtitle: "Une gouvernance multi-acteurs pour un observatoire au service de tous",
    },
    contact: {
      tag: "CONTACT",
      title: "Nous contacter",
      subtitle: "Une question, une suggestion ou une demande de données ? Notre équipe est à votre disposition.",
      address: "Siège de la Province de Rhamna, Ben Guerir, Maroc",
      email: "observatoire-ess@rhamna.ma",
      phone: "+212 524-XXX-XXX",
      hours: "Lun–Ven · 8h30–16h30",
      form: {
        name: "Nom complet",
        email: "Adresse email",
        org: "Organisation (optionnel)",
        subject: "Sujet",
        message: "Votre message",
        send: "Envoyer le message",
        sent: "✓ Message envoyé avec succès !",
      },
    },
    footer: {
      desc: "L'Observatoire Territorial de l'ESS de la Province de Rhamna est un outil de gouvernance et de connaissance au service du développement local inclusif et durable.",
      linksTitle: "Liens utiles",
      legalTitle: "Légal",
      legal: "Mentions légales",
      privacy: "Politique de confidentialité",
      accessibility: "Accessibilité",
      rights: "© 2025 Observatoire ESS — Province de Rhamna. Tous droits réservés.",
    },
  },

  ar: {
    nav: {
      home: "الرئيسية",
      about: "المرصد",
      panorama: "بانوراما",
      publications: "المنشورات",
      news: "الأخبار",
      contact: "اتصل بنا",
    },
    hero: {
      badge: "إقليم الرحامنة · المغرب",
      title1: "المرصد الترابي",
      title2: "للاقتصاد الاجتماعي",
      titleHighlight: "والتضامني",
      subtitle:
        "أداة للرصد والتحليل وتثمين نسيج الاقتصاد الاجتماعي والتضامني بإقليم الرحامنة من أجل تنمية محلية شاملة ومستدامة.",
      ctaPrimary: "اكتشف الاقتصاد الاجتماعي ←",
      ctaSecondary: "استشارة البيانات",
    },
    stats: {
      cooperatives: "تعاونية",
      associations: "جمعية",
      beneficiaries: "مستفيد",
      communes: "جماعة مشمولة",
    },
    mission: {
      tag: "مهمتنا",
      title: "مرصد في خدمة الإقليم",
      desc: "المرصد الترابي للاقتصاد الاجتماعي والتضامني لإقليم الرحامنة هو فضاء للمعرفة والرصد والتحريك الترابي مخصص للاقتصاد الاجتماعي والتضامني. يهدف إلى إنتاج بيانات موثوقة لتوجيه السياسات العمومية المحلية وتعزيز قدرات فاعلي الاقتصاد الاجتماعي.",
      objectives: [
        { icon: "📊", title: "الرصد والقياس", desc: "جمع وتحليل بيانات حول فاعلي وأنشطة الاقتصاد الاجتماعي والتضامني بالإقليم لمتابعة دقيقة." },
        { icon: "🗺️", title: "رسم الخرائط", desc: "تصور وتحديد موقع النظام البيئي للاقتصاد الاجتماعي بإقليم الرحامنة حسب الجماعة والقطاع." },
        { icon: "📢", title: "التثمين", desc: "إبراز المبادرات والممارسات الجيدة وقصص النجاح في الاقتصاد الاجتماعي المحلي." },
        { icon: "🤝", title: "التشاور", desc: "تسهيل الحوار بين الفاعلين العموميين والخواص والجمعويين من أجل حكامة مشتركة." },
      ],
    },
    sectors: {
      tag: "مكونات الاقتصاد الاجتماعي",
      title: "ركائز الاقتصاد الاجتماعي بالرحامنة",
      subtitle: "أربع عائلات كبرى تشكّل نسيج الاقتصاد الاجتماعي والتضامني بالإقليم",
      items: [
        { icon: "🌿", name: "التعاونيات", count: 127, desc: "فلاحية، حرفية، نسائية وللصيد" },
        { icon: "🏛️", name: "الجمعيات", count: 342, desc: "التنمية، الثقافة، الرياضة، التضامن" },
        { icon: "🤲", name: "التعاضديات", count: 8, desc: "الصحة والتوقع والحماية الاجتماعية" },
        { icon: "🔗", name: "مجموعات المصالح الاقتصادية", count: 15, desc: "مجموعات المصالح الاقتصادية" },
      ],
    },
    indicators: {
      tag: "لوحة القيادة",
      title: "المؤشرات الرئيسية للإقليم",
      subtitle: "بيانات محدثة حول النظام البيئي للاقتصاد الاجتماعي والتضامني بإقليم الرحامنة",
      items: [
        { label: "نسبة التغطية الترابية", value: 78, unit: "%", type: "bar" },
        { label: "حصة المرأة في الاقتصاد الاجتماعي", value: 62, unit: "%", type: "bar" },
        { label: "الوظائف المستحدثة من الاقتصاد الاجتماعي", value: 4200, unit: "+", type: "number" },
        { label: "حجم النشاط السنوي", value: 85, unit: "م درهم", type: "number" },
      ],
    },
    publications: {
      tag: "الموارد",
      title: "المنشورات والتقارير",
      items: [
        {
          type: "تقرير سنوي",
          date: "دجنبر 2024",
          title: "واقع الاقتصاد الاجتماعي والتضامني بإقليم الرحامنة 2024",
          desc: "بانوراما شاملة للفاعلين والأنشطة والمؤشرات الرئيسية للاقتصاد الاجتماعي والتضامني.",
          color: "#D8F3DC",
          textColor: "#2D6A4F",
        },
        {
          type: "دراسة",
          date: "أكتوبر 2024",
          title: "التعاونيات النسائية: محركات التنمية المحلية",
          desc: "تحليل معمق لدور تعاونيات النساء في الاقتصاد القروي بالرحامنة.",
          color: "#FFF3CD",
          textColor: "#856404",
        },
        {
          type: "مذكرة يقظة",
          date: "شتنبر 2024",
          title: "أثر برنامج انطلاقة على المقاولات الصغيرة للاقتصاد الاجتماعي",
          desc: "تقييم الوصول إلى التمويل للهياكل الصغيرة للاقتصاد التضامني بالإقليم.",
          color: "#E8F4FD",
          textColor: "#0056b3",
        },
        {
          type: "رسم خرائط",
          date: "يوليوز 2024",
          title: "أطلس الاقتصاد الاجتماعي لإقليم الرحامنة",
          desc: "خرائط جغرافية مرجعية لجميع فاعلي الاقتصاد الاجتماعي حسب الجماعة وقطاع النشاط.",
          color: "#FCE4EC",
          textColor: "#880E4F",
        },
      ],
      download: "تحميل",
      viewAll: "عرض جميع المنشورات ←",
    },
    news: {
      tag: "أخبار",
      title: "آخر أخبار الاقتصاد الاجتماعي",
      items: [
        {
          date: "15 أبريل 2025",
          category: "فعالية",
          catColor: "#FFF3CD",
          catText: "#856404",
          title: "المنتدى الإقليمي للاقتصاد الاجتماعي: الرحامنة 2025",
          desc: "يستضيف إقليم الرحامنة منتداه الترابي الأول المخصص للاقتصاد الاجتماعي والتضامني، بمشاركة 200 فاعل.",
        },
        {
          date: "02 مارس 2025",
          category: "تكوين",
          catColor: "#E8F4FD",
          catText: "#0056b3",
          title: "برنامج تعزيز القدرات للتعاونيات",
          desc: "إطلاق دورة تكوينية جديدة لفائدة 50 مسيراً للتعاونيات بالإقليم.",
        },
        {
          date: "18 يناير 2025",
          category: "شراكة",
          catColor: "#D8F3DC",
          catText: "#2D6A4F",
          title: "اتفاقية مع مكتب تنمية التعاون لمواكبة التعاونيات",
          desc: "توقيع اتفاقية إطارية لتطوير وهيكلة الحركة التعاونية بإقليم الرحامنة.",
        },
      ],
      readMore: "اقرأ المزيد ←",
      viewAll: "جميع الأخبار ←",
    },
    partners: {
      tag: "الشركاء",
      title: "شركاؤنا المؤسسيون",
      subtitle: "حكامة متعددة الفاعلين من أجل مرصد في خدمة الجميع",
    },
    contact: {
      tag: "اتصل بنا",
      title: "تواصل معنا",
      subtitle: "سؤال أو اقتراح أو طلب بيانات؟ فريقنا رهن إشارتكم.",
      address: "مقر عمالة الرحامنة، بن جرير، المغرب",
      email: "observatoire-ess@rhamna.ma",
      phone: "+212 524-XXX-XXX",
      hours: "الاثنين–الجمعة · 8:30–16:30",
      form: {
        name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        org: "المنظمة (اختياري)",
        subject: "الموضوع",
        message: "رسالتك",
        send: "إرسال الرسالة",
        sent: "✓ تم إرسال رسالتك بنجاح!",
      },
    },
    footer: {
      desc: "المرصد الترابي للاقتصاد الاجتماعي والتضامني لإقليم الرحامنة أداة للحكامة والمعرفة في خدمة التنمية المحلية الشاملة والمستدامة.",
      linksTitle: "روابط مفيدة",
      legalTitle: "قانوني",
      legal: "الإشارات القانونية",
      privacy: "سياسة الخصوصية",
      accessibility: "إمكانية الوصول",
      rights: "© 2025 مرصد الاقتصاد الاجتماعي — إقليم الرحامنة. جميع الحقوق محفوظة.",
    },
  },
};

// ─── Context ─────────────────────────────────────────────────────────────────
const LangCtx = createContext({ lang: "fr", t: translations.fr, setLang: () => {} });
const useLang = () => useContext(LangCtx);

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const { lang, t, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isRtl = lang === "ar";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { key: "home", href: "#accueil" },
    { key: "about", href: "#observatoire" },
    { key: "panorama", href: "#panorama" },
    { key: "publications", href: "#publications" },
    { key: "news", href: "#actualites" },
    { key: "contact", href: "#contact" },
  ];

  const navBg = scrolled ? "rgba(255,255,255,0.97)" : "transparent";
  const textColor = scrolled ? "#374151" : "rgba(255,255,255,0.92)";

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: navBg,
        backdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,0.08)" : "none",
        transition: "all 0.35s ease",
        direction: isRtl ? "rtl" : "ltr",
      }}
    >
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        {/* Logo */}
        <a href="#accueil" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: "linear-gradient(135deg, #1B4332, #52B788)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
            boxShadow: "0 2px 8px rgba(45,106,79,0.4)",
          }}>🌿</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 13.5, color: scrolled ? "#1B4332" : "#fff", lineHeight: 1.2 }}>
              {lang === "ar" ? "مرصد الاقتصاد الاجتماعي" : "Observatoire ESS"}
            </div>
            <div style={{ fontSize: 11, color: scrolled ? "#52B788" : "rgba(255,255,255,0.75)", fontWeight: 500 }}>
              {lang === "ar" ? "إقليم الرحامنة" : "Province de Rhamna"}
            </div>
          </div>
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 2 }} className="nav-links">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              style={{
                padding: "6px 12px", borderRadius: 8,
                color: textColor, textDecoration: "none",
                fontSize: 13.5, fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#52B788")}
              onMouseLeave={(e) => (e.target.style.color = textColor)}
            >
              {t.nav[l.key]}
            </a>
          ))}

          {/* Lang toggle */}
          <div style={{
            display: "flex", gap: 2, marginLeft: 12,
            background: scrolled ? "#f3f4f6" : "rgba(255,255,255,0.15)",
            borderRadius: 8, padding: 3,
          }}>
            {["fr", "ar"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  padding: "4px 12px", borderRadius: 6, border: "none", cursor: "pointer",
                  fontSize: 12, fontWeight: 700,
                  background: lang === l ? "#2D6A4F" : "transparent",
                  color: lang === l ? "#fff" : textColor,
                  transition: "all 0.2s",
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className="burger"
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: scrolled ? "#333" : "#fff", fontSize: 22, padding: 6,
            display: "none",
          }}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: "white", borderTop: "1px solid #e5e7eb",
          padding: "1rem 1.5rem 1.5rem",
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                padding: "10px 0", color: "#374151", textDecoration: "none",
                fontSize: 15, fontWeight: 500, borderBottom: "1px solid #f3f4f6",
              }}
            >
              {t.nav[l.key]}
            </a>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {["fr", "ar"].map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l); setOpen(false); }}
                style={{
                  padding: "6px 20px", borderRadius: 8, border: "none", cursor: "pointer",
                  background: lang === l ? "#2D6A4F" : "#f3f4f6",
                  color: lang === l ? "#fff" : "#555", fontWeight: 700, fontSize: 13,
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { t, lang } = useLang();
  const isRtl = lang === "ar";

  return (
    <section
      id="accueil"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(150deg, #0D2818 0%, #1B4332 30%, #2D6A4F 60%, #40916C 85%, #52B788 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        padding: "8rem 1.5rem 5rem",
        direction: isRtl ? "rtl" : "ltr",
      }}
    >
      {/* Background decorations */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          radial-gradient(ellipse at 15% 60%, rgba(82,183,136,0.18) 0%, transparent 55%),
          radial-gradient(ellipse at 85% 25%, rgba(116,198,157,0.1) 0%, transparent 45%)
        `,
      }} />
      <div style={{
        position: "absolute", inset: 0, opacity: 0.035, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M40 0L50 15H30L40 0zM40 80L30 65H50L40 80zM0 40L15 30V50L0 40zM80 40L65 50V30L80 40z'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)",
          borderRadius: 50, padding: "8px 22px", marginBottom: 36,
          border: "1px solid rgba(255,255,255,0.2)",
        }}>
          <span style={{ fontSize: 18 }}>🇲🇦</span>
          <span style={{ color: "rgba(255,255,255,0.95)", fontSize: 13.5, fontWeight: 600, letterSpacing: 0.5 }}>
            {t.hero.badge}
          </span>
        </div>

        {/* Heading */}
        <h1 style={{ color: "white", fontWeight: 800, lineHeight: 1.18, marginBottom: 28 }}>
          <div style={{ fontSize: "clamp(1.9rem, 5vw, 3.4rem)" }}>{t.hero.title1}</div>
          <div style={{ fontSize: "clamp(1.9rem, 5vw, 3.4rem)" }}>{t.hero.title2}</div>
          <div style={{
            fontSize: "clamp(2.1rem, 5.5vw, 3.8rem)",
            background: "linear-gradient(90deg, #B7E4C7 0%, #74C69D 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            {t.hero.titleHighlight}
          </div>
        </h1>

        <p style={{
          color: "rgba(255,255,255,0.8)", fontSize: "clamp(1rem, 2vw, 1.2rem)",
          maxWidth: 700, margin: "0 auto 44px", lineHeight: 1.85,
        }}>
          {t.hero.subtitle}
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="#panorama"
            style={{
              background: "white", color: "#1B4332",
              padding: "14px 34px", borderRadius: 12,
              textDecoration: "none", fontWeight: 700, fontSize: 15,
              boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.25)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.2)"; }}
          >
            {t.hero.ctaPrimary}
          </a>
          <a
            href="#observatoire"
            style={{
              background: "rgba(255,255,255,0.12)", color: "white",
              padding: "14px 34px", borderRadius: 12,
              textDecoration: "none", fontWeight: 600, fontSize: 15,
              border: "2px solid rgba(255,255,255,0.35)",
              backdropFilter: "blur(10px)",
            }}
          >
            {t.hero.ctaSecondary}
          </a>
        </div>

        <div style={{ marginTop: 70, color: "rgba(255,255,255,0.35)", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>
          ↓ défiler
        </div>
      </div>
    </section>
  );
}

// ─── Stats Banner ─────────────────────────────────────────────────────────────
function StatsBanner() {
  const { t } = useLang();
  const items = [
    { label: t.stats.cooperatives, value: "127", icon: "🌿" },
    { label: t.stats.associations, value: "342", icon: "🏛️" },
    { label: t.stats.beneficiaries, value: "4 200+", icon: "👥" },
    { label: t.stats.communes, value: "20 / 20", icon: "📍" },
  ];

  return (
    <div style={{ background: "#1B4332" }}>
      <div style={{
        maxWidth: 1240, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
      }} className="stats-grid">
        {items.map((s, i) => (
          <div
            key={i}
            style={{
              padding: "2.2rem 1.5rem", textAlign: "center",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
            }}
          >
            <div style={{ fontSize: 26, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ color: "#74C69D", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", lineHeight: 1.1 }}>
              {s.value}
            </div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 500, marginTop: 4 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Mission ──────────────────────────────────────────────────────────────────
function Mission() {
  const { t, lang } = useLang();
  const isRtl = lang === "ar";

  return (
    <section id="observatoire" style={{ padding: "7rem 1.5rem", background: "#fff", direction: isRtl ? "rtl" : "ltr" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <Tag>{t.mission.tag}</Tag>
          <h2 style={sectionTitle}>{t.mission.title}</h2>
          <p style={{ ...sectionSubtitle, maxWidth: 740, margin: "1rem auto 0" }}>{t.mission.desc}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {t.mission.objectives.map((obj, i) => (
            <Card key={i}>
              <div style={{ fontSize: 34, marginBottom: 14 }}>{obj.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: 17, color: "#1B4332", marginBottom: 10 }}>{obj.title}</h3>
              <p style={{ color: "#555", lineHeight: 1.75, fontSize: 14 }}>{obj.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Sectors ──────────────────────────────────────────────────────────────────
function Sectors() {
  const { t, lang } = useLang();
  const isRtl = lang === "ar";

  return (
    <section id="panorama" style={{ padding: "7rem 1.5rem", background: "#F0FBF4", direction: isRtl ? "rtl" : "ltr" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <Tag>{t.sectors.tag}</Tag>
          <h2 style={sectionTitle}>{t.sectors.title}</h2>
          <p style={sectionSubtitle}>{t.sectors.subtitle}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
          {t.sectors.items.map((s, i) => (
            <div
              key={i}
              style={{
                background: "white", borderRadius: 18, padding: "2.2rem 1.8rem",
                textAlign: "center", border: "1px solid #e5e7eb",
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#52B788";
                e.currentTarget.style.boxShadow = "0 10px 40px rgba(45,106,79,0.12)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.04)";
                e.currentTarget.style.transform = "none";
              }}
            >
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "linear-gradient(135deg, #D8F3DC, #B7E4C7)",
                margin: "0 auto 18px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 30,
              }}>
                {s.icon}
              </div>
              <div style={{ fontWeight: 800, fontSize: "2rem", color: "#2D6A4F", lineHeight: 1 }}>{s.count}</div>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#111827", margin: "6px 0 8px" }}>{s.name}</div>
              <div style={{ color: "#9ca3af", fontSize: 13 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Indicators ───────────────────────────────────────────────────────────────
function Indicators() {
  const { t, lang } = useLang();
  const isRtl = lang === "ar";

  return (
    <section style={{ padding: "7rem 1.5rem", background: "#1B4332", direction: isRtl ? "rtl" : "ltr" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <span style={{
            background: "rgba(116,198,157,0.15)", color: "#74C69D",
            padding: "6px 18px", borderRadius: 50, fontSize: 11.5, fontWeight: 700,
            letterSpacing: 1, border: "1px solid rgba(116,198,157,0.25)",
            display: "inline-block",
          }}>
            {t.indicators.tag}
          </span>
          <h2 style={{ ...sectionTitle, color: "white", marginTop: 14 }}>{t.indicators.title}</h2>
          <p style={{ color: "rgba(255,255,255,0.55)", marginTop: 8, fontSize: 15 }}>{t.indicators.subtitle}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {t.indicators.items.map((ind, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.06)", borderRadius: 18, padding: "2rem",
                border: "1px solid rgba(255,255,255,0.09)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, marginBottom: 16 }}>{ind.label}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: ind.type === "bar" ? 14 : 0 }}>
                <span style={{ color: "#74C69D", fontWeight: 800, fontSize: "2.4rem", lineHeight: 1 }}>
                  {ind.type === "number" ? ind.value.toLocaleString("fr-FR") : ind.value}
                </span>
                <span style={{ color: "#52B788", fontSize: 16, fontWeight: 600 }}>{ind.unit}</span>
              </div>
              {ind.type === "bar" && (
                <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 50, height: 7, overflow: "hidden" }}>
                  <div style={{
                    width: `${ind.value}%`, height: "100%",
                    background: "linear-gradient(90deg, #40916C, #74C69D)",
                    borderRadius: 50,
                  }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Publications ─────────────────────────────────────────────────────────────
function Publications() {
  const { t, lang } = useLang();
  const isRtl = lang === "ar";

  return (
    <section id="publications" style={{ padding: "7rem 1.5rem", background: "#fff", direction: isRtl ? "rtl" : "ltr" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <Tag>{t.publications.tag}</Tag>
          <h2 style={sectionTitle}>{t.publications.title}</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
          {t.publications.items.map((pub, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #e5e7eb", borderRadius: 18, overflow: "hidden",
                background: "white", transition: "all 0.3s",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 10px 40px rgba(45,106,79,0.1)"; e.currentTarget.style.borderColor = "#52B788"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.transform = "none"; }}
            >
              {/* Color bar */}
              <div style={{ height: 4, background: pub.textColor }} />
              <div style={{ padding: "1.4rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fafafa", borderBottom: "1px solid #f0f0f0" }}>
                <span style={{ background: pub.color, color: pub.textColor, padding: "4px 12px", borderRadius: 50, fontSize: 11, fontWeight: 700 }}>
                  {pub.type}
                </span>
                <span style={{ color: "#9ca3af", fontSize: 12 }}>{pub.date}</span>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ fontWeight: 700, fontSize: 15, color: "#111827", marginBottom: 10, lineHeight: 1.55 }}>{pub.title}</h3>
                <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.75, marginBottom: 18 }}>{pub.desc}</p>
                <button
                  style={{
                    background: "transparent", border: `1.5px solid ${pub.textColor}`,
                    color: pub.textColor, padding: "8px 20px", borderRadius: 8,
                    cursor: "pointer", fontSize: 13, fontWeight: 600,
                    transition: "all 0.2s", display: "flex", alignItems: "center", gap: 6,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = pub.textColor; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = pub.textColor; }}
                >
                  ↓ {t.publications.download}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <a href="#" style={{ color: "#2D6A4F", fontWeight: 700, textDecoration: "none", fontSize: 15 }}>
            {t.publications.viewAll}
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── News ─────────────────────────────────────────────────────────────────────
function News() {
  const { t, lang } = useLang();
  const isRtl = lang === "ar";

  return (
    <section id="actualites" style={{ padding: "7rem 1.5rem", background: "#F0FBF4", direction: isRtl ? "rtl" : "ltr" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <Tag>{t.news.tag}</Tag>
          <h2 style={sectionTitle}>{t.news.title}</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
          {t.news.items.map((item, i) => (
            <article
              key={i}
              style={{
                background: "white", borderRadius: 18, overflow: "hidden",
                border: "1px solid #e5e7eb",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 10px 40px rgba(45,106,79,0.1)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "none"; }}
            >
              <div style={{ height: 5, background: "linear-gradient(90deg, #2D6A4F, #74C69D)" }} />
              <div style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span style={{ background: item.catColor, color: item.catText, padding: "3px 12px", borderRadius: 50, fontSize: 11, fontWeight: 700 }}>
                    {item.category}
                  </span>
                  <span style={{ color: "#9ca3af", fontSize: 12 }}>{item.date}</span>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 10, lineHeight: 1.5 }}>{item.title}</h3>
                <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.75, marginBottom: 18 }}>{item.desc}</p>
                <a href="#" style={{ color: "#2D6A4F", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                  {t.news.readMore}
                </a>
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <a href="#" style={{ color: "#2D6A4F", fontWeight: 700, textDecoration: "none", fontSize: 15 }}>
            {t.news.viewAll}
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Partners ─────────────────────────────────────────────────────────────────
function Partners() {
  const { t, lang } = useLang();
  const isRtl = lang === "ar";

  const partners = [
    { abbr: "PR", name: lang === "ar" ? "عمالة الرحامنة" : "Province de Rhamna", color: "#1B4332" },
    { abbr: "CRMS", name: lang === "ar" ? "الجهة مراكش آسفي" : "Région Marrakech-Safi", color: "#2D6A4F" },
    { abbr: "ODCO", name: "ODCO", color: "#40916C" },
    { abbr: "MESS", name: lang === "ar" ? "وزارة الاقتصاد الاجتماعي" : "Ministère ESS", color: "#1B4332" },
    { abbr: "ADS", name: lang === "ar" ? "وكالة التنمية الاجتماعية" : "ADS Maroc", color: "#2D6A4F" },
    { abbr: "INDH", name: "INDH", color: "#40916C" },
  ];

  return (
    <section id="partenaires" style={{ padding: "6rem 1.5rem", background: "#fff", direction: isRtl ? "rtl" : "ltr" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <Tag>{t.partners.tag}</Tag>
          <h2 style={sectionTitle}>{t.partners.title}</h2>
          <p style={sectionSubtitle}>{t.partners.subtitle}</p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.2rem", justifyContent: "center" }}>
          {partners.map((p, i) => (
            <div
              key={i}
              style={{
                width: 148, padding: "1.4rem 1rem",
                border: "2px solid #e5e7eb", borderRadius: 16,
                textAlign: "center", cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 12,
                background: `${p.color}18`,
                margin: "0 auto 10px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: 13, color: p.color, letterSpacing: 0.5,
              }}>
                {p.abbr}
              </div>
              <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.4 }}>{p.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const { t, lang } = useLang();
  const isRtl = lang === "ar";
  const [form, setForm] = useState({ name: "", email: "", org: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", org: "", subject: "", message: "" });
  };

  const input = {
    width: "100%", padding: "12px 16px",
    border: "1.5px solid #e5e7eb", borderRadius: 10,
    fontSize: 14, outline: "none", boxSizing: "border-box",
    fontFamily: "inherit", transition: "border-color 0.2s",
    direction: isRtl ? "rtl" : "ltr", background: "white",
  };

  const infoItems = [
    { icon: "📍", text: t.contact.address },
    { icon: "📧", text: t.contact.email },
    { icon: "📞", text: t.contact.phone },
    { icon: "🕐", text: t.contact.hours },
  ];

  return (
    <section id="contact" style={{ padding: "7rem 1.5rem", background: "#F0FBF4", direction: isRtl ? "rtl" : "ltr" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <Tag>{t.contact.tag}</Tag>
          <h2 style={sectionTitle}>{t.contact.title}</h2>
          <p style={sectionSubtitle}>{t.contact.subtitle}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "3rem", alignItems: "start" }} className="contact-grid">
          {/* Info column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {infoItems.map((info, i) => (
              <div
                key={i}
                style={{
                  display: "flex", gap: 16, alignItems: "flex-start",
                  padding: "1.4rem 1.5rem", background: "white", borderRadius: 14,
                  border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{
                  width: 42, height: 42, borderRadius: 10,
                  background: "#D8F3DC", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, flexShrink: 0,
                }}>
                  {info.icon}
                </div>
                <div style={{ color: "#374151", fontSize: 14, lineHeight: 1.65, paddingTop: 3 }}>{info.text}</div>
              </div>
            ))}
          </div>

          {/* Form column */}
          <form
            onSubmit={handleSubmit}
            style={{
              background: "white", borderRadius: 18, padding: "2.5rem",
              border: "1px solid #e5e7eb", boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              display: "flex", flexDirection: "column", gap: "1rem",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
              <input style={input} placeholder={t.contact.form.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <input style={input} type="email" placeholder={t.contact.form.email} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <input style={input} placeholder={t.contact.form.org} value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} />
            <input style={input} placeholder={t.contact.form.subject} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
            <textarea
              style={{ ...input, minHeight: 130, resize: "vertical" }}
              placeholder={t.contact.form.message}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
            <button
              type="submit"
              style={{
                background: sent ? "#40916C" : "linear-gradient(135deg, #1B4332, #2D6A4F)",
                color: "white", border: "none", borderRadius: 10,
                padding: "14px 32px", fontSize: 15, fontWeight: 700,
                cursor: "pointer", transition: "all 0.25s",
                boxShadow: "0 4px 20px rgba(45,106,79,0.3)",
              }}
            >
              {sent ? t.contact.form.sent : t.contact.form.send}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const { t, lang } = useLang();
  const isRtl = lang === "ar";

  const usefulLinks = lang === "ar"
    ? ["عمالة الرحامنة", "الجهة مراكش آسفي", "مكتب تنمية التعاون", "وكالة التنمية الاجتماعية", "INDH"]
    : ["Province de Rhamna", "Région Marrakech-Safi", "ODCO", "ADS Maroc", "INDH"];

  return (
    <footer style={{ background: "#0A1F13", direction: isRtl ? "rtl" : "ltr" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "4rem 1.5rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%",
                background: "linear-gradient(135deg, #1B4332, #52B788)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17,
              }}>🌿</div>
              <div>
                <div style={{ color: "white", fontWeight: 800, fontSize: 13 }}>
                  {lang === "ar" ? "مرصد الاقتصاد الاجتماعي" : "Observatoire ESS"}
                </div>
                <div style={{ color: "#52B788", fontSize: 11 }}>
                  {lang === "ar" ? "إقليم الرحامنة" : "Province de Rhamna"}
                </div>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.42)", fontSize: 13, lineHeight: 1.85, maxWidth: 340 }}>
              {t.footer.desc}
            </p>
            {/* Social icons placeholder */}
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {["𝕏", "in", "📘"].map((ic, i) => (
                <div key={i} style={{
                  width: 34, height: 34, borderRadius: 8,
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "white"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                >
                  {ic}
                </div>
              ))}
            </div>
          </div>

          {/* Useful links */}
          <div>
            <div style={{ color: "white", fontWeight: 700, marginBottom: 18, fontSize: 14 }}>{t.footer.linksTitle}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {usefulLinks.map((l, i) => (
                <a key={i} href="#" style={{ color: "rgba(255,255,255,0.42)", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.target.style.color = "#74C69D")}
                  onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.42)")}>
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <div style={{ color: "white", fontWeight: 700, marginBottom: 18, fontSize: 14 }}>{t.footer.legalTitle}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[t.footer.legal, t.footer.privacy, t.footer.accessibility].map((l, i) => (
                <a key={i} href="#" style={{ color: "rgba(255,255,255,0.42)", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.target.style.color = "#74C69D")}
                  onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.42)")}>
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.8rem", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.28)", fontSize: 12 }}>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Shared primitives ────────────────────────────────────────────────────────
const sectionTitle = {
  fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800,
  color: "#111827", marginTop: 14, lineHeight: 1.25,
};
const sectionSubtitle = {
  color: "#6b7280", fontSize: 15.5, lineHeight: 1.75,
  margin: "0.75rem auto 0", maxWidth: 620,
};

function Tag({ children }) {
  return (
    <span style={{
      background: "#D8F3DC", color: "#2D6A4F",
      padding: "6px 18px", borderRadius: 50,
      fontSize: 11.5, fontWeight: 700, letterSpacing: 1,
      display: "inline-block",
    }}>
      {children}
    </span>
  );
}

function Card({ children }) {
  return (
    <div
      style={{
        background: "linear-gradient(145deg, #F8FFFA, #EEF9F2)",
        borderRadius: 18, padding: "2.2rem 2rem",
        border: "1px solid #D8F3DC",
        transition: "all 0.25s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(45,106,79,0.1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
    >
      {children}
    </div>
  );
}

// ─── App root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("fr");
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.title = lang === "ar"
      ? "مرصد الاقتصاد الاجتماعي — إقليم الرحامنة"
      : "Observatoire ESS — Province de Rhamna";
  }, [lang]);

  return (
    <LangCtx.Provider value={{ lang, t, setLang }}>
      <style>{`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        body { overflow-x: hidden; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', 'Segoe UI', system-ui, sans-serif; }

        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .burger { display: block !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stats-grid > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08); }
          .contact-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Navbar />
      <Hero />
      <StatsBanner />
      <Mission />
      <Sectors />
      <Indicators />
      <Publications />
      <News />
      <Partners />
      <Contact />
      <Footer />
    </LangCtx.Provider>
  );
}
