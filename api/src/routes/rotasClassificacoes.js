import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();

router.get('/classificacoes', autenticarToken, async (req, res) => {
    try {
        const query = `SELECT * FROM classificacoes ORDER BY id_classificacao`;
        const rows = await BD.query(query);
        return res.status(200).json(rows.rows);
    } catch (error) {
        console.error('Erro ao listar classificacoes', error.message);
        return res.status(500).json({ error: 'Erro ao listar classificacoes' })
    }
});

router.get('/classificacoes/:id_classificacao', autenticarToken, async (req, res) => {
    const { id_classificacao } = req.params;
    try {
        const row = await BD.query('SELECT * FROM classificacoes WHERE id_classificacao = $1', [id_classificacao]);
        if (row.rows.length === 0) return res.status(404).json({ message: 'Classificação não encontrada' });
        return res.status(200).json(row.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar classificacao', error.message);
        return res.status(500).json({ error: 'Erro ao buscar classificacao' })
    }
});

router.put('/classificacoes/:id_classificacao', autenticarToken, async (req, res) => {
    const { id_classificacao } = req.params;
    const { id_time, pontos, jogos, vitorias, empates, derrotas, saldo_gols, id_campeonato } = req.body;
    try {
        const verificar = await BD.query('SELECT * FROM classificacoes WHERE id_classificacao = $1', [id_classificacao]);
        if (verificar.rows.length === 0) return res.status(404).json({ message: 'Classificação não encontrada' });

        const comando = `UPDATE classificacoes SET id_time = $1, pontos = $2, jogos = $3, vitorias = $4, empates = $5, derrotas = $6, saldo_gols = $7, id_campeonato = $8 WHERE id_classificacao = $9`;
        const valores = [id_time, pontos, jogos, vitorias, empates, derrotas, saldo_gols, id_campeonato, id_classificacao];
        await BD.query(comando, valores);
        return res.status(200).json({ message: 'Classificação atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar classificacao', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar classificacao' })
    }
});

router.delete('/classificacoes/:id_classificacao', autenticarToken, async (req, res) => {
    const { id_classificacao } = req.params;
    try {
        await BD.query('DELETE FROM classificacoes WHERE id_classificacao = $1', [id_classificacao]);
        return res.status(200).json({ message: 'Classificação removida com sucesso' });
    } catch (error) {
        console.error('Erro ao remover classificacao', error.message);
        return res.status(500).json({ error: 'Erro ao remover classificacao' })
    }
});

router.post('/classificacoes', autenticarToken, async (req, res) => {
    const { id_time, pontos, jogos, vitorias, empates, derrotas, saldo_gols, id_campeonato } = req.body;
    try {
        if (!id_time || id_campeonato === undefined) return res.status(400).json({ message: 'Campos obrigatórios: id_time, id_campeonato' });

        const comando = `INSERT INTO classificacoes(id_time, pontos, jogos, vitorias, empates, derrotas, saldo_gols, id_campeonato) VALUES($1,$2,$3,$4,$5,$6,$7,$8)`;
        const valores = [id_time, pontos, jogos, vitorias, empates, derrotas, saldo_gols, id_campeonato];
        await BD.query(comando, valores);
        return res.status(201).json({ message: 'Classificação cadastrada com sucesso' });
    } catch (error) {
        console.error('Erro ao cadastrar classificacao', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar classificacao' })
    }
});

export default router;
