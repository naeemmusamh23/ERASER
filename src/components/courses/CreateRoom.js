import React from "react";
import { v1 as uuid } from "uuid";
import { useHistory } from "react-router-dom";
import {socket} from './course'

const CreateRoom = (props) => {
    const history = useHistory();
    function create() {
        const id = uuid();
        socket.emit('createCourse', { course: props.id, id })
        history.push(`/course/${props.id}/${id}`);
    }

    return (
        <button type="button" className="btn btn-primary noMargin" onClick={create} style={{marginBottom:20}}>Create room</button>
    );
};

export default CreateRoom;