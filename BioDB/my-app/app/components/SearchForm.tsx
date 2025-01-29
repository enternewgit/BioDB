import { on } from 'events';
import React, { useState, useEffect,useRef } from 'react';


interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
}

interface SearchParams {
  id: number;
  stage: number;
  Name: string;
  Music_name: string;
  genre: string;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [params, setParams] = useState<SearchParams>({
    id: '',
    stage: '',
    Name: '',
    Music_name: '',
    genre: '',
  });

  const prevParams = useRef<SearchParams>(params);

  useEffect(() => {
    onSearch(params);
  },[]);

  useEffect(() => {
    // 前回の値と現在の値を比較
    const hasChanged = Object.keys(params).some(
      key => params[key as keyof SearchParams] !== prevParams.current[key as keyof SearchParams]
    );

    if (hasChanged) {
      onSearch(params); // 変更があった場合にのみ実行
      prevParams.current = params; // 前回の値を更新
    }
  }, [params, onSearch]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form className="space-y-4 w-1/3">
      <input
        type="number"
        name="id"
        placeholder="Music ID"
        value={params.id}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="Name"
        placeholder="Music Name"
        value={params.Name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
	  <input
	  	type="text"
		name="Music_name"
		placeholder="Enemy_Name"
		value={params.Music_name}
		onChange={handleChange}
		className="w-full p-2 border rounded"
		/>
      <input
        type="number"
        name="stage"
        placeholder="stage"
        value={params.stage}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="genre"
        placeholder="genre"
        value={params.genre}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
    </form>
  );
}