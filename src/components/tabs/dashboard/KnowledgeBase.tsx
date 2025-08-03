import { DashboardContent } from "@/components/design";
import { useProfile, useStore } from "@/hooks";
import knowledgeBaseAnalyticsData from "@/data/knowledgebase.analytics.json";
import { KnowledgeBase } from "@/interfaces";
import { useEffect, useState } from "react";
import { AnalyticsCard } from "@/components/cards";
import {
  deleteKnowledgeBase,
  getAllBots,
  getAllKnowledgeBases,
  getKnowledgeBaseAnalytics,
  resetDeleteKnowledgeBase,
  resetUpdateKBStatus,
  updateKBStatus,
} from "@/store";
import { Button } from "@/components/form";
import { Loader } from "@/components/progress";
import { EmptyRecordsTemplate } from "@/components/templates";
import {
  AddKnowledgeBaseForm,
  AddKnowledgeBaseSourceWidgets,
  KnowledgeBaseDetailsDrawer,
  KnowledgeBaseTable,
} from "./knowledge-base";
import { KnowledgeBaseSources, SideBarStateEnum, UserTypes } from "@/enums";
import databaseIcon from "@/assets/images/database.png";
import toast from "react-hot-toast";
import { DeactivateDialog, DeleteDialog } from "@/components/popups";
import { resetDocumentElement } from "@/helpers";
import { cn } from "@/lib/utils";
import { KBSourceType } from "@/constants";

const Header = ({
  openCreateForm,
}: {
  openCreateForm: (data: KBSourceType) => void;
}) => {
  const { getState } = useStore();
  const {
    fetchingKnowledgeBaseAnalytics,
    knowledgeBaseAnalytics,
    fetchKnowledgeBaseAnalyticsErrorMessage,
  } = getState("KnowledgeBase");
  const { sidebarState } = getState("Layout");

  // Is the sidebar collapsed or expanded
  const isCollapsed = sidebarState === SideBarStateEnum.COLLAPSED;

  return (
    <header
      className={cn(
        // "flex justify-between flex-col items-stretch gap-6 md:gap-5 xl:flex-row xl:items-center",
        // {
        //   "lg:flex-row lg:items-center": isCollapsed,
        // }
        "grid grid-cols-1 xl:grid-cols-[1fr,min-content] xl:flex gap-5"
      )}
    >
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
        <div
          className={cn(
            // "grid grid-cols-1 gap-6 md:gap-5 flex-1 max-w-5xl lg:grid-cols-2",
            "grid grid-cols-1 gap-5 flex-1 lg:grid-cols-2 order-4 xl:order-1 xl:max-w-5xl xl:items-center",
            {
              "md:grid-cols-2": isCollapsed,
            }
          )}
        >
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

      <AddKnowledgeBaseSourceWidgets openForm={openCreateForm} />

      {/* <div
        className={cn("self-end xl:self-center", {
          "lg:self-center": isCollapsed,
        })}
      >
        {user?.userType === UserTypes.USER && (
          <Button variant={"brand"} className="h-13" onClick={openCreateForm}>
            Add Knowledge base
          </Button>
        )}
      </div> */}
    </header>
  );
};

