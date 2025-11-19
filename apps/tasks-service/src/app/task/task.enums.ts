// src/task/task.enums.ts

export enum TaskPriority {
  LOW = 'LOW', //Baixo
  MEDIUM = 'MEDIUM', //Medio
  HIGH = 'HIGH', //Alto
  URGENT = 'URGENT', //Urgente
}

export enum TaskStatus {
  TODO = 'TODO', // A fazer
  IN_PROGRESS = 'IN_PROGRESS', // Em progresso
  REVIEW = 'REVIEW', // Em revisão
  DONE = 'DONE', // Concluída
}