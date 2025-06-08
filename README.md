## IMPORTANTE - FUNCIONALIDADE

Devido a nossa api estar hospedada no Render, é possível que haja um atraso nas requisições para a api, peço que, ao registrar o seu usuário para testar a plataforma, aguarde de 3 a 5 minutos para a inicialização correta da api rest, agradeço pela compreensão.

<h1 align="center">Eliza 2.0 Mobile app </h1>
<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-a.svg" />
  </a>
</p>

Eliza é uma aplicação mobile concebida como um MVP para servir como psicóloga virtual empática e acessível, especialmente voltada ao suporte psicológico de pessoas em situação de vulnerabilidade após desastres, catástrofes naturais ou grandes crises sociais.

A solução integra a inteligência artificial do Google Gemini, permitindo conversas humanizadas, acolhedoras e responsivas, capazes de entender o contexto emocional do usuário e oferecer orientações ou encaminhamentos de forma segura e ética. A IA foi treinada para compreender demandas sensíveis e proporcionar suporte inicial até que o indivíduo possa receber acompanhamento especializado.

O projeto utiliza autenticação JWT para garantir a segurança e privacidade dos dados dos usuários e persiste as interações em banco de dados PostgreSQL, viabilizando histórico de conversas e acompanhamento contínuo.

Como MVP, Eliza foi projetada para ser facilmente expandida no futuro, permitindo integrações com outros serviços de assistência social, plataformas de telemedicina, equipes de resposta a emergências e órgãos de saúde pública. Nesse contexto, consumimos uma api própria feita em Spring Boot e hospedada no Render que contém toda nossa lógica de negócio.


## Índice

- [Características](#características)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Usar](#como-usar)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Características

- Interface amigável e responsiva.
- Conversas anônimas com um bot de acolhimento.
- Histórico de mensagens.
- Navegação entre telas de login, registro e perfil.
- Suporte a múltiplas plataformas (iOS e Android).



## Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento de aplicativos móveis.
- **React Navigation**: Biblioteca para navegação entre telas.
- **Axios**: Cliente HTTP para fazer requisições à API.
- **AsyncStorage**: Armazenamento local para gerenciar tokens de autenticação.
- **Expo**: Ferramenta para desenvolvimento e construção de aplicativos React Native.

## Instalação

Para instalar e executar o projeto, siga os passos abaixo:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/lemos000/eliza-mobile-app.git
   cd eliza-mobile-app
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Inicie o aplicativo**:
   ```bash
   npx expo start
   ```

   Você pode usar o Expo Go para visualizar o aplicativo em seu dispositivo móvel.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

```
eliza-mobile-app/
├── navigation/
│   ├── AppNavigator.tsx
│   ├── AuthNavigator.tsx
│   └── MainTabs.tsx
├── screens/
│   ├── ChatScreen.tsx
│   ├── HistoricoScreen.tsx
│   ├── LoginScreen.tsx
│   ├── ProfileScreen.tsx
│   └── RegisterScreen.tsx
├── service/
│   └── apicall.ts
├── types/
│   └── types.ts
├── App.tsx
└── package.json
```

### Descrição dos principais arquivos

- **App.tsx**: Componente principal que gerencia a navegação do aplicativo.
- **navigation/**: Contém os arquivos de navegação, incluindo a navegação de autenticação e as abas principais.
- **screens/**: Contém os componentes de tela do aplicativo, como Chat, Login e Registro.
- **service/**: Contém a lógica para chamadas à API.
- **types/**: Define os tipos TypeScript utilizados no projeto.

## Como Usar

1. **Autenticação**: Os usuários podem se registrar ou fazer login para acessar o aplicativo.
2. **Chat**: Após o login, os usuários podem acessar a tela de chat, onde podem enviar mensagens e receber respostas do bot.
3. **Histórico**: Os usuários podem visualizar o histórico de mensagens enviadas e recebidas.
4. **Perfil**: Os usuários podem acessar suas informações de perfil e sair.


## Licença

Este projeto é apenas para fins acadêmicos.
