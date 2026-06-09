import express from 'express';
import { BD, testarConexao } from './db.js';
import rotasUsuarios from './src/routes/rotasUsuarios.js';
import rotasClassificacoes from './src/routes/rotasClassificacoes.js';
import rotasCampeonatos from './src/routes/rotasCampeonatos.js';
import rotasGrupos from './src/routes/rotasGrupos.js';
import rotasJogadores from './src/routes/rotasJogadores.js';
import rotasTimes from './src/routes/rotasTimes.js';
import rotasPartidas from './src/routes/rotasPartidas.js';
import rotasEventos from './src/routes/rotasEventos.js';
import { autenticarToken } from './src/middlewares/autenticacao.js';

//usando swagger
import swaggerUi from 'swagger-ui-express';
import documentacao from './config/swagger.js';
import cors from 'cors'

const app = express();

// Middlewares na ordem correta
app.use(express.json());
app.use(cors());



// app.use('/swagger', swaggerUi.serve, swaggerUi.setup(documentacao));
app.get('/swagger', (req, res) => {
    res.send(`<!DOCTYPE html>
<html><head>
<title>API Ordens de Serviço</title>
<meta charset="utf-8"/>
<link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css">
</head><body>
<div id="swagger-ui"></div>
<script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
<script>
SwaggerUIBundle({
spec: ${JSON.stringify(documentacao)},
dom_id: '#swagger-ui'})
</script>
</body></html>`);
});

app.get('/', async (req, res) => {
    res.redirect('/swagger')
})

//Utilizando rotas
app.use(rotasUsuarios);
app.use(rotasClassificacoes);
app.use(rotasCampeonatos);
app.use(rotasGrupos);
app.use(rotasJogadores);
app.use(rotasTimes);
app.use(rotasPartidas);
app.use(rotasEventos);

// const porta = 3000;
// app.listen(porta, () =>{
//     console.log(`http://localhost:${porta}`);
// })

export default app;