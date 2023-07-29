import { MoreVert } from '@mui/icons-material';
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import { Donation } from '../DonationList';

interface DonationListItemProps {
  donation: Donation;
}

const DonationListItem: React.FC<DonationListItemProps> = (props) => {
  const { donation } = props;

  const totalValue = (donation.quantity * donation.price).toFixed(2);

  return (
    <TableRow>
      <TableCell>
        <Tooltip title="Data" placement="top">
          <div>{donation.donationDate.toLocaleDateString()}</div>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip title="Darczyńca" placement="top">
          <div>{donation.donor}</div>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip title="Przedmiot darowizny" placement="top">
          <div>{donation.donationItemType}</div>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip title="Szczegóły" placement="top">
          <div>{donation.donationItemDetails}</div>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip title="Jednostka" placement="top">
          <div>{donation.unit}</div>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip title="Liczba jednostek" placement="top">
          <div>{donation.quantity}</div>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip title="Cena jendostkowa" placement="top">
          <div>{donation.price.toFixed(2)}</div>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip title="Wartość" placement="top">
          <div>{totalValue}</div>
        </Tooltip>
      </TableCell>
      <TableCell>
        <IconButton>
          <MoreVert />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default DonationListItem;
