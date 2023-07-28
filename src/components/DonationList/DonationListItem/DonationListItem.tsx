import { MoreVert } from '@mui/icons-material';
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material';

interface DonationListItemProps {}

const DonationListItem: React.FC<DonationListItemProps> = () => {
  return (
    <TableRow>
      <TableCell>
        <Tooltip title="Pole 1" placement="top">
          <div>Pole 1</div>
        </Tooltip>
      </TableCell>
      <TableCell>
        <div>Pole 2</div>
      </TableCell>
      <TableCell>
        <div>Pole 3</div>
      </TableCell>
      <TableCell>
        <div>Pole 4</div>
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
