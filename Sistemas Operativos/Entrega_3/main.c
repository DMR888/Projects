/*
// Projeto SO - exercicio 1, version 03
// Sistemas Operativos, DEI/IST/ULisboa 2017-18
*/

#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <pthread.h>
#include <math.h>

#include "matrix2d.h"

typedef struct{
  int id;
  int n;
  int trab;
  int iteracoes;
  int inicio;
  int fim;
  double maxD;
}tarefas_t;



DoubleMatrix2D *matrix, *matrix_aux;

int count[2];
pthread_mutex_t mutex;
pthread_cond_t wait_for_all;


void *iniciarComunicacao(void *ptr){

  tarefas_t *arg = (tarefas_t *) ptr;

  DoubleMatrix2D *m, *aux, *tmp;
  int iter, i, j, check;
  double value;

  m = matrix;
  aux = matrix_aux;

  for (iter = 0; iter < arg->iteracoes; iter++) {
    check = 0;
    for (i = arg->inicio+1; i < arg->fim+1; i++)
      for (j = 1; j < arg->n + 1; j++) {
        value = ( dm2dGetEntry(m, i-1, j) + dm2dGetEntry(m, i+1, j) +
        dm2dGetEntry(m, i, j-1) + dm2dGetEntry(m, i, j+1) ) / 4.0;
        dm2dSetEntry(aux, i, j, value);
      }

    tmp = aux;
    aux = m;
    m = tmp;

    if(pthread_mutex_lock(&mutex) != 0) {
      fprintf(stderr, "\nErro ao bloquear mutex\n");
      exit(EXIT_FAILURE);
    }

    count[iter%2]++;
    if(count[iter%2] == arg->trab){
      count[(iter+1)%2] = 0;
      if(pthread_cond_broadcast(&wait_for_all) != 0){
        fprintf(stderr, "\nErro ao assinalar a variável de condição\n");
        exit(EXIT_FAILURE);
      }
    }

    else{
      while(count[iter%2] != arg->trab){
        if(pthread_cond_wait(&wait_for_all, &mutex) != 0) {
            fprintf(stderr, "\nErro ao esperar pela variável de condição\n");
            exit(EXIT_FAILURE);
        }
      }
    }


    if(pthread_mutex_unlock(&mutex) != 0) {
      fprintf(stderr, "\nErro ao desbloquear mutex\n");
      exit(EXIT_FAILURE);
    }
  }

  matrix = m;

  return NULL;
}

/*--------------------------------------------------------------------
| Function: parse_integer_or_exit
---------------------------------------------------------------------*/

int parse_integer_or_exit(char const *str, char const *name)
{
  int value;
 
  if(sscanf(str, "%d", &value) != 1) {
    fprintf(stderr, "\nErro no argumento \"%s\".\n\n", name);
    exit(1);
  }
  return value;
}

/*--------------------------------------------------------------------
| Function: parse_double_or_exit
---------------------------------------------------------------------*/

double parse_double_or_exit(char const *str, char const *name)
{
  double value;

  if(sscanf(str, "%lf", &value) != 1) {
    fprintf(stderr, "\nErro no argumento \"%s\".\n\n", name);
    exit(1);
  }
  return value;
}


/*--------------------------------------------------------------------
| Function: main
---------------------------------------------------------------------*/

int main (int argc, char** argv) {

  if(argc != 10) {
    fprintf(stderr, "\nNumero invalido de argumentos.\n");
    fprintf(stderr, "Uso: heatSim N tEsq tSup tDir tInf iteracoes trab csz maxD\n\n");
    return 1;
  }
  /* argv[0] = program name */
  int N = parse_integer_or_exit(argv[1], "N");
  double tEsq = parse_double_or_exit(argv[2], "tEsq");
  double tSup = parse_double_or_exit(argv[3], "tSup");
  double tDir = parse_double_or_exit(argv[4], "tDir");
  double tInf = parse_double_or_exit(argv[5], "tInf");
  int iter = parse_integer_or_exit(argv[6], "iteracoes");
  int trab = parse_integer_or_exit(argv[7], "trab");
  int csz = parse_integer_or_exit(argv[8], "csz");
  double maxD = parse_double_or_exit(argv[9], "maxD");

  tarefas_t *args = (tarefas_t*)malloc(N*sizeof(tarefas_t));
  pthread_t tid[trab];

  count[0] = 0;
  count[1] = 0;


  if(pthread_mutex_init(&mutex, NULL) != 0) {
    fprintf(stderr, "\nErro ao inicializar mutex\n");
    return -1;
  }

  if(pthread_cond_init(&wait_for_all, NULL) != 0) {
    fprintf(stderr, "\nErro ao inicializar variável de condição\n");
    return -1;
  }

  fprintf(stderr, "\nArgumentos:\n"
  " N=%d tEsq=%.1f tSup=%.1f tDir=%.1f tInf=%.1f iteracoes=%d trab=%d csz=%d maxD=%.1f\n",
  N, tEsq, tSup, tDir, tInf, iter, trab, csz, maxD);

  if(N < 1 || tEsq < 0 || tSup < 0 || tDir < 0 || tInf < 0 || iter < 1 || trab < 0 || csz < 0 || maxD < 0) {
    fprintf(stderr, "\nErro: Argumentos invalidos.\n"
  " Lembrar que N >= 1, temperaturas >= 0 e iteracoes >= 1\n\n");
    return 1;
  }

  matrix = dm2dNew(N+2, N+2);
  matrix_aux = dm2dNew(N+2, N+2);
  if (matrix == NULL) {
    fprintf(stderr, "\nErro: Nao foi possivel alocar memoria para as matrizes.\n\n");
    return -1;
  }
  if (matrix_aux == NULL) {
    fprintf(stderr, "\nErro: Nao foi possivel alocar memoria para as matrizes.\n\n");
    return -1;
  }
  
  int i;

  for(i=0; i<N+2; i++)
    dm2dSetLineTo(matrix, i, 0);

  dm2dSetLineTo (matrix, 0, tSup);
  dm2dSetLineTo (matrix, N+1, tInf);
  dm2dSetColumnTo (matrix, 0, tEsq);
  dm2dSetColumnTo (matrix, N+1, tDir);


  dm2dCopy(matrix_aux, matrix);

  for(i=0; i<trab; i++){
    args[i].id = i+1;
    args[i].n = N;
    args[i].trab = trab;
    args[i].iteracoes = iter;
    args[i].inicio = (i)*(N/trab);
    args[i].fim = (i+1)*(N/trab);
    args[i].maxD = maxD;
    if(pthread_create(&tid[i], NULL, iniciarComunicacao, &args[i]) != 0){
      perror("Erro na criacao da tarefa");
    }
  }

  for(i=0; i<trab; i++){
    if(pthread_join(tid[i], NULL) != 0) {
    }
  }


  dm2dPrint(matrix);


  free(args);
  dm2dFree(matrix);
  dm2dFree(matrix_aux);

  if(pthread_mutex_destroy(&mutex) != 0) {
    fprintf(stderr, "\nErro ao destruir mutex\n");
    exit(EXIT_FAILURE);
  }
  if(pthread_cond_destroy(&wait_for_all) != 0) {
    fprintf(stderr, "\nErro ao destruir variável de condição\n");
    exit(EXIT_FAILURE);
  }

  return 0;
}
