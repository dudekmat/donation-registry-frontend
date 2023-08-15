import { useReducer } from 'react';
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
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

import classes from './DonationForm.module.css';

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

interface DonationItemFormValues {
  type: string;
  details: string;
  unit: string;
  quantity: number;
  price: number;
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
  payload: number;
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
      const itemIndex = payload as number;
      const filteredItems = state.items.filter(
        (item, index) => index !== itemIndex
      );
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

  const [formState, dispatch] = useReducer(donationFormReducer, initialState);

  const handleSubmitClick = () => {
    console.log(formState);
  };

  const handleCancelClick = () => {
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
            <FormControl className={classes.input}>
              <Autocomplete
                options={[] as string[]}
                freeSolo
                multiple
                renderInput={(params) => <TextField {...params} label="Typ" />}
              />
            </FormControl>
          </div>
          <div className={classes.inputContainer}>
            <FormControl className={classes.input}>
              <TextField label="Szczegóły" />
            </FormControl>
          </div>
          <div className={classes.inputContainer}>
            <FormControl className={classes.input}>
              <TextField label="Jednostka" />
            </FormControl>
          </div>
          <div className={classes.inputContainer}>
            <FormControl className={classes.input}>
              <TextField label="Ilość" />
            </FormControl>
          </div>
          <div className={classes.inputContainer}>
            <FormControl className={classes.input}>
              <TextField label="Cena" />
            </FormControl>
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelClick}>Anuluj</Button>
        <Button onClick={handleSubmitClick}>Zapisz</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DonationForm;
