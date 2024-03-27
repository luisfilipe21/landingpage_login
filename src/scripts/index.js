import { loginRequest, red} from './requests.js';
import { toast } from './toast.js';


const authentication = () => {
    const token = localStorage.getItem('@doit:token');

    if (token) {
        location.replace('./src/pages/dashboard.html');
    }
}

const handleLogin = () => {
    const inputs = document.querySelectorAll('.login__input');
    const button = document.querySelector('.login__button');

    button.addEventListener('click', (event) => {
        event.preventDefault();
        const loginBody = {};

        let count = 0;
        
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                count++;
            }
            loginBody[input.name] = input.value;
        })

        if (count !== 0) {
            count = 0;
            return toast('Deu ruim! Preencha os campos direito', red)
        } else {
            loginRequest(loginBody)
        }
    })
}

authentication()
handleLogin()