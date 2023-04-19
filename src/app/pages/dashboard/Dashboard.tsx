import { useCallback, useState } from 'react';

interface ITarefa{
    id: number;
    title: string;
    isCompleted: boolean;
}

export const Dashboard = () => {
    const [lista, setLista] = useState<ITarefa[]>([])

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

            <p>{lista.filter((listItem) => listItem.isCompleted).length}</p>

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