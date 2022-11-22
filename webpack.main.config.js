/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
	entry: "./src/index.ts",
	// mode: "production",
	target: "electron-main",
	module: {
		rules: require("./webpack.rules")
	},
	resolve: {
		extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"]
	},
	experiments: {
		topLevelAwait: true
	},
	output: {
		filename: "[name].js"
	},
	optimization: {
		runtimeChunk: "single",
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all"
				}
			}
		}
	}
};
