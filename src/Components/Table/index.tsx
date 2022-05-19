import React, {
	MouseEventHandler,
	useState,
	useCallback,
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

// export this to test in its own section
function sortData({
	tableData,
	sortKey,
	reverse,
}: {
	tableData?: RocketData;
	sortKey: SortKeys;
	reverse: boolean;
}) {
	// return [{ name: "adam" }]; good way to check
	const sDat = [...(tableData?.rockets || [])];
	const sortedData =
		sDat.sort((a, b) => {
			// if (a[sortKey] < b[sortKey]) {
			// 	return -1;
			// }
			// return 1;

			const nameA = a.id.toUpperCase(); // ignore upper and lowercase
			const nameB = b.id.toUpperCase(); // ignore upper and lowercase
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}

			return 0;
		}) || [];

	if (reverse) {
		return sortedData?.reverse();
	}
	console.log({ sortedData });
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

export default function Desas() {
	const { data, loading, error } = useRockets();
	const [sortKey, setSortKey] =
		useState<SortKeys>("mass");
	const [sortOrder, setSortOrder] =
		useState<SortOrder>("ascn");

	const headers: {
		key: SortKeys;
		label: string;
	}[] = [
		{ key: "id", label: "ID" },
		{ key: "name", label: "Name" },
		{ key: "description", label: "Description" },
		{ key: "mass", label: "Weight" },
	];

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
		<>
			<h1>Sm</h1>
			<table>
				<thead>
					<tr>
						{/* {headers.map((row) => (
							<td key={row.key}>
								{row.label}{" "}
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
						))} */}
					</tr>
				</thead>

				<tbody>
					{/* {sortedData().map((a) => (
					<tr key={a.id}>
						<td>{a.id}</td>
						<td>{a.name}</td>
						<td>{a.description}</td>
						<td>{a.mass.kg}</td>
					</tr>
				))} */}
				</tbody>
			</table>
		</>
	);
}
