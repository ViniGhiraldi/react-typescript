import { useCallback, useState } from 'react';

interface IListItem{
    title: string;
    isSelected: boolean;
}

export const Dashboard = () => {
    const [lista, setLista] = useState<IListItem[]>([])

    const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e)=>{
        if(e.key === 'Enter' && e.currentTarget.value.trim().length > 0){

            const value = e.currentTarget.value.trim();

            setLista((oldLista)=>{
                if(oldLista.some((listItem) => listItem.title === value)) return oldLista;

                return [...oldLista, {title: value, isSelected: false}]
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

            <p>{lista.filter((listItem) => listItem.isSelected).length}</p>

            <ul>
                {lista.map((listItem, index)=>{
                    return <li key={index}>
                        <input
                          type="checkbox"
                          checked={listItem.isSelected}
                          onChange={()=>{
                            setLista(oldLista => {
                                return oldLista.map(oldListItem => {
                                    const newIsSelected = oldListItem.title === listItem.title
                                    ? !oldListItem.isSelected
                                    : oldListItem.isSelected;
                                    return {
                                        ...oldListItem,
                                        isSelected: newIsSelected
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