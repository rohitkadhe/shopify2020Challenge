import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

export default function ImageCard({ name, visibility, secure_url, uploaded_on, onClick, color }) {
  const visibilityClass = visibility.toLowerCase() === 'private' ? 'lock' : 'lock open';
  return (
    <Card onClick={onClick} color={color} link={true}>
      <Image src={secure_url} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>Uploaded on: {uploaded_on}</Card.Meta>
        <Card.Description>
          <Icon name={visibilityClass} />
        </Card.Description>
      </Card.Content>
    </Card>
  );
}
