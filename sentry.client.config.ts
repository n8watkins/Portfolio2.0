// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://5fe024399bcfe69a9436b0e5fa84c17d@o4507767562371072.ingest.us.sentry.io/4507817472098304',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    Sentry.replayIntegration({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: 'light',
      buttonLabel: 'Report a bug',
      submitButtonLabel: 'Send Bug Report',
      formTitle: 'Bug Report',
      // Position the button on the bottom-left
      themeLight: {
        submitButtonBackground: '#8b5cf6',
        submitButtonBackgroundHover: '#7c3aed',
      },
      themeDark: {
        submitButtonBackground: '#8b5cf6',
        submitButtonBackgroundHover: '#7c3aed',
      },
      // Custom CSS to position button on left
      triggerLabel: 'Report a bug',
      triggerAriaLabel: 'Report a bug to our team',
    }),
  ],
})
