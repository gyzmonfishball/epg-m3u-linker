import React from 'react';

import { Route, HashRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import HomePage from './containers/HomePage';
import M3UUpload from './containers/m3u/Upload';

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
        <Route exact path="/m3u/upload" component={M3UUpload} />
    </HashRouter>


export default connect(mapStateToProps, mapDispatchToProps)(Routes);
