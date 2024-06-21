import { Bounce, ToastContainer } from "react-toastify";

export default function CustomToastContainer() {
	return (
		<ToastContainer
			transition={Bounce}
			theme="dark"
			toastClassName="border rounded-xl shadow-lg bg-neutral-800 border-neutral-700"
			bodyClassName="border rounded-xl shadow-lg bg-neutral-800 border-neutral-700"
		/>
	);
}
