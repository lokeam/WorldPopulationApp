import React from 'react';

class WorldPop extends React.Component {
	render() {
		return(
			<div className="">
				<h2 className="text-center">World Population</h2>
				<p className="text-center">As of today</p>
				<p className="text-center h3">{this.props.population}</p>
			</div>
		)
	}
}

export default WorldPop;