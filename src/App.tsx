import React, { useState, useEffect } from 'react';
import { Button, Layout, message } from 'antd';
import NewsForm from './components/NewsForm';
import NewsList from './components/NewsList';
import { News } from './types';
import './App.css';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editableNews, setEditableNews] = useState<News | null>(null);

  useEffect(() => {
    const savedNews = localStorage.getItem('news');
    if (savedNews) {
      setNewsList(JSON.parse(savedNews));
    }
  }, []);

  const saveNewsToStorage = (news: News[]) => {
    localStorage.setItem('news', JSON.stringify(news));
  };

  const handleCreateOrEdit = (news: News) => {
    if (editableNews) {
      // Редактирование
      const updatedNews = newsList.map((item) =>
        item.id === news.id
          ? { ...news, date: new Date().toLocaleDateString("ru-RU", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }
          : {
              ...item,
              date: new Date().toLocaleDateString("ru-RU", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            }
      );
      setNewsList(updatedNews);
      saveNewsToStorage(updatedNews);
      message.success('Новость обновлена');
    } else {
      // Добавление
      const addNews = [...newsList, { ...news, date: new Date().toLocaleDateString("ru-RU", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }];
      setNewsList(addNews);
      saveNewsToStorage(addNews);
      message.success('Новость добавлена');
    }
    setIsModalVisible(false);
    setEditableNews(null);
  };

  const handleDelete = (id: string) => {
    const updatedNews = newsList.filter(item => item.id !== id);
    setNewsList(updatedNews);
    saveNewsToStorage(updatedNews);
    message.success('Новость удалена');
  };

  const handleEdit = (news: News) => {
    setEditableNews(news);
    setIsModalVisible(true);
  };

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <h1 style={{ color: "white" }}>Новости.RU - Тестовое задание</h1>
      </Header>
      <Content style={{ padding: "20px" }}>
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          style={{ marginBottom: "20px" }}
        >
          Добавить новость
        </Button>
        <NewsList
          newsList={newsList}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <NewsForm
          visible={isModalVisible}
          onCreate={handleCreateOrEdit}
          onCancel={() => {
            setIsModalVisible(false);
            setEditableNews(null);
          }}
          initialData={editableNews}
        />
      </Content>
      <Footer style={{ textAlign: "center" }}>Новости ©2024</Footer>
    </Layout>
  );
};

export default App;