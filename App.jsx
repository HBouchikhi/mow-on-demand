import { useState, useEffect, createContext, useContext } from "react";

// ─── Translations ───
const translations = {
  fr: {
    nav: {
      home: "Accueil",
      experts: "Trouver un MDM",
      register: "Offrir des services",
      how: "Comment ça marche",
      about: "À propos",
      cta: "Offrir des services",
    },
    hero: {
      badge: "🌍 Moroccans of the World",
      title1: "L'expertise de la diaspora",
      title2: "au service du",
      titleHighlight: "Maroc",
      subtitle: "Connectez-vous avec des experts marocains du monde entier. Sessions de conseil de 45 minutes. Payez ce que ça vaut pour vous.",
      ctaPrimary: "Trouver un MDM →",
      ctaSecondary: "Offrir des services",
    },
    stats: {
      diaspora: "Marocains de la diaspora",
      countries: "Pays représentés",
      experts: "Experts inscrits",
      sessions: "Sessions réalisées",
    },
    howSection: {
      tag: "SIMPLE & EFFICACE",
      title: "Comment ça marche ?",
      subtitle: "Un processus en 3 étapes pour accéder à l'expertise de la diaspora",
      steps: [
        { step: "01", icon: "🔍", title: "Trouvez votre expert", desc: "Recherchez par domaine d'expertise, pays, langue ou disponibilité. Consultez les profils détaillés et les évaluations." },
        { step: "02", icon: "📅", title: "Réservez une session", desc: "Choisissez un créneau de 45 minutes qui vous convient. Décrivez votre besoin pour que l'expert se prépare." },
        { step: "03", icon: "💡", title: "Payez ce que ça vaut", desc: "Après la session, évaluez sa valeur et payez ce que vous estimez juste. Notre modèle repose sur la réciprocité." },
      ],
    },
    featured: {
      tag: "EXPERTS EN VEDETTE",
      title: "Rencontrez nos experts",
      subtitle: "Des professionnels marocains de haut niveau prêts à partager leur expertise",
      viewAll: "Voir tous les experts →",
    },
    pricing: {
      tag: "MODÈLE INNOVANT",
      title1: "Payez ce que",
      title2: "ça",
      titleHighlight: "vaut",
      title3: "pour vous",
      subtitle: "Notre modèle unique s'inspire des valeurs de réciprocité et de solidarité de la culture marocaine. Les demandeurs de conseil évaluent librement la valeur de chaque session.",
      features: [
        "L'expert paie un abonnement mensuel pour accéder à la plateforme",
        "Le demandeur paie ce qu'il estime juste après la session",
        "MOW Connect retient 10% pour assurer la pérennité du service",
        "Un système d'évaluation mutuelle garantit la qualité",
      ],
      planTag: "Abonnement Expert",
      planPrice: "29€",
      planPeriod: "/mois",
      planDesc: "Accès illimité à la plateforme",
      planFeatures: ["Profil expert vérifié", "Agenda intégré", "Visioconférence intégrée", "Tableau de bord analytics", "Badge MOW certifié"],
      planCta: "Offrir des services →",
    },
    cta: {
      title: "Prêt à connecter ?",
      subtitle: "Rejoignez la communauté MOW Connect et contribuez au développement du Maroc.",
      primary: "Je cherche un MDM",
      secondary: "Offrir des services",
    },
    footer: {
      desc: "La plateforme qui connecte l'expertise de la diaspora marocaine avec les entrepreneurs et managers au Maroc.",
      platform: "Plateforme",
      platformLinks: ["Trouver un MDM", "Offrir des services", "Tarification", "FAQ"],
      resources: "Ressources",
      resourceLinks: ["Blog", "Success Stories", "Guide du Mentor", "Partenaires"],
      contact: "Contact",
      email: "contact@mow-on-demand.com",
      location: "Casablanca, Maroc",
      copyright: "© 2026 MOW Connect. Tous droits réservés.",
      legal: ["Conditions d'utilisation", "Politique de confidentialité", "Mentions légales"],
    },
    experts: {
      tag: "ANNUAIRE",
      title: "Trouvez votre expert",
      subtitle: "Filtrez par domaine, pays, langue ou disponibilité pour trouver l'expert idéal",
      searchPlaceholder: "🔍  Rechercher par nom, spécialité, mot-clé...",
      domain: "📂 Domaine",
      country: "🌍 Pays",
      language: "🗣 Langue",
      availableOnly: "Disponibles uniquement",
      found: "expert(s) trouvé(s)",
      noResults: "Aucun expert ne correspond à vos critères.",
      broaden: "Essayez d'élargir vos filtres.",
      yearsExp: "ans exp.",
      sessions: "sessions",
      languages: "Langues",
      book: "📅 Réserver une session de 45 min",
      unavailable: "Indisponible actuellement",
      allDomains: "Tous",
      allCountries: "Tous",
      allLanguages: "Toutes",
    },
    register: {
      tag: "OFFRIR DES SERVICES",
      title: "Rejoignez la communauté",
      subtitle: "Partagez votre expertise avec les entrepreneurs et managers au Maroc",
      steps: ["Identité", "Expertise", "Motivation"],
      step: "Étape",
      personalInfo: "Informations personnelles",
      firstName: "Prénom",
      lastName: "Nom",
      email: "Email professionnel",
      countryLabel: "Pays de résidence",
      city: "Ville",
      linkedin: "Profil LinkedIn",
      expertise: "Votre expertise",
      domainLabel: "Domaine d'expertise",
      selectDomain: "Sélectionnez un domaine",
      speciality: "Spécialité(s)",
      experience: "Années d'expérience",
      spokenLanguages: "Langues parlées",
      bio: "Biographie professionnelle",
      bioPlaceholder: "Décrivez votre parcours et ce que vous pouvez apporter aux entrepreneurs et managers marocains...",
      motivation: "Votre motivation",
      whyJoin: "Pourquoi souhaitez-vous rejoindre MOW Connect ?",
      whyPlaceholder: "Qu'est-ce qui vous motive à partager votre expertise avec le Maroc ?",
      summary: "📋 Récapitulatif",
      name: "Nom",
      locationLabel: "Localisation",
      domainSummary: "Domaine",
      specialitySummary: "Spécialité",
      experienceSummary: "Expérience",
      years: "ans",
      notice: "💡 En soumettant votre candidature, vous acceptez nos conditions d'utilisation. Votre profil sera vérifié par notre équipe sous 48h. L'abonnement mensuel de 29€/mois sera activé après validation.",
      back: "← Retour",
      continue: "Continuer →",
      submit: "Soumettre ma candidature ✓",
      successMsg: "✅ Candidature soumise avec succès ! Vous recevrez un email de confirmation.",
      other: "Autre",
    },
    howPage: {
      tag: "GUIDE",
      title: "Comment ça marche",
      subtitle: "Tout ce que vous devez savoir pour utiliser MOW Connect",
      seekerTitle: "🎯 Pour les demandeurs de conseil",
      seekerSteps: [
        { title: "Créez votre compte gratuit", desc: "Inscription rapide avec votre email. Aucun frais d'inscription. Décrivez votre profil et vos besoins." },
        { title: "Explorez l'annuaire d'experts", desc: "Filtrez par domaine d'expertise, pays de résidence, langue, disponibilité. Consultez les profils, évaluations et biographies." },
        { title: "Réservez une session", desc: "Sélectionnez un créneau de 45 minutes dans l'agenda de l'expert. Décrivez votre problématique pour optimiser la session." },
        { title: "Participez à la visioconférence", desc: "Rejoignez la session directement depuis la plateforme. Échangez avec l'expert, posez vos questions, obtenez des conseils actionnables." },
        { title: "Évaluez et payez ce que ça vaut", desc: "Après la session, notez l'expert et indiquez combien cette session valait pour vous. Le paiement est libre et confidentiel." },
      ],
      expertTitle: "🌍 Pour les experts de la diaspora",
      expertSteps: [
        { title: "Soumettez votre candidature", desc: "Remplissez le formulaire d'inscription en 3 étapes. Notre équipe vérifie chaque profil sous 48h." },
        { title: "Configurez votre profil", desc: "Complétez votre biographie, ajoutez vos spécialités, définissez vos disponibilités dans l'agenda intégré." },
        { title: "Recevez des demandes", desc: "Les entrepreneurs et managers marocains vous contactent directement via la plateforme pour réserver des sessions." },
        { title: "Partagez votre expertise", desc: "Conduisez des sessions de 45 minutes en visioconférence. Apportez des conseils concrets et actionnables." },
        { title: "Développez votre impact", desc: "Suivez vos statistiques, recueillez des évaluations, et construisez votre réputation dans la communauté MOW." },
      ],
      faqTitle: "❓ Questions fréquentes",
      faqs: [
        { q: "Combien coûte une session pour le demandeur ?", a: "Le demandeur paie ce qu'il estime juste après la session. Il n'y a pas de prix fixe — c'est le principe du « Pay What It's Worth ». MOW Connect retient 10% du montant." },
        { q: "Combien coûte l'accès pour les experts ?", a: "Les experts paient un abonnement mensuel de 29€/mois pour accéder à la plateforme. Cet abonnement donne accès à toutes les fonctionnalités : profil vérifié, agenda, visioconférence, analytics." },
        { q: "Comment sont vérifiés les experts ?", a: "Chaque candidature est examinée par notre équipe. Nous vérifions l'identité, le parcours professionnel (via LinkedIn notamment) et les compétences déclarées." },
        { q: "Quelle est la durée d'une session ?", a: "Les sessions durent 45 minutes. Ce format a été choisi pour permettre un échange substantiel tout en restant compatible avec les agendas chargés des experts de la diaspora." },
        { q: "Puis-je annuler une session ?", a: "Oui, les annulations sont possibles jusqu'à 24h avant la session sans pénalité. Au-delà, la session est considérée comme réalisée." },
      ],
    },
    about: {
      tag: "À PROPOS",
      title: "Notre mission",
      subtitle: "Mobiliser l'expertise de la diaspora marocaine au service du développement économique du Maroc",
      observationTitle: "Le constat",
      observation: [
        "Plus de 5 millions de Marocains vivent à l'étranger dans 48 pays. Parmi eux, des milliers de cadres, entrepreneurs et experts de haut niveau ont accumulé une expertise considérable dans les plus grandes entreprises et institutions du monde.",
        "Parallèlement, les entrepreneurs et managers au Maroc font face à des défis complexes — scaling, internationalisation, transformation digitale, levée de fonds — pour lesquels l'accès à une expertise pointue et contextualisée peut faire toute la différence.",
        "MOW Connect comble ce fossé en créant un pont direct entre ces deux mondes.",
      ],
      approachTitle: "Notre approche unique",
      approaches: [
        { icon: "🤝", title: "Réciprocité", desc: "Le modèle 'Pay What It's Worth' s'ancre dans les valeurs de solidarité et d'entraide de la culture marocaine." },
        { icon: "✅", title: "Qualité vérifiée", desc: "Chaque expert est vérifié par notre équipe. Les évaluations mutuelles garantissent la qualité des échanges." },
        { icon: "🎯", title: "Expertise ciblée", desc: "Des sessions de 45 min focalisées sur vos problématiques concrètes, pas de conseils génériques." },
        { icon: "🌍", title: "Réseau mondial", desc: "Des experts dans 48 pays, couvrant tous les fuseaux horaires et secteurs d'activité." },
      ],
      teamTitle: "L'équipe",
      teamDesc: "MOW Connect est une initiative conçue par le Professeur Hamid Bouchikhi, expert en management et entrepreneuriat.",
      founderName: "Prof. Hamid Bouchikhi",
      founderRole: "Fondateur",
      founderBio: "Professeur de Management & Entrepreneuriat. Auteur de publications académiques et d'ouvrages sur l'identité organisationnelle et l'entrepreneuriat.",
      partnersTitle: "Partenaires stratégiques",
      partnersEmpty: "Cette section sera bientôt mise à jour avec nos partenaires stratégiques. Vous souhaitez devenir partenaire ? Contactez-nous à contact@mow-on-demand.com",
    },
  },
  en: {
    nav: {
      home: "Home",
      experts: "Find a MDM",
      register: "Offer services",
      how: "How it works",
      about: "About",
      cta: "Offer services",
    },
    hero: {
      badge: "🌍 Moroccans of the World",
      title1: "Diaspora expertise",
      title2: "at the service of",
      titleHighlight: "Morocco",
      subtitle: "Connect with Moroccan experts from around the world. 45-minute advisory sessions. Pay what it's worth to you.",
      ctaPrimary: "Find a MDM →",
      ctaSecondary: "Offer services",
    },
    stats: {
      diaspora: "Moroccans in the diaspora",
      countries: "Countries represented",
      experts: "Registered experts",
      sessions: "Sessions completed",
    },
    howSection: {
      tag: "SIMPLE & EFFECTIVE",
      title: "How does it work?",
      subtitle: "A 3-step process to access diaspora expertise",
      steps: [
        { step: "01", icon: "🔍", title: "Find your expert", desc: "Search by field of expertise, country, language, or availability. Browse detailed profiles and reviews." },
        { step: "02", icon: "📅", title: "Book a session", desc: "Choose a 45-minute time slot that works for you. Describe your needs so the expert can prepare." },
        { step: "03", icon: "💡", title: "Pay what it's worth", desc: "After the session, assess its value and pay what you think is fair. Our model is built on reciprocity." },
      ],
    },
    featured: {
      tag: "FEATURED EXPERTS",
      title: "Meet our experts",
      subtitle: "Top-tier Moroccan professionals ready to share their expertise",
      viewAll: "View all experts →",
    },
    pricing: {
      tag: "INNOVATIVE MODEL",
      title1: "Pay what",
      title2: "it's",
      titleHighlight: "worth",
      title3: "to you",
      subtitle: "Our unique model draws on the values of reciprocity and solidarity rooted in Moroccan culture. Advice seekers freely evaluate the value of each session.",
      features: [
        "The expert pays a monthly subscription to access the platform",
        "The seeker pays what they consider fair after the session",
        "MOW Connect retains 10% to ensure service sustainability",
        "A mutual rating system guarantees quality",
      ],
      planTag: "Expert Subscription",
      planPrice: "€29",
      planPeriod: "/month",
      planDesc: "Unlimited platform access",
      planFeatures: ["Verified expert profile", "Integrated calendar", "Built-in video conferencing", "Analytics dashboard", "Certified MOW badge"],
      planCta: "Offer services →",
    },
    cta: {
      title: "Ready to connect?",
      subtitle: "Join the MOW Connect community and contribute to Morocco's development.",
      primary: "I'm looking for a MDM",
      secondary: "Offer services",
    },
    footer: {
      desc: "The platform connecting Moroccan diaspora expertise with entrepreneurs and managers in Morocco.",
      platform: "Platform",
      platformLinks: ["Find a MDM", "Offer services", "Pricing", "FAQ"],
      resources: "Resources",
      resourceLinks: ["Blog", "Success Stories", "Mentor Guide", "Partners"],
      contact: "Contact",
      email: "contact@mow-on-demand.com",
      location: "Casablanca, Morocco",
      copyright: "© 2026 MOW Connect. All rights reserved.",
      legal: ["Terms of use", "Privacy policy", "Legal notice"],
    },
    experts: {
      tag: "DIRECTORY",
      title: "Find your expert",
      subtitle: "Filter by field, country, language, or availability to find the ideal expert",
      searchPlaceholder: "🔍  Search by name, speciality, keyword...",
      domain: "📂 Field",
      country: "🌍 Country",
      language: "🗣 Language",
      availableOnly: "Available only",
      found: "expert(s) found",
      noResults: "No expert matches your criteria.",
      broaden: "Try broadening your filters.",
      yearsExp: "yrs exp.",
      sessions: "sessions",
      languages: "Languages",
      book: "📅 Book a 45-min session",
      unavailable: "Currently unavailable",
      allDomains: "All",
      allCountries: "All",
      allLanguages: "All",
    },
    register: {
      tag: "OFFER SERVICES",
      title: "Join the community",
      subtitle: "Share your expertise with entrepreneurs and managers in Morocco",
      steps: ["Identity", "Expertise", "Motivation"],
      step: "Step",
      personalInfo: "Personal information",
      firstName: "First name",
      lastName: "Last name",
      email: "Professional email",
      countryLabel: "Country of residence",
      city: "City",
      linkedin: "LinkedIn profile",
      expertise: "Your expertise",
      domainLabel: "Field of expertise",
      selectDomain: "Select a field",
      speciality: "Speciality(ies)",
      experience: "Years of experience",
      spokenLanguages: "Spoken languages",
      bio: "Professional biography",
      bioPlaceholder: "Describe your background and what you can bring to Moroccan entrepreneurs and managers...",
      motivation: "Your motivation",
      whyJoin: "Why do you want to join MOW Connect?",
      whyPlaceholder: "What motivates you to share your expertise with Morocco?",
      summary: "📋 Summary",
      name: "Name",
      locationLabel: "Location",
      domainSummary: "Field",
      specialitySummary: "Speciality",
      experienceSummary: "Experience",
      years: "years",
      notice: "💡 By submitting your application, you accept our terms of use. Your profile will be verified by our team within 48h. The monthly subscription of €29/month will be activated after validation.",
      back: "← Back",
      continue: "Continue →",
      submit: "Submit my application ✓",
      successMsg: "✅ Application submitted successfully! You will receive a confirmation email.",
      other: "Other",
    },
    howPage: {
      tag: "GUIDE",
      title: "How it works",
      subtitle: "Everything you need to know about using MOW Connect",
      seekerTitle: "🎯 For advice seekers",
      seekerSteps: [
        { title: "Create your free account", desc: "Quick registration with your email. No sign-up fees. Describe your profile and needs." },
        { title: "Browse the expert directory", desc: "Filter by field of expertise, country, language, availability. Review profiles, ratings, and biographies." },
        { title: "Book a session", desc: "Select a 45-minute slot in the expert's calendar. Describe your challenge to optimize the session." },
        { title: "Join the video call", desc: "Join the session directly from the platform. Exchange with the expert, ask questions, get actionable advice." },
        { title: "Rate and pay what it's worth", desc: "After the session, rate the expert and indicate how much the session was worth to you. Payment is free and confidential." },
      ],
      expertTitle: "🌍 For diaspora experts",
      expertSteps: [
        { title: "Submit your application", desc: "Complete the 3-step registration form. Our team verifies each profile within 48h." },
        { title: "Set up your profile", desc: "Complete your biography, add your specialities, set your availability in the integrated calendar." },
        { title: "Receive requests", desc: "Moroccan entrepreneurs and managers contact you directly through the platform to book sessions." },
        { title: "Share your expertise", desc: "Conduct 45-minute video conferencing sessions. Provide concrete, actionable advice." },
        { title: "Grow your impact", desc: "Track your statistics, collect reviews, and build your reputation in the MOW community." },
      ],
      faqTitle: "❓ Frequently Asked Questions",
      faqs: [
        { q: "How much does a session cost for the seeker?", a: "The seeker pays what they consider fair after the session. There is no fixed price — that's the 'Pay What It's Worth' principle. MOW Connect retains 10% of the amount." },
        { q: "How much does access cost for experts?", a: "Experts pay a monthly subscription of €29/month to access the platform. This subscription gives access to all features: verified profile, calendar, video conferencing, analytics." },
        { q: "How are experts verified?", a: "Each application is reviewed by our team. We verify identity, professional background (via LinkedIn in particular), and declared skills." },
        { q: "How long is a session?", a: "Sessions last 45 minutes. This format was chosen to allow for substantial exchange while remaining compatible with the busy schedules of diaspora experts." },
        { q: "Can I cancel a session?", a: "Yes, cancellations are possible up to 24h before the session without penalty. Beyond that, the session is considered completed." },
      ],
    },
    about: {
      tag: "ABOUT",
      title: "Our mission",
      subtitle: "Mobilizing Moroccan diaspora expertise to serve Morocco's economic development",
      observationTitle: "The observation",
      observation: [
        "Over 5 million Moroccans live abroad across 48 countries. Among them, thousands of senior executives, entrepreneurs, and high-level experts have accumulated considerable expertise in the world's largest companies and institutions.",
        "Meanwhile, entrepreneurs and managers in Morocco face complex challenges — scaling, internationalization, digital transformation, fundraising — for which access to specialized and contextualized expertise can make all the difference.",
        "MOW Connect bridges this gap by creating a direct link between these two worlds.",
      ],
      approachTitle: "Our unique approach",
      approaches: [
        { icon: "🤝", title: "Reciprocity", desc: "The 'Pay What It's Worth' model is rooted in the values of solidarity and mutual aid in Moroccan culture." },
        { icon: "✅", title: "Verified quality", desc: "Every expert is verified by our team. Mutual ratings guarantee the quality of exchanges." },
        { icon: "🎯", title: "Targeted expertise", desc: "45-min sessions focused on your specific challenges, not generic advice." },
        { icon: "🌍", title: "Global network", desc: "Experts in 48 countries, covering all time zones and industries." },
      ],
      teamTitle: "The team",
      teamDesc: "MOW Connect is an initiative conceived by Professor Hamid Bouchikhi, an expert in management and entrepreneurship.",
      founderName: "Prof. Hamid Bouchikhi",
      founderRole: "Founder",
      founderBio: "Professor of Management & Entrepreneurship. Author of academic publications and books on organizational identity and entrepreneurship.",
      partnersTitle: "Strategic Partners",
      partnersEmpty: "This section will soon be updated with our strategic partners. Want to become a partner? Contact us at contact@mow-on-demand.com",
    },
  },
};

