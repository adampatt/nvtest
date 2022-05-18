import { MockedProvider } from "@apollo/client/testing";
import {
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import { GET_LAUNCHPAD_DETAILS } from "../../hooks/useLaunchPad";
import LaunchPadData from "./index";

const mocks = [
	{
		request: {
			query: GET_LAUNCHPAD_DETAILS,
		},
		result: {
			data: {
				launchpads: [
					{
						details:
							"SpaceX original west coast launch pad for Falcon 1. Performed a static fire but was never used for a launch and abandoned due to scheduling conflicts.",
						location: {
							name: "Vandenberg Air Force Base",
							region: "California",
						},
						id: "vafb_slc_3w",
						name:
							"Vandenberg Air Force Base Space Launch Complex 3W",
					},
					{
						details:
							"SpaceX primary Falcon 9 launch pad, where all east coast Falcon 9s launched prior to the AMOS-6 anomaly. Initially used to launch Titan rockets for Lockheed Martin. Back online since CRS-13 on 2017-12-15.",
						location: {
							name: "Cape Canaveral",
							region: "Florida",
						},
						id: "ccafs_slc_40",
						name:
							"Cape Canaveral Air Force Station Space Launch Complex 40",
					},
					{
						details:
							"SpaceX new launch site currently under construction to help keep up with the Falcon 9 and Heavy manifests. Expected to be completed in late 2018. Initially will be limited to 12 flights per year, and only GTO launches.",
						location: {
							name: "Boca Chica Village",
							region: "Texas",
						},
						id: "stls",
						name: "SpaceX South Texas Launch Site",
					},
					{
						details:
							"SpaceX original launch site, where all of the Falcon 1 launches occured. Abandoned as SpaceX decided against upgrading the pad to support Falcon 9.",
						location: {
							name: "Omelek Island",
							region: "Marshall Islands",
						},
						id: "kwajalein_atoll",
						name: "Kwajalein Atoll Omelek Island",
					},
					{
						details:
							"SpaceX primary west coast launch pad for polar orbits and sun synchronous orbits, primarily used for Iridium. Also intended to be capable of launching Falcon Heavy.",
						location: {
							name: "Vandenberg Air Force Base",
							region: "California",
						},
						id: "vafb_slc_4e",
						name:
							"Vandenberg Air Force Base Space Launch Complex 4E",
					},
					{
						details:
							"NASA historic launch pad that launched most of the Saturn V and Space Shuttle missions. Initially for Falcon Heavy launches, it is now launching all of SpaceX east coast missions due to the damage from the AMOS-6 anomaly. After SLC-40 repairs are complete, it will be upgraded to support Falcon Heavy, a process which will take about two months. In the future it will launch commercial crew missions and the Interplanetary Transport System.",
						location: {
							name: "Cape Canaveral",
							region: "Florida",
						},
						id: "ksc_lc_39a",
						name:
							"Kennedy Space Center Historic Launch Complex 39A",
					},
				],
			},
		},
	},
];

const mocksError = [
	{
		request: {
			query: GET_LAUNCHPAD_DETAILS,
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
			<LaunchPadData />
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
			<LaunchPadData />
		</MockedProvider>
	);

	const LoadingText =
		screen.getByText(/Loading.../i);

	expect(LoadingText).toBeInTheDocument();
});

it("renders Launchpad details with correct length", async () => {
	render(
		<MockedProvider
			mocks={mocks}
			addTypename={false}
		>
			<LaunchPadData />
		</MockedProvider>
	);

	await waitFor(() => {
		expect(
			screen.getAllByTestId("LaunchPadData")
		).toHaveLength(6);
	});
});
