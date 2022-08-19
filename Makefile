build:
	yarn build
	cp -r dist/* docs

build_examples:
	cd examples/wasi_hello_world && cargo build --target wasm32-wasi --release
	cp examples/wasi_hello_world/target/wasm32-wasi/release/wasi_hello_world.wasm public/wasi_hello_world.wasm

deploy: build
	git add .
	git commit -m "deploy"
	git push origin main