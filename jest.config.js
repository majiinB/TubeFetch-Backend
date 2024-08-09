module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    testMatch: ['**/__tests__/**/*.test.(ts|js)', '**/?(*.)+(spec|test).(ts|js)'],
    coverageDirectory: 'coverage',
    collectCoverage: true,
};
