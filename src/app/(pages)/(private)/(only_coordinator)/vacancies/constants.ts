import { StatusOption } from "@/lib/hooks/filter/useStatusFilter";
import { Column } from "@/lib/hooks/table/useSelectColumns-Table";

export const statusPostulations: StatusOption[] = [
  { name: "Abierta", uid: "true" },
  { name: "Cerrada", uid: "false" },
];

export const initialVisibleColumns = [
  "subject",
  "prepareers",
  "created-date",
  "actions",
];

export const columns: Column[] = [
  {
    name: "Materia",
    uid: "subject",
  },
  {
    name: "Estado",
    uid: "status",
  },
  {
    name: "Preparadores",
    uid: "prepareers",
    sortable: true,
    align: "center",
  },

  {
    name: "Fecha de Creación",
    uid: "created-date",
    sortable: true,
    align: "center",
  },
  {
    name: "Fecha de Modificación",
    uid: "updated-date",
    sortable: true,
    align: "center",
  },
  {
    name: "Acciones",
    uid: "actions",
    align: "center",
  },
];
