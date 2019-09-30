# Makefile
# Sistemas Operativos, DEI/IST/ULisboa 2017-18

heatSim: main.o matrix2d.o mplib3.o leQueue.o 
	gcc -lpthread -pthread -o heatSim main.o matrix2d.o mplib3.o leQueue.o

main.o: main.c matrix2d.h leQueue.h mplib3.h
	gcc -g -c main.c

matrix2d.o: matrix2d.c matrix2d.h
	gcc -g -c matrix2d.c

mplib3.o: mplib3.c mplib3.h
	gcc -g -c mplib3.c

leQueue.o: leQueue.c leQueue.h
	gcc -g -c leQueue.c

