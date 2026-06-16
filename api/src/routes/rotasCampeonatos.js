import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";
import { ok, created, badRequest, notFound, conflict, serverError } from "../../utils/responses.js";

const router = Router();

router.get('/campeonatos', autenticarToken, async (req, res) => {
    try {
        const query = `SELECT * FROM campeonatos ORDER BY id_campeonato`;
        const rows = await BD.query(query);
        return ok(res, rows.rows);
    } catch (error) {
        console.error('Erro ao listar campeonatos', error.message);
        return serverError(res, 'Erro ao listar campeonatos');
    }
});

router.get('/campeonatos/:id_campeonato', autenticarToken, async (req, res) => {
    const { id_campeonato } = req.params;
    try {
        const row = await BD.query('SELECT * FROM campeonatos WHERE id_campeonato = $1', [id_campeonato]);
        if (row.rows.length === 0) return notFound(res, 'Campeonato nao existe');
        return ok(res, row.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar campeonato', error.message);
        return serverError(res, 'Erro ao buscar campeonato');
    }
});

router.put('/campeonatos/:id_campeonato', autenticarToken, async (req, res) => {
    const { id_campeonato } = req.params;
    const { nome, formato, data_inicio, data_fim, id_usuario, qtd_times, modalidade } = req.body;
    try {
        const verificar = await BD.query('SELECT * FROM campeonatos WHERE id_campeonato = $1', [id_campeonato]);
        if (verificar.rows.length === 0) return notFound(res, 'Campeonato nao existe');

        const comando = `UPDATE campeonatos SET nome = $1, formato = $2, data_inicio = $3, data_fim = $4, id_usuario = $5, qtd_times = $6, modalidade = $7 WHERE id_campeonato = $8`;
        const valores = [nome, formato, data_inicio, data_fim, id_usuario, qtd_times, modalidade, id_campeonato];
        await BD.query(comando, valores);
        return ok(res, { message: 'Campeonato atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar campeonato', error.message);
        return serverError(res, 'Erro ao atualizar campeonato');
    }
});

router.delete('/campeonatos/:id_campeonato', autenticarToken, async (req, res) => {
    const { id_campeonato } = req.params;
    try {
        const verificar = await BD.query('SELECT * FROM campeonatos WHERE id_campeonato = $1', [id_campeonato]);
        if (verificar.rows.length === 0) return notFound(res, 'Campeonato nao existe');

        await BD.query('DELETE FROM campeonatos WHERE id_campeonato = $1', [id_campeonato]);
        return ok(res, { message: 'Campeonato removido com sucesso' });
    } catch (error) {
        console.error('Erro ao remover campeonato', error.message);
        return serverError(res, 'Erro ao remover campeonato');
    }
});

router.post('/campeonatos', autenticarToken, async (req, res) => {
    const { nome, formato, data_inicio, data_fim, id_usuario, qtd_times, modalidade } = req.body;
    try {
        if (!nome) return badRequest(res, 'Campo nome obrigatorio');

        const campeonatoExistente = await BD.query('SELECT * FROM campeonatos WHERE nome = $1', [nome]);
        if (campeonatoExistente.rows.length > 0) {
            return conflict(res, 'Campeonato ja existe');
        }

        const comando = `INSERT INTO campeonatos(nome, formato, data_inicio, data_fim, id_usuario, qtd_times, modalidade) VALUES($1,$2,$3,$4,$5,$6,$7)`;
        const valores = [nome, formato, data_inicio, data_fim, id_usuario, qtd_times, modalidade];
        await BD.query(comando, valores);
        return created(res, 'Campeonato cadastrado com sucesso');
    } catch (error) {
        console.error('Erro ao cadastrar campeonato', error.message);
        return serverError(res, 'Erro ao cadastrar campeonato');
    }
});

export default router;