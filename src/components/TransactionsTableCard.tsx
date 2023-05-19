import {
  Card,
  Text,
  Title,
  Flex,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Badge,
  Button,
} from '@tremor/react';
import { amountFormatter } from '../utils/functions/formatters';
import { XMarkIcon } from '@heroicons/react/24/solid';
import TableSkeleton from './skeletons/TableSkeleton';
import { Transaction, TransactionId } from '../utils/interfaces/transaction.interface';
import EmptyData from './EmptyData';

interface Props {
  loadingStore: boolean;
  monthTransactions: Transaction[];
  categories: Record<string, string>;
  deleteTransaction: (id: TransactionId) => () => void;
}

const TransactionsTableCard = ({
  loadingStore,
  monthTransactions,
  categories,
  deleteTransaction,
}: Props) => {
  const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  return (
    <Card>
      {!loadingStore ? (
        <>
          <Flex justifyContent='start' className='space-x-2'>
            <Title>Gastos</Title>

            <Badge size='md' color='gray'>
              {monthTransactions.length}
            </Badge>
          </Flex>

          <Text className='mt-2'>Resumen de los gastos de este mes</Text>

          <Table className='mt-6'>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Fecha</TableHeaderCell>
                <TableHeaderCell>Descripción</TableHeaderCell>
                <TableHeaderCell>Cantidad</TableHeaderCell>
                <TableHeaderCell>Categoría</TableHeaderCell>
                <TableHeaderCell>Acciones</TableHeaderCell>
              </TableRow>
            </TableHead>

            {monthTransactions.length > 0 && (
              <TableBody>
                {monthTransactions.map(({ id, date, amount, description, category }) => (
                  <TableRow key={id}>
                    <TableCell>{date.toDate().toLocaleString('es', DATE_OPTIONS)}</TableCell>
                    <TableCell>{description}</TableCell>
                    <TableCell>{amountFormatter(amount)}</TableCell>
                    <TableCell>
                      <Badge color='gray'>{categories[category]}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        color='gray'
                        className='[&>svg]:m-0'
                        variant='light'
                        icon={XMarkIcon}
                        onClick={deleteTransaction(id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>

          {monthTransactions.length === 0 && (
            <EmptyData text='No hay transacciones para el periodo seleccionado' />
          )}
        </>
      ) : (
        <TableSkeleton rows={10} />
      )}
    </Card>
  );
};

export default TransactionsTableCard;
