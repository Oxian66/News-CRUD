import React from 'react';
import { List, Button, Space, Typography } from 'antd';
import { News } from '../types';

const { Text } = Typography;

interface NewsListProps {
  newsList: News[];
  onEdit: (news: News) => void;
  onDelete: (id: string) => void;
}

const NewsList: React.FC<NewsListProps> = ({ newsList, onEdit, onDelete }) => {
  return (
    <List
      dataSource={newsList}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button onClick={() => onEdit(item)}>Редактировать</Button>,
            <Button danger onClick={() => onDelete(item.id)}>Удалить</Button>,
          ]}
        >
          <List.Item.Meta
            title={item.title}
            description={item.date}
          />
          <Text>{item.content}</Text>
        </List.Item>
      )}
    />
  );
};

export default NewsList;