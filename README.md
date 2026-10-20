# Prabhakar R — Terminal Portfolio

An interactive, terminal-styled personal portfolio for **Prabhakar R**, a Computer Science & Engineering student from Chennai, Tamil Nadu, India.

Inspired by the design of [codebyte.re](https://codebyte.re/) (MIT-licensed), rebuilt from scratch with personalised content, an extended command set, and a virtual filesystem visitors can navigate.

**Live site:** https://prabhakarravichandran.github.io/prabhakar-terminal-portfolio/

---

## Features

- ⌨️ Fully interactive terminal interface — type commands, not click buttons
- 📁 Navigable virtual filesystem (`ls`, `cd`, `cat`, `tree`, `find`)
- 💼 All portfolio information accessible via commands
- 🔗 Safe external link handling (allowlisted URLs only)
- 🕹️ Command history (↑↓), Tab completion, quoted arguments
- 📱 Responsive design — works on desktop, tablet, and mobile
- ♿ Accessible: ARIA roles, `aria-live`, focus management, reduced-motion support
- 🚫 No build step — pure static HTML/CSS/JavaScript with ES modules
- 🚀 Deploys to GitHub Pages via GitHub Actions

---

## Local Development

This project requires **no build step**. It uses native ES modules.

**Option 1 — VS Code Live Server**
Open the project in VS Code and use the Live Server extension.

**Option 2 — Python simple HTTP server**
```bash
cd prabhakar-terminal-portfolio
python -m http.server 8080
# then open http://localhost:8080
```

**Option 3 — Node.js static server**
```bash
npx -y serve .
```

> ⚠️ ES modules require a real HTTP server. Opening `index.html` directly as a `file://` URL will not work.

---

## Available Terminal Commands

| Command | Description |
|---|---|
| `help` | Display all commands |
| `man` | Terminal usage guide |
| `whoami` | Developer identity |
| `about` | Professional introduction |
| `skills` | Technical skills |
| `education` | Educational background |
| `experience` | Training and experience |
| `certifications` | Verified certifications |
| `projects` | List all projects |
| `resume` | Open resume PDF (when configured) |
| `contact` | Contact information |
| `socials` | Professional links |
| `github` | Open GitHub profile |
| `linkedin` | Open LinkedIn profile |
| `pwd` | Current virtual directory |
| `ls [dir]` | List directory contents |
| `cd <dir>` | Navigate directories |
| `cat <file>` | Display file contents |
| `tree` | Directory tree |
| `find` | List all portfolio files |
| `open <key>` | Open approved external link |
| `history` | Command history |
| `clear` | Clear terminal |
| `date` | Current date and time |
| `echo <text>` | Echo text |

---

## Project Structure

```
prabhakar-terminal-portfolio/
├── index.html               # HTML shell and metadata
├── styles/
│   └── main.css             # All styles
├── src/
│   ├── main.js              # Entry point, window controls
│   ├── terminal.js          # Terminal UI engine
│   ├── commands.js          # Command definitions and execution
│   └── content.js           # All portfolio content and filesystem data
├── data/
│   └── prabhakar-r-resume.pdf  # (add your resume here)
└── .github/
    └── workflows/
        └── deploy.yml       # GitHub Pages deployment workflow
```

---

## Customisation

### Updating personal information

Edit **`src/content.js`** to update:
- `FILES` — all text content (about, skills, education, projects, etc.)
- `FS` — virtual filesystem structure
- `RESUME` — resume configuration
- `APPROVED_LINKS` — allowlisted external URLs

### Adding a resume

1. Place your PDF at `data/prabhakar-r-resume.pdf`
2. In `src/content.js`, set:
   ```js
   export const RESUME = {
     configured: true,   // ← change this to true
     filename: 'prabhakar-r-resume.pdf',
     path: 'data/prabhakar-r-resume.pdf',
   };
   ```

### Adding a project

1. Add a new entry to `FILES` in `src/content.js`:
   ```js
   'projects/my-project.md': `<p>...</p>`,
   ```
2. Add the file to `FS.root.children.projects.children`:
   ```js
   'my-project.md': { type: 'file' },
   ```
3. Update the `projects` command's list in `src/commands.js`.

---

## Deployment to GitHub Pages

### Using GitHub Actions (recommended)

1. Push this repository to GitHub as `prabhakar-terminal-portfolio`
2. Go to **Settings → Pages**
3. Set **Source** to **GitHub Actions**
4. Push to `main` — the workflow in `.github/workflows/deploy.yml` deploys automatically

### Manual deployment

1. Push to the `main` branch
2. In **Settings → Pages**, set source to **Deploy from a branch**, branch `main`, root `/`

---

## Technology Stack

- **HTML5** — semantic structure, ARIA roles
- **CSS3** — custom properties, flexbox, responsive layout
- **JavaScript (ES modules)** — no framework, no bundler
- **JetBrains Mono** — terminal typography (Google Fonts)
- **GitHub Actions** — automated deployment

---

## Acknowledgements

Design inspired by [codebytere.github.io](https://github.com/codebytere/codebytere.github.io) by Shelley Vohr, used under the [MIT License](https://github.com/codebytere/codebytere.github.io/blob/main/LICENSE).

---

## Information Still Needed

- [ ] **Resume PDF** — place `prabhakar-r-resume.pdf` in `data/` and set `RESUME.configured = true`
- [ ] **Morning Star repository URL** — public GitHub URL when available
- [ ] **CS50x / CS50P** certificate details (titles, credential status) to add to `certifications.txt`
- [ ] **Expected graduation date** — to add to `education.txt`

---

*© 2025 Prabhakar R*
