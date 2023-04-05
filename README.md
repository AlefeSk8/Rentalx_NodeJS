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
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificação.
Deve ser possível listar todos os carros.

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário deve ser um administrador para cadastrar uma especificação.


# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carros.

**RNF**
Utilizar o multer para fazer upload dos arquivos

**RN**
O usuário deve ser um administrador para realizar o cadastro de iamgens.
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.


# Aluguel de carro

**RF**
Deve ser possível cadastrar um aluguel.


**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um em aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um em aberto para o mesmo carro.

