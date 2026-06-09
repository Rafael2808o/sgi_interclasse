import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();

router.get('/times', autenticarToken, async (req, res) => {
    try {
        const query = `SELECT * FROM times ORDER BY id_time`;
        const times = await BD.query(query);
        return res.status(200).json(times.rows);
    } catch (error) {
        console.error('Erro ao listar times', error.message);
        return res.status(500).json({ error: 'Erro ao listar times' })
    }
});

router.get('/times/:id_time', autenticarToken, async (req, res) => {
    const { id_time } = req.params;
    try {
        const time = await BD.query('SELECT * FROM times WHERE id_time = $1', [id_time]);
        if (time.rows.length === 0) return res.status(404).json({ message: 'Time não encontrado' });
        return res.status(200).json(time.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar time', error.message);
        return res.status(500).json({ error: 'Erro ao buscar time' })
    }
});

router.put('/times/:id_time', autenticarToken, async (req, res) => {
    const { id_time } = req.params;
    const { nome, foto, id_campeonato, cor } = req.body;
    try {
        const verificar = await BD.query('SELECT * FROM times WHERE id_time = $1', [id_time]);
        if (verificar.rows.length === 0) return res.status(404).json({ message: 'Time não encontrado' });

        const comando = `UPDATE times SET nome = $1, foto = $2, id_campeonato = $3, cor = $4 WHERE id_time = $5`;
        const valores = [nome, foto, id_campeonato, cor, id_time];
        await BD.query(comando, valores);
        return res.status(200).json({ message: 'Time atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar time', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar time' })
    }
});

router.delete('/times/:id_time', autenticarToken, async (req, res) => {
    const { id_time } = req.params;
    try {
        await BD.query('DELETE FROM times WHERE id_time = $1', [id_time]);
        return res.status(200).json({ message: 'Time removido com sucesso' });
    } catch (error) {
        console.error('Erro ao remover time', error.message);
        return res.status(500).json({ error: 'Erro ao remover time' })
    }
});

router.post('/times', autenticarToken, async (req, res) => {
    const { nome, foto, id_campeonato, cor } = req.body;
    try {
        if (!nome) return res.status(400).json({ message: 'Campo obrigatório: nome' });

        const comando = `INSERT INTO times(nome, foto, id_campeonato, cor) VALUES($1, $2, $3, $4)`;
        const valores = [nome, foto, id_campeonato, cor];
        await BD.query(comando, valores);
        return res.status(201).json({ message: 'Time cadastrado com sucesso' });
    } catch (error) {
        console.error('Erro ao cadastrar time', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar time' })
    }
});

export default router;
