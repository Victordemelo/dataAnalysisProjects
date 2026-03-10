const modal = document.getElementById("janela_modal");
const fechar = document.querySelector(".fechar-modal");

const tituloModal = document.getElementById("titulo_modal");
const cabecalhoTabela = document.getElementById("cabecalho_tabela_modal");
const corpoTabela = document.getElementById("corpo_tabela_modal");

const areaFiltros = document.getElementById("area_filtros");

const linksMenu = document.querySelectorAll(".nav-links a");

let relatorioAtual = null;



const filtrosRelatorios = {

    alunos: `
<select id="filtro_curso">
<option value="">Curso</option>
<option value="Engenharia">Engenharia</option>
<option value="Computação">Computação</option>
<option value="Sistemas">Sistemas</option>
</select>

<select id="filtro_regiao">
<option value="">Região</option>
<option value="Sul">Sul</option>
<option value="Sudeste">Sudeste</option>
<option value="Nordeste">Nordeste</option>
<option value="Norte">Norte</option>
</select>

<button id="btn_filtrar">Filtrar</button>
`,

    cursos: `
<select id="campo_ordenacao">
<option value="Nota_media">Nota média</option>
<option value="Classificação de Desempenho">Desempenho</option>
<option value="Classificação de Engajamento">Engajamento</option>
</select>

<select id="tipo_ordenacao">
<option value="asc">Crescente</option>
<option value="desc">Decrescente</option>
</select>

<button id="btn_filtrar">Filtrar</button>
`,

    tempo: `
<select id="filtro_dispositivo">
<option value="">Dispositivo</option>
<option value="Desktop">Desktop</option>
<option value="Android">Android</option>
<option value="iOS">iOS</option>
</select>

<select id="campo_ordenacao">
<option value="Tempo_uso_min">Tempo</option>
<option value="Acessos_semana">Acessos</option>
</select>

<select id="tipo_ordenacao">
<option value="asc">Crescente</option>
<option value="desc">Decrescente</option>
</select>

<button id="btn_filtrar">Filtrar</button>
`
};



function renderizarFiltros() {

    areaFiltros.innerHTML = filtrosRelatorios[relatorioAtual];

    const btn = document.getElementById("btn_filtrar");

    if (btn) {
        btn.addEventListener("click", carregarDados);
    }

}



function pegarFiltros() {

    return {
        curso: document.getElementById("filtro_curso")?.value || "",
        regiao: document.getElementById("filtro_regiao")?.value || "",
        dispositivo: document.getElementById("filtro_dispositivo")?.value || "",
        ordenar: document.getElementById("campo_ordenacao")?.value || "",
        ordem: document.getElementById("tipo_ordenacao")?.value || ""
    };

}



function montarURL() {

    const f = pegarFiltros();

    return `/api/dados/?curso=${f.curso}&regiao=${f.regiao}&dispositivo=${f.dispositivo}&ordenar=${f.ordenar}&ordem=${f.ordem}`;

}



function mostrarCarregando() {

    tituloModal.innerText = "Carregando dados...";
    cabecalhoTabela.innerHTML = "";
    corpoTabela.innerHTML = `<tr><td>Aguarde...</td></tr>`;

}



function mostrarErro() {

    tituloModal.innerText = "Erro";
    corpoTabela.innerHTML = `<tr><td>Erro ao carregar dados</td></tr>`;

}



function montarTabelaAlunos(dados) {

    tituloModal.innerText = "Relatório de Alunos";

    cabecalhoTabela.innerHTML = `
<tr>
<th>ID</th>
<th>Idade</th>
<th>Curso</th>
<th>Região</th>
</tr>
`;

    corpoTabela.innerHTML = "";

    dados.forEach(a => {

        corpoTabela.innerHTML += `
<tr>
<td>${a.ID}</td>
<td>${a.Idade || "-"}</td>
<td>${a.Curso}</td>
<td>${a.Regiao}</td>
</tr>
`;

    });

}



function montarTabelaCursos(dados) {

    tituloModal.innerText = "Relatório de Cursos";

    cabecalhoTabela.innerHTML = `
<tr>
<th>ID</th>
<th>Média de Nota</th>
<th>Desempenho</th>
<th>Engajamento</th>
</tr>
`;

    corpoTabela.innerHTML = "";

    dados.forEach(c => {

        corpoTabela.innerHTML += `
<tr>
<td>${c.ID}</td>
<td>${c.Nota_media || "-"}</td>
<td>${c["Classificação de Desempenho"]}</td>
<td>${c["Classificação de Engajamento"]}</td>
</tr>
`;

    });

}



function montarTabelaTempo(dados) {

    tituloModal.innerText = "Relatório de Tempo de Uso";

    cabecalhoTabela.innerHTML = `
<tr>
<th>ID</th>
<th>Dispositivo</th>
<th>Tempo</th>
<th>Acessos</th>
<th>Data</th>
</tr>
`;

    corpoTabela.innerHTML = "";

    dados.forEach(t => {

        corpoTabela.innerHTML += `
<tr>
<td>${t.ID}</td>
<td>${t.Dispositivo}</td>
<td>${t.Tempo_uso_min}</td>
<td>${t.Acessos_semana}</td>
<td>${t.Data_acesso}</td>
</tr>
`;

    });

}



function carregarDados() {

    modal.style.display = "flex";

    mostrarCarregando();

    fetch(montarURL())
        .then(r => r.json())
        .then(d => {

            if (relatorioAtual === "alunos") montarTabelaAlunos(d.alunos);
            if (relatorioAtual === "cursos") montarTabelaCursos(d.cursos);
            if (relatorioAtual === "tempo") montarTabelaTempo(d.tempo);

        })
        .catch(() => mostrarErro());

}



linksMenu.forEach(link => {

    link.addEventListener("click", e => {

        const destino = link.getAttribute("href");

        if (destino === "#") return;

        e.preventDefault();

        if (destino === "#relatorio_alunos") relatorioAtual = "alunos";
        if (destino === "#relatorio_cursos") relatorioAtual = "cursos";
        if (destino === "#relatorio_tempo_uso") relatorioAtual = "tempo";

        renderizarFiltros();

        carregarDados();

    });

});



fechar.onclick = () => modal.style.display = "none";

window.onclick = e => {
    if (e.target === modal) modal.style.display = "none";
};