import { useReducer, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import DonationItemForm from './DonationItemForm/DonationItemForm';
import { DonationItemFormValues } from './DonationItemForm/DonationItemForm';

import classes from './DonationForm.module.css';
import { Add, Save } from '@mui/icons-material';

interface DonationFormProps {
  id: string;
  open: boolean;
  onCancel: () => void;
}

interface DonationFormValues {
  donationDate: string;
  donor: string;
  items: DonationItemFormValues[];
}

interface InputFormValue {
  name: string;
  value: string;
}

enum DonationFormActionType {
  HANDLE_INPUT_TEXT = 'HANDLE_INPUT_TEXT',
  ADD_DONATION_ITEM = 'ADD_DONATION_ITEM',
  REMOVE_DONATION_ITEM = 'REMOVE_DONATION_ITEM',
}

interface DonationFormAction {
  type: DonationFormActionType;
}

interface HandleInputAction extends DonationFormAction {
  payload: InputFormValue;
}

interface AddItemAction extends DonationFormAction {
  payload: DonationItemFormValues;
}

interface RemoveItemAction extends DonationFormAction {
  payload: string;
}

const initialState: DonationFormValues = {
  donationDate: '',
  donor: '',
  items: [],
};

const donationFormReducer = (
  state: DonationFormValues,
  action: HandleInputAction | AddItemAction | RemoveItemAction
) => {
  const { type, payload } = action;

  switch (type) {
    case DonationFormActionType.HANDLE_INPUT_TEXT:
      const { name, value } = payload as InputFormValue;
      return {
        ...state,
        [name]: value,
      };
    case DonationFormActionType.ADD_DONATION_ITEM:
      return {
        ...state,
        items: [...state.items, payload as DonationItemFormValues],
      };
    case DonationFormActionType.REMOVE_DONATION_ITEM:
      const itemId = payload as string;
      const filteredItems = state.items.filter((item) => item.id !== itemId);
      return {
        ...state,
        items: filteredItems,
      };
    default:
      return state;
  }
};

const DonationForm: React.FC<DonationFormProps> = ({ id, open, onCancel }) => {
  const isEdit = Boolean(id);
  const dialogTitle = isEdit ? 'Edycja wpisu' : 'Tworzenie nowego wpisu';

  const [donationForm, dispatch] = useReducer(
    donationFormReducer,
    initialState
  );

  const [openItemForm, setOpenItemForm] = useState<boolean>(false);

  const isFormValid = Boolean(
    donationForm?.donationDate &&
      donationForm.donor &&
      donationForm.items &&
      donationForm.items.length > 0
  );

  const handleOpenDonationItemForm = () => setOpenItemForm(true);

  const handleCloseDonationItemForm = () => setOpenItemForm(false);

  const handleAddNewDonationItem = (
    donationItemFormValues: DonationItemFormValues
  ) => {
    dispatch({
      type: DonationFormActionType.ADD_DONATION_ITEM,
      payload: donationItemFormValues,
    } as AddItemAction);
  };

  const handleDeleteDonationItem = (id: string) => {
    dispatch({
      type: DonationFormActionType.REMOVE_DONATION_ITEM,
      payload: id,
    } as RemoveItemAction);
  };

  const handleSubmitForm = () => {
    console.log(donationForm);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleDonationDateChange = (value: Dayjs | null) => {
    if (value) {
      const formattedDate = value.format('YYYY-MM-DDTHH:mm:ssZ[Z]');
      dispatch({
        type: DonationFormActionType.HANDLE_INPUT_TEXT,
        payload: {
          name: 'donationDate',
          value: formattedDate,
        },
      } as HandleInputAction);
    }
  };

  const handleInputBlur = (
    e: React.ChangeEvent<{ name: string; value: string }>
  ) => {
    const { name, value } = e.target;

    if (value.trim().length === 0) {
      return;
    }

    dispatch({
      type: DonationFormActionType.HANDLE_INPUT_TEXT,
      payload: {
        name,
        value: value.trim(),
      },
    } as HandleInputAction);
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>
          <div className={classes.title}>{dialogTitle}</div>
        </DialogTitle>
        <DialogContent>
          <Box component="form">
            <div className={classes.inputContainer}>
              <FormControl className={classes.input}>
                <DatePicker
                  label="Data darowizny"
                  onChange={handleDonationDateChange}
                />
              </FormControl>
            </div>
            <div className={classes.inputContainer}>
              <FormControl className={classes.input}>
                <TextField
                  label="Darczyńca"
                  name="donor"
                  onBlur={handleInputBlur}
                />
              </FormControl>
            </div>
            <div className={classes.inputContainer}>
              {donationForm.items.map((item) => (
                <Chip
                  key={item.id}
                  size="medium"
                  label={`${item.type} ${item.details} (${item.quantity} ${item.unit} x ${item.price} zł)`}
                  onDelete={() => handleDeleteDonationItem(item.id)}
                />
              ))}
            </div>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleOpenDonationItemForm}
          >
            Dodaj przedmiot darowizny
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Anuluj</Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Save />}
            disabled={!isFormValid}
            onClick={handleSubmitForm}
          >
            Zapisz
          </Button>
        </DialogActions>
      </Dialog>
      {openItemForm && (
        <DonationItemForm
          onAdd={handleAddNewDonationItem}
          open
          onClose={handleCloseDonationItemForm}
        />
      )}
    </>
  );
};

export default DonationForm;
