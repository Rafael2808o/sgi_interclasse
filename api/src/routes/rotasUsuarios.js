import { Router } from "express";
import { BD } from "../../db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { autenticarToken } from "../middlewares/autenticacao.js";

const SECRET_KEY = "sua_chave_secreta";

const router = Router();

router.get('/usuarios', autenticarToken, async (req, res) => {
    try {
        const query = `SELECT * FROM usuarios ORDER BY id_usuario`;
        const usuarios = await BD.query(query);
        return res.status(200).json(usuarios.rows);
    } catch (error) {
        console.error('Erro ao listar usuarios', error.message);
        return res.status(500).json({ error: 'Erro ao listar usuarios' })
    }
});

router.get('/usuarios/:id_usuario', autenticarToken, async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const usuario = await BD.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id_usuario]);
        if (usuario.rows.length === 0) return res.status(404).json({ message: 'Usuario não encontrado' });
        return res.status(200).json(usuario.rows[0]);
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
        if (verificar.rows.length === 0) return res.status(404).json({ message: 'Usuario não encontrado' });

        const saltRounds = 10;
        const senhaHashed = senha ? await bcrypt.hash(senha, saltRounds) : verificar.rows[0].senha;

        const comando = `UPDATE usuarios SET nome = $1, email = $2, senha = $3, tipo = $4 WHERE id_usuario = $5`;
        const valores = [nome, email, senhaHashed, tipo, id_usuario];
        await BD.query(comando, valores);
        return res.status(200).json({ message: 'Usuario atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar usuario', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar usuario' })
    }
});

router.delete('/usuarios/:id_usuario', autenticarToken, async (req, res) => {
    const { id_usuario } = req.params;
    try {
        await BD.query('DELETE FROM usuarios WHERE id_usuario = $1', [id_usuario]);
        return res.status(200).json({ message: 'Usuario removido com sucesso' });
    } catch (error) {
        console.error('Erro ao remover usuario', error.message);
        return res.status(500).json({ error: 'Erro ao remover usuario' })
    }
});

router.post('/usuarios', async (req, res) => {
    const { nome, email, senha, tipo } = req.body;
    try {
        if (!nome || !email || !senha) return res.status(400).json({ message: 'Campos obrigatórios: nome, email, senha' });

        const saltRounds = 10;
        const senhaHashed = await bcrypt.hash(senha, saltRounds);

        const comando = `INSERT INTO usuarios(nome, email, senha, tipo) VALUES($1, $2, $3, $4)`;
        const valores = [nome, email, senhaHashed, tipo];
        await BD.query(comando, valores);
        return res.status(201).json({ message: 'Usuario cadastrado com sucesso' });
    } catch (error) {
        console.error('Erro ao cadastrar usuario', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar usuario' })
    }
});

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
        const comando = 'SELECT id_usuario, nome, email, senha FROM USUARIOS WHERE email = $1';
        const resultado = await BD.query(comando, [email]);

        if (resultado.rows.length === 0) {
            return res.status(401).json({ message: 'Email nao encontrado.' });
        }

        const usuario = resultado.rows[0];
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ message: 'Senha inválida.' });
        }

        const token = jwt.sign({ id_usuario: usuario.id_usuario }, SECRET_KEY);

        return res.status(200).json({
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
        return res.status(500).json({ message: 'Erro interno do servidor: ' + error.message });
    }
};

router.post('/usuarios/login', loginUsuario);
router.post('/login', loginUsuario);

export default router;