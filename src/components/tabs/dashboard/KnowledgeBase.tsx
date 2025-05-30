import { DashboardContent } from "@/components/design";
import { useProfile, useStore } from "@/hooks";
import knowledgeBaseAnalyticsData from "@/data/knowledgebase.analytics.json";
import { KnowledgeBase } from "@/interfaces";
import { useEffect, useState } from "react";
import { AnalyticsCard } from "@/components/cards";
import {
  deleteKnowledgeBase,
  getAllKnowledgeBases,
  getKnowledgeBaseAnalytics,
  resetDeleteKnowledgeBase,
} from "@/store";
import { Button } from "@/components/form";
import { Loader } from "@/components/progress";
import { EmptyRecordsTemplate } from "@/components/templates";
import {
  AddKnowledgeBaseForm,
  KnowledgeBaseDetailsDrawer,
  KnowledgeBaseTable,
} from "./knowledge-base";
import { UserTypes } from "@/enums";
import databaseIcon from "@/assets/images/database.png";
import toast from "react-hot-toast";
import { DeleteDialog } from "@/components/popups";

const Header = ({ openCreateForm }: { openCreateForm: () => void }) => {
  const { user } = useProfile();
  const { getState } = useStore();
  const {
    fetchingKnowledgeBaseAnalytics,
    knowledgeBaseAnalytics,
    fetchKnowledgeBaseAnalyticsErrorMessage,
  } = getState("KnowledgeBase");

  return (
    <header className="flex items-center justify-between">
      {fetchKnowledgeBaseAnalyticsErrorMessage ? (
        <div className="flex justify-center items-center h-30 font-dmsans font-semibold">
          An error occured. Please try again.
        </div>
      ) : fetchingKnowledgeBaseAnalytics ? (
        <div className="relative h-30 flex-1">
          <Loader />
        </div>
      ) : !knowledgeBaseAnalytics ? (
        <div className="flex justify-center items-center h-30 font-dmsans font-semibold">
          No data available at the moment
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-5 basis-1/2">
          {knowledgeBaseAnalyticsData.map(({ id, ...data }) => {
            let percentage;
            let count = knowledgeBaseAnalytics![id];
            let totalCount = knowledgeBaseAnalytics!["totalKnowledgeBases"];
            if (id !== "totalKnowledgeBases")
              percentage = Math.round((count / (totalCount || 1)) * 100);
            return (
              <AnalyticsCard
                {...data}
                count={knowledgeBaseAnalytics![id]}
                percentage={percentage}
              />
            );
          })}
        </div>
      )}

      <div>
        {user?.userType === UserTypes.USER && (
          <Button variant={"brand"} className="h-13" onClick={openCreateForm}>
            Add Knowledge base
          </Button>
        )}
      </div>
    </header>
  );
};

