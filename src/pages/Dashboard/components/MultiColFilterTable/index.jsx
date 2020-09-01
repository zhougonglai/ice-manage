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

<<<<<<< HEAD
const dataSource = [
  {
    label: '网吧名称',
    value: 'name',
  },
];

=======
>>>>>>> type: init
const defaultColumnWidth = {
  name: 120,
  email: 200,
  phone: 200,
  gender: 100,
}; // Filter区域 默认为收起状态

const defaultExpandStatus = false; // 展开状态下一共有多少个项
const defaultSearchOptions = {
<<<<<<< HEAD
  name: '',
=======
  gender: 'all',
>>>>>>> type: init
};
const expandFieldLenth = 5; // 收起状态下一共有多少项目

const collapseFieldLenth = 3;

<<<<<<< HEAD
=======
const getNextActionListSpan = (expandStatus) => {
  const totalFieldLength = expandStatus ? expandFieldLenth : collapseFieldLenth;

  if (totalFieldLength < 3) {
    return 3;
  }

  return (4 - (totalFieldLength % 4)) * 3;
};

>>>>>>> type: init
const MultiColFilterTable = () => {
  const [state, setState] = useSetState({
    columnWidth: defaultColumnWidth,
    searchOptions: defaultSearchOptions,
    expandStatus: defaultExpandStatus,
<<<<<<< HEAD
  });
  const { data: tableData, request: tableReq } = useRequest(
    BusinessAccount.netbarList
  );

  const field = Field.useField([]);

  useEffect(() => {
    tableReq();
  }, []);

=======
    actionListSpan: getNextActionListSpan(defaultExpandStatus),
  });

  const field = Field.useField([]);

>>>>>>> type: init
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

<<<<<<< HEAD
=======
  const handleSetExpand = useCallback(() => {
    const nextExpand = !state.expandStatus;
    setState({
      expandStatus: nextExpand,
      actionListSpan: getNextActionListSpan(nextExpand),
    });
  }, [state, setState]);

>>>>>>> type: init
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

<<<<<<< HEAD
=======
  useEffect(() => {
    console.log('actionListSpan', state.actionListSpan, process.env.NODE_ENV);
  });

>>>>>>> type: init
  return (
    <div className={styles.container}>
      <Card free>
        <Card.Content>
<<<<<<< HEAD
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
=======
          <Form
            className="filter-form"
            responsive
            fullWidth
            labelAlign="top"
            field={field}
          >
            <FormItem colSpan={3} label="ID:">
              <Input name="id" />
            </FormItem>
            <FormItem
              colSpan={3}
              label="性别:"
              defaultValue="all"
              required
              requiredMessage="必填"
            >
              <Select
                name="gender"
                value={searchOptions.gender}
                onChange={handleGender}
                dataSource={[
                  {
                    label: '男',
                    value: 'mail',
                  },
                  {
                    label: '女',
                    value: 'femail',
                  },
                  {
                    label: 'All',
                    value: 'all',
                  },
                ]}
              />
            </FormItem>
            <FormItem colSpan={3} label="邮箱:">
              <Input name="email" />
            </FormItem>
            {!state.expandStatus ? null : (
              <>
                <FormItem colSpan={3} label="手机号:">
                  <Input name="phone" />
                </FormItem>
                <FormItem colSpan={3} label="国家:" defaultValue={[]}>
                  <Select
                    name="nat"
                    hasClear
                    mode="multiple"
                    dataSource={[
                      'AU',
                      'BR',
                      'CA',
                      'CH',
                      'DE',
                      'DK',
                      'ES',
                      'FI',
                      'FR',
                      'GB',
                      'IE',
                      'IR',
                      'NL',
                      'NZ',
                      'TR',
                      'US',
                    ]}
                  />
                </FormItem>
              </>
            )}
            <FormItem
              colSpan={state.actionListSpan}
              className={styles['form-actions']}
            >
              <Form.Submit
                type="primary"
                onClick={submit}
                validate
                style={{
                  marginRight: 10,
                }}
              >
                提交
              </Form.Submit>
              <Form.Reset
                onClick={reset}
                style={{
                  marginRight: 10,
                }}
              >
                重置
              </Form.Reset>
              <Button onClick={handleSetExpand}>
                {state.expandStatus ? (
                  <>
                    收起
                    <Icon type="arrow-up" />
                  </>
                ) : (
                  <>
                    展开
                    <Icon type="arrow-down" />
                  </>
                )}
              </Button>
            </FormItem>
>>>>>>> type: init
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
