import * as Yup from "yup";

const validationSchema = Yup.object({
  nome: Yup.string()
    .required("Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres"),
  setor: Yup.string()
    .required("Setor é obrigatório"),
  dataFabricacao: Yup.date()
    .required("Data de fabricação é obrigatória")
    .max(new Date(), "A data de fabricação não pode ser no futuro"),
});

export default validationSchema;
