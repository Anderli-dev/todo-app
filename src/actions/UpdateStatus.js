import axios from "axios";

export function UpdateStatus(body, id){
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };
    try {
        axios.put(`${process.env.REACT_APP_API_URL}/api/task/`+ id +`/set_task_status`,body, {
            headers: headers,})
            .catch(error => console.log(error))
    } catch (err) {
        console.log(err)
    }
}