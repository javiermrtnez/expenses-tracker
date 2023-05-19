import { Card, Color, Flex, Icon, Metric, Text } from '@tremor/react';
import TransactionMetricSkeleton from './skeletons/TransactionMetricSkeleton';

interface Props {
  title: string;
  icon: React.ElementType;
  color: Color;
  value: string;
  loading: boolean;
}

const TransactionMetricCard = ({ title, icon, color, value, loading }: Props) => {
  return (
    <Card decoration='top' decorationColor={color}>
      {!loading ? (
        <Flex justifyContent='start' className='space-x-4'>
          <Icon icon={icon} variant='light' size='xl' color={color} />
          <div className='truncate'>
            <Text>{title}</Text>
            <Metric className='truncate'>{value}</Metric>
          </div>
        </Flex>
      ) : (
        <TransactionMetricSkeleton />
      )}
    </Card>
  );
};

export default TransactionMetricCard;
