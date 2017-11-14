import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Nav from './Nav';
import Profiles from './Profiles';
import ChangeProfile from './changeProfile';
import { CenterDiv } from '../styled-components';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'Profiles'
    }
    this.changeType = this.changeType.bind(this);
  }

  changeType() {
    if (this.state.type === 'Profiles') {
      this.setState({
        type: 'changeProfile'
      })
    } else {
      this.setState({
        type: 'Profiles'
      })
    }
    console.log(this.state.type)
  }

  render() {
    return (
      <div className="dashboard">
        <Nav type={this.state.type} logout={this.props.logout} changeType={this.changeType}/>
        <CenterDiv>
        <h1>Dashboard</h1>
        {this.state.type==='Profiles'&& <Profiles allUsers={this.props.allUsers} />}
        {this.state.type==='changeProfile'&& <ChangeProfile 
          updateAllUsers={this.props.updateAllUsers} 
          userInfo={this.props.userInfo}
          updateUserInfo={this.props.updateUserInfo}
          />}
        </CenterDiv>
      </div>
    );
  }
}

export default Dashboard;


