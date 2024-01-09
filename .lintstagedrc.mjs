import path from 'path';

export default {
  '**/*.?(m|c)[tj]s?(x)': (filenames) => [
    `prettier --write -- ${filenames
      .map((filename) => path.relative(process.cwd(), filename))
      .join(' ')}`,
    `eslint --fix ${filenames
      .map((filename) => path.relative(process.cwd(), filename))
      .join(' ')}`,
  ],
  '**/*.{html,css,s[ac]ss,json,md?(x)}': (filenames) =>
    `prettier --write -- ${filenames
      .map((filename) => path.relative(process.cwd(), filename))
      .join(' ')}`,
};
