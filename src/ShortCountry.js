import React from 'react';
import axios from 'axios';

class ShortCountry extends React.Component{
	constructor(props){
		super(props);
		this.defaultValues = {
			selectedItem:'',
		}
		this.state = this.defaultValues;
	}

	/* NOTE: Stuck trying to sort out how to properly add individual clicked items to state */

	handleClick(name, e) {
		console.log('name: ', name );
			/*http://api.population.io:80/1.0/population/2017/Brazil/18/*/
		var today = new Date(),
				currentYear = today.getFullYear(),
				clickedCountry = name;
				console.log('checking clickedCountry: ', clickedCountry);
		console.log('inside click, currentYear: ', currentYear);
		axios.get('http://api.population.io:80/1.0/population/'+currentYear+'/'+clickedCountry+'/18/')
			.then(res => {
				console.log('checking res.data: ', res.data);

				var clickedPopulation = res.data[0];
				var clickedCountryF = clickedCountry+'-females',
						clickedCountryM = clickedCountry+'-males',
						clickedCountryT = clickedCountry+'-total';
				console.log('checking clickedCountryF: ', clickedCountryF);

				/* This doesn't yet work: rewrites the state every time with clicked information instead of adding to it */
				this.setState(function(state, props) {
				return {
								[clickedCountryF]: clickedPopulation.females,
								[clickedCountryM]: clickedPopulation.males,
								[clickedCountryT]: clickedPopulation.total
							}
				})
				console.log('testing state: ', this.state);
			});
	}

	render(){
		const name = this.props.name,
					key = this.props.key;
		return(

			<div className="panel panel-default shco" id={key} key={key} onClick={this.handleClick.bind(this, name)}>
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