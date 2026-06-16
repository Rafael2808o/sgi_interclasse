import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";
import { ok, created, badRequest, notFound, conflict, serverError } from "../utils/responses.js";

const router = Router();

router.get('/partidas', autenticarToken, async (req, res) => {
    try {
        const query = `SELECT * FROM partidas ORDER BY id_partida`;
        const partidas = await BD.query(query);
        return ok(res, partidas.rows);
    } catch (error) {
        console.error('Erro ao listar partidas', error.message);
        return res.status(500).json({ error: 'Erro ao listar partidas' })
    }
});

router.get('/partidas/:id_partida', autenticarToken, async (req, res) => {
    const { id_partida } = req.params;
    try {
        const partida = await BD.query('SELECT * FROM partidas WHERE id_partida = $1', [id_partida]);
        if (partida.rows.length === 0) return notFound(res, 'Partida nao existe');
        return ok(res, partida.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar partida', error.message);
        return res.status(500).json({ error: 'Erro ao buscar partida' })
    }
});

router.put('/partidas/:id_partida', autenticarToken, async (req, res) => {
    const { id_partida } = req.params;
    const { data, horario, status, id_time_a, id_time_b, id_campeonato, id_grupo, pontos_time_a, pontos_time_b, fase } = req.body;
    try {
        const verificar = await BD.query('SELECT * FROM partidas WHERE id_partida = $1', [id_partida]);
        if (verificar.rows.length === 0) return notFound(res, 'Partida nao existe');

        const comando = `UPDATE partidas SET data = $1, horario = $2, status = $3, id_time_a = $4, id_time_b = $5, id_campeonato = $6, id_grupo = $7, pontos_time_a = $8, pontos_time_b = $9, fase = $10 WHERE id_partida = $11`;
        const valores = [data, horario, status, id_time_a, id_time_b, id_campeonato, id_grupo, pontos_time_a, pontos_time_b, fase, id_partida];
        await BD.query(comando, valores);
        return ok(res, { message: 'Partida atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar partida', error.message);
        return serverError(res, 'Erro ao atualizar partida');
    }
});

router.delete('/partidas/:id_partida', autenticarToken, async (req, res) => {
    const { id_partida } = req.params;
    try {
        const verificar = await BD.query('SELECT * FROM partidas WHERE id_partida = $1', [id_partida]);
        if (verificar.rows.length === 0) return notFound(res, 'Partida nao existe');

        await BD.query('DELETE FROM partidas WHERE id_partida = $1', [id_partida]);
        return ok(res, { message: 'Partida removida com sucesso' });
    } catch (error) {
        console.error('Erro ao remover partida', error.message);
        return res.status(500).json({ error: 'Erro ao remover partida' })
    }
});

router.post('/partidas', autenticarToken, async (req, res) => {
    const { data, horario, status, id_time_a, id_time_b, id_campeonato, id_grupo, pontos_time_a, pontos_time_b, fase } = req.body;
    try {
        if (!data || !horario || !id_time_a || !id_time_b) return badRequest(res, 'Campos obrigatorios ausentes');

        const partidaExistente = await BD.query('SELECT * FROM partidas WHERE data = $1 AND horario = $2 AND id_time_a = $3 AND id_time_b = $4 AND id_campeonato = $5', [data, horario, id_time_a, id_time_b, id_campeonato]);
        if (partidaExistente.rows.length > 0) {
            return conflict(res, 'Partida ja existe');
        }

        const comando = `INSERT INTO partidas(data, horario, status, id_time_a, id_time_b, id_campeonato, id_grupo, pontos_time_a, pontos_time_b, fase) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;
        const valores = [data, horario, status, id_time_a, id_time_b, id_campeonato, id_grupo, pontos_time_a, pontos_time_b, fase];
        await BD.query(comando, valores);
        return created(res, 'Partida cadastrada com sucesso');
    } catch (error) {
        console.error('Erro ao cadastrar partida', error.message);
        return serverError(res, 'Erro ao cadastrar partida');
    }
});

export default router;