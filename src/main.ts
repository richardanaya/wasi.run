// @ts-ignore-next-line
import { init, WASI } from '@wasmer/wasi'; 

import { Terminal } from "xterm";
import { FitAddon } from 'xterm-addon-fit';
import { Buffer } from 'buffer'
(globalThis as any).Buffer = Buffer


const params = new URLSearchParams(window.location.search);
const app = params.get("app");

async function start(terminal:Terminal){
  await init();

  const wasi = new WASI({
    env: {
        // 'ENVVAR1': '1',
        // 'ENVVAR2': '2'
    },
    args: [
        // 'command', 'arg1', 'arg2'
    ],
  });
  
  const moduleBytes = fetch("https://deno.land/x/wasm/tests/demo.wasm");
  const module = await WebAssembly.compileStreaming(moduleBytes);
  // Instantiate the WASI module
  await wasi.instantiate(module, {});
  
  // Run the start function
  const exitCode = wasi.start();
  const stdout = wasi.getStdoutString();
  
  terminal.write(`${stdout}(exit code: ${exitCode})`);
}

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
    fitAddon.fit();
    start(terminal)
  }
} else {
  window.document.body.innerHTML = `
    <h1>Run WASI</h1>
    <p>
        <code>https://wasi.run?app=http://test.com/test.wasm</code>
    </p>
    `
}
