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
