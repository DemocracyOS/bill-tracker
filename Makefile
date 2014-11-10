ifndef DEBUG
  DEBUG="billtracker*"
endif

ifndef NODE_ENV
  NODE_ENV="development"
endif

run: node_modules components config build
	@echo "Booting application..."
	@NODE_PATH=. DEBUG=$(DEBUG) node index.js

node_modules:
	@echo "Installing dependencies..."
	@npm install

components:
	@echo "Installing components..."
	@node ./bin/billtracker-install --config

config:
	@echo "Updating config settings..."
	@node ./bin/billtracker-config

build:
	@echo "Compiling components to ./public..."
	@node ./bin/billtracker-build

clean:
	@echo "Removing dependencies, components and built assets."
	@rm -rf components node_modules public
	@echo "Done.\n"

dropdb:
	@node ./bin/billtracker-db drop
	@echo "Data droped"

initdb:
	@echo "Bootstrapping db"
	@node ./bin/billtracker-db load bill ./lib/fixtures/bills.json

reloaddb:	dropdb initdb

.PHONY: run build clean dropdb initdb

