export interface Book {
    id: number;
    title: string;
    author: string;
    isbn: string;
    price: number;
    availableStock: number;
}

export type Status = "idle" | "loading" | "success" | "error"