// Site de Tom Carcagne
// - traduction français / anglais
// - mode clair / sombre
// - petit terminal
// - apparition des blocs quand on descend

// Textes en anglais (le français est directement dans le HTML)
let anglais = {
    "nav.projets": "Projects",
    "nav.competences": "Skills",
    "nav.parcours": "Background",
    "nav.contact": "Contact",

    "intro.titre": "Computer science student · Besançon / Dijon",
    "intro.texte": "Third-year Computer Science student at Université Marie & Louis Pasteur. I write Bash and JavaScript, and I run my own server.",
    "intro.stage": "Seeking a 12-week work placement from March 2027",
    "intro.contact": "Get in touch",
    "terminal.legende": "Interactive terminal — type",

    "homelab.titre": "Self-hosted homelab",
    "homelab.infos": "Personal project · 2025 – present",
    "homelab.1": "Set up and administer a personal Linux server.",
    "homelab.2": "Deploy and maintain remotely accessible applications in Docker containers.",
    "homelab.3": "Domain name, Traefik reverse proxy, TLS certificates and single sign-on with Authentik.",
    "homelab.4": "This very page is hosted on it.",

    "bash.titre": "Bash file versioning system",
    "bash.infos": "University project · 2025 – 2026",
    "bash.1": "A text-file versioning tool written in Bash.",
    "bash.2": "Scripts to save, inspect and restore file versions.",
    "bash.3": "Handles files, directories and command-line arguments.",

    "flip7.titre": "Flip7 web game in JavaScript",
    "flip7.infos": "University project · 2025 – 2026",
    "flip7.1": "Web version of the card game: rules, scoring and turn management.",
    "flip7.2": "Interactive interface and game-state management.",
    "flip7.3": "My part: the game engine in JavaScript and the database integration.",
    "flip7.bdd": "Database",

    "site.titre": "This website",
    "site.infos": "Personal project · 2026",
    "site.1": "Hand-written HTML, CSS and JavaScript — no framework, no dependency.",
    "site.2": "Bilingual, light/dark theme, interactive terminal, keyboard accessible.",
    "site.3": "Served by nginx in a non-root container behind Traefik, with a strict Content Security Policy.",

    "comp.langages": "Programming",
    "comp.interfaces": "Interactive interfaces",
    "comp.systemes": "Systems",
    "comp.admin": "Server administration",
    "comp.reseaux": "Networking",
    "comp.outils": "Tools",
    "comp.langues": "Languages",
    "comp.francais": "French — native",
    "comp.anglais": "English — B2",

    "licence.annee": "2022 – present",
    "licence.titre": "Licence Informatique (BSc in Computer Science, year 3)",
    "travail.annee": "Summers 2023 – 2026",
    "travail.titre": "Warehouse operative — Districash",
    "travail.texte": "Dijon · Received and organised tyres and automotive parts.",
    "bac.titre": "Baccalauréat général (French high-school diploma)",
    "bac.texte": "Specialisms: Mathematics, Physics, Life & Earth Sciences · Lycée International Charles de Gaulle, Dijon",

    "loisirs.titre": "Away from the keyboard",
    "loisirs.1": "Sewing",
    "loisirs.2": "3D printing",
    "loisirs.3": "Electronics (home automation, custom sensor)",
    "loisirs.4": "Bouldering",
    "loisirs.5": "Running",

    "contact.texte": "A 12-week placement starting March 2027? Drop me a line.",
    "contact.mail": "Send an e-mail",
    "cv.bouton": "Download my CV",
    "cv.autre": "Also available in",
    "pied": "Self-hosted on my own server, no trackers, no cookies."
};

// On garde les textes français du HTML pour pouvoir revenir en français
let francais = {};
let elements = document.querySelectorAll("[data-i18n]");
for (let i = 0; i < elements.length; i++) {
    francais[elements[i].dataset.i18n] = elements[i].textContent;
}

let langue = "fr";


// ===== Langue =====

