from django.shortcuts import render
from django.http import JsonResponse
import pandas as pd
import numpy as np
import plotly.express as px

def dashboard_view(request):
    df = pd.read_csv("Base_Tratada.csv", sep=";", encoding='utf-8')

    # ==========================================
    # LÓGICA DOS CARDS
    # ==========================================
    total_alunos = len(df)
    
    # Tratando a Nota Média (O Python precisa de ponto em vez de vírgula para calcular)
    notas_limpas = pd.to_numeric(df['Nota_media'].astype(str).str.replace(',', '.'), errors='coerce')
    nota_media = round(notas_limpas.mean(), 1)
    
    tempo_medio = round(df['Tempo_uso_min'].mean())
    total_acessos = df['Acessos_semana'].sum()

    # ==========================================
    # LÓGICA DOS GRÁFICOS (PLOTLY)
    # ==========================================
    
    # Gráfico 1: Rosca (Distribuição de Alunos por Curso)
    fig_cursos = px.pie(df, names='Curso', title='Distribuição por Curso', hole=0.4)
    grafico_cursos = fig_cursos.to_html(full_html=False, config={'displayModeBar': False})

    # Gráfico 2: Barras (Acessos por Dispositivo)
    contagem_disp = df['Dispositivo'].value_counts().reset_index()
    contagem_disp.columns = ['Dispositivo', 'Quantidade']
    fig_disp = px.bar(contagem_disp, x='Dispositivo', y='Quantidade', title='Uso de Dispositivos', color='Dispositivo')
    grafico_disp = fig_disp.to_html(full_html=False, config={'displayModeBar': False})

    # Gráfico 3: Ondulação/Área (Tempo de Uso por Curso)
    tempo_curso = df.groupby('Curso')['Tempo_uso_min'].mean().reset_index()
    fig_tempo = px.area(tempo_curso, x='Curso', y='Tempo_uso_min', title='Tempo Médio de Uso (min) por Curso', markers=True)
    grafico_tempo = fig_tempo.to_html(full_html=False, config={'displayModeBar': False})

    # Gráfico 4: Pizza Clássica (Níveis de Engajamento)
    fig_engajamento = px.pie(df, names='Classificação de Engajamento', title='Engajamento dos Alunos')
    grafico_engajamento = fig_engajamento.to_html(full_html=False, config={'displayModeBar': False})

    # ==========================================
    # ENVIAR TUDO PARA O HTML
    # ==========================================
    context = {
        'total_alunos': total_alunos,
        'nota_media': str(nota_media).replace('.', ','), # Volta a vírgula para o HTML
        'tempo_medio': tempo_medio,
        'total_acessos': total_acessos,
        
        'grafico_cursos': grafico_cursos,
        'grafico_disp': grafico_disp,
        'grafico_tempo': grafico_tempo,
        'grafico_engajamento': grafico_engajamento,
    }

    return render(request, 'index.html', context)

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