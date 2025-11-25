import { createClient } from "https://esm.sh/@supabase/supabase-js"
const supabase = createClient('https://kamjqsmvxqfogrsppfou.supabase.co', 'sb_publishable_lseolM209T2zqNOBzu0_PQ_byLzxnO9')
    

async function getOngsUpdateHtml() {
    const listaOngs = document.querySelector("#divCardsOngs")
    let { data, error } = await supabase
  .from('empresas')
  .select('*')   

if (error) {
    console.error(error)
    return
}

console.log(data)

data.forEach(element => {
    const card = document.createElement("div")
    card.classList.add('card')

    let nomeEmpresa = element.nome
    let emailEmpresa = element.email
    let cnpj = element.cnpj
    let area = element.area
    card.innerHTML = `
            <h3>${nomeEmpresa}</h3>
            <p>Email: ${emailEmpresa}</p>
            <p>CNPJ: ${cnpj}</p>
            <p>Área: ${area}</p>
            <div class="card-actions">
            <button class="btn-edit btn-secondary" onclick="editOng('${nomeEmpresa}')">Editar</button>
            <button class="btn-delete btn-danger">Excluir</button>
            </div>`
listaOngs.appendChild(card)
});
}

async function addOng(nome,email,cnpj,telefone,senha,area) {
    const { data, error } = await supabase
    .from('empresas')
    .insert([
        {
            nome: nome,
            email: email,
            cnpj: cnpj,
            telefone: telefone,
            senha: senha,
            area: area
        },
    ])
    .select()
    if (error) {
        console.error(error)
        return
    }  
}

async function handleFormSubmit(e) {
    e.preventDefault()
    const form = e.target
    const formData = Object.fromEntries(new FormData(form))
    // if (!validarCNPJ(formData.cnpj)) {
    //     console.error("CNPJ inválido")
    //     document.querySelector("#comapany-cnpj").setCustomValidity("CNPJ inválido")
    // }
    await addOng(
      formData.nome,
      formData.email,
      formData.cnpj,
      formData.tel,
      formData.senha,
      formData.area
    );

    console.log("Adicionada a ong " + formData.nome)
    form.reset()
    showSection('login')
}


//Rodar funções estáticas
getOngsUpdateHtml()

const form = document.querySelector("#formCadastro")
form.addEventListener("submit",(e) => handleFormSubmit(e))