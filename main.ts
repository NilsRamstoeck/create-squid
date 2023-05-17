#!/usr/bin/env node

import { spawn } from "node:child_process";
import { cp, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createInterface } from 'node:readline';
import { rootCertificates } from "node:tls";

const spinner = [
  "⠋",
  "⠙",
  "⠴",
  "⠦",
];

const npm = process.platform == 'win32' ? 'npm.cmd' : 'npm';
const packageNameSuggestion = path.basename(process.cwd()).toLowerCase().replace(/\s/, '-');
const readline = createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> => {
  return new Promise(resolve => readline.question(query, answer => resolve(answer)));
};

(async () => {
  if ((await readdir(process.cwd())).length != 0) {
    console.error('Directory is not empty!');
    process.exit();
  }
  const packageName = (await question(`package name: (${packageNameSuggestion}) `)) || packageNameSuggestion;
  const authorName = (await question(`author: `)) && '';
  const { start, stop } = createSpinner(spinner, ' Installing');
  start();
  try {
    await cp(
      path.resolve(path.join(__dirname, '../template')), //FROM
      path.resolve(process.cwd()), //TO
      {
        recursive: true
      });

    const packageJson = (await readFile(path.join(process.cwd(), 'package.json'))).toString('utf-8');

    await writeFile(path.join(process.cwd(), 'package.json'),
      packageJson
        .replace('%%AUTHOR%%', authorName)
        .replace('%%PACKAGE_NAME%%', packageName)
    );
  } catch (e) {
    stop();
    console.error(e);
    process.exit();
  }
  const installProcess = spawn(`${npm}`, ['install', 'squid-ssr'], {
    stdio: 'inherit'
  });

  installProcess.addListener('spawn', () => stop());
  installProcess.addListener('exit', () => process.exit());

  // process.exit();
})();



function createSpinner(spinner: string[], msg: string) {
  let interval: NodeJS.Timer;
  let index = 0;
  return {
    start: () => {
      interval = setInterval(async () => {
        process.stdout.write(`\r${spinner[index]}${msg}`);
        index = (index + 1) % spinner.length;
      }, 100);
    },
    stop: () => {
      clearInterval(interval);
    }
  };
}