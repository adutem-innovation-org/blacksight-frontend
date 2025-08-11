import { DashboardContent } from "@/components/design";
import React, { useEffect, useState } from "react";
import {
  ProductRecommenderTabHeader,
  UploadProductsWidget,
  ProductSourceTable,
  AddProductsForm,
  AttachAgentForm,
  DetachAgentForm,
} from "./product-recommdation";
import { KBSourceType } from "@/constants";
import { Loader } from "@/components/progress";
import { useStore } from "@/hooks";
import {
  attachAgentToProductSource,
  deleteProductsSource,
  getAllBots,
  getAllProductsSources,
  resetDeleteProductsSource,
} from "@/store";
import toast from "react-hot-toast";
import { IProductsSource } from "@/interfaces";
import { resetDocumentElement } from "@/helpers";
import { ConfirmationDialog } from "@/components/popups";
import { InfoBlock } from "@/components/InfoBlock";

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
  const { fetchingAllBots, bots } = getState("Bot");
  // Attach agent to product source
  const [attachAgentModalOpen, setAttachAgentModalOpen] = useState(false);
  const [productSourceToAttachAgent, setProductSourceToAttachAgent] =
    useState<IProductsSource | null>(null);

  const openAttachAgentModal = () => setAttachAgentModalOpen(true);
  const closeAttachAgentModal = () => setAttachAgentModalOpen(false);

  const triggerAttachAgent = (data: IProductsSource) => {
    if (!bots || bots.length === 0)
      return toast.success("Please create an agent first.", {
        iconTheme: {
          primary: "#1a5f82",
          secondary: "#fff",
        },
        position: "top-center",
        style: {
          color: "#1a5f82",
        },
      });
    setProductSourceToAttachAgent(data);
    openAttachAgentModal();
  };

  const endAttachAgentOperation = () => {
    closeAttachAgentModal();
    setProductSourceToAttachAgent(null);
    // Reset pointer event on page ✅ Radix bug
    resetDocumentElement();
  };

  // Detach agent from product source
  const [detachAgentModalOpen, setDetachAgentModalOpen] = useState(false);
  const [productSourceToDetach, setProductSourceToDetach] =
    useState<IProductsSource | null>(null);

  const openDetachAgentModal = () => setDetachAgentModalOpen(true);
  const closeDetachAgentModal = () => setDetachAgentModalOpen(false);

  const triggerDetachAgent = (data: IProductsSource) => {
    setProductSourceToDetach(data);
    openDetachAgentModal();
  };

  const endDetachAgentOperation = () => {
    closeDetachAgentModal();
    setProductSourceToDetach(null);
    // Reset pointer event on page ✅ Radix bug
    resetDocumentElement();
  };

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

  useEffect(() => {
    if (!fetchingAllBots && !bots) {
      dispatch(getAllBots());
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
            {productsSources && productsSources.length === 0 && (
              <InfoBlock
                className="min-h-25 flex flex-col items-center justify-center text-center text-sm mt-5 font-medium gap-1 p-4 py-6"
                variant={"neutral"}
              >
                <p className="text-base font-medium tracking-tight">
                  No products sources found.
                </p>
                <p>
                  Start by creating a products source (i.e. a products
                  database), using any of the options above.
                </p>
              </InfoBlock>
            )}
            {productsSources && productsSources.length > 0 && (
              <ProductSourceTable
                triggerDeleteProductsSource={triggerDeleteProductsSource}
                triggerAttachAgent={triggerAttachAgent}
                triggerDetachAgent={triggerDetachAgent}
              />
            )}
          </div>

          <AddProductsForm
            isOpen={createFormOpen && !!sourceData}
            onOpenChange={onOpenCreateFormChange}
            sourceData={sourceData}
          />

          <AttachAgentForm
            isOpen={attachAgentModalOpen && !!productSourceToAttachAgent}
            endAttachAgentOperation={endAttachAgentOperation}
            productSource={productSourceToAttachAgent}
          />

          <DetachAgentForm
            isOpen={detachAgentModalOpen && !!productSourceToDetach}
            endDetachAgentOperation={endDetachAgentOperation}
            productSource={productSourceToDetach}
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
