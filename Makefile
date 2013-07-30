SOURCES = lib/*.js lib/*/**.js
TESTS = test/*.test.js test/**/*.test.js

test: test-mocha
lint: lint-jshint


# ==============================================================================
# Node.js
# ==============================================================================
include support/mk/node.mk
include support/mk/mocha.mk

# ==============================================================================
# Browserify
# ==============================================================================
BROWSERIFY_MAIN = ./lib/index.js

include support/mk/browserify.mk
include support/mk/testling.mk

# ==============================================================================
# Code Quality
# ==============================================================================
include support/mk/notes.mk
include support/mk/jshint.mk

# ==============================================================================
# Clean
# ==============================================================================
clean:
	rm -rf build

clobber: clean clobber-node


.PHONY: test clean clobber
