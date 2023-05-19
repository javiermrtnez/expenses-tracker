import { Card, Color, Flex, Icon, Metric, Text } from '@tremor/react';

interface Props {
  title: string;
  icon: React.ElementType;
  color: Color;
  value: string;
}

const TransactionMetricCard = ({ title, icon, color, value }: Props) => {
  return (
    <Card decoration='top' decorationColor={color}>
      <Flex justifyContent='start' className='space-x-4'>
        <Icon icon={icon} variant='light' size='xl' color={color} />
        <div className='truncate'>
          <Text>{title}</Text>
          <Metric className='truncate'>{value}</Metric>
        </div>
      </Flex>
    </Card>
  );
};

export default TransactionMetricCard;
