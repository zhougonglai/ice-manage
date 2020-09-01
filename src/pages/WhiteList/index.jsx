import React, { Component } from 'react';
import MultiColFilterTable from './components/MultiColFilterTable';

export default function () {
  return (
    <div className="WhiteList-page">
      {/* 多列可切换过滤表格 */}
      <MultiColFilterTable />
    </div>
  );
}
