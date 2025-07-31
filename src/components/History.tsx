import { Button, Modal, Table } from 'antd';
import { useHistoryStore } from '../stores';
import { IResult } from '../entities';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Data } from './Data';

export const History = () => {
  const { history } = useHistoryStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [resultDetail, setResultDetail] = useState<IResult>();

  const columns = [
    {
      title: 'Historial',
      dataIndex: 'busqueda',
      key: 'busqueda'
    },
    {
      title: '',
      render: (record: IResult) => (
        <Button
          color="default"
          variant="solid"
          onClick={() => {
            setResultDetail(record);
            setIsModalOpen(true);
          }}
          icon={<SearchOutlined />}
        />
      )
    }
  ];

  return (
    <>
      <Table columns={columns} dataSource={history} pagination={false} style={{ width: '35rem' }} />
      <Modal title={resultDetail?.busqueda} open={isModalOpen} centered onCancel={() => setIsModalOpen(false)} footer={null}>
        <Data result={resultDetail as IResult} />
      </Modal>
    </>
  );
};
