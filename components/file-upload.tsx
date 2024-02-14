'use client';

import {
  Dispatch,
  SetStateAction,
} from 'react';

import { parse } from 'papaparse';

interface FileUploadProps {
  setJsonValue: Dispatch<SetStateAction<unknown>>;
  file: unknown;
  setIsLoading: (loading: boolean) => void;
  isLoading: boolean;
}

export const FileUpload = ({
  setJsonValue,
  setIsLoading,
  isLoading,
}: FileUploadProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <label
        htmlFor="file"
        className="flex items-center justify-center bg-slate-100 text-slate-900 p-2 rounded-lg cursor-pointer"
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
                  console.log(result.data);
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
