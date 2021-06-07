# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
