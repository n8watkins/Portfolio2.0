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
      // Standard theming: light modal in light mode, dark modal in dark mode
      themeLight: {
        // Light modal for light mode
        background: '#ffffff',
        backgroundHover: '#f8fafc',
        foreground: '#1e293b',
        border: '#e2e8f0',
        submitButtonBackground: '#8b5cf6',
        submitButtonBackgroundHover: '#7c3aed',
        submitButtonForeground: '#ffffff',
        cancelButtonBackground: '#f1f5f9',
        cancelButtonBackgroundHover: '#e2e8f0',
        cancelButtonForeground: '#64748b',
      },
      themeDark: {
        // Dark modal for dark mode
        background: '#1e293b',
        backgroundHover: '#334155',
        foreground: '#f8fafc',
        border: '#475569',
        submitButtonBackground: '#8b5cf6',
        submitButtonBackgroundHover: '#7c3aed',
        submitButtonForeground: '#ffffff',
        cancelButtonBackground: '#475569',
        cancelButtonBackgroundHover: '#64748b',
        cancelButtonForeground: '#f8fafc',
      },
      // Hide on mobile/small screens to avoid conflicts
      isActive: () => window.innerWidth > 768,
      // Show only icon until 1030px, then show text
      buttonLabel: '',
      triggerLabel: '',
      triggerAriaLabel: 'Report a bug to our team',
    }),
  ],
})
