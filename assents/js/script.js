let Validador = {
    handleSubmit: (event) =>{
        event.preventDefault();
        let send = true;
        let inputs = document.querySelectorAll('input');

        
        Validador.clearErrors();
        
        for (let i=0;i<inputs.length;i++){
            let input = inputs[i];
            let check = Validador.checkInput(input);
            if(check !== true){
                send = false
                Validador.showError(input, check);
            }
        }

        if(send) {
            form.submit();
        }
    },
    checkInput:(input) =>{
        let senha1 = document.getElementById('senha').value;
        let senha2 = document.getElementById('confirmarSenha').value;
        let rules = input.getAttribute('data-rules');
        if(rules !== null){
            rules = rules.split('/');
            for(let k in rules){
                let rDetails = rules[k].split('=');
                switch(rDetails[0]){
                    case 'required':
                        if(input.value == ''){
                            return 'Campo obrigatório!';
                        }
                    break;

                    case 'min':
                        if(input.value.length < rDetails[1]){
                            return 'É necessário pelo menos '+rDetails[1]+' caracteres';
                        }
                    break;
                    
                    case 'confirmar':
                        if(senha1 !== senha2){
                            return 'Senha diferentes!'
                        }
                    break;
                }
            }
        }
        return true;
    },
    showError:(input,error) =>{ 
        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;
        input.parentElement.insertBefore(errorElement,input.ElementSibling);
    },
    clearErrors:() =>{
        let errorElements = document.querySelectorAll('.error');
        for(i=0;i<errorElements.length;i++){
            errorElements[i].remove();
        }
    }
};
let form = document.querySelector('.validator');
form.addEventListener('submit', Validador.handleSubmit);