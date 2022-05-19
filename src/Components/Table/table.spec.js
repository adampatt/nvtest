import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import {
	render,
	screen,
} from "@testing-library/react";
import { GET_ROCKETS } from "../../hooks/useRockets";
import Table from "./index";

const mocks = [
	{
		request: {
			query: GET_ROCKETS,
		},
		result: {
			data: {
				rockets: [
					{
						active: false,
						description:
							"The Falcon 1 was an expendable launch system privately developed and manufactured by SpaceX during 2006-2009. On 28 September 2008, Falcon 1 became the first privately-developed liquid-fuel launch vehicle to go into orbit around the Earth.",
						id: "falcon1",
						name: "Falcon 1",
						mass: {
							kg: 30146,
						},
					},
					{
						active: true,
						description:
							"Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit.",
						id: "falcon9",
						name: "Falcon 9",
						mass: {
							kg: 549054,
						},
					},
					{
						active: true,
						description:
							"With the ability to lift into orbit over 54 metric tons (119,000 lb)--a mass equivalent to a 737 jetliner loaded with passengers, crew, luggage and fuel--Falcon Heavy can lift more than twice the payload of the next closest operational vehicle, the Delta IV Heavy, at one-third the cost.",
						id: "falconheavy",
						name: "Falcon Heavy",
						mass: {
							kg: 1420788,
						},
					},
					{
						active: false,
						description:
							"Starship and Super Heavy Rocket represent a fully reusable transportation system designed to service all Earth orbit needs as well as the Moon and Mars. This two-stage vehicle — composed of the Super Heavy rocket (booster) and Starship (ship) — will eventually replace Falcon 9, Falcon Heavy and Dragon.",
						id: "starship",
						name: "Starship",
						mass: {
							kg: 1335000,
						},
					},
				],
			},
		},
	},
];

const mocksError = [
	{
		request: {
			query: GET_ROCKETS,
		},
		error: new Error("An error occurred"),
	},
];

it("renders error stage", async () => {
	render(
		<MockedProvider
			mocks={mocksError}
			addTypename={false}
		>
			<Table />
		</MockedProvider>
	);

	const ErrorText = await screen.findByText(
		/Error!/i
	);

	expect(ErrorText).toBeInTheDocument();
});

it("renders loading stage", async () => {
	render(
		<MockedProvider
			mocks={mocks}
			addTypename={false}
		>
			<Table />
		</MockedProvider>
	);

	const LoadingText =
		screen.getByText(/Loading.../i);

	expect(LoadingText).toBeInTheDocument();
});

it("renders with MockedProviderData", async () => {
	render(
		<MockedProvider
			mocks={mocks}
			addTypename={false}
		>
			<Table />
		</MockedProvider>
	);

	const LaunchPadSiteName =
		await screen.findByText("Falcon Heavy");
	expect(LaunchPadSiteName).toBeInTheDocument();
});

it("renders table", async () => {
	render(
		<MockedProvider
			mocks={mocks}
			addTypename={false}
		>
			<Table />
		</MockedProvider>
	);
	const TableElement = await screen.findAllByRole(
		"table"
	);
	expect(TableElement).toHaveLength(1);
});