export const KnowledgeBaseTab = () => {
  const { user } = useProfile();
  const { dispatch, getState } = useStore();

  // States
  const {
    fetchingKnowledgeBaseAnalytics,
    knowledgeBaseAnalytics,
    fetchingAllKnowledgeBases,
    knowledgeBases,

    // Update knowledge base status
    updatingKBStatus,
    kbStatusUpdated,
    updateKBStatusError,

    // Delete knowledge base
    deletingKnowledgeBase,
    knowledgeBaseDeleted,
    deleteKnowledgeBaseErrorMessage,
  } = getState("KnowledgeBase");

  // Create knowledge base
  const [createFormOpen, setCreateFormOpen] = useState(() => false);
  const [sourceData, setSourceData] = useState<KBSourceType | null>(null);
  const openCreateForm = (data: KBSourceType) => {
    setSourceData(data);
    setCreateFormOpen(true);
  };

  const onOpenCreateFormChange = (value: boolean) => {
    setCreateFormOpen(value);
    setSourceData(null);
  };

  // View knowledge base details
  const [
    isKnowledgeBaseDetailsDrawerOpen,
    setIsKnowledgeBaseDetailsDrawerOpen,
  ] = useState(() => false);
  const [knowledgeBaseDetails, setKnowledgeBaseDetails] =
    useState<KnowledgeBase | null>(null);

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

  // Update kb status
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(() => false);
  const [kbToDeactivate, setKbToDeactivate] = useState<KnowledgeBase | null>(
    null
  );

  // Deactivate dialog actions
  const openDeactivateDialog = () => setDeactivateDialogOpen(true);
  const closeDeactivateDialog = () => setDeactivateDialogOpen(false);

  // Delete knowledge base
  const [deleteModalOpen, setDeleteModalOpen] = useState(() => false);
  const [knowledgeBaseToDelete, setKnowledgeBaseToDelete] =
    useState<KnowledgeBase | null>(null);

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  // Delete events
  const onDeleteKnowledgeBase = (data: KnowledgeBase) => {
    setKnowledgeBaseToDelete(data);
    openDeleteModal();
  };

  const endDeleteOperation = () => {
    closeDeleteModal();
    setKnowledgeBaseToDelete(null);
    // Reset pointer event on page ✅ Radix bug
    resetDocumentElement();
  };

  const confirmDeleteOperation = () => {
    if (knowledgeBaseToDelete) {
      dispatch(deleteKnowledgeBase(knowledgeBaseToDelete._id));
    }
  };

  // Deactivate event
  const setActiveStatus = (kb: KnowledgeBase, status: boolean) => {
    if (!status) {
      // User is trying to deactivate
      setKbToDeactivate(kb);
      openDeactivateDialog();
    } else {
      dispatch(updateKBStatus({ id: kb._id, status }));
    }
  };

  const endDeactivateOperation = () => {
    closeDeactivateDialog();
    setKbToDeactivate(null);
    resetDocumentElement();
  };

  const confirmDeactivateOperation = () => {
    if (kbToDeactivate) {
      dispatch(updateKBStatus({ id: kbToDeactivate._id, status: false }));
    }
  };

  // Delete knowledge base effects
  useEffect(() => {
    if (knowledgeBaseDeleted) {
      toast.success("Knowledge base deleted.");
      // Get the lastest knowledge base analytics for user
      dispatch(getKnowledgeBaseAnalytics());
      // Get the new bots in case some have been deactivated
      dispatch(getAllBots());
      // Reset store state
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

  // Deactivate kb effects
  useEffect(() => {
    if (kbStatusUpdated) {
      toast.success("Knowledge base status updated");
      // Get the latest bot analytics for user
      dispatch(getKnowledgeBaseAnalytics());
      // Get the new bots in case some have been deactivated
      dispatch(getAllBots());
      // Reset store state
      dispatch(resetUpdateKBStatus());
      // Close dialog, reset states and add pointer event to document element
      endDeactivateOperation();
    }
  }, [kbStatusUpdated]);

  useEffect(() => {
    if (updateKBStatusError) {
      toast.error(updateKBStatusError);
      dispatch(resetUpdateKBStatus());
    }
  }, [updateKBStatusError]);

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

        {updatingKBStatus && !deactivateDialogOpen && (
          <Loader text1="Activating knowledge base" />
        )}

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
            // onClickCta={openCreateForm}
            // showCta={user?.userType === UserTypes.USER}
          />
        ) : (
          <KnowledgeBaseTable
            viewKnowledgeBaseDetails={viewKnowledgeBaseDetails}
            onDeleteKnowledgeBase={onDeleteKnowledgeBase}
            setActiveStatus={setActiveStatus}
          />
        )}

        <KnowledgeBaseDetailsDrawer
          isOpen={isKnowledgeBaseDetailsDrawerOpen}
          onOpenChange={onOpenChange}
          knowledgeBaseDetails={knowledgeBaseDetails!}
        />

        <AddKnowledgeBaseForm
          isOpen={createFormOpen && !!sourceData}
          onOpenChange={onOpenCreateFormChange}
          sourceData={sourceData}
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

        {kbToDeactivate && (
          <DeactivateDialog
            isOpen={deactivateDialogOpen}
            onOpenChange={setDeactivateDialogOpen}
            cancelOperation={endDeactivateOperation}
            confirmOperation={confirmDeactivateOperation}
            loading={updatingKBStatus}
            description="This is a risky action. This acition will deactivate your knowledge base as well as every bot that are connect to it."
          />
        )}
      </div>
    </DashboardContent>
  );
};
