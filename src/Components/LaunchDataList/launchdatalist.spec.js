import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import {
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import { GET_LAUNCHES_PAST } from "../../hooks/useLaunches";
import LaunchList from "./index";

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
						rocket: {
							rocket_name: "Falcon 9",
						},
					},
					{
						mission_name:
							"Sentinel-6 Michael Freilich",
						id: "108",
						launch_success: true,
						rocket: {
							rocket_name: " Falcon 9",
						},
					},
					{
						mission_name: "Crew-1",
						id: "107",
						launch_success: true,
						rocket: {
							rocket_name: " Falcon 9",
						},
					},
					{
						mission_name:
							"GPS III SV04 (Sacagawea)",
						id: "106",
						launch_success: true,
						rocket: {
							rocket_name: " Falcon 9",
						},
					},
					{
						mission_name: "Starlink-14 (v1.0)",
						id: "105",
						launch_success: true,
						rocket: {
							rocket_name: " Falcon 9",
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
			query: GET_LAUNCHES_PAST,
			variables: {
				limit: 5,
			},
		},
		error: new Error("An error occurred"),
	},
];

const mocksNoData = [
	{
		request: {
			query: GET_LAUNCHES_PAST,
			variables: {
				limit: 5,
			},
		},
		result: {
			data: {
				launchesPast: [],
			},
		},
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

it("renders loading stage", () => {
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

it("renders no launches when launches array is empty", async () => {
	render(
		<MockedProvider
			mocks={mocksNoData}
			addTypename={false}
		>
			<LaunchList />
		</MockedProvider>
	);

	const NoLaunchesText =
		await screen.findByTestId(
			"no-data-to-display"
		);

	expect(NoLaunchesText).toBeInTheDocument();
});

it("renders the five most recent launches", async () => {
	render(
		<MockedProvider
			mocks={mocks}
			addTypename={false}
		>
			<LaunchList />
		</MockedProvider>
	);

	await waitFor(() => {
		const limitToCheck =
			mocks[0].request.variables.limit;
		const pastLaunchCard = screen.getAllByTestId(
			"PastLaunchData"
		);
		expect(pastLaunchCard).toHaveLength(
			limitToCheck
		);
	});
});
