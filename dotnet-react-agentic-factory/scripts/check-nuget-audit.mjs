import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function validateAudit(report) {
  if (!report || report.version !== 1 || !Array.isArray(report.projects) || !report.projects.length) {
    throw new Error('Missing or unsupported NuGet audit report');
  }
  const findings = [];
  for (const project of report.projects) {
    for (const framework of project.frameworks ?? []) {
      for (const pkg of [...(framework.topLevelPackages ?? []), ...(framework.transitivePackages ?? [])]) {
        if (pkg.vulnerabilities?.length) findings.push(`${pkg.id}: ${pkg.vulnerabilities.length} advisory(s)`);
      }
    }
  }
  if ([...(report.logs ?? []), ...(report.problems ?? [])].some((entry) => entry.level?.toLowerCase() === 'error')) {
    throw new Error('NuGet audit reported errors');
  }
  if (findings.length) throw new Error(findings.join('\n'));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    validateAudit(JSON.parse(readFileSync(process.argv[2], 'utf8').replace(/^\uFEFF/, '')));
    console.log('No vulnerable NuGet packages reported.');
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
