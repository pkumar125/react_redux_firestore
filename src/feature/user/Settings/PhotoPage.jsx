import React, { Component } from "react";
import {
  Image,
  Segment,
  Header,
  Divider,
  Grid,
  Button,
  Card,
  Icon
} from "semantic-ui-react";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { toastr } from "react-redux-toastr";
import { updateProfileImage, deletePhoto, setMainPhoto } from "../userAction";

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos,
  loading: state.asyncR.loading
});

const query = ({ auth }) => {
  return [
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "photos" }],
      storeAs: "photos"
    }
  ];
};

const actions = { updateProfileImage, deletePhoto, setMainPhoto };

class PhotosPage extends Component {
  state = {
    files: [],
    fileName: "",
    cropResult: null,
    image: {}
  };
  handlePhotoDelete = photo => async () => {
    try {
      this.props.deletePhoto(photo);
    } catch (error) {
      toastr.error("Error", "Oops error in delete");
    }
  };
  handleSetMainPhoto = photo => async () => {
    try {
      this.props.setMainPhoto(photo);
    } catch (error) {
      toastr.error("Error", "Opps Error in set photo");
    }
  };
  cancelCrop = () => {
    this.setState({
      image: {},
      files: []
    });
  };
  uploadImage = async () => {
    try {
      await this.props.updateProfileImage(
        this.state.image,
        this.state.fileName
      );
      this.cancelCrop();
      toastr("Success", "Image upload Success");
    } catch (error) {
      console.log(error);
    }
  };

  cropImage = () => {
    if (typeof this.refs.cropper.getCroppedCanvas() === undefined) {
      return;
    }
    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      let imageURL = URL.createObjectURL(blob);
      this.setState({
        cropResult: imageURL,
        image: blob
      });
    }, "image/jpeg");
  };

  onDrop = files => {
    this.setState({
      files,
      fileName: files[0].name
    });
  };
  render() {
    const { loading, photos, profile } = this.props;
    let filteredPhoto;
    if (photos) {
      filteredPhoto = photos.filter(photo => {
        return photo.url !== profile.photoURL;
      });
    }
    return (
      <Segment>
        <Header dividing size="large" content="Your Photos" />
        <Grid>
          <Grid.Row />
          <Grid.Column width={4}>
            <Header color="teal" sub content="Step 1 - Add Photo" />
            <Dropzone onDrop={this.onDrop} multiple={false} />
            <div style={{ paddingTop: "30px", textAlign: "center" }}>
              <Icon name="upload" size="huge" />
              <Header content="Drop a image to upload image" />
            </div>
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 2 - Resize image" />
            {this.state.files[0] && (
              <Cropper
                style={{ height: 200, width: "100%" }}
                ref="cropper"
                src={this.state.files[0].preview}
                aspectRatio={1}
                viewMode={0}
                guides={false}
                scalable={true}
                cropBoxMovable={true}
                cropBoxResizable={true}
                crop={this.cropImage}
              />
            )}
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 3 - Preview and Upload" />
            {this.state.files[0] && (
              <div>
                <Image
                  style={{ minHeight: "200px", minWidth: "200px" }}
                  src={this.state.cropResult}
                />
                <Button.Group>
                  <Button
                    loading={loading}
                    onClick={this.uploadImage}
                    style={{ width: "100px" }}
                    positive
                    icon="check"
                  />
                  <Button
                    disabled={loading}
                    onClick={this.cancelCrop}
                    style={{ width: "100px" }}
                    negative
                    icon="close"
                  />
                </Button.Group>
              </div>
            )}
          </Grid.Column>
        </Grid>

        <Divider />
        <Header sub color="teal" content="All Photos" />

        <Card.Group itemsPerRow={5}>
          <Card>
            <Image src={profile.photoURL || "/assets/user.png"} />
            <Button positive>Main Photo</Button>
          </Card>
          {photos &&
            filteredPhoto.map(photo => (
              <Card key={photo.id}>
                <Image src={photo.url} />
                <div className="ui two buttons">
                  <Button
                    basic
                    color="green"
                    onClick={this.handleSetMainPhoto(photo)}
                  >
                    Main
                  </Button>
                  <Button
                    basic
                    icon="trash"
                    color="red"
                    onClick={this.handlePhotoDelete(photo)}
                  />
                </div>
              </Card>
            ))}
        </Card.Group>
      </Segment>
    );
  }
}

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect(auth => query(auth))
)(PhotosPage);
