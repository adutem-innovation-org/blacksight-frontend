import { Bot } from "@/interfaces";
import { BotCard } from "./BotCard";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { BotConfigDrawer } from "./playground";
import { useStore } from "@/hooks";
import {
  deactivateBot,
  deleteBot,
  getBotAnalytics,
  resetDeactivateBot,
  resetDeleteBot,
} from "@/store";
import toast from "react-hot-toast";
import { DeactivateDialog, DeleteDialog } from "@/components/popups";

interface BotListProps {
  bots: Bot[];
}

export const BotList = ({ bots }: BotListProps) => {
  const { dispatch, getState } = useStore();
  const {
    deletingBot,
    botDeleted,
    deleteBotError,
    deactivatingBot,
    botDeactivated,
    deactivateBotError,
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

  // Delete bot
  const [deleteModalOpen, setDeleteModalOpen] = useState(() => false);
  const [botToDelete, setBotToDelete] = useState<Bot | null>(null);

  // Deactivate bot
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(() => false);
  const [botToDeactivate, setBotToDeactivate] = useState<Bot | null>(null);

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
  const onDeactivateBot = (bot: Bot) => {
    setBotToDeactivate(bot);
    openDeactivateDialog();
  };

  const endDeactivateOperation = () => {
    closeDeactivateDialog();
    setBotToDeactivate(null);
    resetDocumentElement();
  };

  const confirmDeactivateOperation = () => {
    if (botToDeactivate) {
      dispatch(deactivateBot(botToDeactivate._id));
    }
  };

  const onOpenChange = (val: boolean) => {
    if (!val) setBotToConfigure(null);
    setBotConfigOpen(val);
  };

  const openBotConfig = (bot: Bot) => {
    setBotConfigOpen(true);
    setBotToConfigure(bot);
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
    if (botDeactivated) {
      toast.success("Bot deactivated"),
        // Get the latest bot analytics for user
        dispatch(getBotAnalytics());
      dispatch(resetDeactivateBot());
      // Close dialog, reset states and add pointer event to document element
      endDeactivateOperation();
    }
  }, [botDeactivated]);

  useEffect(() => {
    if (deactivateBotError) {
      toast.error(deactivateBotError);
      dispatch(resetDeactivateBot());
    }
  }, [deactivateBotError]);

  return (
    <div className={cn("overflow-hidden flex-1 bg-transparent")}>
      <div className="h-full overflow-auto grid bg-transparent auto-rows-[400px] grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-6 md:gap-5 no-scrollbar">
        {bots.map((bot) => (
          <BotCard
            bot={bot}
            editConfiguration={openBotConfig}
            onDeleteBot={onDeleteBot}
            onDeactivateBot={onDeactivateBot}
          />
        ))}
      </div>

      {botToConfigure && (
        <BotConfigDrawer
          isOpen={botConfigOpen}
          onOpenChange={onOpenChange}
          currentBot={botToConfigure}
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
        <DeactivateDialog
          isOpen={deactivateDialogOpen}
          onOpenChange={setDeactivateDialogOpen}
          cancelOperation={endDeactivateOperation}
          confirmOperation={confirmDeactivateOperation}
          loading={deactivatingBot}
        />
      )}
    </div>
  );
};
