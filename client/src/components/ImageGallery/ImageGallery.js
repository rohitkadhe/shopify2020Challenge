import React, { Component } from 'react';
import ImageRepoLoader from '../loader/ImageRepoLoader';
import ImageCard from '../ImageCard/ImageCard';
import { Grid } from 'semantic-ui-react';
import ImageGalleryService from '../../services/ImageGalleryService';

export default class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      images: [],
    };
  }
  renderImages() {
    return (
      <Grid stackable>
        <Grid.Row columns={6}>
          {this.state.images.map((image) => {
            let date = new Date(image.uploaded_on);

            return (
              <Grid.Column key={image.public_id} style={{ marginBottom: '1em' }}>
                <ImageCard
                  name={image.name}
                  visibility={image.visibility}
                  secure_url={image.secure_url}
                  uploaded_on={date.toDateString()}
                  key={image.public_id}
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
    let images = [];
    switch (this.props.fetchType) {
      case 'publicImages':
        images = await ImageGalleryService.getPublicImages();
        this.setState({ images, fetching: false });
        break;
      case 'userImages':
        images = await ImageGalleryService.getUserImages();
        this.setState({ images, fetching: false });
        break;
      default:
        images = await ImageGalleryService.getPublicImages();
        this.setState({ images, fetching: false });
        break;
    }
  }
  render() {
    const { fetching } = this.state;

    return (
      <div style={{ margin: '1em' }}>
        {this.renderImages()}
        <ImageRepoLoader visible={fetching} />
      </div>
    );
  }
}
