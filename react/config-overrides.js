module.exports = function override(config, env) {
  // Add raw-loader configuration
  config.module.rules.push({
    test: /\.html$/,
    use: 'raw-loader',
  });

  return config;
};
