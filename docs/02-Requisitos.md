# Requisitos do Sistema

## Objetivo

Este documento descreve todas as funcionalidades que o sistema deverá possuir.

---

# Área Pública

## Página Inicial

O sistema deverá exibir:

- Logo da lanchonete
- Nome da empresa
- Banner principal
- Horário de funcionamento
- Status (Aberto ou Fechado)
- Botão para visualizar o cardápio

---

## Cardápio

O cliente deverá conseguir:

- Visualizar categorias
- Pesquisar produtos
- Filtrar produtos
- Visualizar fotos
- Visualizar descrição
- Visualizar preço

---

## Produto

Ao abrir um produto, o cliente poderá:

- Escolher quantidade
- Adicionar observações
- Selecionar adicionais
- Remover ingredientes
- Visualizar o preço atualizado em tempo real
- Adicionar ao carrinho

---

## Carrinho

O sistema deverá permitir:

- Alterar quantidade
- Remover itens
- Editar personalização
- Visualizar subtotal
- Visualizar taxa de entrega
- Visualizar total

---

## Checkout

O cliente deverá informar:

### Dados pessoais

- Nome
- Telefone

### Tipo de pedido

- Entrega
- Retirada

### Caso seja entrega

- Endereço
- Número
- Complemento
- Bairro

### Pagamento

- PIX
- Dinheiro
- Cartão

Se escolher dinheiro:

Mostrar campo:

Troco para R$

---

## Finalização

Ao clicar em "Finalizar Pedido":

O frontend deverá enviar o pedido para o backend.

O backend deverá:

- Validar todos os dados
- Salvar o pedido
- Gerar a mensagem
- Enviar automaticamente para a WhatsApp Business Platform
- Retornar sucesso ao frontend

---

# Painel Administrativo

O administrador deverá conseguir:

## Produtos

- Criar
- Editar
- Excluir
- Ativar
- Desativar

---

## Categorias

- Criar
- Editar
- Excluir
- Ordenar

---

## Configurações

Editar:

- Nome
- Logo
- WhatsApp
- Endereço
- Horários
- Taxa de entrega

---

## Pedidos

Visualizar:

- Pendentes
- Em preparo
- Finalizados
- Cancelados

Alterar status dos pedidos.

---

## Segurança

O painel deverá possuir login protegido.

---

## Responsividade

Todo o sistema deverá funcionar perfeitamente em:

- Celular
- Tablet
- Notebook
- Desktop

---

## Performance

O sistema deverá carregar rapidamente mesmo em conexões móveis.

---

## Acessibilidade

O sistema deverá possuir:

- Bom contraste
- Navegação por teclado
- Botões grandes
- Textos legíveis