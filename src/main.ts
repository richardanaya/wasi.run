// @ts-ignore-next-line
import { init, WASI } from '@wasmer/wasi'; 

import { Terminal } from "xterm";
import { FitAddon } from 'xterm-addon-fit';
import { Buffer } from 'buffer'
(globalThis as any).Buffer = Buffer


const params = new URLSearchParams(window.location.search);
const app = params.get("app");

async function start(terminal:Terminal, app:string) {
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
  
  const moduleBytes = fetch(app);
  const module = await WebAssembly.compileStreaming(moduleBytes);
  // Instantiate the WASI module
  await wasi.instantiate(module, {});
  
  // Run the start function
  wasi.start();
  const stdout = wasi.getStdoutBuffer();
  
  terminal.write(stdout);
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
    start(terminal, app)
  }
} else {
  window.document.body.innerHTML = `
    <h1>Run WASI</h1>
    <p>
        <code>https://wasi.run?app=https://deno.land/x/wasm/tests/demo.wasm</code>
    </p>
    <p>
    <p>
    Source: <a href="https://github.com/richardanaya/wasi.run">https://github.com/richardanaya/wasi.run</a>
    </p>
    <p>
    <h6><a href="https://hacks.mozilla.org/2019/03/standardizing-wasi-a-webassembly-system-interface/">What is WASI?</a> TLDR: Apps compiled to WebAssembly using a common system interface.</h6>
    </p>
    
    `
}
