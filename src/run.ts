// @ts-ignore-next-line
import { init, WASI } from '@wasmer/wasi'; 

import { Buffer } from 'buffer'
(globalThis as any).Buffer = Buffer

let wasi:WASI | undefined;

// worker listen message
self.addEventListener("message", async (e) => {
    const { app, data } = e.data;
    if(app){
        await init();

        wasi = new WASI({
        env: {
            // 'ENVVAR1': '1',
            // 'ENVVAR2': '2'
        },
        args: [
            // 'command', 'arg1', 'arg2'
        ],
        });
        
        const moduleBytes = fetch(app.url);
        const module = await WebAssembly.compileStreaming(moduleBytes);
        // Instantiate the WASI module
        const instance = await wasi.instantiate(module, {});
        
        if(data){
            wasi.setStdinString(data);
        }
        // Run the start function
        wasi.start(instance);
        const stdout = wasi.getStdoutBuffer().buffer;

        // @ts-ignore-next-line
        postMessage({stdout},[stdout]);
    } else {
        if(wasi){
            wasi.setStdinString(data);
        }
    }
})