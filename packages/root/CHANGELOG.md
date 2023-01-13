# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [5.1.0](https://github.com/s-r-x/bull-monitor/compare/v5.0.3...v5.1.0) (2023-01-13)

**Note:** Version bump only for package @bull-monitor/root





## [5.0.3](https://github.com/s-r-x/bull-monitor/compare/v5.0.2...v5.0.3) (2023-01-10)


### Bug Fixes

* set persistedQueries to false in the apollo server constructor to suppress cache related apollo warning in production ([acf9ba0](https://github.com/s-r-x/bull-monitor/commit/acf9ba0108595213cb913fe3df15a8100fec91ed))





## [5.0.2](https://github.com/s-r-x/bull-monitor/compare/v5.0.1...v5.0.2) (2023-01-10)


### Bug Fixes

* add "unknown" to JobStatus enum ([b381ad1](https://github.com/s-r-x/bull-monitor/commit/b381ad1c468508c18af2c57e5082930cff782512))





## [5.0.1](https://github.com/s-r-x/bull-monitor/compare/v5.0.0...v5.0.1) (2022-05-11)


### Bug Fixes

* handle metrics collector errors ([cee357b](https://github.com/s-r-x/bull-monitor/commit/cee357bbbae0478006368fa434267d6098baf844))





# [5.0.0](https://github.com/s-r-x/bull-monitor/compare/v4.1.1...v5.0.0) (2022-04-08)


### Features

* search by any field ([f5d9960](https://github.com/s-r-x/bull-monitor/commit/f5d99607b987161428700bb8a29b8326486cd6d5))





## [4.1.1](https://github.com/s-r-x/bull-monitor/compare/v4.1.0...v4.1.1) (2022-04-01)


### Bug Fixes

* make all RedisInfo fields nullable in order to support the redis environments with no support for any of them ([377381a](https://github.com/s-r-x/bull-monitor/commit/377381aed578e49b40b5f912a58e0051e17d25e4))





# [4.1.0](https://github.com/s-r-x/bull-monitor/compare/v4.0.0...v4.1.0) (2022-03-02)

**Note:** Version bump only for package @bull-monitor/root





# [4.0.0](https://github.com/s-r-x/bull-monitor/compare/v3.5.0...v4.0.0) (2022-03-02)


### Features

* bump apollo server to the latest version ([21e39e7](https://github.com/s-r-x/bull-monitor/commit/21e39e7b464f2f41006565ee282fb4fe23298a4e))


### BREAKING CHANGES

* app should be passed to monitor.init method when using
fastify adapter





# [3.5.0](https://github.com/s-r-x/bull-monitor/compare/v3.4.1...v3.5.0) (2022-03-02)


### Features

* **bullmq:** support object progress ([4d47b08](https://github.com/s-r-x/bull-monitor/commit/4d47b08cd0dc03a0e8546e0e2985369aa4f44de3))





## [3.4.1](https://github.com/s-r-x/bull-monitor/compare/v3.4.0...v3.4.1) (2022-03-01)

**Note:** Version bump only for package @bull-monitor/root





# [3.4.0](https://github.com/s-r-x/bull-monitor/compare/v3.3.1...v3.4.0) (2022-03-01)

**Note:** Version bump only for package @bull-monitor/root





## [3.3.1](https://github.com/s-r-x/bull-monitor/compare/v3.3.0...v3.3.1) (2022-01-21)


### Bug Fixes

* handle jobs with nil timestamp ([efc78d7](https://github.com/s-r-x/bull-monitor/commit/efc78d7ed8cfe4c09e6bb4acf69581ae4e387c92))





# [3.3.0](https://github.com/s-r-x/bull-monitor/compare/v3.2.0...v3.3.0) (2022-01-12)

**Note:** Version bump only for package @bull-monitor/root





# [3.2.0](https://github.com/s-r-x/bull-monitor/compare/v3.1.0...v3.2.0) (2022-01-11)

**Note:** Version bump only for package @bull-monitor/root





# [3.1.0](https://github.com/s-r-x/bull-monitor/compare/v3.0.0...v3.1.0) (2022-01-11)

**Note:** Version bump only for package @bull-monitor/root





# [3.0.0](https://github.com/s-r-x/bull-monitor/compare/v3.0.0-alpha.3...v3.0.0) (2022-01-11)

**Note:** Version bump only for package @bull-monitor/root





# [3.0.0-alpha.3](https://github.com/s-r-x/bull-monitor/compare/v3.0.0-alpha.2...v3.0.0-alpha.3) (2022-01-11)


### Features

* pass readonly param in queue adapter constructor instead ([46ea2cc](https://github.com/s-r-x/bull-monitor/commit/46ea2cc26b63e138088e919755e8bbe17576ecb4))


### BREAKING CHANGES

* replace "[new BullAdapter(queue), { readonly: true  }]"
with "new BullAdapter(queue, { readonly: true })"





# [3.0.0-alpha.2](https://github.com/s-r-x/bull-monitor/compare/v3.0.0-alpha.1...v3.0.0-alpha.2) (2022-01-11)


### chore

* replace queues setter with setQueues method ([81aca44](https://github.com/s-r-x/bull-monitor/commit/81aca44b20d11574b8462e8eff3324b70745a37e))


### BREAKING CHANGES

* replace "monitor.queues = queues" with
"monitor.setQueues(queues)"





# [3.0.0-alpha.1](https://github.com/s-r-x/bull-monitor/compare/v3.0.0-alpha.0...v3.0.0-alpha.1) (2022-01-10)


* feat!: compile to es2018 ([ac96e15](https://github.com/s-r-x/bull-monitor/commit/ac96e152967f8ff2c7f28030c92ea5ecaaa46cd3))


### BREAKING CHANGES

* drop support for node<10





# [3.0.0-alpha.0](https://github.com/s-r-x/bull-monitor/compare/v2.16.0...v3.0.0-alpha.0) (2022-01-10)


### Features

* bullmq support ([86fc69e](https://github.com/s-r-x/bull-monitor/commit/86fc69eddd08c129cf8a9154e2233e456413c43c))





# [2.16.0](https://github.com/s-r-x/bull-monitor/compare/v2.15.1...v2.16.0) (2021-12-16)

**Note:** Version bump only for package @bull-monitor/root





## [2.15.1](https://github.com/s-r-x/bull-monitor/compare/v2.15.0...v2.15.1) (2021-12-13)

**Note:** Version bump only for package @bull-monitor/root





# [2.15.0](https://github.com/s-r-x/bull-monitor/compare/v2.14.1...v2.15.0) (2021-12-06)


### Features

* min/max processing time metrics ([a22c234](https://github.com/s-r-x/bull-monitor/commit/a22c234709d175963ba0f545f6364ed12ce0743b))





## [2.14.1](https://github.com/s-r-x/bull-monitor/compare/v2.14.0...v2.14.1) (2021-11-29)


### Bug Fixes

* table viewport overflow on medium size devices ([5a3b327](https://github.com/s-r-x/bull-monitor/commit/5a3b32755c24f0e7a1e31324b6869fca81c3913a))





# [2.14.0](https://github.com/s-r-x/bull-monitor/compare/v2.13.0...v2.14.0) (2021-11-27)

**Note:** Version bump only for package @bull-monitor/root





# [2.13.0](https://github.com/s-r-x/bull-monitor/compare/v2.12.1...v2.13.0) (2021-11-08)

**Note:** Version bump only for package @bull-monitor/root





## [2.12.1](https://github.com/s-r-x/bull-monitor/compare/v2.12.0...v2.12.1) (2021-11-01)

**Note:** Version bump only for package @bull-monitor/root





# [2.12.0](https://github.com/s-r-x/bull-monitor/compare/v2.11.0...v2.12.0) (2021-10-26)


### Features

* **gql:** readonly queues ([2905375](https://github.com/s-r-x/bull-monitor/commit/2905375eccdc62512585cd522220f5d255657a3e))





# [2.11.0](https://github.com/s-r-x/bull-monitor/compare/v2.10.0...v2.11.0) (2021-10-07)

**Note:** Version bump only for package @bull-monitor/root





# [2.10.0](https://github.com/s-r-x/bull-monitor/compare/v2.9.0...v2.10.0) (2021-10-07)


### Features

* "processing time" metric ([0f6d9e7](https://github.com/s-r-x/bull-monitor/commit/0f6d9e70ed871c2cbf7cb1e8cf660e069912f003))





# [2.9.0](https://github.com/s-r-x/bull-monitor/compare/v2.8.0...v2.9.0) (2021-10-06)

**Note:** Version bump only for package @bull-monitor/root





# [2.8.0](https://github.com/s-r-x/bull-monitor/compare/v2.7.1...v2.8.0) (2021-10-06)


### Bug Fixes

* **root:** disable gqlPlayground and gqlIntrospection in production by default ([131f71d](https://github.com/s-r-x/bull-monitor/commit/131f71d9a62909297e9da512c8832135be5839fd))


### Performance Improvements

* **root:** convert queues to map when initializing the base class ([fd7f94f](https://github.com/s-r-x/bull-monitor/commit/fd7f94fd9fb9a1ce3b7204f7224448e41d5fc374))





## [2.7.1](https://github.com/s-r-x/bull-monitor/compare/v2.7.0...v2.7.1) (2021-09-24)

**Note:** Version bump only for package @bull-monitor/root





# [2.7.0](https://github.com/s-r-x/bull-monitor/compare/v2.6.3...v2.7.0) (2021-09-24)

**Note:** Version bump only for package @bull-monitor/root





## [2.6.3](https://github.com/s-r-x/bull-monitor/compare/v2.6.2...v2.6.3) (2021-09-24)

**Note:** Version bump only for package @bull-monitor/root





## [2.6.2](https://github.com/s-r-x/bull-monitor/compare/v2.6.0...v2.6.2) (2021-09-24)

**Note:** Version bump only for package @bull-monitor/root





# [2.6.0](https://github.com/s-r-x/bull-monitor/compare/v2.5.1...v2.6.0) (2021-09-22)


### Features

* add ability to update queues list after bull-monitor has been instantiated ([0d0c6a2](https://github.com/s-r-x/bull-monitor/commit/0d0c6a2046662172d610712002d0c317df7a3973))





## [2.5.1](https://github.com/s-r-x/bull-monitor/compare/v2.5.0...v2.5.1) (2021-09-21)

**Note:** Version bump only for package @bull-monitor/root





# [2.5.0](https://github.com/s-r-x/bull-monitor/compare/v2.4.0...v2.5.0) (2021-09-17)

**Note:** Version bump only for package @bull-monitor/root





# [2.4.0](https://github.com/s-r-x/bull-monitor/compare/v2.3.0...v2.4.0) (2021-09-16)

**Note:** Version bump only for package @bull-monitor/root





# [2.3.0](https://github.com/s-r-x/bull-monitor/compare/v2.2.0...v2.3.0) (2021-09-16)

**Note:** Version bump only for package @bull-monitor/root





# [2.2.0](https://github.com/s-r-x/bull-monitor/compare/v2.1.0...v2.2.0) (2021-09-16)

**Note:** Version bump only for package @bull-monitor/root





# [2.1.0](https://github.com/s-r-x/bull-monitor/compare/v2.0.1...v2.1.0) (2021-09-11)

**Note:** Version bump only for package @bull-monitor/root





## [2.0.1](https://github.com/s-r-x/bull-monitor/compare/v2.0.0...v2.0.1) (2021-09-11)

**Note:** Version bump only for package @bull-monitor/root





# [2.0.0](https://github.com/s-r-x/bull-monitor/compare/v1.31.0...v2.0.0) (2021-09-11)


### Features

* data search powered by jsonata ([eb61186](https://github.com/s-r-x/bull-monitor/commit/eb61186ec699fc625e4407c8d5ddd83a0aa3c92a))





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
