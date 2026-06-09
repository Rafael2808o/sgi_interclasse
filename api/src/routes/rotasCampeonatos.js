import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();

router.get('/campeonatos', autenticarToken, async (req, res) => {
    try {
        const query = `SELECT * FROM campeonatos ORDER BY id_campeonato`;
        const rows = await BD.query(query);
        return res.status(200).json(rows.rows);
    } catch (error) {
        console.error('Erro ao listar campeonatos', error.message);
        return res.status(500).json({ error: 'Erro ao listar campeonatos' })
    }
});

router.get('/campeonatos/:id_campeonato', autenticarToken, async (req, res) => {
    const { id_campeonato } = req.params;
    try {
        const row = await BD.query('SELECT * FROM campeonatos WHERE id_campeonato = $1', [id_campeonato]);
        if (row.rows.length === 0) return res.status(404).json({ message: 'Campeonato não encontrado' });
        return res.status(200).json(row.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar campeonato', error.message);
        return res.status(500).json({ error: 'Erro ao buscar campeonato' })
    }
});

router.put('/campeonatos/:id_campeonato', autenticarToken, async (req, res) => {
    const { id_campeonato } = req.params;
    const { nome, formato, data_inicio, data_fim, id_usuario, qtd_times, modalidade } = req.body;
    try {
        const verificar = await BD.query('SELECT * FROM campeonatos WHERE id_campeonato = $1', [id_campeonato]);
        if (verificar.rows.length === 0) return res.status(404).json({ message: 'Campeonato não encontrado' });

        const comando = `UPDATE campeonatos SET nome = $1, formato = $2, data_inicio = $3, data_fim = $4, id_usuario = $5, qtd_times = $6, modalidade = $7 WHERE id_campeonato = $8`;
        const valores = [nome, formato, data_inicio, data_fim, id_usuario, qtd_times, modalidade, id_campeonato];
        await BD.query(comando, valores);
        return res.status(200).json({ message: 'Campeonato atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar campeonato', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar campeonato' })
    }
});

router.delete('/campeonatos/:id_campeonato', autenticarToken, async (req, res) => {
    const { id_campeonato } = req.params;
    try {
        await BD.query('DELETE FROM campeonatos WHERE id_campeonato = $1', [id_campeonato]);
        return res.status(200).json({ message: 'Campeonato removido com sucesso' });
    } catch (error) {
        console.error('Erro ao remover campeonato', error.message);
        return res.status(500).json({ error: 'Erro ao remover campeonato' })
    }
});

router.post('/campeonatos', autenticarToken, async (req, res) => {
    const { nome, formato, data_inicio, data_fim, id_usuario, qtd_times, modalidade } = req.body;
    try {
        if (!nome) return res.status(400).json({ message: 'Campo obrigatório: nome' });

        const comando = `INSERT INTO campeonatos(nome, formato, data_inicio, data_fim, id_usuario, qtd_times, modalidade) VALUES($1,$2,$3,$4,$5,$6,$7)`;
        const valores = [nome, formato, data_inicio, data_fim, id_usuario, qtd_times, modalidade];
        await BD.query(comando, valores);
        return res.status(201).json({ message: 'Campeonato cadastrado com sucesso' });
    } catch (error) {
        console.error('Erro ao cadastrar campeonato', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar campeonato' })
    }
});

export default router;
