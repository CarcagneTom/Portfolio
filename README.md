# Portfolio

Mon site perso : https://carcagnetom.fr

Je suis en 3e année de licence informatique à Besançon et je cherche un stage de 12 semaines à partir de mars 2027.
Le site présente mes projets, mes compétences et mon parcours.

## Le site

- HTML, CSS et JavaScript, sans framework
- en français et en anglais (bouton FR/EN, ou `?lang=en` dans l'adresse)
- mode clair / sombre
- un petit terminal en JavaScript (tapez `help`)

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `site/index.html` | la page |
| `site/style.css` | le style (mode clair et sombre) |
| `site/app.js` | traduction, thème, terminal |
| `nginx.conf` | config du serveur web |
| `docker-compose.yml` | le conteneur et sa config Traefik |

Les CV en PDF ne sont pas dans le dépôt, ils sont seulement sur le site.

## Hébergement

Le site est hébergé sur mon serveur perso (homelab). Il tourne dans un conteneur nginx sans root et en lecture seule,
derrière Traefik qui s'occupe du HTTPS (certificats Let's Encrypt) et des redirections de `www` et de `carcagnetom.pro`.

Pour le tester en local sans Traefik :

```bash
docker run --rm -p 8080:8080 \
  -v ./site:/usr/share/nginx/html:ro \
  -v ./nginx.conf:/etc/nginx/conf.d/default.conf:ro \
  nginxinc/nginx-unprivileged:1.31-alpine
```

puis ouvrir http://localhost:8080