export const KnowledgeBaseTab = () => {
  const { user } = useProfile();
  const { dispatch, getState } = useStore();
  const [createFormOpen, setCreateFormOpen] = useState(() => false);
  const [
    isKnowledgeBaseDetailsDrawerOpen,
    setIsKnowledgeBaseDetailsDrawerOpen,
  ] = useState(() => false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(() => false);
  const [knowledgeBaseToDelete, setKnowledgeBaseToDelete] =
    useState<KnowledgeBase | null>(null);
  const [knowledgeBaseDetails, setKnowledgeBaseDetails] =
    useState<KnowledgeBase | null>(null);

  const {
    fetchingKnowledgeBaseAnalytics,
    knowledgeBaseAnalytics,
    fetchingAllKnowledgeBases,
    knowledgeBases,
    deletingKnowledgeBase,
    knowledgeBaseDeleted,
    deleteKnowledgeBaseErrorMessage,
  } = getState("KnowledgeBase");

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);
  const openCreateForm = () => setCreateFormOpen(true);

  const onOpenChange = (value: boolean) => {
    if (!value) {
      setKnowledgeBaseDetails(null);
    }
    setIsKnowledgeBaseDetailsDrawerOpen(value);
  };

  const viewKnowledgeBaseDetails = (data: KnowledgeBase) => {
    setKnowledgeBaseDetails(data);
    setIsKnowledgeBaseDetailsDrawerOpen(true);
  };

  const onDeleteKnowledgeBase = (data: KnowledgeBase) => {
    setKnowledgeBaseToDelete(data);
    openDeleteModal();
  };

  const endDeleteOperation = () => {
    closeDeleteModal();
    setKnowledgeBaseToDelete(null);
    // Reset pointer event on page ✅ Radix bug
    let tmo = setTimeout(() => {
      document.body.style.pointerEvents = "";
      clearTimeout(tmo);
    }, 100);
  };

  const confirmDeleteOperation = () => {
    if (knowledgeBaseToDelete) {
      dispatch(deleteKnowledgeBase(knowledgeBaseToDelete._id));
    }
  };

  useEffect(() => {
    if (knowledgeBaseDeleted) {
      toast.success("Knowledge base deleted.");
      // Get the lastest knowledge base analytics for user
      dispatch(getKnowledgeBaseAnalytics());
      dispatch(resetDeleteKnowledgeBase());
      // Close model, reset states and add pointer event to document element
      endDeleteOperation();
    }
  }, [knowledgeBaseDeleted]);

  useEffect(() => {
    if (deleteKnowledgeBaseErrorMessage) {
      toast.error(deleteKnowledgeBaseErrorMessage);
      dispatch(resetDeleteKnowledgeBase());
    }
  }, [deleteKnowledgeBaseErrorMessage]);

  // Fetch analytics and knowledge base on tab open
  useEffect(() => {
    if (!knowledgeBaseAnalytics && !fetchingKnowledgeBaseAnalytics) {
      dispatch(getKnowledgeBaseAnalytics());
    }

    if (!knowledgeBases && !fetchingAllKnowledgeBases) {
      dispatch(getAllKnowledgeBases());
    }
  }, []);

  if (fetchingAllKnowledgeBases) return <Loader />;

  return (
    <DashboardContent>
      <div className="flex flex-col gap-4 h-full overflow-hidden">
        <Header openCreateForm={openCreateForm} />

        {!knowledgeBases || knowledgeBases.length === 0 ? (
          <EmptyRecordsTemplate
            imageSrc={databaseIcon}
            title="No Knowledge base available"
            ctaText="Add Knowledge base"
            description={
              user?.userType === UserTypes.USER
                ? "You currently have no knowledge base. Click 'Add Knowledge base' to get started."
                : "Knowledge base collection is currently empty"
            }
            onClickCta={openCreateForm}
            showCta={user?.userType === UserTypes.USER}
          />
        ) : (
          <KnowledgeBaseTable
            viewKnowledgeBaseDetails={viewKnowledgeBaseDetails}
            onDeleteKnowledgeBase={onDeleteKnowledgeBase}
          />
        )}

        <KnowledgeBaseDetailsDrawer
          isOpen={isKnowledgeBaseDetailsDrawerOpen}
          onOpenChange={onOpenChange}
          knowledgeBaseDetails={knowledgeBaseDetails!}
        />

        <AddKnowledgeBaseForm
          isOpen={createFormOpen}
          onOpenChange={setCreateFormOpen}
        />
        {knowledgeBaseToDelete && (
          <DeleteDialog
            isOpen={deleteModalOpen}
            onOpenChange={setDeleteModalOpen}
            cancelDeleteOperation={endDeleteOperation}
            confirmDeleteOperation={confirmDeleteOperation}
            loading={deletingKnowledgeBase}
            description="This action cannot be undone. This will permanently delete your knowledge base and deactivate every bot that are connect to it only."
          />
        )}
      </div>
    </DashboardContent>
  );
};
