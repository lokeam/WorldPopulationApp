import React from 'react';

class WorldRank extends React.Component {

	render(){
		return(
			<div className="panel panel-default">
				<div className="row panel-body">
				  <div className="col-md-6">
				  	<p>
				  		<span>DOB: </span><span>{this.props.dob}</span>
				  	</p>
				  </div>
				  <div className="col-md-6">
				  	<p>Your rank in the world</p>
				  </div>
				  <div className="col-md-6">
				  	<p>
				  		<span>Gender: </span><span>{this.props.gender}</span>
				  	</p>
				  </div>
				  <div className="col-md-6">
				  	<p>You are ranked <span>{this.props.ranking}</span></p>
				  </div>
			 	</div>
			</div>
		)
	}
}

export default WorldRank;