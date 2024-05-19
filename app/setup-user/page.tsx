export default function SetupUser() {
	return (
		<div className="w-full  flex justify-center items-center h-screen">
			<div
				data-hs-stepper='{
                      "isCompleted": true
                    }'
				className="completed w-1/2 "
			>
				<ul className="relative flex flex-row gap-x-2">
					<li
						className="flex items-center gap-x-2 shrink basis-0 flex-1 group success"
						data-hs-stepper-nav-item='{
                          "index": 1,
                          "isCompleted": true
                        }'
					>
						<span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle focus:outline-none disabled:opacity-50 disabled:pointer-events-none">
							<span className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 hs-stepper-active:bg-blue-600 hs-stepper-active:text-white hs-stepper-success:bg-blue-600 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600 dark:bg-neutral-700 dark:text-white dark:group-focus:bg-gray-600 dark:hs-stepper-active:bg-blue-500 dark:hs-stepper-success:bg-blue-500 dark:hs-stepper-completed:bg-teal-500 dark:hs-stepper-completed:group-focus:bg-teal-600">
								<span className="hs-stepper-success:hidden hs-stepper-completed:hidden">
									1
								</span>
								<svg
									className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="3"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<polyline points="20 6 9 17 4 12"></polyline>
								</svg>
							</span>
							<span className="ms-2 text-sm font-medium text-gray-800 group-focus:text-gray-500 dark:text-white dark:group-focus:text-gray-400">
								Step
							</span>
						</span>
						<div className="w-full h-px flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600 dark:bg-neutral-700 dark:hs-stepper-success:bg-blue-500 dark:hs-stepper-completed:bg-teal-500"></div>
					</li>
					<li
						className="flex items-center gap-x-2 shrink basis-0 flex-1 group success"
						data-hs-stepper-nav-item='{
                          "index": 2,
                          "isCompleted": true
                        }'
					>
						<span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle focus:outline-none disabled:opacity-50 disabled:pointer-events-none">
							<span className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 hs-stepper-active:bg-blue-600 hs-stepper-active:text-white hs-stepper-success:bg-blue-600 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600 dark:bg-neutral-700 dark:text-white dark:group-focus:bg-gray-600 dark:hs-stepper-active:bg-blue-500 dark:hs-stepper-success:bg-blue-500 dark:hs-stepper-completed:bg-teal-500 dark:hs-stepper-completed:group-focus:bg-teal-600">
								<span className="hs-stepper-success:hidden hs-stepper-completed:hidden">
									2
								</span>
								<svg
									className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="3"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<polyline points="20 6 9 17 4 12"></polyline>
								</svg>
							</span>
							<span className="ms-2 text-sm font-medium text-gray-800 group-focus:text-gray-500 dark:text-white dark:group-focus:text-gray-400">
								Step
							</span>
						</span>
						<div className="w-full h-px flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600 dark:bg-neutral-700 dark:hs-stepper-success:bg-blue-500 dark:hs-stepper-completed:bg-teal-500"></div>
					</li>
					<li
						className="flex items-center gap-x-2 shrink basis-0 flex-1 group active success"
						data-hs-stepper-nav-item='{
                          "index": 3,
                          "isCompleted": true
                        }'
					>
						<span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle focus:outline-none disabled:opacity-50 disabled:pointer-events-none">
							<span className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 hs-stepper-active:bg-blue-600 hs-stepper-active:text-white hs-stepper-success:bg-blue-600 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600 dark:bg-neutral-700 dark:text-white dark:group-focus:bg-gray-600 dark:hs-stepper-active:bg-blue-500 dark:hs-stepper-success:bg-blue-500 dark:hs-stepper-completed:bg-teal-500 dark:hs-stepper-completed:group-focus:bg-teal-600">
								<span className="hs-stepper-success:hidden hs-stepper-completed:hidden">
									3
								</span>
								<svg
									className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="3"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<polyline points="20 6 9 17 4 12"></polyline>
								</svg>
							</span>
							<span className="ms-2 text-sm font-medium text-gray-800 group-focus:text-gray-500 dark:text-white dark:group-focus:text-gray-400">
								Step
							</span>
						</span>
						<div className="w-full h-px flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600 dark:bg-neutral-700 dark:hs-stepper-success:bg-blue-500 dark:hs-stepper-completed:bg-teal-500"></div>
					</li>
				</ul>
				<div className="mt-5 sm:mt-8">
					<div
						data-hs-stepper-content-item='{
                          "index": 1,
                          "isCompleted": true
                        }'
						style={{ display: "none" }}
					>
						<div className="p-4 h-48 bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
							<h3 className="text-gray-500 dark:text-neutral-500">
								First content
							</h3>
						</div>
					</div>
					<div
						data-hs-stepper-content-item='{
                          "index": 2,
                          "isCompleted": true
                        }'
						style={{ display: "none" }}
					>
						<div className="p-4 h-48 bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
							<h3 className="text-gray-500 dark:text-neutral-500">
								Second content
							</h3>
						</div>
					</div>
					<div
						data-hs-stepper-content-item='{
                          "index": 3,
                          "isCompleted": true
                        }'
						style={{ display: "none" }}
					>
						<div className="p-4 h-48 bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
							<h3 className="text-gray-500 dark:text-neutral-500">
								Third content
							</h3>
						</div>
					</div>
					<div
						data-hs-stepper-content-item='{
                          "isFinal": true
                        }'
					>
						<div className="p-4 h-48 bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
							<h3 className="text-gray-500 dark:text-neutral-500">
								Final content
							</h3>
						</div>
					</div>
					<div className="mt-5 flex justify-between items-center gap-x-2">
						<button
							type="button"
							className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
							data-hs-stepper-back-btn=""
							style={{ display: "none" }}
						>
							<svg
								className="flex-shrink-0 size-4"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="m15 18-6-6 6-6"></path>
							</svg>
							Back
						</button>
						<button
							type="button"
							className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
							data-hs-stepper-next-btn=""
							style={{ display: "none" }}
						>
							Next
							<svg
								className="flex-shrink-0 size-4"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="m9 18 6-6-6-6"></path>
							</svg>
						</button>
						<button
							type="button"
							className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
							data-hs-stepper-finish-btn=""
							style={{ display: "none" }}
						>
							Finish
						</button>
						<button
							type="reset"
							className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
							data-hs-stepper-reset-btn=""
						>
							Reset
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
