import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { App, Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';
import { PERMISSIONS, useHasPermission, useHasAnyPermission } from '@core';
import {
  AppButton,
  AppInput,
  AppModal,
  AppSelect,
  FilterBar,
  type FilterField,
  DataTable,
  StatusTag,
  ActionButtons,
} from '@ui';

type ClassStatus = 'active' | 'inactive';

interface ClassItem {
  id: string;
  code: string;
  name: string;
  teacher: string;
  description?: string;
  status: ClassStatus;
}

const INITIAL_CLASSES: ClassItem[] = [
  {
    id: 'c1',
    code: 'C01',
    name: 'Math 101',
    teacher: 'Nguyen Van A',
    description: 'Lớp toán cơ bản',
    status: 'active',
  },
  {
    id: 'c2',
    code: 'C02',
    name: 'English 201',
    teacher: 'Tran Thi B',
    description: 'Lớp tiếng Anh trung cấp',
    status: 'active',
  },
  {
    id: 'c3',
    code: 'C03',
    name: 'Physics 301',
    teacher: 'Le Van C',
    description: 'Lớp vật lý nâng cao',
    status: 'inactive',
  },
];

const FILTER_FIELDS: FilterField[] = [
  { name: 'q', type: 'input', placeholder: 'Tìm kiếm lớp...', width: 200 },
  {
    name: 'status',
    type: 'select',
    placeholder: 'Trạng thái',
    width: 140,
    options: [
      { value: 'active', label: 'Đang hoạt động' },
      { value: 'inactive', label: 'Ngừng hoạt động' },
    ],
  },
];

const STATUS_LABEL_MAP: Record<string, string> = {
  active: 'Đang hoạt động',
  inactive: 'Ngừng hoạt động',
};

export default function ClassesPage() {
  const { message } = App.useApp();
  const [searchParams] = useSearchParams();
  const [classes, setClasses] = useState<ClassItem[]>(INITIAL_CLASSES);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm<ClassItem>();

  const canCreate = useHasPermission(PERMISSIONS.CLASSES_VIEW);
  const hasAnyClassAction = useHasAnyPermission(PERMISSIONS.CLASSES_VIEW);

  const q = searchParams.get('q') || '';
  const status = searchParams.get('status') || '';

  const filteredClasses = useMemo(() => {
    return classes.filter((item) => {
      const matchQ =
        !q ||
        [item.code, item.name, item.teacher].some((s) =>
          s.toLowerCase().includes(q.toLowerCase()),
        );
      const matchStatus = !status || item.status === status;
      return matchQ && matchStatus;
    });
  }, [classes, q, status]);

  const openCreateModal = () => {
    setEditingId(null);
    form.resetFields();
    form.setFieldsValue({ status: 'active' } as Partial<ClassItem>);
    setModalOpen(true);
  };

  const openEditModal = (record: ClassItem) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setClasses((prev) => prev.filter((item) => item.id !== id));
    message.success('Đã xóa lớp học');
  };

  const handleModalCancel = () => {
    setModalOpen(false);
    setEditingId(null);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingId) {
        setClasses((prev) =>
          prev.map((item) =>
            item.id === editingId ? { ...item, ...values } : item,
          ),
        );
        message.success('Đã cập nhật lớp học');
      } else {
        const newItem: ClassItem = {
          ...values,
          id: `c-${Date.now()}`,
        };
        setClasses((prev) => [newItem, ...prev]);
        message.success('Đã tạo lớp học mới');
      }
      setModalOpen(false);
      setEditingId(null);
      form.resetFields();
    } catch {
      // ignore validation errors
    }
  };

  const columns: ColumnsType<ClassItem> = [
    { title: 'Mã lớp', dataIndex: 'code', key: 'code' },
    { title: 'Tên lớp', dataIndex: 'name', key: 'name' },
    { title: 'Giáo viên', dataIndex: 'teacher', key: 'teacher' },
    { title: 'Mô tả', dataIndex: 'description', key: 'description' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (s: ClassStatus) => (
        <StatusTag status={s} labelMap={STATUS_LABEL_MAP} />
      ),
    },
    ...(hasAnyClassAction
      ? [
          {
            title: 'Hành động',
            key: 'actions',
            render: (_: unknown, record: ClassItem) => (
              <ActionButtons
                editPermission={PERMISSIONS.CLASSES_VIEW}
                deletePermission={PERMISSIONS.CLASSES_VIEW}
                editLabel="Sửa"
                deleteLabel="Xóa"
                onEdit={() => openEditModal(record)}
                onDelete={() => handleDelete(record.id)}
              />
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="animate-fade-in">
      <FilterBar
        fields={FILTER_FIELDS}
        actions={
          canCreate ? (
            <AppButton
              type="primary"
              icon={<PlusOutlined />}
              onClick={openCreateModal}
            >
              Thêm lớp
            </AppButton>
          ) : null
        }
      />

      <DataTable<ClassItem>
        columns={columns}
        dataSource={filteredClasses}
        rowKey="id"
        loading={false}
        total={filteredClasses.length}
        showTotal={(t) => `Tổng ${t} lớp học`}
      />

      <AppModal
        open={modalOpen}
        title={editingId ? 'Cập nhật lớp học' : 'Thêm lớp học'}
        onCancel={handleModalCancel}
        onOk={handleSubmit}
        okText={editingId ? 'Lưu' : 'Tạo mới'}
        destroyOnHidden
      >
        <Form<ClassItem> layout="vertical" form={form}>
          <Form.Item
            label="Mã lớp"
            name="code"
            rules={[{ required: true, message: 'Vui lòng nhập mã lớp' }]}
          >
            <AppInput />
          </Form.Item>
          <Form.Item
            label="Tên lớp"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên lớp' }]}
          >
            <AppInput />
          </Form.Item>
          <Form.Item
            label="Giáo viên chủ nhiệm"
            name="teacher"
            rules={[{ required: true, message: 'Vui lòng nhập tên giáo viên' }]}
          >
            <AppInput />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <AppInput.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
          >
            <AppSelect<ClassStatus>
              options={[
                { value: 'active', label: 'Đang hoạt động' },
                { value: 'inactive', label: 'Ngừng hoạt động' },
              ]}
            />
          </Form.Item>
        </Form>
      </AppModal>
    </div>
  );
}
