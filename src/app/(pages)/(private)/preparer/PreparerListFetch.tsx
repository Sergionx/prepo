import { getAllPreparers } from "@/lib/actions/preparer.service";
import PreparerList from "./PreparerList";

export default async function PreparerListFetch() {
  const preparers = await getAllPreparers();

  return <PreparerList preparadores={preparers} />;
}
