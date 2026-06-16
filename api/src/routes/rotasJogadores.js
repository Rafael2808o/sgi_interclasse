import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";
import { ok, created, badRequest, notFound, conflict, serverError } from "../utils/responses.js";

const router = Router();

router.get('/jogadores', autenticarToken, async (req, res) => {
    try {
        const query = `SELECT * FROM jogadores ORDER BY id_jogador`;
        const jogadores = await BD.query(query);
        return ok(res, jogadores.rows);
    } catch (error) {
        console.error('Erro ao listar jogadores', error.message);
        return res.status(500).json({ error: 'Erro ao listar jogadores' })
    }
});

router.get('/jogadores/:id_jogador', autenticarToken, async (req, res) => {
    const { id_jogador } = req.params;
    try {
        const jogador = await BD.query('SELECT * FROM jogadores WHERE id_jogador = $1', [id_jogador]);
        if (jogador.rows.length === 0) return notFound(res, 'Jogador nao existe');
        return ok(res, jogador.rows[0]);
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
        if (verificar.rows.length === 0) return notFound(res, 'Jogador nao existe');

        const comando = `UPDATE jogadores SET nome = $1, id_time = $2 WHERE id_jogador = $3`;
        const valores = [nome, id_time, id_jogador];
        await BD.query(comando, valores);
        return ok(res, { message: 'Jogador atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar jogador', error.message);
        return serverError(res, 'Erro ao atualizar jogador');
    }
});

router.delete('/jogadores/:id_jogador', autenticarToken, async (req, res) => {
    const { id_jogador } = req.params;
    try {
        const verificar = await BD.query('SELECT * FROM jogadores WHERE id_jogador = $1', [id_jogador]);
        if (verificar.rows.length === 0) return notFound(res, 'Jogador nao existe');

        await BD.query('DELETE FROM jogadores WHERE id_jogador = $1', [id_jogador]);
        return ok(res, { message: 'Jogador removido com sucesso' });
    } catch (error) {
        console.error('Erro ao remover jogador', error.message);
        return res.status(500).json({ error: 'Erro ao remover jogador' })
    }
});

router.post('/jogadores', autenticarToken, async (req, res) => {
    const { nome, id_time } = req.body;
    try {
        if (!nome || !id_time) return badRequest(res, 'Campos obrigatorios ausentes');

        const jogadorExistente = await BD.query('SELECT * FROM jogadores WHERE nome = $1 AND id_time = $2', [nome, id_time]);
        if (jogadorExistente.rows.length > 0) {
            return conflict(res, 'Jogador ja existe');
        }

        const comando = `INSERT INTO jogadores(nome, id_time) VALUES($1, $2)`;
        const valores = [nome, id_time];
        await BD.query(comando, valores);
        return created(res, 'Jogador cadastrado com sucesso');
    } catch (error) {
        console.error('Erro ao cadastrar jogador', error.message);
        return serverError(res, 'Erro ao cadastrar jogador');
    }
});

export default router;