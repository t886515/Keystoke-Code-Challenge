import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Timeline from 'material-ui/svg-icons/action/timeline';
import Flare from 'material-ui/svg-icons/image/flare';
import {indigo900} from 'material-ui/styles/colors'

import FlatButton from 'material-ui/FlatButton';


const styles = {
  title: {
    cursor: 'pointer',
    color: 'white'
  },
};

const Nav = ({logout, type, changeType}) => (
  <AppBar
    style={{
      backgroundColor: indigo900,
    }}
    title={<div onClick={changeType} className='logo' activestyle={{ color: 'white', textDecoration: 'none' }}><span style={styles.title}><Flare style={styles.title}/> {type==="Profiles"? "All Users" : "Profile Setting"} </span></div>}
    iconElementLeft={<IconButton></IconButton>}
    iconElementRight={  <FlatButton label="logout" onClick={ () => logout() } /> } />
);

export default Nav;
