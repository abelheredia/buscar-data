import { Button, Modal, Table } from 'antd';
import { useHistoryStore } from '../stores';
import { IResult } from '../entities';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Data } from './Data';

export const History = () => {
  const { history, deleteResult } = useHistoryStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [resultDetail, setResultDetail] = useState<IResult>();

  const handleView = (record: IResult) => {
    setResultDetail(record);
    setIsModalOpen(true);
  };

  const handleDelete = (key: React.Key) => {
    deleteResult(key);
  };
  const columns = [
    {
      title: 'Historial',
      dataIndex: 'busqueda',
      key: 'busqueda'
    },
    {
      title: '',
      render: (record: IResult) => (
        <div className="flex justify-end gap-2">
          <Button color="default" variant="solid" onClick={() => handleView(record)} icon={<SearchOutlined />} />
          <Button color="default" variant="solid" onClick={() => handleDelete(record.key)} icon={<DeleteOutlined />} />
        </div>
      )
    }
  ];

  return (
    <>
      <Table columns={columns} dataSource={history} pagination={false} style={{ width: '85%' }} />
      <Modal title={resultDetail?.busqueda} open={isModalOpen} centered onCancel={() => setIsModalOpen(false)} footer={null} width={'85%'}>
        <Data result={resultDetail as IResult} />
      </Modal>
    </>
  );
};
