import { Dispatch, SetStateAction, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";

export default function Toast({
	description,
	type,
	controller,
	controllerHandler,
}: {
	description: string;
	type: "success" | "error" | "warning" | "normal";
	controller: boolean;
	controllerHandler: Dispatch<
		SetStateAction<{
			show: boolean;
			title: string;
			description: string;
		}>
	>;
}) {
	useEffect(() => {
		if (controller) {
			setTimeout(() => {
				controllerHandler({
					show: false,
					title: "",
					description: "",
				});
			}, 3000);
		}
	});

	if (type === "normal") {
		return (
			<div
				className={`absolute right-0 z-[1000] top-20 translate-y-0 transition-all ease-in-out duration-500 	${
					controller ? "translate-x-0" : "translate-x-[200%]"
				}`}
			>
				<div className="space-y-3 ">
					<div
						className="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700"
						role="alert"
					>
						<div className="flex p-4">
							<div className="flex-shrink-0">
								<svg
									className="flex-shrink-0 size-4 text-blue-500 mt-0.5"
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									viewBox="0 0 16 16"
								>
									<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
								</svg>
							</div>
							<div className="ms-3 relative">
								<p className="text-sm text-gray-700 dark:text-neutral-400">
									{description}
								</p>
								<div
									onClick={() => {
										controllerHandler({
											show: false,
											title: "",
											description: "",
										});
									}}
									className="absolute top-0 right-0"
								>
									<RxCross1 />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	if (type === "success") {
		return (
			<div
				className={`absolute right-0 z-[1000] top-20 translate-y-0 transition-all ease-in-out duration-500 	${
					controller ? "translate-x-0" : "translate-x-[200%]"
				}`}
			>
				<div
					className="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700"
					role="alert"
				>
					<div className="flex p-4">
						<div className="flex-shrink-0">
							<svg
								className="flex-shrink-0 size-4 text-teal-500 mt-0.5"
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
							</svg>
						</div>
						<div className="ms-3 relative">
							<p className="text-sm text-gray-700 dark:text-neutral-400">
								{description}
							</p>
							<div
								onClick={() => {
									controllerHandler({
										show: false,
										title: "",
										description: "",
									});
								}}
								className="absolute top-0 right-0"
							>
								<RxCross1 />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	if (type === "error") {
		return (
			<div
				className={`absolute right-0 z-[1000] top-20 translate-y-0 transition-all ease-in-out duration-500 	${
					controller ? "translate-x-0" : "translate-x-[200%]"
				}`}
			>
				<div
					className="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700"
					role="alert"
				>
					<div className="flex p-4">
						<div className="flex-shrink-0">
							<svg
								className="flex-shrink-0 size-4 text-red-500 mt-0.5"
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
							</svg>
						</div>
						<div className="ms-3 relative">
							<p className="text-sm text-gray-700 dark:text-neutral-400">
								{description}
							</p>
							<div
								onClick={() => {
									controllerHandler({
										show: false,
										title: "",
										description: "",
									});
								}}
								className="absolute top-0 right-0"
							>
								<RxCross1 />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	if (type === "warning") {
		return (
			<div
				className={`absolute right-0 z-[1000] top-20 translate-y-0 transition-all ease-in-out duration-500 	${
					controller ? "translate-x-0" : "translate-x-[200%]"
				}`}
			>
				<div
					className="relative max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700"
					role="alert"
				>
					<div className="flex p-4 ">
						<div className="flex-shrink-0">
							<svg
								className="flex-shrink-0 size-4 text-yellow-500 mt-0.5"
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
							</svg>
						</div>
						<div className="ms-3 relative">
							<p className="text-sm text-gray-700 dark:text-neutral-400">
								{description}
							</p>
							<div
								onClick={() => {
									controllerHandler({
										show: false,
										title: "",
										description: "",
									});
								}}
								className="absolute top-0 right-0"
							>
								<RxCross1 />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
