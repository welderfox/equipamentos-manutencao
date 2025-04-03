import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useApi } from "../services/api";

const Relatorio = () => {
  const [relatorio, setRelatorio] = useState([]);
  const api = useApi();

  useEffect(() => {
    api.get("/relatorio").then((response) => {
      setRelatorio(response.data);
    });
  }, [api]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Código do Equipamento</TableCell>
            <TableCell>Nome do Equipamento</TableCell>
            <TableCell>Descrição da Manutenção</TableCell>
            <TableCell>Data da Manutenção</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {relatorio.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.codigoEquipamento}</TableCell>
              <TableCell>{row.nomeEquipamento}</TableCell>
              <TableCell>{row.descricaoManutencao}</TableCell>
              <TableCell>{row.dataManutencao}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Relatorio;
