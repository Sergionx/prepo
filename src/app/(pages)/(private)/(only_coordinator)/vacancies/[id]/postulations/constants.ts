import { StatusOption } from "@/lib/hooks/filter/useStatusFilter";
import { Column } from "@/lib/hooks/table/useSelectColumns-Table";

export const statusPostulations: StatusOption[] = [
  { name: "Aceptada", uid: "true" },
  { name: "Rechazada", uid: "false" },
  {
    name: "Pendiente",
    uid: "null",
  },
];

export const initialVisibleColumns = ["student", "date", "grade", "actions"];

export const columns: Column[] = [
  {
    name: "Estudiante",
    uid: "student",
  },
  {
    name: "Estado",
    uid: "status",
  },
  {
    name: "Nota",
    uid: "grade",
    sortable: true,
    align: "center",
  },
  {
    name: "Fecha",
    uid: "date",
    sortable: true,
  },
  {
    name: "Acciones",
    uid: "actions",
    align: "center",
  },
];

export const descriptionsMap = {
  aceptar: "Acepta varias postulaciones a la vez",
  rechazar: "Rechaza varias postulaciones a la vez",
};

export const labelsMap = {
  aceptar: "Aceptar seleccionados",
  rechazar: "Rechazar seleccionados",
};
