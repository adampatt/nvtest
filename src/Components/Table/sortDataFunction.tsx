import { RocketData } from "../../hooks/useRockets";
import { SortKeys } from "./index";

export default function SortData({
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
		sDat
			.filter((rocket) => rocket.active)
			.sort((a, b) => {
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
