import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ScrollDialog(props) {
  const compProps = {
    dialog: {
      open: props.open,
      onClose: props.onClose,
      scroll:'paper',
    },
    dialogContent: {
      dividers: true
    },
    dialogContentText: {
      tabIndex: -1
    },
    closeButton: {
      onClick: props.onClose,
      color: "primary"
    }
  }

  return (
      <Dialog {...compProps.dialog}>
        <DialogTitle>テンプレートの書き方</DialogTitle>
        <DialogContent {...compProps.dialogContent}>
          <DialogContentText {...compProps.dialogContentText}>
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join('\n')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button {...compProps.closeButton}>
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
  );
}
