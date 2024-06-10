import CompressionPlugin from 'compression-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { dirname, resolve } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SOURCE_FOLDER = 'src/';
const BUILD_FOLDER = 'dist/';

const config = (_, { mode }) => {
  const isProduction = mode === 'production';
  const isDevelopment = mode === 'development';

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
          use: [
            //seperate bootrap lib css
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            // 'postcss-loader',
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          use: [
            //leave sccs files in js
            isProduction && MiniCssExtractPlugin.loader,
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: isDevelopment,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment,
                sassOptions: {
                  outputStyle: 'compressed',
                },
              },
            },
          ],
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
      new MiniCssExtractPlugin({
        filename: isProduction ? '[name].[contenthash].css' : '[name].css',
      }),
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
      minimizer: [
        new TerserPlugin(),
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [
                ['gifsicle', { interlaced: true }],
                ['jpegtran', { progressive: true }],
                ['optipng', { optimizationLevel: 7 }],
              ],
            },
          },
        }),
      ],
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          bootstrap: {
            //inject node_modules in seperated chunk
            test: /[\\/]node_modules[\\/]/,
            name: 'bootstrap',
          },
        },
      },
    },
  };
};

export default config;
