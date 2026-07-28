# Delivery Template

## Objetivo

Desenvolver um sistema web moderno para lanchonetes e restaurantes locais.

O sistema permitirá que os clientes:

- Visualizem o cardápio digital;
- Pesquisem produtos;
- Naveguem por categorias;
- Personalizem seus pedidos;
- Adicionem produtos ao carrinho;
- Escolham entre entrega ou retirada;
- Informem seus dados;
- Finalizem o pedido de forma rápida e intuitiva.

Após a confirmação do pedido, o frontend deverá enviar as informações para o backend.

O backend será responsável por:

- Validar os dados do pedido;
- Registrar o pedido;
- Processar todas as informações;
- Enviar automaticamente o pedido para a lanchonete utilizando a WhatsApp Business Platform;
- Retornar ao cliente uma confirmação de que o pedido foi enviado com sucesso.

Cada instalação será independente.

O sistema será desenvolvido como um template reutilizável, permitindo criar rapidamente novos sites para diferentes lanchonetes apenas alterando:

- Nome da empresa;
- Logo;
- Cores;
- Cardápio;
- Categorias;
- Produtos;
- Preços;
- Taxa de entrega;
- Horário de funcionamento;
- Número da WhatsApp Business Platform;
- Informações de contato.

## Objetivos Técnicos

O projeto deverá seguir boas práticas de arquitetura de software.

### Frontend

- Desenvolvido separadamente do backend;
- Interface moderna;
- Responsivo para celular, tablet e computador;
- Código organizado em componentes reutilizáveis;
- Comunicação exclusivamente através da API.

### Backend

- API REST;
- Arquitetura organizada em camadas;
- Responsável por toda a regra de negócio;
- Integração com a WhatsApp Business Platform;
- Preparado para futuras funcionalidades.

### Banco de Dados

- PostgreSQL;
- Estrutura escalável;
- Relacionamentos bem definidos;
- Fácil manutenção.

### Painel Administrativo

O administrador deverá conseguir:

- Cadastrar produtos;
- Editar produtos;
- Excluir produtos;
- Criar categorias;
- Alterar preços;
- Alterar horários;
- Alterar taxa de entrega;
- Alterar informações da empresa;
- Visualizar pedidos.

## Qualidade do Projeto

O sistema deverá ser:

- Organizado;
- Escalável;
- Fácil de manter;
- Fácil de personalizar;
- Rápido;
- Seguro;
- Reutilizável para novos clientes.

## Objetivo Final

Criar um produto profissional que possa ser vendido para lanchonetes locais, oferecendo uma experiência moderna de pedidos online e uma estrutura de código organizada, permitindo reutilização e evolução contínua do sistema.