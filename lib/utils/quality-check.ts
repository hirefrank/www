import { EmailAnalysis, EmailMetrics, NAME_PATTERNS } from './metrics.ts';

export interface QualityCheckResult {
  readonly passed: boolean;
  readonly details: string;
  readonly evidence?: string[];
}

export interface QualityMetrics {
  readonly hasSpecificMetrics: QualityCheckResult;
  readonly hasDateReferences: QualityCheckResult;
  readonly matchesSenderStyle: QualityCheckResult;
  readonly hasUniqueOpening: QualityCheckResult;
  readonly hasValidNameHandling: QualityCheckResult;
  readonly hasTeamSizeOrScope: QualityCheckResult;
  readonly hasForbiddenPhrases: QualityCheckResult;
}

export function performQualityChecks(
  analysis: EmailAnalysis,
  additionalContext: string,
  phraseTracking: Set<string>
): QualityMetrics {
  return {
    hasSpecificMetrics: checkSpecificMetrics(analysis.metrics),
    hasDateReferences: checkDateReferences(analysis.metrics),
    matchesSenderStyle: checkSenderStyle(analysis, additionalContext),
    hasUniqueOpening: checkUniqueOpening(analysis.structure.opening, phraseTracking),
    hasValidNameHandling: checkNameHandling(analysis.structure.greeting),
    hasTeamSizeOrScope: checkTeamSize(analysis.metrics),
    hasForbiddenPhrases: checkForbiddenPhrases(analysis.forbiddenPhrases)
  };
}

function checkSpecificMetrics(metrics: EmailMetrics): QualityCheckResult {
  const hasMetrics = metrics.metrics.percentages.length > 0 ||
                    metrics.metrics.currency.length > 0;
  return {
    passed: hasMetrics,
    details: hasMetrics ? 'Contains specific metrics' : 'Missing specific metrics',
    evidence: [
      ...metrics.metrics.percentages.map(p => `${p}%`),
      ...metrics.metrics.currency
    ]
  };
}

function checkDateReferences(metrics: EmailMetrics): QualityCheckResult {
  return {
    passed: metrics.dateReferences.length > 0,
    details: metrics.dateReferences.length > 0 ?
      'Contains date references' : 'Missing date references',
    evidence: metrics.dateReferences
  };
}

function checkSenderStyle(
  analysis: EmailAnalysis,
  additionalContext: string
): QualityCheckResult {
  const isDataDriven = additionalContext.toLowerCase().includes('data-driven');
  const hasDataStyle = /\d+%|\$\d+|growth|metrics/.test(analysis.structure.opening);
  const hasInitiativeStyle = /launching|building|driving|initiative/.test(analysis.structure.opening);

  return {
    passed: isDataDriven ? hasDataStyle : hasInitiativeStyle,
    details: `Style ${isDataDriven ? 'matches' : 'does not match'} sender preferences`,
    evidence: [analysis.structure.opening]
  };
}

function checkUniqueOpening(
  opening: string,
  phraseTracking: Set<string>
): QualityCheckResult {
  const isUnique = !phraseTracking.has(opening);
  if (isUnique) phraseTracking.add(opening);

  return {
    passed: isUnique,
    details: isUnique ? 'Opening is unique' : 'Opening is duplicated',
    evidence: [opening]
  };
}

function checkNameHandling(greeting: string): QualityCheckResult {
  const isValid = NAME_PATTERNS.VALID_GREETING.test(greeting);
  return {
    passed: isValid,
    details: isValid ? 'Name handling is correct' : 'Incorrect name format',
    evidence: [greeting]
  };
}

function checkTeamSize(metrics: EmailMetrics): QualityCheckResult {
  return {
    passed: metrics.teamSizes.length > 0,
    details: metrics.teamSizes.length > 0 ?
      'Contains team size information' : 'Missing team size information',
    evidence: metrics.teamSizes.map(size => `Team of ${size}`)
  };
}

function checkForbiddenPhrases(phrases: string[]): QualityCheckResult {
  return {
    passed: phrases.length === 0,
    details: phrases.length === 0 ?
      'No forbidden phrases found' : 'Contains forbidden phrases',
    evidence: phrases
  };
}