import React from 'react';
import axios from 'axios';
import ShortCountry from './ShortCountry';

class ShortPop extends React.Component{
	constructor(props){
		super(props);
		this.defaultValues = {
			displayed:0,
			shortest:[],
			shortestArr:[],
			totalpop:0,
			countVisible: false
		}
		this.state = this.defaultValues;
		this.handleSubmit = this.handleSubmit.bind(this);
		this.hanldeClick = this.hanldeClick.bind(this);
	}

	/* Toggle the visibility of both buttons */
	toggle(value) {
		this.setState(function(state, props){
			return { countVisible: !this.state.rankingVisible }
		})
	}
	hanldeClick(e){
		console.log('clicked!');
	}
	handleSubmit(e) {

		e.preventDefault();
		console.log('about to get country list');
		var clist = 'countries'

		/* Get list of country names */
		axios.get('http://api.population.io:80/1.0/'+clist)
	    	.then(res => {
	    		var carr = res.data.countries;

	    		/* Find the length of the shortest country in arry */
	    		var min = Math.min.apply(Math, carr.map(function(str) { return str.length; }));

	    		/* Filter country array to those who match shortest length and is not a continent */
	    		var sarr = carr.filter( function( el ) {
	    			return el.length == min && el != "ASIA";
					});

	    		/* Number of countries to be displayed */
	    		var sarr_length = sarr.length,
	    				shortestCountryArr = [];

	    		/* Create state array of country data to cycle through */
	    		for ( var i = 0; i < sarr_length; i++ ) {
	    			var popTemplate = {
	    				female: 0,
	    				male: 0,
	    				name: '',
	    				total: 0,
	    			};
	    			popTemplate.name = sarr[i];
	    			shortestCountryArr.push(popTemplate);
	    		}

	    		this.setState(function(state, props) {
	    			return {displayed: sarr_length, shortest: sarr, shortestArr: shortestCountryArr}
	    		})
	    		this.toggle();

	    		console.log('showing this.state (updated from shortpop): ', this.state);
	    	})
	}

	render() {
		const counterbox = (this.state.countVisible ?
			<div value={this.state.value} className="row bs-docs-section">
				  <div className="col-md-6">
				  	<p className="h4">
				  		<span>Total Population of Countries: </span>
				  		<span>Number</span>
				  	</p>
				  </div>
				  <div className="col-md-6">
					  <p className="h4">
					  	<span>Number of Countries: </span>
					  	<span>{this.state.displayed}</span>
					  </p>
				  </div>
			</div>
		: null);
		const shortcountries = this.state.shortestArr.map((object, index) => <ShortCountry key={index} name={object.name}/> );

		return(
			<div className="row" onClick={this.hanldeClick}>
				<div className="jumbotron">
					<h3 className="text-center">Shortest Country Names</h3>
					<p className="text-center">Populations of countries with shortest names</p>
					<p className="text-center">
						<a className="btn btn-primary btn-lg" role="button" onClick={this.handleSubmit}>Fetch</a>
					</p>
				</div>
				{counterbox}
				{shortcountries}
			</div>
		)
	}
}

export default ShortPop;