import {useState} from 'react';

const useForm = (callback) => {
    const [values, setValues] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        callback(values);
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }
    return [handleSubmit, handleChange, values];
}

export default useForm;