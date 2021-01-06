import React, { Component } from 'react';
import ImageRepoLoader from '../loader/ImageRepoLoader';
import ImageCard from '../ImageCard/ImageCard';
import { Grid, Button } from 'semantic-ui-react';
import ImageRepositoryService from '../../services/ImageRepositoryService';

export default class ImageDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      deleting: false,
    };
  }
  handleImageDelete = async (public_id) => {
    let filtered = this.state.images.slice(0).filter((image) => image.public_id !== public_id);
    this.setState({ deleting: true });
    await ImageRepositoryService.deleteUserImages([public_id]);
    this.setState({ images: filtered, deleting: false });
  };

  handleDeleteAllImages = async () => {
    let publicIds = this.state.images.map((image) => image.public_id);
    this.setState({ deleting: true });
    await ImageRepositoryService.deleteUserImages(publicIds);
    this.setState({ images: [], deleting: false });
  };

  renderDeleteButton = () => {
    return this.state.images.length > 0 ? (
      <Button size="large" color="red" onClick={this.handleDeleteAllImages}>
        Delete All Images
      </Button>
    ) : (
      <></>
    );
  };

  renderImages() {
    return (
      <Grid stackable>
        <Grid.Row style={{ margin: '1em' }}>{this.renderDeleteButton()}</Grid.Row>
        <Grid.Row columns={6}>
          {this.state.images.map((image) => {
            let date = new Date(image.uploaded_on);
            return (
              <Grid.Column key={image.public_id}>
                <ImageCard
                  name={image.name}
                  visibility={image.visibility}
                  secure_url={image.secure_url}
                  uploaded_on={date.toDateString()}
                  key={image.public_id}
                  deleteImage={async () => await this.handleImageDelete(image.public_id)}
                  color={'red'}
                />
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>
    );
  }

  async componentDidMount() {
    this.setState({ fetching: true });
    let images = await ImageRepositoryService.getUserImages();
    this.setState({ images, fetching: false });
  }
  render() {
    const { deleting } = this.state;

    return (
      <div style={{ margin: '1em' }}>
        {this.renderImages()}
        <ImageRepoLoader visible={deleting} />
      </div>
    );
  }
}
