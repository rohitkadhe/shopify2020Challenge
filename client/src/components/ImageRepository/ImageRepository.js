import React, { Component } from 'react';
import ImageRepoLoader from '../loader/ImageRepoLoader';
import ImageCard from '../ImageCard/ImageCard';
import { Grid } from 'semantic-ui-react';
import ImageRepositoryService from '../../services/ImageRepositoryService';

export default class ImageRepository extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      images: [],
    };
  }
  renderImages() {
    const { fetching } = this.state;
    if (fetching) {
      return <ImageRepoLoader visible={fetching} />;
    }
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
    let images = [];
    switch (this.props.fetchType) {
      case 'publicImages':
        this.setState({ fetching: true });
        images = await ImageRepositoryService.getPublicImages();
        this.setState({ images, fetching: false });
        break;
      case 'userImages':
        this.setState({ fetching: true });
        images = await ImageRepositoryService.getUserImages();
        this.setState({ images, fetching: false });
        break;
      default:
        this.setState({ fetching: true });
        images = await ImageRepositoryService.getPublicImages();
        this.setState({ images, fetching: false });
        break;
    }
  }
  render() {
    return <div style={{ margin: '1em' }}>{this.renderImages()}</div>;
  }
}
