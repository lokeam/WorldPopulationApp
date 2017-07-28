import React from 'react';

class ShortCountry extends React.Component{
	constructor(props){
		super(props);
		this.defaultValues = {
			selectedItem:''
		}
		this.state = this.defaultValues;
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		console.log('clicked: ', e);
		this.setState({ selectedItem: e.currentTarget.dataset.id });
		console.log('checking state: ', this.state);
	}
	// callAPI(e) {
	// 	var today = new Date(),
	// 			currentYear = today.getFullYear();

	// 	/*http://api.population.io:80/1.0/population/2017/Brazil/18/*/
	// 	// axios.get('http://api.population.io:80/1.0/population/'+currentYear+'/'+currentDate+'/')
	// 	// 	.then(res => {
	// 	// 		this.state.world = res.data.total_population.population;
	// 	// 		var worldPopulation = res.data.total_population.population;
	// 	// 		worldPopulation = insert_commas(worldPopulation);
	// 	// 		this.setState(function(state, props) {
	// 	// 			return {world: worldPopulation}
	// 	// 		})
	// 	// 	});
	// }

	render(){
		const name = this.props.name,
					key = this.props.key;

		return(

			<div className="panel panel-default shco" id={key} onclick={this.handleClick.bind(this)}>
				<div className="row panel-body">
				  <div className="col-md-6">
				  	<p className="h3">
				  		<span>{name}</span>
				  	</p>
				  </div>
				  <div className="col-md-6">
				  	<p className="h4">
				  		<span>Male Population</span>
				  		<span>Number</span>
				  	</p>
				  </div>
				  <div className="col-md-6">
					  <p className="h4">
					  	<span>Female Population</span>
					  	<span>Number</span>
					  </p>
				  </div>
				  <div className="col-md-6">
				  <p className="h4">
				  	<span>Total Population</span><span>Number</span>
				  </p>
				  </div>
			 	</div>
			</div>
		)
	}
}

export default ShortCountry;