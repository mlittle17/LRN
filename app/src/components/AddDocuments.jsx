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
    '&:hover': {
      backgroundColor: '#a58e57',
      color: '#2d2e2e',
    },
  },
}));

const docOptions = [
  { key: 'gd', text: 'google doc', value: 'Google Doc' },
  { key: 's', text: 'slides', value: 'slides' },
  { key: 'v', text: 'video', value: 'video' },
];

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddDocuments = function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);
  const [links, setLinks] = React.useState([]);
  const [name, setName] = React.useState([]);
  const [type, setDocumentType] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDocumentChange = (e) => {
    setLinks([...links, e.target.value]);
  };

  const onDocumentNameChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmitDocs = () => {
    props.setName(name);
    props.setDocs(links);
    props.setType(type);
    handleClose();
  };

  const onDocumentTypeChange = (e, result) => {
    const { value } = result;
    setDocumentType(value);
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
              <label>Name</label>
              <input className="input" onChange={onDocumentNameChange} />
              <label>Link</label>
              <input className="input" onChange={onDocumentChange} />
              <Form.Select
                fluid
                label="Document Type"
                options={docOptions}
                placeholder="Document Type"
                onChange={onDocumentTypeChange}
                value={type}
              />

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
