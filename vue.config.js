const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
// const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
  transpileDependencies: ['jsPsych'],//true,
  publicPath: './',
  outputDir: 'docs',
  assetsDir: './',
  indexPath: 'index.html',

  configureWebpack: {
    entry: './src/main.js',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(mp3|mp4)$/,
          loader: 'file-loader',
          options: {
            name: 'assets/media/[name].[hash:8].[ext]'
          }
        },
        {
          test: /\.json$/,
          type: 'javascript/auto',
          loader: 'file-loader',
          options: {
            name: 'assets/data/[name].[hash:8].[ext]'
          }
        }
      ]
    },
    optimization: {
      minimize: true, // デバッグのため最小化を無効にする
      minimizer: [
        // デバッグのためコメントアウト
        // new TerserPlugin({
        //   terserOptions: {
        //     compress: {
        //       drop_console: true,
        //       pure_funcs: ['console.log']
        //     },
        //     mangle: false,
        //     keep_fnames: true,
        //     keep_classnames: true
        //   }
        // })
      ],
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
              return packageName ? `npm.${packageName[1].replace('@', '')}` : 'vendor';
            },
          },
        },
      },
    },
    plugins: [
      // デバッグのためコメントアウト
      // new JavaScriptObfuscator({
      //   rotateUnicodeArray: true,
      //   sourceMap: false,
      //   target: 'browser',
      //   selfDefending: true,
      //   stringArray: true,
      //   stringArrayEncoding: ['base64'],
      //   deadCodeInjection: true,
      //   exclude: [
      //     'node_modules/whatwg-fetch/**/*.js'
      //   ]
      // }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/assets/questions'),
            to: 'assets/questions'
          },
          {
            from: path.resolve(__dirname, 'public/questions'),
            to: 'questions'
          },
          {
            from: path.resolve(__dirname, 'public/audio'),
            to: 'audio'
          },
          {
            from: path.resolve(__dirname, 'public/image'),
            to: 'image'
          }
        ],
      }),
    ],
  },

  // chainWebpack: config => {
  //   config.module
  //     .rule('js')
  //     .include
  //     .add(path.resolve(__dirname, 'src/scripts'))
  //     .end()
  //     .use('babel-loader')
  //     .loader('babel-loader')
  //     .options({
  //       presets: [
  //         ['@babel/preset-env', { modules: false }]
  //       ]
  //     });

  //   config.module
  //     .rule('images')
  //     .use('url-loader')
  //     .loader('url-loader')
  //     .tap(options => {
  //       if (!options) options = {};
  //       options.limit = 8192;
  //       options.fallback = options.fallback || {};
  //       options.fallback.loader = 'file-loader';
  //       options.fallback.options = options.fallback.options || {};
  //       options.fallback.options.name = 'assets/img/[name].[hash:8].[ext]';
  //       return options;
  //     });
  // },
  lintOnSave: false,
  productionSourceMap: true, // デバッグのためソースマップを有効にする
};