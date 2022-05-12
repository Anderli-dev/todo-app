import axios from "axios";

export function DeleteTask(id){
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };
    try {
        axios.delete(`${process.env.REACT_APP_API_URL}/api/task/`+ id +`/delete`, {
            headers: headers,})
            .catch(error => {return(error.response)})
    } catch (err) {
        console.log(err)
    }
}