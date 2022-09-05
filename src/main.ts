import InlineWorker from './run.ts?worker&inline'

import { Terminal } from "xterm";
import { FitAddon } from 'xterm-addon-fit';


const params = new URLSearchParams(window.location.search);
const app = params.get("app");
const input = params.get("input");

function start(terminal:Terminal, app:string) {
  const a = new InlineWorker()
  a.postMessage({app,data:input})
  a.onmessage = (e) => {
    const {stdout} = e.data;
    const uint8 = new Uint8Array(stdout);
    terminal.write(uint8)
  }
  terminal.onData((data)=>{
    // @ts-ignore-next-line
    a.postMessage({data});
  })
}

if (app !== null) {
  window.document.body.innerHTML = `<div id="terminal"></div>`;
  const terminalElement = document.getElementById("terminal");
  document.body.style.padding = "0";
  document.body.style.margin = "0";
  document.body.style.backgroundColor = "#000";
  if (terminalElement) {
    const terminal = new Terminal({
      convertEol: true,
    });
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
    <h6>Source: <a href="https://github.com/richardanaya/wasi.run">https://github.com/richardanaya/wasi.run</a></h6>
    </p>
    <p>
    <h6><a href="https://www.youtube.com/watch?v=ggtEJC0Jv8A">What is WASI?</a> TLDR: Apps compiled to WebAssembly using a common system interface.</h6>
    </p>
    
    `
}
