import { getServerSession } from "next-auth";
import Header from "../components/MainPage/Navigation/Header";
import SendVerificationEmailComponent from "../components/SendVerificationEmailComponent";

export default async function SendVerificationEmail() {
	const session = await getServerSession();
	return (
		<div className="h-screen">
			<Header session={session} />
			<SendVerificationEmailComponent />
		</div>
	);
}
