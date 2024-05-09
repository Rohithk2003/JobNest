import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
});

export default function Terms() {
	return (
		<div
			className={`${inter.className} container mx-auto px-4 py-8 bg-gray-900 text-white`}
		>
			<div className="max-w-2xl mx-auto">
				<h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
				<p className="mb-4">
					Welcome to our job scraping platform. By accessing or using our
					services, you agree to comply with and be bound by the following terms
					and conditions.
				</p>
				<h2 className="text-xl font-bold mb-3">1. Use of Service</h2>
				<p className="mb-4">
					The use of our platform is subject to the following terms of use:
				</p>
				<ul className="list-disc ml-6 mb-4">
					<li>Only individuals over the age of 18 can use our platform.</li>
					<li>
						Users agree not to use the platform for any illegal or unauthorized
						purpose.
					</li>
					<li>
						We reserve the right to refuse service to anyone for any reason at
						any time.
					</li>
				</ul>
				<h2 className="text-xl font-bold mb-3">2. Privacy Policy</h2>
				<p className="mb-4">
					Our privacy policy outlines how we collect, use, and protect your
					personal information when you use our services. Please review our
					Privacy Policy for more information.
				</p>
				<h2 className="text-xl font-bold mb-3">3. Changes to Terms</h2>
				<p className="mb-4">
					We reserve the right, at our sole discretion, to modify or replace
					these terms at any time. If a revision is material, we will try to
					provide at least 30 days&apos; notice prior to any new terms taking
					effect.
				</p>
				<p className="mb-4">
					By continuing to access or use our platform after those revisions
					become effective, you agree to be bound by the revised terms. If you
					do not agree to the new terms, please stop using the service.
				</p>
				<p className="text-gray-500">Last updated: May 9, 2024</p>
			</div>
		</div>
	);
}
