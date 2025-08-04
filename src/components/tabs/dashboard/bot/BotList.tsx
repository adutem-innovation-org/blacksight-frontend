import { Bot } from "@/interfaces";
import { BotCard } from "./BotCard";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { BotConfigDrawer, BotConfigPreviewer } from "./playground";
import { useStore } from "@/hooks";
import {
  updateBotStatus,
  deleteBot,
  getBotAnalytics,
  resetUpdateBotStatus,
  resetDeleteBot,
  cloneBot,
  resetCloneBot,
} from "@/store";
import toast from "react-hot-toast";
import { ConfirmationDialog, DeleteDialog } from "@/components/popups";
import { Loader } from "@/components/progress";
import { AddKnowledgeBaseForm } from "../knowledge-base";

interface BotListProps {
  bots: Bot[];
}

export const BotList = ({ bots }: BotListProps) => {
  const { dispatch, getState } = useStore();
  const {
    deletingBot,
    botDeleted,
    deleteBotError,
    updatingBotStatus,
    botStatusUpdated,
    updateBotStatusError,

    // Clone bot
    cloningBot,
    botCloned,
    cloneBotErrorMessage,
  } = getState("Bot");

  const resetDocumentElement = useCallback(() => {
    let tmo = setTimeout(() => {
      document.body.style.pointerEvents = "";
      clearTimeout(tmo);
    }, 100);
  }, []);

  // Edit configuration
  const [botConfigOpen, setBotConfigOpen] = useState(() => false);
  const [botToConfigure, setBotToConfigure] = useState<Bot | null>(null);

  // View configuration
  const [botToPreview, setBotToPreview] = useState<Bot | null>(null);
  const [botPreviewOpen, setBotPreviewOpen] = useState(() => false);

  // Delete bot
  const [deleteModalOpen, setDeleteModalOpen] = useState(() => false);
  const [botToDelete, setBotToDelete] = useState<Bot | null>(null);

  // Deactivate bot
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(() => false);
  const [botToDeactivate, setBotToDeactivate] = useState<Bot | null>(null);

  // Add KB
  const [createKBFormOpen, setCreateKBFormOpen] = useState(() => false);

  const addKB = () => {
    setCreateKBFormOpen(true);
  };

  // Delete modal actions
  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  // Deactivate modal actions
  const openDeactivateDialog = () => setDeactivateDialogOpen(true);
  const closeDeactivateDialog = () => setDeactivateDialogOpen(false);

  // Delete event
  const onDeleteBot = (bot: Bot) => {
    setBotToDelete(bot);
    openDeleteModal();
  };

  const onCloneBot = (bot: Bot) => {
    dispatch(cloneBot(bot._id));
  };

  const endDeleteOperation = () => {
    closeDeleteModal();
    setBotToDelete(null);
    // Reset pointer event on page ✅ Radix bug
    resetDocumentElement();
  };

  const confirmDeleteOperation = () => {
    if (botToDelete) {
      dispatch(deleteBot(botToDelete._id));
    }
  };

  // Deactivate event
  const setActiveStatus = (bot: Bot, status: boolean) => {
    if (!status) {
      // User is trying to deactivate
      setBotToDeactivate(bot);
      openDeactivateDialog();
    } else {
      dispatch(updateBotStatus({ id: bot._id, status }));
    }
  };

  const endDeactivateOperation = () => {
    closeDeactivateDialog();
    setBotToDeactivate(null);
    resetDocumentElement();
  };

  const confirmDeactivateOperation = () => {
    if (botToDeactivate) {
      dispatch(updateBotStatus({ id: botToDeactivate._id, status: false }));
    }
  };

  // Edit configuration
  const onOpenChange = (val: boolean) => {
    if (!val) setBotToConfigure(null);
    setBotConfigOpen(val);
  };

  const openBotConfig = (bot: Bot) => {
    setBotConfigOpen(true);
    setBotToConfigure(bot);
  };

  // View configuration
  const onBotPreviewerOpenChange = (val: boolean) => {
    if (!val) setBotToPreview(null);
    setBotPreviewOpen(val);
  };

  const openBotPreview = (bot: Bot) => {
    setBotToPreview(bot);
    setBotPreviewOpen(true);
  };

  // Delete bot effects
  useEffect(() => {
    if (botDeleted) {
      toast.success("Bot deleted");
      // Get the latest bot analytics for user
      dispatch(getBotAnalytics());
      dispatch(resetDeleteBot());
      // Close modal, reset states and add pointer event to document element
      endDeleteOperation();
    }
  }, [botDeleted]);

  useEffect(() => {
    if (deleteBotError) {
      toast.error(deleteBotError);
      dispatch(resetDeleteBot());
    }
  }, [deleteBotError]);

  // Deactivate bot effects
  useEffect(() => {
    if (botStatusUpdated) {
      toast.success("Bot status updated");
      // Get the latest bot analytics for user
      dispatch(getBotAnalytics());
      dispatch(resetUpdateBotStatus());
      // Close dialog, reset states and add pointer event to document element
      endDeactivateOperation();
    }
  }, [botStatusUpdated]);

  useEffect(() => {
    if (updateBotStatusError) {
      toast.error(updateBotStatusError, { duration: 2500 });
      dispatch(resetUpdateBotStatus());
    }
  }, [updateBotStatusError]);

  // Clone bot
  useEffect(() => {
    if (botCloned) {
      toast.success("Bot cloned.");
      // Get the latest bot analytics for user
      dispatch(getBotAnalytics());
      dispatch(resetCloneBot());
    }
  }, [botCloned]);

  useEffect(() => {
    if (cloneBotErrorMessage) {
      toast.error(cloneBotErrorMessage, { duration: 2500 });
      dispatch(resetCloneBot());
    }
  }, [cloneBotErrorMessage]);

  return (
    <div className={cn("overflow-hidden flex-1 bg-transparent")}>
      {updatingBotStatus && !deactivateDialogOpen && (
        <Loader text1="Activating bot..." extrudeChildren />
      )}

      {cloningBot && <Loader text1="Cloning bot..." extrudeChildren />}

      <div className="h-full overflow-auto grid bg-transparent auto-rows-[400px] grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-6 md:gap-5 no-scrollbar">
        {bots.map((bot) => (
          <BotCard
            bot={bot}
            editConfiguration={openBotConfig}
            viewConfiguration={openBotPreview}
            onDeleteBot={onDeleteBot}
            onCloneBot={onCloneBot}
            setActiveStatus={setActiveStatus}
          />
        ))}
      </div>

      {botToConfigure && (
        <BotConfigDrawer
          isOpen={botConfigOpen}
          onOpenChange={onOpenChange}
          currentBot={botToConfigure}
          addKB={addKB}
          showPromptEditor
        />
      )}

      {botToPreview && (
        <BotConfigPreviewer
          isOpen={botPreviewOpen}
          onOpenChange={onBotPreviewerOpenChange}
          botDetails={botToPreview}
        />
      )}

      {botToDelete && (
        <DeleteDialog
          isOpen={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          cancelDeleteOperation={endDeleteOperation}
          confirmDeleteOperation={confirmDeleteOperation}
          loading={deletingBot}
          description="This action cannot be undone. This will permanently delete your bot and stop it from running on every website you have embedded it."
        />
      )}

      {botToDeactivate && (
        <ConfirmationDialog
          isOpen={deactivateDialogOpen}
          onOpenChange={setDeactivateDialogOpen}
          cancelOperation={endDeactivateOperation}
          confirmOperation={confirmDeactivateOperation}
          loading={updatingBotStatus}
        />
      )}

      <AddKnowledgeBaseForm
        isOpen={createKBFormOpen}
        onOpenChange={setCreateKBFormOpen}
      />
    </div>
  );
};
