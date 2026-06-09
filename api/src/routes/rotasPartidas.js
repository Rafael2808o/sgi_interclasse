import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();

router.get('/partidas', autenticarToken, async (req, res) => {
    try {
        const query = `SELECT * FROM partidas ORDER BY id_partida`;
        const partidas = await BD.query(query);
        return res.status(200).json(partidas.rows);
    } catch (error) {
        console.error('Erro ao listar partidas', error.message);
        return res.status(500).json({ error: 'Erro ao listar partidas' })
    }
});

router.get('/partidas/:id_partida', autenticarToken, async (req, res) => {
    const { id_partida } = req.params;
    try {
        const partida = await BD.query('SELECT * FROM partidas WHERE id_partida = $1', [id_partida]);
        if (partida.rows.length === 0) return res.status(404).json({ message: 'Partida não encontrada' });
        return res.status(200).json(partida.rows[0]);
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
        if (verificar.rows.length === 0) return res.status(404).json({ message: 'Partida não encontrada' });

        const comando = `UPDATE partidas SET data = $1, horario = $2, status = $3, id_time_a = $4, id_time_b = $5, id_campeonato = $6, id_grupo = $7, pontos_time_a = $8, pontos_time_b = $9, fase = $10 WHERE id_partida = $11`;
        const valores = [data, horario, status, id_time_a, id_time_b, id_campeonato, id_grupo, pontos_time_a, pontos_time_b, fase, id_partida];
        await BD.query(comando, valores);
        return res.status(200).json({ message: 'Partida atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar partida', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar partida' })
    }
});

router.delete('/partidas/:id_partida', autenticarToken, async (req, res) => {
    const { id_partida } = req.params;
    try {
        await BD.query('DELETE FROM partidas WHERE id_partida = $1', [id_partida]);
        return res.status(200).json({ message: 'Partida removida com sucesso' });
    } catch (error) {
        console.error('Erro ao remover partida', error.message);
        return res.status(500).json({ error: 'Erro ao remover partida' })
    }
});

router.post('/partidas', autenticarToken, async (req, res) => {
    const { data, horario, status, id_time_a, id_time_b, id_campeonato, id_grupo, pontos_time_a, pontos_time_b, fase } = req.body;
    try {
        if (!data || !horario || !id_time_a || !id_time_b) return res.status(400).json({ message: 'Campos obrigatórios: data, horario, id_time_a, id_time_b' });

        const comando = `INSERT INTO partidas(data, horario, status, id_time_a, id_time_b, id_campeonato, id_grupo, pontos_time_a, pontos_time_b, fase) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;
        const valores = [data, horario, status, id_time_a, id_time_b, id_campeonato, id_grupo, pontos_time_a, pontos_time_b, fase];
        await BD.query(comando, valores);
        return res.status(201).json({ message: 'Partida cadastrada com sucesso' });
    } catch (error) {
        console.error('Erro ao cadastrar partida', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar partida' })
    }
});

export default router;
