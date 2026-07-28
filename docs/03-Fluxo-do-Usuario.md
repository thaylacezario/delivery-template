# Fluxo do Usuário

## Objetivo

Este documento descreve toda a jornada do cliente dentro do sistema.

---

# Fluxo Principal

Home

↓

Cardápio

↓

Selecionar Categoria

↓

Selecionar Produto

↓

Personalizar Produto

↓

Adicionar ao Carrinho

↓

Carrinho

↓

Checkout

↓

Enviar Pedido

↓

Tela de Confirmação

---

# Fluxo da Home

Ao acessar o site o cliente deverá visualizar:

- Logo
- Nome da lanchonete
- Banner principal
- Horário de funcionamento
- Status (Aberto ou Fechado)
- Botão "Ver Cardápio"

---

# Fluxo do Cardápio

O cliente poderá:

- Navegar por categorias
- Pesquisar produtos
- Visualizar fotos
- Ver preços
- Abrir detalhes do produto

---

# Fluxo do Produto

Ao abrir um produto o cliente poderá:

- Escolher quantidade
- Selecionar adicionais
- Remover ingredientes
- Escrever observações
- Visualizar o preço atualizado
- Adicionar ao carrinho

---

# Fluxo do Carrinho

O cliente poderá:

- Alterar quantidade
- Remover produtos
- Editar personalizações
- Ver subtotal
- Ver taxa de entrega
- Ver total

---

# Fluxo do Checkout

O cliente deverá informar:

- Nome
- Telefone

Selecionar:

- Entrega
- Retirada

Caso seja entrega:

- Endereço
- Número
- Complemento
- Bairro

Forma de pagamento:

- PIX
- Cartão
- Dinheiro

Se dinheiro:

Mostrar campo "Troco para"

---

# Fluxo da Finalização

Ao clicar em "Finalizar Pedido":

Frontend

↓

Envia pedido para API

↓

Backend

↓

Valida os dados

↓

Salva pedido

↓

Envia pedido pela WhatsApp Business Platform

↓

Retorna sucesso

↓

Frontend exibe:

"Pedido enviado com sucesso."

---

# Fluxo Administrativo

Administrador

↓

Login

↓

Dashboard

↓

Produtos

↓

Categorias

↓

Pedidos

↓

Configurações

↓

Logout