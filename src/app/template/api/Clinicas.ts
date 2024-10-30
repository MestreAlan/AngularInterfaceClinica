export interface Endereco {
    cep?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    ponto_de_referencia?: string;
}

export interface PlanoSaude {
    id?: string;
    nome?: string;
    codigo?: string;
}

export interface Contato {
    telefone?: string;
}

export interface Especialidade {
    nome?: string;
    profissional?: string;
    plano_de_saude?: PlanoSaude[];
    valor_da_consulta?: string;
}

export interface ProfissionalList { // Usada para puxar a lista por profissionais
    especialidade?: Especialidade[];
    clinica?: Clinica[];
    filtroGlobal?: string; //usado para criar um filtro
    profissionalFormatado?: string; //usado para realizar o processo de sort em um <a>
    especialidadeFormatado?: string; //usado para realizar o processo de sort em um <a>
    clinicaFormatado?: string; //usado para realizar o processo de sort em um <a>
    planoDeSaudeFormatado?: string; //usado para realizar o processo de sort em um <a>
    valorConsultaFormatado?: string; //usado para realizar o processo de sort em um <a>
};

export interface Clinica {
    id?: string;
    nome?: string;
    endereco?: Endereco[];
    atendimento_inicio?: string;
    atendimento_fim?: string;
    verificacao?: boolean;
    contatos?: Contato[];
    especialidades?: Especialidade[];
    filtroGlobal: string; //usado para criar um filtro
    enderecoFormatado: string; //usado para realizar o processo de sort em um <a>
    contatosFormatado: string; //usado para realizar o processo de sort em um <a>
}
