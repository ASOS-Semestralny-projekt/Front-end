import type { Config } from 'jest';

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Tell Jest to use ts-jest for .ts and .tsx files
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFiles: ['./jest.setup.js'],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};

module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  
  globals: {
    'ts-jest': {
      diagnostics: false,  // Disable TypeScript diagnostics (type checking) during tests
    },
  }

};


export default config;