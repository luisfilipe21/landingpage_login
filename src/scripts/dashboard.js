import {readAllTasks, red, createTask,updateById} from './requests.js';
import { render } from './render.js';

const authentication = () => {
    const token = localStorage.getItem('@doit:token');

    if(!token){
        location.replace('../../index.html')
    }

}

const showDash = async () => {
    const allTasks = await readAllTasks()

    render(allTasks);
    handleUpdateModal();
}

const handleNewTask = () => {
    const inputs = document.querySelectorAll('.create__task');
    const button = document.querySelector('#addTaskSubmit');
    const modalController = document.querySelector('.modal__controller--task');

    button.addEventListener('click', (e) =>{
        e.preventDefault();

        const newTask = {};
        let count = 0;

        inputs.forEach(input => {
            if(input.value.trim() === ''){
                count++;
            };
            newTask[input.name] = input.value;
        });
        if(count !== 0){
            return toast('Deu ruim. Preencha os campos necessários', red)
        }else{
            createTask(newTask);
            modalController.close()

            showDash();

            inputs.forEach(input => {
                input.value = '';
            })
        }
    })
}

const showAddTaskModal = () => {
    const button = document.querySelector('#addTaskButton');
    const modalController = document.querySelector('.modal__controller--task');

    button.addEventListener('click', () => {
        modalController.showModal();
        closeModal()
    })
}

const closeModal = () => {
    const button = document.querySelector('#closeModalButton');
    const modalController = document.querySelector('.modal__controller--task');

    button.addEventListener('click', () => {
        modalController.close();
    })
}

const handleUpdateModal = () => {
    const modalController = document.querySelector('.modal__controller--update');
    const inputs = document.querySelectorAll('.task_modal__update > .add__input');
    const updateButtons = document.querySelectorAll('.update__button');
    const submitButton = document.querySelector('#taskSubmitUpdate');

    updateButtons.forEach(button => {
        button.addEventListener('click', (firstEvent) =>{
            modalController.showModal();

            submitButton.addEventListener('click', async (e) =>{
                e.preventDefault();

                const updateTask = {};
                let count = 0;

                inputs.forEach(input => {
                    if(input.value.trim() === ''){
                        count++;
                    }else{
                        updateTask[input.name] = input.value;
                    }
                });
                if(count !== 0){
                    return toast('Deu ruim. Preencha os caompos necessários', red);
                }else{
                    await updateById(firstEvent.target.id, updateTask);
                    
                    modalController.close();
                    showDash();

                    inputs.forEach(input => {
                        input.value = '';
                    })
                };
            });
        });
    });
}

export const handleDeleteTask = () => {
    const deleteButtons = document.querySelectorAll('.card__deleted');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async (e) =>{
            await deleteTask(e.target.dataset.taskId);
            showDash();
        })
    })
}

export const handleComplete = () => {
    const completeButtons = document.querySelectorAll('.card__completed');
    const cardBar = document.querySelector('.card__bar');

    completeButtons.forEach(button => {
        button.addEventListener('click',() =>{
            if(!button.classList.contains('.card__button--completed')){
                button.addEventListener('click', async (event) => {
                    const complete = await completeTask(event.target.dataset.taskId);

                    if(complete){
                        cardBar.classList.add('card__bar--completed');
                        cardBar.classList.remove('card__bar--pending');
                    }

                    showDash();
                })
            }
        })
    })
}

export const handlePending = () => {
    const completeButtons = document.querySelectorAll('.card__button--completed');
    const cardBar = document.querySelector('.card__bar');

    completeButtons.forEach(button => {
        button.addEventListener('click', async (event) =>{
            const pending = await uncompleteTask(event.target.dataset.taskId);

            if(pending){
                cardBar.classList.add('card__bar--pending');
                cardBar.classList.remove('card__bar--completed');
                showDash()
            }
        })
    })

}

const showLogoutOption = () => {
    const button = document.querySelector('.header__action');
    const background = document.querySelector('.header__account--after');
    const logoutOption = document.querySelector('.header__account');
    const logoutName = document.querySelector('.account__username');

    button.addEventListener('click', () => {
        background.classList.toggle('hidden');
        logoutOption.classList.toggle('hidden');

        logoutName.innerText = `@${localStorage.getItem('@doit:name')}`

        const buttonLogout = document.querySelector('.button__container');

        buttonLogout.addEventListener('click', () => {
            localStorage.clear();
            location.replace('../../index.html');
        })
    })
}

authentication();
showDash();
handleNewTask();
showAddTaskModal();
closeModal();
showLogoutOption();