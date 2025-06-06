export interface Usuario {
  nome: string;
  email: string;
  senhaHash?: string;
  dataCadastro?: string;
}

export interface RespostaDTO {
    resposta: string
}

export interface Hist {
    pergunta: string;
    resposta: string;
}


export interface Mensagem {

  textoUsuario: string;
  respostaBot: string;
  dataHora: string;
  usuario: Usuario;
}

export interface MensagemDTO {
  texto: string;
}

export interface AuthResponse {
  token: string;
  userName: string;
  userEmail: string;
}

export interface AuthContextType {
  user: Usuario | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
}

export type AuthStackParamList = {
    Home: undefined;
    Login: undefined;
    Register: undefined;
  };
  
export type MainTabParamList = {
    Chat: undefined;
    Histórico: undefined;
    Perfil: undefined;
  };

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};