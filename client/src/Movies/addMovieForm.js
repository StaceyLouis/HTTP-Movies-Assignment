import React, { useState } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const initialFormValues = {
    title:'',
    director:'',
    metascore:'',
    stars: [],
    id: Date.now()
}

function AddForm(){
    const [addMovie, setMovie] = useState(initialFormValues)
    const {push} = useHistory();

    const onChange = e =>{
        e.persist()
        if(e.target.name === 'stars'){
            e.target.value = e.target.value.split([','])
        }
        setMovie({
            ...addMovie,
            [e.target.name]: [e.target.value]
        })
    }

    const onSubmit= e =>{
        e.preventDefault();
        axios 
        .post("http://localhost:5000/api/movies", addMovie)
        .then(res => {
            console.log(res.data)
            setMovie(res.data)
            push('/')
            
        })
        .catch(err => {
            console.log( err)
        })
    }
        return(
            <div>
                <div>
                    <form onSubmit={onSubmit}>
                        <label>Director: &nbsp; </label>
                        <input 
                            type="text"
                            name="director"
                            value={addMovie.director}
                            onChange={onChange}
                        />
                        <label>Metascore: &nbsp; </label>
                        <input 
                            type="text"
                            name="metascore"
                            value={addMovie.metascore}
                            onChange={onChange}
                        />
                        <label>Title: &nbsp; </label>
                        <input 
                            type="text"
                            name="title"
                            value={addMovie.title}
                            onChange={onChange}
                        />
                        <label>Director: &nbsp; </label>
                        <input 
                            type="text"
                            name="stars"
                            value={addMovie.stars}
                            onChange={onChange}
                        />
                        <button>Update Movies</button>
                    </form>
                </div>
            </div>
        )
}


export default AddForm