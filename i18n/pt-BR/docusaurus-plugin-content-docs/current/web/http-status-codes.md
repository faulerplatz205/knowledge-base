---
title: "Códigos de Status HTTP"
description: "Visão geral dos códigos de status HTTP mais comuns, agrupados por categoria."
keywords:
    - HTTP
    - códigos de status
    - códigos de resposta
    - status HTTP
tags:
    - ap2
machine_translated: true
---

# Códigos de Status HTTP

## Visão geral {/*#overview*/}

Códigos de status HTTP são números de três dígitos retornados por um servidor em resposta a uma requisição de um cliente. Indicam se a requisição foi bem-sucedida, redirecionada ou resultou em erro. Os códigos de status são agrupados em cinco classes de acordo com o primeiro dígito.

## 1xx - Informativo {/*#1xx---informational*/}

A requisição foi recebida e o servidor continua a processá-la.

| Código | Nome                | Descrição                                                                                          |
| ------ | ------------------- | -------------------------------------------------------------------------------------------------- |
| 100    | Continue            | O servidor recebeu os cabeçalhos da requisição e o cliente deve prosseguir com o envio do corpo.   |
| 101    | Switching Protocols | O servidor está mudando para o protocolo solicitado pelo cliente (p. ex. upgrade para WebSocket).  |

### Exemplos {/*#examples*/}

- **100 Continue**: Um cliente envia um upload de arquivo grande com o cabeçalho `Expect: 100-continue`. O servidor responde com `100` para sinalizar que o cliente deve prosseguir com o envio do corpo.
- **101 Switching Protocols**: Um cliente envia uma requisição HTTP com `Upgrade: websocket`. O servidor responde com `101` e muda para o protocolo WebSocket.

## 2xx - Sucesso {/*#2xx---success*/}

A requisição foi recebida, compreendida e aceita com sucesso.

| Código | Nome       | Descrição                                                                                      |
| ------ | ---------- | ---------------------------------------------------------------------------------------------- |
| 200    | OK         | A requisição foi bem-sucedida. O corpo da resposta contém os dados solicitados.                |
| 201    | Created    | Um novo recurso foi criado com sucesso (normalmente após um `POST`).                           |
| 204    | No Content | A requisição foi bem-sucedida, mas não há conteúdo a retornar (normalmente após um `DELETE`).   |

### Exemplos {/*#examples-1*/}

- **200 OK**: `GET /api/users/42` => o servidor retorna o objeto de usuário como JSON.
- **201 Created**: `POST /api/users` com um corpo de requisição => o servidor cria o usuário e retorna o novo recurso com um cabeçalho `Location`.
- **204 No Content**: `DELETE /api/users/42` => o servidor exclui o usuário e retorna uma resposta vazia.

## 3xx - Redirecionamento {/*#3xx---redirection*/}

O cliente precisa executar uma ação adicional para concluir a requisição.

| Código | Nome               | Descrição                                                                                 |
| ------ | ------------------ | ----------------------------------------------------------------------------------------- |
| 301    | Moved Permanently  | O recurso foi movido permanentemente para uma nova URL.                                   |
| 302    | Found              | O recurso está temporariamente localizado em uma URL diferente.                           |
| 304    | Not Modified       | O recurso não foi alterado desde a última requisição (usado para cache).                  |
| 307    | Temporary Redirect | Como o 302, mas o método da requisição não pode mudar no redirecionamento.                |
| 308    | Permanent Redirect | Como o 301, mas o método da requisição não pode mudar no redirecionamento.                |

### Exemplos {/*#examples-2*/}

- **301 Moved Permanently**: `GET /old-page` => o servidor responde com `301` e `Location: /new-page`. Os mecanismos de busca atualizam seu índice de acordo.
- **302 Found**: `GET /promo` => o servidor redireciona temporariamente para `/current-sale`. A URL original continua válida para requisições futuras.
- **304 Not Modified**: O cliente envia `GET /style.css` com um cabeçalho `If-None-Match` contendo um ETag em cache. O servidor confirma que o recurso não foi alterado e retorna `304` sem corpo.
- **307 Temporary Redirect**: `POST /api/submit` => o servidor redireciona temporariamente para `/api/v2/submit`. O cliente deve reenviar a requisição `POST` (sem alterá-la para `GET`).
- **308 Permanent Redirect**: `POST /api/old-endpoint` => o servidor redireciona permanentemente para `/api/new-endpoint`. O cliente deve reenviar a requisição `POST` para a nova URL.

## 4xx - Erro do cliente {/*#4xx---client-error*/}

A requisição contém um erro no lado do cliente.

