import React from 'react';
import Dashboard from './Dashboard';
import Login from './Login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { getAllUsers } from '../model/user';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      userInfo: {
          username: 'cat',
          name: 'Some Cat',
          description: 'some cat balalalal',
          profilePicture: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'
        },
      allUsers: [ 
        {
          username: 'cat',
          name: 'Some Cat',
          description: 'some cat balalalal',
          profilePicture: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'
        },
        {
          username: 'cateeeeeeee',
          name: 'Some Cateeee',
          description: 'some cat balfsfdsfsd;fdsalalal',
          profilePicture: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'
        },
        {
          username: 'cat1111',
          name: 'Some Catrewqrewqr',
          description: 'some cat balalalaldasfdafasfd',
          profilePicture: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'
        } ]
    }


    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.logout = this.logout.bind(this);
    this.updateAllUsers = this.updateAllUsers.bind(this);
  }

  componentDidMount() {
    this.updateAllUsers();
  }

  updateUserInfo(userObj) {
    this.setState({
      signedIn: true,
      userInfo: userObj
    })
  }

  updateAllUsers() {
    getAllUsers((users)=>{
      this.setState({
        allUsers: users
      })
    })
  }

  logout() {
    this.setState({
      signedIn: false,
      userInfo: {}
    })
  }


  render() {
    return (
      <MuiThemeProvider>
      <div className="app">
        {!this.state.signedIn && <Login 
          updateUserInfo={this.updateUserInfo}/>}

        {this.state.signedIn && <Dashboard 
          userInfo={this.state.userInfo} 
          allUsers={this.state.allUsers} 
          logout={this.logout} 
          updateAllUsers={this.updateAllUsers} 
          updateUserInfo={this.updateUserInfo}/>}
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;


