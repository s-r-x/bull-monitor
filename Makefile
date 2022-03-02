ui_npm_prefix = npm --prefix ./packages/ui
root_npm_prefix = npm --prefix ./packages/root
cli_npm_prefix = npm --prefix ./packages/cli
fixtures_dir = fixtures

fixture.bull-server:
	cd $(fixtures_dir)/bull-server && docker-compose up
deps:
	npm ci
lint:
	npx eslint packages/$(pkg)
lint.fix:
	npx eslint packages/$(pkg) --fix
check-types:
	cd packages/$(pkg) && npx tsc -noEmit -p tsconfig.json
add-dep:
	npx lerna add $(dep) --scope=@bull-monitor/$(pkg)
version:
	npx lerna version $(ver) --force-publish --conventional-commits --create-release github
deploy-demo:
	npm run deploy
publish:
	npx lerna publish from-package --yes
add-dev-dep:
	npx lerna add $(dep) --scope=@bull-monitor/$(pkg) --dev
ui.dev:
	$(ui_npm_prefix) run dev
ui.dev-with-mocks:
	$(ui_npm_prefix) run dev-with-mocks
ui.build:
	$(ui_npm_prefix) run build
ui.build-demo:
	$(ui_npm_prefix) run build-demo
ui.test:
	$(ui_npm_prefix) run test
ui.gen-ts-types:
	cd packages/ui/internal && npx graphql-codegen --config ./gql-ts-codegen.yml
root.build:
	$(root_npm_prefix) run build
root.dev:
	$(root_npm_prefix) run dev
root.test:
	npx jest ./packages/root
cli.dev:
	$(cli_npm_prefix) run dev
cli.build:
	$(cli_npm_prefix) run build
root.test.watch:
	npx jest --watch ./packages/root
root.gen-ts-types:
	cd packages/root/internal && npx graphql-codegen --config ./gql-ts-codegen.yml
lerna.link:
	npx lerna link
lerna.build:
	npx lerna run build
lerna.bootstrap:
	npx lerna bootstrap
example.express:
	npm --prefix ./examples/express start
example.express-with-basic-auth:
	npm --prefix ./examples/express run with-basic-auth
example.koa:
	npm --prefix ./examples/koa start
example.koa-with-basic-auth:
	npm --prefix ./examples/koa run with-basic-auth
example.hapi:
	npm --prefix ./examples/hapi start
example.hapi-with-basic-auth:
	npm --prefix ./examples/hapi run with-basic-auth
example.fastify:
	npm --prefix ./examples/fastify start
example.fastify-with-basic-auth:
	npm --prefix ./examples/fastify run with-basic-auth
example.nest:
	npm --prefix ./examples/nest run start:dev
