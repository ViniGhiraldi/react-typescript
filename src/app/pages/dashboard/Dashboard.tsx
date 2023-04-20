import { useCallback, useEffect, useState } from 'react';
import { ITarefa, TarefasService } from '../../shared/services/api/tarefas/TarefasService';
import { ApiException } from '../../shared/services/api/ApiException';

export const Dashboard = () => {
    const [lista, setLista] = useState<ITarefa[]>([]);

    useEffect(()=>{
        TarefasService.getAll()
        .then((result)=>{
            if(result instanceof ApiException){
                alert(result.message);
            }else{
                setLista(result);
            }
        })
    }, [])

    const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e)=>{
        if(e.key === 'Enter' && e.currentTarget.value.trim().length > 0){

            const value = e.currentTarget.value.trim();

            setLista((oldLista)=>{
                if(oldLista.some((listItem) => listItem.title === value)) return oldLista;

                return [...oldLista, {id: oldLista.length, title: value, isCompleted: false}]
            });

            e.currentTarget.value = '';
        }
    },[])

    return(
        <div>
            <p>Lista</p>

            <input 
              onKeyDown={handleInputKeyDown}
            />

            {lista.filter((listItem) => listItem.isCompleted).length > 0 && (
                <p>{lista.filter((listItem) => listItem.isCompleted).length}</p>
            )}

            <ul>
                {lista.map((listItem, index)=>{
                    return <li key={listItem.id}>
                        <input
                          type="checkbox"
                          checked={listItem.isCompleted}
                          onChange={()=>{
                            setLista(oldLista => {
                                return oldLista.map(oldListItem => {
                                    const newIsCompleted = oldListItem.title === listItem.title
                                    ? !oldListItem.isCompleted
                                    : oldListItem.isCompleted;
                                    return {
                                        ...oldListItem,
                                        isCompleted: newIsCompleted
                                    };
                                })
                            })
                          }}
                        />
                        {index} - {listItem.title}
                    </li>
                })}
            </ul>
        </div>
    );
}