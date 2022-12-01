/* eslint-disable @typescript-eslint/no-var-requires */
const rules = require("./webpack.rules");
const plugins = require("./webpack.plugins");

rules.push(
	{
		test: /\.css$/,
		use: [
			{ loader: "style-loader" },
			{ loader: "css-loader" },
			{ loader: "postcss-loader" }
		]
	},
	{
		test: /\.html$/i,
		loader: "html-loader"
	}
);

module.exports = {
	module: { rules },
	plugins: plugins,
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx", ".css"]
	},
	devtool: false, // No-eval
	// mode: "production",
	performance: {
		hints: false
	},
	experiments: {
		topLevelAwait: true
	},
	optimization: {
		emitOnErrors: true
	}
};
