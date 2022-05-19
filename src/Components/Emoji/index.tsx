import React from "react";

interface Props {
	label: string;
	symbol: string;
}

export default function Emoji({
	label,
	symbol,
}: Props) {
	return (
		<span
			className="emoji"
			role="img"
			aria-label={label || ""}
			aria-hidden={label ? "false" : "true"}
		>
			{symbol}
		</span>
	);
}
