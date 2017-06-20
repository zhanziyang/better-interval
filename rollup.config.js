const resolve = require('rollup-plugin-node-resolve')
const commentjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const uglify = require('rollup-plugin-uglify')

let min = process.env.BUILD === 'min'

module.exports = {
  entry: 'src/main.js',
  dest: `dist/better-interval${min ? '.min' : ''}.js`,
  format: 'umd',
  moduleName: 'BetterInterval',
  banner: `\
/*
 * loopRequest
 * https://github.com/zhanziyang/loopRequest
 * 
 * Copyright (c) 2017 zhanziyang
 * Released under the ISC license
 */
  `,
  plugins: [
    commentjs(),
    resolve(),
    babel({
      "presets": [
        [
          "es2015",
          {
            "modules": false
          }
        ]
      ],
      "plugins": [
        "external-helpers"
      ],
      "exclude": "node_modules/**"
    }),
    (min && uglify({
      output: {
        comments: /zhanziyang/
      }
    }))
  ]
}