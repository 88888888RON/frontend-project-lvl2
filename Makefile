install:
	npm ci

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

eslint:
	npx eslint .

eslint fix:
	npx eslint --fix .

test:
	npx node-options=--no-warnings --experimental-vm-modules jest