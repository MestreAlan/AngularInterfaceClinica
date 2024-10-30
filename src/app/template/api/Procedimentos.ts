export interface Contatos {
    id?: string;
    telefone?: string;
}

export interface Clinicas {
    id?: string;
    nome?: string;
    contatos?: Contatos[];
}

export interface Image {
    id?: string;
    url?: string;
    nome?: string;
    descricao?: string;
}

export interface Material {
    id?: string;
    codigo?: string;
    nome?: string;
    quantidade?: number;
    unidade_de_medida?: string;
    descricao?: string;
    fornecedor?: string;
    preco_unitario?: number;
    data_de_validade?: string;
    localizacao?: string;
}

export interface Procedimento {
    id?: string;
    codigo?: string;
    nome?: string;
    preco?: number;
    descricao?: string;
    duracao?: string;
    categoria?: string;
    complexidade?: string;
    disponibilidade?: boolean;
    instrucoes_pos_tratamento?: string;
    restricoes_contradicacoes?: string;
    materiais_necessarios?: Material[];
    imagens?: Image[];
    clinicas?: Clinicas[];
    filtroGlobal?: string; //usado para criar um filtro
    nomeClinicaFormatado?: string;  //usado para realizar o processo de sort em um <a>
    contatoFormatado?: string;  //usado para realizar o processo de sort em um <a>
}
