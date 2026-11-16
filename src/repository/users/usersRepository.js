/*
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nomeUsuario VARCHAR(100) NOT NULL,
    emailUsuario VARCHAR(150) NOT NULL,
    senhaHash VARCHAR(255) NOT NULL,
    perfilAcesso VARCHAR(50)
*/

import { connection } from '../../config/database.js'

export async function criarUsuario(usuarioData) {
    const pool = await connection();
    const { idUsuario, nomeUsuario, emailUsuario, senhaHash, perfilAcesso } = usuarioData;

    const query = `
        INSERT INTO tbUsuario (idUsuario, nomeUsuario, emailUsuario, senhaHash, perfilAcesso)
        VALUES (?, ?, ?, ?, ?)
    `;

    try {
        await pool.execute(query, [idUsuario, nomeUsuario, emailUsuario, senhaHash, perfilAcesso])
        console.log("Usuário criado com sucesso!");
    } catch (error) {
        console.error("Falha ao criar Usuário:", error.message);
        throw error;
    }
}

export async function procurarPorID(usuarioData) {
    const pool = await connection();
    const { idUsuario } = usuarioData;

    const query = `
      SELECT * FROM products WHERE idUsuario = ?
    `;

    try {
        const [rows] = await pool.execute(query, [idUsuario]);
        return rows[0];
    } catch (error) {
        console.error("Falha ao buscar Usuario:", error.message);
        throw error;
    }
}

export async function procurarTodos() {
    const pool = await connection();

    const query = `
      SELECT * FROM tbUsuario
    `;

    try {
        const [rows] = await pool.execute(query);
        return rows;
    } catch (error) {
        console.error("Falha ao buscar todos Usuarios:", error.message);
        throw error;
    } 
}

export async function atualizarPorID(usuarioData) {
    const pool = await connection();
    const { idUsuario, nomeUsuario, emailUsuario, senhaHash, perfilAcesso } = usuarioData;

    const query = `
        UPDATE tbUsuario
        SET nomeUsuario = ?, emailUsuario = ?, senhaHash = ?, perfilAcesso = ?
        WHERE idUsuario = ?
    `;

    try {
        await pool.execute(query, [ nomeUsuario, emailUsuario, senhaHash, perfilAcesso, idUsuario ]);
        console.log("Usuario atualizado com sucesso!");
    } catch (error) {
        console.error("Falha ao atualizar Usuario:", error.message);
        throw error;
    }
}

export async function deletarPorID(usuarioData) {
    const pool = await connection();
    const { idUsuario } = usuarioData;

    const query = `
        DELETE FROM tbUsuario WHERE idUsuario = ?
    `;

    try {
        await pool.execute(query, [idUsuario]);
        console.log("Usuario deletado com sucesso!");
    } catch (error) {
        console.error("Falha ao deletar Usuario:", error.message);
        throw error;
    }
}
