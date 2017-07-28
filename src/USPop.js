import React from 'react';

class USPop extends React.Component{
  render() {
  	return(
  		<div className="">
  			<h2 className="text-center">USA Population</h2>
  			<p className="text-center">As of today</p>
  			<p className="text-center h3">{this.props.population}</p>
  		</div>
  	)
  }
}

export default USPop;