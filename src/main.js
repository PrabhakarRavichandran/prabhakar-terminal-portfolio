/**
 * main.js — Application entry point.
 * Wires up the Terminal, window controls, and reopen behaviour.
 */

import { Terminal } from './terminal.js';
import { createCommands } from './commands.js';

document.addEventListener('DOMContentLoaded', () => {
  const terminalEl     = document.getElementById('terminal');
  const terminalWindow = document.querySelector('.terminal-window');
  const reopenPrompt   = document.querySelector('.reopen-prompt');
  const reopenBtn      = document.getElementById('reopen-btn');

  const commands = createCommands();
  const terminal = new Terminal(terminalEl, commands);

  // ── Window control buttons ────────────────────────────────────────────────

  // Close button
  document.getElementById('btn-close').addEventListener('click', (e) => {
    e.stopPropagation();
    terminalWindow.classList.add('closed');
    if (reopenPrompt) {
      reopenPrompt.hidden = false;
      reopenPrompt.setAttribute('aria-hidden', 'false');
    }
  });

  // Minimize button
  document.getElementById('btn-minimize').addEventListener('click', (e) => {
    e.stopPropagation();
    terminalWindow.classList.toggle('minimized');
    if (terminalWindow.classList.contains('minimized')) {
      terminalWindow.classList.remove('fullscreen');
    } else {
      terminal.focusInput();
    }
  });

  // Fullscreen button
  document.getElementById('btn-fullscreen').addEventListener('click', (e) => {
    e.stopPropagation();
    terminalWindow.classList.remove('minimized');
    terminalWindow.classList.toggle('fullscreen');
    if (!terminalWindow.classList.contains('fullscreen')) {
      terminal.focusInput();
    }
  });

  // Reopen button
  if (reopenBtn) {
    reopenBtn.addEventListener('click', () => {
      terminalWindow.classList.remove('closed');
      if (reopenPrompt) {
        reopenPrompt.hidden = true;
        reopenPrompt.setAttribute('aria-hidden', 'true');
      }
      terminal.focusInput();
    });
  }

  // Double-click title bar → toggle fullscreen
  document.querySelector('.terminal-header').addEventListener('dblclick', () => {
    terminalWindow.classList.toggle('fullscreen');
  });

  // Escape key exits fullscreen globally
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && terminalWindow.classList.contains('fullscreen')) {
      terminalWindow.classList.remove('fullscreen');
      terminal.focusInput();
    }
  });
});
