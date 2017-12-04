import React from 'react';
import ProfileList from './profileList';
import { Cards } from '../styled-components'

const Profiles = ({ allUsers })=> {
  const profileList = allUsers.map((user, i)=>{
    return (
      <ProfileList key={i} user={user} />
    )
  });

  return (
    <Cards className="profile">
      {profileList}
    </Cards>
  );
}


export default Profiles;


