
# My Simple Webpage

Un proiect web simplu, realizat folosind **HTML5** și **CSS3**, care demonstrează utilizarea elementelor HTML semantice, stilizarea modernă și designul responsive.

## 📋 Descrierea proiectului

Pagina web conține următoarele secțiuni și componente:

- Un antet (`header`) cu titlul paginii și un meniu de navigare.
- O galerie foto cu trei imagini placeholder.
- O secțiune **Home** cu o scurtă descriere.
- O secțiune **About** cu informații despre proiect.
- O secțiune **Contact**.
- Un subsol (`footer`) cu informații despre drepturile de autor.

Fișierul CSS include și stiluri suplimentare pentru componente ale unei aplicații meteo, precum afișarea prognozei, a rezultatelor și a mesajelor de eroare.

## 📁 Structura proiectului

```text
project-folder/
│
├── index.html
├── styles.css
└── README.md
```

### Descrierea fișierelor

- `index.html` – conține structura și conținutul paginii web.
- `styles.css` – conține regulile CSS pentru aspectul vizual și adaptarea paginii la diferite dimensiuni ale ecranului.
- `README.md` – documentația proiectului.

## 🛠️ Tehnologii utilizate

- **HTML5** – pentru structura semantică a paginii.
- **CSS3** – pentru stilizare, layout și design responsive.
- **CSS Grid** – pentru organizarea imaginilor din galerie.
- **Media Queries** – pentru adaptarea interfeței la dispozitive mobile.

## 🖼️ Galeria foto

Galeria este identificată prin `id="galerie"` și conține trei imagini placeholder.

### Caracteristici

- Layout cu trei coloane folosind CSS Grid.
- Spațiere de `1rem` între imagini.
- Imagini redimensionate automat în funcție de container.
- Adaptare la ecrane mici.

Pe dispozitivele cu lățimea mai mică de **600px**, galeria trece automat la o singură coloană.

## 📱 Design responsive

Proiectul utilizează CSS Media Queries pentru adaptarea elementelor la diferite dimensiuni ale ecranului:

- **Sub 600px:** galeria afișează imaginile într-o singură coloană.
- **Sub 768px:** componentele aplicației meteo se adaptează pentru dispozitive mobile.

## 🚀 Instalare și utilizare

1. Descarcă sau clonează proiectul.
2. Asigură-te că fișierele `index.html` și `styles.css` se află în același director.
3. Deschide fișierul `index.html` într-un browser web.
4. Explorează secțiunile paginii folosind meniul de navigare.

**Notă:** Nu este necesară instalarea unor dependențe sau rularea unui server pentru afișarea paginii statice.

## 🎨 Caracteristici CSS

- Resetarea marginilor și padding-urilor implicite.
- Utilizarea proprietății `box-sizing: border-box`.
- Paletă de culori modernă.
- Efecte hover pentru linkuri și componente.
- Colțuri rotunjite și umbre.
- Layout-uri flexibile și grid.
- Animații CSS pentru indicatorul de încărcare.

## 🔮 Posibile îmbunătățiri

- Înlocuirea imaginilor placeholder cu fotografii reale.
- Adăugarea unui formular funcțional de contact.
- Implementarea funcționalităților meteo cu JavaScript și un API dedicat.
- Îmbunătățirea accesibilității.
- Adăugarea unei versiuni optimizate pentru dispozitive mobile.

## 📄 Licență

Acest proiect poate fi utilizat și modificat în scop educațional sau personal.