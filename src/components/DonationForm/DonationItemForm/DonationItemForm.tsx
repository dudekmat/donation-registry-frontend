import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import classes from './DonationItemForm.module.css';

interface DonationItemFormProps {
  open: boolean;
  onAdd: (donationItem: DonationItemFormValues) => void;
  onClose: () => void;
}

export interface DonationItemFormValues {
  id: string;
  type: string;
  details: string;
  unit: string;
  quantity: number;
  price: number;
}

const DonationItemForm: React.FC<DonationItemFormProps> = ({
  open,
  onAdd,
  onClose,
}) => {
  const [donationItem, setDonationItem] = useState<DonationItemFormValues>();

  const handleAddClick = () => {
    if (donationItem) {
      donationItem.id = uuidv4();
      onAdd(donationItem);
    }
    onClose();
  };

  const handleCancelClick = () => {
    onClose();
  };

  const handleInputBlur = (
    e: React.ChangeEvent<{ name: string; value: string }>
  ) => {
    const { name, value } = e.target;

    if (value.trim().length === 0) {
      return;
    }

    setDonationItem(
      (prevState) =>
        ({
          ...prevState,
          [name]: value,
        } as DonationItemFormValues)
    );
  };

  return (
    <Dialog open={open}>
      <DialogTitle>
        <div className={classes.title}>Dodaj przedmiot darowizny</div>
      </DialogTitle>
      <DialogContent>
        <Box component="form">
          <div className={classes.inputContainer}>
            <FormControl className={classes.input}>
              <TextField label="Typ" name="type" onBlur={handleInputBlur} />
            </FormControl>
          </div>
          <div className={classes.inputContainer}>
            <FormControl className={classes.input}>
              <TextField
                label="Szczegóły"
                name="details"
                onBlur={handleInputBlur}
              />
            </FormControl>
          </div>
          <div className={classes.inputContainer}>
            <FormControl className={classes.input}>
              <TextField
                label="Jednostka"
                name="unit"
                onBlur={handleInputBlur}
              />
            </FormControl>
          </div>
          <div className={classes.inputContainer}>
            <FormControl className={classes.input}>
              <TextField
                label="Ilość"
                name="quantity"
                onBlur={handleInputBlur}
              />
            </FormControl>
          </div>
          <div className={classes.inputContainer}>
            <FormControl className={classes.input}>
              <TextField label="Cena" name="price" onBlur={handleInputBlur} />
            </FormControl>
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelClick}>Anuluj</Button>
        <Button onClick={handleAddClick}>Dodaj</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DonationItemForm;
