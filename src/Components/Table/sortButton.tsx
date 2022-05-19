import React, { MouseEventHandler } from "react";
import { SortOrder, SortKeys } from "./index";

export default function SortButton({
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
			data-testid={`button-case-${sortKey}`}
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
