// Interface para representar os países
export interface Country {
    id: { M49: number, 'ISO-ALPHA-2': string, 'ISO-ALPHA-3': string },
    nome: string
}


// Interface para representar os estados
export interface State {
    id: { M49: number; 'ISO-ALPHA-2': string; 'ISO-ALPHA-3': string };
    nome: string;
    regiao: { id: { M49: number }; nome: string };
    sigla: string;
}

// Interface para representar os municípios
export interface City {
    id: { M49: number; 'ISO-ALPHA-2': string; 'ISO-ALPHA-3': string };
    nome: string;
    regiao: { id: { M49: number }; nome: string };
    sigla: string;
}

