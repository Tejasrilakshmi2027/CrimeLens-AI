export interface ChatRequest{

question:string;

}

export interface ChatResponse{

question:string;

sql:string;

answer:string;

result:unknown[];

}