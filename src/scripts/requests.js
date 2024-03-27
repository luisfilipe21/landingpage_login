import { toast } from './toast.js';

const baseUrl = 'http://localhost:3333';

export const green = '#168821';
export const red = '#df1545'

const createHeader = () => {
    const token = localStorage.getItem('@doit:token');

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }    
    return headers
}

export const loginRequest = async (loginBody) => {
    const token = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginBody)
    })
    .then(async (response) => {
        const convert = await response.json();
        
        localStorage.setItem('@doit:token', convert.token);
        localStorage.setItem('@doit:name', convert.name);

        if(response.ok){
            toast('Deu bom! Redirecionando para o feed', green);
            setTimeout(() => {
                location.replace('./src/pages/dashboard.html');
            }, 1000);
            return convert;
        }else{
            toast(convert.message, red)
        }
    })
    return token
}

export const createTask = async (taskBody) => {
    const token = localStorage.getItem('@doit:token');

    const newTask = await fetch(`${baseUrl}/tasks/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(taskBody)
    })
    .then(async(res)=>{
        const resConvert = await res.json();

        if(res.ok){
            toast('Deu bom! Cadastrado!', green);
            return resConvert;
        }else{
            toast(resConvert.message, red);
        }
    })
    return newTask
}

export const readAllTasks = async () => {
    const tasks = await fetch(`${baseUrl}/tasks/readAll`, {
        method: 'GET',
        headers: createHeader(),
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        }else{
            toast("Deu ruim. Volte mais tarde", red)
        }
    })
    return tasks;
}

export const readById = async (taskId) => {
    const task = await fetch(`${baseUrl}/tasks/${taskId}`, {
        method: 'GET',
        headers: createHeader()
    })
    .then( async (res) => {
        const resConvert = res.json();

        if(res.ok){
            return resConvert;
        }else{
            toast(resConvert.message, red)
        }
    })
    return task
}

export const updateById = async (taskId, taskBody) => {
    const task = await fetch(`${baseUrl}/tasks/update/${taskId}`, {
        method: 'PATCH',
        headers: createHeader(),
        body: JSON.stringify(taskBody)
    })
    .then( async (res) => {
        const resConvert = await res.json();

        if(res.ok){
            toast("Deu bom na atualização", green);
            return resConvert
        }else{
            toast(resConvert.message, red)
        }
    })
    return task
}

export const deleteTask = async (taskId) =>{
    const task = await fetch(`${baseUrl}/tasks/delete/${taskId}`, {
        method: 'DELETE',
        headers: createHeader()
    })
    .then( async (res) => {
        const resConvert = await res.json();

        if(res.ok){
            toast(resConvert.message, green);
        }else{
            toast(resConvert.message, red);
        }
    })
    return task
}