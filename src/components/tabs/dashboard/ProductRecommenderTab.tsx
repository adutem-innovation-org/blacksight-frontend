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
import {
  deleteProductsSource,
  getAllBots,
  getAllProductsSources,
  resetDeleteProductsSource,
} from "@/store";
import toast from "react-hot-toast";
import { IProductsSource } from "@/interfaces";
import { resetDocumentElement } from "@/helpers";
import { ConfirmationDialog } from "@/components/popups";

export const ProductRecommenderTab = () => {
  // Upload product source
  const [createFormOpen, setCreateFormOpen] = useState(() => false);
  const [sourceData, setSourceData] = useState<KBSourceType | null>(null);
  const { dispatch, getState } = useStore();
  const {
    fetchingProductsSources,
    productsSources,

    // Delete products source
    deletingProductsSource,
    productsSourceDeleted,
    deleteProductsSourceError,
  } = getState("ProductRecommendation");
  // Delete product source
  const [deleteModalOpen, setDeleteModalOpen] = useState(() => false);
  const [productsSourceToDelete, setProductsSourceToDelete] =
    useState<IProductsSource | null>(null);

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  // Delete events
  const triggerDeleteProductsSource = (data: IProductsSource) => {
    setProductsSourceToDelete(data);
    openDeleteModal();
  };

  const endDeleteOperation = () => {
    closeDeleteModal();
    setProductsSourceToDelete(null);
    // Reset pointer event on page ✅ Radix bug
    resetDocumentElement();
  };

  const confirmDeleteOperation = () => {
    if (productsSourceToDelete) {
      dispatch(deleteProductsSource(productsSourceToDelete._id));
    }
  };

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

  // Delete Products source effects
  useEffect(() => {
    if (productsSourceDeleted) {
      toast.success("Products source deleted.");
      // Get all products sources
      dispatch(getAllProductsSources());
      // Get the new bots in case some have their productsSourcesIds affected
      dispatch(getAllBots());
      // Reset store state
      dispatch(resetDeleteProductsSource());
      // Close model, reset states and add pointer event to document element
      endDeleteOperation();
    }
  }, [productsSourceDeleted]);

  useEffect(() => {
    if (deleteProductsSourceError) {
      toast.error(deleteProductsSourceError);
      dispatch(resetDeleteProductsSource());
    }
  }, [deleteProductsSourceError]);

  if (fetchingProductsSources) return <Loader />;

  return (
    <React.Fragment>
      <DashboardContent>
        <div className="flex-1 flex flex-col overflow-auto items-center h-full">
          <div className="w-full max-w-6xl mt-4 md:mt-8 flex flex-col gap-6">
            <ProductRecommenderTabHeader />
            <UploadProductsWidget openForm={openCreateForm} />
            <ProductSourceTable
              triggerDeleteProductsSource={triggerDeleteProductsSource}
            />
          </div>

          <AddProductsForm
            isOpen={createFormOpen && !!sourceData}
            onOpenChange={onOpenCreateFormChange}
            sourceData={sourceData}
          />

          <ConfirmationDialog
            isOpen={deleteModalOpen}
            onOpenChange={setDeleteModalOpen}
            cancelOperation={endDeleteOperation}
            confirmOperation={confirmDeleteOperation}
            loading={deletingProductsSource}
            confirmCtaText="Delete"
            description="This action cannot be undone. This will permanently delete your products source."
          />
        </div>
      </DashboardContent>
    </React.Fragment>
  );
};
