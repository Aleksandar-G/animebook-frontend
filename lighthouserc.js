module.exports = {
  ci: {
    collect: {
      url: [
        "https://animebook-frontend.vercel.app/register",
        "https://animebook-frontend.vercel.app/login",
      ],
      settings: {
        chromeFlags: "--no-sandbox",
        psiStrategy: "desktop",
        //emulatedFormFactor: "desktop",
      },
      numberOfRuns: 3,
    },
    assert: {
      preset: "lighthouse:desktop",
      assertions: {
        "unused-css-rules": "off",
        "csp-xss": "off",
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.9 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
