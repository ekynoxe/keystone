var React = require('react');
var request = require('superagent');

var CreateForm = require('../../components/CreateForm');
var EditForm = require('../../components/EditForm');
var Header = require('./Header');

var View = React.createClass({
	
	displayName: 'ItemView',
	
	getInitialState: function() {
		return {
			createIsVisible: false,
			list: Keystone.list,
			itemData: null,
			itemDrilldown: null
		};
	},

	componentDidMount: function() {
		request.get('/keystone/api/' + Keystone.list.path + '/' + this.props.itemId + '?drilldown=true')
			.set('Accept', 'application/json')
			.end((function(err, res) {
				if (!res.ok) {
					// TODO: nicer error handling
					console.log('Error loading item data:', res.text);
					alert('Error loading data (details logged to console)');
					return;
				}
				this.setState({
					itemData: res.body.data,
					itemDrilldown: res.body.drilldown 
				});
			}).bind(this));
	},
	
	toggleCreate: function(visible) {
		this.setState({
			createIsVisible: visible
		});
	},
	
	renderCreateForm: function() {
		if (!this.state.createIsVisible) return null;
		return <CreateForm list={Keystone.list} animate onCancel={this.toggleCreate.bind(this, false)} />;
	},
	
	render: function() {
		if (!this.state.itemData) return <div />;
		return (
			<div>
				{this.renderCreateForm()}
				<Header list={this.state.list} data={this.state.itemData} drilldown={this.state.itemDrilldown} toggleCreate={this.toggleCreate} />
				<EditForm list={this.state.list} data={this.state.itemData} />
			</div>
		);
	}
	
});

exports.render = function(id) {
	React.render(<View itemId={id} />, document.getElementById('item-view'));
};
