# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [5.1.0](https://github.com/s-r-x/bull-monitor/compare/v5.0.3...v5.1.0) (2023-01-13)


### Features

* **cli:** add optional redis prefix option for bull/bullmq ([a5cf3b4](https://github.com/s-r-x/bull-monitor/commit/a5cf3b4dcf85b1d14d95a56e9c77401a3ead7a39))





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


### Features

* **cli:** bullmq support ([8bff4b9](https://github.com/s-r-x/bull-monitor/commit/8bff4b9f6e2f42df5443fb07fe05f188e18dc554))





# [4.0.0](https://github.com/s-r-x/bull-monitor/compare/v3.5.0...v4.0.0) (2022-03-02)


### Features

* bump apollo server to the latest version ([21e39e7](https://github.com/s-r-x/bull-monitor/commit/21e39e7b464f2f41006565ee282fb4fe23298a4e))
* compile to ES2020 ([384d113](https://github.com/s-r-x/bull-monitor/commit/384d1133700dd91475db318b94217e438bd6bb51))


### BREAKING CHANGES

* app should be passed to monitor.init method when using
fastify adapter
* drop support for for node<12





# [3.5.0](https://github.com/s-r-x/bull-monitor/compare/v3.4.1...v3.5.0) (2022-03-02)


### Features

* **bullmq:** support object progress ([4d47b08](https://github.com/s-r-x/bull-monitor/commit/4d47b08cd0dc03a0e8546e0e2985369aa4f44de3))





## [3.4.1](https://github.com/s-r-x/bull-monitor/compare/v3.4.0...v3.4.1) (2022-03-01)

**Note:** Version bump only for package @bull-monitor/entrypoint





# [3.4.0](https://github.com/s-r-x/bull-monitor/compare/v3.3.1...v3.4.0) (2022-03-01)


### Features

* **express:** init params to disable body parser, express5 specific configuration ([5069323](https://github.com/s-r-x/bull-monitor/commit/5069323bfdf17dbf9206a484e2d176bca18108e2))





## [3.3.1](https://github.com/s-r-x/bull-monitor/compare/v3.3.0...v3.3.1) (2022-01-21)


### Bug Fixes

* handle jobs with nil timestamp ([efc78d7](https://github.com/s-r-x/bull-monitor/commit/efc78d7ed8cfe4c09e6bb4acf69581ae4e387c92))





# [3.3.0](https://github.com/s-r-x/bull-monitor/compare/v3.2.0...v3.3.0) (2022-01-12)


### Features

* **ui:** redesign "queue actions" section ([2343f12](https://github.com/s-r-x/bull-monitor/commit/2343f12b2fc980d162ca36319c33a57409132813))





# [3.2.0](https://github.com/s-r-x/bull-monitor/compare/v3.1.0...v3.2.0) (2022-01-11)


### Features

* **ui:** combine "timeline" popover and "options" popover into a single "info" popover ([e9467b6](https://github.com/s-r-x/bull-monitor/commit/e9467b679fb6b3f663198c530dfa46acd17e91b7))





# [3.1.0](https://github.com/s-r-x/bull-monitor/compare/v3.0.0...v3.1.0) (2022-01-11)


### Bug Fixes

* **ui:** prefetch redis data on hover only when there is no cached data ([6617cfa](https://github.com/s-r-x/bull-monitor/commit/6617cfae551f59305baac71e96eaefa3498d8ce7))


### Features

* **ui:** change active queue status on status badge click in drawer ([fd0b928](https://github.com/s-r-x/bull-monitor/commit/fd0b92857131071a4a11e9463cd8f2574d2fc5ac))





# [3.0.0](https://github.com/s-r-x/bull-monitor/compare/v3.0.0-alpha.3...v3.0.0) (2022-01-11)

**Note:** Version bump only for package @bull-monitor/entrypoint





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


### Bug Fixes

* **ui:** hide "remove jobs by pattern" button for bullmq queues ([d434f64](https://github.com/s-r-x/bull-monitor/commit/d434f649abacb4bdb2dab462608738a169f5f8ab))


### Features

* bullmq support ([86fc69e](https://github.com/s-r-x/bull-monitor/commit/86fc69eddd08c129cf8a9154e2233e456413c43c))





# [2.16.0](https://github.com/s-r-x/bull-monitor/compare/v2.15.1...v2.16.0) (2021-12-16)


### Features

* mui5 ([6f99715](https://github.com/s-r-x/bull-monitor/commit/6f9971524d75c981e7b128458948843b4061d472))





## [2.15.1](https://github.com/s-r-x/bull-monitor/compare/v2.15.0...v2.15.1) (2021-12-13)


### Performance Improvements

* prefetch redis info on redis icon hover ([ee53c81](https://github.com/s-r-x/bull-monitor/commit/ee53c810e6a7a3096ee080d6f9deb17d07466e6b))





# [2.15.0](https://github.com/s-r-x/bull-monitor/compare/v2.14.1...v2.15.0) (2021-12-06)


### Features

* min/max processing time metrics ([a22c234](https://github.com/s-r-x/bull-monitor/commit/a22c234709d175963ba0f545f6364ed12ce0743b))





## [2.14.1](https://github.com/s-r-x/bull-monitor/compare/v2.14.0...v2.14.1) (2021-11-29)


### Bug Fixes

* invalid drawer width after resize to max or min values on low-end devices ([5079d77](https://github.com/s-r-x/bull-monitor/commit/5079d77e2dd114ebb52047a3fe99a37eb532aacb))
* stretch queues filter width to match the drawer width ([e5c9385](https://github.com/s-r-x/bull-monitor/commit/e5c9385010103b3024c9d1b4119f54c73bb18027))
* table viewport overflow on medium size devices ([5a3b327](https://github.com/s-r-x/bull-monitor/commit/5a3b32755c24f0e7a1e31324b6869fca81c3913a))





# [2.14.0](https://github.com/s-r-x/bull-monitor/compare/v2.13.0...v2.14.0) (2021-11-27)


### Features

* open timeline popover on click instead of hover to allow copy return value from one ([86bcaff](https://github.com/s-r-x/bull-monitor/commit/86bcaff9ff4b3816652fe617826eceb6429c671f))





# [2.13.0](https://github.com/s-r-x/bull-monitor/compare/v2.12.1...v2.13.0) (2021-11-08)


### Bug Fixes

* omit timestamp from incoming options on completed jobs requeue ([9b55e0e](https://github.com/s-r-x/bull-monitor/commit/9b55e0eae07b6c4c331e7e9adf99a96686c8fe27))


### Features

* **ui:** requeue completed jobs ([6213a1c](https://github.com/s-r-x/bull-monitor/commit/6213a1c3646180f9b4c7882c49716c4e3fe9a0a0))
* cli ([49f7f28](https://github.com/s-r-x/bull-monitor/commit/49f7f2843be79dccbb99faf5944105c006a28428))





## [2.12.1](https://github.com/s-r-x/bull-monitor/compare/v2.12.0...v2.12.1) (2021-11-01)


### Bug Fixes

* **ui:** disable all mutations for readonly queues ([8df6d5d](https://github.com/s-r-x/bull-monitor/commit/8df6d5dec8aa16ea9e0fcf5bb086c19f7ba8d841))





# [2.12.0](https://github.com/s-r-x/bull-monitor/compare/v2.11.0...v2.12.0) (2021-10-26)


### Features

* **gql:** readonly queues ([2905375](https://github.com/s-r-x/bull-monitor/commit/2905375eccdc62512585cd522220f5d255657a3e))
* **ui:** readonly queues ([fae1a90](https://github.com/s-r-x/bull-monitor/commit/fae1a907b9670b4a01b28af59081e5bd676025ed))





# [2.11.0](https://github.com/s-r-x/bull-monitor/compare/v2.10.0...v2.11.0) (2021-10-07)


### Features

* **ui:** move submit button in AddJobModal and DataEditorModal to the left ([61c9098](https://github.com/s-r-x/bull-monitor/commit/61c90989dc7ee6b17e96cd641a84357454ba117a))





# [2.10.0](https://github.com/s-r-x/bull-monitor/compare/v2.9.0...v2.10.0) (2021-10-07)


### Features

* "processing time" metric ([0f6d9e7](https://github.com/s-r-x/bull-monitor/commit/0f6d9e70ed871c2cbf7cb1e8cf660e069912f003))





# [2.9.0](https://github.com/s-r-x/bull-monitor/compare/v2.8.0...v2.9.0) (2021-10-06)


### Bug Fixes

* **ui:** add minWidth to RemoveJobsModal ([e2dcd7e](https://github.com/s-r-x/bull-monitor/commit/e2dcd7e45819d5151a6e0a054d4e69cff7552717))
* **ui:** correct width for JobLogsModal ([d812577](https://github.com/s-r-x/bull-monitor/commit/d8125775b27bf5b36872e2a18e94e00690f12cda))
* **ui:** correct width for RedisInfoModal ([a35204d](https://github.com/s-r-x/bull-monitor/commit/a35204dec7d156c0c6a958c8b1b99a6531439cd2))


### Features

* **ui:** AddJobModal redesign ([364c2f2](https://github.com/s-r-x/bull-monitor/commit/364c2f2fab85f89c46a044b58743959f7eb5888b))
* **ui:** DataEditorModal redesign ([a2f9da7](https://github.com/s-r-x/bull-monitor/commit/a2f9da701478c76598c4c58926060cd294e4c490))





# [2.8.0](https://github.com/s-r-x/bull-monitor/compare/v2.7.1...v2.8.0) (2021-10-06)


### Bug Fixes

* **root:** disable gqlPlayground and gqlIntrospection in production by default ([131f71d](https://github.com/s-r-x/bull-monitor/commit/131f71d9a62909297e9da512c8832135be5839fd))


### Features

* **ui:** format returnValue when importing jobs as json ([4ade76c](https://github.com/s-r-x/bull-monitor/commit/4ade76c6f914931c1d6d81fd0ffa4f82049765e9))


### Performance Improvements

* **root:** convert queues to map when initializing the base class ([fd7f94f](https://github.com/s-r-x/bull-monitor/commit/fd7f94fd9fb9a1ce3b7204f7224448e41d5fc374))





## [2.7.1](https://github.com/s-r-x/bull-monitor/compare/v2.7.0...v2.7.1) (2021-09-24)


### Bug Fixes

* timestamp in metrics chart tooltip is not visible in dark mode, and should be formatted to human readable date ([2881730](https://github.com/s-r-x/bull-monitor/commit/288173095033d87c72c5757194e4fad4e1c79baf))





# [2.7.0](https://github.com/s-r-x/bull-monitor/compare/v2.6.3...v2.7.0) (2021-09-24)


### Features

* **ui:** add "format" button to text editors ([15b7872](https://github.com/s-r-x/bull-monitor/commit/15b78723e457d3b1d0aeca3a4f5a482a401550bd))





## [2.6.3](https://github.com/s-r-x/bull-monitor/compare/v2.6.2...v2.6.3) (2021-09-24)

**Note:** Version bump only for package @bull-monitor/entrypoint





## [2.6.2](https://github.com/s-r-x/bull-monitor/compare/v2.6.0...v2.6.2) (2021-09-24)

**Note:** Version bump only for package @bull-monitor/entrypoint





# [2.6.0](https://github.com/s-r-x/bull-monitor/compare/v2.5.1...v2.6.0) (2021-09-22)


### Features

* add ability to update queues list after bull-monitor has been instantiated ([0d0c6a2](https://github.com/s-r-x/bull-monitor/commit/0d0c6a2046662172d610712002d0c317df7a3973))





## [2.5.1](https://github.com/s-r-x/bull-monitor/compare/v2.5.0...v2.5.1) (2021-09-21)


### Bug Fixes

* clean command doesn't update the drawer inline indicator when there are only one type of jobs in selected queue ([edef20f](https://github.com/s-r-x/bull-monitor/commit/edef20f9ff37f845fbfe2a74367c6cc32be622d4))





# [2.5.0](https://github.com/s-r-x/bull-monitor/compare/v2.4.0...v2.5.0) (2021-09-17)


### Features

* **ui:** drawer. replace statuses pie with inline indicator ([20fec69](https://github.com/s-r-x/bull-monitor/commit/20fec69b816401addfd0dd55631691c09a79a166))
* **ui:** remove show statuses pie preference ([6185c7d](https://github.com/s-r-x/bull-monitor/commit/6185c7d312f9b1c3dd88cdfc887eb07fdd5210c2))





# [2.4.0](https://github.com/s-r-x/bull-monitor/compare/v2.3.0...v2.4.0) (2021-09-16)


### Features

* **ui:** export the whole list of jobs(that matches the active query(queue, status, data search, job id, etc.)) as JSON ([f091068](https://github.com/s-r-x/bull-monitor/commit/f0910689008ad379d9c36df6fe7cb758e012b130))





# [2.3.0](https://github.com/s-r-x/bull-monitor/compare/v2.2.0...v2.3.0) (2021-09-16)


### Features

* **ui:** render data search input in the same line as "Job ID" and "Order" and take the whole available space ([35b80d8](https://github.com/s-r-x/bull-monitor/commit/35b80d824f07b00335b71243b9228302a167f62f))





# [2.2.0](https://github.com/s-r-x/bull-monitor/compare/v2.1.0...v2.2.0) (2021-09-16)


### Features

* **ui:** "show statuses pie in drawer" preference / show pie only if there are at least two different non zero statuses in job ([868b2c4](https://github.com/s-r-x/bull-monitor/commit/868b2c4cb654ca6fe85a2dd1ccd9d7ae0c489187))





# [2.1.0](https://github.com/s-r-x/bull-monitor/compare/v2.0.1...v2.1.0) (2021-09-11)


### Features

* **ui:** drawer. statuses pie chart next to every queue ([18703cf](https://github.com/s-r-x/bull-monitor/commit/18703cfb7c32d1fdbc6322dcd97b4ede8439802f))
* **ui:** more distinguishable colors for statuses ([5e1f064](https://github.com/s-r-x/bull-monitor/commit/5e1f0649e995af39e762aeebd15dd048d5ca4870))





## [2.0.1](https://github.com/s-r-x/bull-monitor/compare/v2.0.0...v2.0.1) (2021-09-11)

**Note:** Version bump only for package @bull-monitor/entrypoint





# [2.0.0](https://github.com/s-r-x/bull-monitor/compare/v1.31.0...v2.0.0) (2021-09-11)


### Features

* data search powered by jsonata ([eb61186](https://github.com/s-r-x/bull-monitor/commit/eb61186ec699fc625e4407c8d5ddd83a0aa3c92a))





# [1.31.0](https://github.com/s-r-x/bull-monitor/compare/v1.3.0...v1.31.0) (2021-08-30)


### Features

* **ui:** drawer. remove opacity and negative offset in counters ([8fd43e8](https://github.com/s-r-x/bull-monitor/commit/8fd43e81cc3103ca0b4c2d62a521bf67de0e9449))





# [1.3.0](https://github.com/s-r-x/bull-monitor/compare/v1.2.0...v1.3.0) (2021-08-26)


### Features

* **ui:** make JobStatusChip transparent when there are no jobs in it ([5ef1388](https://github.com/s-r-x/bull-monitor/commit/5ef138881a7edcd8985652248ca160415ea2457a))





# [1.2.0](https://github.com/s-r-x/bull-monitor/compare/v1.1.0...v1.2.0) (2021-08-23)


### Bug Fixes

* **ui:** pages count is always zero if search by job id is not empty ([9c102ad](https://github.com/s-r-x/bull-monitor/commit/9c102adc1d5c76427e6ac41b1911df2676b9e646))


### Features

* **ui:** add more "per page" options to the jobs list ([137e18e](https://github.com/s-r-x/bull-monitor/commit/137e18e85dd249d3256c1f9b2e155e6f544ea647))





# [1.1.0](https://github.com/s-r-x/bull-monitor/compare/v1.0.0...v1.1.0) (2021-08-11)


### Features

* **ui:** drawer. inline jobs count ([30940da](https://github.com/s-r-x/bull-monitor/commit/30940da920eea482eaf7c8c7f3cbb02c452807a5))





# [1.0.0](https://github.com/s-r-x/bull-monitor/compare/v0.31.0...v1.0.0) (2021-08-03)


### Features

* **gql:** id field inside Queue(concatenated prefix and name then converted to base64)
* **gql:** queues now can have the same name, if their keyPrefixes are different


### BREAKING CHANGES
- all mutations and queries that have the "queue"
argument now should use queue's id instead of name as a unique queue
identifier
- since this version all the existing old metrics will be removed. they have been stored in redis assuming that queue names are unique, so queues with the same name did override metrics of each other







# [0.31.0](https://github.com/s-r-x/bull-monitor/compare/v0.30.0...v0.31.0) (2021-07-29)


### Features

* **ui:** sort queues by jobs count ([89b881d](https://github.com/s-r-x/bull-monitor/commit/89b881dcf8c22580fa25ec8b24063e31c3dfdda8))





# [0.30.0](https://github.com/s-r-x/bull-monitor/compare/v0.29.0...v0.30.0) (2021-07-27)


### Features

* **gql:** processingTime Job field ([841fb7e](https://github.com/s-r-x/bull-monitor/commit/841fb7eb29857cedff06455554ca262697b1b3a4))
* **ui:** render jobs' processing time ([ed2af38](https://github.com/s-r-x/bull-monitor/commit/ed2af387fdb5d676bf8bb87b6d96e9a2bf571186))





# [0.29.0](https://github.com/s-r-x/bull-monitor/compare/v0.28.1...v0.29.0) (2021-07-21)


### Features

* **gql:** add keyPrefix field in Queue ([7fd7bce](https://github.com/s-r-x/bull-monitor/commit/7fd7bceb267bc080c042795f142421de3cb2ed09))
* **ui:** group queues by prefix ([60ab12b](https://github.com/s-r-x/bull-monitor/commit/60ab12b191e19911a8083d267aad1156e77236af))





## [0.28.1](https://github.com/s-r-x/bull-monitor/compare/v0.28.0...v0.28.1) (2021-07-19)


### Bug Fixes

* **ui:** show placeholder instead of line chart if metrics for selected queue is empty ([5bac414](https://github.com/s-r-x/bull-monitor/commit/5bac41466e423feff2022f87b9b6fe896f8f37ce))





# [0.28.0](https://github.com/s-r-x/bull-monitor/compare/v0.27.3...v0.28.0) (2021-07-07)


### Features

* metrics ([16af366](https://github.com/s-r-x/bull-monitor/commit/16af36690d03fdaed45ce351f3e0bf773492aac6))





## [0.27.3](https://github.com/s-r-x/bull-monitor/compare/v0.27.2...v0.27.3) (2021-07-01)


### Bug Fixes

* **gql:** Cannot return null for non-nullable field Query.jobs ([e349291](https://github.com/s-r-x/bull-monitor/commit/e3492916085c83530fb38c57942f7b84d8b379f8))
* "stuck" job status ([aa7d2f8](https://github.com/s-r-x/bull-monitor/commit/aa7d2f8006358e1346f5cc97974d3aad2a328706))





## [0.27.2](https://github.com/s-r-x/bull-monitor/compare/v0.27.1...v0.27.2) (2021-06-13)


### Bug Fixes

* **ui:** broken drawer resize when the queues list is overflowing the drawer container on y axis ([181aa8d](https://github.com/s-r-x/bull-monitor/commit/181aa8dafd5db300b50227ecce7a72349ea4a8dd))
* **ui:** increase max drawer width to 50% of the screen ([0bbe7b7](https://github.com/s-r-x/bull-monitor/commit/0bbe7b7b900afd76d774abd2ad9cb85e6a41325d))





## [0.27.1](https://github.com/s-r-x/bull-monitor/compare/v0.27.0...v0.27.1) (2021-06-11)


### Bug Fixes

* **ui:** job's stacktrace text container overflow ([d2ac332](https://github.com/s-r-x/bull-monitor/commit/d2ac3323731a320cb0bab3b92245bb3f12ef5b53))





# [0.27.0](https://github.com/s-r-x/bull-monitor/compare/v0.26.0...v0.27.0) (2021-06-11)


### Bug Fixes

* **gql:** jobs query. validate limit and offset args ([1a43a06](https://github.com/s-r-x/bull-monitor/commit/1a43a0654c461bad00ede1de917be73cd399dce7))


### Features

* **ui:** job's stacktrace ([d5ba4d3](https://github.com/s-r-x/bull-monitor/commit/d5ba4d31425268e750aa569dcb8c645b192f2bf7))





# [0.26.0](https://github.com/s-r-x/bull-monitor/compare/v0.25.2...v0.26.0) (2021-06-10)


### Bug Fixes

* **ui:** increase maximum workspaces size to 20 ([b1bd670](https://github.com/s-r-x/bull-monitor/commit/b1bd670f565a048cfe7b9b913b88ab4be72185d6))


### Features

* **ui:** sharing ([bc053c0](https://github.com/s-r-x/bull-monitor/commit/bc053c0491c7196c28c20223a1d5f615a5fc005d))


### Performance Improvements

* **ui:** skip mock data generation in production ([f4b6a33](https://github.com/s-r-x/bull-monitor/commit/f4b6a3304a0ad000e3eab28e9b88bd830d70182f))





## [0.25.2](https://github.com/s-r-x/bull-monitor/compare/v0.25.1...v0.25.2) (2021-06-09)


### Bug Fixes

* **ui:** remove page from pagination store. use pageAtom for pagination instead ([d0b0692](https://github.com/s-r-x/bull-monitor/commit/d0b06927f35f853cb11dd4aeb79361ef67de3c87))





## [0.25.1](https://github.com/s-r-x/bull-monitor/compare/v0.25.0...v0.25.1) (2021-06-09)


### Bug Fixes

* **ui:** memoization issue on the first page visit when there are no workspaces yet ([39f37c7](https://github.com/s-r-x/bull-monitor/commit/39f37c7c05ef84e7de982d1931c0929fbbfcbc1f))





# [0.25.0](https://github.com/s-r-x/bull-monitor/compare/v0.24.0...v0.25.0) (2021-06-09)


### Features

* **ui:** workspaces ([3f96170](https://github.com/s-r-x/bull-monitor/commit/3f96170d6bab03b669493b9dd3f33ece502a900f))





# [0.24.0](https://github.com/s-r-x/bull-monitor/compare/v0.23.0...v0.24.0) (2021-06-07)


### Features

* **ui:** persist per page option ([ddaadcb](https://github.com/s-r-x/bull-monitor/commit/ddaadcb9fbe032f1bec66a8d6514554e31f71453))





# [0.23.0](https://github.com/s-r-x/bull-monitor/compare/v0.22.0...v0.23.0) (2021-06-07)


### Features

* **ui:** dynamic page title based on selected queue ([298809b](https://github.com/s-r-x/bull-monitor/commit/298809b748475960f5ddefc31c464c35ab5406ef))





# [0.22.0](https://github.com/s-r-x/bull-monitor/compare/v0.21.1...v0.22.0) (2021-06-07)


### Bug Fixes

* **ui:** set body cursor style to ew-resize while resizing the drawer ([89b6d33](https://github.com/s-r-x/bull-monitor/commit/89b6d3348698699760553e1c4b5fb27cf23b6959))
* **ui:** set body userSelect style to none while resizing the drawer ([1b50d21](https://github.com/s-r-x/bull-monitor/commit/1b50d21e1fdf56cabe2e7754f74f87ad366fc786))
* greater z-index on Codemirror-tooltip element ([c76061c](https://github.com/s-r-x/bull-monitor/commit/c76061c0cee48e7eaf9005abba6d3b27a7d31040))


### Features

* add resizable ability to Drawer component ([defcccb](https://github.com/s-r-x/bull-monitor/commit/defcccbc3c5ca006a91c76265d426d844cbe55ae))





## [0.21.1](https://github.com/s-r-x/bull-monitor/compare/v0.21.0...v0.21.1) (2021-05-25)


### Bug Fixes

* **ui:** SimpleJsonView. height -> maxHeight ([0dd35ce](https://github.com/s-r-x/bull-monitor/commit/0dd35ce91c2fd5663523d00b399191c7edce7dbb))





# [0.21.0](https://github.com/s-r-x/bull-monitor/compare/v0.20.0...v0.21.0) (2021-05-25)


### Bug Fixes

* **ui:** remove autocomplete from data search inputs ([abb2af3](https://github.com/s-r-x/bull-monitor/commit/abb2af309bee84efd8fd5484c668d4f99dead4b9))
* **ui:** reset page on data search key/term change ([e08708a](https://github.com/s-r-x/bull-monitor/commit/e08708a9ce8dae8ef9b9155f56cf6ea86a9e76ac))
* **ui:** scroll jump after close hoverable popovers ([1d1cc44](https://github.com/s-r-x/bull-monitor/commit/1d1cc44f661ed634d8d045bf3cc1de4d3665dc29))


### Features

* **gql:** data text search ([6b64103](https://github.com/s-r-x/bull-monitor/commit/6b64103fadfb5492a6ce0e4d27f84dcc8b56b9fc))
* **ui:** "Disable jobs polling while performing a text search" preference ([e3fd3a0](https://github.com/s-r-x/bull-monitor/commit/e3fd3a05132194fee6f0b3e1b7be2f22911b615c))
* **ui:** data text search ([606df86](https://github.com/s-r-x/bull-monitor/commit/606df86ae0ba36a8c8a2d5072c218618f924b6cc))
* **ui:** fetch and render data preference. when enabled it will fetch data(in addition to other fields) in jobs table query and render it below ([8d09fd6](https://github.com/s-r-x/bull-monitor/commit/8d09fd6ee044fb3f983110cd707caff63610f5ac))





# [0.20.0](https://github.com/s-r-x/bull-monitor/compare/v0.19.0...v0.20.0) (2021-05-20)


### Features

* **ui:** options/timeline popovers in jobs table now appear from mouseover event instead of click and do not block scroll ([7013bce](https://github.com/s-r-x/bull-monitor/commit/7013bce7cecfe668584b6eb9d43c80e83a30fc17))





# [0.19.0](https://github.com/s-r-x/bull-monitor/compare/v0.18.0...v0.19.0) (2021-05-19)


### Features

* **ui:** render statuses on the jobs screen in the same order as in drawer ([824da87](https://github.com/s-r-x/bull-monitor/commit/824da871ef832fa23770031b18ac565a8c50ed0f))
* **ui:** selectable statuses in drawer ([2346724](https://github.com/s-r-x/bull-monitor/commit/2346724797ad00b32f196287b9cbb1cd792e3161))





# [0.18.0](https://github.com/s-r-x/bull-monitor/compare/v0.17.0...v0.18.0) (2021-05-18)


### Bug Fixes

* **ui:** expand/collapse buttons in drawer is always at the bottom now ([f7ba70f](https://github.com/s-r-x/bull-monitor/commit/f7ba70fe7908b08747a64febff180e5a856eb6de))
* **ui:** Rename enable polling/disable polling to enable jobs polling/disable jobs polling ([50ac80d](https://github.com/s-r-x/bull-monitor/commit/50ac80d694c21b0c24285318d91b7297c03bdb84))


### Features

* **ui:** remove "Expand jobs count by default" preference. Instead collapsed/expanded state of every queue in drawer is now persisted to localstorage ([f18b535](https://github.com/s-r-x/bull-monitor/commit/f18b5359b5ccdd080d6d1e4dec931412109adeb2))





# [0.17.0](https://github.com/s-r-x/bull-monitor/compare/v0.16.0...v0.17.0) (2021-05-18)


### Features

* **gql:** add ids arg in jobs query. When specified query will return jobs with every matched id. It has priority overother args(id, order, limit, offset, status) ([88985b2](https://github.com/s-r-x/bull-monitor/commit/88985b201e127105dfcf26ffaddc4825457189a0))
* **ui:** save jobs as json ([1d8f3a2](https://github.com/s-r-x/bull-monitor/commit/1d8f3a2999fdcc7c4544cf9b9baab11785eb28fc))





# [0.16.0](https://github.com/s-r-x/bull-monitor/compare/v0.15.0...v0.16.0) (2021-05-17)


### Features

* **ui:** "Expand jobs count by default" preference ([9990a35](https://github.com/s-r-x/bull-monitor/commit/9990a35ecd1927ba429fede3775234ef8e49e2ac))
* **ui:** collapsible jobs statuses for every queue in drawer ([f50cf39](https://github.com/s-r-x/bull-monitor/commit/f50cf39dfdcf644f96b5c50ab34b88464b9c8288))
* **ui:** colors for different job statuses ([c706bee](https://github.com/s-r-x/bull-monitor/commit/c706bee9ec34022ee8e4c7f70b726dbea0c31953))
* **ui:** increase drawer width ([1f522ae](https://github.com/s-r-x/bull-monitor/commit/1f522ae7e9f272d3f5f089db81e6e96085b85465))
* **ui:** mass expand/collapse buttons in drawer ([36102c9](https://github.com/s-r-x/bull-monitor/commit/36102c9a0b772b34ef91f14cb732d9d7c518efbd))
* **ui:** show pause icon instead of standard one in drawer if queue is paused ([e1d2cd0](https://github.com/s-r-x/bull-monitor/commit/e1d2cd0d6117abe181678dc64f01fdedcf0984fa))


### Performance Improvements

* **ui:** remove calling persisted stores in the root component. zustand restores them without it ([d5b3809](https://github.com/s-r-x/bull-monitor/commit/d5b38091bb40aef19d2ea17aca2e44c6c7c1c5ef))





# [0.15.0](https://github.com/s-r-x/bull-monitor/compare/v0.14.0...v0.15.0) (2021-05-16)


### Features

* **ui:** filter queues by name ([da5282b](https://github.com/s-r-x/bull-monitor/commit/da5282b2e9e85a2c6b3c7fdaec7f527a8baa4853))


### Performance Improvements

* **ui:** wrap JobsScreen in memo ([c654501](https://github.com/s-r-x/bull-monitor/commit/c654501d34d738304a8f26e292e27061d02ce94b))





# [0.14.0](https://github.com/s-r-x/bull-monitor/compare/v0.13.0...v0.14.0) (2021-05-16)


### Bug Fixes

* **ui:** change type "data" from String to JSON in updateJobData mutation ([d9aa684](https://github.com/s-r-x/bull-monitor/commit/d9aa6842d25f87664359058a4eb18458e2ca6161))
* **ui:** correct toast after successful  moveToFailed mutation ([d81e9d2](https://github.com/s-r-x/bull-monitor/commit/d81e9d25c15db2d9eee395e954e44646f2b15d3e))


### Features

* **ui:** bulk remove/retry ([7f8e6be](https://github.com/s-r-x/bull-monitor/commit/7f8e6bee210ae547090a8450d4560cda7449d01d))





# 0.13.0 (2021-05-14)


### Features

* **gql:** removeJobs mutation ([3d0def5](https://github.com/s-r-x/bull-monitor/commit/3d0def54ce8d3c318b98d130ecf78c0352d17210))
* **gql:** retryJobs mutation ([854f19d](https://github.com/s-r-x/bull-monitor/commit/854f19db3f8dada096ab17bd81e98b99b5e49236))
