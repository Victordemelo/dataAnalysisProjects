# BigData App | Analytics Dashboard 📊

Um sistema de Gestão de Conhecimento e Análise de Dados desenvolvido para monitorar o engajamento e o desempenho de alunos. O painel oferece métricas em tempo real, gráficos interativos e relatórios dinâmicos sem a necessidade de recarregamento da página (comportamento de SPA).

## 🚀 Funcionalidades

* **Painel de Visão Geral (Dashboard):**
  * Cards com métricas consolidadas (Total de Alunos, Nota Média Geral, Tempo Médio de Uso e Total de Acessos).
  * 4 Gráficos Interativos gerados dinamicamente:
    * Distribuição por Curso (Gráfico de Rosca).
    * Uso de Dispositivos (Gráfico de Barras).
    * Tempo Médio de Uso por Curso (Gráfico de Área/Ondulação).
    * Níveis de Engajamento (Gráfico de Pizza).
* **Relatórios Dinâmicos (AJAX + Modal):**
  * Consulta detalhada de dados de Alunos, Cursos e Tempo de Uso.
  * Os dados são consumidos via API interna (JSON) e renderizados em uma janela modal sobreposta ao dashboard principal, garantindo uma navegação rápida e fluida.

## 🛠️ Tecnologias Utilizadas

* **Backend:** Python e Django.
* **Análise e Tratamento de Dados:** Pandas e NumPy (processamento de arquivos CSV).
* **Visualização de Dados:** Plotly Express (geração dos gráficos HTML).
* **Frontend:** HTML5, CSS3 e Vanilla JavaScript (Fetch API para requisições assíncronas).
* **Infraestrutura:** Docker (Containerização do ambiente de desenvolvimento).

## 🐳 Como executar o projeto

Certifique-se de ter o Docker instalado na sua máquina.

**1. Construir a imagem Docker:**
No terminal, dentro da pasta raiz do projeto (onde está o `Dockerfile`), execute:

```bash
docker build -t faculdade_dashboard .
```

**2. Executar o container e iniciar o servidor:**
Para rodar a aplicação mapeando a porta e ativando o volume (para que as alterações no código reflitam em tempo real sem precisar de um novo build), execute:

```bash
docker run --rm -p 8000:8000 -v "$PWD:/app" faculdade_dashboard
```

**3. Acessar a aplicação:**
Abra o seu navegador e acesse: [http://localhost:8000/](http://localhost:8000/)

## 📂 Estrutura de Dados
O sistema consome os dados a partir de uma base tratada em formato CSV (`Base_Tratada.csv`), extraindo informações como:
* Perfil do aluno (Idade, Região, Curso).
* Métricas acadêmicas (Nota Média, Classificação de Desempenho e Engajamento).
* Comportamento de acesso (Dispositivo, Tempo de Uso em minutos, Acessos por semana e Data).
