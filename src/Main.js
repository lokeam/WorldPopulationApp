import React from 'react';
import WorldPop from './WorldPop';
import USPop from './USPop';
import ShortPop from './ShortPop';
import Ranking from './Ranking';
import axios from 'axios';
import './App.css';

class Main extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			world: 0,
			us: 0,
			shortest: '',
			ranking: {}
		}
	}
	componentDidMount() {
		/* Convert Number to String, insert commas */
		var insert_commas = function(num) {
			var str, i;
			str = "" + num;
			for (i = str.length - 3; i > 0; i -= 3) {
				str = str.substr(0, i) + "," + str.substr(i);
			}
			return str;
		}

		var today = new Date(),
				currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

		/* Call World Population API */
		axios.get('http://api.population.io:80/1.0/population/World/'+currentDate+'/')
			.then(res => {
				this.state.world = res.data.total_population.population;
				var worldPopulation = res.data.total_population.population;
				worldPopulation = insert_commas(worldPopulation);
				this.setState(function(state, props) {
					return {world: worldPopulation}
				})
			});

			/* Call US Population API */
			axios.get('http://api.population.io:80/1.0/population/United%20States/'+currentDate+'/')
				.then(res => {
					this.state.us = res.data.total_population.population;
					var usPopulation = res.data.total_population.population;
					usPopulation = insert_commas(usPopulation);
					this.setState(function(state, props) {
						return {us: usPopulation}
					})
				});

	}
	render() {
		return (
			<div className="container">
				<h1 className="text-center">World Population Application</h1>

				<div className="row">
					<div className="col-md-6">
						<WorldPop population={this.state.world} />
					</div>
					<div className="col-md-6">
						<USPop population={this.state.us}/>
					</div>
				</div>

				<div className="row">
						<div className="col-md-12">
							<ShortPop />
						</div>
				</div>

				<div className="row">
						<div className="col-md-12">
							<Ranking />
						</div>
				</div>
			</div>
		)
	}
}
export default Main;

// ReactDOM.render(
// 	<Main />,
// 	document.getElementById('app')
// );