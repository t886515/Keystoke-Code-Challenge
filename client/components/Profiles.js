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


export default Profiles;


