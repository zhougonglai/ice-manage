import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import MultiColFilterTable from './components/MultiColFilterTable';

const { Cell } = ResponsiveGrid;

const Dashboard = () => (
  <ResponsiveGrid gap={20}>
    <Cell colSpan={12}>
      <MultiColFilterTable />
    </Cell>
  </ResponsiveGrid>
);

export default Dashboard;
