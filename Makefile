# Choose Your Vehicle — pnpm only (never npm).
.DEFAULT_GOAL := help
PNPM ?= pnpm
PORT ?= 5173
API_PORT ?= 8787
IMAGE ?= choose-your-vehicle
# Where the api-* targets send requests. `make up`/`make start` -> 8787; `make dev` -> API_URL=http://localhost:5173/api
API_URL ?= http://localhost:$(API_PORT)/api
RUN_DIR := .run
PID_FILE := $(RUN_DIR)/server.pid
LOG_FILE := $(RUN_DIR)/server.log
JQ := $(shell command -v jq >/dev/null 2>&1 && echo jq || echo cat)
CURL := curl -fsS

.PHONY: help install dev build start api up down restart logs server-status preview lint typecheck check clean \
        db-migrate db-seed db-reset db-status db-tables db-query db-export db-shell \
        api-index api-health api-meta api-brands api-models api-model api-years api-variants api-variant api-raw api-query \
        data-validate data-summary data-template data-import data-update \
        docker-build docker-run docker-build-static docker-run-static

help: ## Show available targets
	@awk 'BEGIN {FS = ":.*?## "} /^##@/ {printf "\n\033[1m%s\033[0m\n", substr($$0, 5)} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

node_modules: package.json pnpm-lock.yaml
	$(PNPM) install --frozen-lockfile
	@touch node_modules

##@ Run & build
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

api: node_modules ## API only (+ dist if built) on :8787 with auto-restart, foreground
	PORT=$(API_PORT) $(PNPM) run dev:api

##@ Middleware (API + SQLite) running in the background
up: build ## Build, then start dashboard + API in the background (http://localhost:8787, logs in .run/)
	@mkdir -p $(RUN_DIR)
	@if [ -f $(PID_FILE) ] && kill -0 $$(cat $(PID_FILE)) 2>/dev/null; then echo "already running (pid $$(cat $(PID_FILE))) -> $(API_URL)"; exit 0; fi; \
	PORT=$(API_PORT) nohup node server/index.ts > $(LOG_FILE) 2>&1 & echo $$! > $(PID_FILE); \
	for i in $$(seq 1 30); do $(CURL) $(API_URL)/health >/dev/null 2>&1 && break; sleep 0.3; done; \
	if $(CURL) $(API_URL)/health >/dev/null 2>&1; then echo "up: http://localhost:$(API_PORT)  (pid $$(cat $(PID_FILE)), API $(API_URL))"; \
	else echo "server did not become healthy, see $(LOG_FILE):"; tail -20 $(LOG_FILE); exit 1; fi

down: ## Stop the background server started by `make up`
	@if [ -f $(PID_FILE) ] && kill -0 $$(cat $(PID_FILE)) 2>/dev/null; then kill $$(cat $(PID_FILE)) && echo "stopped pid $$(cat $(PID_FILE))"; else echo "not running"; fi
	@rm -f $(PID_FILE)

restart: down up ## Restart the background server

logs: ## Follow the background server log
	@tail -f $(LOG_FILE)

server-status: ## Is the background server up? (pid + /api/health)
	@if [ -f $(PID_FILE) ] && kill -0 $$(cat $(PID_FILE)) 2>/dev/null; then echo "running (pid $$(cat $(PID_FILE)))"; else echo "not running (make up)"; fi
	@$(CURL) $(API_URL)/health | $(JQ) || true

##@ Query the API (needs `make up`, `make start` or `make dev` + API_URL=http://localhost:5173/api)
api-index: ## List every API endpoint
	@$(CURL) $(API_URL) | $(JQ)
api-health: ## GET /api/health
	@$(CURL) $(API_URL)/health | $(JQ)
api-meta: ## GET /api/meta (counts, year range, last data update)
	@$(CURL) $(API_URL)/meta | $(JQ)
api-brands: ## GET /api/brands
	@$(CURL) $(API_URL)/brands | $(JQ)
api-models: ## GET /api/models [BRAND=toyota]
	@$(CURL) "$(API_URL)/models$(if $(BRAND),?brand=$(BRAND),)" | $(JQ)
api-model: ## GET /api/models/:slug  MODEL=nissan-patrol (every year/trim)
	@test -n "$(MODEL)" || (echo "usage: make api-model MODEL=nissan-patrol" && exit 1)
	@$(CURL) $(API_URL)/models/$(MODEL) | $(JQ)
api-years: ## GET /api/years
	@$(CURL) $(API_URL)/years | $(JQ)
api-variants: ## GET /api/variants [Q='brand=toyota&yearFrom=2020&sort=price&order=asc&limit=5']
	@$(CURL) "$(API_URL)/variants$(if $(Q),?$(Q),)" | $(JQ)
