function SortData(data) {
	const sortedData = data.rockets.filter(
		(rocket) => rocket.active
	);
	return sortedData;
}

function SortingData(data, sortKey) {
	const sortedData =
		data.rockets
			.map((d) => ({
				active: d.active,
				description: d.description,
				id: d.id,
				name: d.name,
				mass: d.mass.kg,
			}))
			.sort((a, b) => {
				if (a[sortKey] < b[sortKey]) {
					return -1;
				}
				return 1;
			}) || [];
	return sortedData;
}

test("returns undefined by default", () => {
	const mock = jest.fn();

	const result = mock("foo");

	expect(result).toBeUndefined();
	expect(mock).toHaveBeenCalled();
	expect(mock).toHaveBeenCalledTimes(1);
	expect(mock).toHaveBeenCalledWith("foo");
});

function filterByTerm(inputArr, searchTerm) {
	return inputArr.rockets.filter((arrayElement) =>
		arrayElement.name.match(searchTerm)
	);
}

describe("Filters by name", () => {
	test("it should filter by a search term name of rocket", () => {
		// const input = [
		// 	{ id: 1, url: "https://www.url1.dev" },
		// 	{ id: 2, url: "https://www.url2.dev" },
		// 	{ id: 3, url: "https://www.link3.dev" },
		// ];

		const input = {
			rockets: [
				{
					active: false,
					name: "Falcon 1",
					mass: {
						kg: 30146,
					},
				},
				{
					active: true,
					name: "Falcon 9",
					mass: {
						kg: 549054,
					},
				},
				{
					active: true,
					name: "Falcon Heavy",
					mass: {
						kg: 1420788,
					},
				},
				{
					active: false,
					name: "Starship",
					mass: {
						kg: 1335000,
					},
				},
			],
		};
		const output = [
			{
				active: true,
				name: "Falcon 9",
				mass: {
					kg: 549054,
				},
			},
		];

		expect(
			filterByTerm(input, "Falcon 9")
		).toEqual(output);
	});
});

describe("Filter and sort ", () => {
	test("it should filter by active rockets", () => {
		const input = {
			rockets: [
				{
					active: false,
					name: "Falcon 1",
					mass: {
						kg: 30146,
					},
				},
				{
					active: true,
					name: "Falcon 9",
					mass: {
						kg: 549054,
					},
				},
				{
					active: true,
					name: "Falcon Heavy",
					mass: {
						kg: 1420788,
					},
				},
				{
					active: false,
					name: "Starship",
					mass: {
						kg: 1335000,
					},
				},
			],
		};
		const output = [
			{
				active: true,
				mass: { kg: 549054 },
				name: "Falcon 9",
			},
			{
				active: true,
				mass: { kg: 1420788 },
				name: "Falcon Heavy",
			},
		];

		expect(SortData(input)).toEqual(output);
	});
	test("it should sort by mass", async () => {
		const massInput = {
			rockets: [
				{
					active: true,
					description:
						"Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit.",
					id: "falcon9",
					name: "Falcon 9",
					mass: {
						kg: 549054,
					},
				},
				{
					active: false,
					description:
						"The Falcon 1 was an expendable launch system privately developed and manufactured by SpaceX during 2006-2009. On 28 September 2008, Falcon 1 became the first privately-developed liquid-fuel launch vehicle to go into orbit around the Earth.",
					id: "falcon1",
					name: "Falcon 1",
					mass: {
						kg: 30146,
					},
				},
				{
					active: true,
					description:
						"With the ability to lift into orbit over 54 metric tons (119,000 lb)--a mass equivalent to a 737 jetliner loaded with passengers, crew, luggage and fuel--Falcon Heavy can lift more than twice the payload of the next closest operational vehicle, the Delta IV Heavy, at one-third the cost.",
					id: "falconheavy",
					name: "Falcon Heavy",
					mass: {
						kg: 1420788,
					},
				},
				{
					active: false,
					description:
						"Starship and Super Heavy Rocket represent a fully reusable transportation system designed to service all Earth orbit needs as well as the Moon and Mars. This two-stage vehicle — composed of the Super Heavy rocket (booster) and Starship (ship) — will eventually replace Falcon 9, Falcon Heavy and Dragon.",
					id: "starship",
					name: "Starship",
					mass: {
						kg: 1335000,
					},
				},
			],
		};
		const massOutput = [
			{
				active: false,
				description:
					"The Falcon 1 was an expendable launch system privately developed and manufactured by SpaceX during 2006-2009. On 28 September 2008, Falcon 1 became the first privately-developed liquid-fuel launch vehicle to go into orbit around the Earth.",
				id: "falcon1",
				name: "Falcon 1",
				mass: 30146,
			},
			{
				active: true,
				description:
					"Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit.",
				id: "falcon9",
				name: "Falcon 9",
				mass: 549054,
			},
			{
				active: false,
				description:
					"Starship and Super Heavy Rocket represent a fully reusable transportation system designed to service all Earth orbit needs as well as the Moon and Mars. This two-stage vehicle — composed of the Super Heavy rocket (booster) and Starship (ship) — will eventually replace Falcon 9, Falcon Heavy and Dragon.",
				id: "starship",
				name: "Starship",
				mass: 1335000,
			},
			{
				active: true,
				description:
					"With the ability to lift into orbit over 54 metric tons (119,000 lb)--a mass equivalent to a 737 jetliner loaded with passengers, crew, luggage and fuel--Falcon Heavy can lift more than twice the payload of the next closest operational vehicle, the Delta IV Heavy, at one-third the cost.",
				id: "falconheavy",
				name: "Falcon Heavy",
				mass: 1420788,
			},
		];
		await expect(
			SortingData(massInput, "mass")
		).toEqual(massOutput);
	});
});
