import { BadgeDelta, Card, Color, Flex, Icon, Metric, Text } from '@tremor/react';
import TransactionMetricSkeleton from './skeletons/TransactionMetricSkeleton';

interface Props {
  title: string;
  icon: React.ElementType;
  color: Color;
  value: string;
  loading: boolean;
  percentage?: number;
}

const TransactionMetricCard = ({ title, icon, color, value, loading, percentage = 0 }: Props) => {
  const getDeltaType = (percentage: number) => {
    if (percentage === 0) {
      return 'unchanged';
    } else if (percentage > 0) {
      return 'increase';
    } else if (percentage < 0) {
      return 'decrease';
    }
  };

  return (
    <Card decoration='top' decorationColor={color}>
      {!loading ? (
        <Flex justifyContent='between' className='space-x-4'>
          <div className='flex gap-4'>
            <Icon icon={icon} variant='light' size='xl' color={color} />
            <div className='truncate'>
              <Text>{title}</Text>
              <Metric className='truncate'>{value}</Metric>
            </div>
          </div>

          {Boolean(percentage) && (
            <BadgeDelta deltaType={getDeltaType(percentage)}>{`${percentage}%`}</BadgeDelta>
          )}
        </Flex>
      ) : (
        <TransactionMetricSkeleton />
      )}
    </Card>
  );
};

export default TransactionMetricCard;