| Código | Nome                   | Descrição                                                                                                                |
| ------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 400    | Bad Request            | O servidor não consegue processar a requisição devido a sintaxe malformada ou entrada inválida.                          |
| 401    | Unauthorized           | A autenticação é necessária e não foi fornecida ou é inválida.                                                           |
| 403    | Forbidden              | O servidor entendeu a requisição, mas se recusa a autorizá-la.                                                           |
| 404    | Not Found              | O recurso solicitado não existe no servidor.                                                                             |
| 405    | Method Not Allowed     | O método HTTP utilizado não é suportado para o recurso solicitado.                                                       |
| 408    | Request Timeout        | O servidor esgotou o tempo de espera para o cliente terminar de enviar a requisição.                                     |
| 409    | Conflict               | A requisição entra em conflito com o estado atual do recurso (p. ex. registro duplicado).                                |
| 413    | Content Too Large      | O corpo da requisição excede o limite de tamanho do servidor.                                                            |
| 415    | Unsupported Media Type | O servidor não suporta o tipo de mídia do corpo da requisição.                                                           |
| 418    | I'm a Teapot           | O servidor se recusa a preparar café porque é um bule de chá ([RFC 2324](https://datatracker.ietf.org/doc/html/rfc2324)). |
| 422    | Unprocessable Content  | A requisição está sintaticamente correta, mas semanticamente inválida (p. ex. erros de validação).                       |
| 429    | Too Many Requests      | O cliente enviou requisições demais em um determinado período (limitação de taxa).                                       |

### Exemplos {/*#examples-3*/}

- **400 Bad Request**: `POST /api/users` com `{ name: }` => o corpo JSON está malformado e não pode ser interpretado.
- **401 Unauthorized**: `GET /api/profile` sem um cabeçalho `Authorization` => o servidor exige autenticação.
- **403 Forbidden**: `DELETE /api/users/1` com um token válido de um usuário sem privilégios de administrador => o usuário está autenticado, mas não tem permissão.
- **404 Not Found**: `GET /api/users/99999` => não existe usuário com esse ID.
- **405 Method Not Allowed**: `DELETE /api/login` => o endpoint `/api/login` suporta apenas `POST`.
- **408 Request Timeout**: Um cliente abre uma conexão e começa a enviar um corpo de requisição grande, mas trava no meio da transferência. O servidor encerra a conexão após o timeout.
- **409 Conflict**: `POST /api/users` com `{ "email": "a@b.com" }` => já existe um usuário com esse e-mail.
- **413 Content Too Large**: `POST /api/upload` com um arquivo de 500 MB => o limite de upload do servidor é de 50 MB.
- **415 Unsupported Media Type**: `POST /api/data` com `Content-Type: text/xml` => o endpoint aceita apenas `application/json`.
- **418 I'm a Teapot**: `BREW /coffee` => o bule de chá recusa educadamente.
- **422 Unprocessable Content**: `POST /api/users` com `{ "email": "not-an-email" }` => o JSON é válido, mas o campo de e-mail falha na validação.
- **429 Too Many Requests**: Um cliente envia 1000 requisições por minuto para `/api/search` => o servidor aplica um limite de taxa e responde com `429` e um cabeçalho `Retry-After`.

## 5xx - Erro do servidor {/*#5xx---server-error*/}

O servidor não conseguiu atender a uma requisição válida.

| Código | Nome                  | Descrição                                                                                                       |
| ------ | --------------------- | --------------------------------------------------------------------------------------------------------------- |
| 500    | Internal Server Error | Ocorreu um erro inesperado no servidor.                                                                         |
| 502    | Bad Gateway           | O servidor, atuando como gateway ou proxy, recebeu uma resposta inválida de um servidor upstream.               |
| 503    | Service Unavailable   | O servidor está temporariamente incapaz de tratar a requisição (p. ex. sobrecarregado ou em manutenção).        |
| 504    | Gateway Timeout       | O servidor, atuando como gateway ou proxy, não recebeu uma resposta em tempo hábil de um servidor upstream.     |

### Exemplos {/*#examples-4*/}

- **500 Internal Server Error**: `GET /api/reports` => ocorre uma exceção não tratada no código do servidor (p. ex. null pointer, divisão por zero).
- **502 Bad Gateway**: Um proxy reverso (p. ex. Nginx) encaminha a requisição para um backend que retorna uma resposta corrompida ou incompleta.
- **503 Service Unavailable**: O servidor está em manutenção programada ou sobrecarregado e temporariamente não consegue tratar requisições. Frequentemente inclui um cabeçalho `Retry-After`.
- **504 Gateway Timeout**: Um proxy reverso encaminha a requisição para um backend que demora demais para responder (p. ex. uma consulta lenta ao banco de dados excede o timeout do proxy).
