import React, {
	useState,
	useCallback,
} from "react";
import { useRockets } from "../../hooks/useRockets";
import "./styles.css";
import SortButton from "./sortButton";
import SortData from "./sortDataFunction";

export type SortKeys =
	| "id"
	| "name"
	| "description"
	| "mass";

export type SortOrder = "asc" | "desc";

export default function Table() {
	const { data, loading, error } = useRockets();

	const [sortKey, setSortKey] =
		useState<SortKeys>("mass");

	const [sortOrder, setSortOrder] =
		useState<SortOrder>("asc");

	const headers: {
		key: SortKeys;
		label: string;
	}[] = [
		{ key: "name", label: "Name" },
		{ key: "description", label: "Description" },
		{ key: "mass", label: "Weight (kg)" },
	];

	const sortedData = useCallback(
		() =>
			SortData({
				tableData: data,
				sortKey,
				reverse: sortOrder === "desc",
			}),
		[data, sortKey, sortOrder]
	);

	function changeSort(key: SortKeys) {
		setSortOrder(
			sortOrder === "asc" ? "desc" : "asc"
		);
		setSortKey(key);
	}

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
				<h2>Rockets available and active</h2>
			</div>
			<table>
				<thead>
					<tr>
						{headers.map((row) => (
							<td
								key={row.key}
								className="columnTitle"
							>
								<h5>{row.label}</h5>
								<SortButton
									columnKey={row.key}
									onClick={() =>
										changeSort(row.key)
									}
									{...{
										sortOrder,
										sortKey,
									}}
								/>
							</td>
						))}
					</tr>
				</thead>
				<tbody>
					{sortedData().map((a) => (
						<tr key={a.id}>
							<td>{a.name}</td>
							<td>{a.description}</td>
							<td>{a.mass.kg}</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}
