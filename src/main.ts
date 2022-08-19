import { Terminal } from "xterm";
import { FitAddon } from 'xterm-addon-fit';



const params = new URLSearchParams(window.location.search);
const app = params.get("app");

if (app !== null) {
  window.document.body.innerHTML = `<div id="terminal"></div>`;
  const terminalElement = document.getElementById("terminal");
  document.body.style.padding = "0";
  document.body.style.margin = "0";
  document.body.style.backgroundColor = "#000";
  if (terminalElement) {
    const terminal = new Terminal();
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(document.querySelector("html")!);
    terminal.write("Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ");
    fitAddon.fit();
  }
} else {
  window.document.body.innerHTML = `
    <h1>Run WASI</h1>
    <p>
        <code>https://wasi.run?app=http://test.com/test.wasm</code>
    </p>
    `
}
