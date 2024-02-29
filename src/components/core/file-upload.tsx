'use client';

import { Dispatch, SetStateAction } from 'react';

import { parse } from 'papaparse';

interface FileUploadProps {
  setJsonValue: Dispatch<SetStateAction<unknown>>;
  file: unknown;
  setIsLoading: (loading: boolean) => void;
  isLoading: boolean;
}

export const FileUpload = ({ setJsonValue, setIsLoading, isLoading }: FileUploadProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <label
        htmlFor="file"
        className="flex cursor-pointer items-center justify-center rounded-lg bg-slate-100 p-2 text-slate-900"
      >
        <input
          disabled={isLoading}
          type="file"
          id="file"
          className="hidden"
          accept=".csv"
          onChange={async (e) => {
            if (e.target.files) {
              const file = e.target.files[0];
              setIsLoading(true);
              parse(file, {
                header: true,
                complete: (result) => {
                  setJsonValue(result.data);
                  console.error(result.data);
                  setIsLoading(false);
                },
              });
            }
          }}
        />
        {isLoading ? (
          'Carregando...'
        ) : (
          <span className="text-center">Clique para adicionar um arquivo</span>
        )}
      </label>
    </div>
  );
};
