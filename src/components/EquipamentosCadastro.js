import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Importe o contexto de autenticação

const EquipamentosCadastro = () => {
    const { token } = useAuth(); // Pegue o token do AuthContext
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            nome: "",
            setor: "",
            dataDeFabricacao: ""
        },
        validationSchema: Yup.object({
            nome: Yup.string().required("Nome é obrigatório").max(100, "Máximo de 100 caracteres"),
            setor: Yup.string().required("Setor é obrigatório").max(50, "Máximo de 50 caracteres"),
            dataDeFabricacao: Yup.date().required("Data de fabricação é obrigatória")
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.post("http://localhost:8080/api/equipamentos", values, {
                    headers: { Authorization: {token} } // Use o token do contexto
                });
                alert("Equipamento cadastrado com sucesso!");
                formik.resetForm();
            } catch (err) {
                setError("Erro ao cadastrar equipamento");
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Cadastro de Equipamento
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Nome"
                    name="nome"
                    value={formik.values.nome}
                    onChange={formik.handleChange}
                    error={formik.touched.nome && Boolean(formik.errors.nome)}
                    helperText={formik.touched.nome && formik.errors.nome}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Setor"
                    name="setor"
                    value={formik.values.setor}
                    onChange={formik.handleChange}
                    error={formik.touched.setor && Boolean(formik.errors.setor)}
                    helperText={formik.touched.setor && formik.errors.setor}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Data de Fabricação"
                    type="date"
                    name="dataDeFabricacao"
                    InputLabelProps={{ shrink: true }}
                    value={formik.values.dataDeFabricacao}
                    onChange={formik.handleChange}
                    error={formik.touched.dataDeFabricacao && Boolean(formik.errors.dataDeFabricacao)}
                    helperText={formik.touched.dataDeFabricacao && formik.errors.dataDeFabricacao}
                />
                <Button color="primary" variant="contained" fullWidth type="submit" disabled={loading}>
                    {loading ? "Salvando..." : "Cadastrar"}
                </Button>
                {error && <Typography color="error" mt={2}>{error}</Typography>}
            </form>
        </Container>
    );
};

export default EquipamentosCadastro;
