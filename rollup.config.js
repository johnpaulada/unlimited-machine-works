import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'index.js',
      format: 'cjs'
    },
    {
      file: 'index.es.js',
      format: 'es'
    },
    {
      file: 'umw.min.js',
      format: 'iife',
      name: 'UMW'
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    uglify()
  ],
  watch: {
    include: 'src/**'
  }
};