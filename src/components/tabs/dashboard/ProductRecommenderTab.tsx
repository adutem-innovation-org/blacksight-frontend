import { DashboardContent } from "@/components/design";
import React, { useEffect, useState } from "react";
import {
  ProductRecommenderTabHeader,
  UploadProductsWidget,
  ProductSourceTable,
  AddProductsForm,
} from "./product-recommdation";
import { KBSourceType } from "@/constants";
import { Loader } from "@/components/progress";
import { useStore } from "@/hooks";
import { getAllProductsSources } from "@/store";

export const ProductRecommenderTab = () => {
  // Upload product source
  const [createFormOpen, setCreateFormOpen] = useState(() => false);
  const [sourceData, setSourceData] = useState<KBSourceType | null>(null);
  const { dispatch, getState } = useStore();
  const { fetchingProductsSources, productsSources } = getState(
    "ProductRecommendation"
  );

  const openCreateForm = (data: KBSourceType) => {
    setSourceData(data);
    setCreateFormOpen(true);
  };

  const onOpenCreateFormChange = (val: boolean) => {
    setCreateFormOpen(val);
    setSourceData(null);
  };

  useEffect(() => {
    if (!productsSources && !fetchingProductsSources) {
      dispatch(getAllProductsSources());
    }
  }, []);

  if (fetchingProductsSources) return <Loader />;

  return (
    <React.Fragment>
      <DashboardContent>
        <div className="flex-1 flex flex-col overflow-auto items-center h-full">
          <div className="w-full max-w-6xl mt-4 md:mt-8 flex flex-col gap-6">
            <ProductRecommenderTabHeader />
            <UploadProductsWidget openForm={openCreateForm} />
            <ProductSourceTable />
          </div>

          <AddProductsForm
            isOpen={createFormOpen && !!sourceData}
            onOpenChange={onOpenCreateFormChange}
            sourceData={sourceData}
          />
        </div>
      </DashboardContent>
    </React.Fragment>
  );
};
