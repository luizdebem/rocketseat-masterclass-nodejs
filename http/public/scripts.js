const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

async function load() {
    const response = await fetch('http://localhost:3000/').then(data => data.json());
    response.urls.map(({name, url}) => addElement({name, url}));
}

async function remove(name, url) {
    const response = await fetch(`http://localhost:3000/?name=${name}&url=${url}&del=1`).then();
}

load();

function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash, a)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

function removeElement(el, a) {
    if (confirm('Tem certeza que deseja deletar?'))
        el.parentNode.remove();
        const name = a.innerHTML;
        const url = a.href.charAt(a.href.length - 1) === '/' ? a.href.slice(0, -1) : a.href;
        remove(name, url);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    addElement({ name, url })

    input.value = ""
})