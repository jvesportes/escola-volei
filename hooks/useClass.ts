import { api } from "@/services";
import { turmas } from "@/utils/types";
import { useEffect, useState } from "react";

export function useClass() {
  const [data, setData] = useState(turmas);



  useEffect(() => {
    (async () => {

        const result = await api.class.list()
        if (!result) return;
        setData(data.map((turma, index) => {
          return {
            ...turma,
            horario: result[index].horario,
            id: result[index].id,
            local: result[index].unidade,
            professor: teacher,
          }
        }))
    })()
  }, [])


  return {
    data: turmas
  };
}
