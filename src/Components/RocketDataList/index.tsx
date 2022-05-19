/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, {
	useState,
	useEffect,
} from "react";
import {
	useRockets,
	Rockets,
} from "../../hooks/useRockets";

const defaultRocketData: Rockets[] = [];

type SortKeys =
	| "active"
	| "description"
	| "id"
	| "name"
	| "mass";

export default function RocketDataTable() {
	const { data, loading, error } = useRockets();
	const [rocketData, setRocketData]: [
		Rockets[],
		(data: Rockets[]) => void
	] = useState(defaultRocketData);
	const [order, setOrder] = useState("asc");

	useEffect(() => {
		if (loading === false && data) {
			setRocketData(
				data.rockets.filter(
					(rocket) => rocket.active
				)
			);
		}
	}, [loading, data]);

	const sorting = (mass: string) => {
		if (order === "asc") {
			const sorted = [...rocketData].sort(
				(a, b) => (a.mass.kg > b.mass.kg ? 1 : -1)
			);
			setRocketData(sorted);
			setOrder("des");
		}
		if (order === "des") {
			const sorted = [...rocketData].sort(
				(a, b) => (a.mass.kg > b.mass.kg ? -1 : 1)
			);
			setRocketData(sorted);
			setOrder("asc");
		}
	};

	const headers: {
		key: SortKeys;
		label: string;
	}[] = [
		{ key: "name", label: "Name" },
		{ key: "description", label: "Description" },
		{ key: "mass", label: "Weight" },
	];

	if (error) {
		return <div>`Error! ${error.message}`</div>;
	}
	if (loading || !data) {
		return (
			<div data-testid="loading-stage">
				Loading...
			</div>
		);
	}

	return (
		<section className="RocketTableContainer">
			<div className="RocketTableHeader">
				<h1>Available Rockets</h1>
				<button
					type="button"
					onClick={() => sorting("mass")}
				>
					Sort in
					{order === "asc"
						? " Ascending "
						: " Descending "}
					order of weight
				</button>
			</div>
			<table>
				<thead>
					<tr>
						{headers.map((row) => (
							<td key={row.key}>{row.label}</td>
						))}
					</tr>
				</thead>
				<tbody>
					{rocketData.map((d) => (
						<tr
							key={d.id}
							data-testid={`tr-case-${d.id}`}
						>
							<td>{d.name}</td>
							<td>{d.description}</td>
							<td>{d.mass.kg}</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}