const EXPERTS_DATA = [
  { id: 1, name: "Khadija El Amrani", photo: "KE", domain: "Finance & Investment", speciality: "Private Equity, M&A", country: "🇫🇷 France", city: "Paris", experience: 22, languages: ["Français", "Arabe", "Anglais"], rating: 4.9, sessions: 47, bio: { fr: "Managing Director chez un fonds PE à Paris. Experte en structuration de deals et levée de fonds pour l'Afrique.", en: "Managing Director at a PE fund in Paris. Expert in deal structuring and fundraising for Africa." }, disponible: true },
  { id: 2, name: "Youssef Benali", photo: "YB", domain: "Tech & Digital", speciality: "SaaS, Product Management", country: "🇺🇸 USA", city: "San Francisco", experience: 15, languages: ["Anglais", "Français", "Arabe"], rating: 4.8, sessions: 63, bio: { fr: "VP Product dans une licorne SaaS de la Silicon Valley. Mentor de startups tech au Maroc.", en: "VP Product at a SaaS unicorn in Silicon Valley. Tech startup mentor in Morocco." }, disponible: true },
  { id: 3, name: "Fatima-Zahra Idrissi", photo: "FI", domain: "Industrie & Manufacturing", speciality: "Supply Chain, Lean Management", country: "🇩🇪 Germany", city: "Munich", experience: 18, languages: ["Français", "Allemand", "Arabe"], rating: 4.7, sessions: 31, bio: { fr: "Directrice Supply Chain chez un groupe automobile allemand. Spécialiste de l'excellence opérationnelle.", en: "Supply Chain Director at a German automotive group. Specialist in operational excellence." }, disponible: false },
  { id: 4, name: "Omar Tazi", photo: "OT", domain: "Entrepreneuriat", speciality: "Scaling, Go-to-Market", country: "🇬🇧 UK", city: "London", experience: 12, languages: ["Anglais", "Français", "Arabe"], rating: 5.0, sessions: 89, bio: { fr: "Serial entrepreneur, 3 exits réussis. Advisor pour des fonds VC à Londres.", en: "Serial entrepreneur, 3 successful exits. Advisor for VC funds in London." }, disponible: true },
  { id: 5, name: "Salma Chraibi", photo: "SC", domain: "Marketing & Communication", speciality: "Branding, Digital Marketing", country: "🇨🇦 Canada", city: "Montréal", experience: 10, languages: ["Français", "Anglais"], rating: 4.6, sessions: 25, bio: { fr: "Directrice Marketing dans une agence internationale. Experte en stratégie de marque pour les marchés émergents.", en: "Marketing Director at an international agency. Expert in brand strategy for emerging markets." }, disponible: true },
  { id: 6, name: "Mehdi Alaoui", photo: "MA", domain: "Finance & Investment", speciality: "Corporate Finance, Audit", country: "🇦🇪 UAE", city: "Dubai", experience: 20, languages: ["Arabe", "Français", "Anglais"], rating: 4.8, sessions: 52, bio: { fr: "CFO d'un groupe régional basé à Dubaï. Expert en structuration financière et gouvernance.", en: "CFO of a regional group based in Dubai. Expert in financial structuring and governance." }, disponible: true },
];

