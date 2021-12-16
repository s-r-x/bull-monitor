import { useConfirm as useMaterialConfirm } from 'material-ui-confirm';

export class ConfirmError extends Error {}
export const useConfirm = () => {
  const materialConfirm = useMaterialConfirm();
  const confirm = async (options: Parameters<typeof materialConfirm>[0]) => {
    try {
      await materialConfirm({
        ...options,
        confirmationButtonProps: {
          color: 'inherit',
        },
        cancellationButtonProps: {
          color: 'inherit',
        },
      });
    } catch (_e) {
      throw new ConfirmError();
    }
  };
  return confirm;
};
