import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from '@mui/material';

import classes from './DonationForm.module.css';
import { DatePicker } from '@mui/x-date-pickers';

interface DonationFormProps {
  id: string;
  open: boolean;
  onCancel: () => void;
}

const DonationForm: React.FC<DonationFormProps> = ({ id, open, onCancel }) => {
  const isEdit = Boolean(id);
  const dialogTitle = isEdit ? 'Edycja wpisu' : 'Tworzenie nowego wpisu';

  const handleCancelClick = () => {
    onCancel();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>
        <div className={classes.title}>{dialogTitle}</div>
      </DialogTitle>
      <DialogContent>
        <Box component="form">
          <div>
            <div className={classes.inputContainer}>
              <FormControl className={classes.input}>
                <DatePicker label="Data darowizny" />
              </FormControl>
            </div>
            <div className={classes.inputContainer}>
              <FormControl className={classes.input}>
                <TextField label="Darczyńca" />
              </FormControl>
            </div>
            <div className={classes.inputContainer}>
              <FormControl className={classes.input}>
                <Autocomplete
                  options={[] as string[]}
                  freeSolo
                  multiple
                  renderInput={(params) => (
                    <TextField {...params} label="Typ" />
                  )}
                />
              </FormControl>
            </div>
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelClick}>Anuluj</Button>
        <Button>Zapisz</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DonationForm;
