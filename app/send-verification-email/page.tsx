import { getServerSession } from "next-auth";
import SendVerificationEmailComponent from "@/components/SendVerificationEmailComponent";
import Navigation from "@/components/MainPage/Navigation";

export default async function SendVerificationEmail() {
	const session = await getServerSession();
	return (
		<div className="h-screen">
			<Navigation />
			<SendVerificationEmailComponent />
		</div>
	);
}
