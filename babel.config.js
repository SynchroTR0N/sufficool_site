module.exports = {
  presets: [
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        throwIfNamespace: false,
        runtime: 'automatic',
      },
    ],
  ],
  overrides: [
    {
      test: /\.mdx?$/,
      plugins: [
        [
          '@babel/plugin-transform-react-jsx',
          {
            throwIfNamespace: false,
            runtime: 'automatic',
            importSource: '@mdx-js/react',
          },
        ],
      ],
    },
  ],
};