const DOMAINS = ["Finance & Investment", "Tech & Digital", "Industrie & Manufacturing", "Entrepreneuriat", "Marketing & Communication", "Juridique & Compliance", "RH & Management", "Santé & Pharma"];
const COUNTRIES = ["🇫🇷 France", "🇺🇸 USA", "🇩🇪 Germany", "🇬🇧 UK", "🇨🇦 Canada", "🇦🇪 UAE", "🇳🇱 Netherlands", "🇧🇪 Belgium"];
const LANGUAGES_LIST = ["Français", "Anglais", "Arabe", "Allemand", "Espagnol"];

const LangContext = createContext();
function useLang() { return useContext(LangContext); }
function useT() { const { lang } = useLang(); return translations[lang]; }

// ─── Language Toggle ───
function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div style={{ display: "flex", background: "rgba(100,116,139,0.15)", borderRadius: 8, padding: 2, marginLeft: 8 }}>
      {["FR", "EN"].map(l => (
        <button key={l} onClick={() => setLang(l.toLowerCase())}
          style={{
            background: lang === l.toLowerCase() ? "rgba(45,212,191,0.2)" : "transparent",
            border: lang === l.toLowerCase() ? "1px solid rgba(45,212,191,0.4)" : "1px solid transparent",
            color: lang === l.toLowerCase() ? "#2dd4bf" : "#64748b",
            padding: "4px 10px", borderRadius: 6, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700,
            transition: "all 0.2s",
          }}>{l}</button>
      ))}
    </div>
  );
}

