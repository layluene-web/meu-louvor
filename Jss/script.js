let louvorEditando = null;
let louvores = JSON.parse(localStorage.getItem("louvores")) || [
    {
        
        nome: "Tu És Tudo",
        artista: "Alessandro Vilas Boas",
        cantor: "Kayane",
        tom: "E",
        status: "ja-peguei",
        favorito: false
    },
    {
        nome: "Ousado Amor",
        artista: "Isaías Saad",
        cantor: "Kayane",
        tom: "C",
        status: "ainda-vou-pegar",
       favorito: false
    }
];

const listaLouvores = document.getElementById("listaLouvores");

function mostrarLouvores(lista) {
    listaLouvores.innerHTML = "";

    lista.forEach(function(louvor) {

        const musica = document.createElement("div");

        musica.classList.add("card-louvor");
if (louvor.status === "ja-peguei") {
    musica.classList.add("status-ja-peguei");
}
if (louvor.status === "ainda-vou-pegar") {
    musica.classList.add("status-ainda-vou-pegar");
}
if (louvor.favorito === true) {
    musica.classList.add("favoritado");
}
        let statusTexto = "";

        if (louvor.status === "ja-peguei") {
            statusTexto = "✅ Já peguei";
        } else {
            statusTexto = "📌 Ainda vou pegar";
        }

        musica.innerHTML = `
            <h3>🎵 ${louvor.nome}</h3>

            <p>Artista: ${louvor.artista}</p>

            <p>🎤 Cantor: ${louvor.cantor}</p>

            <p>🎼 Tom: ${louvor.tom}</p>

            <p class="status">${statusTexto}</p>

            <div class="acoes">
                <button onclick="favoritarLouvor('${louvor.nome}', '${louvor.cantor}')">
    ${louvor.favorito ? "⭐ Favoritado" : "☆ Favoritar"}
</button>
                <button onclick="editarLouvor('${louvor.nome}', '${louvor.cantor}')">
    ✏️ Editar
</button>
               <button onclick="excluirLouvor('${louvor.nome}', '${louvor.cantor}')">
    🗑️ Excluir
</button>
            </div>
        `;

        listaLouvores.appendChild(musica);
    });
}

mostrarLouvores(louvores);

function pesquisarLouvor() {
    const texto = document.getElementById("campoPesquisa").value;

    const resultados = louvores.filter(function(louvor) {
        return louvor.nome.toLowerCase().includes(texto.toLowerCase());
    });

    listaLouvores.innerHTML = "";

    resultados.forEach(function(louvor) {
        listaLouvores.innerHTML += `
            <div>
                <h3>${louvor.nome}</h3>
                <p>Artista: ${louvor.artista}</p>
                <p>🎤 Cantor: ${louvor.cantor}</p>
                <p>🎼 Tom: ${louvor.tom}</p>
            </div>
        `;
    });
}

const btnAdicionar = document.getElementById("btnAdicionar");
const formularioLouvor = document.getElementById("formularioLouvor");
const cancelarEdicao = document.getElementById("cancelarEdicao");
const filtroTodos = document.getElementById("filtroTodos");
const filtroPeguei = document.getElementById("filtroPeguei");
const filtroAindaVouPegar = document.getElementById("filtroAindaVouPegar");
const filtroFavoritos = document. getElementById("filtroFavoritos");
btnAdicionar.addEventListener("click", function() {
    formularioLouvor.style.display = "block";
});

cancelarEdicao.addEventListener("click", function() {
    formularioLouvor.style.display = "none";

    louvorEditando = null;

    document.getElementById("nomeLouvor").value = "";
    document.getElementById("artistaLouvor").value = "";
    document.getElementById("cantorLouvor").value = "";
    document.getElementById("tomLouvor").value = "";
});




const salvarLouvor = document.getElementById("salvarLouvor");

