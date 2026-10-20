/**
 * terminal.js — Terminal UI engine.
 * Handles: DOM rendering, input capture, keyboard events, history, Tab completion.
 * Does NOT contain portfolio content or command logic.
 */

import { createCommands, tabComplete, getDisplayPath } from './commands.js';

const PROMPT_USER   = 'root';
const PROMPT_SYMBOL = '>';

export class Terminal {
  /**
   * @param {HTMLElement} containerEl  — the #terminal div
   * @param {object}      commands     — result of createCommands()
   */
  constructor(containerEl, commands) {
    this.container    = containerEl;
    this.commands     = commands;
    this.hiddenInput  = document.getElementById('terminal-input');
    this.history      = [];      // executed commands
    this.historyIndex = -1;
    this.browsingHistory = false;
    this.dirStack     = [];      // virtual directory stack

    this._setupListeners();
    this._renderWelcome();
    this._createPrompt();
    this.focusInput();
  }

  // ── Setup ────────────────────────────────────────────────────────────────

  _setupListeners() {
    // Click anywhere in terminal → focus hidden input
    this.container.addEventListener('click', () => this.focusInput());
    this.container.parentElement.addEventListener('click', () => this.focusInput());

    this.hiddenInput.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'Enter':
          e.preventDefault();
          this._handleEnter();
          break;
        case 'ArrowUp':
          e.preventDefault();
          this._navigateHistory(-1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          this._navigateHistory(1);
          break;
        case 'Tab':
          e.preventDefault();
          this._handleTab();
          break;
        case 'Escape':
          e.preventDefault();
          const win = document.querySelector('.terminal-window');
          if (win) {
            win.classList.remove('minimized');
            win.classList.toggle('fullscreen');
          }
          break;
      }
    });

    // Mirror typed text to the visible prompt
    this.hiddenInput.addEventListener('input', () => {
      this._updateVisibleInput();
      this.browsingHistory = false;
    });
  }

  focusInput() {
    this.hiddenInput.focus({ preventScroll: true });
  }

  // ── Welcome screen ───────────────────────────────────────────────────────

  _renderWelcome() {
    const banner = [
      '██████╗ ██████╗  █████╗ ██████╗ ██╗  ██╗ █████╗ ██╗  ██╗ █████╗ ██████╗ ',
      '██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║  ██║██╔══██╗██║ ██╔╝██╔══██╗██╔══██╗',
      '██████╔╝██████╔╝███████║██████╔╝███████║███████║█████╔╝ ███████║██████╔╝',
      '██╔═══╝ ██╔══██╗██╔══██║██╔══██╗██╔══██║██╔══██║██╔═██╗ ██╔══██║██╔══██╗',
      '██║     ██║  ██║██║  ██║██████╔╝██║  ██║██║  ██║██║  ██╗██║  ██║██║  ██║',
      '╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝',
    ].join('\n');

    const bannerDiv = document.createElement('div');
    bannerDiv.className = 'output-block welcome-banner';
    bannerDiv.innerHTML = `<pre aria-hidden="true">${this._esc(banner)}</pre>`;
    this.container.appendChild(bannerDiv);

    const intro = document.createElement('div');
    intro.className = 'output-block';
    intro.innerHTML = `
<p><span class="green bold">Prabhakar R</span> — Terminal Portfolio <span class="dim">v1.0</span></p>
<p class="muted">B.E. Computer Science &amp; Engineering · Chennai, Tamil Nadu, India</p>
<br>
<p class="dim">Type <span class="cyan">help</span> to see available commands.</p>
<p class="dim">Type <span class="cyan">about</span> to learn more about me.</p>
<p class="dim">Use <span class="cyan">↑↓</span> for history, <span class="cyan">Tab</span> for completion.</p>
<br>
`.trim();
    this.container.appendChild(intro);
  }

  // ── Prompt rendering ─────────────────────────────────────────────────────

  /**
   * Create a new active prompt line at the bottom.
   */
  _createPrompt() {
    const line = document.createElement('div');
    line.className = 'prompt-line active-prompt';

    const user   = document.createElement('span');
    user.className = 'prompt-prefix';
    user.textContent = PROMPT_USER;

    const symbol = document.createElement('span');
    symbol.className = 'prompt-symbol';
    symbol.textContent = PROMPT_SYMBOL;

    const inputSpan = document.createElement('span');
    inputSpan.className = 'active-input';

    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.setAttribute('aria-hidden', 'true');

    line.appendChild(user);
    line.appendChild(symbol);
    line.appendChild(inputSpan);
    line.appendChild(cursor);
    this.container.appendChild(line);
    this._scrollToBottom();
  }

  /** Sync hidden input value to visible span. */
  _updateVisibleInput() {
    const el = this.container.querySelector('.active-input');
    if (el) el.textContent = this.hiddenInput.value;
  }

  // ── Enter handler ────────────────────────────────────────────────────────

  _handleEnter() {
    const raw = this.hiddenInput.value.trim();

    // Freeze the current prompt
    const activeLine = this.container.querySelector('.active-prompt');
    if (activeLine) {
      const inputSpan = activeLine.querySelector('.active-input');
      if (inputSpan) {
        inputSpan.textContent = raw;
        inputSpan.classList.remove('active-input');
      }
      const cursor = activeLine.querySelector('.cursor');
      if (cursor) cursor.remove();
      activeLine.classList.remove('active-prompt');
    }

    this.hiddenInput.value = '';

    if (!raw) {
      this._createPrompt();
      return;
    }

    // Add to history
    if (!this.browsingHistory && raw !== this.history[this.history.length - 1]) {
      this.history.push(raw);
    }
    this.historyIndex = -1;
    this.browsingHistory = false;

    // Parse and execute
    const parts  = this._parseInput(raw);
    const cmd    = parts[0].toLowerCase();
    const args   = parts.slice(1);
    const def    = this.commands[cmd];

    if (!def) {
      this._appendOutput(
        `<p class="error-line">${this._esc(cmd)}: command not found. Type <span class="cyan">help</span> for available commands.</p>`
      );
    } else {
      const ctx = {
        dirStack:    this.dirStack,
        history:     this.history,
        setDir:      (stack) => { this.dirStack = stack; },
        clearOutput: () => this._clearOutput(),
      };
      try {
        const result = def.run(args, ctx);
        if (result !== null && result !== undefined) {
          this._appendOutput(result);
        }
      } catch (err) {
        this._appendOutput(
          `<p class="error-line">Error executing command: ${this._esc(String(err))}</p>`
        );
      }
    }

    this._createPrompt();
  }

  // ── History navigation ───────────────────────────────────────────────────

  _navigateHistory(direction) {
    if (this.history.length === 0) return;

    if (!this.browsingHistory) {
      this.historyIndex = this.history.length;
      this.browsingHistory = true;
    }

    this.historyIndex = Math.max(0, Math.min(this.history.length - 1, this.historyIndex + direction));
    const cmd = this.history[this.historyIndex] ?? '';
    this.hiddenInput.value = cmd;
    this._updateVisibleInput();
  }

  // ── Tab completion ───────────────────────────────────────────────────────

  _handleTab() {
    const input = this.hiddenInput.value;
    const candidates = tabComplete(input, this.dirStack);

    if (candidates.length === 0) return;

    if (candidates.length === 1) {
      const parts = input.split(/\s+/);
      parts[parts.length - 1] = candidates[0];
      this.hiddenInput.value = parts.join(' ');
      this._updateVisibleInput();
    } else {
      // Show all candidates
      this._appendOutput(
        `<p class="muted">${candidates.map(c => this._esc(c)).join('  ')}</p>`
      );
    }
  }

  // ── Output helpers ───────────────────────────────────────────────────────

  _appendOutput(html) {
    const block = document.createElement('div');
    block.className = 'output-block';
    block.innerHTML = html;
    // Make links open safely
    block.querySelectorAll('a[href^="http"]').forEach(a => {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    });
    this.container.appendChild(block);
    this._scrollToBottom();
  }

  _clearOutput() {
    // Remove everything except the hidden input (which is outside terminal-body)
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  _scrollToBottom() {
    // Only auto-scroll if user is near the bottom
    const body = this.container;
    const threshold = 80;
    const nearBottom = body.scrollHeight - body.scrollTop - body.clientHeight < threshold;
    if (nearBottom || body.scrollTop === 0) {
      requestAnimationFrame(() => {
        body.scrollTop = body.scrollHeight;
      });
    }
  }

  // ── Input parsing ────────────────────────────────────────────────────────

  /**
   * Simple tokeniser that handles quoted strings.
   */
  _parseInput(raw) {
    const tokens = [];
    let current = '';
    let inQuote = false;
    let quoteChar = '';

    for (let i = 0; i < raw.length; i++) {
      const ch = raw[i];
      if (inQuote) {
        if (ch === quoteChar) {
          inQuote = false;
        } else {
          current += ch;
        }
      } else if (ch === '"' || ch === "'") {
        inQuote = true;
        quoteChar = ch;
      } else if (ch === ' ' || ch === '\t') {
        if (current) {
          tokens.push(current);
          current = '';
        }
      } else {
        current += ch;
      }
    }
    if (current) tokens.push(current);
    return tokens.length ? tokens : [''];
  }

  // ── Utility ──────────────────────────────────────────────────────────────

  _esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}
