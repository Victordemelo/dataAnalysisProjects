#Instalação do Python 3.8 para rodar no docker
FROM  python:3.11-slim

#Define a pasta dentro do container onde o código vai ser copiado
WORKDIR  /app

#Copia o arquivo de dependências para dentro do container
COPY requirements.txt /app/

#Instala as dependências do projeto
RUN pip install  -r requirements.txt

#Copia o código do projeto para dentro do container
COPY . /app/

EXPOSE 8000

#Comando para rodar o servidor do Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
