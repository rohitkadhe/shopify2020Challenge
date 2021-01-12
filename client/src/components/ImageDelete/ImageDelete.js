import React, { Component } from 'react';
import ImageRepoLoader from '../loader/ImageRepoLoader';
import ImageCard from '../ImageCard/ImageCard';
import { Grid, Button } from 'semantic-ui-react';
import ImageRepositoryService from '../../services/ImageRepositoryService';
import ImageDeleteModal from '../modals/ImageDeleteModal';

export default class ImageDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      deleting: false,
      fetching: false,
      deleteImageModalOpen: false,
      deleteImagesModalOpen: false,
    };
  }

  handleImageDelete = async (public_id) => {
    let filtered = this.state.images.slice(0).filter((image) => image.public_id !== public_id);
    this.setState({ deleting: true });
    await ImageRepositoryService.deleteUserImages([public_id]);
    this.setState({ images: filtered, deleting: false, deleteImageModalOpen: false });
  };

  handleDeleteAllImages = async () => {
    let publicIds = this.state.images.map((image) => image.public_id);
    this.setState({ deleting: true });
    await ImageRepositoryService.deleteUserImages(publicIds);
    this.setState({ images: [], deleting: false, modalOpen: false, deleteImagesModalOpen: false });
  };

  renderDeleteButton = () => {
    return this.state.images.length > 0 ? (
      <ImageDeleteModal
        trigger={
          <Button
            size="large"
            color="red"
            onClick={() => this.setState({ deleteImagesModalOpen: true })}
          >
            Delete All Images
          </Button>
        }
        onConfirmDelete={async () => await this.handleDeleteAllImages()}
        onCancel={() => this.setState({ deleteImagesModalOpen: false })}
        open={this.state.deleteImagesModalOpen}
        title={'Are you sure you want to delete all images'}
      />
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
              <Grid.Column key={image.public_id} style={{ marginBottom: '1em' }}>
                <ImageDeleteModal
                  trigger={
                    <ImageCard
                      name={image.name}
                      visibility={image.visibility}
                      secure_url={image.secure_url}
                      uploaded_on={date.toDateString()}
                      color={'red'}
                      onClick={() => this.setState({ deleteImageModalOpen: true })}
                    />
                  }
                  onConfirmDelete={async () => await this.handleImageDelete(image.public_id)}
                  onCancel={() => this.setState({ deleteImageModalOpen: false })}
                  open={this.state.deleteImageModalOpen}
                  title={'Are you sure you want to delete this image'}
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
        {deleting ? <ImageRepoLoader visible={deleting} /> : this.renderImages()}
      </div>
    );
  }
}
