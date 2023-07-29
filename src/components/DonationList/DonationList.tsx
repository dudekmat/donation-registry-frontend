import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DonationListItem from './DonationListItem/DonationListItem';

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const DONATIONS: Donation[] = [
  {
    id: '9924e8f1-f7ed-4d00-aa6e-1cddf0318c5b',
    createdDate: new Date(),
    donationDate: new Date(),
    donor: 'Jan Kowalski',
    donationItemType: 'Karma sucha',
    donationItemDetails: 'Smilla 4',
    unit: 'szt',
    quantity: 2,
    price: 36.8,
  },
  {
    id: '12ea9416-2e64-49a9-8ea0-1a3bc0d26ef9',
    createdDate: new Date(),
    donationDate: new Date(),
    donor: 'Anna Nowak',
    donationItemType: 'Karma mokra',
    donationItemDetails: 'Cosma 400',
    unit: 'szt',
    quantity: 12,
    price: 9.1,
  },
  {
    id: '6aa36fc5-d0ff-4131-8aea-7705422b3083',
    createdDate: new Date(),
    donationDate: new Date(),
    donor: 'Marek Nowak',
    donationItemType: 'Akcesoria',
    donationItemDetails: 'Trawa Trixie',
    unit: 'szt',
    quantity: 2,
    price: 11.8,
  },
  {
    id: 'e4bb6466-ff2a-4aad-8831-d4885346dd42',
    createdDate: new Date(),
    donationDate: new Date(),
    donor: 'Grażyna Kowalska',
    donationItemType: 'Żwirek',
    donationItemDetails: 'Benek',
    unit: 'szt',
    quantity: 3,
    price: 22.8,
  },
  {
    id: 'f42ad745-6790-4614-ac1b-fae6daa5fa85',
    createdDate: new Date(),
    donationDate: new Date(),
    donor: 'Jacek Gacek',
    donationItemType: 'Akcesoria',
    donationItemDetails: 'Feliway',
    unit: 'szt',
    quantity: 4,
    price: 94.5,
  },
];

export interface Donation {
  id: string;
  createdDate: Date;
  donationDate: Date;
  donor: string;
  donationItemType: string;
  donationItemDetails: string;
  unit: string;
  quantity: number;
  price: number;
}

interface DonationListProps {}

const DonationList: React.FC<DonationListProps> = () => {
  return (
    <Card>
      <CardContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableHeadCell>Data</StyledTableHeadCell>
                <StyledTableHeadCell>Darczyńca</StyledTableHeadCell>
                <StyledTableHeadCell>Przedmiot darowizny</StyledTableHeadCell>
                <StyledTableHeadCell>Szczegóły</StyledTableHeadCell>
                <StyledTableHeadCell>Jednostka</StyledTableHeadCell>
                <StyledTableHeadCell>Liczba jednostek</StyledTableHeadCell>
                <StyledTableHeadCell>Cena jednostkowa</StyledTableHeadCell>
                <StyledTableHeadCell>Wartość</StyledTableHeadCell>
                <StyledTableHeadCell>Akcje</StyledTableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {DONATIONS.map((donation) => (
                <DonationListItem key={donation.id} donation={donation} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={10}
          page={0}
          rowsPerPage={10}
          rowsPerPageOptions={[10, 25, 50, 100]}
          onPageChange={() => {}}
          labelRowsPerPage="Liczba wierszy"
        />
      </CardContent>
    </Card>
  );
};

export default DonationList;
