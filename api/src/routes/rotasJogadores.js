import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();

router.get('/jogadores', autenticarToken, async (req, res) => {
    try {
        const query = `SELECT * FROM jogadores ORDER BY id_jogador`;
        const jogadores = await BD.query(query);
        return res.status(200).json(jogadores.rows);
    } catch (error) {
        console.error('Erro ao listar jogadores', error.message);
        return res.status(500).json({ error: 'Erro ao listar jogadores' })
    }
});

router.get('/jogadores/:id_jogador', autenticarToken, async (req, res) => {
    const { id_jogador } = req.params;
    try {
        const jogador = await BD.query('SELECT * FROM jogadores WHERE id_jogador = $1', [id_jogador]);
        if (jogador.rows.length === 0) return res.status(404).json({ message: 'Jogador não encontrado' });
        return res.status(200).json(jogador.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar jogador', error.message);
        return res.status(500).json({ error: 'Erro ao buscar jogador' })
    }
});

router.put('/jogadores/:id_jogador', autenticarToken, async (req, res) => {
    const { id_jogador } = req.params;
    const { nome, id_time } = req.body;
    try {
        const verificar = await BD.query('SELECT * FROM jogadores WHERE id_jogador = $1', [id_jogador]);
        if (verificar.rows.length === 0) return res.status(404).json({ message: 'Jogador não encontrado' });

        const comando = `UPDATE jogadores SET nome = $1, id_time = $2 WHERE id_jogador = $3`;
        const valores = [nome, id_time, id_jogador];
        await BD.query(comando, valores);
        return res.status(200).json({ message: 'Jogador atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar jogador', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar jogador' })
    }
});

router.delete('/jogadores/:id_jogador', autenticarToken, async (req, res) => {
    const { id_jogador } = req.params;
    try {
        await BD.query('DELETE FROM jogadores WHERE id_jogador = $1', [id_jogador]);
        return res.status(200).json({ message: 'Jogador removido com sucesso' });
    } catch (error) {
        console.error('Erro ao remover jogador', error.message);
        return res.status(500).json({ error: 'Erro ao remover jogador' })
    }
});

router.post('/jogadores', autenticarToken, async (req, res) => {
    const { nome, id_time } = req.body;
    try {
        if (!nome || !id_time) return res.status(400).json({ message: 'Campos obrigatórios: nome, id_time' });

        const comando = `INSERT INTO jogadores(nome, id_time) VALUES($1, $2)`;
        const valores = [nome, id_time];
        await BD.query(comando, valores);
        return res.status(201).json({ message: 'Jogador cadastrado com sucesso' });
    } catch (error) {
        console.error('Erro ao cadastrar jogador', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar jogador' })
    }
});

export default router;
