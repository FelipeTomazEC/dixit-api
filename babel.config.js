module.exports = function (api) {
  api.cache(false);
  const presets = ['@babel/preset-env', '@babel/preset-typescript'];
  const plugins = [
    [require('@babel/plugin-proposal-class-properties'), { loose: false }],
    [require('@babel/plugin-transform-runtime')],
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['.'],
        alias: {
          '@entities': './src/entities',
          '@common': './src/common',
          '@utils': './src/utils',
          '@use-cases': './src/use-cases',
          '@interface-adapters': './src/interface-adapters',
          '@infra': './src/infra'
        },
      },
    ],
  ];

  return {
    plugins,
    presets,
  };
};
