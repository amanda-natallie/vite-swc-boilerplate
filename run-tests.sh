#!/bin/bash

# Cor ANSI para azul
BLUE='\033[0;34m'
# Reseta a cor ANSI
RESET='\033[0m'

# Determina o sistema operacional
OS=$(uname -s)

# Determina o número de núcleos da CPU
# Se o sistema operacional for macOS, usa o comando sysctl para obter o número de núcleos
if [ $OS == "Darwin" ]; then
  NUM_CORES=$(sysctl -n hw.physicalcpu)
else 
  NUM_CORES=$(nproc --all)
fi

# Calcula o número de workers como o número de núcleos - 4
NUM_WORKERS=$((NUM_CORES - 4))

# Garante que o número de workers seja pelo menos 1
if [ $NUM_WORKERS -lt 1 ]; then
  NUM_WORKERS=1
fi

# Verifica se a opção -c foi fornecida (coverage)
if [[ $1 == "-c" ]]; then
  COVERAGE_FLAG="--coverage --silent -u"
  COVERAGE_MESSAGE="JEST Coverage"
else
  COVERAGE_FLAG=""
  COVERAGE_MESSAGE="ALL JEST Tests"
fi

# Verifica se o primeiro argumento contém "src" para rodar apenas um arquivo específico
if [[ $1 != "-c" && $1 == *"src"* ]]; then
  FILE_NAME=$(basename $1)
  # Executa Jest apenas para o arquivo especificado
  echo -e "${BLUE}Running a single test file: $FILE_NAME${RESET}"
  NODE_ENV=test jest --maxWorkers=1 $COVERAGE_FLAG $1
elif [[ $1 == "-w" && $2 == *"src"* ]]; then
  FILE_NAME=$(basename $2)
  # Verifica se está no modo --watch e se o último argumento contém "src" para rodar em modo watch
  echo -e "${BLUE}Watching a single test file: $FILE_NAME${RESET}"
  NODE_ENV=test jest --maxWorkers=1 --silent --watch $COVERAGE_FLAG $2
elif [[ $1 == "-w" ]]; then
  # Verifica se está no modo --watch para personalizar a mensagem
  echo -e "${BLUE}Watching $COVERAGE_MESSAGE files${RESET}"
  NODE_ENV=test jest --maxWorkers=$NUM_WORKERS $COVERAGE_FLAG --watch
else
  # Executa Jest com o número de workers ajustado e a opção -c, se fornecida
  echo -e "${BLUE}Running $COVERAGE_MESSAGE with $NUM_WORKERS CPU cores${RESET}"
  NODE_ENV=test jest --maxWorkers=$NUM_WORKERS $COVERAGE_FLAG
fi
