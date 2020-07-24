/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Form } from 'semantic-ui-react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogTitle, Slide,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  dialog: {
    minWidth: 620,
    minHeight: 400,
  },
  docsButton: {
    margin: 'auto',
    width: 586,
    backgroundColor: '#474a2c',
    color: '#f6fef5',
    "&:hover": {
      backgroundColor: '#a58e57',
      color: '#2d2e2e',
    },
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddDocuments = function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);
  const [links, setLinks] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDocumentChange = (e) => {
    setLinks([...links, e.target.value]);
  };
  const handleSubmitDocs = () => {
    props.setDocs(links);
    handleClose();
  };

  const classes = useStyles();

  return (
    <div>
      <Button className={classes.docsButton} onClick={handleClickOpen}>Add Documents</Button>

      <Dialog
        open={open}
        className={classes.dialog}
        fullWidth="true"
        maxWidth="md"
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
