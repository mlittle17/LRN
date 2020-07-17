/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Form } from 'semantic-ui-react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogTitle, Slide,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 620,
    minWidth: 620,
    minHeight: 340,
    // maxHeight: 340,
  },
  docsButton: {
    width: 500,
    backgroundColor: '#474a2c',
    color: '#f6fef5',
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddDocuments = function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);
  const [link, setLink] = React.useState('');

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDocumentChange = (e) => {
    console.log(e);
    console.log(e.target.value);
    setLink(e.target.value);
  };
  const handleSubmitDocs = () => {
    props.setDoc(link);
    console.log(link);
    handleClose();
  };

  const classes = useStyles();

  return (
    <div>
      <Button className={classes.docsButton} onClick={handleClickOpen}>Add Documents</Button>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Add Session Documents</DialogTitle>
        <DialogContent>
          <Form>
            <Form.Field>
              <label>Link</label>
              <input className="input" onChange={onDocumentChange} />

            </Form.Field>
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitDocs} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddDocuments;
