import { History, Result, SearchForm } from './components';

export const App = () => {
  return (
    <div className="flex flex-col gap-10 justify-center items-center py-20">
      <SearchForm />
      <Result />
      <History />
    </div>
  );
};
