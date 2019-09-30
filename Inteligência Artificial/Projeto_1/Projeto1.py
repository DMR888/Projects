from copy import deepcopy
from utils import *
from search import *

#--------------------------------------------------------------- Tipos ---------------------------------------------------------------
#---------------------------------------------------------------  Cor  ---------------------------------------------------------------
# o tipo cor e representado por um numero que se for 0 significa "sem cor"

def get_no_color():
	return 0

def no_color(c):
	return c == 0

def color(c):
	return c > 0

def comp_color(c1, c2):
	return c1 == c2

#--------------------------------------------------------------- Posicao --------------------------------------------------------------
# Uma posicao corresponde a um Tuplo (linha, coluna)
# cria o tuplo com a linha l e a coluna c
def  make_pos(l, c):
	return (l, c)

# devolve a linha daquela posicao
def pos_l(pos):
	return pos[0]

# devolve a coluna daquela posicao
def pos_c(pos):
	return pos[1]


def adjacents_same_color(pos, board):
	n, m = board_dimensions(board) # dimensoes do tabuleiro
	# geracao dos possiveis adjacentes
	adjacentes = [make_pos(pos_l(pos) +1, pos_c(pos)), make_pos(pos_l(pos)-1, pos_c(pos)),\
	              make_pos(pos_l(pos), pos_c(pos)+1), make_pos(pos_l(pos), pos_c(pos)-1)]
	res = []
	# depois de criadas as possibilidades e necessario filtrar posicoes incoerentes e remover as entradas correspondentes a outras cores
	for p in adjacentes:
		if not (pos_l(p) < 0 or pos_c(p) < 0 or pos_l(p) >= n or pos_c(p) >= m) \
				and board[pos_l(p)][pos_c(p)] == board[pos_l(pos)][pos_c(pos)]:
			res.append(p)
	return res


#---------------------------------------------------------------  Group  ---------------------------------------------------------------
# Group e uma lista de posicoes adjacentes e com a mesma cor.

# Esta funcao recebe diversas posicoes e cria uma lista com elas. ex: make_group((0,0), (0,1), (2,1)) devolve [(0,0), (0,1), (2,1)]
def make_group(*args):
	group = []
	for arg in args:
		group.append(arg)
	return group

# Esta funcao encontra o grupo a que uma dada posicao pertence. Recebe uma lista de grupos e devolve o grupo onde a posicao se insere
#	ou None caso a posicao nao tenha grupo ainda.
def find_group(groups, pos):

	# Funcao auxiliar que verifica se uma posicao esta num dado grupo
	def in_group(group, pos):
		return pos in group

	for group in groups:
		if in_group(group, pos):
			return group
	return None

#---------------------------------------------------------------  Board  ---------------------------------------------------------------
# matriz (com listas) onde cada entrada tem uma Color

# Cria um tuplo com as dimensoes do tabuleiro.
def board_dimensions(board):
	return (len(board), len(board[0]))

# Esta funcao conta quantas entradas sem peca (ou seja cor == 0) existem.
def board_empty_entries(board):
	n, m = board_dimensions(board)
	count = 0
	for i in range(0, n):
		for j in range(0, m):
			if board[i][j] == 0:
				count +=1
	return count


# Esta funcao recebe um tabuleiro e vai criar grupos de pecas da mesma cor que sejam adjacentes entre si.
def board_find_groups(board):
	groups = []
	n, m = board_dimensions(board)

	for i in range(0, n):
		for j in range(0, m):
			pos = make_pos(i, j) # criacao da posicao correspondente ao i e j
			# saltar caso entrada seja 0 pois nao e necessario criar grupo
			if board[i][j] == 0:
				continue
			#verificar se essa posicao ja esta inserida num grupo
			if find_group(groups, pos) == None: 
				# se essa posicao nao pertence a grupo nenhum vamos buscar as posicoes adjacentes da mesma cor
				adjs = adjacents_same_color(pos, board)
				assigned = False # variavel que nos diz se ja colocamos a pos num grupo
				# vamos querer verificar se as posicoes adjacentes ja tem grupo. 
				# Se ja tiverem vamos colocar a pos(i,j) nesse grupo
				for adj in adjs:
					adj_group = find_group(groups, adj)
					if adj_group != None and not assigned:
						adj_group.append(pos)
						assigned = True
					# as vezes as posicoes adjacentes pertencem a grupos diferentes. Neste caso precisamos de unir os grupos
					# Notesse que caso isto aconteca entao a pos ja foi atribuida ao primeiro grupo que for encontrado.
					elif adj_group != None and assigned:
						group_assigned = find_group(groups, pos)
						if adj_group !=  group_assigned:
							groups.remove(group_assigned) # remover o grupo assigned aquela posicao
							groups.remove(adj_group)      # remover o grupo da posicao adjacente
							groups.append(list(set().union(group_assigned, adj_group))) # adicionar um supergrupo aos groups

				# caso os adjacentes tbm se encontrassem sem grupo
				if assigned == False:
					# vamos fazer so um grupo com a pos e depois quando chegarmos as casas adjacentes essas sao colocadas no grupo.
					groups.append(make_group(pos)) 
	return groups

