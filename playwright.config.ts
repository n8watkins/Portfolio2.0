import { defineConfig, devices } from '@playwright/test'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '.env.local') })

/**
 * Playwright configuration for Web Vitals testing
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: [
    ['html'],
    ['list'],
  ],

  // Shared settings for all the projects below
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: 'http://localhost:3000',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'retain-on-failure',
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Test against mobile viewports
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // Run your local dev server before starting the tests
  webServer: {
    command: 'NODE_ENV=test npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
    env: {
      NODE_ENV: 'test',
      // Pass all environment variables from .env.local to the test server
      // Filter out undefined values to satisfy TypeScript
      ...(process.env.RESEND_API_KEY && { RESEND_API_KEY: process.env.RESEND_API_KEY }),
      ...(process.env.CONTACT_EMAIL_TO && { CONTACT_EMAIL_TO: process.env.CONTACT_EMAIL_TO }),
      ...(process.env.CONTACT_EMAIL_FROM && { CONTACT_EMAIL_FROM: process.env.CONTACT_EMAIL_FROM }),
      ...(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && { NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY }),
      ...(process.env.RECAPTCHA_SECRET_KEY && { RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY }),
      ...(process.env.NEXT_PUBLIC_GA_ID && { NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID }),
      ...(process.env.NEXT_PUBLIC_SITE_URL && { NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL }),
      ...(process.env.NEXT_PUBLIC_VERSION && { NEXT_PUBLIC_VERSION: process.env.NEXT_PUBLIC_VERSION }),
    },
  },
})
