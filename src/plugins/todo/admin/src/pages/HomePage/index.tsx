/*
 *
 * HomePage
 *
 */

import React, { useEffect, useState } from "react";
import {
  BaseHeaderLayout,
  Button,
  ContentLayout,
  EmptyStateLayout,
  Layout,
} from "@strapi/design-system";
import { Plus } from "@strapi/icons";

import TodoCount from "../../components/TodoCount";
import TodoTable from "../../components/TodoTabel";
import { Illo } from "../../components/Illo";
import TodoModal from "../../components/TodoModal";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import todoRequests from "../../api/todo";

const HomePage = () => {
  const [todoData, setTodoData] = useState<any>([]);
  const [showModal, setShowModal] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<any>(true);

  async function addTodo(data: any) {
    await todoRequests.addTodo(data);
    await fetchData();
  }

  async function toggleTodo(data: any) {
    await todoRequests.toggleTodo(data.id);
  }

  async function deleteTodo(data: any) {
    await todoRequests.deleteTodo(data.id);
    await fetchData();
  }

  async function editTodo(id: any, data: any) {
    await todoRequests.editTodo(id, data);
    await fetchData();
  }

  const fetchData = async () => {
    if (isLoading === false) setIsLoading(true);

    const todo = await todoRequests.getAllTodos();
    setTodoData(todo);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingIndicatorPage />;
  }

  return (
    <Layout>
      <BaseHeaderLayout
        title="Todo plugin"
        subtitle="All your todos in on place"
        as="h2"
      />

      <ContentLayout>
        {todoData.length === 0 ? (
          <EmptyStateLayout
            icon={<Illo />}
            content="You don't have any todos yet..."
            action={
              <Button
                onClick={() => setShowModal(true)}
                variant="secondary"
                startIcon={<Plus />}
              >
                Add your first Todo
              </Button>
            }
          />
        ) : (
          <>
            <TodoCount count={todoData.length} />
            <TodoTable
              todoData={todoData}
              setShowModal={setShowModal}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          </>
        )}
      </ContentLayout>
      {showModal && <TodoModal setShowModal={setShowModal} addTodo={addTodo} />}
    </Layout>
  );
};

export default HomePage;
