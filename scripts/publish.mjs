import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const publish = process.argv.includes('--publish');
if (process.argv.length !== 3 || !['--publish', '--dry-run'].includes(process.argv[2])) {
  throw new Error('Use npm run release:check or npm run publish:lib.');
}
const envFile = join(root, '.env');
if (existsSync(envFile)) process.loadEnvFile(envFile);
const pkg = JSON.parse(readFileSync(join(root, 'packages/pointer-bubble/package.json'), 'utf8'));
const tag = process.env.NPM_TAG || 'latest';
const access = process.env.NPM_ACCESS || 'public';
if (!['public', 'restricted'].includes(access)) throw new Error('NPM_ACCESS must be public or restricted.');
if (!/^[a-z][a-z0-9._-]*$/i.test(tag)) throw new Error('NPM_TAG must be a valid distribution tag, such as latest or next.');
if (publish && !process.env.NPM_TOKEN?.trim()) throw new Error('Set NPM_TOKEN in .env or your environment before publishing.');
if (publish && pkg.license === 'UNLICENSED') throw new Error('Choose a distribution license in packages/pointer-bubble/package.json before publishing.');

function run(args, env = process.env) {
  const result = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', args, { cwd: root, env, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`npm ${args[0]} failed. Release stopped.`);
}

run(['run', 'typecheck']);
run(['test']);
if (!publish) {
  // npm pack validates the archive locally and requires no registry credentials.
  run(['pack', '--workspace', pkg.name, '--dry-run', '--ignore-scripts']);
  console.log('Release checks passed. Nothing was published.');
} else {
  // Keep the token out of source files and command arguments. npm expands the
  // environment reference only while publishing; cleanup runs even on failure.
  const configDir = mkdtempSync(join(tmpdir(), 'pointer-bubble-npm-'));
  const configFile = join(configDir, 'npmrc');
  try {
    writeFileSync(configFile, 'registry=https://registry.npmjs.org/\n//registry.npmjs.org/:_authToken=${NPM_TOKEN}\n', { mode: 0o600 });
    run(['publish', '--workspace', pkg.name, '--access', access, '--tag', tag, '--ignore-scripts'], { ...process.env, npm_config_userconfig: configFile });
  } finally {
    rmSync(configDir, { recursive: true, force: true });
  }
}
