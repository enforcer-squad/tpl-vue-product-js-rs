/* eslint-disable no-unused-vars */
import { defineConfig } from '@rspack/cli';
// import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { rspack } from '@rspack/core';
import { VueLoaderPlugin } from 'vue-loader';

import AutoImport from 'unplugin-auto-import/rspack';
import AutoComponents from 'unplugin-vue-components/rspack';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

import { isProd, resolve, subDir, getCSSModuleRules } from './helper.mjs';
import { ENV, Polyfill } from './config.mjs';

const { HtmlRspackPlugin, CopyRspackPlugin, DefinePlugin } = rspack;

const base = defineConfig({
  target: 'web',
  entry: {
    index: resolve('./src/index.js'),
  },
  output: {
    clean: true,
    path: resolve(ENV[process.env.NODE_ENV].PATH),
    publicPath: ENV[process.env.NODE_ENV].PUBLIC_PATH,
    filename: '[name].js',
  },
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
    extensions: ['.js', '.jsx', '.json', '.glsl'],
  },
  experiments: {
    css: true,
  },
  module: {
    parser: {
      'css/module': {
        namedExports: false,
      },
    },
    rules: [
      {
        test: /\.[m]js$/,
        include: [/node_modules/, /floating-ui/],
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              env: Polyfill,
              jsc: {
                parser: {
                  syntax: 'ecmascript',
                },
              },
            },
          },
        ],
        type: 'javascript/auto',
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              experimentalInlineMatchResource: true,
            },
          },
        ],
        include: [resolve('./src')],
      },
      {
        test: /\.js[x]?$/,
        include: [resolve('./src')],
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              sourceMap: !isProd,
              jsc: {
                parser: {
                  syntax: 'ecmascript',
                  jsx: true,
                },
              },
              env: Polyfill,
              // rspackExperiments: {
              //   import: [
              //     {
              //       libraryName: 'antd',
              //       style: true,
              //     },
              //   ],
              // },
            },
          },
        ],
      },
      // ...getCSSModuleRules(),
    ],
  },
  plugins: [
    AutoImport({
      resolvers: [
        ArcoResolver({
          importStyle: 'css',
        }),
      ],
    }),
    AutoComponents({
      resolvers: [
        ArcoResolver({
          importStyle: 'css',
        }),
      ],
    }),
    new VueLoaderPlugin(),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.TIME_OUT': JSON.stringify(ENV[process.env.NODE_ENV].REQUEST_TIMEOUT),
      'process.env.API_PATH': JSON.stringify(ENV[process.env.NODE_ENV].API_BASE_URL),
      'process.env.SUB_DIR': JSON.stringify(ENV[process.env.NODE_ENV].SUB_DIR),
      'process.env.PUBLIC_PATH': JSON.stringify(ENV[process.env.NODE_ENV].PUBLIC_PATH),
    }),
    new CopyRspackPlugin({
      patterns: [
        {
          from: resolve('/src/public'),
          to: subDir('/'),
        },
      ],
    }),
    new HtmlRspackPlugin({
      template: resolve(`/index.html`),
      filename: `index.html`,
      minify: true,
    }),
    //  new ModuleFederationPlugin({
    //   name: 'federation_consumer',
    //   remotes: {
    //     federation_provider:
    //       'federation_provider@/federation_provider/remoteEntry.js',
    //   },
    //   shared: {
    //   },
    // }),
  ],
});

export default base;
