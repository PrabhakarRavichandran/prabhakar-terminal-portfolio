/**
 * commands.js — Command definitions and execution logic.
 * Each command returns an HTML string (or null for side-effects like clear).
 * No DOM manipulation happens here — that is the Terminal's responsibility.
 */

import { FILES, FS, RESUME, APPROVED_LINKS } from './content.js';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function err(msg) {
  return `<p class="error-line">${esc(msg)}</p>`;
}

/** Resolve a path string against a current directory node, returning the node or null. */
function resolvePath(pathStr, currentNode) {
  if (!pathStr || pathStr === '~' || pathStr === '/') return FS.root;
  const parts = pathStr.replace(/^\//, '').split('/').filter(Boolean);
  let node = currentNode;
  for (const part of parts) {
    if (part === '..') {
      // We traverse from root each time for simplicity; handled by Terminal.
      return null; // signal caller to go up
    }
    if (!node.children || !node.children[part]) return undefined;
    node = node.children[part];
  }
  return node;
}

/** Get the display path for the current FS position. */
export function getDisplayPath(dirStack) {
  if (!dirStack || dirStack.length === 0) return '/root';
  return '/root' + (dirStack.length ? '/' + dirStack.join('/') : '');
}

// ─── Virtual directory helpers ────────────────────────────────────────────────

function nodeAtStack(stack) {
  let node = FS.root;
  for (const seg of stack) {
    if (node.children && node.children[seg]) {
      node = node.children[seg];
    } else {
      return null;
    }
  }
  return node;
}

function fileKey(stack, filename) {
  if (stack.length === 0) return filename;
  return stack.join('/') + '/' + filename;
}

// ─── Command map ──────────────────────────────────────────────────────────────

/**
 * createCommands() returns a commands object consumed by Terminal.
 * Terminal passes a context object: { dirStack, setDir, addOutput, clearOutput }.
 */
export function createCommands() {
  return {

    // ── GENERAL ─────────────────────────────────────────────────────────────

    help: {
      desc: 'Display available commands',
      run(args, ctx) {
        return `
<div class="help-grid">
  <span class="help-cmd">help</span>        <span class="help-desc">Display available commands</span>
  <span class="help-cmd">man</span>         <span class="help-desc">Terminal usage guide</span>
  <span class="help-cmd">whoami</span>      <span class="help-desc">Display developer identity</span>
  <span class="help-cmd">about</span>       <span class="help-desc">Professional introduction (or: cat about.txt)</span>
  <span class="help-cmd">skills</span>      <span class="help-desc">Technical skills (or: cat skills.txt)</span>
  <span class="help-cmd">education</span>   <span class="help-desc">Educational background</span>
  <span class="help-cmd">experience</span>  <span class="help-desc">Training &amp; experience</span>
  <span class="help-cmd">certifications</span> <span class="help-desc">Verified certifications</span>
  <span class="help-cmd">projects</span>    <span class="help-desc">List all projects</span>
  <span class="help-cmd">resume</span>      <span class="help-desc">Open/download resume PDF</span>
  <span class="help-cmd">contact</span>     <span class="help-desc">Contact information</span>
  <span class="help-cmd">socials</span>     <span class="help-desc">Professional links</span>
  <span class="help-cmd">github</span>      <span class="help-desc">Open GitHub profile</span>
  <span class="help-cmd">linkedin</span>    <span class="help-desc">Open LinkedIn profile</span>
  <span class="help-cmd">pwd</span>         <span class="help-desc">Current virtual directory</span>
  <span class="help-cmd">ls [dir]</span>    <span class="help-desc">List files in current or named directory</span>
  <span class="help-cmd">cd &lt;dir&gt;</span>    <span class="help-desc">Navigate directories (cd .., cd ~)</span>
  <span class="help-cmd">cat &lt;file&gt;</span>  <span class="help-desc">Display file contents</span>
  <span class="help-cmd">tree</span>        <span class="help-desc">Directory tree overview</span>
  <span class="help-cmd">find</span>        <span class="help-desc">List all available portfolio files</span>
  <span class="help-cmd">open &lt;key&gt;</span> <span class="help-desc">Open an approved external link</span>
  <span class="help-cmd">history</span>     <span class="help-desc">Command history</span>
  <span class="help-cmd">clear</span>       <span class="help-desc">Clear terminal output</span>
  <span class="help-cmd">date</span>        <span class="help-desc">Current date &amp; time</span>
  <span class="help-cmd">echo &lt;text&gt;</span> <span class="help-desc">Echo text to output</span>
</div>
<br>
<p class="dim">Tip: Use <span class="cyan">↑↓</span> for history, <span class="cyan">Tab</span> for completion.</p>
`.trim();
      },
    },

    man: {
      desc: 'Terminal usage guide',
      run() {
        return `
<p class="section-header">Terminal Usage Guide</p>
<p>This is an interactive terminal portfolio for <span class="green">Prabhakar R</span>.</p>
<br>
<p><span class="cyan">Keyboard shortcuts</span></p>
<ul>
  <li><span class="yellow">Enter</span>     — execute command</li>
  <li><span class="yellow">↑ / ↓</span>    — navigate command history</li>
  <li><span class="yellow">Tab</span>       — autocomplete command or filename</li>
  <li><span class="yellow">Escape</span>    — toggle fullscreen mode</li>
  <li><span class="yellow">Click</span>     — refocus input anywhere in the terminal</li>
</ul>
<br>
<p><span class="cyan">Navigation</span></p>
<ul>
  <li><span class="muted">cd projects/</span>  — enter the projects directory</li>
  <li><span class="muted">cd ..</span>         — go up one level</li>
  <li><span class="muted">cd ~</span>          — return to root</li>
  <li><span class="muted">ls</span>            — list current directory</li>
  <li><span class="muted">cat &lt;file&gt;</span>   — read a file</li>
</ul>
<br>
<p class="dim">Type <span class="cyan">help</span> to see all available commands.</p>
`.trim();
      },
    },

    whoami: {
      desc: 'Display developer identity',
      run() {
        return `
<p><span class="green bold">Prabhakar R</span></p>
<p class="muted">B.E. Computer Science &amp; Engineering</p>
<p class="muted">J.N.N. Institute of Engineering</p>
<p class="muted">Chennai, Tamil Nadu, India</p>
<br>
<p class="dim">GitHub   <a href="https://github.com/PrabhakarRavichandran" target="_blank" rel="noopener noreferrer">github.com/PrabhakarRavichandran</a></p>
<p class="dim">LinkedIn <a href="https://www.linkedin.com/in/prabhakar-ravichandran" target="_blank" rel="noopener noreferrer">linkedin.com/in/prabhakar-ravichandran</a></p>
`.trim();
      },
    },

    about: {
      desc: 'Professional introduction',
      run() { return FILES['about.txt']; },
    },

    pwd: {
      desc: 'Current virtual directory',
      run(args, ctx) {
        return `<p>${getDisplayPath(ctx.dirStack)}</p>`;
      },
    },

    ls: {
      desc: 'List files in directory',
      run(args, ctx) {
        const target = args[0];
        let node;

        if (!target) {
          node = nodeAtStack(ctx.dirStack);
        } else {
          // handle ls projects/ or ls projects
          const seg = target.replace(/\/$/, '');
          const tryStack = [...ctx.dirStack, seg];
          node = nodeAtStack(tryStack);
          if (!node) {
            // try from root
            node = FS.root.children[seg];
          }
        }

        if (!node) return err(`ls: cannot access '${target}': No such file or directory`);
        if (node.type !== 'dir') return err(`ls: '${target}' is not a directory`);

        const names = Object.keys(node.children);
        if (names.length === 0) return `<p class="muted">Directory is empty.</p>`;

        const items = names.map(name => {
          const child = node.children[name];
          if (child.type === 'dir') {
            return `<span class="ls-dir">${esc(name)}/</span>`;
          } else if (name.endsWith('.md')) {
            return `<span class="ls-md">${esc(name)}</span>`;
          } else {
            return `<span class="ls-file">${esc(name)}</span>`;
          }
        });

        return `<div class="ls-grid">${items.join('')}</div>`;
      },
    },

    cd: {
      desc: 'Navigate virtual directories',
      run(args, ctx) {
        const target = args[0];

        if (!target || target === '~' || target === '/') {
          ctx.setDir([]);
          return `<p class="dim">~ (root)</p>`;
        }

        if (target === '..') {
          if (ctx.dirStack.length === 0) {
            return `<p class="dim">Already at root.</p>`;
          }
          ctx.setDir(ctx.dirStack.slice(0, -1));
          return null;
        }

        // Remove trailing slash
        const seg = target.replace(/\/$/, '');
        const newStack = [...ctx.dirStack, seg];
        const node = nodeAtStack(newStack);

        if (!node) return err(`cd: ${target}: No such directory`);
        if (node.type !== 'dir') return err(`cd: ${target}: Not a directory`);

        ctx.setDir(newStack);
        return null;
      },
    },

    tree: {
      desc: 'Display directory tree',
      run() {
        return `
<p class="muted">/root</p>
<p class="muted">├── <span class="ls-file">about.txt</span></p>
<p class="muted">├── <span class="ls-file">skills.txt</span></p>
<p class="muted">├── <span class="ls-file">education.txt</span></p>
<p class="muted">├── <span class="ls-file">experience.txt</span></p>
<p class="muted">├── <span class="ls-file">certifications.txt</span></p>
<p class="muted">├── <span class="ls-file">contact.txt</span></p>
<p class="muted">├── <span class="ls-file">resume.txt</span></p>
<p class="muted">└── <span class="ls-dir">projects/</span></p>
<p class="muted">    ├── <span class="ls-md">SRS4DEV.md</span></p>
<p class="muted">    ├── <span class="ls-md">ddos-detection.md</span></p>
<p class="muted">    ├── <span class="ls-md">bookloop.md</span></p>
<p class="muted">    ├── <span class="ls-md">morning-star.md</span></p>
<p class="muted">    └── <span class="ls-md">other-projects.md</span></p>
`.trim();
      },
    },

    cat: {
      desc: 'Display file contents',
      run(args, ctx) {
        if (!args[0]) return err('cat: missing file operand');

        const filename = args[0];
        // Build lookup key: try relative to current dir, then absolute
        let key = filename;
        if (ctx.dirStack.length > 0) {
          key = ctx.dirStack.join('/') + '/' + filename;
        }

        // Also accept paths like projects/SRS4DEV.md from root
        const content = FILES[key] ?? FILES[filename];
        if (content === undefined) {
          return err(`cat: ${filename}: No such file`);
        }
        return content;
      },
    },

    find: {
      desc: 'List all portfolio files',
      run() {
        const keys = Object.keys(FILES);
        const lines = keys.map(k => `<p class="muted">./root/${esc(k)}</p>`).join('');
        return lines;
      },
    },

    history: {
      desc: 'Show command history',
      run(args, ctx) {
        if (!ctx.history || ctx.history.length === 0) {
          return `<p class="muted">No commands in history.</p>`;
        }
        return ctx.history
          .map((cmd, i) => `<p><span class="dim">${String(i + 1).padStart(3, ' ')}  </span>${esc(cmd)}</p>`)
          .join('');
      },
    },

    clear: {
      desc: 'Clear terminal output',
      run(args, ctx) {
        ctx.clearOutput();
        return null;
      },
    },

    date: {
      desc: 'Current date and time',
      run() {
        const now = new Date();
        return `<p>${esc(now.toString())}</p>`;
      },
    },

    echo: {
      desc: 'Echo text to output',
      run(args) {
        if (args.length === 0) return `<p></p>`;
        return `<p>${esc(args.join(' '))}</p>`;
      },
    },

    // ── PROFILE ─────────────────────────────────────────────────────────────

    skills: {
      desc: 'Technical skills',
      run() { return FILES['skills.txt']; },
    },

    education: {
      desc: 'Educational background',
      run() { return FILES['education.txt']; },
    },

    experience: {
      desc: 'Training and experience',
      run() { return FILES['experience.txt']; },
    },

    certifications: {
      desc: 'Verified certifications',
      run() { return FILES['certifications.txt']; },
    },

    projects: {
      desc: 'List all portfolio projects',
      run() {
        return `
<p class="section-header">Portfolio Projects</p>
<ul>
  <li><span class="cyan">1.</span> <span class="bold">SRS4DEV</span> — AI-Powered SRS Generator <span class="dim">(cat projects/SRS4DEV.md)</span></li>
  <li><span class="cyan">2.</span> <span class="bold">DDoS Detection in SDN</span> — Intel Unnati 2025 <span class="dim">(cat projects/ddos-detection.md)</span></li>
  <li><span class="cyan">3.</span> <span class="bold">BookLoop</span> — Book Exchange Web App <span class="dim">(cat projects/bookloop.md)</span></li>
  <li><span class="cyan">4.</span> <span class="bold">Morning Star Infra Projects</span> — Business Website <span class="dim">(cat projects/morning-star.md)</span></li>
  <li><span class="cyan">5.</span> <span class="bold">Other Projects</span> — Additional selected work <span class="dim">(cat projects/other-projects.md)</span></li>
</ul>
<br>
<p class="dim">Run <span class="cyan">ls projects/</span> to navigate, or <span class="cyan">cat projects/&lt;name&gt;.md</span> for details.</p>
`.trim();
      },
    },

    resume: {
      desc: 'Open/download resume PDF',
      run() {
        if (!RESUME.configured) {
          return `
<p class="yellow">⚠ Resume PDF not yet configured.</p>
<p class="muted">Place <span class="cyan">prabhakar-r-resume.pdf</span> in the <span class="cyan">data/</span> directory and set</p>
<p class="muted"><span class="cyan">RESUME.configured = true</span> in <span class="cyan">src/content.js</span>.</p>
<br>
<p class="dim">For more info: <span class="cyan">cat resume.txt</span></p>
`.trim();
        }
        window.open(RESUME.path, '_blank', 'noopener,noreferrer');
        return `<p class="green">Opening ${esc(RESUME.filename)} in a new tab...</p>`;
      },
    },

    contact: {
      desc: 'Contact information',
      run() { return FILES['contact.txt']; },
    },

    socials: {
      desc: 'Professional links',
      run() {
        return `
<ul>
  <li><span class="muted">GitHub   </span> <a href="https://github.com/PrabhakarRavichandran" target="_blank" rel="noopener noreferrer">github.com/PrabhakarRavichandran</a></li>
  <li><span class="muted">LinkedIn </span> <a href="https://www.linkedin.com/in/prabhakar-ravichandran" target="_blank" rel="noopener noreferrer">linkedin.com/in/prabhakar-ravichandran</a></li>
  <li><span class="muted">Email    </span> <a href="mailto:raviprabahar2006@gmail.com">raviprabahar2006@gmail.com</a></li>
</ul>
`.trim();
      },
    },

    github: {
      desc: 'Open GitHub profile',
      run() {
        window.open('https://github.com/PrabhakarRavichandran', '_blank', 'noopener,noreferrer');
        return `<p class="green">Opening GitHub profile...</p>`;
      },
    },

    linkedin: {
      desc: 'Open LinkedIn profile',
      run() {
        window.open('https://www.linkedin.com/in/prabhakar-ravichandran', '_blank', 'noopener,noreferrer');
        return `<p class="green">Opening LinkedIn profile...</p>`;
      },
    },

    // ── OPEN (safe external links) ────────────────────────────────────────────

    open: {
      desc: 'Open an approved external link',
      run(args) {
        const key = args[0];
        if (!key) {
          const keys = Object.keys(APPROVED_LINKS).map(k => `<span class="cyan">${esc(k)}</span>`).join(', ');
          return `<p class="muted">Usage: <span class="cyan">open &lt;key&gt;</span></p><p class="muted">Available: ${keys}</p>`;
        }

        const url = APPROVED_LINKS[key.toLowerCase()];
        if (!url) {
          const keys = Object.keys(APPROVED_LINKS).map(k => `<span class="cyan">${esc(k)}</span>`).join(', ');
          return `${err(`open: unknown link key '${key}'`)}<p class="muted">Available keys: ${keys}</p>`;
        }

        // Validate URL scheme
        try {
          const parsed = new URL(url);
          if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:' && parsed.protocol !== 'mailto:') {
            return err(`open: unsafe URL scheme '${parsed.protocol}'`);
          }
        } catch {
          return err(`open: invalid URL`);
        }

        window.open(url, '_blank', 'noopener,noreferrer');
        return `<p class="green">Opening <a href="${url}" target="_blank" rel="noopener noreferrer">${esc(url)}</a> ...</p>`;
      },
    },

  };
}

// ─── Tab completion ───────────────────────────────────────────────────────────

/**
 * Returns candidates for Tab completion given the current input.
 */
export function tabComplete(input, dirStack) {
  const parts = input.split(/\s+/);
  const allCmds = Object.keys(createCommands());

  if (parts.length === 1) {
    // Complete command name
    const prefix = parts[0].toLowerCase();
    return allCmds.filter(c => c.startsWith(prefix));
  }

  if (parts.length === 2) {
    const cmd = parts[0].toLowerCase();
    const prefix = parts[1];

    if (cmd === 'cat' || cmd === 'ls' || cmd === 'cd') {
      const node = nodeAtStack(dirStack);
      if (!node || node.type !== 'dir') return [];
      const names = Object.keys(node.children);
      return names
        .filter(n => n.startsWith(prefix))
        .map(n => {
          const child = node.children[n];
          return child.type === 'dir' ? n + '/' : n;
        });
    }

    if (cmd === 'open') {
      return Object.keys(APPROVED_LINKS).filter(k => k.startsWith(prefix));
    }
  }

  return [];
}