function changerLangue(nouvelleLangue) {
    langue = nouvelleLangue;
    document.documentElement.lang = langue;

    let textes = francais;
    if (langue == "en") {
        textes = anglais;
    }

    for (let i = 0; i < elements.length; i++) {
        let cle = elements[i].dataset.i18n;
        if (textes[cle] != undefined) {
            elements[i].textContent = textes[cle];
        }
    }

    // Les boutons CV donnent le CV dans la langue de la page,
    // et le petit lien en dessous donne l'autre
    let liensCV = document.querySelectorAll(".lien-cv");
    let autreCV = document.getElementById("lien-autre-cv");

    if (langue == "en") {
        document.title = "Tom Carcagne — Computer science student";
        for (let i = 0; i < liensCV.length; i++) {
            liensCV[i].href = "cv-en.pdf";
            liensCV[i].download = "Tom-Carcagne-CV-EN.pdf";
        }
        autreCV.href = "cv-fr.pdf";
        autreCV.download = "Tom-Carcagne-CV.pdf";
        autreCV.textContent = "français";
        document.getElementById("bouton-langue").textContent = "FR";
    } else {
        document.title = "Tom Carcagne — Étudiant en informatique";
        for (let i = 0; i < liensCV.length; i++) {
            liensCV[i].href = "cv-fr.pdf";
            liensCV[i].download = "Tom-Carcagne-CV.pdf";
        }
        autreCV.href = "cv-en.pdf";
        autreCV.download = "Tom-Carcagne-CV-EN.pdf";
        autreCV.textContent = "English";
        document.getElementById("bouton-langue").textContent = "EN";
    }

    localStorage.setItem("langue", langue);
}

document.getElementById("bouton-langue").addEventListener("click", function () {
    if (langue == "fr") {
        changerLangue("en");
    } else {
        changerLangue("fr");
    }
});


// ===== Thème =====

function changerTheme() {
    if (document.documentElement.dataset.theme == "sombre") {
        document.documentElement.dataset.theme = "clair";
    } else {
        document.documentElement.dataset.theme = "sombre";
    }
    localStorage.setItem("theme", document.documentElement.dataset.theme);
}

document.getElementById("bouton-theme").addEventListener("click", changerTheme);


// ===== Adresse mail =====
// Écrite en morceaux pour que les robots ne la récupèrent pas trop facilement

let adresse = "carcagnetom" + "@" + "gmail.com";
let boutonMail = document.getElementById("bouton-mail");
boutonMail.href = "mailto:" + adresse + "?subject=Stage%20mars%202027";
boutonMail.title = adresse;


// ===== Terminal =====

let sortie = document.getElementById("terminal-sortie");
let formulaire = document.getElementById("terminal-formulaire");
let champ = document.getElementById("terminal-champ");
let historique = [];
let position = 0;
let commandes = ["help", "whoami", "projects", "skills", "homelab", "contact", "lang", "theme", "history", "clear", "ls", "sudo"];

// Ajoute une ligne dans le terminal. type = "commande", "gris", "vert" ou "erreur"
function afficher(texte, type) {
    let ligne = document.createElement("div");
    ligne.textContent = texte;
    if (type) {
        ligne.className = type;
    }
    sortie.appendChild(ligne);
    sortie.scrollTop = sortie.scrollHeight;
}

// Une ligne de l'aide : le nom de la commande en vert, puis l'explication
function ligneAide(commande, explication) {
    let ligne = document.createElement("div");
    let nom = document.createElement("span");
    nom.className = "vert";
    nom.textContent = commande.padEnd(13);
    ligne.appendChild(nom);
    ligne.appendChild(document.createTextNode(explication));
    sortie.appendChild(ligne);
    sortie.scrollTop = sortie.scrollHeight;
}

function aide() {
    if (langue == "en") {
        ligneAide("whoami", "who I am");
        ligneAide("projects", "my projects");
        ligneAide("skills", "my skills");
        ligneAide("homelab", "what runs on my server");
        ligneAide("contact", "reach me");
        ligneAide("lang fr|en", "switch language");
        ligneAide("theme", "light / dark");
        ligneAide("history", "typed commands");
        ligneAide("clear", "clear the screen");
    } else {
        ligneAide("whoami", "qui je suis");
        ligneAide("projects", "mes projets");
        ligneAide("skills", "mes compétences");
        ligneAide("homelab", "ce qui tourne sur mon serveur");
        ligneAide("contact", "me joindre");
        ligneAide("lang fr|en", "changer de langue");
        ligneAide("theme", "clair / sombre");
        ligneAide("history", "commandes tapées");
        ligneAide("clear", "effacer l'écran");
    }
}

