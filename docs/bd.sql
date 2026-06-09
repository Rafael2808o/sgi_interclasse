CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    tipo VARCHAR(20)
);

CREATE TABLE campeonatos (
    id_campeonato SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    formato VARCHAR(50),
    data_inicio DATE,
    data_fim DATE,
    id_usuario INT,
    qtd_times INT,
    modalidade VARCHAR(20),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE times (
    id_time SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cor VARCHAR(7) NOT NULL,
    foto TEXT,
    id_campeonato INT NOT NULL,
    FOREIGN KEY (id_campeonato) REFERENCES campeonatos(id_campeonato)
);

CREATE TABLE jogadores (
    id_jogador SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    id_time INT NOT NULL,
    FOREIGN KEY (id_time) REFERENCES times(id_time)
);

CREATE TABLE grupos (
    id_grupo SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    id_campeonato INT NOT NULL,
    FOREIGN KEY (id_campeonato) REFERENCES campeonatos(id_campeonato)
);

CREATE TABLE times_grupos (
    id_time INT,
    id_grupo INT,
    PRIMARY KEY (id_time, id_grupo),
    FOREIGN KEY (id_time) REFERENCES times(id_time),
    FOREIGN KEY (id_grupo) REFERENCES grupos(id_grupo)
);

CREATE TABLE partidas (
    id_partida SERIAL PRIMARY KEY,
    data DATE,
    horario TIME,
    status VARCHAR(30),
    id_time_a INT,
    id_time_b INT,
    id_campeonato INT NOT NULL,
    id_grupo INT,
    pontos_time_a INT,
    pontos_time_b INT,
    fase VARCHAR(50),
    FOREIGN KEY (id_time_a) REFERENCES times(id_time),
    FOREIGN KEY (id_time_b) REFERENCES times(id_time),
    FOREIGN KEY (id_campeonato) REFERENCES campeonatos(id_campeonato),
    FOREIGN KEY (id_grupo) REFERENCES grupos(id_grupo)
);

CREATE TABLE eventos (
    id_evento SERIAL PRIMARY KEY,
    tipo_evento VARCHAR(50),
    id_time INT,
    id_jogador INT,
    id_partida INT,
    FOREIGN KEY (id_time) REFERENCES times(id_time),
    FOREIGN KEY (id_jogador) REFERENCES jogadores(id_jogador),
    FOREIGN KEY (id_partida) REFERENCES partidas(id_partida)
);

CREATE TABLE classificacoes (
    id_classificacao SERIAL PRIMARY KEY,
    id_time INT,
    pontos INT,
    jogos INT,
    vitorias INT,
    empates INT,
    derrotas INT,
    saldo_gols INT,
    id_campeonato INT,
    FOREIGN KEY (id_time) REFERENCES times(id_time),
    FOREIGN KEY (id_campeonato) REFERENCES campeonatos(id_campeonato)
);


INSERT INTO usuarios (nome, senha, email, tipo) VALUES
('Admin', '123456', 'admin@email.com', 'organizador'),
('Visitante', '123456', 'visitante@email.com', 'visualizador');

INSERT INTO campeonatos (nome, formato, data_inicio, data_fim, id_usuario, qtd_times, modalidade) VALUES
('Interclasse Futsal', 'grupos', '2026-05-01', '2026-05-10', 1, 4, 'futsal'),
('Interclasse Basquete', 'mata-mata', '2026-05-02', '2026-05-12', 1, 4, 'basquete'),
('Interclasse Handebol', 'grupos', '2026-05-03', '2026-05-13', 1, 4, 'handebol'),
('Interclasse Queimada', 'mata-mata', '2026-05-04', '2026-05-14', 1, 4, 'queimada');

INSERT INTO times (nome, cor, foto, id_campeonato) VALUES
('Time A Futsal', '#FF0000', NULL, 1),
('Time B Futsal', '#0000FF', NULL, 1),
('Time C Futsal', '#00FF00', NULL, 1),
('Time D Futsal', '#FFFF00', NULL, 1),

('Time A Basquete', '#FF6600', NULL, 2),
('Time B Basquete', '#6600FF', NULL, 2),

('Time A Handebol', '#00FFFF', NULL, 3),
('Time B Handebol', '#FF00FF', NULL, 3),

('Time A Queimada', '#999999', NULL, 4),
('Time B Queimada', '#333333', NULL, 4);

INSERT INTO jogadores (nome, id_time) VALUES
('João', 1),
('Pedro', 1),
('Lucas', 2),
('Carlos', 2),
('Ana', 3),
('Marcos', 4);

INSERT INTO grupos (nome, id_campeonato) VALUES
('Grupo A', 1),
('Grupo B', 1),
('Grupo A', 3);

INSERT INTO times_grupos (id_time, id_grupo) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 2),
(7, 3),
(8, 3);

INSERT INTO partidas (data, horario, status, id_time_a, id_time_b, id_campeonato, id_grupo, pontos_time_a, pontos_time_b, fase) VALUES
('2026-05-01', '10:00', 'finalizada', 1, 2, 1, 1, 3, 2, 'grupos'),
('2026-05-02', '11:00', 'andamento', 3, 4, 1, 2, 1, 1, 'grupos'),
('2026-05-03', '14:00', 'agendada', 5, 6, 2, NULL, NULL, NULL, 'semifinal');

INSERT INTO eventos (tipo_evento, id_time, id_jogador, id_partida) VALUES
('gol', 1, 1, 1),
('gol', 2, 3, 1),
('falta', 1, 2, 1);

INSERT INTO classificacoes (id_time, pontos, jogos, vitorias, empates, derrotas, saldo_gols, id_campeonato) VALUES
(1, 3, 1, 1, 0, 0, 1, 1),
(2, 0, 1, 0, 0, 1, -1, 1),
(3, 1, 1, 0, 1, 0, 0, 1),
(4, 1, 1, 0, 1, 0, 0, 1);
