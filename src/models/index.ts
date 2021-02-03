export interface QuestionAnswer {
  question: string;
  answer: string;
  marked?: boolean;
}

export interface QuestionCategory {
  title: string;
  200: QuestionAnswer;
  400: QuestionAnswer;
  800: QuestionAnswer;
  1000: QuestionAnswer;
}

export interface Player {
  name: string;
  imageUrl: string;
  points: number;
}
