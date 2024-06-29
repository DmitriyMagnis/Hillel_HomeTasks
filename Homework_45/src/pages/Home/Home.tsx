import Container from '../../components/Container/Container';
import PageHead from '../../components/PageHead/PageHead';
import Todo from '../../components/Todos/Todo';

const Component = () => {
  console.log('Home');
  return (
    <Container>
      <PageHead>Welcome! This is make your tasks for every day!</PageHead>
      <Todo />
    </Container>
  );
};

export { Component };
