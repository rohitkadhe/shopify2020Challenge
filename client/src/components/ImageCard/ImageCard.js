import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

export default function ImageCard({
  name,
  visibility,
  secure_url,
  uploaded_on,
  onClick,
  color,
  link,
}) {
  const visibilityClass = visibility.toLowerCase() === 'private' ? 'lock' : 'lock open';
  const linkToImage = link ? secure_url : '';
  return (
    <Card onClick={onClick} color={color} link={link} href={linkToImage}>
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
