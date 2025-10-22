import { useConfirm } from 'material-ui-confirm';
import type { ReactNode } from 'react';

export const useConfirmAction = () => {
  const confirm = useConfirm();

  const confirmAction = async (
    skipConfirm: boolean | undefined,
    content: { title: string; description: ReactNode }
  ) => {
    if (skipConfirm) return true;
    const { confirmed } = await confirm(content);
    return confirmed;
  };

  return confirmAction;
};
