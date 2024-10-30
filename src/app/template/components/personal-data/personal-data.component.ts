import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LocationsService } from 'src/app/template/service/locations.service';
import { AddressService } from 'src/app/template/service/address.service';
import { Country, State, City } from 'src/app/template/api/Locations';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { saveAs } from 'file-saver';

@Component({
    templateUrl: './personal-data.component.html',
    styleUrls: ['./personal-data.component.css']
})

export class PersonalDataComponent implements OnInit {

    imageListPath: { [key: string]: SafeResourceUrl } = {};
    imagePath: SafeResourceUrl | undefined;
    displayImage: boolean = false;

    displayPDF: boolean = false;
    pdfPath: SafeResourceUrl | undefined;

    files: NgxFileDropEntry[] = [];
    fileTypes!: MenuItem[]; // Variável para armazenar os tipos de arquivo desejados

    countries: Country[] = [];
    states: State[] = [];
    cities: City[] = [];

    valRadioSexo: string = '';
    valRadioEtnia: string = '';
    valRadioEstadoCivil: string = '';

    selectedCountryNaturalidade: Country | null = null;

    selectedStateId: number | null = null;
    selectedCity: City | null = null;

    selectedRgStateId: number | null = null;
    selectedEducation: MenuItem | null;
    selectedFile: MenuItem | null;

    name: string = '';
    dateOfBirth: string = ''; // Data de nascimento
    dateOfEmissionRG: string = ''; // Data de emissão do rg
    education!: MenuItem[]; // Escolaridade
    profession: string = ''; // Profissão

    endereco: any = {
        cep: '',
        logradouro: '',
        numero: '',
        cidade: '',
        estado: '',
        bairro: ''
    };

    tiposContato: { value: number, label: string }[] = [
        { value: 1, label: 'Próprio' },
        { value: 2, label: 'Esposo(a)' },
        { value: 3, label: 'Pais/Mãe' },
        { value: 4, label: 'Irmão/Irmão' },
        { value: 5, label: 'Tio(a)' },
        { value: 6, label: 'Avô(ó)' },
        { value: 7, label: 'Filho(a)' },
        { value: 8, label: 'Vizinho(a)' },
        { value: 9, label: 'Amigo(a)' },
        { value: 10, label: 'Outros' }
    ];

    email: string = '';
    telefones: { numero: string, tipo: string, nomeContato: string }[] = [{ numero: '', tipo: '', nomeContato: '' }]; // Array de telefones
    tipoContatoSelecionado: string;

