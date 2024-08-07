import React, { Suspense } from "react";
import PreparerListFetch from "./PreparerList/PreparerListFetch";
import Skeleton from "./PreparerList/Skeleton";

export default function Page() {
  return (
    <main className="py-12 px-6">
      <div className="flex-grow px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Conoce a tus prepardores!</h1>

          <Suspense fallback={<Skeleton />}>
            <PreparerListFetch />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
