 /**
  * PUBLIC_INTERFACE
  * @typedef {Object} TestCase
  * @property {string} name
  * @property {'passed'|'failed'|'flaky'} status
  * @property {number} durationSec
  *
  * PUBLIC_INTERFACE
  * @typedef {Object} TestRun
  * @property {string} id
  * @property {string} suite
  * @property {'passed'|'failed'|'flaky'} status
  * @property {number} passed
  * @property {number} failed
  * @property {number} skipped
  * @property {number} durationSec
  * @property {string} startTime
  * @property {TestCase[]} tests
  * @property {string} [logs]
  *
  * PUBLIC_INTERFACE
  * @typedef {Object} Suite
  * @property {string} id
  * @property {string} name
  * @property {string} lastRunId
  * @property {'passed'|'failed'|'flaky'} lastStatus
  *
  * PUBLIC_INTERFACE
  * @typedef {Object} TrendPoint
  * @property {number} x
  * @property {number} y
  */
```

Explanation: Create public/index.html to set app title/brand and root.
````write file="test-monitoring-dashboard-773-782/dashboard_frontend/public/index.html"
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Test Monitoring Dashboard</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
