"use client";
import Head from "next/head";
import BackgroundGlow from "../components/BackgroundGlow";
import Herosection from "../components/Hero";
import FeatureSection from "../components/Features";
import PricingSection from "../components/Pricing";
import Testimonials from "../components/Testimonials";
import StatsSection from "../components/Stats";
import FooterSection from "../components/Footer";
import GridLines from "../components/GridLines";
import Navigation from "../components/Navigation/layout";
import { useSession } from "next-auth/react";

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
			<Testimonials />
			<FooterSection />
			<BackgroundGlow />
		</>
	);
}
