
// Máscara para o campo telefone
document.getElementById('telefone').addEventListener('input', function (e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});

// Função genérica para validar campos
function validarCampo(campo, regex) {
    if (regex.test(campo.value)) {
        campo.classList.remove("is-invalid");
        campo.classList.add("is-valid");
    } else {
        campo.classList.remove("is-valid");
        campo.classList.add("is-invalid");
    }
}

// Validação do campo Nome (mínimo 3 caracteres, apenas letras e espaços)
document.getElementById("nome").addEventListener("input", function (e) {
    const nomeRegex = /^[a-zA-ZÀ-ÿ\s]{3,}$/;
    validarCampo(e.target, nomeRegex);
});

// Validação do campo E-mail (seguindo o padrão nome@dominio.string)
document.getElementById("email").addEventListener("input", function (e) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    validarCampo(e.target, emailRegex);
});

// Validação do campo Telefone (seguindo o formato (xx) xxxxx-xxxx)
document.getElementById("telefone").addEventListener("input", function (e) {
    const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    validarCampo(e.target, telefoneRegex);
});

// Validação antes do envio do formulário
const btnReceberContato = document.querySelector("button[type='submit']");
const formulario = document.querySelector("form");

if (btnReceberContato) {
    btnReceberContato.addEventListener("click", function(event) {
        event.preventDefault(); // Impede o envio padrão

        const nomeInput = document.getElementById("nome");
        const emailInput = document.getElementById("email");
        const telefoneInput = document.getElementById("telefone");

        // Expressões regulares para validação final antes do envio
        const nomeRegex = /^[a-zA-ZÀ-ÿ\s]{3,}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

        // Se algum campo estiver inválido, impede o envio
        if (!nomeRegex.test(nomeInput.value)) {
            nomeInput.classList.add("is-invalid");
            return;
        }
        if (!emailRegex.test(emailInput.value)) {
            emailInput.classList.add("is-invalid");
            return;
        }
        if (!telefoneRegex.test(telefoneInput.value)) {
            telefoneInput.classList.add("is-invalid");
            return;
        }

        if (formulario.checkValidity()) {
            const mensagemContatoForm = document.getElementById("mensagemContatoForm");
            if (mensagemContatoForm) {
                mensagemContatoForm.style.display = "block"; // Exibe a mensagem
                setTimeout(() => mensagemContatoForm.style.display = "none", 5000); // Esconde após 5s
            }
            formulario.reset(); // Limpa todos os campos
        } else {
            formulario.reportValidity(); // Exibe mensagens de erro se houver campos inválidos
        }
    });
}
