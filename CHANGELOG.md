## [2.0.8](https://github.com/rvagg/blorg/compare/v2.0.7...v2.0.8) (2026-07-29)

### Trivial Changes

* **deps-dev:** bump typescript from 6.0.3 to 7.0.2 ([75f710b](https://github.com/rvagg/blorg/commit/75f710b15384aef6f1f096b0e5a3b7f3e63098d8))
* fixes for ts@7 ([eaacf29](https://github.com/rvagg/blorg/commit/eaacf29810582875ec11bdbc86da99a0adf2fac6))

## [2.0.7](https://github.com/rvagg/blorg/compare/v2.0.6...v2.0.7) (2026-07-27)

### Trivial Changes

* **deps:** bump the github-actions-minor-patch group with 2 updates ([#12](https://github.com/rvagg/blorg/issues/12)) ([eb2f152](https://github.com/rvagg/blorg/commit/eb2f15213b69f49ce1a4aef45b2c4b96ebffb70a))

## [2.0.6](https://github.com/rvagg/blorg/compare/v2.0.5...v2.0.6) (2026-07-21)

### Trivial Changes

* **ci:** slow down dependabot, add depsound, pin actions by hash ([#11](https://github.com/rvagg/blorg/issues/11)) ([e4af243](https://github.com/rvagg/blorg/commit/e4af243139090d7489c203235b4b132180f2d5c4))

## [2.0.5](https://github.com/rvagg/blorg/compare/v2.0.4...v2.0.5) (2026-07-20)

### Trivial Changes

* **deps:** bump actions/setup-node from 6 to 7 ([#9](https://github.com/rvagg/blorg/issues/9)) ([4228abd](https://github.com/rvagg/blorg/commit/4228abda4a984e499a90bf63d5a66ed6bb07b337))

## [2.0.4](https://github.com/rvagg/blorg/compare/v2.0.3...v2.0.4) (2026-07-06)

### Trivial Changes

* **deps-dev:** bump conventional-changelog-conventionalcommits ([#7](https://github.com/rvagg/blorg/issues/7)) ([6001759](https://github.com/rvagg/blorg/commit/6001759c26540140632bfdae867838f8e23d6985))

## [2.0.3](https://github.com/rvagg/blorg/compare/v2.0.2...v2.0.3) (2026-07-06)

### Trivial Changes

* **deps-dev:** bump @types/node from 25.9.4 to 26.0.1 ([#8](https://github.com/rvagg/blorg/issues/8)) ([2aba1b7](https://github.com/rvagg/blorg/commit/2aba1b70b03e61c464baaf638fa798fe926aa0e4))

## [2.0.2](https://github.com/rvagg/blorg/compare/v2.0.1...v2.0.2) (2026-06-22)

### Trivial Changes

* **deps:** bump actions/checkout from 6 to 7 ([#6](https://github.com/rvagg/blorg/issues/6)) ([90536d7](https://github.com/rvagg/blorg/commit/90536d71a2a1d969470384e8aacef5077bcde2ca))

## [2.0.1](https://github.com/rvagg/blorg/compare/v2.0.0...v2.0.1) (2026-04-28)

### Bug Fixes

* exclude tsconfig.tsbuildinfo, update tsconfig ([c6d32b2](https://github.com/rvagg/blorg/commit/c6d32b280b1ce0baeba30922938b3a9429fc0d16))

### Trivial Changes

* **deps-dev:** bump typescript from 5.9.3 to 6.0.3 ([a90308b](https://github.com/rvagg/blorg/commit/a90308b71c44c6fbcd267a8837d4d23670d0df15))

## [2.0.0](https://github.com/rvagg/blorg/compare/v1.0.0...v2.0.0) (2026-01-24)

### ⚠ BREAKING CHANGES

* Replace swig template engine with nunjucks

- Convert from CommonJS to ESM modules
- Replace deprecated swig with nunjucks for templating
- Add swig-compatible filters (date, raw) and spaceless tag
- Add TypeScript declarations with strict type checking
- Add GitHub Actions CI/CD with semantic-release
- Add comprehensive JSDoc type annotations throughout

Templates using swig syntax should work with nunjucks, but some
edge cases may require adjustment. The `swig-template` plugin is
removed; use `nunjucks-template` instead.

### Features

* modernise to ESM with nunjucks templating ([#2](https://github.com/rvagg/blorg/issues/2)) ([6a2379b](https://github.com/rvagg/blorg/commit/6a2379b2f038eb8f0ebe10ae3c6953b73b05a7f4))
