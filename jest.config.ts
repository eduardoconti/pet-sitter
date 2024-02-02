import { pathsToModuleNameMapper } from 'ts-jest';

export default {
  moduleFileExtensions: ['ts', 'js', 'json'],
  clearMocks: true,
  rootDir: 'src',
  modulePaths: ['<rootDir>'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  preset: 'ts-jest',
  collectCoverageFrom: [
    '<rootDir>/**/*.{use-case,entity,controller,repository,service}.ts',
  ],
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
      '@localizacao/*': ['src/localizacao/*'],
      '@auth/*': ['src/auth/*'],
      '@presentation/*': ['src/presentation/*'],
      '@factories/*': ['src/factories/*'],
    },
    {
      prefix: '<rootDir>/../',
    },
  ),
};
