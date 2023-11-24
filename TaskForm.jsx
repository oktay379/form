import { useState } from "react";
import {v4 as uuidv4} from "uuid";    // uuid ile random id bilgileri alabilirim terminal kaydettikten sonra import ile alinmis oldu
import TaskList from "./TaskList";



export default function TaskForm() { 
    
    // setTasks dizinin içerisine, setFormData objeleri ekleniyor
    // emptyForm object yapisini tutmakta useState ilk hali olarak atandi
    const emptyForm = {
        task: "",
        priority: false
    }
                                                                                                         
    const[formData, setFormData] = useState(emptyForm);  // formData -> emptyForm

    const[tasks, setTasks] = useState([]);          // tasks -> []
    // girilen input degerlerini array icine almak icin tanimlandi
    



    // onChange girilen degerleri gormemi saglar, buradaki amac emptyForm objesine girilen degerleri kaydetmektir
    // prev ile dondurduk return aldık ...prev alinmis onceki degerleri dizin olarak tutuyor
    function handleInputChange(event) {
        setFormData(prev => {     
            // biz obje yapisina dizin gonderiyoruz burada
            return {
                ...prev,        // prev onceki elemanları tutup dizin yapmis oldu eger type checkbox ise event.target.checked olur degil ise event.target.value degeri alinir 
                [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
                // setFormData useState return ile ilk olarak emptyForm icerisindeki 
                // task kısmına [event.target.name] dizini geliyor : karsılıgında value        
            }
        })
    }
    


    function editTask(uuid) {
        console.log(uuid)   
        const task = tasks.find(item => item.uuid === uuid);
        //console.log(task) bu bilgi bize consol da task, priority, id bilgilerini verir
        setFormData({...task, isEdited: true})       // setForm data girilen input degeri kaydedilmis oldu
    }


    
    // Burada removeTask component props olarak gonderildi uuid argumani ile
    // filter ile arguman olarak giden uuid item.uuid id bilgileri esit degilse filter da olmayacagı icin silmis olur
    function removeTask(uuid) {
        setTasks(prev => prev.filter(item => item.uuid !== uuid))
    }



    function doneTask() {
        alert("Basarili...")
    }




    function handleFormSubmit(event) {
        event.preventDefault()                      //sayfa yenilenme onledik

        if(formData.isEdited) {
            const taskIndex = tasks.findIndex(item => item.uuid === formData.uuid)
            const newTasks = tasks.slice();
            newTasks[taskIndex] = {...formData};
            setTasks(newTasks);
        }


        else if(formData.task.length > 3) {          // girilen formData input degeri 3 den buyuk ise if blok calisacaktir 
            formData.uuid = uuidv4()            // uuid bilgisi verilmis oldu input bilgisine
            setTasks(                           // olusturulan useState dizinine formData bilgisi eklenir ve ...prev ile onceki degerler tutulacaktir
                prev => [formData, ...prev]    
            )
        }
        setFormData(emptyForm);     // degerler emptyForm diyerek sifirlandi
        event.target.reset();       // girilen degeler input cubugu resetlenmis oldu
    }





    return (
        // Form yapisi Bootstrap den alinip copy-paste eldildi
        // OnSubmit yapisi kullanildi ve ustte fonksiyon taminlandi
        // value ve checked degerleri duzelt button basildiginda formData.task bilgisini direkt alacaktir input olarak
        <>
            <TaskList tasks={tasks} removeTask={removeTask} editTask={editTask} doneTask={doneTask}/>
            <form onSubmit={handleFormSubmit}>  

                <div className="row mb-3">
                    <label htmlFor="task" className="col-sm-2 col-form-label">Task</label>
                    <div className="col-sm-10">

                        <input type="text" className="form-control" id="task" name="task"
                        value={formData.task}  
                        onChange={handleInputChange}
                        />

                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-sm-10 offset-sm-2">
                        <div className="form-check">
                            
                            <input className="form-check-input" type="checkbox" id="priority" name="priority"
                            checked={formData.priority}
                            onChange={handleInputChange}
                            />

                            <label className="form-check-label" htmlFor="priority">
                                Oncelikli
                            </label>

                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Sign in</button>

                <span></span>

            </form>
        </>
    )
}