function projets() {
    if (langue == "en") {
        afficher("homelab/       self-hosted server: Docker, Traefik, Authentik");
        afficher("versioning/    file versioning tool written in Bash");
        afficher("flip7/         web card game in JavaScript + database");
        afficher("this-site/     hand-written HTML/CSS/JS, no framework");
    } else {
        afficher("homelab/       serveur auto-hébergé : Docker, Traefik, Authentik");
        afficher("versionnage/   outil de versionnage de fichiers en Bash");
        afficher("flip7/         jeu de cartes web en JavaScript + base de données");
        afficher("ce-site/       HTML/CSS/JS à la main, sans framework");
    }
}

function homelab() {
    if (langue == "en") {
        afficher("Services             Docker + Docker Compose");
        afficher("Reverse proxy        Traefik (Let's Encrypt TLS, DNS challenge)");
        afficher("Authentication       Authentik (SSO)");
        afficher("Backups              Bash scripts + cron, encrypted off-site copy");
        afficher("This site            non-root nginx, read-only, strict CSP");
    } else {
        afficher("Services             Docker + Docker Compose");
        afficher("Reverse proxy        Traefik (TLS Let's Encrypt, défi DNS)");
        afficher("Authentification     Authentik (SSO)");
        afficher("Sauvegardes          scripts Bash + cron, copie hors site chiffrée");
        afficher("Ce site              nginx non-root, lecture seule, CSP stricte");
    }
}

function executer(texte) {
    afficher(texte, "commande");
    if (texte == "") {
        return;
    }
    historique.push(texte);
    position = historique.length;

    // "lang en" -> commande = "lang", argument = "en"
    let morceaux = texte.toLowerCase().split(" ");
    let commande = morceaux[0];
    let argument = morceaux[1];

    if (commande == "help") {
        aide();
    } else if (commande == "whoami") {
        if (langue == "en") {
            afficher("Tom Carcagne — third-year Computer Science student (Besançon, France).");
            afficher("Looking for a 12-week work placement from March 2027.");
        } else {
            afficher("Tom Carcagne — étudiant en 3ᵉ année de licence informatique (Besançon).");
            afficher("Je cherche un stage de 12 semaines à partir de mars 2027.");
        }
    } else if (commande == "projects" || commande == "ls") {
        projets();
    } else if (commande == "skills") {
        afficher("C · Java · Bash · JavaScript · HTML/CSS · Linux · Docker · Git · Traefik · Authentik");
    } else if (commande == "homelab") {
        homelab();
    } else if (commande == "contact") {
        if (langue == "en") {
            afficher("→ \"Send an e-mail\" button below, or github.com/CarcagneTom");
        } else {
            afficher("→ bouton « Envoyer un e-mail » plus bas, ou github.com/CarcagneTom");
        }
    } else if (commande == "lang") {
        // sans argument on passe à l'autre langue
        if (argument == undefined) {
            argument = (langue == "fr") ? "en" : "fr";
        }
        if (argument == "fr") {
            changerLangue("fr");
            afficher("Langue : français.", "gris");
        } else if (argument == "en") {
            changerLangue("en");
            afficher("Language: English.", "gris");
        } else {
            afficher("usage: lang fr|en", "erreur");
        }
    } else if (commande == "theme") {
        changerTheme();
        afficher(langue == "en" ? "Theme switched." : "Thème changé.", "gris");
    } else if (commande == "history") {
        for (let i = 0; i < historique.length; i++) {
            let numero = String(i + 1).padStart(4);
            afficher(numero + "  " + historique[i], "gris");
        }
    } else if (commande == "clear") {
        sortie.innerHTML = "";
    } else if (commande == "sudo") {
        if (langue == "en") {
            afficher("Nice try. This incident will be reported. 😉", "erreur");
        } else {
            afficher("Bien essayé. Cet incident sera signalé. 😉", "erreur");
        }
    } else if (langue == "en") {
        afficher(commande + ": command not found. Try \"help\".", "erreur");
    } else {
        afficher(commande + " : commande introuvable. Essayez « help ».", "erreur");
    }
}

