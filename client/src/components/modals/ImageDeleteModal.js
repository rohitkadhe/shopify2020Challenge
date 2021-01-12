import React from 'react';
import { Icon, Modal, Button } from 'semantic-ui-react';

export default function ImageDeleteModal({ trigger, onConfirmDelete, onCancel, open, title }) {
  return (
    <Modal trigger={trigger} open={open}>
      <Modal.Content>{title}</Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={onCancel}>
          <Icon name="remove" /> No
        </Button>
        <Button color="green" onClick={onConfirmDelete}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
