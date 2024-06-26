export const metadata = {
	title: "Terms and Conditions",
	description: "You need to login to access the platform",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
