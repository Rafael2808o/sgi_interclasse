import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";
import { ok, created, badRequest, notFound, conflict, serverError } from "../../utils/responses.js";

const router = Router();

router.get('/eventos', autenticarToken, async (req, res) => {
    try {
        const query = `SELECT * FROM eventos ORDER BY id_evento`;
        const eventos = await BD.query(query);
        return ok(res, eventos.rows);
    } catch (error) {
        console.error('Erro ao listar eventos', error.message);
        return serverError(res, 'Erro ao listar eventos');
    }
});

router.get('/eventos/:id_evento', autenticarToken, async (req, res) => {
    const { id_evento } = req.params;
    try {
        const evento = await BD.query('SELECT * FROM eventos WHERE id_evento = $1', [id_evento]);
        if (evento.rows.length === 0) return notFound(res, 'Evento nao existe');
        return ok(res, evento.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar evento', error.message);
        return serverError(res, 'Erro ao buscar evento');
    }
});

router.put('/eventos/:id_evento', autenticarToken, async (req, res) => {
    const { id_evento } = req.params;
    const { tipo_evento, id_time, id_jogador, id_partida } = req.body;
    try {
        const verificar = await BD.query('SELECT * FROM eventos WHERE id_evento = $1', [id_evento]);
        if (verificar.rows.length === 0) return notFound(res, 'Evento nao existe');

        const comando = `UPDATE eventos SET tipo_evento = $1, id_time = $2, id_jogador = $3, id_partida = $4 WHERE id_evento = $5`;
        const valores = [tipo_evento, id_time, id_jogador, id_partida, id_evento];
        await BD.query(comando, valores);
        return ok(res, { message: 'Evento atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar evento', error.message);
        return serverError(res, 'Erro ao atualizar evento');
    }
});

router.delete('/eventos/:id_evento', autenticarToken, async (req, res) => {
    const { id_evento } = req.params;
    try {
        const verificar = await BD.query('SELECT * FROM eventos WHERE id_evento = $1', [id_evento]);
        if (verificar.rows.length === 0) return notFound(res, 'Evento nao existe');

        await BD.query('DELETE FROM eventos WHERE id_evento = $1', [id_evento]);
        return ok(res, { message: 'Evento removido com sucesso' });
    } catch (error) {
        console.error('Erro ao remover evento', error.message);
        return serverError(res, 'Erro ao remover evento');
    }
});

router.post('/eventos', autenticarToken, async (req, res) => {
    const { tipo_evento, id_time, id_jogador, id_partida } = req.body;
    try {
        if (!tipo_evento) return badRequest(res, 'Campo tipo_evento obrigatorio');

        const eventoExistente = await BD.query('SELECT * FROM eventos WHERE tipo_evento = $1 AND id_time = $2 AND id_jogador = $3 AND id_partida = $4', [tipo_evento, id_time, id_jogador, id_partida]);
        if (eventoExistente.rows.length > 0) {
            return conflict(res, 'Evento ja existe');
        }

        const comando = `INSERT INTO eventos(tipo_evento, id_time, id_jogador, id_partida) VALUES($1, $2, $3, $4)`;
        const valores = [tipo_evento, id_time, id_jogador, id_partida];
        await BD.query(comando, valores);
        return created(res, 'Evento cadastrado com sucesso');
    } catch (error) {
        console.error('Erro ao cadastrar evento', error.message);
        return serverError(res, 'Erro ao cadastrar evento');
    }
});

export default router;