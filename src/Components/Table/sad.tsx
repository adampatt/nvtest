/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, {
	MouseEventHandler,
	useState,
	useCallback,
	useEffect,
} from "react";
import {
	useRockets,
	Rockets,
	RocketData,
} from "../../hooks/useRockets";

type SortKeys =
	| "id"
	| "name"
	| "description"
	| "mass";

type SortOrder = "ascn" | "desc";

function sortData({
	tableData,
	sortKey,
	reverse,
}: {
	tableData?: RocketData;
	sortKey: SortKeys;
	reverse: boolean;
}) {
	const sDat = [...(tableData?.rockets || [])];
	const sortedData =
		sDat.sort((a, b) => {
			if (a[sortKey] < b[sortKey]) {
				return -1;
			}
			return 1;
		}) || [];

	if (reverse) {
		return sortedData?.reverse();
	}
	return sortedData;
}

function SortButton({
	sortOrder,
	columnKey,
	sortKey,
	onClick,
}: {
	sortOrder: SortOrder;
	columnKey: SortKeys;
	sortKey: SortKeys;
	onClick: MouseEventHandler<HTMLButtonElement>;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`${
				sortKey === columnKey &&
				sortOrder === "desc"
					? "sort-button sort-reverse"
					: "sort-button"
			}`}
		>
			▲
		</button>
	);
}

export default function Table() {
	const { data, loading, error } = useRockets();
	const [sortKey, setSortKey] =
		useState<SortKeys>("mass");
	const [sortOrder, setSortOrder] =
		useState<SortOrder>("ascn");

	const headers: {
		key: SortKeys;
		label: string;
	}[] = [
		{ key: "name", label: "Name" },
		{ key: "description", label: "Description" },
		{ key: "mass", label: "Weight (kg)" },
	];

	// eslint-disable-next-line no-unsafe-optional-chaining
	const fildData = [data?.rockets];
	console.log({ fildData });

	const sortedData = useCallback(
		() =>
			sortData({
				tableData: data,
				sortKey,
				reverse: sortOrder === "desc",
			}),
		[data, sortKey, sortOrder]
	);

	function changeSort(key: SortKeys) {
		setSortOrder(
			sortOrder === "ascn" ? "desc" : "ascn"
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
	);
}
