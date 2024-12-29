interface EmailResponse {
  subject: string;
  body: string;
  analysis?: {
    // ... other fields ...
    qualityChecks: {
      relevanceTest: boolean;
      authenticityTest: boolean;
      languageTest: boolean;
      formatTest: boolean;
      toneTest: boolean;
    };
    // ... rest of the interface
  };
}