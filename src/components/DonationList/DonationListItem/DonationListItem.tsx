import { MoreVert } from '@mui/icons-material';
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import { Donation } from '../DonationList';

interface DonationListItemProps {
  donation: Donation;
}

const DonationListItem: React.FC<DonationListItemProps> = (props) => {
  const { donation } = props;

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
          <div>
            {donation.items
              .map(
                (item) =>
                  `${item.type}: ${item.details} (${item.quantity} ${item.unit})`
              )
              .join(', ')}
          </div>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip title="Wartość" placement="top">
          <div>
            {donation.items
              .reduce((sum, currentItem) => {
                return sum + currentItem.quantity * currentItem.price;
              }, 0)
              .toFixed(2)}
          </div>
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
