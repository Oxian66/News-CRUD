import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { News } from '../types';

interface NewsFormProps {
  visible: boolean;
  onCreate: (news: News) => void;
  onCancel: () => void;
  initialData?: News | null;
}

const NewsForm: React.FC<NewsFormProps> = ({ visible, onCreate, onCancel, initialData }) => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
      setIsEditMode(true);
    } else {
      form.resetFields();
      setIsEditMode(false);
    }
  }, [initialData, form]);

  const handleFinish = (values: Omit<News, 'id'>) => {
    onCreate({ ...values, id: initialData ? initialData.id : new Date().toISOString() });
    form.resetFields();
  };

  return (
    <Modal
      visible={visible}
      title={isEditMode ? 'Редактировать новость' : 'Добавить новость'}
      okText={isEditMode ? 'Сохранить' : 'Добавить'}
      cancelText="Отмена"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => handleFinish(values))
          .catch(info => console.log('Ошибка:', info));
      }}
    >
      <Form form={form} layout="vertical" name="news_form">
        <Form.Item name="title" label="Заголовок" rules={[{ required: true, message: 'Пожалуйста, введите заголовок' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="content" label="Содержание" rules={[{ required: true, message: 'Пожалуйста, введите содержание' }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewsForm;
