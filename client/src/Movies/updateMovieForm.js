import React, { useState, useEffect } from 'react'
import{useParams, useHistory} from 'react-router-dom'
import axios from 'axios'

const initialFormValues = {
    title:'',
    director:'',
    metascore:'',
    stars: ''
}

function UpdateForm(props) {
    const [form, setForm] = useState(initialFormValues)

    const params = useParams();
    const {push} = useHistory();

       
    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${params.id}`)
        .then(res => {
            console.log(res.data)
            setForm(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    
}, []);

const onChange = (e) =>{
    setForm({
        ...form,
        [e.target.name]: [e.target.value]
    })
}
const onSubmit= (e) =>{
    e.preventDefault()
    axios
    .put(`http://localhost:5000/api/movies/${form.id}`, form)
    .then(res => {
        console.log(res)
        setForm(res.data)
        push(`/`);
       
    })
    .catch(err => {
        console.log(err)
    })
}

return(
    <div>
        <div>
           <h3>Update Movies</h3> 
        </div>
        <div>
            <form onSubmit={onSubmit}>
                <label>Director: &nbsp; </label>
                <input 
                    type="text"
                    name="director"
                    value={form.director}
                    onChange={onChange}
                />
                <label>Metascore: &nbsp; </label>
                <input 
                    type="text"
                    name="metascore"
                    value={form.metascore}
                    onChange={onChange}
                />
                <label>Title: &nbsp; </label>
                <input 
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={onChange}
                />
                <label>Director: &nbsp; </label>
                <input 
                    type="text"
                    name="stars"
                    value={form.stars}
                    onChange={onChange}
                />
                <button>Update Movies</button>
            </form>
        </div>
    </div>
)
}

export default UpdateForm