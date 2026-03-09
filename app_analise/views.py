from django.shortcuts import render
from django.http import JsonResponse
import pandas as pd
import numpy as np

def dashboard_view(request):
    return render(request, 'index.html')


def api_dados_alunos(request):

    df = pd.read_csv("Base_Tratada.csv", sep = ";", encoding='utf-8')
    df_clean = df.replace({np.nan: None})

    dados_alunos = df_clean[['ID', 'Idade', 'Curso', 'Regiao']].to_dict(orient='records')
    dados_cursos = df_clean[['ID', 'Nota_media', 'Classificação de Desempenho', 'Classificação de Engajamento']].to_dict('records')
    dados_tempo = df_clean[['ID', 'Dispositivo', 'Tempo_uso_min', 'Acessos_semana', 'Data_acesso']].to_dict('records')

    return JsonResponse({
    'alunos': dados_alunos,
    'cursos': dados_cursos,
    'tempo': dados_tempo
})