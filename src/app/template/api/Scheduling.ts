interface Usuario {
    id?: string;
    nome?: string;
}

interface Clinica {
    id?: string;
    nome?: string;
    profissional?: string;
    contatos?: Contatos[];
}

interface Contatos {
    id?: string;
    numero?: string;
}

export interface Agendamento {
    data?: string;
    status?: string;
    usuario?: Usuario[];
    clinica?: Clinica[];
}
