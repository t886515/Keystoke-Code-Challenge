import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


const profileList = ({user})=> {
  return (
    <Card style={{"width": "20%", "margin": "10px 10px 10px 10px" }}>
      <CardHeader
        title={user.name}
        subtitle={`by ${user.username}`}
      />
      <CardMedia actAsExpander={true}>
        <img src={user.profilePicture} alt=""  />
      </CardMedia>
      <CardTitle title={`About ${user.name}`} subtitle={user.description} />
    </Card>
  )
}


export default profileList