"use client";
import Head from "next/head";
import BackgroundGlow from "../components/VisualComponents/BackgroundGlow";
import Herosection from "../components/MainPage/Hero";
import FeatureSection from "../components/MainPage/Features";
import PricingSection from "../components/MainPage/Pricing";
import StatsSection from "../components/MainPage/Stats";
import FooterSection from "../components/JobDataHandler/Footer";
import GridLines from "../components/VisualComponents/GridLines";
import Navigation from "../components/MainPage/Navigation/layout";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
	const { data: session } = useSession();

	return (
		<>
			<Head>
				<link
					rel="icon"
					href="/favicon.ico"
					sizes="any"
				/>
			</Head>
			<Navigation session={session}></Navigation>
			<GridLines />
			<Herosection />
			<FeatureSection />
			<PricingSection />
			<StatsSection />
			<FooterSection />
			<BackgroundGlow />
		</>
	);
}
