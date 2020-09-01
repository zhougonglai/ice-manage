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
  Badge,
} from '@alifd/next';
import { useRequest } from 'ice';
import BusinessAccount from '@/services/businessAccount';
import { useFusionTable, useSetState } from 'ahooks';
import EmptyBlock from './EmptyBlock';
import ExceptionBlock from './ExceptionBlock';
import styles from './index.module.scss';

const FormItem = Form.Item;

const getTableData = ({ current, pageSize }, formData) => {
  console.log(current, pageSize, formData);

  return BusinessAccount.netbarList({
    page: current,
    page_size: pageSize,
    name: formData.keyword,
  })
    .then((res) => res.data)
    .then(({ items, pager }) => {
      console.log(items);
      return {
        total: pager.page_size * pager.total_page,
        list: items,
      };
    });
};

const dataSource = [
  {
    label: '网吧名称',
    value: 'name',
  },
];

const defaultColumnWidth = {
  short: 100,
  middle: 200,
  long: 300,
}; // Filter区域 默认为收起状态

const defaultSearchOptions = {
  name: '',
};
const expandFieldLenth = 5; // 收起状态下一共有多少项目
const collapseFieldLenth = 3;

const MultiColFilterTable = () => {
  const [state, setState] = useSetState({
    columnWidth: defaultColumnWidth,
    searchOptions: defaultSearchOptions,
  });

  const field = Field.useField([]);

  useEffect(() => {
    // tableReq();
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
  const operation = (v, i, r) => {
    return (
      <div className="flex justify-center col-gap-2">
        {r.status === 0 && (
          <Button text type="primary">
            暂停
          </Button>
        )}
        {r.status === 1 && (
          <Button text type="primary">
            开始
          </Button>
        )}
        <Button text type="primary">
          编辑
        </Button>
        {r.status < 2 && (
          <Button text type="primary">
            套餐管理
          </Button>
        )}
        <Button text type="primary">
          删除
        </Button>
      </div>
    );
  };

  const statusCell = (v, i, r) => (
    <>
      <Badge
        dot
        className="m-2"
        style={{
          backgroundColor: ['#52c41a', '#f5222d', 'gray', '#ffec3d'][v],
        }}
      />
      {['正常', '已暂停', '已过期', '已冻结'][v]}
    </>
  );

  const handleSearch = () => {};

  return (
    <div className={styles.container}>
      <Card free>
        <Card.Content>
          <Form className="flex" field={field} inline fullWidth>
            <FormItem label="筛选">
              <Select name="name" defaultValue="name" dataSource={dataSource} />
            </FormItem>
            <FormItem>
              <Input placeholder="请输入关键词" name="keyword" trim hasClear />
            </FormItem>
            <FormItem className={[styles['form-actions']].join(' ')}>
              <Form.Submit type="primary" size="small" onClick={submit}>
                <Icon type="search" />
              </Form.Submit>
            </FormItem>
            <div className="flex-1" />
            <Button type="primary">+ 新增</Button>
          </Form>
        </Card.Content>
      </Card>
      <Card free>
        <Card.Content>
          <Table
            {...tableProps}
            className="scroller"
            emptyContent={
              error ? <ExceptionBlock onRefresh={refresh} /> : <EmptyBlock />
            }
            size="small"
          >
            <Table.Column
              width={defaultColumnWidth.short}
              title="ID"
              dataIndex="id"
              resizable
            />
            <Table.Column
              width={defaultColumnWidth.short}
              title="网吧名称"
              dataIndex="name"
              resizable
            />
            <Table.Column
              width={defaultColumnWidth.middle}
              title="账号"
              dataIndex="account"
              resizable
            />
            <Table.Column
              width={defaultColumnWidth.short}
              title="计费方式"
              dataIndex="billing_type"
              cell={(v) => (v ? '扫码付费' : '包月付费')}
              resizable
            />
            <Table.Column
              width={defaultColumnWidth.short}
              title="连接数"
              dataIndex="max_connection_num"
              resizable
            />
            <Table.Column
              width={defaultColumnWidth.middle}
              title="所属代理"
              dataIndex="proxy_name"
              resizable
            />
            <Table.Column
              width={defaultColumnWidth.short}
              title="当前在线"
              dataIndex="now_connection_num"
              resizable
            />
            <Table.Column
              width={defaultColumnWidth.short}
              title="绑定IP"
              dataIndex="bind_ip"
              resizable
            />
            <Table.Column
              width={defaultColumnWidth.middle}
              title="创建时间"
              dataIndex="created_time"
              resizable
            />
            <Table.Column
              width={defaultColumnWidth.middle}
              title="到期时间"
              dataIndex="expire_time"
              resizable
            />
            <Table.Column
              width={defaultColumnWidth.short}
              title="绑定城市"
              dataIndex="address"
              resizable
            />
            <Table.Column
              width={defaultColumnWidth.short}
              title="状态"
              dataIndex="status"
              cell={statusCell}
              resizable
            />
            <Table.Column
              width={defaultColumnWidth.middle}
              title="编辑"
              lock="right"
              cell={operation}
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
