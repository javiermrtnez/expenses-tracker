import { useState } from 'react';
import { Card, Grid, Tab, TabList, Text, Title } from '@tremor/react';

const ExamplePageShell = () => {
  const [selectedView, setSelectedView] = useState('1');

  return (
    <>
      <Title>Dashboard</Title>

      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

      <TabList
        color='emerald'
        defaultValue='1'
        onValueChange={(value) => setSelectedView(value)}
        className='mt-6'
      >
        <Tab value='1' text='Overview' />
        <Tab value='2' text='Detail' />
      </TabList>

      {selectedView === '1' ? (
        <>
          <Grid numColsLg={3} className='mt-6 gap-6'>
            <Card>
              {/* Placeholder to set height */}
              <div className='h-28' />
            </Card>
            <Card>
              {/* Placeholder to set height */}
              <div className='h-28' />
            </Card>
            <Card>
              {/* Placeholder to set height */}
              <div className='h-28' />
            </Card>
          </Grid>

          <div className='mt-6'>
            <Card>
              <div className='h-80' />
            </Card>
          </div>

          <div className='mt-6'>
            <Card>
              <div className='h-80' />
            </Card>
          </div>
        </>
      ) : (
        <Card className='mt-6'>
          <div className='h-96' />
        </Card>
      )}
    </>
  );
};

export default ExamplePageShell;
