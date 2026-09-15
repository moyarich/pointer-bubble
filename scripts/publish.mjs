import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const mode = process.argv[2];
const allowedModes = ['--dry-run', '--publish-first', '--stage'];
if (process.argv.length !== 3 || !allowedModes.includes(mode)) {
  throw new Error('Use npm run release:check, npm run publish:first, or npm run stage:lib.');
}

const firstPublish = mode === '--publish-first';
const stage = mode === '--stage';
const envFile = join(root, '.env');
if (existsSync(envFile)) process.loadEnvFile(envFile);

const pkg = JSON.parse(readFileSync(join(root, 'packages/pointer-bubble/package.json'), 'utf8'));
const tag = process.env.NPM_TAG || 'latest';
const access = process.env.NPM_ACCESS || 'public';

if (!['public', 'restricted'].includes(access)) throw new Error('NPM_ACCESS must be public or restricted.');
if (!/^[a-z][a-z0-9._-]*$/i.test(tag)) throw new Error('NPM_TAG must be a valid distribution tag, such as latest or next.');
if (stage && !process.env.NPM_TOKEN?.trim()) throw new Error('Set NPM_TOKEN in .env or your environment before staging.');
if ((stage || firstPublish) && pkg.license === 'UNLICENSED') {
  throw new Error('Choose a distribution license in packages/pointer-bubble/package.json before releasing.');
}

function run(args, env = process.env) {
  const result = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', args, {
    cwd: root,
    env,
    stdio: 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`npm ${args.join(' ')} failed. Release stopped.`);
}

run(['run', 'typecheck']);
run(['test']);

if (mode === '--dry-run') {
  run(['pack', '--workspace', pkg.name, '--dry-run']);
  console.log('Release checks passed. Nothing was staged or published.');
} else if (firstPublish) {
  console.log(`Publishing first release ${pkg.name}@${pkg.version} directly to npm.`);
  console.log('This uses your local npm login and may require browser/2FA confirmation.');
  run(['whoami', '--registry', 'https://registry.npmjs.org/']);
  run(['publish', '--workspace', pkg.name, '--access', access, '--tag', tag]);
} else {
  const configDir = mkdtempSync(join(tmpdir(), 'pointer-bubble-npm-'));
  const configFile = join(configDir, 'npmrc');
  try {
    writeFileSync(
      configFile,
      'registry=https://registry.npmjs.org/\n//registry.npmjs.org/:_authToken=${NPM_TOKEN}\n',
      { mode: 0o600 },
    );
    run(['stage', 'publish', '--workspace', pkg.name, '--access', access, '--tag', tag], {
      ...process.env,
      npm_config_userconfig: configFile,
    });
  } finally {
    rmSync(configDir, { recursive: true, force: true });
  }
}
