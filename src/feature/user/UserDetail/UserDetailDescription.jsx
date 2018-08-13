import React from "react";
import { Grid, Segment, Header, List, Item, Icon } from "semantic-ui-react";
import format from "date-fns/format";

const UserDetailDescription = ({ profile }) => {
  let createdAt;
   // console.log("DateTime" + profile.createdAt.toDate()//);
    if (profile.createdAt) {
        createdAt = format(profile.createdAt.toDate(), "D-MMM-YYYY");
  } else {
    createdAt = "Not Define";
  }
  return <Grid.Column width={12}>
      <Segment>
        <Grid columns={2}>
          <Grid.Column width={10}>
            <Header icon="smile" content="About Display Name" />
            <p>
              I am a: <strong>{profile.occupation || "TNB"}</strong>
            </p>
            <p>
              Originally from <strong>{profile.origin}</strong>
            </p>
            <p>
              Member Since: <strong>{createdAt}</strong>
            </p>
            <p>{profile.description}</p>
          </Grid.Column>
          <Grid.Column width={6}>
            <Header icon="heart outline" content="Interests" />
            {profile.interests ? <List>
                {profile.interests && profile.interests.map((intrest,index) => (
                <Item key={index}>
                  <Icon name="heart" />
                  <Item.Content>{intrest}</Item.Content>
                </Item>
                ))}
              </List> : <p>No Interest</p>}
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>;
};

export default UserDetailDescription;
