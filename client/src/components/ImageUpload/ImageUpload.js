import React, { useState } from 'react';
import { Header, Icon, Segment, Container, Radio } from 'semantic-ui-react';
import ImageGalleryService from '../../services/ImageGalleryService';
import ImageRepoLoader from '../loader/ImageRepoLoader';
import './imageUpload.css';

export default function ImageUpload() {
  const [visibility, setVisibility] = useState('');
  const [uploading, setUploading] = useState(false);

  async function onUploadClick(e) {
    let filesToUpload = Object.values(e.target.files);
    setUploading(true);
    var formData = new FormData();

    filesToUpload.forEach((fileToUpload, index) => {
      let imageDat = {};
      imageDat.name = fileToUpload.name.split('.')[0];
      imageDat.visibility = visibility.toLowerCase();
      formData.append(index, fileToUpload);
      formData.append(index, JSON.stringify(imageDat));
    });

    await ImageGalleryService.uploadImages(formData);
    setUploading(false);
  }

  const onRadioClick = (e, { value }) => {
    setVisibility(value);
  };

  const renderUploadContainer = () => {
    if (uploading) {
      return <ImageRepoLoader visible={uploading} />;
    } else {
      return (
        <Container>
          <Segment placeholder>
            <Header icon>
              <Icon name="cloud upload" />
              Upload Images
            </Header>
            <Segment.Group horizontal>
              <Segment>
                <Header>Visibility</Header>
              </Segment>
              <Segment>
                <Radio
                  name="radioGroup"
                  label="Public"
                  value={'Public'}
                  checked={visibility === 'Public'}
                  onChange={onRadioClick}
                />
              </Segment>
              <Segment>
                <Radio
                  name="radioGroup"
                  label="Private"
                  value={'Private'}
                  checked={visibility === 'Private'}
                  onChange={onRadioClick}
                />
              </Segment>
            </Segment.Group>
            <Container fluid textAlign="center">
              <label className="files" hidden={visibility === ''}>
                <input
                  type="file"
                  multiple="multiple"
                  onChange={async (e) => await onUploadClick(e)}
                />
                Upload Images
              </label>
            </Container>
          </Segment>
          <ImageRepoLoader visible={uploading} />
        </Container>
      );
    }
  };
  return renderUploadContainer();
}