# Esta funcao recebe um tabuleiro e um grupo e remove esse grupo do tabuleiro.
def board_remove_group(old_board, group):
	# creates a copy of the board
	board = deepcopy(old_board)
	n, m = board_dimensions(board)

	# ciclo para remover o grupo
	for p in group:
		board[pos_l(p)][pos_c(p)] = 0

	# ciclo para fazer as pecas "cair".
	empty_collumns = []
	for j in range(0, m):
		spaces = 0 # conta o numero de espacos visto
		for i in range(0, n):
			# vamos percorrer as linhas ao contrario (baixo para cima)
			if board[n-1-i][j] == 0:
				spaces += 1
			# dado que estamos a percorrer ao contrario se encontrarmos uma entrada com cor e o contador de espacos for > 0 entao
			# temos um buraco e precisamos de trocar essa entrada com o buraco em baixo.
			if board[n-1-i][j] > 0 and spaces > 0:
				board[n-1-i+spaces][j] = board[n-1-i][j]
				board[n-1-i][j] = 0

	# ciclo para remover as colunas que estejam vazia
	# este ciclo vai percorrer as linha normalmente mas as colunas ao contrario.
	for j in range(1, m+1):
		# assume sempre que a coluna esta vazia
		empty_collumn = True
		for i in range(0, n):
			# caso encontre uma casa ocupada passa logo a proxima coluna
			if board[i][m-j] != 0:
				empty_collumn = False
				break
		# no final do ciclo anterior se a variavel empty collumn continuar a true entao e pq a coluna esta efetivamente vazia
		if empty_collumn:
			# vamos percorrer todas as linhas
			for i in range(0, n):
				# e em todas as linhas puxar a entrada a direita mais para a esquerda
				for k in range(0, j-1):
					board[i][m-j+k] = board[i][m-j+k+1]

				# nao esquecer de colocar a entrada mais a direita a zero no final
				board[i][m-1] = 0
	return board

#---------------------------------------------------------------  SG_state ------------------------------------------------------------
# Estado do jogo Same Game... Consiste apenas num tabuleiro.
class sg_state:

	def __init__(self, board):
		self.board = board

	def __lt__(self, other_state):
		# utilizado apenas para a ordenacao da lista de abertos.... nao tem necessariamente haver com a heuristica.
		# um board e menor que o outro se tiver menos casas preenchidas
		return board_empty_entries(self.board) < board_empty_entries(other_state.board)

	# Um estado e objectivo se todas as suas entradas estiverem a 0 (sem pecas).
	def goal_state(self):
		board = self.board
		n, m = board_dimensions(board)
		for i in range(0, n):
			for j in range(0, m):
				if board[i][j] != 0: # assim que encontra a primeira entrada com cor retorna False 
					return False
		return True

#---------------------------------------------------------------  same_game ------------------------------------------------------------
class same_game(Problem):

	# Recebe um tabuleiro inicial e cria um estado inicial com ele
	def __init__(self, board):
		self.initial = sg_state(board)

	# retorna o conjunto de accoes possivies para aquele estado
	def actions(self, state):
		groups = board_find_groups(state.board)
		res = []
		for group in groups:
			if len(group) >= 2:
				res.append(group)
		return res

	# retorna o estado que resulta de aplicar uma accao ao estado "actual"
	def result(self, state, action):
		return sg_state(board_remove_group(state.board, action))

	# verifica que o estado e final ou nao.
	def goal_test(self, state):
		return state.goal_state()

	# heuristica usada para A*
	def h(self, node):
		return len(board_find_groups(node.state.board))

#---------------------------------------------------------------  search ------------------------------------------------------------
# Greedy search e a unica que nao existe na biblioteca search mas consiste num best_first_tree_search com uma funcao f(x) greedy.
# a funcao consiste no numero de entradas sem peca
def greedy_search(problem):
	return best_first_graph_search(problem,  lambda node: board_empty_entries(node.state.board)*-1)