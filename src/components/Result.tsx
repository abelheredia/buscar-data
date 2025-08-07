import { Card } from 'antd';
import { useResultStore } from '../stores';
import { Data } from './Data';

export const Result = () => {
  const { result } = useResultStore();

  return (
    <Card title="Resultado" variant="borderless" type="inner" style={{ width: '85%' }}>
      <Data result={result} />
    </Card>
  );
};
