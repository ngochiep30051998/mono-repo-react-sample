import { useState } from 'react';
import { App } from 'antd';
import AppModal from '@atoms/atoms/AppModal';
import AppSelect from '@atoms/atoms/AppSelect';
import type { MockOrder } from '@mocks';

const STATUS_OPTIONS: { value: MockOrder['status']; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

export interface OrderStatusStore {
  saving: boolean;
  updateStatus: (id: string, status: MockOrder['status']) => Promise<MockOrder | null>;
}

interface OrderStatusModalProps {
  open: boolean;
  order: MockOrder | null;
  onClose: () => void;
  orderStore?: OrderStatusStore;
}

export default function OrderStatusModal({ open, order, onClose, orderStore }: OrderStatusModalProps) {
  const { message } = App.useApp();
  const [status, setStatus] = useState<MockOrder['status'] | undefined>();

  if (!orderStore) return null;
  const { saving, updateStatus } = orderStore;

  const handleSubmit = async () => {
    if (!order || !status) return;
    const updated = await updateStatus(order.id, status);
    if (updated) {
      message.success(`Order ${order.orderNo} updated to ${status}`);
      onClose();
    } else {
      message.error('Failed to update');
    }
  };

  return (
    <AppModal
      title={`Update Status — ${order?.orderNo ?? ''}`}
      open={open}
      onOk={handleSubmit}
      onCancel={onClose}
      confirmLoading={saving}
      destroyOnHidden
    >
      <div className="py-4">
        <p className="mb-2 text-sm text-slate-500">
          Current status: <strong>{order?.status}</strong>
        </p>
        <AppSelect
          className="!w-full !rounded-xl"
          placeholder="Select new status"
          value={status}
          onChange={setStatus}
          options={STATUS_OPTIONS}
        />
      </div>
    </AppModal>
  );
}
