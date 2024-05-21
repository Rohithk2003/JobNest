import { useSession } from "next-auth/react";
import Header from "../components/MainPage/Navigation/Header";
import SendVerificationEmailComponent from "../components/SenVerificationEmailComponent";

export default function SendVerificationEmail() {
	const { data: session } = useSession();
	return (
		<div className="h-screen">
			<Header session={session} />
			<SendVerificationEmailComponent />
		</div>
	);
}
