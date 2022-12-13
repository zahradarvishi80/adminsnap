import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
Sentry.init({
    dsn: "https://glet_71ac9d2b6addb6d88d5b13d0a8ef1435@git.taban.xyz/api/v4/error_tracking/collector/36",
    integrations: [new BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
});
