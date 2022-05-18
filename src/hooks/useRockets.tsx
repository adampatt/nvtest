import { useQuery, gql } from "@apollo/client";

export interface Rockets {
	active: boolean;
	description: string;
	id: string;
	name: string;
	mass: {
		kg: number;
	};
}

export interface RocketData {
	rockets: Rockets[];
}

export const GET_ROCKETS = gql`
	query {
		rockets {
			active
			description
			id
			name
			mass {
				kg
			}
		}
	}
`;

export const useRockets = () => {
	const { error, loading, data } =
		useQuery<RocketData>(GET_ROCKETS);
	return {
		error,
		data,
		loading,
	};
};
