import react, { useState } from "react"
import axios from "axios"

function App() {

  const data = {
    name : "",
    resume : ""
  }

  const [inputFields, setInputFields] = useState(data)

  const onInputChange = (e) =>{
    setInputFields({...inputFields, [e.target.name] : e.target.value})
  }

  const submitButton = () => {
    console.log("Submit button clicked")

    const formData = new FormData();
    formData.append('myFile', inputFields.resume, inputFields.resume.name)
    formData.append('name', inputFields.name)


    axios.post("http://localhost:3001/pushData", formData)
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error)
    })

  }

  const onDocumentUpload = (e) => {
    console.log(e.target.files[0])
    setInputFields({...inputFields, resume : e.target.files[0]})
  }

  return (
    <div className="App">
      <h1>Hello world</h1>
      <div>
        <input type="text" id="name" name="name" placeholder="Enter your name" onChange={onInputChange}/>
        <input type="file" name="upload" accept="application/pdf,application/vnd.ms-excel" onChange={onDocumentUpload} />
      </div>
      <div>
        <button type="button" onClick={submitButton}> Submit the document</button>
      </div>
    </div>
  );
}

export default App;
