// Selecionando os elementos do Modal
const modal = document.getElementById("janela_modal");
const spanFechar = document.querySelector(".fechar-modal");
const tituloModal = document.getElementById("titulo_modal");
const cabecalhoTabela = document.getElementById("cabecalho_tabela_modal");
const corpoTabela = document.getElementById("corpo_tabela_modal");

// 1. Fechar modal ao clicar no 'X'
spanFechar.onclick = function() {
    modal.style.display = "none";
}

// 2. Fechar modal ao clicar no fundo escuro fora da caixa branca
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// 3. Lógica dos botões do menu lateral
const linksMenu = document.querySelectorAll('.nav-links a');

linksMenu.forEach(link => {
    link.addEventListener('click', function(evento) {
        
        const destino = this.getAttribute('href');
        if(destino === "#") return; // Ignora o link do Dashboard principal

        evento.preventDefault(); 
        
        // Abre o modal e mostra que está carregando
        modal.style.display = "flex";
        tituloModal.innerText = "Carregando dados...";
        cabecalhoTabela.innerHTML = '';
        corpoTabela.innerHTML = '<tr><td style="text-align:center; padding: 20px;">Aguarde...</td></tr>';
        
        // Faz a requisição AJAX
        fetch('/api/dados/')
            .then(resposta => resposta.json()) 
            .then(dados => {
                
                corpoTabela.innerHTML = ''; // Limpa o "Aguarde..."
                
                if(destino === '#relatorio_alunos') {
                    tituloModal.innerText = "Relatório de Alunos";
                    cabecalhoTabela.innerHTML = `<tr><th>ID</th><th>Idade</th><th>Curso</th><th>Região</th></tr>`;
                    
                    dados.alunos.forEach(aluno => {
                        corpoTabela.innerHTML += `
                            <tr>
                                <td>${aluno.ID}</td>
                                <td>${aluno.Idade || '-'}</td>
                                <td>${aluno.Curso}</td>
                                <td>${aluno.Regiao}</td>
                            </tr>
                        `;
                    });
                }
                else if(destino === '#relatorio_cursos') {
                    tituloModal.innerText = "Relatório de Cursos";
                    cabecalhoTabela.innerHTML = `<tr><th>ID</th><th>Média de Nota</th><th>Desempenho</th><th>Engajamento</th></tr>`;
                    
                    dados.cursos.forEach(curso => {
                        corpoTabela.innerHTML += `
                            <tr>
                                <td>${curso.ID}</td>
                                <td>${curso.Nota_media || '-'}</td>
                                <td>${curso['Classificação de Desempenho']}</td>
                                <td>${curso['Classificação de Engajamento']}</td>
                            </tr>
                        `;
                    });
                }
                else if(destino === '#relatorio_tempo_uso') {
                    tituloModal.innerText = "Relatório de Tempo de Uso da Internet";
                    cabecalhoTabela.innerHTML = `<tr><th>ID</th><th>Dispositivo</th><th>Tempo (min)</th><th>Acessos Semana</th><th>Data de Acesso</th></tr>`;
                    
                    dados.tempo.forEach(uso => {
                        corpoTabela.innerHTML += `
                            <tr>
                                <td>${uso.ID}</td>
                                <td>${uso.Dispositivo}</td>
                                <td>${uso.Tempo_uso_min}</td>
                                <td>${uso.Acessos_semana}</td>
                                <td>${uso.Data_acesso}</td>
                            </tr>
                        `;
                    });
                }
            })
            .catch(erro => {
                console.error("Erro no AJAX:", erro);
                tituloModal.innerText = "Erro!";
                corpoTabela.innerHTML = '<tr><td style="text-align:center; color: red;">Não foi possível carregar os dados.</td></tr>';
            });
    });
});