import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'react-router.js',
  output: {
    file: 'dist/react-page-router.js',
    format: 'umd',
    name: 'react-page-router'
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      include: ['node_modules/**', '**']
    }),
    uglify()
  ]
};