salvarLouvor.addEventListener("click", function() {

    const novoLouvor = {
        
        nome: document.getElementById("nomeLouvor").value,
        artista: document.getElementById("artistaLouvor").value,
        cantor: document.getElementById("cantorLouvor").value,
        tom: document.getElementById("tomLouvor").value,
        status: document.getElementById("statusLouvor").value,
        favorito: false
        
    };
    if (louvorEditando) {

    const louvor = louvores.find(function(louvor) {
        return (
            louvor.nome === louvorEditando.nome &&
            louvor.cantor === louvorEditando.cantor
        );
    });

    if (louvor) {
        louvor.nome = novoLouvor.nome;
        louvor.artista = novoLouvor.artista;
        louvor.cantor = novoLouvor.cantor;
        louvor.tom = novoLouvor.tom;
        louvor.status = novoLouvor.status;
    }

    louvorEditando = null;

    localStorage.setItem("louvores", JSON.stringify(louvores));

    mostrarLouvores(louvores);

    formularioLouvor.style.display = "none";

    alert("✏️ Louvor atualizado com sucesso!");

    return;
}
    const musicaRepetida = louvores.some(function(louvor) {
    return (
        louvor.nome.toLowerCase() === novoLouvor.nome.toLowerCase() &&
        louvor.cantor.toLowerCase() === novoLouvor.cantor.toLowerCase()
    );
});
if (musicaRepetida) {
    alert("⚠️ Esse louvor já está cadastrado para esse cantor.");
    return;
}


   louvores.push(novoLouvor);

localStorage.setItem("louvores", JSON.stringify(louvores));

mostrarLouvores(louvores);
formularioLouvor.style.display = "none";
document.getElementById("nomeLouvor").value = "";
document.getElementById("artistaLouvor").value = "";
document.getElementById("cantorLouvor").value = "";
document.getElementById("tomLouvor").value = "";
alert("🎸 Louvor salvo com sucesso!");





});

function excluirLouvor(nome, cantor) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir este louvor?"
    );

    if (!confirmar) {
        return;
    }

    louvores = louvores.filter(function(louvor) {
        return !(
            louvor.nome === nome &&
            louvor.cantor === cantor
        );
    });

    localStorage.setItem("louvores", JSON.stringify(louvores));

    mostrarLouvores(louvores);

    alert("🗑️ Louvor excluído!");
}
function favoritarLouvor(nome, cantor) {

    const louvor = louvores.find(function(louvor) {
        return (
            louvor.nome === nome &&
            louvor.cantor === cantor
        );
    });

    if (!louvor) {
        return;
    }

    louvor.favorito = !louvor.favorito;

    localStorage.setItem("louvores", JSON.stringify(louvores));

    mostrarLouvores(louvores);
}
function editarLouvor(nome, cantor) {

    const louvor = louvores.find(function(louvor) {
        return (
            louvor.nome === nome &&
            louvor.cantor === cantor
        );
    });

    if (!louvor) {
        return;
    }
louvorEditando = {
    nome: louvor.nome,
    cantor: louvor.cantor
};

    document.getElementById("nomeLouvor").value = louvor.nome;
    document.getElementById("artistaLouvor").value = louvor.artista;
    document.getElementById("cantorLouvor").value = louvor.cantor;
    document.getElementById("tomLouvor").value = louvor.tom;
    document.getElementById("statusLouvor").value = louvor.status;

    formularioLouvor.style.display = "block";
}
const btnEntrar = document.getElementById("btnEntrar");
const lembrarLogin = document.getElementById("lembrarLogin");

btnEntrar.addEventListener("click", function() {

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    if (usuario === "Larissa" && senha === "1234") {

        if (lembrarLogin.checked) {
            localStorage.setItem("lembrarLogin", "true");
        } else {
            localStorage.removeItem("lembrarLogin");
        }

        document.getElementById("telaLogin").style.display = "none";
        document.getElementById("centralLouvor").style.display = "block";

    } else {

        alert("❌ Usuário ou senha incorretos.");

    }

});

