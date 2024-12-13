// schema.ts
export const combinedProcessingSchema = {
  name: "process_and_generate_email",
  description: "Process job and resume data, then generate an introduction email",
  parameters: {
    type: "object",
    required: ["processedData", "email"],
    properties: {
      processedData: {
        type: "object",
        required: ["requirements", "experience"],
        properties: {
          requirements: {
            type: "array",
            items: { type: "string" },
            description: "Key requirements from job description"
          },
          experience: {
            type: "object",
            required: ["role", "achievements"],
            properties: {
              role: { type: "string" },
              achievements: {
                type: "array",
                items: {
                  type: "object",
                  required: ["metric", "date", "scope"],
                  properties: {
                    metric: { type: "string" },
                    date: { type: "string" },
                    scope: { type: "string" }
                  }
                }
              }
            }
          }
        }
      },
      email: {
        type: "object",
        required: ["subject", "body", "analysis"],
        properties: {
          subject: { type: "string" },
          body: { type: "string" },
          analysis: {
            type: "object",
            required: ["requirements", "matches", "experienceLevel", "qualityChecks", "metrics"],
            properties: {
              requirements: {
                type: "array",
                items: { type: "string" }
              },
              matches: {
                type: "array",
                items: {
                  type: "object",
                  required: ["requirement", "evidence", "confidence"],
                  properties: {
                    requirement: { type: "string" },
                    evidence: { type: "string" },
                    confidence: { type: "number" }
                  }
                }
              },
              experienceLevel: {
                type: "string",
                enum: ["DIRECT_MATCH", "RELATED", "CAREER_CHANGE", "NEW_DIRECTION"]
              },
              qualityChecks: {
                type: "object",
                required: ["relevanceTest", "authenticityTest", "languageTest", "formatTest", "toneTest", "nameHandlingTest"],
                properties: {
                  relevanceTest: { type: "boolean" },
                  authenticityTest: { type: "boolean" },
                  languageTest: { type: "boolean" },
                  formatTest: { type: "boolean" },
                  toneTest: { type: "boolean" },
                  nameHandlingTest: { type: "boolean" }
                }
              },
              metrics: {
                type: "object",
                required: ["wordCount", "uniquePhrases", "toneMatch", "specificEvidence"],
                properties: {
                  wordCount: { type: "number" },
                  uniquePhrases: { type: "boolean" },
                  toneMatch: { type: "boolean" },
                  specificEvidence: { type: "boolean" }
                }
              }
            }
          }
        }
      }
    }
  }
} as const;

export const preprocessSchema = {
  name: "process_job_and_resume",
  description: "Extract key information from job description and resume",
  parameters: {
    type: "object",
    required: ["requirements", "experience"],
    properties: {
      requirements: {
        type: "array",
        items: { type: "string" },
        description: "Key requirements from job description"
      },
      experience: {
        type: "object",
        required: ["role", "achievements"],
        properties: {
          role: { type: "string" },
          achievements: {
            type: "array",
            items: {
              type: "object",
              required: ["metric", "date", "scope"],
              properties: {
                metric: { type: "string" },
                date: { type: "string" },
                scope: { type: "string" }
              }
            }
          }
        }
      }
    }
  }
} as const;

export const emailSchema = {
  name: "generate_intro_email",
  description: "Generate an introduction email",
  parameters: {
    type: "object",
    required: ["subject", "body", "analysis"],
    properties: {
      subject: { type: "string" },
      body: { type: "string" },
      analysis: {
        type: "object",
        required: ["requirements", "matches", "experienceLevel", "qualityChecks", "metrics"],
        properties: {
          requirements: {
            type: "array",
            items: { type: "string" }
          },
          matches: {
            type: "array",
            items: {
              type: "object",
              required: ["requirement", "evidence", "confidence"],
              properties: {
                requirement: { type: "string" },
                evidence: { type: "string" },
                confidence: { type: "number" }
              }
            }
          },
          experienceLevel: {
            type: "string",
            enum: ["DIRECT_MATCH", "RELATED", "CAREER_CHANGE", "NEW_DIRECTION"]
          },
          qualityChecks: {
            type: "object",
            required: ["relevanceTest", "authenticityTest", "languageTest", "formatTest", "toneTest", "nameHandlingTest"],
            properties: {
              relevanceTest: { type: "boolean" },
              authenticityTest: { type: "boolean" },
              languageTest: { type: "boolean" },
              formatTest: { type: "boolean" },
              toneTest: { type: "boolean" },
              nameHandlingTest: { type: "boolean" }
            }
          },
          metrics: {
            type: "object",
            required: ["wordCount", "uniquePhrases", "toneMatch", "specificEvidence"],
            properties: {
              wordCount: { type: "number" },
              uniquePhrases: { type: "boolean" },
              toneMatch: { type: "boolean" },
              specificEvidence: { type: "boolean" }
            }
          }
        }
      }
    }
  }
} as const;