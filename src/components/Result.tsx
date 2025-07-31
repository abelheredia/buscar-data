import { Card } from 'antd';
import { useResultStore } from '../stores';
import { Data } from './Data';

export const Result = () => {
  const { result } = useResultStore();

  return (
    <Card title="Resultado" variant="borderless" type="inner" style={{ width: '35rem' }}>
      <Data result={result} />
    </Card>
  );
};
