import { useLaunchPad } from "../../hooks/useLaunchPad";
import LaunchDataCard from "./launchPadDataCard";

export default function LaunchPadData() {
	const { error, loading, data } = useLaunchPad();
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
		<section className="sectionContainer">
			<div className="titleHolder">
				<h2>Location of Launchpads</h2>
			</div>
			<div className="CardContainer">
				{data.launchpads.map((lp) => (
					<LaunchDataCard
						details={lp.details}
						location={lp.location}
						name={lp.name}
						id={lp.id}
					/>
				))}
			</div>
		</section>
	);
}
