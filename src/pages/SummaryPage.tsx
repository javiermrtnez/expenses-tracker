import { Card, Title, Text, Grid, Col } from '@tremor/react';

const SummaryPage = () => {
  return (
    <main>
      <Title>Dashboard</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

      <Grid numColsLg={6} className='gap-6 mt-6'>
        <Col numColSpanLg={4}>
          <Card className='h-full'>
            <div className='h-60' />
          </Card>
        </Col>

        <Col numColSpanLg={2}>
          <div className='space-y-6'>
            <Card>
              <div className='h-24' />
            </Card>
            <Card>
              <div className='h-24' />
            </Card>
            <Card>
              <div className='h-24' />
            </Card>
          </div>
        </Col>
      </Grid>
    </main>
  );
};

export default SummaryPage;
