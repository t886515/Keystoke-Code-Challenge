import React from 'react';
import ProfileList from './profileList';
import { CenterDiv } from '../styled-components'

const Profiles = ({ allUsers })=> {
  const profileList = allUsers.map((user, i)=>{
    return (
      <ProfileList key={i} user={user} />
    )
  });

  return (
    <CenterDiv className="profile">
      {profileList}
    </CenterDiv>
  );
}


// class Profiles extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     }
//   }

//   render() {
//     const profileList = this.props.allUsers.map((user, i)=>{
//       return (
//         <ProfileList key={i} user={user} />
//       )
//     });

//     return (
//       <div className="profile">
//         {profileList}
//       </div>
//     );
//   }
// }

export default Profiles;


