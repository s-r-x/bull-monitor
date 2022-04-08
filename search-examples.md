## bull-monitor search

Let's take this job as an example:

```json
{
  "name": "my-job",
  "data": {
    "hello": {
      "to": "world"
    }
  },
  "opts": {
    "attempts": 2,
    "delay": 1000
  }
}
```
To find a job by data we can utilize this query:
```
data.*.hello.to="world"
```
By name:
```
name="my-job"
```
One or more attempts:
```
opts.attempts >= 1
```
Put it all together:
```
data.*.hello.to="world" and name="my-job" or opts.attempts >= 1
```

