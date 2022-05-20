import React from "react";
import renderer from "react-test-renderer";
import Emoji from "./index";

it("renders when there are no inputs", () => {
	const tree = renderer
		.create(<Emoji />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it("renders when there is a label added", () => {
	const label = "tick";
	const tree = renderer
		.create(<Emoji label={label} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it("renders when there is a label and symbol input", () => {
	const label = "tick";
	const symbol = "✅";
	const tree = renderer
		.create(
			<Emoji label={label} symbol={symbol} />
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
