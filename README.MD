# Apresentação do projeto

## Comando para construir a imagem
* docker build -t faculdade_dashboard .

## Comando para executar o container na porta http://localhost:8000/ e sempre atualizar com os arquivos.
docker run --rm -p 8000:8000 -v "$PWD:/app" faculdade_dashboard
