import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();

router.get('/grupos', autenticarToken, async (req, res) => {
    try {
        const query = `SELECT * FROM grupos ORDER BY id_grupo`;
        const grupos = await BD.query(query);
        return res.status(200).json(grupos.rows);
    } catch (error) {
        console.error('Erro ao listar grupos', error.message);
        return res.status(500).json({ error: 'Erro ao listar grupos' })
    }
});

router.get('/grupos/:id_grupo', autenticarToken, async (req, res) => {
    const { id_grupo } = req.params;
    try {
        const grupo = await BD.query('SELECT * FROM grupos WHERE id_grupo = $1', [id_grupo]);
        if (grupo.rows.length === 0) return res.status(404).json({ message: 'Grupo não encontrado' });
        return res.status(200).json(grupo.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar grupo', error.message);
        return res.status(500).json({ error: 'Erro ao buscar grupo' })
    }
});

router.put('/grupos/:id_grupo', autenticarToken, async (req, res) => {
    const { id_grupo } = req.params;
    const { nome, id_campeonato } = req.body;
    try {
        const verificar = await BD.query('SELECT * FROM grupos WHERE id_grupo = $1', [id_grupo]);
        if (verificar.rows.length === 0) return res.status(404).json({ message: 'Grupo não encontrado' });

        const comando = `UPDATE grupos SET nome = $1, id_campeonato = $2 WHERE id_grupo = $3`;
        const valores = [nome, id_campeonato, id_grupo];
        await BD.query(comando, valores);
        return res.status(200).json({ message: 'Grupo atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar grupo', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar grupo' })
    }
});

router.delete('/grupos/:id_grupo', autenticarToken, async (req, res) => {
    const { id_grupo } = req.params;
    try {
        await BD.query('DELETE FROM grupos WHERE id_grupo = $1', [id_grupo]);
        return res.status(200).json({ message: 'Grupo removido com sucesso' });
    } catch (error) {
        console.error('Erro ao remover grupo', error.message);
        return res.status(500).json({ error: 'Erro ao remover grupo' })
    }
});

router.post('/grupos', autenticarToken, async (req, res) => {
    const { nome, id_campeonato } = req.body;
    try {
        if (!nome || !id_campeonato) return res.status(400).json({ message: 'Campos obrigatórios: nome, id_campeonato' });

        const comando = `INSERT INTO grupos(nome, id_campeonato) VALUES($1, $2)`;
        const valores = [nome, id_campeonato];
        await BD.query(comando, valores);
        return res.status(201).json({ message: 'Grupo cadastrado com sucesso' });
    } catch (error) {
        console.error('Erro ao cadastrar grupo', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar grupo' })
    }
});

export default router;
