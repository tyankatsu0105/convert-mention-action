import fs from 'fs';

import { findPackageJson, getPackageVersion } from '../getPackageVersion';

const fixturePath = './src/__tests__/fixture';
const fixture = `./src/__tests__/fixture/package.json`;

describe('getPackageVersion', () => {
  describe('findPackageJson', () => {
    test('find package.json', () => {
      const result = findPackageJson(fixturePath);

      expect(result).toBe(fs.readFileSync(fixture).toString());
    });
  });

  describe('getPackageVersion', () => {
    test('get version text within package.json', () => {
      const result = getPackageVersion(fixturePath);

      expect(result).toBe('0.0.0');
    });
  });
});
