import { DashboardContent } from "@/components/design";
import React, { useState } from "react";
import {
  ProductRecommenderTabHeader,
  UploadProductsWidget,
  ProductSourceTable,
} from "./product-recommdation";
import { KBSourceType } from "@/constants";

export const ProductRecommenderTab = () => {
  // Upload product source
  const [createFormOpen, setCreateFormOpen] = useState(() => false);
  const [sourceData, setSourceData] = useState<KBSourceType | null>(null);
  const openCreateForm = (data: KBSourceType) => {
    setSourceData(data);
    setCreateFormOpen(true);
  };

  return (
    <React.Fragment>
      <DashboardContent>
        <div className="flex-1 flex flex-col overflow-auto items-center h-full">
          <div className="w-full max-w-6xl mt-4 md:mt-8 flex flex-col gap-6">
            <ProductRecommenderTabHeader />
            <UploadProductsWidget openForm={openCreateForm} />
            <ProductSourceTable />
          </div>
        </div>
      </DashboardContent>
    </React.Fragment>
  );
};
