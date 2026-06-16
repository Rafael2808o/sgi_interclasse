import { Router } from "express";
import { BD } from "../../db.js";
import bcrypt from 'bcrypt';
import { autenticarToken } from "../middlewares/autenticacao.js";
import { ok, created, badRequest, notFound, conflict, serverError, unauthorized } from "../utils/responses.js";
import jwt from 'jsonwebtoken';

const SECRET_KEY = "sua_chave_secreta";

const router = Router();

router.get('/usuarios', autenticarToken, async (req, res) => {
    try {
        const query = `SELECT * FROM usuarios ORDER BY id_usuario`;
        const usuarios = await BD.query(query);
        return ok(res, usuarios.rows);
    } catch (error) {
        console.error('Erro ao listar usuarios', error.message);
        return res.status(500).json({ error: 'Erro ao listar usuarios' })
    }
});

router.get('/usuarios/:id_usuario', autenticarToken, async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const usuario = await BD.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id_usuario]);
        if (usuario.rows.length === 0) return notFound(res, 'Usuario não existe');
        return ok(res, usuario.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar usuario', error.message);
        return res.status(500).json({ error: 'Erro ao buscar usuario' })
    }
});

router.put('/usuarios/:id_usuario', autenticarToken, async (req, res) => {
    const { id_usuario } = req.params;
    const { nome, email, senha, tipo } = req.body;
    try {
        const verificar = await BD.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id_usuario]);
        if (verificar.rows.length === 0) return notFound(res, 'Usuario não existe');

        const saltRounds = 10;
        const senhaHashed = senha ? await bcrypt.hash(senha, saltRounds) : verificar.rows[0].senha;

        const comando = `UPDATE usuarios SET nome = $1, email = $2, senha = $3, tipo = $4 WHERE id_usuario = $5`;
        const valores = [nome, email, senhaHashed, tipo, id_usuario];
        await BD.query(comando, valores);
        return ok(res, { message: 'Usuario atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar usuario', error.message);
        return serverError(res, 'Erro ao atualizar usuario');
    }
});

router.delete('/usuarios/:id_usuario', autenticarToken, async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const verificar = await BD.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id_usuario]);
        if (verificar.rows.length === 0) return notFound(res, 'Usuario não existe');

        await BD.query('DELETE FROM usuarios WHERE id_usuario = $1', [id_usuario]);
        return ok(res, { message: 'Usuario removido com sucesso' });
    } catch (error) {
        console.error('Erro ao remover usuario', error.message);
        return res.status(500).json({ error: 'Erro ao remover usuario' })
    }
});

router.post('/usuarios', async (req, res) => {
    const { nome, email, senha, tipo } = req.body;
    try {
        // Verificar token: rota documentada sem cadeado, mas bloqueada se não houver token válido
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return unauthorized(res, 'Token não fornecido');
        }

        const token = authHeader.split(' ')[1];
        try {
            jwt.verify(token, SECRET_KEY);
        } catch (err) {
            return unauthorized(res, 'Token inválido');
        }

        if (!nome || !email || !senha) return badRequest(res, 'Campos obrigatorios ausentes');

        const usuarioExistente = await BD.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (usuarioExistente.rows.length > 0) {
            return conflict(res, 'Usuario ja existe');
        }

        const saltRounds = 10;
        const senhaHashed = await bcrypt.hash(senha, saltRounds);

        const comando = `INSERT INTO usuarios(nome, email, senha, tipo) VALUES($1, $2, $3, $4)`;
        const valores = [nome, email, senhaHashed, tipo];
        await BD.query(comando, valores);
        return created(res, 'Usuario cadastrado com sucesso');
    } catch (error) {
        console.error('Erro ao cadastrar usuario', error.message);
        return serverError(res, 'Erro ao cadastrar usuario');
    }
});

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return badRequest(res, 'Email e senha sao obrigatorios');
    }

    try {
        const comando = 'SELECT id_usuario, nome, email, senha FROM USUARIOS WHERE email = $1';
        const resultado = await BD.query(comando, [email]);

        if (resultado.rows.length === 0) {
            return notFound(res, 'Email nao encontrado');
        }

        const usuario = resultado.rows[0];
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return badRequest(res, 'Senha invalida');
        }

        const token = jwt.sign({ id_usuario: usuario.id_usuario }, SECRET_KEY);

        return ok(res, {
            message: 'Login realizado com sucesso',
            token,
            usuario: {
                id_usuario: usuario.id_usuario,
                nome: usuario.nome,
                email: usuario.email
            }
        });
    } catch (error) {
        console.error('Erro ao efetuar login', error.message);
        return serverError(res, 'Erro interno do servidor');
    }
};

router.post('/usuarios/login', loginUsuario);
router.post('/login', loginUsuario);

export default router;