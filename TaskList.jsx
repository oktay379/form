/* map ile task dizinleri donduruldu ve item.task sayfa gecirildi */
// span ile delete button tanimlandi ve butonun calismasi icin onClick verildix
// onClick baska jsx dosyasindan geldigi icin arrow ile kullanildi
// removeTask(item.uuid) icerisindeki arguman uuid item id bilgisini verir
// item girilmis olan liste inputlari gostermekte 

import { useEffect } from "react";
import { useState } from "react";


export default function TaskList( {tasks, removeTask, editTask, doneTask} ) {
    
    const[priority, setPriority] = useState(false);

    const[filteredTasks, setFilteredTask] = useState(tasks);

     
    function handlePriorityFilter() {
        const newPriority = !priority
        newPriority ? setFilteredTask(tasks.filter(item => item.priority === newPriority)) : setFilteredTask(tasks)
        setPriority(prev => !prev);
        console.log(priority);
    }

 
    // tasks bilgisi componente ulasınca filtera esitle 
    useEffect(() => {
        setFilteredTask(tasks)
    }, [tasks] );

    // priority bilgisi degisirse kullanılır priority(true/false)
    // useEffect(() => {
    //     priority ? setFilteredTask(tasks.filter(item => item.priority === true)) : setFilteredTask(tasks)
    // }, [priority] );


    return (
        <>
            <div className="mb-3 p-3 bg-light border rounded">
                <h5 className="mb-3"> 
                    Gorevler:  
                    <span className="btn btn-sm border float-end" onClick={handlePriorityFilter}> 
                        Filtre 
                    </span> 
                </h5>
                <ul className="list-group">     
                    {filteredTasks.map((item) => 
                    <li className="list-group-item" key={item.uuid}>
                        {item.task}   
                        {item.priority && <span className="badge text-bg-secondary ms-2 bg-warning text-dark">Oncelik</span>}
                        <span className="btn btn-sm btn-success float-end ms-3" onClick={() => doneTask(item.uuid)} >
                            Bitir
                        </span>
                        <span className="btn btn-sm btn-danger float-end" onClick={() => removeTask(item.uuid)} >
                            Sil
                        </span>
                        <span className="btn btn-sm btn-primary float-end me-3" onClick={() => editTask(item.uuid)} >
                            Duzenle
                        </span>
                    </li>)}
                </ul>
            </div>
        </>
    )
}