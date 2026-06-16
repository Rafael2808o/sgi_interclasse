import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";
import { ok, created, badRequest, notFound, conflict, serverError } from "../../utils/responses.js";

const router = Router();

router.get('/grupos', autenticarToken, async (req, res) => {
    try {
        const query = `SELECT * FROM grupos ORDER BY id_grupo`;
        const grupos = await BD.query(query);
        return ok(res, grupos.rows);
    } catch (error) {
        console.error('Erro ao listar grupos', error.message);
        return serverError(res, 'Erro ao listar grupos');
    }
});

router.get('/grupos/:id_grupo', autenticarToken, async (req, res) => {
    const { id_grupo } = req.params;
    try {
        const grupo = await BD.query('SELECT * FROM grupos WHERE id_grupo = $1', [id_grupo]);
        if (grupo.rows.length === 0) return notFound(res, 'Grupo nao existe');
        return ok(res, grupo.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar grupo', error.message);
        return serverError(res, 'Erro ao buscar grupo');
    }
});

router.put('/grupos/:id_grupo', autenticarToken, async (req, res) => {
    const { id_grupo } = req.params;
    const { nome, id_campeonato } = req.body;

    try {
        const verificar = await BD.query(
            'SELECT * FROM grupos WHERE id_grupo = $1',
            [id_grupo]
        );

        if (verificar.rows.length === 0) {
            return notFound(res, 'Grupo nao existe');
        }

        if (!nome) {
            return badRequest(res, 'Campo nome obrigatório');
        }

        if (!id_campeonato) {
            return badRequest(res, 'Campo id_campeonato obrigatório');
        }

        // Verifica se o campeonato existe
        const campeonato = await BD.query(
            'SELECT * FROM campeonatos WHERE id_campeonato = $1',
            [id_campeonato]
        );

        if (campeonato.rows.length === 0) {
            return badRequest(res, 'Campeonato não existe');
        }

        // Verifica se já existe outro grupo com o mesmo nome
        const grupoExistente = await BD.query(
            `SELECT * FROM grupos
             WHERE nome = $1
             AND id_campeonato = $2
             AND id_grupo <> $3`,
            [nome, id_campeonato, id_grupo]
        );

        if (grupoExistente.rows.length > 0) {
            return conflict(
                res,
                'Já existe um grupo com esse nome neste campeonato'
            );
        }

        const comando = `
            UPDATE grupos
            SET nome = $1, id_campeonato = $2
            WHERE id_grupo = $3
        `;

        await BD.query(comando, [nome, id_campeonato, id_grupo]);

        return ok(res, {
            message: 'Grupo atualizado com sucesso'
        });

    } catch (error) {
        console.error('Erro ao atualizar grupo', error.message);

        if (error.code === '23503') {
            return badRequest(res, 'Campeonato não existe');
        }

        return serverError(res, 'Erro ao atualizar grupo');
    }
});

router.delete('/grupos/:id_grupo', autenticarToken, async (req, res) => {
    const { id_grupo } = req.params;
    try {
        const verificar = await BD.query('SELECT * FROM grupos WHERE id_grupo = $1', [id_grupo]);
        if (verificar.rows.length === 0) return notFound(res, 'Grupo nao existe');

        await BD.query('DELETE FROM grupos WHERE id_grupo = $1', [id_grupo]);
        return ok(res, { message: 'Grupo removido com sucesso' });
    } catch (error) {
        console.error('Erro ao remover grupo', error.message);
        return serverError(res, 'Erro ao remover grupo');
    }
});

router.post('/grupos', autenticarToken, async (req, res) => {
    const { nome, id_campeonato } = req.body;

    try {
        if (!nome) {
            return badRequest(res, 'Campo nome obrigatório');
        }

        if (!id_campeonato) {
            return badRequest(res, 'Campo id_campeonato obrigatório');
        }

        // Verifica se o campeonato existe
        const campeonato = await BD.query(
            'SELECT * FROM campeonatos WHERE id_campeonato = $1',
            [id_campeonato]
        );

        if (campeonato.rows.length === 0) {
            return badRequest(res, 'Campeonato não existe');
        }

        // Verifica se já existe grupo com o mesmo nome no campeonato
        const grupoExistente = await BD.query(
            'SELECT * FROM grupos WHERE nome = $1 AND id_campeonato = $2',
            [nome, id_campeonato]
        );

        if (grupoExistente.rows.length > 0) {
            return conflict(
                res,
                'Já existe um grupo com esse nome neste campeonato'
            );
        }

        const comando = `
            INSERT INTO grupos(nome, id_campeonato)
            VALUES($1, $2)
        `;

        await BD.query(comando, [nome, id_campeonato]);

        return created(res, 'Grupo cadastrado com sucesso');

    } catch (error) {
        console.error('Erro ao cadastrar grupo', error.message);

        if (error.code === '23503') {
            return badRequest(res, 'Campeonato não existe');
        }

        return serverError(res, 'Erro ao cadastrar grupo');
    }
});

export default router;