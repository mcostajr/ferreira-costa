const produtos = [
    {
        id: 0,
        nome: "Martelo",
        preco: 24.90,
        detalhes: "Martelo Unha De 22mm Com Cabo Fibra Emborrachado tamanho Pequeno",
        url: "img/martelo.jpg"
    },
    {
        id: 1,
        nome: "Alicate",
        preco: 50,
        detalhes: "Alicate Universal Profissional 8280-200 - 8'",
        url: "img/alicate.jpg"
    },
    {
        id: 2,
        nome: "Furadeira",
        preco: 234.90,
        detalhes: "Com esta furadeira elétrica Vonder PFV 012 você poderá executar varias tarefas em diferentes superfícies de uma maneira prática e simples.",
        url: "img/furadeira.jpg"
    },
    {
        id: 3,
        nome: "Serra Circular",
        preco: 482,
        detalhes: "Otimize tempo e esforço com esta serra elétrica Skil 5200. Projetado para trabalhos pesados, facilita sua tarefa e oferece desempenho e eficiência ideais. Recomendamos usá-lo para cortes em madeira.",
        url: "img/serra-circular.jpg"
    },
    {
        id: 4,
        nome: "Chave de Fenda",
        preco: 38.99,
        detalhes: "Jogo com 6 Chaves de fenda",
        url: "img/chave-de-fenda.jpg"
    }
]

const tabelaCepValor = [
    {
        regiao: "Grande São Paulo",
        preco: 15,
    },
    {
        regiao: "Interior de São Paulo",
        preco: 18,
    },
    {
        regiao: "Rio de Janeiro e Espírito Santo",
        preco: 20,
    },
    {
        regiao: "Minas Gerais",
        preco: 13,
    },
    {
        regiao: "Bahia e Sergipe",
        preco: 5,
    },
    {
        regiao: "Pernambuco, Alagoas, Paraíba e Rio Grande do Norte",
        preco: 12,
    },
    {
        regiao: "Ceará, Piauí, Maranhão, Pará, Amazonas, Acre, Amapá e Roraima",
        preco: 19,
    },
    {
        regiao: "Distrito Federal, Goiás, Tocantins, Mato Grosso, Mato Grosso do Sul e Rondônia",
        preco: 14,
    },
    {
        regiao: "Paraná e Santa Catarina",
        preco: 22,
    },
    {
        regiao: "Rio Grande do Sul",
        preco: 25,
    },
]

const carrinho = []

class Pedido {
    constructor(produto,quantidade) {
        this.produto = produto;
        this.quantidade = quantidade
    }
}

var out = ''
produtos.map(produto => {
    return (
        out += `<div class="produto">
            <div class="imagem-produto">
                <img src=${produto.url} alt="produto">
            </div>
            <div class="detalhes-produto">
                <strong>${produto.nome}</strong>
                <span>R$ ${produto.preco}</span>
                <p>${produto.detalhes}</p>
            </div>
            <div class="quantidade-produto">
                <input id=${produto.id} type="number">
                <button onclick="criarPedido(${produto.id})">Adicionar</button>
            </div>
        </div>`
    )
})
document.getElementById("lista-de-produtos").innerHTML = out

document.querySelector("#cep").addEventListener('keyup', (event) => {
    adicionarCarrinho()
})

function criarPedido(index) {
    const pedido = new Pedido(produtos[index],parseFloat(document.getElementById(`${index}`).value))
    adicionarCarrinho(pedido)
}

function adicionarCarrinho(pedido = {}) {
    let out = ''
    let count = 0
    let valorFinal = 0
    let cep = parseInt(document.querySelector("#cep").value.charAt(0))
    
    if(pedido.quantidade > -1) {
        carrinho.map((produtos,index) => {
            if(produtos.produto.id == pedido.produto.id) {
                if(pedido.quantidade > 0) {
                    produtos.quantidade = pedido.quantidade
                } else {
                    carrinho.splice(index, 1)
                }
                count++
            }
        })
    
        if(count < 1 && pedido.quantidade > 0) {
            carrinho.push(pedido)
        }
    }

    carrinho.map(produtos => {
        out += `
            <tr>
                <td><img src="${produtos.produto.url}"></img></td>
                <td>${produtos.produto.nome}</td>
                <td>${produtos.quantidade}</td>
                <td>${produtos.produto.preco}</td>
                <td>R$ ${parseFloat(produtos.produto.preco * produtos.quantidade).toFixed(2)}</td>
            </tr>`
        
        valorFinal += parseFloat(produtos.produto.preco * produtos.quantidade)
    })
    
    if(cep > -1 && cep < 10) {
        valorFinal += tabelaCepValor[cep].preco
        document.getElementById("localcep").innerHTML = `CEP: [${cep}] ${tabelaCepValor[cep].regiao} no valor de R$ ${tabelaCepValor[cep].preco}`
    } else {
        document.getElementById("localcep").innerHTML = ''
    }

    document.getElementById("listacarrinho").innerHTML = `
        ${out}
        <tr><td><strong>Total</strong></td><td></td><td></td><td></td><td><strong>R$ ${valorFinal.toFixed(2)}</strong></td></tr>
        `

    if(carrinho.length > 0) {
        document.querySelector('.carrinho').style.display = 'block'
    } else {
        document.querySelector('.carrinho').style.display = 'none'
    }
}