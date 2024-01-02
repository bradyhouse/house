module.exports = {
  plugins: {
    'postcss-nesting': 'postcss-nesting',
    tailwindcss: {},
    'postcss-preset-env': {
      features: { 'nesting-rules': false },
    },
    autoprefixer: {},
  },
}