api-variant: ## GET /api/variants/:id  ID=nissan-patrol-y62-2024-le-platinum
	@test -n "$(ID)" || (echo "usage: make api-variant ID=<variant id> (ids: make db-query SQL='SELECT id FROM variants')" && exit 1)
	@$(CURL) $(API_URL)/variants/$(ID) | $(JQ)
api-raw: ## GET /api/variants/:id/raw  ID=...  (the raw DB row)
	@test -n "$(ID)" || (echo "usage: make api-raw ID=<variant id>" && exit 1)
	@$(CURL) $(API_URL)/variants/$(ID)/raw | $(JQ)
api-query: ## Any API path: make api-query P='variants?fuel=diesel&limit=3'
	@test -n "$(P)" || (echo "usage: make api-query P='variants?brand=tank'" && exit 1)
	@$(CURL) "$(API_URL)/$(P)" | $(JQ)

##@ Inspect the database directly (no server needed)
db-tables: node_modules ## Tables/views with row counts + column list
	@$(PNPM) -s run db:tables
db-query: node_modules ## Read-only SQL: make db-query SQL="SELECT brand, COUNT(*) n FROM variant_details GROUP BY brand" [JSON=1]
	@test -n "$(SQL)" || (echo 'usage: make db-query SQL="SELECT * FROM variant_details LIMIT 5" [JSON=1]' && exit 1)
	@$(PNPM) -s run db:query -- "$(SQL)" $(if $(JSON),--json,)
db-export: node_modules ## Dump the full catalog to data/export/variants.json + .csv
	@$(PNPM) -s run db:export
db-shell: ## Interactive sqlite3 shell on data/vehicles.db (needs the sqlite3 CLI)
	@command -v sqlite3 >/dev/null || (echo "sqlite3 CLI not found; use make db-query instead" && exit 1)
	sqlite3 -header -column data/vehicles.db

##@ Data updates (monthly releases)
data-validate: node_modules ## Validate brand files + release batches (no writes)
	@$(PNPM) -s run data:validate
data-summary: node_modules ## Brands / models / variant counts
	@$(PNPM) -s run data:summary
data-template: node_modules ## (Re)write data/releases/TEMPLATE.csv + TEMPLATE.json
	@$(PNPM) -s run data:template
data-import: node_modules ## Import FILE=new.csv|json [ID=2026-12] [NOTES="..."] [DRY=1]
	@test -n "$(FILE)" || (echo "usage: make data-import FILE=data/releases/2026-12.csv [ID=2026-12] [NOTES='...'] [DRY=1]" && exit 1)
	@$(PNPM) -s run data:import -- "$(FILE)" $(if $(ID),--id $(ID),) $(if $(NOTES),--notes "$(NOTES)",) $(if $(DRY),--dry-run,)
data-update: node_modules ## [FILE=new.csv] import (optional) + validate + reseed SQLite + status
	@if [ -n "$(FILE)" ]; then $(MAKE) --no-print-directory data-import FILE="$(FILE)" ID="$(ID)" NOTES="$(NOTES)" DRY="$(DRY)" || exit 1; fi
	@if [ -z "$(DRY)" ]; then $(PNPM) -s run data:update; fi
	@if [ -f $(PID_FILE) ] && kill -0 $$(cat $(PID_FILE)) 2>/dev/null; then echo "background server reseeds on next restart: make restart"; fi

##@ Checks, database lifecycle & cleanup
check: lint data-validate build db-reset ## Lint + validate data + type-check + build + rebuild the DB

db-migrate: node_modules ## Apply pending SQLite migrations (data/vehicles.db)
	$(PNPM) run db:migrate

db-seed: node_modules ## Reload the catalog from src/data into SQLite
	$(PNPM) run db:seed

db-reset: node_modules ## Delete the SQLite file, migrate and seed
	$(PNPM) run db:reset

db-status: node_modules ## Show applied migrations and dataset counts
	$(PNPM) run db:status

clean: down ## Remove build output, local DB, exports, run files and dependencies
	rm -rf dist node_modules data/*.db data/*.db-* data/export $(RUN_DIR)

##@ Docker
docker-build: ## Build the Docker image (Node server: dashboard + API + SQLite)
	docker build -t $(IMAGE) .

docker-run: ## Run the image on http://localhost:8787 (DB kept in volume cyv-data)
	docker run --rm -p $(API_PORT):8787 -v cyv-data:/app/data $(IMAGE)

docker-build-static: ## Build the static-only image (nginx, no API)
	docker build --target static -t $(IMAGE)-static .

docker-run-static: ## Run the static-only image on http://localhost:8080
	docker run --rm -p 8080:80 $(IMAGE)-static
