import { GET_LAUNCHES_PAST } from "../../hooks/useLaunches";
import LaunchList from "./index";
import { MockedProvider } from "@apollo/client/testing";
import {
	render,
	screen,
} from "@testing-library/react";

const mocks = [
	{
		request: {
			query: GET_LAUNCHES_PAST,
			variables: {
				limit: 5,
			},
		},
		result: {
			data: {
				launchesPast: [
					{
						mission_name: "Starlink-15 (v1.0)",
						id: "109",
						launch_success: true,
					},
					{
						mission_name: "Sentinel-6 Michael Freilich",
						id: "108",
						launch_success: true,
					},
					{
						mission_name: "Crew-1",
						id: "107",
						launch_success: true,
					},
					{
						mission_name: "GPS III SV04 (Sacagawea)",
						id: "106",
						launch_success: true,
					},
					{
						mission_name: "Starlink-14 (v1.0)",
						id: "105",
						launch_success: true,
					},
				],
			},
		},
	},
];

const mocksError = [
	{
		request: {
			query: GET_LAUNCHES_PAST,
			variables: {
				limit: 5,
			},
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
			<LaunchList />
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
			<LaunchList />
		</MockedProvider>
	);

	const LoadingText =
		screen.getByText(/Loading.../i);

	expect(LoadingText).toBeInTheDocument();
});
