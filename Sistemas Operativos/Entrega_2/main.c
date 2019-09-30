/*
// Projeto SO - exercicio 1, version 03
// Sistemas Operativos, DEI/IST/ULisboa 2017-18
*/

#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>
#include <pthread.h>

#include "matrix2d.h"
#include "leQueue.h"
#include "mplib3.h"

typedef struct{
  int id;
  int n;
  int trab;
  int iteracoes;
}tarefas_t;


/*--------------------------------------------------------------------
| Function: iniciarComunicacao
|           Chamada pelas threads escravas e executa a troca de mensagens
|           e todas as iteracoes necessarias para o calculo da temperatura
---------------------------------------------------------------------*/


void *iniciarComunicacao(void *ptr){

  DoubleMatrix2D *fatia, *f_aux, *m, *aux, *tmp;
  tarefas_t *arg = (tarefas_t *) ptr;

  int i, j, iter;
  double value;
  int k = (arg->n)/(arg->trab);

  fatia = dm2dNew(k+2, arg->n+2);
  f_aux = dm2dNew(k+2, arg->n+2);
  if(fatia == NULL || f_aux == NULL){
    fprintf(stderr, "\nErro: Nao foi possivel alocar memoria para as matrizes.\n\n");
    exit(1);
  }

   for (i=0; i<k+2; i++) {
     receberMensagem(0, arg->id, dm2dGetLine(fatia, i), sizeof(double)*(arg->n+2));
   }

  dm2dCopy(f_aux, fatia);
  m = fatia;
  aux = f_aux;

  for (iter = 0; iter < arg->iteracoes; iter++) {
    for (i = 1; i < k+1; i++)
      for (j = 1; j < arg->n+1; j++) {
        value = ( dm2dGetEntry(m, i-1, j) + dm2dGetEntry(m, i+1, j) +
        dm2dGetEntry(m, i, j-1) + dm2dGetEntry(m, i, j+1) ) / 4.0;
        dm2dSetEntry(aux, i, j, value);
      }

    tmp = aux;
    aux = m;
    m = tmp;

    if(arg->id % 2 == 0){
      if(arg->id > 1){
        enviarMensagem(arg->id, arg->id-1, dm2dGetLine(m, 1), sizeof(double)*(arg->n+2));
        receberMensagem(arg->id-1, arg->id, dm2dGetLine(m, 0), sizeof(double)*(arg->n+2));
      }
      if(arg->id < arg->trab){
        enviarMensagem(arg->id, arg->id+1, dm2dGetLine(m, k), sizeof(double)*(arg->n+2));
        receberMensagem(arg->id+1, arg->id, dm2dGetLine(m, k+1), sizeof(double)*(arg->n+2));
      }
    }
    
    else{
      if(arg->id > 1){
        receberMensagem(arg->id-1, arg->id, dm2dGetLine(m, 0), sizeof(double)*(arg->n+2));
        enviarMensagem(arg->id, arg->id-1, dm2dGetLine(m, 1), sizeof(double)*(arg->n+2));
      }
      if(arg->id < arg->trab){
        receberMensagem(arg->id+1, arg->id, dm2dGetLine(m, k+1), sizeof(double)*(arg->n+2));
        enviarMensagem(arg->id, arg->id+1, dm2dGetLine(m, k), sizeof(double)*(arg->n+2));
      } 
    }
  }

  fatia = m;

  for(j=0; j<k+2; j++){
    enviarMensagem(0, arg->id, dm2dGetLine(fatia, j), sizeof(double)*(arg->n+2));
  }

  dm2dFree(fatia);
  dm2dFree(f_aux);

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

  if(argc != 9) {
    fprintf(stderr, "\nNumero invalido de argumentos.\n");
    fprintf(stderr, "Uso: heatSim N tEsq tSup tDir tInf iteracoes trab csz\n\n");
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

  DoubleMatrix2D *matrix;
  tarefas_t *args = (tarefas_t*)malloc(N*sizeof(tarefas_t));

  fprintf(stderr, "\nArgumentos:\n"
  " N=%d tEsq=%.1f tSup=%.1f tDir=%.1f tInf=%.1f iteracoes=%d trab=%d csz=%d\n",
  N, tEsq, tSup, tDir, tInf, iter, trab, csz);

  if(N < 1 || tEsq < 0 || tSup < 0 || tDir < 0 || tInf < 0 || iter < 1 || trab < 0 || csz < 0) {
    fprintf(stderr, "\nErro: Argumentos invalidos.\n"
  " Lembrar que N >= 1, temperaturas >= 0 e iteracoes >= 1\n\n");
    return 1;
  }

  matrix = dm2dNew(N+2, N+2);
  if (matrix == NULL) {
    fprintf(stderr, "\nErro: Nao foi possivel alocar memoria para as matrizes.\n\n");
    return -1;
  }
  
  int i, j, count;
  pthread_t tid[trab];

  for(i=0; i<N+2; i++)
    dm2dSetLineTo(matrix, i, 0);

  dm2dSetLineTo (matrix, 0, tSup);
  dm2dSetLineTo (matrix, N+1, tInf);
  dm2dSetColumnTo (matrix, 0, tEsq);
  dm2dSetColumnTo (matrix, N+1, tDir);

  if (inicializarMPlib(csz, trab + 1) == -1) {
    printf("Erro ao inicializar MPLib.\n"); 
    return 1;
  }

  for(i=0; i<trab; i++){
    args[i].id = i+1;
    args[i].n = N;
    args[i].trab = trab;
    args[i].iteracoes = iter;
    if(pthread_create(&tid[i], NULL, iniciarComunicacao, &args[i]) != 0){
      perror("Erro na criacao da tarefa");
    }
  }

  count = 0;
  for (i=0; i<args->trab; i++) {
    for(j=0; j<(args->n/args->trab)+2; j++){
      enviarMensagem(0, args[i].id, dm2dGetLine(matrix, j + count), sizeof(double)*(N+2));
    }
    count += (args->n/args->trab);
  }

  count = 0;
  for (i=0; i<args->trab; i++) {
    for(j=0; j<(args->n/args->trab)+2; j++){
      receberMensagem(0, args[i].id, dm2dGetLine(matrix, j + count), sizeof(double)*(N+2));
    }
    count += (args->n/args->trab);
  }

  for(i=0; i<trab; i++){
    if(pthread_join(tid[i], NULL) != 0) {
    }
  }

  libertarMPlib();

  dm2dPrint(matrix);

  dm2dFree(matrix);

  return 0;
}
