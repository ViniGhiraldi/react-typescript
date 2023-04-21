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
        
        if(e.key === 'Enter'){
            const title = e.currentTarget.value.trim();
            if(title.length > 0 && !lista.some((listItem)=>listItem.title === title)){
                TarefasService.create({title, isCompleted: false})
                .then((result)=>{
                    if(result instanceof ApiException){
                        alert(result.message);
                    }else{
                        setLista((oldLista)=>{
                            return [...oldLista, result];
                        })
                    }
                })
            }
            e.currentTarget.value = '';
        }
    },[lista])

    const handleToggleComplete = useCallback((id: number, dataToUpdate: ITarefa)=>{
        TarefasService.updateById(id, {
            ...dataToUpdate,
            isCompleted: !dataToUpdate.isCompleted
        })
        .then((result)=>{
            if(result instanceof ApiException){
                alert(result.message)
            }else{
                setLista((oldLista)=>{
                    return oldLista.map((oldListItem)=>{
                        const newIsCompleted = oldListItem.title === result.title
                        ? !oldListItem.isCompleted
                        : oldListItem.isCompleted;

                        return {...oldListItem, isCompleted: newIsCompleted}
                    })
                })
            }
        })
        .catch(err=>console.log(err))
    },[])

    const handleDelete = useCallback((id: number)=>{
        TarefasService.deleteById(id)
        .then((result)=>{
            if(result instanceof ApiException){
                alert(result.message)
            }else{
                setLista((oldLista)=>{
                    return oldLista.filter((oldListItem)=>{
                        return oldListItem.id !== id;
                    })
                })
            }
        })
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
                          onChange={() => handleToggleComplete(listItem.id, listItem)}
                        />
                        {index} - {listItem.title}

                        <button onClick={() => handleDelete(listItem.id)}>Apagar</button>
                    </li>
                })}
            </ul>
        </div>
    );
}