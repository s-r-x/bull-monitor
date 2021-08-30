# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.31.0](https://github.com/s-r-x/bull-monitor/compare/v1.3.0...v1.31.0) (2021-08-30)

**Note:** Version bump only for package @bull-monitor/root





# [1.3.0](https://github.com/s-r-x/bull-monitor/compare/v1.2.0...v1.3.0) (2021-08-26)

**Note:** Version bump only for package @bull-monitor/root





# [1.2.0](https://github.com/s-r-x/bull-monitor/compare/v1.1.0...v1.2.0) (2021-08-23)

**Note:** Version bump only for package @bull-monitor/root





# [1.1.0](https://github.com/s-r-x/bull-monitor/compare/v1.0.0...v1.1.0) (2021-08-11)

**Note:** Version bump only for package @bull-monitor/root





# [1.0.0](https://github.com/s-r-x/bull-monitor/compare/v0.31.0...v1.0.0) (2021-08-03)


### Features

* **gql:** id field inside Queue(concatenated prefix and name then converted ([18bc332](https://github.com/s-r-x/bull-monitor/commit/18bc332d4a3e9a942d2a0ba65d8ec573a1c884eb))


### BREAKING CHANGES

* **gql:** all mutations and queries that have the "queue"
argument now should use queue's id instead of name as a unique queue
identifier
BREAKING_CHANGE: since this version all the existing old metrics will be removed. they have been stored in redis assuming that queue names are unique, so queues with the same name did override metrics of each other





# [0.31.0](https://github.com/s-r-x/bull-monitor/compare/v0.30.0...v0.31.0) (2021-07-29)

**Note:** Version bump only for package @bull-monitor/root





# [0.30.0](https://github.com/s-r-x/bull-monitor/compare/v0.29.0...v0.30.0) (2021-07-27)


### Features

* **gql:** processingTime Job field ([841fb7e](https://github.com/s-r-x/bull-monitor/commit/841fb7eb29857cedff06455554ca262697b1b3a4))





# [0.29.0](https://github.com/s-r-x/bull-monitor/compare/v0.28.1...v0.29.0) (2021-07-21)


### Features

* **gql:** add keyPrefix field in Queue ([7fd7bce](https://github.com/s-r-x/bull-monitor/commit/7fd7bceb267bc080c042795f142421de3cb2ed09))





## [0.28.1](https://github.com/s-r-x/bull-monitor/compare/v0.28.0...v0.28.1) (2021-07-19)

**Note:** Version bump only for package @bull-monitor/root





# [0.28.0](https://github.com/s-r-x/bull-monitor/compare/v0.27.3...v0.28.0) (2021-07-07)


### Features

* metrics ([16af366](https://github.com/s-r-x/bull-monitor/commit/16af36690d03fdaed45ce351f3e0bf773492aac6))





## [0.27.3](https://github.com/s-r-x/bull-monitor/compare/v0.27.2...v0.27.3) (2021-07-01)


### Bug Fixes

* **gql:** Cannot return null for non-nullable field Query.jobs ([e349291](https://github.com/s-r-x/bull-monitor/commit/e3492916085c83530fb38c57942f7b84d8b379f8))
* "stuck" job status ([aa7d2f8](https://github.com/s-r-x/bull-monitor/commit/aa7d2f8006358e1346f5cc97974d3aad2a328706))





## [0.27.2](https://github.com/s-r-x/bull-monitor/compare/v0.27.1...v0.27.2) (2021-06-13)

**Note:** Version bump only for package @bull-monitor/root





## [0.27.1](https://github.com/s-r-x/bull-monitor/compare/v0.27.0...v0.27.1) (2021-06-11)

**Note:** Version bump only for package @bull-monitor/root





# [0.27.0](https://github.com/s-r-x/bull-monitor/compare/v0.26.0...v0.27.0) (2021-06-11)


### Bug Fixes

* **gql:** jobs query. validate limit and offset args ([1a43a06](https://github.com/s-r-x/bull-monitor/commit/1a43a0654c461bad00ede1de917be73cd399dce7))





# [0.26.0](https://github.com/s-r-x/bull-monitor/compare/v0.25.2...v0.26.0) (2021-06-10)

**Note:** Version bump only for package @bull-monitor/root





## [0.25.2](https://github.com/s-r-x/bull-monitor/compare/v0.25.1...v0.25.2) (2021-06-09)

**Note:** Version bump only for package @bull-monitor/root





## [0.25.1](https://github.com/s-r-x/bull-monitor/compare/v0.25.0...v0.25.1) (2021-06-09)

**Note:** Version bump only for package @bull-monitor/root





# [0.25.0](https://github.com/s-r-x/bull-monitor/compare/v0.24.0...v0.25.0) (2021-06-09)

**Note:** Version bump only for package @bull-monitor/root





# [0.24.0](https://github.com/s-r-x/bull-monitor/compare/v0.23.0...v0.24.0) (2021-06-07)

**Note:** Version bump only for package @bull-monitor/root





# [0.23.0](https://github.com/s-r-x/bull-monitor/compare/v0.22.0...v0.23.0) (2021-06-07)

**Note:** Version bump only for package @bull-monitor/root





# [0.22.0](https://github.com/s-r-x/bull-monitor/compare/v0.21.1...v0.22.0) (2021-06-07)

**Note:** Version bump only for package @bull-monitor/root





## [0.21.1](https://github.com/s-r-x/bull-monitor/compare/v0.21.0...v0.21.1) (2021-05-25)

**Note:** Version bump only for package @bull-monitor/root





# [0.21.0](https://github.com/s-r-x/bull-monitor/compare/v0.20.0...v0.21.0) (2021-05-25)


### Features

* **gql:** data text search ([6b64103](https://github.com/s-r-x/bull-monitor/commit/6b64103fadfb5492a6ce0e4d27f84dcc8b56b9fc))





# [0.20.0](https://github.com/s-r-x/bull-monitor/compare/v0.19.0...v0.20.0) (2021-05-20)

**Note:** Version bump only for package @bull-monitor/root





# [0.19.0](https://github.com/s-r-x/bull-monitor/compare/v0.18.0...v0.19.0) (2021-05-19)

**Note:** Version bump only for package @bull-monitor/root





# [0.18.0](https://github.com/s-r-x/bull-monitor/compare/v0.17.0...v0.18.0) (2021-05-18)

**Note:** Version bump only for package @bull-monitor/root





# [0.17.0](https://github.com/s-r-x/bull-monitor/compare/v0.16.0...v0.17.0) (2021-05-18)


### Features

* **gql:** add ids arg in jobs query. When specified query will return jobs with every matched id. It has priority overother args(id, order, limit, offset, status) ([88985b2](https://github.com/s-r-x/bull-monitor/commit/88985b201e127105dfcf26ffaddc4825457189a0))
* **ui:** save jobs as json ([1d8f3a2](https://github.com/s-r-x/bull-monitor/commit/1d8f3a2999fdcc7c4544cf9b9baab11785eb28fc))





# [0.16.0](https://github.com/s-r-x/bull-monitor/compare/v0.15.0...v0.16.0) (2021-05-17)

**Note:** Version bump only for package @bull-monitor/root





# [0.15.0](https://github.com/s-r-x/bull-monitor/compare/v0.14.0...v0.15.0) (2021-05-16)

**Note:** Version bump only for package @bull-monitor/root





# [0.14.0](https://github.com/s-r-x/bull-monitor/compare/v0.13.0...v0.14.0) (2021-05-16)

**Note:** Version bump only for package @bull-monitor/root





# 0.13.0 (2021-05-14)


### Features

* **gql:** removeJobs mutation ([3d0def5](https://github.com/s-r-x/bull-monitor/commit/3d0def54ce8d3c318b98d130ecf78c0352d17210))
* **gql:** retryJobs mutation ([854f19d](https://github.com/s-r-x/bull-monitor/commit/854f19db3f8dada096ab17bd81e98b99b5e49236))