// ─── Shared Components ───
function Nav({ currentPage, setCurrentPage }) {
  const [scrolled, setScrolled] = useState(false);
  const t = useT();
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    { id: "home", label: t.nav.home },
    { id: "experts", label: t.nav.experts },
    { id: "register", label: t.nav.register },
    { id: "how", label: t.nav.how },
    { id: "about", label: t.nav.about },
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
            <button key={l.id} onClick={() => setCurrentPage(l.id)}
              style={{
                background: currentPage === l.id ? "rgba(45,212,191,0.12)" : "transparent",
                border: "none", color: currentPage === l.id ? "#2dd4bf" : "#94a3b8",
                padding: "8px 14px", borderRadius: 8, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
                transition: "all 0.2s",
              }}>{l.label}</button>
          ))}
          <LangToggle />
          <button onClick={() => setCurrentPage("register")} style={{
            background: "linear-gradient(135deg, #2dd4bf, #0d9488)", border: "none",
            color: "#0a192f", padding: "10px 20px", borderRadius: 10, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, marginLeft: 4,
          }}>{t.nav.cta}</button>
        </div>
      </div>
    </nav>
  );
}

function Footer({ setCurrentPage }) {
  const t = useT();
  return (
    <footer style={{ background: "#060f1d", borderTop: "1px solid rgba(45,212,191,0.1)", padding: "60px 24px 30px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 34, height: 34, background: "linear-gradient(135deg, #2dd4bf, #0d9488)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, color: "#0a192f" }}>MW</div>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: "#e2e8f0" }}>MOW <span style={{ color: "#2dd4bf" }}>Connect</span></span>
            </div>
            <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7, maxWidth: 320 }}>{t.footer.desc}</p>
          </div>
          <div>
            <h4 style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 16 }}>{t.footer.platform}</h4>
            {t.footer.platformLinks.map(l => <p key={l} style={{ color: "#64748b", fontSize: 14, marginBottom: 10, cursor: "pointer" }}>{l}</p>)}
          </div>
          <div>
            <h4 style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 16 }}>{t.footer.resources}</h4>
            {t.footer.resourceLinks.map(l => <p key={l} style={{ color: "#64748b", fontSize: 14, marginBottom: 10, cursor: "pointer" }}>{l}</p>)}
          </div>
          <div>
            <h4 style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 16 }}>{t.footer.contact}</h4>
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 10 }}>{t.footer.email}</p>
            <p style={{ color: "#64748b", fontSize: 14 }}>{t.footer.location}</p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(100,116,139,0.2)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ color: "#475569", fontSize: 13 }}>{t.footer.copyright}</p>
          <div style={{ display: "flex", gap: 24 }}>
            {t.footer.legal.map(l => <span key={l} style={{ color: "#475569", fontSize: 13, cursor: "pointer" }}>{l}</span>)}
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

