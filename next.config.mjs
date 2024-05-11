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
			{
				protocol: "https",
				hostname: "*.supabase.co",
				port: "",
				pathname: "**",
			},
		],
	},
	async redirects() {
		return [
			{
				source: "/",
				destination: "/welcome",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
