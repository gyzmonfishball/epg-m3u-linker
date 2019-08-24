import React from 'react';

import { Route, HashRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import HomePage from './containers/HomePage';

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {},
    dispatch,
  ),
});

const Routes = () => 
    <HashRouter>
        <Route exact path="/" component={HomePage} />
    </HashRouter>


export default connect(mapStateToProps, mapDispatchToProps)(Routes);
