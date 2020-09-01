import React, { useCallback, useEffect } from 'react';
import {
  Button,
  Select,
  Input,
  Form,
  Field,
  Table,
  Card,
  Pagination,
  Icon,
} from '@alifd/next';
import { useRequest } from 'ice';
import BusinessAccount from '@/services/businessAccount';
import { useFusionTable, useSetState } from 'ahooks';
import EmptyBlock from './EmptyBlock';
import ExceptionBlock from './ExceptionBlock';
import styles from './index.module.scss';

const FormItem = Form.Item;

const getTableData = ({ current, pageSize }, formData) => {
  // console.log(current, pageSize, formData);

  if (!formData.status || formData.status === 'normal') {
    let query = `page=${current}&size=${pageSize}`;
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        query += `&${key}=${value}`;
      }
    });
    return fetch(`https://randomuser.me/api?results=${pageSize}&${query}`)
      .then((res) => res.json())
      .then((res) => ({
        total: 55,
        list: res.results.slice(0, 10),
      }));
  }

  if (formData.status === 'empty') {
    return Promise.resolve([]);
  }

  if (formData.status === 'exception') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('data exception'));
      }, 1000);
    });
  }

  return Promise.resolve([]);
};

const dataSource = [
  {
    label: '网吧名称',
    value: 'name',
  },
];

const defaultColumnWidth = {
  name: 120,
  email: 200,
  phone: 200,
  gender: 100,
}; // Filter区域 默认为收起状态

const defaultExpandStatus = false; // 展开状态下一共有多少个项
const defaultSearchOptions = {
  name: '',
};
const expandFieldLenth = 5; // 收起状态下一共有多少项目

const collapseFieldLenth = 3;

const MultiColFilterTable = () => {
  const [state, setState] = useSetState({
    columnWidth: defaultColumnWidth,
    searchOptions: defaultSearchOptions,
    expandStatus: defaultExpandStatus,
  });
  const { data: tableData, request: tableReq } = useRequest(
    BusinessAccount.netbarList
  );

  const field = Field.useField([]);

  useEffect(() => {
    tableReq();
  }, []);

  const {
    paginationProps,
    tableProps,
    search,
    error,
    refresh,
  } = useFusionTable(getTableData, {
    field,
  });

  const { submit, reset } = search;
  const { columnWidth, searchOptions } = state;

  const handleResizeChange = useCallback(
    (dataIndex, width) => {
      const newWidth = { ...columnWidth };
      newWidth[dataIndex] += width;
      setState({
        columnWidth: newWidth,
      });
    },
    [columnWidth, setState]
  );

  const handleGender = useCallback(
    (value) => {
      setState({
        searchOptions: {
          gender: value,
        },
      });
    },
    [searchOptions, setState]
  );

  return (
    <div className={styles.container}>
      <Card free>
        <Card.Content>
          <Form className="flex" field={field} inline fullWidth>
            <FormItem label="筛选">
              <Select name="name" defaultValue="name" dataSource={dataSource} />
            </FormItem>
            <FormItem>
              <Input placeholder="请输入关键词" name="phone" />
            </FormItem>
            <FormItem className={[styles['form-actions']].join(' ')}>
              <Form.Submit type="primary" size="small">
                <Icon type="search" />
              </Form.Submit>
            </FormItem>
            <div className="flex-1" />
            <Button type="primary" onClick={submit}>
              + 新增
            </Button>
          </Form>
        </Card.Content>
      </Card>
      <Card free>
        <Card.Content>
          <Table
            {...tableProps}
            onResizeChange={handleResizeChange}
            emptyContent={
              error ? <ExceptionBlock onRefresh={refresh} /> : <EmptyBlock />
            }
            primaryKey="email"
          >
            <Table.Column
              title="name"
              dataIndex="name.last"
              resizable
              width={columnWidth.name}
            />
            <Table.Column
              title="email"
              dataIndex="email"
              resizable
              width={columnWidth.email}
            />
            <Table.Column
              title="phone"
              dataIndex="phone"
              resizable
              width={columnWidth.phone}
            />
            <Table.Column
              title="gender"
              dataIndex="gender"
              resizable
              width={columnWidth.gender}
            />
          </Table>
          <Pagination
            style={{
              marginTop: 16,
              textAlign: 'right',
            }}
            totalRender={(total) => (
              <>
                共{' '}
                <Button text type="primary">
                  {total}
                </Button>{' '}
                个记录
              </>
            )}
            {...paginationProps}
          />
        </Card.Content>
      </Card>
    </div>
  );
};

export default MultiColFilterTable;
