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
    if (!listaOngs) return
    listaOngs.innerHTML = ''
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
            <button class="btn-delete btn-danger" data-ongid=${element.id} >Excluir</button>
            </div>`
listaOngs.appendChild(card)
});
}

async function removeOng(id) {
    const response = confirm("Deseja realmente remover essa ong?")
    if (!response) {
        return
    }

    const {data,error} = await supabase
    .from('empresas')
    .delete()
    .eq('id',id) 
    .select()
    .single()

    console.log(data)
    await getOngsUpdateHtml()
    await setEventListeners()
    alert(`Ong ${data.nome} removida com sucesso`)
    document.querySelector("#sidebar > a.active").click()
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
    alert("Adicionada a ong " + formData.nome)
    window.location.href = '../index.html'
    form.reset()
    getOngsUpdateHtml()
}

function setEventListeners() {
    // Adicionar event listeners
    const deleteButtons = document.querySelectorAll(".btn-delete")
    deleteButtons.forEach((b) => b.addEventListener("click",() => removeOng(b.dataset.ongid)))
    const form = document.querySelector("#formCadastro")
    form.addEventListener("submit",(e) => handleFormSubmit(e))
}

//Rodar funções estáticas
await getOngsUpdateHtml()
setEventListeners()