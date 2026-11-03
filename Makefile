# Choose Your Vehicle — pnpm only (never npm).
.DEFAULT_GOAL := help
PNPM ?= pnpm
PORT ?= 5173
API_PORT ?= 8787
IMAGE ?= choose-your-vehicle

.PHONY: help install dev build start preview lint typecheck check clean \
        db-migrate db-seed db-reset db-status docker-build docker-run docker-build-static docker-run-static

help: ## Show available targets
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

node_modules: package.json pnpm-lock.yaml
	$(PNPM) install --frozen-lockfile
	@touch node_modules

install: ## Install dependencies with pnpm (frozen lockfile)
	$(PNPM) install --frozen-lockfile

dev: node_modules ## Dev server + API (/api) with hot reload (http://localhost:5173)
	$(PNPM) run dev --port $(PORT)

build: node_modules ## Type-check and build the dashboard to ./dist
	$(PNPM) run build

start: build ## Production server: dashboard + API on http://localhost:8787
	PORT=$(API_PORT) $(PNPM) run start

preview: build ## Static preview of ./dist only, no API (http://localhost:4173)
	$(PNPM) run preview

lint: node_modules ## Lint with oxlint
	$(PNPM) run lint

typecheck: node_modules ## TypeScript check only (app + server)
	$(PNPM) run typecheck

check: lint build db-reset ## Lint + type-check + build + rebuild the DB from src/data

db-migrate: node_modules ## Apply pending SQLite migrations (data/vehicles.db)
	$(PNPM) run db:migrate

db-seed: node_modules ## Reload the catalog from src/data into SQLite
	$(PNPM) run db:seed

db-reset: node_modules ## Delete the SQLite file, migrate and seed
	$(PNPM) run db:reset

db-status: node_modules ## Show applied migrations and dataset counts
	$(PNPM) run db:status

clean: ## Remove build output, local DB and dependencies
	rm -rf dist node_modules data/*.db data/*.db-*

docker-build: ## Build the Docker image (Node server: dashboard + API + SQLite)
	docker build -t $(IMAGE) .

docker-run: ## Run the image on http://localhost:8787 (DB kept in volume cyv-data)
	docker run --rm -p $(API_PORT):8787 -v cyv-data:/app/data $(IMAGE)

docker-build-static: ## Build the static-only image (nginx, no API)
	docker build --target static -t $(IMAGE)-static .

docker-run-static: ## Run the static-only image on http://localhost:8080
	docker run --rm -p 8080:80 $(IMAGE)-static
