import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { findUser, createUser } from '../model/user';
import { CenterDiv, H1 } from '../styled-components'

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginUsername: null,
      signUpUsername: null
    }

    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  login(e) {
    e.preventDefault();
    findUser(this.state.loginUsername, (err, user)=>{
      if (!err) {
        this.props.updateUserInfo(user);
        this.setState({
          loginUsername: ''
        });
      }
    })
  }

  signUp(e) {
    e.preventDefault();
    createUser(this.state.signUpUsername, (err, user) => {
      if (!err) {
        this.props.updateUserInfo(user);
        this.setState({
          loginUsername: ''
        });
      }
    })
  }

  handleOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <CenterDiv className="login">
        <H1>Profiles Viewer</H1>
        <h4>Login</h4>
        <a href="/auth/google"><RaisedButton className="signinButton" label="Sign in with google"/></a>
        <br /><br /> OR <br /><br />
        <form>
          <TextField id="accID" name="loginUsername" placeholder="Enter An Account ID" onChange={this.handleOnChange}/>
          <RaisedButton
            className='submitButton'
            label="Login"
            value={this.state.loginUsername}
            onClick={this.login} />
        </form>
        <h4>SignUp</h4>
        <form>
          <TextField id="accID" name="signUpUsername" placeholder="Enter An Account ID" onChange={this.handleOnChange}/>
          <RaisedButton
            className='submitButton'
            label="SignUp"
            value={this.state.signUpUsername}
            onClick={this.signUp} />
        </form>
      </CenterDiv>
    )
  }
}

export default Login;
