import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import classes from './DonationForm.module.css';

interface DonationFormProps {
  id: string;
}

const DonationForm: React.FC<DonationFormProps> = ({ id }) => {
  const isEdit = Boolean(id);
  const dialogTitle = isEdit ? 'Edycja wpisu' : 'Tworzenie nowego wpisu';

  return (
    <Dialog open>
      <DialogTitle>
        <div className={classes.title}>{dialogTitle}</div>
      </DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button>Anuluj</Button>
        <Button>Zapisz</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DonationForm;