formulaire.addEventListener("submit", function (event) {
    event.preventDefault(); // sinon la page se recharge
    executer(champ.value.trim());
    champ.value = "";
});

champ.addEventListener("keydown", function (event) {
    if (event.key == "ArrowUp") {
        // commande précédente
        event.preventDefault();
        if (position > 0) {
            position--;
            champ.value = historique[position];
        }
    } else if (event.key == "ArrowDown") {
        // commande suivante (ou champ vide si on est au bout)
        event.preventDefault();
        if (position < historique.length - 1) {
            position++;
            champ.value = historique[position];
        } else {
            position = historique.length;
            champ.value = "";
        }
    } else if (event.key == "Tab") {
        // complète la commande, ou affiche les possibilités s'il y en a plusieurs
        let debut = champ.value.trim().toLowerCase();
        let trouvees = [];
        for (let i = 0; i < commandes.length; i++) {
            if (debut != "" && commandes[i].startsWith(debut)) {
                trouvees.push(commandes[i]);
            }
        }
        if (trouvees.length > 0) {
            event.preventDefault();
        }
        if (trouvees.length == 1) {
            champ.value = trouvees[0] + " ";
        } else if (trouvees.length > 1) {
            afficher(trouvees.join("  "), "gris");
        }
    } else if (event.key == "l" && event.ctrlKey) {
        // Ctrl+L efface l'écran comme dans un vrai terminal
        event.preventDefault();
        sortie.innerHTML = "";
    }
});

sortie.addEventListener("click", function () {
    champ.focus();
});

// Au chargement, le terminal tape "whoami" tout seul, lettre par lettre
function taperDemo(i) {
    let mot = "whoami";
    if (document.activeElement == champ) {
        return; // le visiteur a déjà cliqué dans le terminal, on le laisse faire
    }
    if (i <= mot.length) {
        champ.value = mot.substring(0, i);
        setTimeout(function () {
            taperDemo(i + 1);
        }, 110);
    } else {
        executer(mot);
        champ.value = "";
    }
}


// ===== Apparition des blocs quand on descend =====

let blocs = document.querySelectorAll(".projet, .competences > div, .parcours li");

let observateur = new IntersectionObserver(function (entrees) {
    for (let i = 0; i < entrees.length; i++) {
        if (entrees[i].isIntersecting) {
            entrees[i].target.classList.add("visible");
        }
    }
}, { threshold: 0.12 });

for (let i = 0; i < blocs.length; i++) {
    blocs[i].classList.add("cache");
    observateur.observe(blocs[i]);
}


// ===== Démarrage =====

// Thème : celui choisi la dernière fois, sinon celui de l'ordinateur
let themeSauvegarde = localStorage.getItem("theme");
if (themeSauvegarde == "sombre" || themeSauvegarde == "clair") {
    document.documentElement.dataset.theme = themeSauvegarde;
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.dataset.theme = "sombre";
} else {
    document.documentElement.dataset.theme = "clair";
}

// Langue : ?lang=en dans l'adresse, sinon le dernier choix, sinon la langue du navigateur
let langueDemandee = new URLSearchParams(window.location.search).get("lang");
if (langueDemandee != "fr" && langueDemandee != "en") {
    langueDemandee = localStorage.getItem("langue");
}
if (langueDemandee == null) {
    if (navigator.language.startsWith("fr")) {
        langueDemandee = "fr";
    } else {
        langueDemandee = "en";
    }
}
if (langueDemandee == "en") {
    changerLangue("en");
}

if (langue == "en") {
    afficher("Welcome! Type \"help\" to list the commands.", "gris");
} else {
    afficher("Bienvenue ! Tapez « help » pour voir les commandes.", "gris");
}

setTimeout(function () {
    taperDemo(0);
}, 700);
