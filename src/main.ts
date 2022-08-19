import { Terminal } from "xterm";

const params = new URLSearchParams(window.location.search);
const app = params.get("app");

if (app !== null) {
  window.document.body.innerHTML = `<div id="terminal"></div>`;
  const terminalElement = document.getElementById("terminal");
  if (terminalElement) {
    const term = new Terminal();
    term.open(terminalElement);
    term.write("Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ");
  }
}
