import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { validateAudit } from '../check-nuget-audit.mjs';
import { validateCases } from '../run-evals.mjs';

test('audit rejects missing report and transitive vulnerabilities', () => {
  assert.throws(() => validateAudit({}), /unsupported/);
  assert.throws(() => validateAudit({ version: 1, projects: [{ frameworks: [{
    transitivePackages: [{ id: 'bad', vulnerabilities: [{ severity: 'Low' }] }],
  }] }] }), /advisory/);
  assert.doesNotThrow(() => validateAudit({ version: 1, projects: [{ path: 'Api' }] }));
});

test('eval gate rejects empty datasets, malformed cases and duplicate identifiers', () => {
  const dir = mkdtempSync(join(tmpdir(), 'factory-evals-'));
  try {
    assert.throws(() => validateCases(dir), /No eval/);
    writeFileSync(join(dir, 'a.json'), '{');
    assert.throws(() => validateCases(dir));
    writeFileSync(join(dir, 'a.json'), JSON.stringify({ id: 'a' }));
    assert.throws(() => validateCases(dir), /description/);
    const valid = JSON.stringify({ id: 'a', description: 'case', input: {}, expected: {} });
    writeFileSync(join(dir, 'a.json'), valid);
    assert.equal(validateCases(dir), 1);
    writeFileSync(join(dir, 'b.json'), valid);
    assert.throws(() => validateCases(dir), /duplicate/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
