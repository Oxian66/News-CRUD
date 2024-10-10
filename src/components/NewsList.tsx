import React from 'react';
import { List, Button, Tooltip, Typography } from 'antd';
import { News } from '../types';
import { DeleteFilled, EditFilled } from '@ant-design/icons';

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
      itemLayout="vertical"
      renderItem={(item) => (
        <List.Item
          actions={[
            <Tooltip title={"Редактировать"}>
              <Button
                type={"primary"}
                onClick={() => onEdit(item)}
                shape="circle"
                icon={<EditFilled />}
              />
              ,
            </Tooltip>,

            <Tooltip title={"Удалить"}>
              <Button
                danger
                onClick={() => onDelete(item.id)}
                type={"primary"}
                shape="circle"
                icon={<DeleteFilled />}
              />
              ,
            </Tooltip>,
          ]}
        >
          <List.Item.Meta title={item.title} description={item.date} />
          <Text>{item.content}</Text>
        </List.Item>
      )}
    />
  );
};

export default NewsList;