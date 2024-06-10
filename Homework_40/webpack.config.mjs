import CompressionPlugin from 'compression-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { dirname, resolve } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SOURCE_FOLDER = 'src/';
const BUILD_FOLDER = 'dist/';

const getStyles = isDev => {
  const modules = [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        sourceMap: isDev,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: isDev,
        sassOptions: {
          outputStyle: 'compressed',
        },
      },
    },
  ];
  if (!isDev) {
    modules.unshift(MiniCssExtractPlugin.loader);
  }
  return modules;
};

const config = (env, { mode }) => {
  console.log('mode =>>>> ', mode);
  const isProduction = mode === 'production';
  const isDevelopment = mode === 'development';
  console.log('isDevelopment =>>>> ', isDevelopment);
  return {
    entry: {
      vendors: [resolve(__dirname, SOURCE_FOLDER, 'index.ts')],
    },
    output: {
      filename: '[name].[contenthash].js',
      path: resolve(__dirname, BUILD_FOLDER),
      clean: true,
    },
    devtool: isDevelopment ? 'source-map' : false,
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              sourceMap: isDevelopment,
              presets: [
                ['@babel/preset-env', { targets: 'defaults' }],
                '@babel/preset-typescript',
              ],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        },
        {
          //for bootstrap
          test: /\.css$/i,
          use: getStyles(isDevelopment),
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          use: getStyles(isDevelopment),
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          type: 'asset/resource',
        },
      ],
    },
    devServer: {
      static: {
        directory: resolve(__dirname, BUILD_FOLDER),
      },
      open: true,
      liveReload: true,
      compress: true,
      port: 3000,
      hot: isDevelopment,
    },
    plugins: [
      new CompressionPlugin({
        compressionOptions: { level: 1 },
        threshold: 8192,
      }),
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        title: 'webpack test',
        scriptLoading: 'defer',
        minify: isProduction,
        favicon: resolve(__dirname, SOURCE_FOLDER, 'public', 'logo512.png'),
        template: resolve(__dirname, SOURCE_FOLDER, 'index.html'),
      }),
      new CopyPlugin({
        patterns: [
          {
            from: resolve(__dirname, SOURCE_FOLDER, 'public'),
            to: resolve(__dirname, BUILD_FOLDER),
          },
        ],
      }),
    ],
    optimization: {
      minimize: isProduction,
      minimizer: [new TerserPlugin()],
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          bootstrap: {
            test: /[\\/]node_modules[\\/]/,
            name: 'bootstrap',
          },
        },
      },
    },
  };
};

export default config;
