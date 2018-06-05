ROLLUP=node_modules/.bin/rollup
INFOLOG := \033[34m ▸\033[0m

react-pagejs.js: index.js
	@echo "$(INFOLOG) Building react-pagejs.js.."
	@$(ROLLUP) -c rollup.config.js

watch:
	find index.js | entr make react-pagejs.js
.PHONY: watch

clean:
	@rm react-pagejs.js
.PHONY: clean
