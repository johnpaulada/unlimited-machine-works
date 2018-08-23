import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'index.js',
      format: 'cjs',
      intro: "var regeneratorRuntime = require('regenerator-runtime');\n"
    },
    {
      file: 'index.es.js',
      format: 'es',
      external: [ 'regenerator-runtime' ]
    },
    {
      file: 'umw.min.js',
      format: 'iife',
      name: 'UMW',
      intro: "var regeneratorRuntime = require('regenerator-runtime');\n",
      globals: {
        "regenerator-runtime/runtime": "regeneratorRuntime"
      }
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**', // only transpile our source code,
      runtimeHelpers: true
    }),
    uglify()
  ],
  watch: {
    include: 'src/**'
  }
};