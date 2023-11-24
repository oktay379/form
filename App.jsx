import TaskForm from './TaskForm'


// Burada container ayarlandı icersine TaskForm component aktarildi ve orada islemler yapildi


function App() {

  return (
    <>
      <div className="container mt-5">
        <div className='row justify-content-sm-center'>
          <div className='col-sm-8'>
            <TaskForm/>
          </div>
        </div>
      </div>
    </>
  )
  
}

export default App