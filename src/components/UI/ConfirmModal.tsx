type Props = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal = ({ title, message, onConfirm, onCancel }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-[#2F3E46] mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 cursor-pointer hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white cursor-pointer hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
