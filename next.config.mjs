/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.externals = [...config.externals, "bcrypt"];
		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*.googleusercontent.com",
				port: "",
				pathname: "**",
			},
		],
	},
};

export default nextConfig;