// ─── Expert Card ───
function ExpertCard({ expert, onClick }) {
  const { lang } = useLang();
  const t = useT();
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
        <div style={{ width: 56, height: 56, borderRadius: 14, background: "linear-gradient(135deg, #2dd4bf, #0d9488)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0a192f", fontWeight: 800, fontSize: 18 }}>{expert.photo}</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 16 }}>{expert.name}</div>
          <div style={{ color: "#64748b", fontSize: 13 }}>{expert.country} · {expert.city}</div>
        </div>
        {expert.disponible && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#2dd4bf", boxShadow: "0 0 8px rgba(45,212,191,0.5)" }} />}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
        <span style={{ background: "rgba(45,212,191,0.1)", color: "#2dd4bf", padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{expert.domain}</span>
        <span style={{ background: "rgba(148,163,184,0.1)", color: "#94a3b8", padding: "4px 12px", borderRadius: 6, fontSize: 12 }}>{expert.experience} {t.experts.yearsExp}</span>
      </div>
      <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, marginBottom: 16, minHeight: 44 }}>{(typeof expert.bio === "object" ? expert.bio[lang] : expert.bio).substring(0, 100)}...</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(45,212,191,0.08)", paddingTop: 14 }}>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <span style={{ color: "#f59e0b", fontSize: 14 }}>★</span>
          <span style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 600 }}>{expert.rating}</span>
          <span style={{ color: "#64748b", fontSize: 13 }}>({expert.sessions} {t.experts.sessions})</span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {expert.languages.slice(0, 2).map(l => <span key={l} style={{ background: "rgba(100,116,139,0.15)", color: "#94a3b8", padding: "3px 8px", borderRadius: 4, fontSize: 11 }}>{l}</span>)}
        </div>
      </div>
    </div>
  );
}

// ─── Home Page ───
function HomePage({ setCurrentPage }) {
  const t = useT();
  return (
    <div>
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(ellipse at 30% 20%, rgba(45,212,191,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(13,148,136,0.06) 0%, transparent 50%), #0a192f", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "15%", left: "8%", width: 300, height: 300, borderRadius: "50%", border: "1px solid rgba(45,212,191,0.06)", animation: "float 8s ease-in-out infinite" }} />
        <div style={{ maxWidth: 900, textAlign: "center", position: "relative" }}>
          <div style={{ display: "inline-block", background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.25)", color: "#2dd4bf", padding: "8px 20px", borderRadius: 100, fontSize: 14, fontWeight: 600, letterSpacing: 0.5, marginBottom: 32 }}>{t.hero.badge}</div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 64, fontWeight: 700, color: "#e2e8f0", lineHeight: 1.1, margin: "0 0 24px", letterSpacing: -1 }}>
            {t.hero.title1}<br />{t.hero.title2} <span style={{ color: "#2dd4bf", fontStyle: "italic" }}>{t.hero.titleHighlight}</span>
          </h1>
          <p style={{ fontSize: 19, color: "#94a3b8", lineHeight: 1.7, maxWidth: 650, margin: "0 auto 40px" }}>{t.hero.subtitle}</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <button onClick={() => setCurrentPage("experts")} style={{ background: "linear-gradient(135deg, #2dd4bf, #0d9488)", border: "none", color: "#0a192f", padding: "16px 36px", borderRadius: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, boxShadow: "0 4px 24px rgba(45,212,191,0.25)" }}>{t.hero.ctaPrimary}</button>
            <button onClick={() => setCurrentPage("register")} style={{ background: "transparent", border: "1px solid rgba(45,212,191,0.4)", color: "#2dd4bf", padding: "16px 36px", borderRadius: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600 }}>{t.hero.ctaSecondary}</button>
          </div>
        </div>
      </section>
      <section style={{ background: "#0d1f3c", padding: "48px 24px", borderTop: "1px solid rgba(45,212,191,0.08)", borderBottom: "1px solid rgba(45,212,191,0.08)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32, textAlign: "center" }}>
          {[{ n: "5M+", l: t.stats.diaspora }, { n: "48", l: t.stats.countries }, { n: "250+", l: t.stats.experts }, { n: "1 200+", l: t.stats.sessions }].map(s => (
            <div key={s.l}><div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 38, fontWeight: 700, color: "#2dd4bf" }}>{s.n}</div><div style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>{s.l}</div></div>
          ))}
        </div>
      </section>
      <section style={{ background: "#0a192f", padding: "100px 24px" }}>
        <SectionTitle tag={t.howSection.tag} title={t.howSection.title} subtitle={t.howSection.subtitle} />
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}>
          {t.howSection.steps.map(c => (
            <div key={c.step} style={{ background: "linear-gradient(135deg, rgba(45,212,191,0.04), rgba(13,148,136,0.02))", border: "1px solid rgba(45,212,191,0.1)", borderRadius: 20, padding: 40, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 16, right: 20, fontFamily: "'Playfair Display', Georgia, serif", fontSize: 64, fontWeight: 700, color: "rgba(45,212,191,0.06)" }}>{c.step}</div>
              <div style={{ fontSize: 40, marginBottom: 20 }}>{c.icon}</div>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, color: "#e2e8f0", marginBottom: 12 }}>{c.title}</h3>
              <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.7 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{ background: "#0d1f3c", padding: "100px 24px" }}>
        <SectionTitle tag={t.featured.tag} title={t.featured.title} subtitle={t.featured.subtitle} />
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {EXPERTS_DATA.slice(0, 3).map(e => <ExpertCard key={e.id} expert={e} onClick={() => {}} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <button onClick={() => setCurrentPage("experts")} style={{ background: "transparent", border: "1px solid rgba(45,212,191,0.4)", color: "#2dd4bf", padding: "14px 32px", borderRadius: 10, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600 }}>{t.featured.viewAll}</button>
        </div>
      </section>
      <section style={{ background: "#0a192f", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-block", background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.25)", color: "#2dd4bf", padding: "6px 18px", borderRadius: 100, fontSize: 13, fontWeight: 600, marginBottom: 20 }}>{t.pricing.tag}</div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 38, fontWeight: 700, color: "#e2e8f0", lineHeight: 1.2, marginBottom: 20 }}>{t.pricing.title1}<br />{t.pricing.title2} <span style={{ color: "#2dd4bf", fontStyle: "italic" }}>{t.pricing.titleHighlight}</span> {t.pricing.title3}</h2>
            <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>{t.pricing.subtitle}</p>
            {t.pricing.features.map((feat, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(45,212,191,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2dd4bf", fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</div>
                <span style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.6 }}>{feat}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "linear-gradient(135deg, rgba(45,212,191,0.06), rgba(13,148,136,0.03))", border: "1px solid rgba(45,212,191,0.12)", borderRadius: 24, padding: 48, textAlign: "center" }}>
            <div style={{ fontSize: 14, color: "#2dd4bf", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 24 }}>{t.pricing.planTag}</div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 56, fontWeight: 700, color: "#e2e8f0" }}>{t.pricing.planPrice}<span style={{ fontSize: 20, color: "#64748b", fontWeight: 400 }}>{t.pricing.planPeriod}</span></div>
            <p style={{ color: "#64748b", fontSize: 14, margin: "16px 0 32px" }}>{t.pricing.planDesc}</p>
            {t.pricing.planFeatures.map(f => (
              <div key={f} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12, justifyContent: "center" }}>
                <span style={{ color: "#2dd4bf", fontSize: 14 }}>✓</span>
                <span style={{ color: "#94a3b8", fontSize: 15 }}>{f}</span>
              </div>
            ))}
            <button onClick={() => setCurrentPage("register")} style={{ background: "linear-gradient(135deg, #2dd4bf, #0d9488)", border: "none", color: "#0a192f", padding: "14px 36px", borderRadius: 10, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, marginTop: 28, width: "100%" }}>{t.pricing.planCta}</button>
          </div>
        </div>
      </section>
      <section style={{ background: "linear-gradient(135deg, rgba(45,212,191,0.12), rgba(13,148,136,0.06)), #0a192f", padding: "100px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 42, fontWeight: 700, color: "#e2e8f0", marginBottom: 16 }}>{t.cta.title}</h2>
        <p style={{ color: "#94a3b8", fontSize: 17, marginBottom: 40, maxWidth: 500, margin: "0 auto 40px" }}>{t.cta.subtitle}</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <button onClick={() => setCurrentPage("experts")} style={{ background: "linear-gradient(135deg, #2dd4bf, #0d9488)", border: "none", color: "#0a192f", padding: "16px 36px", borderRadius: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700 }}>{t.cta.primary}</button>
          <button onClick={() => setCurrentPage("register")} style={{ background: "transparent", border: "1px solid rgba(45,212,191,0.4)", color: "#2dd4bf", padding: "16px 36px", borderRadius: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600 }}>{t.cta.secondary}</button>
        </div>
      </section>
    </div>
  );
}

