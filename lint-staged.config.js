module.exports = {
  '**/*.ts?(x)': () => 'npm run check-types',
  '*.{json,yaml}': ['prettier --write'],
  '*.{js,jsx,ts,tsx}': [
    'prettier . --write',
    'eslint . --cache --fix --ext .tsx --ext .ts',
    'eslint',
  ],
};