    constructor(
        private locationService: LocationsService,
        private addressService: AddressService,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit() {

        this.locationService.getCountries().subscribe(countries => {
            this.countries = countries;
            this.sortCountries();
        });

        this.locationService.getStates().subscribe(states => {
            this.states = states;
            this.sortStates();
        });

        this.locationService.getCities().subscribe(cities => {
            this.cities = cities;
            this.sortCities(null);
        });

        this.education = [
            { code: "01", nome: "Fundamental - Incompleto" },
            { code: "02", nome: "Fundamental - Completo" },
            { code: "03", nome: "Médio - Incompleto" },
            { code: "04", nome: "Médio - Completo" },
            { code: "05", nome: "Superior - Incompleto" },
            { code: "06", nome: "Superior - Completo" },
            { code: "07", nome: "Pós-graduação (Lato senso) - Incompleto" },
            { code: "08", nome: "Pós-graduação (Lato senso) - Completo" },
            { code: "09", nome: "Pós-graduação (Stricto sensu, nível mestrado) - Incompleto" },
            { code: "10", nome: "Pós-graduação (Stricto sensu, nível mestrado) - Completo" },
            { code: "11", nome: "Pós-graduação (Stricto sensu, nível doutor) - Incompleto" },
            { code: "12", nome: "Pós-graduação (Stricto sensu, nível doutor) - Completo" }
        ]

        this.fileTypes = [
            { type: 'cpf', name: 'CPF' },
            { type: 'rg', name: 'RG' }
        ]

    }

    adicionarTelefone() {
        // Verifica se o último telefone está preenchido
        if (this.telefones.length === 0 || this.telefones[this.telefones.length - 1].numero.trim() !== '') {
            const novoTelefone = { numero: '', tipo: '', nomeContato: '' };
            this.telefones.push(novoTelefone);
            // Verifica se o tipo de contato é "Próprio" e preenche automaticamente o nome do contato
            if (this.tipoContatoSelecionado === 'Próprio') {
                novoTelefone.nomeContato = this.name;
            }
        }
    }

    // Adiciona uma função para limpar o campo de nome do contato quando o tipo de contato for alterado
    onTipoContatoChange(telefoneIndex: number) {
        if (this.telefones[telefoneIndex].tipo["label"] !== 'Próprio') {
            this.telefones[telefoneIndex].nomeContato = '';
        } else {
            this.telefones[telefoneIndex].nomeContato = this.name;
        }
    }
    buscarEnderecoPorCep() {
        if (this.endereco.cep.length === 8) {
            this.addressService.getAddress(this.endereco.cep).subscribe(address => {

                this.endereco.logradouro = address.logradouro;
                this.endereco.bairro = address.bairro;
                this.endereco.cidade = address.localidade;;
                this.endereco.estado = this.getStateName(address.uf);
                // Se os campos cidade e estado não estiverem sendo preenchidos corretamente,
                // você pode imprimir o valor de address aqui para depurar e verificar a estrutura dos dados retornados.
            });
        }
    }

    private sortCountries() {
        this.countries.sort((a, b) => {
            if (a.nome === 'Brasil') return -1; // Brasil vem primeiro
            if (b.nome === 'Brasil') return 1; // Brasil vem primeiro
            return a.nome.localeCompare(b.nome);
        });
    }

    private sortStates() {
        this.states.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    private sortCities(stateName: string | null) {
        const capitals = [
            { capital: 'Rio Branco', state: 'Acre' },
            { capital: 'Maceió', state: 'Alagoas' },
            { capital: 'Macapá', state: 'Amapá' },
            { capital: 'Manaus', state: 'Amazonas' },
            { capital: 'Salvador', state: 'Bahia' },
            { capital: 'Fortaleza', state: 'Ceará' },
            { capital: 'Brasília', state: 'Distrito Federal' },
            { capital: 'Vitória', state: 'Espírito Santo' },
            { capital: 'Goiânia', state: 'Goiás' },
            { capital: 'São Luís', state: 'Maranhão' },
            { capital: 'Cuiabá', state: 'Mato Grosso' },
            { capital: 'Campo Grande', state: 'Mato Grosso do Sul' },
            { capital: 'Belo Horizonte', state: 'Minas Gerais' },
            { capital: 'Belém', state: 'Pará' },
            { capital: 'João Pessoa', state: 'Paraíba' },
            { capital: 'Curitiba', state: 'Paraná' },
            { capital: 'Recife', state: 'Pernambuco' },
            { capital: 'Teresina', state: 'Piauí' },
            { capital: 'Rio de Janeiro', state: 'Rio de Janeiro' },
            { capital: 'Natal', state: 'Rio Grande do Norte' },
            { capital: 'Porto Alegre', state: 'Rio Grande do Sul' },
            { capital: 'Porto Velho', state: 'Rondônia' },
            { capital: 'Boa Vista', state: 'Roraima' },
            { capital: 'Florianópolis', state: 'Santa Catarina' },
            { capital: 'São Paulo', state: 'São Paulo' },
            { capital: 'Aracaju', state: 'Sergipe' },
            { capital: 'Palmas', state: 'Tocantins' }
        ];

        this.cities.sort((a, b) => {
            const capitalA = capitals.find(capital => capital.capital === a.nome && stateName === capital.state);
            const capitalB = capitals.find(capital => capital.capital === b.nome && stateName === capital.state);

            if (capitalA && capitalB) {
                // Se ambos forem capitais, compara os estados
                return capitalA.state.localeCompare(capitalB.state);
            } else if (capitalA) {
                // Se apenas A for capital, A vem primeiro
                return -1;
            } else if (capitalB) {
                // Se apenas B for capital, B vem primeiro
                return 1;
            } else {
                // Se nenhum for capital, compara os nomes
                return a.nome.localeCompare(b.nome);
            }
        });
    }

    private getStateName(stateInitials: string): string {
        const states = [
            { initials: 'AC', name: 'Acre' },
            { initials: 'AL', name: 'Alagoas' },
            { initials: 'AP', name: 'Amapá' },
            { initials: 'AM', name: 'Amazonas' },
            { initials: 'BA', name: 'Bahia' },
            { initials: 'CE', name: 'Ceará' },
            { initials: 'DF', name: 'Distrito Federal' },
            { initials: 'ES', name: 'Espírito Santo' },
            { initials: 'GO', name: 'Goiás' },
            { initials: 'MA', name: 'Maranhão' },
            { initials: 'MT', name: 'Mato Grosso' },
            { initials: 'MS', name: 'Mato Grosso do Sul' },
            { initials: 'MG', name: 'Minas Gerais' },
            { initials: 'PA', name: 'Pará' },
            { initials: 'PB', name: 'Paraíba' },
            { initials: 'PR', name: 'Paraná' },
            { initials: 'PE', name: 'Pernambuco' },
            { initials: 'PI', name: 'Piauí' },
            { initials: 'RJ', name: 'Rio de Janeiro' },
            { initials: 'RN', name: 'Rio Grande do Norte' },
            { initials: 'RS', name: 'Rio Grande do Sul' },
            { initials: 'RO', name: 'Rondônia' },
            { initials: 'RR', name: 'Roraima' },
            { initials: 'SC', name: 'Santa Catarina' },
            { initials: 'SP', name: 'São Paulo' },
            { initials: 'SE', name: 'Sergipe' },
            { initials: 'TO', name: 'Tocantins' }
        ];

        const state = states.find(state => state.initials === stateInitials.toUpperCase());
        return state ? state.name : stateInitials;
    }

    onStateChange(stateId: number | null, stateName: string | null) {
        // Limpa a cidade selecionada sempre que o estado for alterado
        this.selectedCity = null;
        // Atualiza o array de cidades conforme o estado selecionado
        if (stateId) {
            this.locationService.getCities(stateId).subscribe(cities => {
                this.cities = cities;
                this.sortCities(stateName);
            });
        } else {
            this.cities = [];
        }
    }

    onRgStateChange(stateId: number | null) {
        // Lógica de manipulação de estado de emissão do RG
    }

    // Função para calcular a idade com base na data de nascimento
    calculateAge(): number | null {
        if (!this.dateOfBirth) return null;

        const today = new Date();
        const birthDate = new Date(this.dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();

        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    // Função para determinar o tipo de arquivo com base na extensão
    getFileType(file: File): string {
        const fileType = file.name.split('.').pop()?.toLowerCase();
        if (fileType) {
            if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(fileType)) {
                return 'image';
            } else if (['pdf'].includes(fileType)) {
                return 'pdf';
            } else if (['doc', 'docx'].includes(fileType)) {
                return 'doc';
            } else {
                return 'other';
            }
        } else {
            return 'other';
        }
    }

    // Função para remover o arquivo da lista
    excluirArquivo(fileEntry: FileSystemFileEntry): void {
        // Encontrar o índice do arquivo com o fileEntry correspondente
        const index = this.files.findIndex(item => item.fileEntry === fileEntry);
        if (index !== -1) {
            // Remove o elemento da lista
            this.files.splice(index, 1);
        } else {
            console.error('Arquivo não encontrado na lista.');
        }
    }

    public dropped(files: NgxFileDropEntry[]) {
        this.files = files;

        for (const droppedFile of files) {

            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                fileEntry.file((file: File) => {
                    this.updateImageUrls();
                    /**
                    // You could upload it like this:
                    const formData = new FormData()
                    formData.append('logo', file, relativePath)

                    // Headers
                    const headers = new HttpHeaders({
                      'security-token': 'mytoken'
                    })

                    this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
                    .subscribe(data => {
                      // Sanitized logo returned from backend
                    })
                    **/

                });
            } else {
                // It was a directory (empty directories are added, otherwise only files)
                const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
            }
        }
    }

    public fileOver(event) {
        console.log(event);
    }

    public fileLeave(event) {
        console.log(event);
    }

    visualizarArquivoPdf(fileEntry: FileSystemFileEntry) {
        // O restante do código permanece o mesmo
        const selectedFile = fileEntry;
        selectedFile.file((file: File) => {
            // Verifica se o arquivo é um PDF
            if (file.type === 'application/pdf') {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Obtém o conteúdo do arquivo como uma URL segura
                    const pdfDataUri = this.sanitizer.bypassSecurityTrustResourceUrl((e.target as FileReader).result as string);
                    // Define o URL seguro para exibição no componente
                    this.pdfPath = pdfDataUri;
                    // Exibe o modal com o PDF
                    this.displayPDF = true;
                };
                // Lê o conteúdo do arquivo como uma URL de dados
                reader.readAsDataURL(file);
            } else {
                // Notifica o usuário que o arquivo não é um PDF
                console.error('O arquivo selecionado não é um PDF.');
            }
        });
    }


    visualizarArquivoImg(fileEntry: FileSystemFileEntry) {
        // O restante do código permanece o mesmo
        const selectedFile = fileEntry;
        selectedFile.file((file: File) => {
            // Verifica se o arquivo é uma imagem (JPEG, PNG ou JPG)
            if (['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Obtém o conteúdo do arquivo como uma URL segura
                    const imageDataUri = this.sanitizer.bypassSecurityTrustResourceUrl((e.target as FileReader).result as string);
                    // Define o URL seguro para exibição no componente
                    this.imagePath = imageDataUri;
                    // Exibe o modal com a imagem
                    this.displayImage = true;
                };
                // Lê o conteúdo do arquivo como uma URL de dados
                reader.readAsDataURL(file);
            } else {
                // Notifica o usuário que o arquivo não é uma imagem suportada
                console.error('O arquivo selecionado não é uma imagem suportada (JPEG, PNG ou JPG).');
            }
        });
    }

    // Método para atualizar os URLs seguros das imagens
    updateImageUrls() {
        // Percorre todos os arquivos
        for (let i = 0; i < this.files.length; i++) {
            const file = this.files[i].fileEntry as FileSystemFileEntry;
            file.file((file: File) => {
                // Verifica se o arquivo é uma imagem
                if (['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
                    // Atualiza o URL seguro da imagem
                    this.getUrlImg(i);
                }
            });
        }
    }

    getUrlImg(index: number) {
        const selectedFile = this.files[index].fileEntry as FileSystemFileEntry;
        selectedFile.file((file: File) => {
            // Verifica se o arquivo é uma imagem (JPEG, PNG ou JPG)
            if (['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Obtém o conteúdo do arquivo como uma URL segura
                    const imageDataUri = this.sanitizer.bypassSecurityTrustResourceUrl((e.target as FileReader).result as string);
                    // Define o URL seguro para exibição no componente
                    this.imageListPath[this.files[index].relativePath] = imageDataUri;
                };
                // Lê o conteúdo do arquivo como uma URL de dados
                reader.readAsDataURL(file);
            } else {
                // Notifica o usuário que o arquivo não é uma imagem suportada
                console.error('O arquivo selecionado não é uma imagem suportada (JPEG, PNG ou JPG).');
            }
        });
    }

    downloadArquivo(fileEntry: FileSystemFileEntry): void {
        fileEntry.file((file: File) => {
            const url = URL.createObjectURL(file);
            saveAs(url, file.name); // Baixa o arquivo
            URL.revokeObjectURL(url); // Limpa a URL criada
        });
    }
}
