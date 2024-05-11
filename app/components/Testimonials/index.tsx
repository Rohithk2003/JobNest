export default function Testimonials() {
	return (
		<section className="py-14 relative z-[900]">
			<div className="max-w-screen-xl mx-auto px-4 md:px-8">
				<div className="max-w-3xl mx-auto">
					<figure>
						<blockquote>
							<q className="text-gray-300 text-xl text-center italic sm:text-2xl">
								JobNest streamlines job searching with its user-friendly
								platform and personalized recommendations. It helped me find my
								dream job quickly and efficiently. Highly recommended!
							</q>
						</blockquote>
						<div className="flex justify-center items-center gap-x-4 mt-6">
							<img
								src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
								className="w-16 h-16 rounded-full"
							/>
							<div>
								<span className="block text-white font-semibold">
									Rohith Krishnan
								</span>
							</div>
						</div>
					</figure>
				</div>
			</div>
		</section>
	);
}
