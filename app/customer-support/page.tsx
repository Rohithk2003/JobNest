import { getServerSession } from "next-auth";
import BackgroundGlow from "../components/VisualComponents/BackgroundGlow";
import DashboardNavigation from "../components/DashboardNavigation";
import Navigation from "../components/MainPage/Navigation";
import { getContactRoute } from "@/configs/constants";
export default async function Help() {
	const session = await getServerSession();
	return (
		<>
			{session ? (
				<DashboardNavigation
					fromMainPage={false}
					session={session}
				/>
			) : (
				<Navigation />
			)}
			<BackgroundGlow />
			<section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
				<div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
					<div className="lg:flex lg:items-center lg:justify-between lg:gap-4">
						<h2 className="shrink-0 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
							Questions (147)
						</h2>
					</div>

					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-200 dark:divide-gray-800">
							<div className="space-y-4 py-6 md:py-8">
								<div className="grid gap-4">
									<div>
										<span className="inline-block rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300 md:mb-0">
											{" "}
											3 answers{" "}
										</span>
									</div>

									<a
										href="#"
										className="text-xl font-semibold text-gray-900 hover:underline dark:text-white"
									>
										“The specs say this model has 2 USB ports. The one I
										received has none. Are they hidden somewhere?”
									</a>
								</div>
								<p className="text-base font-normal text-gray-500 dark:text-gray-400">
									It’s a USB-C port it’s a smaller port. Not the regular size
									USB port. See the picture below. It fits the newer Apple
									chargers.
								</p>
								<p className="text-sm font-medium text-gray-500 dark:text-gray-400">
									Answered 1 day ago by
									<a
										href="#"
										className="text-gray-900 hover:underline dark:text-white"
									>
										Bonnie Green
									</a>
								</p>
							</div>

							<div className="space-y-4 py-6 md:py-8">
								<div className="grid gap-4">
									<div>
										<span className="inline-block rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300 md:mb-0">
											{" "}
											1 answer{" "}
										</span>
									</div>

									<a
										href="#"
										className="text-xl font-semibold text-gray-900 hover:underline dark:text-white"
									>
										“Is this just the monitor?”
									</a>
								</div>
								<p className="text-base font-normal text-gray-500 dark:text-gray-400">
									It&apos;s an all-in-one (AIO). Which means everything in one
									structure. So it&apos;s not just a monitor it uses
									Apple&apos;s operating System, macOS and it has storage, CPU,
									GPU etc.
								</p>
								<p className="text-sm font-medium text-gray-500 dark:text-gray-400">
									Answered 1 day ago by
									<a
										href="#"
										className="text-gray-900 hover:underline dark:text-white"
									>
										Jese Leos
									</a>
								</p>
							</div>

							<div className="space-y-4 py-6 md:py-8">
								<div className="grid gap-4">
									<div>
										<span className="inline-block rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300 md:mb-0">
											{" "}
											7 answers{" "}
										</span>
									</div>
									<a
										href="#"
										className="text-xl font-semibold text-gray-900 hover:underline dark:text-white"
									>
										<q>
											For an inexpert 85-year-old general user with a ten-year
											old iMac (OSX Yosemite version 10.10.5), is this latest
											model 24
										</q>
										iMac with Retina 4.5K display Apple M1 8GB memory - 256GB
										SSD a decent upgrade?”
									</a>
								</div>
								<p className="text-base font-normal text-gray-500 dark:text-gray-400">
									It&apos;s basically the same system as your older machine, but
									bigger, lighter and faster. There is no disc drive and it has
									fewer ports.
								</p>
								<p className="text-sm font-medium text-gray-500 dark:text-gray-400">
									Answered 2 days ago by
									<a
										href="#"
										className="text-gray-900 hover:underline dark:text-white"
									>
										Bonnie Green
									</a>
								</p>
							</div>

							<div className="space-y-4 py-6 md:py-8">
								<div className="grid gap-4">
									<div>
										<span className="inline-block rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300 md:mb-0">
											{" "}
											32 answers{" "}
										</span>
									</div>

									<a
										href="#"
										className="text-xl font-semibold text-gray-900 hover:underline dark:text-white"
									>
										<q>I just brought home the Imac24</q>. It saysthe mouse and
										Keyboard are wireless. Where do I install the power htmlFor
										them?”
									</a>
								</div>
								<p className="text-base font-normal text-gray-500 dark:text-gray-400">
									You can charge the mouse and keyboard with a lightning
									charger. Once charged, they last months before having to
									charge again.
								</p>
								<p className="text-sm font-medium text-gray-500 dark:text-gray-400">
									Answered 2 days ago by
									<a
										href="#"
										className="text-gray-900 hover:underline dark:text-white"
									>
										Roberta Casas
									</a>
								</p>
							</div>

							<div className="space-y-4 py-6 md:py-8">
								<div className="grid gap-4">
									<div>
										<span className="inline-block rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300 md:mb-0">
											{" "}
											4 answers{" "}
										</span>
									</div>

									<a
										href="#"
										className="text-xl font-semibold text-gray-900 hover:underline dark:text-white"
									>
										“Does this include the keyboard and mouse?”
									</a>
								</div>
								<p className="text-base font-normal text-gray-500 dark:text-gray-400">
									Yes it does, color matched to the Mac. And the keyboard has
									Touch ID.
								</p>
								<p className="text-sm font-medium text-gray-500 dark:text-gray-400">
									Answered 1 week ago by
									<a
										href="#"
										className="text-gray-900 hover:underline dark:text-white"
									>
										Joseph McFallen
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="mx-auto text-center max-w-screen-lg px-4 2xl:px-0 text-white  text-2xl py-20">
					Have a question that isn&apos;t answered here?{" "}
					<a
						href={getContactRoute()}
						className="underline text-blue-400"
					>
						Ask us
					</a>
				</div>
			</section>
		</>
	);
}
