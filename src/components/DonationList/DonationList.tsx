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

interface DonationListProps {}

const DonationList: React.FC<DonationListProps> = () => {
  return (
    <Card>
      <CardContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableHeadCell>Kolumna 1</StyledTableHeadCell>
                <StyledTableHeadCell>Kolumna 2</StyledTableHeadCell>
                <StyledTableHeadCell>Kolumna 3</StyledTableHeadCell>
                <StyledTableHeadCell>Kolumna 4</StyledTableHeadCell>
                <StyledTableHeadCell>Akcje</StyledTableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from(Array(10).keys())
                .map((x) => x + 1)
                .map((n) => (
                  <DonationListItem key={n} />
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
