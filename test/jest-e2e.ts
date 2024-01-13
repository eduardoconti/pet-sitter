import { pathsToModuleNameMapper } from 'ts-jest';

export default {
  moduleFileExtensions: ['ts', 'js', 'json'],
  clearMocks: true,
  rootDir: '.',
  modulePaths: ['<rootDir>'],
  testRegex: '.*\\.e2e.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(
    {
      '@pet/*': ['src/pet/*'],
      '@main/*': ['src/main/*'],
      '@core/*': ['src/core/*'],
      '@infra/*': ['src/infra/*'],
      '@usuario/*': ['src/usuario/*'],
      '@pet-sitter/*': ['src/pet-sitter/*'],
      '@servico/*': ['src/servico/*'],
      '@atendimento/*': ['src/atendimento/*'],
      '@tutor/*': ['src/tutor/*'],
    },
    {
      prefix: '<rootDir>/../',
    },
  ),
};
