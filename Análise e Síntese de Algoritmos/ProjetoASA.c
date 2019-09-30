#include <stdio.h>
#include <stdlib.h>

typedef struct node* link;
typedef struct Vertex* item; 
struct Stack *head;
struct Scc *h;


struct Scc
{
	item v;
	struct Scc *next;		
};

struct Stack
{
	item u;
	struct Stack *next;
};

struct Vertex
{
	int id;
	int visited;
	item pi;
	int f;
};

struct node
{
	item _vertex;
	link next;
};

typedef struct
{
	link head;
	link tail;
} Queue;

typedef struct
{
	link* adjacenciesList;
	int verticesNumber;
	item* _vertices;
}Graph;

int time = 0;

void verify(Graph graph, int actual, int next)
{	
	int ver = 0;
	int actualizacao = 0;
	link current = graph.adjacenciesList[actual];
	while (current != NULL){
		if (current->_vertex->id != next){
			ver++;
		}
		actualizacao++;
		current = current->next;
	}
	if (ver == actualizacao){
		printf("Insuficiente\n");
		exit(EXIT_SUCCESS);
	}
}	

void insertBeg(int num)
{
	struct AdjList* temp = (struct AdjList*)malloc(sizeof(struct AdjList));

	temp->data = num;
	temp->next = head;
	head = temp;
}

void printList(Graph graph)
{
	struct AdjList* temp = head;
	while(temp != NULL){
		if (temp->next == NULL){
			break;
		}
		verify(graph, temp->data, temp->next->data);
		temp = temp->next;
	}
	temp = head;
	while(temp != NULL){
		if (temp->next == NULL){
			printf("%d\n", temp->data+1);
		}
		else{
			printf("%d ", temp->data+1);
		}
		temp = temp->next;
	}
}

void visit(Graph* graph, item u){

	time++;
	u->visited = 1;
	link current = graph->adjacenciesList[u->id];
	while(current != NULL){
		if (current->_vertex->visited == 0){
			current->_vertex->pi = u;
			visit(graph, current->_vertex);
		}
		if (current->_vertex->visited == 1){
			printf("Incoerente\n");
			exit(EXIT_SUCCESS);
		}
		current = current->next;
	}
	u->visited = 2;
	time++;
	u->f = time;
	insertBeg(u->id);
}

Graph algorithm(Graph graph){
	
	int i;
	for (i =  0; i < graph.verticesNumber; i++)
	{
		if (graph._vertices[i]->visited == 0)
		{
			visit(&graph, graph._vertices[i]);
		}
	}
	return graph;
}

item createVertex(int i)
{
	item new = (item)malloc(sizeof(struct Vertex));
	new->id = i;
	new->pi = NULL;
	new->visited = 0;
	new->f = 0;
	return new;
}


link createNode(item i)
{
	link new = (link) malloc(sizeof(struct node));
	new->_vertex = i;
	new->next = NULL;
	return new;
}


link insertLinkedList(item i, link head)
{
	link new = createNode(i);
	if (head == NULL){
		head = new;
	}
	else
	{
		new->next = head;
		head = new;
	}
	return head;
}


Graph builtGraph()
{
	int vertices, edges, vertexOne, vertexTwo, i;

	Graph graph;

	scanf("%d %d", &vertices, &edges);
	graph.adjacenciesList = (link*) malloc(sizeof(link)*vertices);
	graph.verticesNumber = vertices;
	graph._vertices = (item*) malloc(sizeof(item)*vertices);

	for (i = 0; i < vertices; i++)
	{
		graph.adjacenciesList[i] = NULL;
		graph._vertices[i] = createVertex(i);
	}

	for (i = 0; i < edges; i++)
	{
		scanf("%d %d", &vertexOne, &vertexTwo);
		graph.adjacenciesList[vertexOne-1] = insertLinkedList(graph._vertices[vertexTwo-1], graph.adjacenciesList[vertexOne-1]);
	}
	return graph;
}


int main()
{

	Graph graph = builtGraph();
	graph = algorithm(graph);
	//printList(graph);
	
	return EXIT_SUCCESS;
}