if (localStorage.getItem("lembrarLogin") === "true") {

    document.getElementById("telaLogin").style.display = "none";
    document.getElementById("centralLouvor").style.display = "block";

}
document.getElementById("menuInicio").addEventListener("click", function() {

    document.querySelector(".pesquisa").style.display = "block";
    document.querySelector(".cadastro").style.display = "block";

    document.getElementById("telaLouvores").style.display = "block";

    mostrarLouvores(louvores);

});

document.getElementById("menuLouvores").addEventListener("click", function() {

    document.querySelector(".pesquisa").style.display = "none";
    document.querySelector(".cadastro").style.display = "none";

    const telaLouvores = document.getElementById("telaLouvores");

    telaLouvores.style.display = "none";

    setTimeout(function() {

        telaLouvores.style.display = "block";

        mostrarLouvores(louvores);

    }, 50);

});


document.getElementById("menuPeguei").addEventListener("click", function() {

    const resultado = louvores.filter(function(louvor) {
        return louvor.status === "ja-peguei";
    });

    mostrarLouvores(resultado);
});

document.getElementById("menuAindaVouPegar").addEventListener("click", function() {

    const resultado = louvores.filter(function(louvor) {
        return louvor.status === "ainda-vou-pegar";
    });

    mostrarLouvores(resultado);
});

document.getElementById("menuFavoritos").addEventListener("click", function() {

    const resultado = louvores.filter(function(louvor) {
        return louvor.favorito === true;
    });

    mostrarLouvores(resultado);
});

const menuPesquisar = document.getElementById("menuPesquisar");
const telaPesquisa = document.getElementById("telaPesquisa");
const centralLouvor = document.getElementById("centralLouvor");
const btnVoltarPesquisa = document.getElementById("btnVoltarPesquisa");

menuPesquisar.addEventListener("click", function() {

    centralLouvor.style.display = "none";
    telaPesquisa.style.display = "flex";

});

btnVoltarPesquisa.addEventListener("click", function() {

    telaPesquisa.style.display = "none";
    centralLouvor.style.display = "block";

});
document.getElementById("btnPesquisarMenu").addEventListener("click", function() {

    const texto = document.getElementById("campoPesquisaMenu").value.toLowerCase();

    const resultados = louvores.filter(function(louvor) {

        return (
            louvor.nome.toLowerCase().includes(texto) ||
            louvor.artista.toLowerCase().includes(texto) ||
            louvor.cantor.toLowerCase().includes(texto)
        );

    });

    const resultadoPesquisa = document.getElementById("resultadoPesquisa");

    resultadoPesquisa.innerHTML = "";

    resultados.forEach(function(louvor) {

        resultadoPesquisa.innerHTML += `
            <div class="card-louvor">
                <h3>🎵 ${louvor.nome}</h3>
                <p>Artista: ${louvor.artista}</p>
                <p>🎤 Cantor: ${louvor.cantor}</p>
                <p>🎼 Tom: ${louvor.tom}</p>
            </div>
        `;

    });

    if (resultados.length === 0) {
        resultadoPesquisa.innerHTML = "<p>Nenhum louvor encontrado.</p>";
    }

});

const btnMenu = document.getElementById("btnMenu");
const menuLateral = document.getElementById("menuLateral");
const areaMenu = document.getElementById("areaMenu");
btnMenu.addEventListener("click", function() {

    if (menuLateral.style.left === "0px") {

        menuLateral.style.left = "-280px";

    } else {

        menuLateral.style.left = "0px";

    }

});
areaMenu.addEventListener("mouseenter", function() {
    menuLateral.style.left = "0px";
});
menuLateral.addEventListener("mouseleave", function() {
    menuLateral.style.left = "-280px";
});

document.getElementById("menuSair").addEventListener("click", function() {

    localStorage.removeItem("lembrarLogin");

    document.getElementById("centralLouvor").style.display = "none";
    document.getElementById("telaLogin").style.display = "flex";

});