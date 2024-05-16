import { TailSpin } from "react-loader-spinner";

export default function ReactLoadingSpinner() {
	return (
		<div className="bg-primary-600 flex relative justify-center items-center hover:bg-primary-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5">
			<div className="bg-black opacity-40 absolute w-full h-full top-0 left-0 z-[100] rounded-lg"></div>
			<div className="flex flex-row text-white gap-5 justify-center items-center w-full h-full z-[101] opacity-50">
				<p>Loading</p>
				<TailSpin
					visible={true}
					height="20"
					width="20"
					color="#ffffff"
					ariaLabel="tail-spin-loading"
					wrapperStyle={{}}
					wrapperClass=""
				/>
			</div>
		</div>
	);
}
