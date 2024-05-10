interface PopupProps {
	title: string;
	description: string;
	onConfirm: () => any;
	firstButtonText: string;
	secondButtonText: string;
	showButtonOne: boolean;
	showButtonTwo: boolean;
	showPopup: (val: boolean) => any | null;
}
export default function Popup({
	title,
	description,
	onConfirm,
	firstButtonText,
	secondButtonText,
	showButtonOne,
	showButtonTwo,
	showPopup,
}: PopupProps) {
	return (
		<div className=" absolute top-0 left-0 z-[900] w-full h-full flex justify-center items-center ">
			<div className="bg-black fixed opacity-35 h-[100%] w-[100%] z-[901]"></div>
			<div className="rounded-lg bg-primary-100 p-8 shadow-2xl w-96 flex flex-col justify-center items-center h-64 z-[902]">
				<h2 className="text-lg font-bold text-start">{title}</h2>

				<p className="mt-2 text-sm text-gray-500 text-justify w-full">
					{description}
				</p>

				<div className="mt-4 flex gap-2">
					{showButtonOne && (
						<button
							onClick={onConfirm}
							type="button"
							className="rounded bg-primary-50 px-4 py-2 text-sm font-medium text-primary-600"
						>
							{firstButtonText}
						</button>
					)}
					{showButtonTwo && (
						<button
							type="button"
							onClick={() => {
								showPopup(false);
							}}
							className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
						>
							{secondButtonText}
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