// ─── Experts Directory ───
function ExpertsPage() {
  const { lang } = useLang();
  const t = useT();
  const [domain, setDomain] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [search, setSearch] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);

  const filtered = EXPERTS_DATA.filter(e => {
    if (domain && e.domain !== domain) return false;
    if (country && e.country !== country) return false;
    if (language && !e.languages.includes(language)) return false;
    if (onlyAvailable && !e.disponible) return false;
    const bio = typeof e.bio === "object" ? e.bio[lang] : e.bio;
    if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !e.speciality.toLowerCase().includes(search.toLowerCase()) && !bio.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const selectStyle = { background: "rgba(15,35,64,0.8)", border: "1px solid rgba(45,212,191,0.15)", color: "#e2e8f0", padding: "12px 16px", borderRadius: 10, fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", cursor: "pointer", flex: 1, minWidth: 160, appearance: "none", WebkitAppearance: "none" };

  return (
    <div style={{ background: "#0a192f", minHeight: "100vh", paddingTop: 100 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <SectionTitle tag={t.experts.tag} title={t.experts.title} subtitle={t.experts.subtitle} />
        <div style={{ background: "rgba(13,31,60,0.6)", border: "1px solid rgba(45,212,191,0.1)", borderRadius: 18, padding: 28, marginBottom: 40 }}>
          <div style={{ marginBottom: 20 }}>
            <input type="text" placeholder={t.experts.searchPlaceholder} value={search} onChange={e => setSearch(e.target.value)} style={{ width: "100%", background: "rgba(10,25,47,0.8)", border: "1px solid rgba(45,212,191,0.15)", color: "#e2e8f0", padding: "14px 20px", borderRadius: 12, fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <select value={domain} onChange={e => setDomain(e.target.value)} style={selectStyle}>
              <option value="">{t.experts.domain}</option>
              {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={country} onChange={e => setCountry(e.target.value)} style={selectStyle}>
              <option value="">{t.experts.country}</option>
              {COUNTRIES.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={language} onChange={e => setLanguage(e.target.value)} style={selectStyle}>
              <option value="">{t.experts.language}</option>
              {LANGUAGES_LIST.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <label style={{ display: "flex", gap: 8, alignItems: "center", color: "#94a3b8", fontSize: 14, cursor: "pointer", whiteSpace: "nowrap" }}>
              <input type="checkbox" checked={onlyAvailable} onChange={e => setOnlyAvailable(e.target.checked)} style={{ accentColor: "#2dd4bf" }} />
              {t.experts.availableOnly}
            </label>
          </div>
        </div>
        <div style={{ marginBottom: 24, color: "#64748b", fontSize: 14 }}>{filtered.length} {t.experts.found}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, paddingBottom: 80 }}>
          {filtered.map(e => <ExpertCard key={e.id} expert={e} onClick={() => setSelectedExpert(e)} />)}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 80, color: "#64748b" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 16 }}>{t.experts.noResults}</p>
            <p style={{ fontSize: 14, marginTop: 8 }}>{t.experts.broaden}</p>
          </div>
        )}
      </div>
      {selectedExpert && (
        <div onClick={() => setSelectedExpert(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, backdropFilter: "blur(4px)" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#0f2340", border: "1px solid rgba(45,212,191,0.2)", borderRadius: 24, padding: 48, maxWidth: 600, width: "100%", position: "relative" }}>
            <button onClick={() => setSelectedExpert(null)} style={{ position: "absolute", top: 16, right: 20, background: "none", border: "none", color: "#64748b", fontSize: 24, cursor: "pointer" }}>×</button>
            <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 24 }}>
              <div style={{ width: 72, height: 72, borderRadius: 18, background: "linear-gradient(135deg, #2dd4bf, #0d9488)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0a192f", fontWeight: 800, fontSize: 22 }}>{selectedExpert.photo}</div>
              <div>
                <h3 style={{ color: "#e2e8f0", fontSize: 22, fontWeight: 700, margin: 0 }}>{selectedExpert.name}</h3>
                <div style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>{selectedExpert.country} · {selectedExpert.city}</div>
                <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 6 }}><span style={{ color: "#f59e0b" }}>★</span><span style={{ color: "#e2e8f0", fontWeight: 600 }}>{selectedExpert.rating}</span><span style={{ color: "#64748b", fontSize: 13 }}>· {selectedExpert.sessions} {t.experts.sessions}</span></div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              <span style={{ background: "rgba(45,212,191,0.12)", color: "#2dd4bf", padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600 }}>{selectedExpert.domain}</span>
              <span style={{ background: "rgba(148,163,184,0.1)", color: "#94a3b8", padding: "6px 14px", borderRadius: 8, fontSize: 13 }}>{selectedExpert.speciality}</span>
              <span style={{ background: "rgba(148,163,184,0.1)", color: "#94a3b8", padding: "6px 14px", borderRadius: 8, fontSize: 13 }}>{selectedExpert.experience} {t.experts.yearsExp}</span>
            </div>
            <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>{typeof selectedExpert.bio === "object" ? selectedExpert.bio[lang] : selectedExpert.bio}</p>
            <div style={{ marginBottom: 28 }}>
              <div style={{ color: "#64748b", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{t.experts.languages}</div>
              <div style={{ display: "flex", gap: 8 }}>{selectedExpert.languages.map(l => <span key={l} style={{ background: "rgba(100,116,139,0.15)", color: "#94a3b8", padding: "5px 12px", borderRadius: 6, fontSize: 13 }}>{l}</span>)}</div>
            </div>
            <button style={{ width: "100%", background: selectedExpert.disponible ? "linear-gradient(135deg, #2dd4bf, #0d9488)" : "rgba(100,116,139,0.2)", border: "none", color: selectedExpert.disponible ? "#0a192f" : "#64748b", padding: "16px", borderRadius: 12, cursor: selectedExpert.disponible ? "pointer" : "not-allowed", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700 }}>{selectedExpert.disponible ? t.experts.book : t.experts.unavailable}</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Registration Form ───
function RegisterPage() {
  const t = useT();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ nom: "", prenom: "", email: "", pays: "", ville: "", domain: "", specialite: "", experience: "", bio: "", linkedin: "", langues: [], motivation: "" });
  const inputStyle = { width: "100%", background: "rgba(10,25,47,0.8)", border: "1px solid rgba(45,212,191,0.15)", color: "#e2e8f0", padding: "14px 18px", borderRadius: 10, fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" };
  const labelStyle = { color: "#94a3b8", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8, letterSpacing: 0.3 };

  return (
    <div style={{ background: "#0a192f", minHeight: "100vh", paddingTop: 100, paddingBottom: 80 }}>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px" }}>
        <SectionTitle tag={t.register.tag} title={t.register.title} subtitle={t.register.subtitle} />
        <div style={{ display: "flex", gap: 8, marginBottom: 48 }}>
          {t.register.steps.map((s, i) => (
            <div key={s} style={{ flex: 1 }}>
              <div style={{ height: 4, borderRadius: 4, background: i + 1 <= step ? "linear-gradient(90deg, #2dd4bf, #0d9488)" : "rgba(100,116,139,0.2)", transition: "all 0.4s" }} />
              <div style={{ color: i + 1 <= step ? "#2dd4bf" : "#475569", fontSize: 12, fontWeight: 600, marginTop: 8, textAlign: "center" }}>{t.register.step} {i + 1}: {s}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "rgba(13,31,60,0.6)", border: "1px solid rgba(45,212,191,0.1)", borderRadius: 22, padding: 44 }}>
          {step === 1 && (
            <div>
              <h3 style={{ color: "#e2e8f0", fontSize: 22, fontWeight: 700, marginBottom: 28, fontFamily: "'Playfair Display', Georgia, serif" }}>{t.register.personalInfo}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                <div><label style={labelStyle}>{t.register.firstName} *</label><input style={inputStyle} value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })} /></div>
                <div><label style={labelStyle}>{t.register.lastName} *</label><input style={inputStyle} value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} /></div>
              </div>
              <div style={{ marginBottom: 20 }}><label style={labelStyle}>{t.register.email} *</label><input type="email" style={inputStyle} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                <div><label style={labelStyle}>{t.register.countryLabel} *</label><input style={inputStyle} value={form.pays} onChange={e => setForm({ ...form, pays: e.target.value })} /></div>
                <div><label style={labelStyle}>{t.register.city} *</label><input style={inputStyle} value={form.ville} onChange={e => setForm({ ...form, ville: e.target.value })} /></div>
              </div>
              <div><label style={labelStyle}>{t.register.linkedin}</label><input style={inputStyle} value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} placeholder="https://linkedin.com/in/..." /></div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h3 style={{ color: "#e2e8f0", fontSize: 22, fontWeight: 700, marginBottom: 28, fontFamily: "'Playfair Display', Georgia, serif" }}>{t.register.expertise}</h3>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>{t.register.domainLabel} *</label>
                <select style={{ ...inputStyle, cursor: "pointer" }} value={form.domain} onChange={e => setForm({ ...form, domain: e.target.value })}>
                  <option value="">{t.register.selectDomain}</option>
                  {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 20 }}><label style={labelStyle}>{t.register.speciality} *</label><input style={inputStyle} value={form.specialite} onChange={e => setForm({ ...form, specialite: e.target.value })} /></div>
              <div style={{ marginBottom: 20 }}><label style={labelStyle}>{t.register.experience} *</label><input type="number" style={inputStyle} value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} /></div>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>{t.register.spokenLanguages} *</label>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {[...LANGUAGES_LIST, t.register.other].map(l => (
                    <label key={l} style={{ display: "flex", gap: 6, alignItems: "center", background: form.langues.includes(l) ? "rgba(45,212,191,0.12)" : "rgba(100,116,139,0.1)", border: `1px solid ${form.langues.includes(l) ? "rgba(45,212,191,0.4)" : "rgba(100,116,139,0.15)"}`, padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontSize: 14, color: form.langues.includes(l) ? "#2dd4bf" : "#94a3b8" }}>
                      <input type="checkbox" checked={form.langues.includes(l)} onChange={() => setForm({ ...form, langues: form.langues.includes(l) ? form.langues.filter(x => x !== l) : [...form.langues, l] })} style={{ display: "none" }} />{l}
                    </label>
                  ))}
                </div>
              </div>
              <div><label style={labelStyle}>{t.register.bio} *</label><textarea rows={4} style={{ ...inputStyle, resize: "vertical" }} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} placeholder={t.register.bioPlaceholder} /></div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h3 style={{ color: "#e2e8f0", fontSize: 22, fontWeight: 700, marginBottom: 28, fontFamily: "'Playfair Display', Georgia, serif" }}>{t.register.motivation}</h3>
              <div style={{ marginBottom: 24 }}><label style={labelStyle}>{t.register.whyJoin} *</label><textarea rows={5} style={{ ...inputStyle, resize: "vertical" }} value={form.motivation} onChange={e => setForm({ ...form, motivation: e.target.value })} placeholder={t.register.whyPlaceholder} /></div>
              <div style={{ background: "rgba(45,212,191,0.06)", border: "1px solid rgba(45,212,191,0.15)", borderRadius: 14, padding: 24, marginBottom: 24 }}>
                <h4 style={{ color: "#2dd4bf", fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{t.register.summary}</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[[t.register.name, `${form.prenom} ${form.nom}`], [t.register.email, form.email], [t.register.locationLabel, `${form.ville}, ${form.pays}`], [t.register.domainSummary, form.domain], [t.register.specialitySummary, form.specialite], [t.register.experienceSummary, `${form.experience} ${t.register.years}`]].map(([k, v]) => (
                    <div key={k}><span style={{ color: "#64748b", fontSize: 12 }}>{k}</span><div style={{ color: "#e2e8f0", fontSize: 14 }}>{v || "—"}</div></div>
                  ))}
                </div>
              </div>
              <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 12, padding: 20 }}>
                <p style={{ color: "#f59e0b", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{t.register.notice}</p>
              </div>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 36 }}>
            {step > 1 ? <button onClick={() => setStep(step - 1)} style={{ background: "transparent", border: "1px solid rgba(100,116,139,0.3)", color: "#94a3b8", padding: "12px 28px", borderRadius: 10, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600 }}>{t.register.back}</button> : <div />}
            <button onClick={() => step < 3 ? setStep(step + 1) : alert(t.register.successMsg)} style={{ background: "linear-gradient(135deg, #2dd4bf, #0d9488)", border: "none", color: "#0a192f", padding: "12px 32px", borderRadius: 10, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700 }}>{step < 3 ? t.register.continue : t.register.submit}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── How It Works ───
function HowPage() {
  const t = useT();
  return (
    <div style={{ background: "#0a192f", minHeight: "100vh", paddingTop: 100, paddingBottom: 80 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        <SectionTitle tag={t.howPage.tag} title={t.howPage.title} subtitle={t.howPage.subtitle} />
        <div style={{ marginBottom: 64 }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#2dd4bf", fontSize: 26, fontWeight: 700, marginBottom: 32 }}>{t.howPage.seekerTitle}</h3>
          {t.howPage.seekerSteps.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 24, marginBottom: 28, alignItems: "flex-start" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: "rgba(45,212,191,0.12)", border: "1px solid rgba(45,212,191,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2dd4bf", fontWeight: 800, fontSize: 18 }}>{i + 1}</div>
              <div><div style={{ color: "#e2e8f0", fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{s.title}</div><div style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.7 }}>{s.desc}</div></div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 64 }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#2dd4bf", fontSize: 26, fontWeight: 700, marginBottom: 32 }}>{t.howPage.expertTitle}</h3>
          {t.howPage.expertSteps.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 24, marginBottom: 28, alignItems: "flex-start" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f59e0b", fontWeight: 800, fontSize: 18 }}>{i + 1}</div>
              <div><div style={{ color: "#e2e8f0", fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{s.title}</div><div style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.7 }}>{s.desc}</div></div>
            </div>
          ))}
        </div>
        <div style={{ background: "rgba(13,31,60,0.6)", border: "1px solid rgba(45,212,191,0.1)", borderRadius: 22, padding: 44 }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#e2e8f0", fontSize: 26, fontWeight: 700, marginBottom: 32 }}>{t.howPage.faqTitle}</h3>
          {t.howPage.faqs.map((f, i) => (
            <div key={i} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: i < t.howPage.faqs.length - 1 ? "1px solid rgba(100,116,139,0.15)" : "none" }}>
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
  const t = useT();
  return (
    <div style={{ background: "#0a192f", minHeight: "100vh", paddingTop: 100, paddingBottom: 80 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        <SectionTitle tag={t.about.tag} title={t.about.title} subtitle={t.about.subtitle} />
        <div style={{ background: "rgba(13,31,60,0.6)", border: "1px solid rgba(45,212,191,0.1)", borderRadius: 22, padding: 48, marginBottom: 48 }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#e2e8f0", fontSize: 24, fontWeight: 700, marginBottom: 20 }}>{t.about.observationTitle}</h3>
          {t.about.observation.map((p, i) => <p key={i} style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>{p}</p>)}
        </div>
        <div style={{ background: "rgba(13,31,60,0.6)", border: "1px solid rgba(45,212,191,0.1)", borderRadius: 22, padding: 48, marginBottom: 48 }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#e2e8f0", fontSize: 24, fontWeight: 700, marginBottom: 20 }}>{t.about.approachTitle}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            {t.about.approaches.map(c => (
              <div key={c.title} style={{ background: "rgba(45,212,191,0.04)", borderRadius: 14, padding: 24 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{c.icon}</div>
                <div style={{ color: "#e2e8f0", fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{c.title}</div>
                <div style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "rgba(13,31,60,0.6)", border: "1px solid rgba(45,212,191,0.1)", borderRadius: 22, padding: 48, marginBottom: 48 }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#e2e8f0", fontSize: 24, fontWeight: 700, marginBottom: 20 }}>{t.about.teamTitle}</h3>
          <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>{t.about.teamDesc}</p>
          <div style={{ display: "flex", gap: 24, alignItems: "center", background: "rgba(45,212,191,0.04)", borderRadius: 16, padding: 28 }}>
            <div style={{ width: 80, height: 80, borderRadius: 20, background: "linear-gradient(135deg, #2dd4bf, #0d9488)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0a192f", fontWeight: 800, fontSize: 24, flexShrink: 0 }}>HB</div>
            <div>
              <div style={{ color: "#e2e8f0", fontSize: 18, fontWeight: 700 }}>{t.about.founderName}</div>
              <div style={{ color: "#2dd4bf", fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{t.about.founderRole}</div>
              <div style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7 }}>{t.about.founderBio}</div>
            </div>
          </div>
        </div>
        <div style={{ background: "rgba(13,31,60,0.6)", border: "1px solid rgba(45,212,191,0.1)", borderRadius: 22, padding: 48 }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#e2e8f0", fontSize: 24, fontWeight: 700, marginBottom: 20 }}>{t.about.partnersTitle}</h3>
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🤝</div>
            <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.8, maxWidth: 500, margin: "0 auto" }}>{t.about.partnersEmpty}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ───
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [lang, setLang] = useState("fr");

  useEffect(() => { window.scrollTo(0, 0); }, [currentPage]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
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
    </LangContext.Provider>
  );
}
