# @bull-monitor/cli

Command line interface for [bull-monitor](https://github.com/s-r-x/bull-monitor)

## Installation

```sh
npm i -g @bull-monitor/cli
```

## Usage

```sh
Usage: bull-monitor [options]

Options:
  --redis-uri <uri>                            Redis URI (default: "redis://localhost:6379")
  -q, --queue <queues...>                      Queue names
  --metrics-collect-interval-seconds <number>  Metric collection interval in seconds (default: 3600(1 hour))
  -p, --port <number>                          port number (default: "3000")
  --max-metrics <number>                       Max metrics (default: "100")
  -h, --help                                   display help for command

```
