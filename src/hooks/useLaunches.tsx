import { useQuery, gql } from "@apollo/client";

export interface Launches {
	mission_name: string;
	rocket: {
		rocket_name: string;
	};
	launch_success: boolean;
	id: number;
}

export interface LaunchesPastData {
	launchesPast: Launches[];
}

interface LaunchesPastVars {
	limit: number;
}

export const GET_LAUNCHES_PAST = gql`
	query GetLaunchesPast($limit: Int!) {
		launchesPast(limit: $limit) {
			mission_name
			rocket {
				rocket_name
			}
			launch_success
			id
		}
	}
`;

export function useLaunches() {
	const { loading, error, data } = useQuery<
		LaunchesPastData,
		LaunchesPastVars
	>(GET_LAUNCHES_PAST, {
		variables: { limit: 5 },
	});
	return {
		loading,
		error,
		data,
	};
}
