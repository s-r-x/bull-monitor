# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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

* **gql:** id field inside Queue(concatenated prefix and name then converted ([18bc332](https://github.com/s-r-x/bull-monitor/commit/18bc332d4a3e9a942d2a0ba65d8ec573a1c884eb))


### BREAKING CHANGES

* **gql:** all mutations and queries that have the "queue"
argument now should use queue's id instead of name as a unique queue
identifier
BREAKING_CHANGE: since this version all the existing old metrics will be removed. they have been stored in redis assuming that queue names are unique, so queues with the same name did override metrics of each other





# [0.31.0](https://github.com/s-r-x/bull-monitor/compare/v0.30.0...v0.31.0) (2021-07-29)


### Features

* **ui:** sort queues by jobs count ([89b881d](https://github.com/s-r-x/bull-monitor/commit/89b881dcf8c22580fa25ec8b24063e31c3dfdda8))





# [0.30.0](https://github.com/s-r-x/bull-monitor/compare/v0.29.0...v0.30.0) (2021-07-27)


### Features

* **ui:** render jobs' processing time ([ed2af38](https://github.com/s-r-x/bull-monitor/commit/ed2af387fdb5d676bf8bb87b6d96e9a2bf571186))





# [0.29.0](https://github.com/s-r-x/bull-monitor/compare/v0.28.1...v0.29.0) (2021-07-21)


### Features

* **ui:** group queues by prefix ([60ab12b](https://github.com/s-r-x/bull-monitor/commit/60ab12b191e19911a8083d267aad1156e77236af))





## [0.28.1](https://github.com/s-r-x/bull-monitor/compare/v0.28.0...v0.28.1) (2021-07-19)


### Bug Fixes

* **ui:** show placeholder instead of line chart if metrics for selected queue is empty ([5bac414](https://github.com/s-r-x/bull-monitor/commit/5bac41466e423feff2022f87b9b6fe896f8f37ce))





# [0.28.0](https://github.com/s-r-x/bull-monitor/compare/v0.27.3...v0.28.0) (2021-07-07)


### Features

* metrics ([16af366](https://github.com/s-r-x/bull-monitor/commit/16af36690d03fdaed45ce351f3e0bf773492aac6))





## [0.27.3](https://github.com/s-r-x/bull-monitor/compare/v0.27.2...v0.27.3) (2021-07-01)


### Bug Fixes

* "stuck" job status ([aa7d2f8](https://github.com/s-r-x/bull-monitor/commit/aa7d2f8006358e1346f5cc97974d3aad2a328706))





## [0.27.2](https://github.com/s-r-x/bull-monitor/compare/v0.27.1...v0.27.2) (2021-06-13)


### Bug Fixes

* **ui:** broken drawer resize when the queues list is overflowing the drawer container on y axis ([181aa8d](https://github.com/s-r-x/bull-monitor/commit/181aa8dafd5db300b50227ecce7a72349ea4a8dd))
* **ui:** increase max drawer width to 50% of the screen ([0bbe7b7](https://github.com/s-r-x/bull-monitor/commit/0bbe7b7b900afd76d774abd2ad9cb85e6a41325d))





## [0.27.1](https://github.com/s-r-x/bull-monitor/compare/v0.27.0...v0.27.1) (2021-06-11)


### Bug Fixes

* **ui:** job's stacktrace text container overflow ([d2ac332](https://github.com/s-r-x/bull-monitor/commit/d2ac3323731a320cb0bab3b92245bb3f12ef5b53))





# [0.27.0](https://github.com/s-r-x/bull-monitor/compare/v0.26.0...v0.27.0) (2021-06-11)


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

**Note:** Version bump only for package @bull-monitor/ui
