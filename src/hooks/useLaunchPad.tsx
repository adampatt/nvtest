import { useQuery, gql } from "@apollo/client";

export interface Launchpads {
	details: string;
	id: number;
	location: {
		name: string;
		region: string;
	};
	name: string;
}

export interface LaunchPadsData {
	launchpads: Launchpads[];
}

export const GET_LAUNCHPAD_DETAILS = gql`
	query GetLaunchesPast {
		launchpads {
			details
			id
			location {
				name
				region
			}
			name
		}
	}
`;

export function useLaunchPad() {
	const { loading, error, data } =
		useQuery<LaunchPadsData>(GET_LAUNCHPAD_DETAILS);
	return {
		loading,
		error,
		data,
	};
}
