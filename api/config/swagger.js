const documentacao = {
    openapi: '3.0.3',
    info: {
        title: 'API SGI Interclasse Manager',
        description: 'API para gerenciar campeonatos interclasse com usuários, times, partidas, grupos, eventos e classificações.',
        version: '1.0.0',
        contact: {
            name: 'SGI Interclasse Support'
        },
        license: {
            name: 'MIT'
        }
    },
    servers: [
        { url: 'https://interclassemanager-seven.vercel.app', description: 'Servidor API' }
    ],
    security: [
        {
            bearerAuth: []
        }
    ],
    tags: [
        { name: 'Usuários', description: 'Operações relacionadas aos usuários' },
        { name: 'Times', description: 'Operações relacionadas aos times' },
        { name: 'Partidas', description: 'Operações relacionadas às partidas' },
        { name: 'Jogadores', description: 'Operações relacionadas aos jogadores' },
        { name: 'Grupos', description: 'Operações relacionadas aos grupos' },
        { name: 'Eventos', description: 'Operações relacionadas aos eventos' },
        { name: 'Classificações', description: 'Operações relacionadas às classificações' },
        { name: 'Campeonatos', description: 'Operações relacionadas aos campeonatos' }
    ],
    paths: {
        '/usuarios': {
            get: {
                tags: ['Usuários'],
                summary: 'Listar todos os usuários',
                description: 'Retorna lista de todos os usuários cadastrados.',
                responses: {
                    200: {
                        description: 'Dados obtidos com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Usuario' }
                                }
                            }
                        }
                    },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            },
            post: {
                tags: ['Usuários'],
                summary: 'Cadastrar novo usuário',
                description: 'Cria um novo usuário com nome, email, senha e tipo.',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/UsuarioCreate' },
                            example: {
                                nome: 'Maria Silva',
                                email: 'maria@example.com',
                                senha: 'senha123',
                                tipo: 'organizador'
                            }
                        }
                    }
                },
                responses: {
                    201: { description: 'Usuário cadastrado com sucesso' },
                    400: { $ref: '#/components/responses/BadRequest' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            }
        },
        '/login': {
            post: {
                tags: ['Usuários'],
                summary: 'Autenticar usuário',
                description: 'Faz login e retorna token JWT para autenticação das rotas protegidas.',
                security: [],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/LoginRequest' },
                            example: {
                                email: 'maria@example.com',
                                senha: 'senha123'
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: 'Autenticação realizada com sucesso',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/LoginResponse' }
                            }
                        }
                    },
                    400: { $ref: '#/components/responses/BadRequest' },
                    401: { $ref: '#/components/responses/Unauthorized' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            }
        },
        '/usuarios/{id_usuario}': {
            get: {
                tags: ['Usuários'],
                summary: 'Buscar usuário por ID',
                description: 'Retorna os dados de um usuário específico pelo id_usuario.',
                parameters: [
                    {
                        name: 'id_usuario',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer', example: 1 }
                    }
                ],
                responses: {
                    200: {
                        description: 'Usuário encontrado',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Usuario' }
                            }
                        }
                    },
                    404: { $ref: '#/components/responses/NotFound' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            },
            put: {
                tags: ['Usuários'],
                summary: 'Atualizar usuário',
                description: 'Atualiza os dados de um usuário existente.',
                parameters: [
                    {
                        name: 'id_usuario',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer', example: 1 }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/UsuarioUpdate' },
                            example: {
                                nome: 'Maria Souza',
                                email: 'maria.souza@example.com',
                                senha: 'novaSenha123',
                                tipo: 'organizador'
                            }
                        }
                    }
                },
                responses: {
                    200: { description: 'Usuário atualizado com sucesso' },
                    400: { $ref: '#/components/responses/BadRequest' },
                    404: { $ref: '#/components/responses/NotFound' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            },
            delete: {
                tags: ['Usuários'],
                summary: 'Remover usuário',
                description: 'Remove um usuário pelo id_usuario.',
                parameters: [
                    {
                        name: 'id_usuario',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer', example: 1 }
                    }
                ],
                responses: {
                    200: { description: 'Usuário removido com sucesso' },
                    404: { $ref: '#/components/responses/NotFound' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            }
        },
        '/times': {
            get: {
                tags: ['Times'],
                summary: 'Listar todos os times',
                description: 'Retorna lista de todos os times cadastrados.',
                responses: {
                    200: {
                        description: 'Dados obtidos com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Time' }
                                }
                            }
                        }
                    },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            },
            post: {
                tags: ['Times'],
                summary: 'Cadastrar novo time',
                description: 'Cria um novo time para um campeonato.',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/TimeCreate' },
                            example: {
                                nome: 'Time Azul',
                                foto: 'https://example.com/imagem.png',
                                id_campeonato: 1,
                                cor: '#0000FF'
                            }
                        }
                    }
                },
                responses: {
                    201: { description: 'Time cadastrado com sucesso' },
                    400: { $ref: '#/components/responses/BadRequest' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            }
        },
        '/times/{id_time}': {
            get: {
                tags: ['Times'],
                summary: 'Buscar time por ID',
                parameters: [
                    {
                        name: 'id_time',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer', example: 1 }
                    }
                ],
                responses: {
                    200: {
                        description: 'Time encontrado',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Time' }
                            }
                        }
                    },
                    404: { $ref: '#/components/responses/NotFound' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            },
            put: {
                tags: ['Times'],
                summary: 'Atualizar time',
                parameters: [
                    {
                        name: 'id_time',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer', example: 1 }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/TimeCreate' },
                            example: {
                                nome: 'Time Verde',
                                foto: 'https://example.com/verde.png',
                                id_campeonato: 1,
                                cor: '#00FF00'
                            }
                        }
                    }
                },
                responses: {
                    200: { description: 'Time atualizado com sucesso' },
                    400: { $ref: '#/components/responses/BadRequest' },
                    404: { $ref: '#/components/responses/NotFound' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            },
            delete: {
                tags: ['Times'],
                summary: 'Remover time',
                parameters: [
                    {
                        name: 'id_time',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer', example: 1 }
                    }
                ],
                responses: {
                    200: { description: 'Time removido com sucesso' },
                    404: { $ref: '#/components/responses/NotFound' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            }
        },
        '/partidas': {
            get: {
                tags: ['Partidas'],
                summary: 'Listar todas as partidas',
                description: 'Retorna lista de todas as partidas cadastradas.',
                responses: {
                    200: {
                        description: 'Dados obtidos com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Partida' }
                                }
                            }
                        }
                    },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            },
            post: {
                tags: ['Partidas'],
                summary: 'Cadastrar nova partida',
                description: 'Cria uma partida entre dois times.',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/PartidaCreate' },
                            example: {
                                data: '2026-07-03',
                                horario: '15:30:00',
                                status: 'agendada',
                                id_time_a: 1,
                                id_time_b: 2,
                                id_campeonato: 1,
                                id_grupo: 1,
                                pontos_time_a: 0,
                                pontos_time_b: 0,
                                fase: 'grupos'
                            }
                        }
                    }
                },
                responses: {
                    201: { description: 'Partida cadastrada com sucesso' },
                    400: { $ref: '#/components/responses/BadRequest' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            }
        },
        '/partidas/{id_partida}': {
            get: {
                tags: ['Partidas'],
                summary: 'Buscar partida por ID',
                parameters: [
                    {
                        name: 'id_partida',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer', example: 1 }
                    }
                ],
                responses: {
                    200: {
                        description: 'Partida encontrada',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Partida' }
                            }
                        }
                    },
                    404: { $ref: '#/components/responses/NotFound' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            },
            put: {
                tags: ['Partidas'],
                summary: 'Atualizar partida',
                parameters: [
                    {
                        name: 'id_partida',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer', example: 1 }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/PartidaCreate' },
                            example: {
                                data: '2026-07-03',
                                horario: '17:00:00',
                                status: 'concluida',
                                id_time_a: 1,
                                id_time_b: 2,
                                id_campeonato: 1,
                                id_grupo: 1,
                                pontos_time_a: 3,
                                pontos_time_b: 1,
                                fase: 'grupos'
                            }
                        }
                    }
                },
                responses: {
                    200: { description: 'Partida atualizada com sucesso' },
                    400: { $ref: '#/components/responses/BadRequest' },
                    404: { $ref: '#/components/responses/NotFound' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            },
            delete: {
                tags: ['Partidas'],
                summary: 'Remover partida',
                parameters: [
                    {
                        name: 'id_partida',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer', example: 1 }
                    }
                ],
                responses: {
                    200: { description: 'Partida removida com sucesso' },
                    404: { $ref: '#/components/responses/NotFound' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            }
        },
        '/jogadores': {
            get: {
                tags: ['Jogadores'],
                summary: 'Listar todos os jogadores',
                responses: {
                    200: {
                        description: 'Dados obtidos com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Jogador' }
                                }
                            }
                        }
                    },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            },
            post: {
                tags: ['Jogadores'],
                summary: 'Cadastrar novo jogador',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/JogadorCreate' },
                            example: {
                                nome: 'Pedro Santos',
                                id_time: 2
                            }
                        }
                    }
                },
                responses: {
                    201: { description: 'Jogador cadastrado com sucesso' },
                    400: { $ref: '#/components/responses/BadRequest' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            }
        },
        '/jogadores/{id_jogador}': {
            get: {
                tags: ['Jogadores'],
                summary: 'Buscar jogador por ID',
                parameters: [
                    {
                        name: 'id_jogador',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer', example: 1 }
                    }
                ],
                responses: {
                    200: {
                        description: 'Jogador encontrado',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Jogador' }
                            }
                        }
                    },
                    404: { $ref: '#/components/responses/NotFound' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            },
            put: {
                tags: ['Jogadores'],
                summary: 'Atualizar jogador',
                parameters: [
                    {
                        name: 'id_jogador',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer', example: 1 }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/JogadorCreate' },
                            example: {
                                nome: 'Pedro Henrique',
                                id_time: 3
                            }
                        }
                    }
                },
                responses: {
                    200: { description: 'Jogador atualizado com sucesso' },
                    400: { $ref: '#/components/responses/BadRequest' },
                    404: { $ref: '#/components/responses/NotFound' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            },
            delete: {
                tags: ['Jogadores'],
                summary: 'Remover jogador',
                parameters: [
                    {
                        name: 'id_jogador',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer', example: 1 }
                    }
                ],
                responses: {
                    200: { description: 'Jogador removido com sucesso' },
                    404: { $ref: '#/components/responses/NotFound' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            }
        },
        '/grupos': {
            get: {
                tags: ['Grupos'],
                summary: 'Listar todos os grupos',
                responses: {
                    200: {
                        description: 'Dados obtidos com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Grupo' }
                                }
                            }
                        }
                    },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            },
            post: {
                tags: ['Grupos'],
                summary: 'Cadastrar novo grupo',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/GrupoCreate' },
                            example: {
                                nome: 'Grupo A',
                                id_campeonato: 1
                            }
                        }
                    }
                },
                responses: {
                    201: { description: 'Grupo cadastrado com sucesso' },
                    400: { $ref: '#/components/responses/BadRequest' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            }
        },
        '/grupos/{id_grupo}': {
            get: {
                tags: ['Grupos'],
                summary: 'Buscar grupo por ID',
                parameters: [
                    {
                        name: 'id_grupo',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer', example: 1 }
                    }
                ],
                responses: {
                    200: {
                        description: 'Grupo encontrado',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Grupo' }
                            }
                        }
                    },
                    404: { $ref: '#/components/responses/NotFound' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            },
            put: {
                tags: ['Grupos'],
                summary: 'Atualizar grupo',
                parameters: [
                    {
                        name: 'id_grupo',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer', example: 1 }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/GrupoCreate' },
                            example: {
                                nome: 'Grupo B',
                                id_campeonato: 1
                            }
                        }
                    }
                },
                responses: {
                    200: { description: 'Grupo atualizado com sucesso' },
                    400: { $ref: '#/components/responses/BadRequest' },
                    404: { $ref: '#/components/responses/NotFound' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            },
            delete: {
                tags: ['Grupos'],
                summary: 'Remover grupo',
                parameters: [
                    {
                        name: 'id_grupo',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer', example: 1 }
                    }
                ],
                responses: {
                    200: { description: 'Grupo removido com sucesso' },
                    404: { $ref: '#/components/responses/NotFound' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            }
        },
        '/eventos': {
            get: {
                tags: ['Eventos'],
                summary: 'Listar todos os eventos',
                responses: {
                    200: {
                        description: 'Dados obtidos com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Evento' }
                                }
                            }
                        }
                    },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            },
            post: {
                tags: ['Eventos'],
                summary: 'Cadastrar novo evento',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/EventoCreate' },
                            example: {
                                tipo_evento: 'gol',
                                id_time: 1,
                                id_jogador: 3,
                                id_partida: 2
                            }
                        }
                    }
                },
                responses: {
                    201: { description: 'Evento cadastrado com sucesso' },
                    400: { $ref: '#/components/responses/BadRequest' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            }
        },
        '/eventos/{id_evento}': {
            get: {
                tags: ['Eventos'],
                summary: 'Buscar evento por ID',
                parameters: [
                    {
                        name: 'id_evento',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer', example: 1 }
                    }
                ],
                responses: {
                    200: {
                        description: 'Evento encontrado',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Evento' }
                            }
                        }
                    },
                    404: { $ref: '#/components/responses/NotFound' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            },
            put: {
                tags: ['Eventos'],
                summary: 'Atualizar evento',
                parameters: [
                    {
                        name: 'id_evento',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer', example: 1 }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/EventoCreate' },
                            example: {
                                tipo_evento: 'cartao',
                                id_time: 1,
                                id_jogador: 4,
                                id_partida: 2
                            }
                        }
                    }
                },
                responses: {
                    200: { description: 'Evento atualizado com sucesso' },
                    400: { $ref: '#/components/responses/BadRequest' },
                    404: { $ref: '#/components/responses/NotFound' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            },
            delete: {
                tags: ['Eventos'],
                summary: 'Remover evento',
                parameters: [
                    {
                        name: 'id_evento',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer', example: 1 }
                    }
                ],
                responses: {
                    200: { description: 'Evento removido com sucesso' },
                    404: { $ref: '#/components/responses/NotFound' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            }
        },
        '/classificacoes': {
            get: {
                tags: ['Classificações'],
                summary: 'Listar todas as classificações',
                responses: {
                    200: {
                        description: 'Dados obtidos com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Classificacao' }
                                }
                            }
                        }
                    },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            },
            post: {
                tags: ['Classificações'],
                summary: 'Cadastrar nova classificação',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/ClassificacaoCreate' },
                            example: {
                                id_time: 1,
                                pontos: 10,
                                jogos: 4,
                                vitorias: 3,
                                empates: 1,
                                derrotas: 0,
                                saldo_gols: 8,
                                id_campeonato: 1
                            }
                        }
                    }
                },
                responses: {
                    201: { description: 'Classificação cadastrada com sucesso' },
                    400: { $ref: '#/components/responses/BadRequest' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            }
        },
        '/classificacoes/{id_classificacao}': {
            get: {
                tags: ['Classificações'],
                summary: 'Buscar classificação por ID',
                parameters: [
                    {
                        name: 'id_classificacao',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer', example: 1 }
                    }
                ],
                responses: {
                    200: {
                        description: 'Classificação encontrada',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Classificacao' }
                            }
                        }
                    },
                    404: { $ref: '#/components/responses/NotFound' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            },
            put: {
                tags: ['Classificações'],
                summary: 'Atualizar classificação',
                parameters: [
                    {
                        name: 'id_classificacao',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer', example: 1 }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/ClassificacaoCreate' },
                            example: {
                                id_time: 1,
                                pontos: 12,
                                jogos: 5,
                                vitorias: 4,
                                empates: 0,
                                derrotas: 1,
                                saldo_gols: 9,
                                id_campeonato: 1
                            }
                        }
                    }
                },
                responses: {
                    200: { description: 'Classificação atualizada com sucesso' },
                    400: { $ref: '#/components/responses/BadRequest' },
                    404: { $ref: '#/components/responses/NotFound' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            },
            delete: {
                tags: ['Classificações'],
                summary: 'Remover classificação',
                parameters: [
                    {
                        name: 'id_classificacao',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer', example: 1 }
                    }
                ],
                responses: {
                    200: { description: 'Classificação removida com sucesso' },
                    404: { $ref: '#/components/responses/NotFound' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            }
        },
        '/campeonatos': {
            get: {
                tags: ['Campeonatos'],
                summary: 'Listar todos os campeonatos',
                responses: {
                    200: {
                        description: 'Dados obtidos com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Campeonato' }
                                }
                            }
                        }
                    },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            },
            post: {
                tags: ['Campeonatos'],
                summary: 'Cadastrar novo campeonato',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/CampeonatoCreate' },
                            example: {
                                nome: 'Copa Interclasse',
                                formato: 'pontos corridos',
                                data_inicio: '2026-08-01',
                                data_fim: '2026-12-10',
                                id_usuario: 1,
                                qtd_times: 8,
                                modalidade: 'futebol'
                            }
                        }
                    }
                },
                responses: {
                    201: { description: 'Campeonato cadastrado com sucesso' },
                    400: { $ref: '#/components/responses/BadRequest' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            }
        },
        '/campeonatos/{id_campeonato}': {
            get: {
                tags: ['Campeonatos'],
                summary: 'Buscar campeonato por ID',
                parameters: [
                    {
                        name: 'id_campeonato',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer', example: 1 }
                    }
                ],
                responses: {
                    200: {
                        description: 'Campeonato encontrado',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Campeonato' }
                            }
                        }
                    },
                    404: { $ref: '#/components/responses/NotFound' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            },
            put: {
                tags: ['Campeonatos'],
                summary: 'Atualizar campeonato',
                parameters: [
                    {
                        name: 'id_campeonato',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer', example: 1 }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/CampeonatoCreate' },
                            example: {
                                nome: 'Copa Interclasse 2026',
                                formato: 'mata-mata',
                                data_inicio: '2026-08-01',
                                data_fim: '2026-12-10',
                                id_usuario: 1,
                                qtd_times: 8,
                                modalidade: 'futebol'
                            }
                        }
                    }
                },
                responses: {
                    200: { description: 'Campeonato atualizado com sucesso' },
                    400: { $ref: '#/components/responses/BadRequest' },
                    404: { $ref: '#/components/responses/NotFound' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            },
            delete: {
                tags: ['Campeonatos'],
                summary: 'Remover campeonato',
                parameters: [
                    {
                        name: 'id_campeonato',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer', example: 1 }
                    }
                ],
                responses: {
                    200: { description: 'Campeonato removido com sucesso' },
                    404: { $ref: '#/components/responses/NotFound' },
                    500: { $ref: '#/components/responses/ServerError' }
                }
            }
        }
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        },
        schemas: {
            Usuario: {
                type: 'object',
                properties: {
                    id_usuario: { type: 'integer', example: 1 },
                    nome: { type: 'string', example: 'Maria Silva' },
                    email: { type: 'string', example: 'maria@example.com' },
                    tipo: { type: 'string', example: 'organizador' }
                }
            },
            UsuarioCreate: {
                type: 'object',
                required: ['nome', 'email', 'senha'],
                properties: {
                    nome: { type: 'string', example: 'Maria Silva' },
                    email: { type: 'string', example: 'maria@example.com' },
                    senha: { type: 'string', example: 'senha123' },
                    tipo: { type: 'string', example: 'organizador' }
                }
            },
            UsuarioUpdate: {
                type: 'object',
                required: ['nome', 'email', 'senha', 'tipo'],
                properties: {
                    nome: { type: 'string', example: 'Maria Silva' },
                    email: { type: 'string', example: 'maria.nova@example.com' },
                    senha: { type: 'string', example: 'novaSenha123' },
                    tipo: { type: 'string', example: 'organizador' }
                }
            },
            LoginRequest: {
                type: 'object',
                required: ['email', 'senha'],
                properties: {
                    email: { type: 'string', format: 'email', example: 'maria@example.com' },
                    senha: { type: 'string', example: 'senha123' }
                }
            },
            LoginResponse: {
                type: 'object',
                properties: {
                    token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                    usuario: { $ref: '#/components/schemas/Usuario' }
                }
            },
            Time: {
                type: 'object',
                properties: {
                    id_time: { type: 'integer', example: 1 },
                    nome: { type: 'string', example: 'Time Azul' },
                    foto: { type: 'string', example: 'https://example.com/imagem.png' },
                    id_campeonato: { type: 'integer', example: 1 },
                    cor: { type: 'string', example: '#0000FF' }
                }
            },
            TimeCreate: {
                type: 'object',
                required: ['nome'],
                properties: {
                    nome: { type: 'string', example: 'Time Azul' },
                    foto: { type: 'string', example: 'https://example.com/imagem.png' },
                    id_campeonato: { type: 'integer', example: 1 },
                    cor: { type: 'string', example: '#0000FF' }
                }
            },
            Partida: {
                type: 'object',
                properties: {
                    id_partida: { type: 'integer', example: 1 },
                    data: { type: 'string', format: 'date', example: '2026-07-03' },
                    horario: { type: 'string', format: 'time', example: '15:30:00' },
                    status: { type: 'string', example: 'agendada' },
                    id_time_a: { type: 'integer', example: 1 },
                    id_time_b: { type: 'integer', example: 2 },
                    id_campeonato: { type: 'integer', example: 1 },
                    id_grupo: { type: 'integer', example: 1 },
                    pontos_time_a: { type: 'integer', example: 0 },
                    pontos_time_b: { type: 'integer', example: 0 },
                    fase: { type: 'string', example: 'grupos' }
                }
            },
            PartidaCreate: {
                type: 'object',
                required: ['data', 'horario', 'id_time_a', 'id_time_b'],
                properties: {
                    data: { type: 'string', format: 'date', example: '2026-07-03' },
                    horario: { type: 'string', format: 'time', example: '15:30:00' },
                    status: { type: 'string', example: 'agendada' },
                    id_time_a: { type: 'integer', example: 1 },
                    id_time_b: { type: 'integer', example: 2 },
                    id_campeonato: { type: 'integer', example: 1 },
                    id_grupo: { type: 'integer', example: 1 },
                    pontos_time_a: { type: 'integer', example: 0 },
                    pontos_time_b: { type: 'integer', example: 0 },
                    fase: { type: 'string', example: 'grupos' }
                }
            },
            Jogador: {
                type: 'object',
                properties: {
                    id_jogador: { type: 'integer', example: 1 },
                    nome: { type: 'string', example: 'Pedro Santos' },
                    id_time: { type: 'integer', example: 2 }
                }
            },
            JogadorCreate: {
                type: 'object',
                required: ['nome', 'id_time'],
                properties: {
                    nome: { type: 'string', example: 'Pedro Santos' },
                    id_time: { type: 'integer', example: 2 }
                }
            },
            Grupo: {
                type: 'object',
                properties: {
                    id_grupo: { type: 'integer', example: 1 },
                    nome: { type: 'string', example: 'Grupo A' },
                    id_campeonato: { type: 'integer', example: 1 }
                }
            },
            GrupoCreate: {
                type: 'object',
                required: ['nome', 'id_campeonato'],
                properties: {
                    nome: { type: 'string', example: 'Grupo A' },
                    id_campeonato: { type: 'integer', example: 1 }
                }
            },
            Evento: {
                type: 'object',
                properties: {
                    id_evento: { type: 'integer', example: 1 },
                    tipo_evento: { type: 'string', example: 'gol' },
                    id_time: { type: 'integer', example: 1 },
                    id_jogador: { type: 'integer', example: 3 },
                    id_partida: { type: 'integer', example: 2 }
                }
            },
            EventoCreate: {
                type: 'object',
                required: ['tipo_evento'],
                properties: {
                    tipo_evento: { type: 'string', example: 'gol' },
                    id_time: { type: 'integer', example: 1 },
                    id_jogador: { type: 'integer', example: 3 },
                    id_partida: { type: 'integer', example: 2 }
                }
            },
            Classificacao: {
                type: 'object',
                properties: {
                    id_classificacao: { type: 'integer', example: 1 },
                    id_time: { type: 'integer', example: 1 },
                    pontos: { type: 'integer', example: 10 },
                    jogos: { type: 'integer', example: 4 },
                    vitorias: { type: 'integer', example: 3 },
                    empates: { type: 'integer', example: 1 },
                    derrotas: { type: 'integer', example: 0 },
                    saldo_gols: { type: 'integer', example: 8 },
                    id_campeonato: { type: 'integer', example: 1 }
                }
            },
            ClassificacaoCreate: {
                type: 'object',
                required: ['id_time', 'id_campeonato'],
                properties: {
                    id_time: { type: 'integer', example: 1 },
                    pontos: { type: 'integer', example: 10 },
                    jogos: { type: 'integer', example: 4 },
                    vitorias: { type: 'integer', example: 3 },
                    empates: { type: 'integer', example: 1 },
                    derrotas: { type: 'integer', example: 0 },
                    saldo_gols: { type: 'integer', example: 8 },
                    id_campeonato: { type: 'integer', example: 1 }
                }
            },
            Campeonato: {
                type: 'object',
                properties: {
                    id_campeonato: { type: 'integer', example: 1 },
                    nome: { type: 'string', example: 'Copa Interclasse' },
                    formato: { type: 'string', example: 'pontos corridos' },
                    data_inicio: { type: 'string', format: 'date', example: '2026-08-01' },
                    data_fim: { type: 'string', format: 'date', example: '2026-12-10' },
                    id_usuario: { type: 'integer', example: 1 },
                    qtd_times: { type: 'integer', example: 8 },
                    modalidade: { type: 'string', example: 'futebol' }
                }
            },
            CampeonatoCreate: {
                type: 'object',
                required: ['nome'],
                properties: {
                    nome: { type: 'string', example: 'Copa Interclasse' },
                    formato: { type: 'string', example: 'pontos corridos' },
                    data_inicio: { type: 'string', format: 'date', example: '2026-08-01' },
                    data_fim: { type: 'string', format: 'date', example: '2026-12-10' },
                    id_usuario: { type: 'integer', example: 1 },
                    qtd_times: { type: 'integer', example: 8 },
                    modalidade: { type: 'string', example: 'futebol' }
                }
            }
        },
        responses: {
            BadRequest: {
                description: 'Requisição inválida',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string', example: 'Campos obrigatórios ausentes ou inválidos.' }
                            }
                        }
                    }
                }
            },
            NotFound: {
                description: 'Recurso não encontrado',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string', example: 'Recurso não encontrado.' }
                            }
                        }
                    }
                }
            },
            Unauthorized: {
                description: 'Não autorizado - token inválido ou ausente',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string', example: 'Token inválido ou ausente.' }
                            }
                        }
                    }
                }
            },
            ServerError: {
                description: 'Erro interno do servidor',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string', example: 'Erro interno no servidor.' }
                            }
                        }
                    }
                }
            }
        }
    }
};

export default documentacao;