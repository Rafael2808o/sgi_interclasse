import jwt from 'jsonwebtoken';

const SECRET_KEY = 'sua_chave_secreta';

export const autenticarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'erro ao autenticar: token não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'token não fornecido' });
    }

    jwt.verify(token, SECRET_KEY, (erro, usuario) => {
        if (erro) {
            return res.status(401).json({ message: 'erro ao autenticar: token inválido' });
        }

        req.usuario = usuario;
        next();
    });
};