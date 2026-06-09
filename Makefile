.PHONY: frontend-dev frontend-build mock-server typespec-build typespec-install frontend-install install dev

frontend-install:
	cd frontend && npm install

typespec-install:
	cd typespec && npm install

install: frontend-install typespec-install

typespec-build:
	cd typespec && npm run build

frontend-build:
	cd frontend && npm run build

mock-server:
	cd frontend && ./scripts/mock-server.sh

frontend-dev:
	cd frontend && npm run dev

dev:
	@echo "Starting mock server on :4010 and frontend on :5173..."
	@cd frontend && ./scripts/mock-server.sh &
	@sleep 2
	@cd frontend && npm run dev
