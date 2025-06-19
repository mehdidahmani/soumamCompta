import { Form, Input, InputNumber } from 'antd';

import useLanguage from '@/locale/useLanguage';

export default function ProductForm({ isUpdateForm = false }) {
  const translate = useLanguage();
  const validateEmptyString = (_, value) => {
    if (value && value.trim() === '') {
      return Promise.reject(new Error('Field cannot be empty'));
    }

    return Promise.resolve();
  };

  return (
    <>
      <Form.Item
        label={translate('Product Name')}
        name="name"
        rules={[
          {
            required: true,
            message: translate('Please enter the product name'),
          },
          {
            validator: validateEmptyString,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={translate('Reference')}
        name="reference"
        rules={[
          {
            required: true,
            message: translate('Please enter the product reference'),
          },
          {
            validator: validateEmptyString,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={translate('Unit Price')}
        name="unit_price"
        rules={[
          {
            required: true,
            message: translate('Please enter the unit price'),
          },
          {
            type: 'number',
            min: 0,
            message: translate('Unit price must be a positive number'),
          },
        ]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        label={translate('Quantity')}
        name="quantity"
        rules={[
          {
            required: true,
            message: translate('Please enter the quantity'),
          },
          {
            type: 'number',
            min: 0,
            message: translate('Quantity must be a positive number'),
          },
        ]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
    </>
  );
}
