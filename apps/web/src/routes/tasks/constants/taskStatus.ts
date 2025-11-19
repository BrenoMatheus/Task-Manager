export const STATUS = ["TODO", "IN_PROGRESS", "REVIEW", "DONE"] as const;

export type StatusType = (typeof STATUS)[number];

export const STATUS_LABELS: Record<StatusType, string> = {
  TODO: "A Fazer",
  IN_PROGRESS: "Em Progresso",
  REVIEW: "Revisão",
  DONE: "Concluído",
};

export type TaskStatus = typeof STATUS[number];
