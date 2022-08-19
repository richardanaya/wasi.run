build:
	yarn build
	cp -r dist/* docs

deploy: build
	git add .
	git commit -m "deploy"
	git push origin main