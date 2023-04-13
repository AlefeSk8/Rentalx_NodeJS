**RF => Requisitos funcionais**

**RNF => Requisitos não funcionais** 

**RN => Regra de negócio**

# Cadastro de carro

**RF**
✅ Deve ser possível cadastrar um novo carro.

**RN**
✅ Não deve ser possível cadastrar um carro com uma placa já existente.
✅ O carro deve ser cadastrado com o status de disponivel por padrão.
✅ O usuário deve ser um administrador para cadastrar um carro.


# Listagem de carros

**RF**
✅ Deve ser possível listar todos os carros disponíveis.
✅ Deve ser possível listar todos os carros disponíveis pelo nome do carro.
✅ Deve ser possível listar todos os carros disponíveis pela categoria.
✅ Deve ser possível listar todos os carros disponíveis pela marca.

**RN**
✅ Não é necessário estar logado para listar todos os carros.


# Cadastro de Especificação no carro

**RF**
✅ Deve ser possível cadastrar uma especificação para um carro.

**RN**
✅ Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
✅ Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
✅ O usuário deve ser um administrador para cadastrar uma especificação.


# Cadastro de imagens do carro

**RF**
✅ Deve ser possível cadastrar a imagem do carro.

**RNF**
✅ Utilizar o multer para fazer upload dos arquivos

**RN**
✅ O usuário deve ser um administrador para realizar o cadastro de iamgens.
✅ O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.


# Aluguel de carro

**RF**
Deve ser possível cadastrar um aluguel.

**RN**
✅ O aluguel deve ter duração mínima de 24 horas.
✅ Não deve ser possível cadastrar um novo aluguel caso já exista um em aberto para o mesmo usuário.
✅ Não deve ser possível cadastrar um novo aluguel caso já exista um em aberto para o mesmo carro.
✅ Ao realizar um aluguel, o status do carro deverá ficar como indisponível.
✅ O usuário deve estar logado.


# Devolução de carro

**RF**
✅ Deve ser possível realizar a devolução de um carro.

**RN**
✅ Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
✅ Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
✅ Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
✅ Ao realizar a devolução, deverá ser calculado o total do aluguel.
✅ Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
✅ Caso haja multa, deverá ser somado ao total do aluguel.
✅ O usuário deve estar logado.


# Listagem de alugueis para o usuário

**RF**
✅ Deve ser possível listar todos os alugueis do usuário.

**RN**
✅ O usuário deve estar logado.


# Recuperar senha.

**RF**
- Deve ser possível o usuário recuperar a senha informando o email.
- O usuário deve receber um email com o  passo a passo  para a recuperação da senha
- O usuário deve conseguir inserir uma nova senha

**RN**
- O usuário precisa informar uma nova senha
- o link enviado para a recuperação deve expirar em 3 horas
