import React from 'react';
import axios from 'axios';
import WorldRank from './WorldRank';

class Ranking extends React.Component{

	constructor(props) {
	    super(props);
	    this.defaultValues = {
	    		dob: '',
	    		gender: '',
	    		rank: '',
	    		rankingVisible: false,
	    		fetchVisible: true,
	    		worldrankcomp: 0};
	    this.state = this.defaultValues;
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	  }

	  toggle(value) {
	  	/* Toggle the visibility of both buttons */
	  	this.setState(function(state, props){
	  		return { rankingVisible: !this.state.rankingVisible, fetchVisible: !this.state.fetchVisible }
	  	})
	  }

	  handleChange(e) {
	  		var newState = {};
	  		newState[e.target.name] = e.target.value;
	  		this.setState(newState);
	  }

	  handleSubmit(e) {
	  	/* Convert Number to String, insert commas */
	  	var insert_commas = function(num) {
	  		var str, i;
	  		str = "" + num;
	  		for (i = str.length - 3; i > 0; i -= 3) {
	  			str = str.substr(0, i) + "," + str.substr(i);
	  		}
	  		return str;
	  	}

	    console.log('state from Ranking: ', JSON.stringify(this.state));
	    e.preventDefault();

	    /* Call World Ranking API */
	    axios.get('http://api.population.io:80/1.0/wp-rank/'+this.state.dob+'/'+this.state.gender+'/United%20States/today/')
	    	.then(res => {
	    		var userRank = res.data.rank;
	    		userRank = insert_commas(userRank);
	    		this.setState(function(state, props) {
	    			return {rank: userRank}
	    		})
	    		this.toggle();
	    		console.log('showing this.state (updated): ', this.state);
	    	});
	  }

	render() {
		const worldrank = (this.state.rankingVisible ? <WorldRank value={this.state.value} ranking={this.state.rank} dob={this.state.dob} gender={this.state.gender}/> : null),
					clearbtn = (this.state.rankingVisible ? <button value={this.state.value} className="btn btn-danger" type="submit" >Clear</button> : null),
					fetchbtn = (this.state.fetchVisible ? <button value={this.state.value} className="btn btn-primary" type="submit" >Fetch</button>: null);
		return(
			<div className="center-block">
				<div className="bs-docs-section">
					<h3 className="text-center">Check Your Ranking</h3>
					<p className="text-center">Enter your information to check where you rank</p>
					<div className="col-lg-12">
						<form className="text-center" onSubmit={this.handleSubmit}>
							<label className="col-lg-4">Birth Date
								<input className="form-control col-md-4" type="text" name="dob" placeholder="year-month-day"onChange={this.handleChange} />
							</label>
	    				<label className="col-lg-4">Gender
	              <select className="form-control col-md-4" name="gender" value={this.state.gender} onChange={this.handleChange}>
	                <option></option>
	                <option>male</option>
	                <option>female</option>
	              </select>
	            </label>
	            <label className="col-lg-4 buttonfix">
	            	{fetchbtn}
	            	{clearbtn}
	            </label>
						</form>
					</div>
				</div>
				{worldrank}
			</div>
		)
	}

}

export default Ranking;