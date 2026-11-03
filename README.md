# Pagina Web Simplă

Un site static realizat cu HTML5 și CSS, cu navigare prin secțiuni și o galerie de imagini responsive.

## Structura paginii

- **Home** (`#home`): prezentarea introductivă.
- **About** (`#despre`): scurtă prezentare.
- **Galerie** (`#galerie`): trei imagini placeholder afișate într-o grilă.
- **Contact** (`#contact`): secțiunea de contact.
- Header-ul conține navigarea, iar footer-ul apare după conținutul principal.

## Stilizare

`styles.css` include resetul de bază, stilurile pentru header, navigare, secțiuni și footer. Galeria folosește CSS Grid cu trei coloane și spațiu de `1rem`; pe ecrane de maximum 768px, imaginile se afișează într-o singură coloană.

## Fișiere

- `index.html` - structura și conținutul paginii.
- `styles.css` - aspectul vizual și regulile responsive.

## Rulare

Deschide `index.html` într-un browser. Imaginile placeholder sunt încărcate de la `placehold.co`, deci necesită conexiune la internet.

## Observații din analiză

- Navigarea nu include momentan un link direct către secțiunea Galerie.
- `styles.css` conține și reguli pentru o interfață meteo (`.weather-container`, `.forecast-grid` etc.) care nu este folosită de markup-ul actual; pot fi eliminate dacă aplicația meteo nu va fi adăugată.
- Documentul declară limba engleză (`lang="en"`), iar titlul galeriei și textele alternative ale imaginilor sunt în română. Pentru accesibilitate, limba declarată ar trebui să corespundă limbii conținutului.